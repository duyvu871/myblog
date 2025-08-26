# 1. Prepare before starting the project

## 1.1 Define goals

- Dự án này để học tập như một pet project và để có thể đưa vào sử dụng trong phạm vi gia đình
- Mục tiêu:
    - **Tổng quát:** xây dựng hệ thống quản lý học sinh cho hộ kinh doanh
    - **Feature:**
        - **Student Management**:
            - **Student Profile (Hồ sơ học sinh):** Thông tin cá nhân, liên hệ phụ huynh, trường đang học.
            - **Class Placement (Phân lớp):** Ghi nhận lớp học sinh tham gia, trình độ, lịch học.
            - **Attendance Tracking (Điểm danh):** Đi học / vắng mặt, có phép / không phép.
            - **Performance (Kết quả học tập):** Điểm kiểm tra, nhận xét từ giáo viên.
            - **Enrollment History (Lịch sử tham gia):** Học sinh đã tham gia những lớp nào, thời gian bao lâu.
        - **Classroom & Teacher Management:**
            - **Class Management (Tạo / quản lý lớp học):** Thông tin lớp, môn học, lịch học, sĩ số.
            - **Teacher Assignment (Phân công giáo viên):** Quản lý giáo viên dạy lớp nào, thời khóa biểu.
            - **Class Progress Tracking (Theo dõi tiến độ lớp):** Học sinh đăng ký, tình trạng hoạt động lớp.
            - **Teaching Material Management (Quản lý tài liệu):** Bài tập, tài liệu giảng dạy upload theo lớp.
        - **Tuition & Finance Management:**
            - **Tuition Fee Management (Quản lý học phí):** Tính toán học phí theo số buổi / gói đăng ký.
            - **Payment Tracking (Theo dõi thanh toán):** Ai đã đóng, ai còn nợ.
            - **Invoice & Receipt Generation (Hóa đơn & biên lai):** Xuất hóa đơn cho phụ huynh.
            - **Financial Reports (Báo cáo tài chính):** Tổng hợp thu/chi theo lớp, theo tháng.
        - **Class schedule & announcements:**
            - **Timetable (Thời khóa biểu):** Lịch dạy của giáo viên, lịch học của từng học sinh.
            - **Announcements (Thông báo):** Thông báo thay đổi lịch học, nghỉ học, thông báo đóng học phí.
            - **Automated Reminders (Nhắc nhở tự động):** Gửi SMS/email/Zalo khi gần đến hạn đóng học phí hoặc có buổi học mới.
        - **Reports & Statistics:**
            - **Student/Class Statistics (Thống kê số học sinh / lớp học):** Theo tháng, theo môn học.
            - **Attendance Rate (Tỷ lệ chuyên cần):** Ai đi học đầy đủ, ai thường xuyên nghỉ.
            - **Learning Effectiveness (Hiệu quả lớp học):** So sánh kết quả học tập, tiến bộ học sinh.
        - **System Administration:**
            - **Role-based Access Control (Phân quyền):** Admin, giáo viên, phụ huynh, học sinh.
            - **Data Security (Bảo mật):** Đảm bảo dữ liệu cá nhân được an toàn.
            - **Data Backup (Sao lưu dữ liệu):** Định kỳ backup thông tin.

## 1.2 Scope and requirements

