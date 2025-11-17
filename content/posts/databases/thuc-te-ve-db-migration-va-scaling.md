# Ghi Chú Thực Tế về Database Migration và Scaling

Đây là tổng hợp các góp ý về hai quan niệm sai lầm phổ biến khi so sánh SQL và NoSQL.

---

## 1. Về Schema Migration (Thay đổi cấu trúc DB)

**Quan niệm sai:** Thay đổi schema trong SQL luôn gây downtime.

**Sự thật:** Downtime **phụ thuộc vào cách dev xử lý**, không phải là khác biệt cố hữu giữa SQL và NoSQL.

### Ví dụ về Kỹ thuật Migration

Giả sử cần thêm cột `wallet_balance`, và ứng dụng yêu cầu cột này không được `null`.

#### Cách gây Downtime (Thường làm ẩu)

- **Lệnh:** `ALTER TABLE ... ADD COLUMN wallet_balance ... DEFAULT 0;`
- **Hậu quả:** Database Engine phải **lock toàn bộ table** để cập nhật giá trị `0` cho _tất cả_ các row đã có. Nếu table lớn, điều này sẽ gây downtime.

#### Cách không gây Downtime (Zero-Downtime)

1.  **Bước 1:** Thêm cột mới dưới dạng `nullable` (cho phép `null`). Lệnh này chạy rất nhanh.
2.  **Bước 2:** Xử lý logic ở **tầng ứng dụng (application)**: Khi đọc dữ liệu, nếu cột này là `null` thì tự động coi nó là `0`.
3.  **Bước 3 (Optional):** Chạy một tiến trình ngầm (background job) để từ từ cập nhật giá trị `0` cho các row cũ mà không làm ảnh hưởng đến hệ thống.

**Kết luận:** Cả SQL và NoSQL đều cần kỹ thuật xử lý để migration không downtime.

---

## 2. Về Scaling (Mở rộng Ngang/Dọc)

**Quan niệm sai:** SQL chỉ scale dọc, NoSQL mới scale ngang.

**Sự thật:** Lựa chọn scale dọc hay ngang **phụ thuộc vào yêu cầu của business**, không phải do DB Engine. Cả hai hệ đều hỗ trợ nhiều kiểu scale.

### Các kiểu Scale phổ biến

- **1 Master / n Read Replicas:**
  - Bản chất vẫn là scale **dọc** (Vertical) cho các ứng dụng yêu cầu **ghi (write)** cao, vì mọi lệnh ghi vẫn phải đi qua 1 Master.
- **Multi-master:**
  - Là scale **ngang** (Horizontal).
  - **Thách thức:** Phải xử lý transaction conflict (ví dụ: 2 transaction cùng ghi vào 1 row ở 2 master khác nhau).
- **Sharding / Partitioning:**
  - Là scale **ngang** (Horizontal).
  - **Thách thức:** Dữ liệu bị phân mảnh, logic đọc/ghi sẽ phức tạp hơn.

---

## 3. Đọc thêm

- **CAP Theorem:** Nên tìm hiểu để hiểu rõ hơn về các cách triển khai dữ liệu trong hệ thống phân tán (distributed system).
- **Chốt lại:** Không có cách nào là hoàn hảo, chỉ có cách **phù hợp hơn** với bài toán cụ thể.
