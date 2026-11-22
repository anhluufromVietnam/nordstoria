# Cấu trúc VyIQ — AI Media Intelligence Studio (chuẩn Nordstoria)

> Nguồn chuẩn: https://basic-markup.vercel.app/brand-guidelines.html
> Fonts: Syne Viet 700/800 (đã copy vào `public/fonts/`) + Space Grotesk (Google Fonts)

## 1. Định vị
- Landing page (public, chưa dùng sản phẩm) + App sản phẩm (`/studio`)
- Brand: **Nord Storia®** — "Cold stories, told bright." / VyIQ × Nord Storia AI Studio
- Thuộc Công ty Tâm Việt Quang

## 2. Màu & chữ (đã áp globals.css)
- Bone `#efebe3` 60% nền · Obsidian `#101012` 30% · Nordic Blue `#2036f5` 10% · Glacier `#a8bfc9`
- Display: Syne Viet 800/700 — Body: Space Grotesk 400-600 — Mono cho label kỹ thuật
- Mở rộng video only: Red/Amber/Moss/Fjord (không dùng trên web)

## 3. Cấu trúc route (Next.js App Router)

```
/                          landing page (public)
  Hero + Capabilities + Ecosystem + Use cases + Pricing
  CTA -> /studio (Launch Studio)

/ecosystem                 giới thiệu TVQ (Nord Storia / VyIQ / AI Studio / TVIQ / IoT)

/studio                    AI Studio (product screenshot / try-on / campaign)
  /dashboard               performance tổng
  /campaigns               quản lý chiến dịch đa kênh
  /brands                  brand guidelines, consistency
  /insights                AI insights & recommendations
  /knowledge               knowledge base chiến dịch cũ
  /assets                  assets Muse Image output
  /settings                API keys, models, team

/app/api/try-on|generate-*  proxy tới FastAPI :8001
/TryON/main.py            FastAPI -> Meta Muse Image 1.0 + Muse Spark 1.3
```

## 4. Backend (TryON)
- `POST /generate-product` text->image (Muse Image)
- `POST /try-on` person+garment->edit (Muse Image)
- `POST /generate-campaign` + caption (Muse Image + Muse Spark)
- `MODEL_API_KEY` trong `TryON/.env` (không commit)

## 5. Quy chuẩn áp dụng
- Logo ≥24px, khoảng thở = chiều cao chữ "N", Nord Storia® + endorse khi online
- Blue ≤10% diện tích, hero uppercase Syne 800, hover card Obsidian (brand panel)
- Caption/label uppercase Space Grotesk 500, letter-spacing .14em
