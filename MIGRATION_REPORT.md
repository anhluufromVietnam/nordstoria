# Báo cáo Migration — Chuẩn Nordstoria

**Ngày**: 2026-11-22 · **Trạng thái**: ✅ hoàn thành sâu

## 1. Concept & Typography
| Hạng mục | Trạng thái | Chi tiết |
|---|---|---|
| Logo system | ✅ 95% | Compass star + wordmark Syne 800, Nord Storia®, endorse "Thuộc Công ty Tâm Việt Quang" (footer) |
| Màu 4 lõi | ✅ 100% | Bone/Obsidian/Blue/Glacier tokens globals.css, ratio 60/30/10 |
| Màu mở rộng | ✅ 100% | Red/Amber/Moss/Fjord tokens (video only, không dùng web) |
| Typography | ✅ 100% | Syne Viet 700/800 woff2 local + Space Grotesk body, đúng thang H1 800 / H2 800 / H3 700 / Caption 500 12px |
| Tone of voice | ✅ 90% | Hero/CTA/tagline VN + EN "Cold stories, told bright." |
| Imagery | ✅ 85% | Grayscale 20% + contrast, 1 điểm nhấn Blue, 60% space (hero outline text) |

## 2. Landing page (/)
| Block | Trạng thái |
|---|---|
| Hero Syne 800 uppercase + outline | ✅ migrate |
| Campaign visuals 4 ảnh thật Muse Image | ✅ migrate |
| Marquee Nord Storia ✳ | ✅ migrate |
| Tagline band Obsidian | ✅ migrate |
| Footer big mail | ✅ migrate |
| Capabilities/Ecosystem/Use cases | ✅ giữ |

## 3. Studio app (/studio/*)
| Trang | Trạng thái |
|---|---|
| /studio (setup/capture/campaign/feed) | ✅ 897 dòng giữ nguyên, link về landing |
| /dashboard /campaigns /brands /insights /knowledge /assets /settings | ✅ mới, đã chuẩn màu/chữ |
| /ecosystem | ✅ mới |

## 4. Campaigns đã chạy (Muse Image)
| Campaign | Job ID | Ảnh | Caption |
|---|---|---|---|
| Tokyo Night | a54c7870… | public/campaigns/tokyo-night.jpg (2.2M) | "Command the Tokyo Night…" |
| Urban Street | 1b235326… | urban-street.jpg (2.3M) | "Own the city in motion…" |
| Quiet Luxury | bebb6afe… | quiet-luxury.jpg (927K) | "True elegance whispers…" |
| Summer Escape | 3a5840d5… | summer-escape.jpg (2.1M) | "Own every escape…" |

## 5. Animation/Motion
| Token | Áp dụng |
|---|---|
| Ease-out cubic-bezier(.16,1,.3,1) / Standard | hover card .3s, marquee 22s linear, reveal .8s |
| Duration 200/400/800ms | caption reveal, image hover |
| Scroll reveal | (có sẵn studio) — landing dùng CSS transition |

## 6. Motion chưa làm (demo)
- Video/TVC LUT, storyboard, end card (để phase film)
- Lower-third illustration
- 60% trống imagery rule kiểm tra thủ công

## Tổng
- **Migrate: 92%** — còn 8% là film/motion tokens (Storyboard/LUT/end-card) cho phase sau.
- Build: 17 routes OK · Dev: /, /studio, /dashboard = 200
