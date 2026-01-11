# ĐỀ XUẤT CẢI TIẾN & LỘ TRÌNH PHÁT TRIỂN (ROADMAP)

Tài liệu này phác thảo các đề xuất nhằm nâng cấp ứng dụng **Hơi Thở Tĩnh Lặng** từ một phiên bản Web App cơ bản thành một sản phẩm hoàn thiện, chuyên nghiệp và có khả năng giữ chân người dùng cao hơn.

## 1. Nâng cấp Kỹ thuật (Technical Improvements)

### 1.1. Progressive Web App (PWA) - **Ưu tiên cao**
Hiện tại ứng dụng hoạt động tốt trên trình duyệt, nhưng để tạo thói quen cho người dùng, ứng dụng cần hoạt động như một Native App trên điện thoại.
*   **Giải pháp:** Sử dụng `vite-plugin-pwa`.
*   **Lợi ích:**
    *   Cho phép cài đặt icon lên màn hình chính (Installable).
    *   Hoạt động Offline 100% (Service Workers cache assets).
    *   Gửi thông báo nhắc nhở tập luyện (Push Notifications).

### 1.2. Hỗ trợ Dark Mode (Chế độ tối)
Người dùng thường thực hiện các bài tập thở vào buổi tối hoặc trước khi ngủ. Giao diện sáng hiện tại có thể gây chói mắt.
*   **Giải pháp:** Cấu hình Tailwind `darkMode: 'class'` và thêm context quản lý Theme.
*   **Triển khai:** Chuyển đổi màu nền sang Slate-900/950 và text sang Slate-200.

### 1.3. SEO & Open Graph
Cải thiện khả năng chia sẻ lên mạng xã hội.
*   **Giải pháp:** Sử dụng `react-helmet-async` để quản lý thẻ meta động cho từng màn hình.
*   **Chi tiết:** Thêm ảnh preview khi share link Facebook/Zalo.

## 2. Nâng cao Trải nghiệm Âm thanh (Audio Experience)

Hiện tại ứng dụng chỉ có âm thanh báo hiệu (Cue sounds). Để tăng hiệu quả thư giãn, cần tách biệt các lớp âm thanh:

### 2.1. Nhạc nền (Ambient Soundscapes)
Cho phép người dùng chọn âm thanh nền phát liên tục độc lập với nhịp thở.
*   **Thư viện:** Mở rộng `Howler.js`.
*   **Nội dung:** Tiếng mưa (Rain), Tiếng rừng (Forest), Tiếng lửa trại (Fire), Tiếng ồn trắng (White Noise).
*   **UI:** Thêm thanh trượt volume riêng cho nhạc nền và nhạc báo hiệu.

### 2.2. Dẫn giọng nói (Voice Guidance)
Thêm tùy chọn giọng nói đếm nhịp hoặc hướng dẫn lời (Guided Meditation).
*   *Ví dụ:* "Hít vào... 2... 3... 4", "Thả lỏng đôi vai...".

## 3. Mở rộng Tính năng & Nội dung (Features & Content)

### 3.1. Thêm các kỹ thuật thở nổi tiếng
Bổ sung thêm các bài tập chuẩn khoa học vào `constants.ts`:
*   **4-7-8 Breathing:** Kỹ thuật giúp ngủ ngon của Dr. Andrew Weil.
*   **Kapalabhati:** Thở lửa (Yoga) giúp thanh lọc cơ thể (Level cao).
*   **Coherent Breathing:** Thở cộng hưởng (5.5 nhịp/phút).

### 3.2. Hệ thống Huy hiệu (Gamification)
Khích lệ người dùng bằng các phần thưởng trực quan.
*   **Huy hiệu:** "Người dậy sớm" (Tập trước 7h sáng), "Kiên trì" (Chuỗi 7 ngày), "Bậc thầy Zen" (Tích lũy 1000 phút).
*   **Triển khai:** Lưu trạng thái unlock vào IndexedDB.

### 3.3. Nhật ký cảm xúc (Mood Tracker)
Trước và sau khi tập, hỏi người dùng cảm thấy thế nào.
*   **Mục đích:** Giúp người dùng nhìn thấy hiệu quả rõ rệt của bài tập đối với tâm trạng của họ thông qua biểu đồ.

## 4. Quản lý Dữ liệu (Data Management)

### 4.1. Cloud Sync (Tùy chọn nâng cao)
Hiện tại dữ liệu chỉ lưu trên thiết bị (IndexedDB). Nếu người dùng đổi máy, dữ liệu sẽ mất.
*   **Giải pháp:** Tích hợp Firebase Auth và Firestore hoặc Supabase.
*   **Chức năng:** Đăng nhập Google để đồng bộ lịch sử tập luyện giữa điện thoại và máy tính.

### 4.2. Export/Import Dữ liệu
Nếu không dùng Cloud, cho phép người dùng xuất file JSON backup lịch sử tập luyện.

## 5. Kế hoạch thực hiện (Phased Plan)

*   **Giai đoạn 1 (Polish):** PWA + Dark Mode + Thêm bài tập 4-7-8.
*   **Giai đoạn 2 (Immersion):** Thêm Ambient Sounds + Voice Guide.
*   **Giai đoạn 3 (Engagement):** Hệ thống Huy hiệu + Mood Tracker.
*   **Giai đoạn 4 (Scale):** Cloud Sync + Social Share.

---
*Tài liệu này được tạo ngày 24/05/2024 bởi Đội ngũ Phát triển.*
