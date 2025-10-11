// theme/utils.ts
export const makeScale = (hex: string) => [
  hex + 'E6', // 0 ~ 90% opacity
  hex + 'D9', // 1
  hex + 'CC', // 2
  hex + 'B3', // 3
  hex + '99', // 4
  hex + '80', // 5
  hex + '66', // 6
  hex + '4D', // 7
  hex + '33', // 8
  hex, // 9 ~ solid
];
// Lưu ý: cách này nhanh gọn dựa alpha; nếu muốn “đẹp chuẩn”, bạn có thể tự build thang HSL.
