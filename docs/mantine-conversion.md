# Chuyển đổi sang Mantine UI

## Tổng quan

Tôi đã chuyển đổi các component blog từ sử dụng Tailwind CSS thuần sang sử dụng Mantine UI components để có giao diện đẹp hơn và nhất quán hơn.

## 🔄 Các thay đổi đã thực hiện

### 1. Blog Listing Page (`/blog`)

- **Container**: Chuyển từ `div` với Tailwind classes sang `Container` của Mantine
- **Title**: Sử dụng `Title` component thay vì `h1` với classes
- **Grid Layout**: Thay thế grid Tailwind bằng `Grid` và `Grid.Col` của Mantine
- **Cards**: Sử dụng `Card` component với built-in shadow và border
- **Typography**: Sử dụng `Text` component với proper sizing và colors
- **Badges**: Thay thế custom badge bằng `Badge` component của Mantine
- **Links**: Sử dụng `Anchor` component với Next.js Link integration

### 2. Individual Blog Post Page (`/blog/[slug]`)

- **Container**: Sử dụng `Container` với size="lg"
- **Paper**: Wrap content trong `Paper` component để có background và padding nhất quán
- **Stack**: Sử dụng `Stack` để layout vertical spacing
- **Title**: Sử dụng `Title` component thay vì `h1`
- **Badges**: Tags được hiển thị bằng `Badge` components
- **Divider**: Sử dụng `Divider` thay vì border classes
- **Back Link**: Styled với `Anchor` component

### 3. MDX Components (`mdx-components.tsx`)

- **Headings**: Tất cả headings (h1-h6) sử dụng `Title` component với các order khác nhau
- **Paragraphs**: Sử dụng `Text` component với proper line height
- **Links**: Internal và external links sử dụng `Anchor` component
- **Code Blocks**: Pre blocks sử dụng `Paper` component, inline code sử dụng `Code` component
- **Tables**: Sử dụng `Table` component với striped rows và borders
- **Blockquotes**: Sử dụng `Blockquote` component
- **Dividers**: Horizontal rules sử dụng `Divider` component

### 4. Next.js 15 Compatibility

- **Params Handling**: Cập nhật để handle async params trong Next.js 15
- **TypeScript Types**: Cập nhật interface để params là Promise type

## 🎨 Lợi ích của việc chuyển sang Mantine

### 1. **Tính nhất quán**

- Tất cả components đều có design system nhất quán
- Colors, spacing, và typography được standardized
- Dark mode support tự động

### 2. **Accessibility**

- Tất cả Mantine components đều có ARIA support built-in
- Keyboard navigation được handle tự động
- Screen reader friendly

### 3. **Responsive Design**

- Grid system responsive tự động
- Components tự động adapt với screen sizes
- Consistent breakpoints

### 4. **Developer Experience**

- TypeScript support đầy đủ
- IntelliSense tốt hơn
- Ít code hơn, readable hơn

## 🚀 Các tính năng mới

1. **Card Layout**: Blog posts được hiển thị trong cards với shadow và hover effects
2. **Grid System**: Responsive grid tự động adjust từ 1 column (mobile) đến 3 columns (desktop)
3. **Typography Hierarchy**: Consistent typography với proper heading hierarchy
4. **Color System**: Sử dụng Mantine color palette với support cho dark mode
5. **Spacing System**: Consistent spacing sử dụng Mantine spacing scale

## 📱 Responsive Behavior

- **Mobile (base)**: 1 column layout
- **Tablet (md)**: 2 columns layout
- **Desktop (lg+)**: 3 columns layout

## 🎯 Cách sử dụng

Sau khi chuyển đổi, bạn có thể:

1. **Truy cập blog**: http://localhost:3000/blog
2. **Đọc bài viết**: Click vào bất kỳ bài viết nào để xem chi tiết
3. **Responsive testing**: Thay đổi kích thước màn hình để xem responsive behavior
4. **Dark mode**: Chuyển đổi theme để thấy dark mode support

## 🔧 Customization

Để customize thêm, bạn có thể:

1. **Colors**: Thay đổi color scheme trong Mantine theme provider
2. **Spacing**: Adjust spacing values trong các components
3. **Typography**: Customize font sizes và weights
4. **Components**: Thêm custom Mantine components vào MDX

## 📝 Notes

- Tất cả styling hiện tại sử dụng Mantine props thay vì Tailwind classes
- Một số utility classes vẫn được giữ lại cho specific styling
- MDX content vẫn maintain khả năng hiển thị rich content với code highlighting
