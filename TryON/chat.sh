#!/bin/bash
# Chatbot curl với Gemini (Vertex AI) — dùng service account có sẵn
# Usage: ./chat.sh "Câu hỏi của bạn"
#        ./chat.sh "Câu hỏi" "system prompt (tùy chọn)"
# Đổi model: MODEL=gemini-2.5-flash ./chat.sh "..."

set -e
cd "$(dirname "$0")"

# 1. Load .env (project, credentials path) — strip \r nếu file là CRLF
export $(grep -v '^#' .env | tr -d '\r' | xargs)

# 2. Lấy access token từ service account (hết hạn sau ~1 giờ)
TOKEN=$(python3 - <<'EOF'
from google.oauth2 import service_account
from google.auth.transport.requests import Request
import os
path = os.environ["GOOGLE_APPLICATION_CREDENTIALS"].lstrip("./")
creds = service_account.Credentials.from_service_account_file(
    path, scopes=["https://www.googleapis.com/auth/cloud-platform"]
)
creds.refresh(Request())
print(creds.token)
EOF
)

# 3. Build JSON body vào file tạm (tránh lỗi lồng quote)
BODY=$(mktemp)
trap 'rm -f "$BODY"' EXIT
python3 - "$1" "${2:-}" > "$BODY" <<'EOF'
import json, sys
question, system = sys.argv[1], sys.argv[2]
body = {"contents": [{"role": "user", "parts": [{"text": question}]}]}
if system:
    body["system_instruction"] = {"parts": [{"text": system}]}
print(json.dumps(body, ensure_ascii=False))
EOF

# 4. Gọi Gemini generateContent
MODEL="${MODEL:-gemini-2.5-flash}"
REGION="${REGION:-us-central1}"

curl -s -X POST \
  "https://aiplatform.googleapis.com/v1/projects/${GOOGLE_CLOUD_PROJECT}/locations/${REGION}/publishers/google/models/${MODEL}:generateContent" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d @"$BODY" \
| python3 -c "
import json, sys
d = json.load(sys.stdin)
if 'candidates' in d:
    print(d['candidates'][0]['content']['parts'][0]['text'])
else:
    print('LỖI:', json.dumps(d.get('error', d), ensure_ascii=False)[:300])
"
