import { StageData } from './types';

/**
 * KHU VỰC CẤU HÌNH DỮ LIỆU (DATA CONFIGURATION)
 * Đây là "nguồn sự thật" (Source of Truth) cho nội dung ứng dụng.
 * Để thêm bài tập mới:
 * 1. Thêm object mới vào mảng này.
 * 2. Cập nhật type StageId trong file types.ts.
 */
export const STAGES_DATA: StageData[] = [
  {
    id: 1,
    title: 'Thở Bụng',
    description: 'Bài tập cơ bản giúp thư giãn cơ thể. Hít vào nhẹ nhàng và thở ra sâu.',
    color: 'bg-blue-100 dark:bg-blue-900', 
    benefits: [
      'Giảm căng thẳng tức thì',
      'Cải thiện chức năng phổi',
      'Hạ nhịp tim và ổn định huyết áp'
    ],
    instruction: 'Ngồi thẳng lưng hoặc nằm ngửa thoải mái. Đặt một tay lên ngực, một tay lên bụng để cảm nhận hơi thở.',
    steps: [
      // Chu kỳ: 4s Hít - 4s Thở
      { action: 'inhale', label: 'Hít vào', duration: 4, scale: 1.5 },
      { action: 'exhale', label: 'Thở ra', duration: 4, scale: 1.0 },
    ],
  },
  {
    id: 2,
    title: 'Cân Bằng',
    description: 'Kéo dài hơi thở ra để kích hoạt hệ thần kinh đối giao cảm, giúp bình tĩnh.',
    color: 'bg-emerald-100 dark:bg-emerald-900', 
    benefits: [
      'Cân bằng hệ thần kinh',
      'Giúp đi vào giấc ngủ dễ dàng hơn',
      'Giảm lo âu và bồn chồn'
    ],
    instruction: 'Ngồi xếp bằng hoặc trên ghế, giữ cột sống thẳng. Thả lỏng vai và nhắm nhẹ mắt lại.',
    steps: [
      // Chu kỳ: 4s Hít - 6s Thở (Tỷ lệ vàng để thư giãn)
      { action: 'inhale', label: 'Hít vào', duration: 4, scale: 1.5 },
      { action: 'exhale', label: 'Thở ra', duration: 6, scale: 1.0 },
    ],
  },
  {
    id: 3,
    title: 'Box Breathing',
    description: 'Kỹ thuật thở hộp giúp tăng cường sự tập trung và kiểm soát căng thẳng cực độ.',
    color: 'bg-indigo-100 dark:bg-indigo-900', 
    benefits: [
      'Tăng cường sự tập trung cao độ',
      'Kiểm soát cảm xúc mạnh',
      'Được lính đặc nhiệm Navy SEALs sử dụng'
    ],
    instruction: 'Tìm một nơi yên tĩnh. Ngồi vững chãi, hai tay đặt nhẹ lên đầu gối, giữ lưng thẳng như một mũi tên.',
    steps: [
      // Chu kỳ hộp: 4-4-4-4
      { action: 'inhale', label: 'Hít vào', duration: 4, scale: 1.5 },
      { action: 'hold', label: 'Nín thở', duration: 4, scale: 1.5 }, // Giữ hơi khi phổi đầy
      { action: 'exhale', label: 'Thở ra', duration: 4, scale: 1.0 },
      { action: 'hold', label: 'Nín thở', duration: 4, scale: 1.0 }, // Giữ hơi khi phổi rỗng
    ],
  },
  {
    id: 4,
    title: 'Thở 4-7-8',
    description: 'Phương pháp "thuốc an thần tự nhiên" giúp đi vào giấc ngủ trong vòng 60 giây.',
    color: 'bg-purple-100 dark:bg-purple-900', 
    benefits: [
      'Hỗ trợ điều trị mất ngủ hiệu quả',
      'Giảm cơn thèm ăn',
      'Kiểm soát phản ứng giận dữ'
    ],
    instruction: 'Đặt đầu lưỡi chạm vào nướu sau răng cửa trên. Thở ra mạnh bằng miệng tạo tiếng "phù".',
    steps: [
      // Chu kỳ 4-7-8
      { action: 'inhale', label: 'Hít vào', duration: 4, scale: 1.5 },
      { action: 'hold', label: 'Nín thở', duration: 7, scale: 1.5 }, 
      { action: 'exhale', label: 'Thở ra', duration: 8, scale: 1.0 },
    ],
  },
  {
    id: 5,
    title: 'Thở Cộng Hưởng',
    description: 'Kỹ thuật thở 5.5 nhịp/phút giúp tối ưu hóa biến thiên nhịp tim (HRV).',
    color: 'bg-rose-100 dark:bg-rose-900',
    benefits: [
      'Tăng cường khả năng phục hồi',
      'Tối ưu hóa trao đổi khí',
      'Cải thiện sự ổn định cảm xúc'
    ],
    instruction: 'Thở chậm, đều và nhịp nhàng. Không nín thở, tạo thành một vòng tròn liên tục.',
    steps: [
      // Chu kỳ 5.5s Hít - 5.5s Thở (Khoảng 11s/chu kỳ)
      { action: 'inhale', label: 'Hít vào', duration: 5.5, scale: 1.5 },
      { action: 'exhale', label: 'Thở ra', duration: 5.5, scale: 1.0 },
    ]
  }
];

/**
 * Danh sách trích dẫn hiển thị ngẫu nhiên khi hoàn thành bài tập.
 * Có thể thêm bao nhiêu câu tùy thích.
 */
export const INSPIRATIONAL_QUOTES = [
  "Bình yên đến từ bên trong. Đừng tìm nó bên ngoài. – Buddha",
  "Hơi thở là cầu nối giữa cơ thể và tâm trí. – Thích Nhất Hạnh",
  "Trong sự tĩnh lặng, bạn sẽ tìm thấy câu trả lời. – Deepak Chopra",
  "Hãy thở và để mọi thứ trôi đi. Chỉ khoảnh khắc này là thực sự tồn tại.",
  "Tâm trí tĩnh lặng mang lại sức mạnh nội tại vô hạn.",
  "Cảm nhận sự sống trong từng hơi thở vào và ra.",
  "Sự bình yên không phải là không có bão tố, mà là sự bình tĩnh giữa bão tố."
];