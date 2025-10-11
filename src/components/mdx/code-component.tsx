import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export interface CodeComponentProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
}

export const CodeComponent: React.FC<CodeComponentProps> = ({
  className,
  children,
  ...properties
}) => {
  const language = className ? className.replace(/language-/, '') : undefined;

  return (
    <SyntaxHighlighter style={dark} language={language} PreTag="div">
      {children as string}
    </SyntaxHighlighter>
  );
};
