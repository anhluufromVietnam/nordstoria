
## Live deploy (2026-11-22)

- **URL**: https://nordstoria.nexlogvn.tech (web :3002, FastAPI :8001 via tunnel paths)
- **Host**: 54.169.224.21 (key ~/.ssh/nexlog-2026.pem, user ubuntu) — `~/nordstoria`
- **PM2**: `nordstoria` (next start -p 3002) + `nordstoria-api` (uvicorn main:app :8001)
- **Tunnel**: cloudflared tunnel 1cf5860b… config `/etc/cloudflared/config.yml` (nordstoria → 3002, /api → 8001)
- **Env**: `~/nordstoria/.env` + `TryON/.env` (MODEL_API_KEY, meta models) — gitignored
- **Update**: tar app lib public TryON → scp → extract → npm run build → pm2 restart nordstoria
