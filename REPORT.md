# BÁO CÁO KỸ THUẬT: ỨNG DỤNG "HƠI THỞ TĨNH LẶNG"

## 1. Tổng quan Dự án
**Tên ứng dụng:** Hơi Thở Tĩnh Lặng (Serene Breath)
**Mục tiêu:** Hỗ trợ người dùng thực hành các bài tập hít thở từ cơ bản đến nâng cao để giảm căng thẳng và tăng cường sự tập trung.
**Nền tảng:** Web Application (React + TypeScript + Vite).

## 2. Công nghệ Sử dụng (Tech Stack)

| Thành phần | Công nghệ | Mục đích |
| :--- | :--- | :--- |
| **Build Tool** | **Vite** | Môi trường phát triển cực nhanh, Hot Module Replacement (HMR) và tối ưu hóa Build. |
| **Core Framework** | React 18.2.0 | Xây dựng giao diện người dùng dựa trên Component. |
| **Styling** | Tailwind CSS 3.4 | Thiết kế giao diện nhanh, Responsive, Utility-first. |
| **Audio Engine** | **Howler.js** | Xử lý âm thanh độ trễ thấp cho các nhịp thở (Hít vào/Thở ra). |
| **Animation** | Framer Motion | Hiệu ứng chuyển động mượt mà cho vòng tròn hít thở và UI. |
| **Icons** | Lucide React | Hệ thống icon nhẹ, đồng bộ. |
| **Charts** | Recharts | Vẽ biểu đồ thống kê quá trình tập luyện. |
| **Database** | IndexedDB (Native) | Lưu trữ dữ liệu cục bộ (offline-first) không cần Backend. |
| **Time Handling** | Date-fns | Xử lý logic ngày tháng, tính toán chuỗi ngày (streak). |

## 3. Cấu trúc Mã nguồn

### 3.1. Cấu hình & Build (Configuration)
*   **`vite.config.ts`**: Cấu hình Vite Server và Plugin React.
*   **`tailwind.config.js`**: Cấu hình theme và animation cho Tailwind.
*   **`package.json`**: Quản lý dependencies và scripts (dev, build, preview).

### 3.2. Các tệp tin chính (Core Files)
*   **`App.tsx`**: Component gốc. Quản lý trạng thái toàn cục, điều phối luồng giữa Dashboard và Breathing Guide.
*   **`index.tsx`**: Entry point, kiểm tra an toàn Mounting Point trước khi render React.
*   **`types.ts`**: Định nghĩa TypeScript Interfaces (`StageData`, `BreathingStep`, `DailyStat`).
*   **`constants.ts`**: Dữ liệu tĩnh các bài tập và danh sách câu trích dẫn.

### 3.3. Hooks & Logic
*   **`hooks/useBreathingSound.ts`**: Hook tùy chỉnh quản lý âm thanh.
    *   Sử dụng `Howler` để preload và phát âm thanh.
    *   Âm thanh Hít vào: Tiếng chuông (Singing Bowl).
    *   Âm thanh Thở ra: Tiếng sóng/gió (Ocean/Wind).
    *   Quản lý trạng thái Mute/Unmute.
*   **`utils/db.ts`**: Layer tương tác với IndexedDB (Lưu Level, Lịch sử Session).

### 3.4. Thành phần Giao diện (Components)
*   **`BreathingGuide.tsx`**: Màn hình thực hành chính. Kết nối logic thời gian và âm thanh.
*   **`BreathingCircle.tsx`**: Hiển thị trực quan nhịp thở.
    *   Đồng bộ hóa animation vòng tròn với logic đếm ngược.
    *   Gửi tín hiệu (`onStepChange`) để kích hoạt âm thanh.
*   **`StageCard.tsx`**, **`StageDetail.tsx`**: Các thành phần hiển thị danh sách và chi tiết bài tập.
*   **`CustomBreathingBuilder.tsx`**: Modal tạo bài tập tùy chỉnh.
*   **`StatisticsDashboard.tsx`**: Modal báo cáo thống kê.

## 4. Luồng Hoạt động (Logic Flow)

1.  **Khởi động:**
    *   Vite khởi tạo ứng dụng, mount vào `#root`.
    *   Tải dữ liệu tiến trình từ IndexedDB.

2.  **Tập luyện & Âm thanh:**
    *   Khi vào bài tập, `useBreathingSound` preload file âm thanh.
    *   `BreathingCircle` chạy timer. Mỗi khi chuyển bước (Hít -> Nín -> Thở), nó gọi callback `onStepChange`.
    *   `BreathingGuide` nhận callback và kích hoạt `playInhale()` hoặc `playExhale()`.

3.  **Lưu trữ & Thống kê:**
    *   Kết thúc phiên tập -> Lưu vào IndexedDB.
    *   Cập nhật Streak và biểu đồ ngay lập tức.

## 5. Thay đổi gần nhất (Changelog)

*   **Migrate sang Vite:** Chuyển đổi từ cấu trúc HTML thuần/ImportMap sang kiến trúc Build chuẩn với Vite để hỗ trợ TypeScript tốt hơn và quản lý dependency dễ dàng.
*   **Sửa lỗi Mounting:** Thêm kiểm tra an toàn `document.getElementById('root')` trong `index.tsx` để tránh lỗi màn hình trắng.
*   **Tích hợp Howler.js:** Thêm lại tính năng âm thanh hướng dẫn với thư viện chuyên dụng, thay thế giải pháp cũ gây lag.
*   **Cập nhật TypeScript:** Thêm `@types/node` để sửa lỗi build trên Vercel/Node environment.

## 6. Hướng dẫn Cài đặt & Chạy (Dev)

```bash
# Cài đặt dependencies
npm install

# Chạy môi trường dev
npm run dev

# Build production
npm run build
```