import rehypePrettyCode from 'rehype-pretty-code';

// (Optional) config for rehype-pretty-code
export const prettyCodeOptions: Parameters<typeof rehypePrettyCode>[0] = {
  // theme can be a string or an object { light, dark }
  theme: {
    dark: 'github-dark',
    light: 'github-light',
  },
  keepBackground: false,
  // highlight lines via meta: ```ts {1,3-5}
  onVisitLine(node) {
    // Avoid empty lines collapsing to 0 height
    if (node.children.length === 0) node.children = [{ type: 'text', value: ' ' }];
  },
  onVisitHighlightedLine(node) {
    node.properties.className = (node.properties.className || []).concat('is-highlighted');
  },
  onVisitHighlightedChars(node) {
    node.properties.className = (node.properties.className || []).concat('is-word-highlighted');
  },
  // (Optional) strip custom meta
  // filterMetaString: (meta) => meta.replace(/title="[^"]*"/, ''),
};