- **Core feature:**
    - **Authentication (Xác thực):** Đăng ký/đăng nhập, oauth, reset mật khẩu, MFA (tùy chọn), bảo vệ rate-limit.
    - **Authorization (Phân quyền):** RBAC (Admin/Teacher/Parent/Student), phân quyền theo màn hình & hành động.
    - **Student Management (Quản lý học sinh):**
        - Hồ sơ học sinh, liên hệ phụ huynh/guardian, trạng thái hoạt động.
        - Class placement, lịch sử ghi danh (enrollment history).
        - Gắn nhãn/nhóm (tags) để lọc nhanh.
    - **Teacher Management (Quản lý giáo viên):**
        - Hồ sơ giáo viên, chuyên môn/môn dạy.
        - Phân công lớp, tải trọng giảng dạy (teaching load).
    - **Class Management (Quản lý lớp):**
        - Tạo/sửa/xóa lớp, môn học, sĩ số tối đa.
        - Lịch học (timetable), phòng học, trạng thái lớp.
    - **Enrollment (Ghi danh):**
        - Thêm/xóa học sinh vào lớp, ngày bắt đầu/kết thúc.
        - Quy tắc ghi danh (đụng lịch, vượt sĩ số, trùng lớp).
    - **Attendance Tracking (Điểm danh):**
        - Đi học/vắng mặt, có phép/không phép, ghi chú lý do.
        - Tổng hợp chuyên cần theo buổi/lớp/học sinh.
    - **Assessment & Performance (Bài kiểm tra & kết quả):**
        - Tạo bài kiểm tra, nhập điểm, rubric nhận xét.
        - Theo dõi tiến bộ theo thời gian (progress tracking).
    - **Tuition & Billing (Học phí & hóa đơn):**
        - Cấu hình gói học/đơn giá theo buổi/tháng.
        - Tạo hóa đơn cho thu học phí
    - **Scheduling (Lịch & thời khóa biểu):**
        - Lịch lớp, lịch dạy giáo viên, lịch học từng học sinh.
        - Phát hiện trùng lịch/phòng.
    - **Notifications (Thông báo):**
        - Email/SMS/Zalo OA (tuỳ chọn tích hợp).
        - Mẫu thông báo: đổi lịch, nghỉ học, nhắc học phí, điểm danh.
    - **Reports & Analytics (Báo cáo & phân tích):**
        - Sĩ số, chuyên cần, doanh thu, công nợ, hiệu quả lớp.
        - Xuất CSV/PDF.
    - **Parent/Student Portal (Cổng phụ huynh/học sinh):**
        - Xem lịch, điểm danh, điểm số, hóa đơn, tài liệu lớp.
    - **Content & Materials (Tài liệu giảng dạy):**
        - Upload/đính kèm tài liệu theo lớp/buổi.
        - Phân quyền truy cập tài liệu.
    - **Audit Log & Activity (Nhật ký hoạt động):**
        - Ghi lại thao tác quan trọng (tạo/sửa/xóa, thanh toán).
    - **Settings (Thiết lập hệ thống):**
        - Năm học/kỳ học, múi giờ, mẫu số hóa đơn.
        - Cấu hình học phí, chính sách điểm danh, mẫu thông báo (sẽ phát triển trong tương lai).
    - **Data Import/Export (Nhập/Xuất dữ liệu):**
        - Import học sinh/lớp từ CSV/Excel.
        - Export danh sách, báo cáo.
    - **Backup & Security (Sao lưu & bảo mật):**
        - Backup định kỳ, mã hóa dữ liệu nhạy cảm, chính sách mật khẩu.
        - 2FA/MFA (tùy chọn), giới hạn phiên, đăng xuất từ xa.
    - 

## 1.3 Tools & Tech Stack (Công cụ & Stack)

- **Frontend & Fullstack Framework:**
    - **Next.js 15** (App Router, React Server Components, SSR/SSG, Route Handlers)
    - **React 19** (Actions, useOptimistic, use, Server Components support)
- **UI & State Management:**
    - **Mantine** (UI library: component phong phú, themeable)
    - **Jotai** (state management nhẹ cho client state)
    - **React Query (TanStack Query)** *(tùy chọn, nếu cần quản lý server state nhiều)*
- **Authentication & Authorization:**
    - **Auth.js (NextAuth)** – login via email/password hoặc OAuth providers (Google, Facebook, v.v.)
    - **RBAC (Role-based access control)** cho phân quyền (Admin, Teacher, Parent, Student)
- **Database & ORM:**
    - **PostgreSQL (Supabase)** – CSDL chính, host trên Supabase
    - **Prisma ORM** – code-first schema, migration, type-safe queries
- **Validation & Type Safety:**
    - **Zod** – validation schema cho input/output, kết hợp Prisma và form handling
- **Caching & Performance:**
    - **Upstash Redis** – caching dữ liệu, rate limiting, pub/sub cho real-time notifications
- **Deployment & Infrastructure:**
    - **Vercel** – deploy frontend + API routes (Next.js serverless functions)
    - **Supabase** – database hosting + storage (nếu cần lưu file)
    - **Upstash** – Redis hosting serverless
    - **CI/CD:** Tích hợp sẵn từ Vercel (auto deploy theo branch)
- **Development Tools:**
    - **VSCode** với extensions: Prisma, ESLint, Prettier, Tailwind IntelliSense
    - **Git + GitHub** – version control, project management
    - **Postman / Hoppscotch** – test API
    - **GitHub Projects / Notion** – quản lý task, roadmap

## 1.4 Kiến trúc & Cấu trúc dự án

