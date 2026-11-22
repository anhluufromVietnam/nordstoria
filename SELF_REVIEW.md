# Tự đánh giá Landing — VyIQ × Nord Storia (2026-11-22)

## Điểm đã bỏ (cục đen)
- **Vấn đề**: khối `tagline-band` đen + marquee đen, chữ trắng dính mép (không padding), dấu VN bị cắt (line-height 1.12), chiếm 60% viewport cuối trang.
- **Hành động**: BỎ HOÀN TOÀN — marquee + band đen xoá khỏi DOM. Thay bằng 1 dòng tagline nền **Bone** (paper), chữ Ink, điểm nhấn Blue — đúng ratio 60/30/10.
- Kết quả: hết 1 khối đen duy nhất trên trang. Hover card Obsidian chỉ xuất hiện khi tương tác (đúng guidelines).

## Đánh giá landing hiện tại (sau sửa)
| Hạng mục | Điểm | Ghi chú |
|---|---|---|
| Typography Syne Viet | 9/10 | Display/label đều Syne; dấu VN chuẩn; còn căng thẳng chữ dài hero |
| Màu 60/30/10 | 9/10 | Bone nền, Ink chữ, Blue điểm nhấn; không còn khối đen cố định |
| Visual campaign (ảnh Muse) | 8/10 | 4 ảnh thật, caption, metric — cần alt text test thêm |
| Metrics + Demo tools | 8/10 | Số liệu có, demo card rõ; link đều về /studio |
| Nhịp section | 7/10 | Hero→Visuals→Capabilities→Ecosystem→Use cases→Metrics→Demo→Pricing→Tagline→Footer: hơi dài, cần xem mobile |
| Nav/logo | 9/10 | Sao 4 cánh star-full + wordmark Syne 800 chuẩn |

## Việc còn lại (để lên 10)
- Mobile: kiểm tra hero + visual grid 1 cột (đã có breakpoint, cần test thiết bị thật)
- Marquee thoi trong band đen đã xoá — cân nhắc đưa lại dạng **chữ thường Bone, divider Ink** nếu muốn chuyển động, không dùng nền đen
- Text hero EN dài — rút còn 2 dòng nếu muốn nhịp gọn
