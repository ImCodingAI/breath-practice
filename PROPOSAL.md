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

### 1.2. Hỗ trợ Dark Mode (Chế độ tối) - **ĐÃ HOÀN THÀNH**
*   **Trạng thái:** Đã triển khai (v1.1).

### 1.3. SEO & Open Graph
Cải thiện khả năng chia sẻ lên mạng xã hội.
*   **Giải pháp:** Sử dụng `react-helmet-async` để quản lý thẻ meta động cho từng màn hình.

## 2. Nâng cao Trải nghiệm Âm thanh (Audio Experience)

### 2.1. Nhạc nền (Ambient Soundscapes) - **ĐÃ HOÀN THÀNH**
Cho phép người dùng chọn âm thanh nền phát liên tục độc lập với nhịp thở.
*   **Trạng thái:** Đã triển khai (Mưa, Rừng, Lửa, Suối).

### 2.2. Dẫn giọng nói (Voice Guidance)
Thêm tùy chọn giọng nói đếm nhịp hoặc hướng dẫn lời (Guided Meditation).
*   *Ví dụ:* "Hít vào... 2... 3... 4", "Thả lỏng đôi vai...".

## 3. Mở rộng Tính năng & Nội dung (Features & Content)

### 3.1. Thêm các kỹ thuật thở nổi tiếng
Bổ sung thêm các bài tập chuẩn khoa học vào `constants.ts`:
*   **4-7-8 Breathing:** Kỹ thuật giúp ngủ ngon. (**ĐÃ HOÀN THÀNH**)
*   **Coherent Breathing:** Thở cộng hưởng (5.5 nhịp/phút). (**ĐÃ HOÀN THÀNH**)
*   **Kapalabhati:** Thở lửa (Yoga) giúp thanh lọc cơ thể (Level cao).

### 3.2. Hệ thống Huy hiệu (Gamification)
Khích lệ người dùng bằng các phần thưởng trực quan.
*   **Huy hiệu:** "Người dậy sớm" (Tập trước 7h sáng), "Kiên trì" (Chuỗi 7 ngày), "Bậc thầy Zen" (Tích lũy 1000 phút).
*   **Triển khai:** Lưu trạng thái unlock vào IndexedDB.

### 3.3. Nhật ký cảm xúc (Mood Tracker) - **ĐÃ HOÀN THÀNH**
Trước và sau khi tập, hỏi người dùng cảm thấy thế nào.
*   **Trạng thái:** Đã triển khai (v1.2).
*   **Mở rộng:** Hiển thị biểu đồ thay đổi tâm trạng trong Dashboard.

## 4. Quản lý Dữ liệu (Data Management)

### 4.1. Cloud Sync (Tùy chọn nâng cao)
*   **Giải pháp:** Tích hợp Firebase Auth và Firestore hoặc Supabase.
*   **Chức năng:** Đăng nhập Google để đồng bộ lịch sử tập luyện giữa điện thoại và máy tính.

### 4.2. Export/Import Dữ liệu
Cho phép người dùng xuất file JSON backup lịch sử tập luyện.

## 5. Kế hoạch thực hiện (Phased Plan)

*   **Giai đoạn 1 (Polish) - ĐÃ HOÀN THÀNH:**
    *   [x] Chế độ tối (Dark Mode).
    *   [x] Thêm bài tập 4-7-8.

*   **Giai đoạn 2 (Immersion) - ĐÃ HOÀN THÀNH:**
    *   [x] Nhạc nền (Ambient Sounds - Full Set).
    *   [x] Thở Cộng Hưởng (Coherent Breathing).

*   **Giai đoạn 3 (Engagement) - ĐANG THỰC HIỆN:**
    *   [x] Mood Tracker (Nhật ký cảm xúc).
    *   [ ] Hệ thống Huy hiệu (Gamification).
    *   [ ] Biểu đồ Mood trong Dashboard.

*   **Giai đoạn 4 (Scale):**
    *   [ ] PWA (Service Workers).
    *   [ ] Cloud Sync.

---
*Tài liệu này được cập nhật lần cuối ngày 24/05/2024.*
