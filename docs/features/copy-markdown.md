# Copy as Markdown & Share Feature

## Tổng quan

Tính năng "Copy & Share" cho phép người dùng sao chép nội dung bài viết blog dưới dạng markdown an toàn và chia sẻ bài viết lên các nền tảng mạng xã hội như Facebook, Threads, và Twitter.

## Tính năng chính

### 1. **Copy Options (Các tùy chọn copy)**

- **Copy as Markdown**: Copy đầy đủ với frontmatter
- **Copy Markdown (No Frontmatter)**: Chỉ copy nội dung markdown
- **Copy as Plain Text**: Copy dạng text thuần túy (loại bỏ markdown syntax)
- **Copy as HTML**: Copy dưới dạng HTML markup

### 2. **Share Options (Chia sẻ)**

- **Facebook**: Chia sẻ link bài viết lên Facebook
- **Threads**: Chia sẻ lên Threads (Instagram)
- **Twitter**: Chia sẻ lên Twitter/X

### 3. **Sanitization (Khử độc)**

- Loại bỏ các thẻ `<script>` và nội dung bên trong
- Loại bỏ các event handler nguy hiểm (onclick, onerror, etc.)
- Loại bỏ protocol `javascript:` trong links
- Loại bỏ data URIs nguy hiểm (giữ lại hình ảnh an toàn)
- Loại bỏ `<iframe>`, `<object>`, `<embed>` tags
- Loại bỏ các thẻ `<style>` có thể chứa expressions nguy hiểm

### 2. **Copy Functionality**

- Hỗ trợ Clipboard API hiện đại
- Fallback cho các trình duyệt cũ
- Toast notifications khi copy thành công/thất bại
- Visual feedback (icon thay đổi, màu sắc)
- Loading state trong khi xử lý

### 3. **Validation**

- Kiểm tra nội dung markdown trước khi copy
- Cảnh báo người dùng nếu phát hiện nội dung nguy hiểm
- Tự động sanitize trước khi copy

## Cách sử dụng

### Basic Usage

```tsx
import { CopyMarkdownButton } from 'app/components/ui';

function MyComponent() {
  const markdown = '# Hello World\n\nThis is my content';

  return <CopyMarkdownButton markdown={markdown} />;
}
```

### With Frontmatter

```tsx
import { CopyMarkdownButton } from 'app/components/ui';

function BlogPost() {
  const markdown = '# My Post\n\nContent here...';
  const frontmatter = {
    title: 'My Blog Post',
    date: '2025-01-15',
    tags: ['nextjs', 'react'],
  };

  return <CopyMarkdownButton markdown={markdown} frontmatter={frontmatter} />;
}
```

### Icon-only Button

```tsx
import { CopyMarkdownIconButton } from 'app/components/ui';

function CompactView() {
  return <CopyMarkdownIconButton markdown={markdownContent} tooltipText="Copy markdown" />;
}
```

### Advanced Usage with Callbacks

```tsx
import { CopyMarkdownButton } from 'app/components/ui';

function AdvancedExample() {
  const handleCopySuccess = () => {
    console.log('Markdown copied successfully!');
    // Analytics tracking
  };

  const handleCopyError = (error: Error) => {
    console.error('Copy failed:', error);
    // Error reporting
  };

  return (
    <CopyMarkdownButton
      markdown={content}
      frontmatter={metadata}
      variant="filled"
      size="md"
      onCopySuccess={handleCopySuccess}
      onCopyError={handleCopyError}
      validateSafety={true}
    />
  );
}
```

## Component Props

### CopyMarkdownButton

| Prop             | Type                                                        | Default              | Description                         |
| ---------------- | ----------------------------------------------------------- | -------------------- | ----------------------------------- |
| `markdown`       | `string`                                                    | required             | Nội dung markdown cần copy          |
| `frontmatter`    | `any`                                                       | optional             | Metadata (frontmatter) của bài viết |
| `variant`        | `'filled' \| 'light' \| 'outline' \| 'subtle' \| 'default'` | `'light'`            | Kiểu hiển thị của button            |
| `size`           | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                      | `'sm'`               | Kích thước button                   |
| `buttonText`     | `string`                                                    | `'Copy as Markdown'` | Text hiển thị trên button           |
| `showIcon`       | `boolean`                                                   | `true`               | Hiển thị icon hay không             |
| `validateSafety` | `boolean`                                                   | `true`               | Kiểm tra an toàn trước khi copy     |
| `onCopySuccess`  | `() => void`                                                | optional             | Callback khi copy thành công        |
| `onCopyError`    | `(error: Error) => void`                                    | optional             | Callback khi copy thất bại          |

