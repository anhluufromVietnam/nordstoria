# VyIQ — AI Media Intelligence Studio

AI-powered platform to create, manage, monitor and optimise marketing campaigns
in one integrated environment. Part of the **VyIQ × Nord Storia** ecosystem.

## Stack

- **Frontend**: Next.js 15 (landing page at `/`, studio app at `/studio`)
- **Backend**: FastAPI (`TryON/main.py`) — proxies image generation to Meta Model API
- **Image model**: `muse-image-1.0` (Meta Muse Image, Facebook) — text→image, image edits, virtual try-on
- **Text model**: `muse-spark-1.3` (Meta Muse Spark) — captions & insights

## Routes

- `/` — Landing page (public)
- `/studio` — AI Studio (product screenshot / try-on / campaign)
- `/studio/dashboard` — Campaign performance dashboard
- `/studio/campaigns` — Integrated campaign management
- `/studio/brands` — Brand guidelines & consistency
- `/studio/insights` — AI insights & recommendations
- `/studio/knowledge` — Historical campaign knowledge base
- `/studio/assets` — Creative assets (Muse Image outputs)
- `/studio/settings` — Studio configuration
- `/ecosystem` — TVQ ecosystem overview

## Run

```bash
# backend (needs MODEL_API_KEY in TryON/.env)
cd TryON && cp .env.example .env && # fill MODEL_API_KEY
pip install -r requirements.txt
python -m uvicorn main:app --port 8001

# frontend
npm install
npm run dev
```

Env vars: `MODEL_API_KEY`, `META_API_URL` (default `https://api.meta.ai/v1`),
`MUSE_IMAGE_MODEL` (default `muse-image-1.0`), `MUSE_TEXT_MODEL` (default `muse-spark-1.3`),
`BACKEND_URL` (default `http://localhost:8001`).