Tài liệu mô tả cách tổ chức mã nguồn, quy ước đặt tên, ranh giới module và cách áp dụng **Next.js 15 + React 19 + Auth.js + Prisma + Postgres (Supabase) + Upstash Redis + Zod + Jotai + Mantine**.

### A. Tổng quan kiến trúc

**Mục tiêu:**

- Tách rõ **module tính năng** (học sinh, lớp học, tài chính…) và **hạ tầng chung** (auth, db, ui, lib).
- Tận dụng **React Server Components** và **Server Actions**, giảm thiểu state phía client bằng **Jotai**.
- Xác thực dữ liệu với **Zod** ở mọi điểm vào/ra.
- **RBAC** xử lý ở server (route handlers, actions).
- **Redis** cho cache và rate limit; **Prisma** là lớp truy cập DB duy nhất.

**Luồng xử lý:**

1. Request vào `/app` → 2. Fetch dữ liệu bằng RSC/Server Action → 3. Validate với Zod → 4. Xử lý nghiệp vụ qua Prisma → 5. Cache/invalid bằng Redis → 6. Trả dữ liệu về client.

---

### B. Cấu trúc thư mục

```
.
├─ app/                 # App Router
│  ├─ (dashboard)/      # Khu vực sau đăng nhập
│  │  ├─ students/      # Quản lý học sinh
│  │  ├─ classes/       # Quản lý lớp
│  │  ├─ billing/       # Học phí & thanh toán
│  │  └─ ...
│  ├─ api/              # Route handlers (nếu cần)
│  └─ auth/             # Auth.js
├─ features/            # Module nghiệp vụ
│  ├─ students/         # actions, schemas, queries
│  ├─ classes/
│  ├─ billing/
│  └─ ...
├─ components/          # UI tái sử dụng (Mantine)
├─ lib/                 # Tiện ích chung (auth, db, redis, validation)
├─ store/               # Jotai atoms cho UI state
├─ prisma/              # Schema & migrations
├─ scripts/             # Seed, tool dev
└─ styles/              # CSS

```

**Nguyên tắc:**

- `/features` giữ logic nghiệp vụ → `/app` chỉ tập trung UI.
- `/lib` tập trung các phần tích hợp (db, auth, redis).
- Server Actions nằm trong `/features/<module>/actions.ts`.

---

### C. Quy ước đặt tên

- File/thư mục: `kebab-case`.
- TypeScript type: `PascalCase`.
- Schema Zod: hậu tố `Schema`.
- Server Actions: đặt theo động từ (`createStudent`, `updateStudent`).

---

### D. RSC & Client Component

- **RSC**: trang, view chỉ đọc, SEO.
- **Client**: form, tương tác, UI state (Jotai, Mantine).
- Dùng **Server Actions** cho mutate để giữ an toàn và giảm round-trip.

---

### E. Data & Validation

- **Prisma**: kết nối Supabase/Postgres.
- **Zod**: validate input/output.
- Cache query nặng bằng Redis, invalidate bằng `revalidateTag`.

---

### F. Xác thực & Phân quyền

- **Auth.js** xử lý đăng nhập/đăng ký.
- **RBAC** qua role: ADMIN, TEACHER, PARENT, STUDENT.
- Policies tập trung trong `/lib/rbac.ts`.

---

### G. UI & State

- **Mantine** cho UI.
- **Jotai** chỉ quản lý state giao diện (sidebar, filter…).
- Dữ liệu server fetch bằng RSC/Actions.

---

### H. Quản lý môi trường

- Dùng Zod để validate biến môi trường (`env.ts`).
- `.env.local` cho dev, ENV trên Vercel cho production.

---

### I. CI/CD & Triển khai

- Deploy trên **Vercel**.
- `prisma migrate deploy` trong build step.
- Script cơ bản:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && next build",
    "migrate:dev": "prisma migrate dev",
    "migrate:deploy": "prisma migrate deploy",
    "seed": "tsx scripts/seed.ts"
  }
}

```

---

### J. Checklist bắt đầu

1. Khởi tạo Next.js 15 project.
2. Cài deps: next, react 19, mantine, jotai, zod, prisma, upstash/redis, next-auth.
3. Cấu hình Prisma + Supabase, chạy migrate.
4. Thiết lập Auth.js, seed user admin.
5. Làm tính năng Học sinh (CRUD) end-to-end.
6. Thêm RBAC, Redis cache.
7. Deploy Vercel, set ENV, migrate.
8. Bổ sung lớp, ghi danh, điểm danh, học phí