### CopyMarkdownIconButton

Tương tự `CopyMarkdownButton` nhưng chỉ hiển thị icon, không có text.

## Utility Functions

### sanitizeMarkdown(markdown: string)

Khử độc nội dung markdown, loại bỏ các element nguy hiểm.

```typescript
import { sanitizeMarkdown } from 'app/utils';

const safe = sanitizeMarkdown(unsafeMarkdown);
```

### prepareMarkdownForCopy(markdown: string, frontmatter?: any)

Chuẩn bị markdown để copy, bao gồm sanitization và formatting.

```typescript
import { prepareMarkdownForCopy } from 'app/utils';

const prepared = prepareMarkdownForCopy(markdown, frontmatter);
```

### validateMarkdownSafety(markdown: string)

Kiểm tra xem markdown có an toàn không, trả về warnings nếu có.

```typescript
import { validateMarkdownSafety } from 'app/utils';

const { isSafe, warnings } = validateMarkdownSafety(markdown);
if (!isSafe) {
  console.warn('Unsafe content:', warnings);
}
```

## File Structure

```
src/
├── components/
│   └── ui/
│       ├── copy-markdown-button.tsx  # Copy button component
│       └── index.ts                   # Re-exports
├── utils/
│   ├── markdown-sanitizer.ts         # Sanitization utilities
│   └── index.ts                       # Re-exports
├── lib/
│   └── mdx/
│       └── mdx.ts                     # Updated to include rawMarkdown
└── sections/
    └── post/
        └── view/
            └── blog-detail-view.tsx  # Integrated copy button
```

## Security Features

### Sanitization Process

1. **Script Removal**: Loại bỏ tất cả `<script>` tags
2. **Event Handler Removal**: Loại bỏ inline event handlers (onclick, onerror, etc.)
3. **Protocol Filtering**: Chặn `javascript:` và `data:` URIs nguy hiểm
4. **Tag Filtering**: Loại bỏ `<iframe>`, `<object>`, `<embed>`, unsafe `<style>`
5. **Whitespace Normalization**: Chuẩn hóa line endings và khoảng trắng

### Safety Validation

Trước khi copy, hệ thống:

- Kiểm tra các pattern nguy hiểm
- Cảnh báo người dùng qua notifications
- Tự động sanitize nội dung

## Examples

### Example 1: Basic Blog Post

```tsx
// In blog-detail-view.tsx
<CopyMarkdownButton
  markdown={post.rawMarkdown}
  frontmatter={post.frontmatter}
  variant="light"
  size="sm"
/>
```

### Example 2: Custom Styling

```tsx
<CopyMarkdownButton
  markdown={content}
  variant="filled"
  size="lg"
  buttonText="Sao chép Markdown"
  onCopySuccess={() => {
    // Custom analytics
    trackEvent('markdown_copy');
  }}
/>
```

### Example 3: Icon Only in Toolbar

```tsx
<Group>
  <ShareButton />
  <CopyMarkdownIconButton markdown={content} tooltipText="Sao chép markdown" />
  <BookmarkButton />
</Group>
```

## Testing

To test the feature:

1. Navigate to any blog post
2. Click the "Copy as Markdown" button
3. Paste into any markdown editor
4. Verify the content includes frontmatter and is properly formatted
5. Check that no unsafe content is included

## Browser Compatibility

- ✅ Modern browsers (Chrome 87+, Firefox 90+, Safari 14+)
- ✅ Fallback support for older browsers
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- [ ] Thêm tùy chọn copy format (với/không frontmatter)
- [ ] Hỗ trợ copy từng section
- [ ] Tích hợp với share APIs
- [ ] Export as file option
- [ ] Custom sanitization rules

## Troubleshooting

### Button không hoạt động

- Kiểm tra xem `markdown` prop có được truyền vào không
- Kiểm tra console để xem có lỗi không

### Notifications không hiển thị

- Đảm bảo `Notifications` component đã được thêm vào MantineProvider
- Kiểm tra CSS import của `@mantine/notifications`

### Content bị cắt hoặc mất format

- Kiểm tra xem sanitization có quá aggressive không
- Review `sanitizeMarkdown` function để adjust rules

## Support

Nếu gặp vấn đề, vui lòng:

1. Kiểm tra console logs
2. Verify browser compatibility
3. Check notification setup
4. Review markdown content structure
