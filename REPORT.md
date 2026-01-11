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
| **Styling** | Tailwind CSS 3.4 | Thiết kế giao diện nhanh, Responsive, Utility-first. Hỗ trợ **Dark Mode**. |
| **Audio Engine** | **Howler.js** | Xử lý âm thanh đa kênh: dẫn nhịp (Cue) và nhạc nền (Ambient). |
| **Animation** | Framer Motion | Hiệu ứng chuyển động mượt mà cho vòng tròn hít thở và UI. |
| **Icons** | Lucide React | Hệ thống icon nhẹ, đồng bộ. |
| **Charts** | Recharts | Vẽ biểu đồ thống kê quá trình tập luyện. |
| **Database** | IndexedDB (Native) | Lưu trữ dữ liệu cục bộ (offline-first) không cần Backend. |
| **Time Handling** | Date-fns | Xử lý logic ngày tháng, tính toán chuỗi ngày (streak). |

## 3. Cấu trúc Mã nguồn

### 3.1. Cấu hình & Build (Configuration)
*   **`vite.config.ts`**: Cấu hình Vite Server và Plugin React.
*   **`tailwind.config.js`**: Cấu hình theme và animation cho Tailwind, kích hoạt `darkMode: 'class'`.
*   **`package.json`**: Quản lý dependencies và scripts (dev, build, preview).

### 3.2. Các tệp tin chính (Core Files)
*   **`App.tsx`**: Component gốc. Quản lý trạng thái toàn cục (Theme, Navigation), điều phối luồng giữa Dashboard và Breathing Guide.
*   **`types.ts`**: Định nghĩa TypeScript Interfaces (`StageData`, `BreathingStep`, `DailyStat`, `MoodValue`).
*   **`constants.ts`**: Dữ liệu tĩnh các bài tập (Bao gồm Thở Cộng Hưởng) và danh sách câu trích dẫn.

### 3.3. Hooks & Logic
*   **`hooks/useBreathingSound.ts`**: Hook tùy chỉnh quản lý âm thanh.
    *   **Cue Sounds:** Hít vào (Singing Bowl), Thở ra (Ocean/Wind).
    *   **Ambient Sounds:** Nhạc nền (Mưa, Rừng, Lửa, Suối) phát lặp lại (Loop).
    *   Quản lý trạng thái Mute/Unmute và chuyển đổi nguồn âm thanh mượt mà (Fade).
*   **`utils/db.ts`**: Layer tương tác với IndexedDB (Lưu Level, Lịch sử Session và Mood).

### 3.4. Thành phần Giao diện (Components)
*   **`BreathingGuide.tsx`**: Màn hình thực hành chính. Tích hợp Mood Tracker (Trước/Sau) và menu âm thanh.
*   **`BreathingCircle.tsx`**: Hiển thị trực quan nhịp thở. Tối ưu màu sắc cho cả chế độ Sáng/Tối.
*   **`StageCard.tsx`**, **`StageDetail.tsx`**: Các thành phần hiển thị danh sách và chi tiết bài tập.
*   **`CustomBreathingBuilder.tsx`**: Modal tạo bài tập tùy chỉnh.
*   **`StatisticsDashboard.tsx`**: Modal báo cáo thống kê.

## 4. Luồng Hoạt động (Logic Flow)

1.  **Khởi động:**
    *   Vite khởi tạo ứng dụng.
    *   Tải dữ liệu tiến trình từ IndexedDB.

2.  **Tập luyện:**
    *   **Bước 1: Mood Check-in:** Người dùng chọn trạng thái cảm xúc hiện tại (Icon/Label).
    *   **Bước 2: Practice:** Vòng tròn thở và âm thanh dẫn nhịp. Người dùng có thể bật nhạc nền (Lửa, Suối...).
    *   **Bước 3: Mood Check-out:** Đánh giá lại cảm xúc sau khi tập.
    *   **Bước 4: Lưu trữ:** Dữ liệu thời gian và Mood được lưu vào IndexedDB.

## 5. Thay đổi gần nhất (Changelog)

*   **Tính năng mới (New Features):**
    *   **Mood Tracker:** Tính năng Nhật ký cảm xúc giúp người dùng tự đánh giá hiệu quả buổi tập.
    *   **Mở rộng Âm thanh:** Thêm tiếng Lửa trại (Fire) và Suối chảy (Stream).
    *   **Bài tập mới:** Thở Cộng Hưởng (Coherent Breathing) - Stage 5.
*   **Cải tiến (Improvements):**
    *   **UX:** Quy trình tập luyện chia thành các bước rõ ràng (Check-in -> Tập -> Check-out).
    *   **Dark Mode:** Tối ưu hóa hiển thị cho các icon cảm xúc mới.

## 6. Hướng dẫn Cài đặt & Chạy (Dev)

```bash
# Cài đặt dependencies
npm install

# Chạy môi trường dev
npm run dev

# Build production
npm run build
```