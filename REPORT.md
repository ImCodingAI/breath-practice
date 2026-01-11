# BÁO CÁO KỸ THUẬT: ỨNG DỤNG "HƠI THỞ TĨNH LẶNG"

## 1. Tổng quan Dự án
**Tên ứng dụng:** Hơi Thở Tĩnh Lặng (Serene Breath)
**Mục tiêu:** Hỗ trợ người dùng thực hành các bài tập hít thở từ cơ bản đến nâng cao để giảm căng thẳng và tăng cường sự tập trung.
**Nền tảng:** Web Application (React + TypeScript).

## 2. Công nghệ Sử dụng (Tech Stack)

| Thành phần | Công nghệ | Mục đích |
| :--- | :--- | :--- |
| **Core Framework** | React 19.2.3 | Xây dựng giao diện người dùng dựa trên Component. |
| **Styling** | Tailwind CSS | Thiết kế giao diện nhanh, Responsive, Utility-first. |
| **Animation** | Framer Motion | Hiệu ứng chuyển động mượt mà cho vòng tròn hít thở và UI. |
| **Icons** | Lucide React | Hệ thống icon nhẹ, đồng bộ. |
| **Charts** | Recharts | Vẽ biểu đồ thống kê quá trình tập luyện. |
| **Database** | IndexedDB (Native) | Lưu trữ dữ liệu cục bộ (offline-first) không cần Backend. |
| **Time Handling** | Date-fns | Xử lý logic ngày tháng, tính toán chuỗi ngày (streak). |

## 3. Cấu trúc Mã nguồn

### 3.1. Các tệp tin chính (Core Files)
*   **`App.tsx`**: Component gốc. Quản lý trạng thái toàn cục của ứng dụng (Stage đang chọn, Chế độ tập luyện, Hiển thị Modal). Điều phối luồng giữa Dashboard và Breathing Guide.
*   **`types.ts`**: Định nghĩa TypeScript Interfaces quan trọng (`StageData`, `BreathingStep`, `DailyStat`) đảm bảo tính nhất quán dữ liệu.
*   **`constants.ts`**: Chứa dữ liệu tĩnh ("Source of Truth") cho các bài tập (Thở bụng, Cân bằng, Box Breathing) và danh sách câu trích dẫn.

### 3.2. Thành phần Giao diện (Components)
*   **`BreathingGuide.tsx`**: Màn hình thực hành chính. Quản lý phiên tập (Session), tính toán thời gian và điều hướng khi hoàn thành.
*   **`BreathingCircle.tsx`**: "Trái tim" của giao diện.
    *   Sử dụng SVG và Framer Motion để vẽ hoạt ảnh người ngồi thiền và luồng khí.
    *   Logic `setInterval` kết hợp `Date.now()` để đảm bảo bộ đếm thời gian chính xác tuyệt đối, không bị trôi (drift) khi chạy lâu.
*   **`StageCard.tsx`**: Thẻ hiển thị bài tập ở màn hình chính, xử lý trạng thái Khóa/Mở khóa.
*   **`StageDetail.tsx`**: Màn hình chi tiết trước khi vào bài tập (Hướng dẫn, Lợi ích).
*   **`CustomBreathingBuilder.tsx`**: Modal cho phép người dùng tự cấu hình nhịp thở (Hít - Nín - Thở - Nín).
*   **`StatisticsDashboard.tsx`**: Modal hiển thị biểu đồ và thống kê thành tích.

### 3.3. Quản lý Dữ liệu (Utils)
*   **`utils/db.ts`**: Layer tương tác trực tiếp với IndexedDB của trình duyệt.
    *   Store `user_progress`: Lưu cấp độ hiện tại (Level).
    *   Store `sessions`: Lưu lịch sử từng lần tập (Ngày giờ, thời lượng).
    *   Hàm `calculateStreak`: Thuật toán tính chuỗi ngày liên tiếp dựa trên lịch sử tập luyện.

## 4. Luồng Hoạt động (Logic Flow)

1.  **Khởi động:**
    *   Ứng dụng tải dữ liệu từ IndexedDB (Level hiện tại, Streak).
    *   Hiển thị Dashboard với danh sách bài tập. Các bài tập chưa đạt Level sẽ bị khóa.

2.  **Tập luyện:**
    *   Người dùng chọn bài tập -> Xem chi tiết -> Bắt đầu.
    *   `BreathingGuide` được mount -> Kích hoạt `BreathingCircle`.
    *   Vòng tròn hít thở chạy theo mảng `steps` được định nghĩa trong `constants.ts` hoặc dữ liệu Custom.

3.  **Kết thúc phiên:**
    *   Người dùng hoàn thành đủ số vòng hoặc bấm kết thúc.
    *   Dữ liệu thời gian tập được lưu vào `sessions` trong IndexedDB.
    *   Nếu hoàn thành bài tập ở Level hiện tại -> Mở khóa Level tiếp theo.
    *   Hiển thị màn hình chúc mừng với câu trích dẫn ngẫu nhiên.

4.  **Chế độ Tùy chỉnh (Custom Mode):**
    *   Cho phép người dùng tạo bài tập với thời gian Hít/Nín/Thở tùy ý.
    *   Dữ liệu này được tiêm (inject) vào `BreathingGuide` như một bài tập thông thường nhưng có ID là `custom`.

## 5. Thay đổi gần nhất
*   **Loại bỏ Audio:** Đã gỡ bỏ hoàn toàn thư viện `react-player` và logic phát nhạc nền để tối ưu hóa hiệu năng và tập trung vào trải nghiệm thị giác.

## 6. Kết luận
Ứng dụng được thiết kế theo kiến trúc **Component-based** sạch sẽ, tách biệt rõ ràng giữa logic (Hooks, Utils) và giao diện (Components). Việc sử dụng **IndexedDB** giúp ứng dụng hoạt động hoàn toàn Offline mà vẫn lưu giữ được tiến trình người dùng lâu dài.
