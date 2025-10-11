// lib/mdx/remark-collect-headings.ts
import { visit } from 'unist-util-visit';
import Slugger from 'github-slugger';
import { toString } from 'mdast-util-to-string';

export type HeadingItem = { depth: number; value: string; slug: string };

export type IndexedHeading = HeadingItem & { index: string };
export function remarkCollectHeadings(headings: HeadingItem[]) {
  const slugger = new Slugger();
  return () => (tree: any, file: any) => {
    visit(tree, 'heading', (node: any) => {
      const depth = node.depth ?? 0;
      if (depth < 2 || depth > 4) return; // lấy H2–H4
      const text = toString(node).trim();
      const slug = slugger.slug(text);
      headings.push({ depth, value: text, slug });
    });
    file.data.headings = headings;
  };
}

export function indexHeadings(headings: HeadingItem[]): IndexedHeading[] {
  const counters: Record<number, number> = {}; // lưu bộ đếm cho từng cấp
  const result: IndexedHeading[] = [];

  for (const h of headings) {
    // reset các cấp thấp hơn
    counters[h.depth] = (counters[h.depth] ?? 0) + 1;
    // xóa các cấp sâu hơn (depth > hiện tại)
    Object.keys(counters)
      .map(Number)
      .filter((d) => d > h.depth)
      .forEach((d) => delete counters[d]);

    // tạo chỉ mục: ghép các cấp từ 1..depth
    const index = Array.from({ length: h.depth }, (_, i) => counters[i + 1] ?? 0)
      .filter((n) => n > 0)
      .join('.');

    result.push({ ...h, index });
  }

  console.log(result);

  return result;
}
