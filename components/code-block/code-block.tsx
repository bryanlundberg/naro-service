import React, { useState, useMemo } from 'react';
import { CopyIcon, CheckIcon } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'javascript',
  showLineNumbers = true,
  className,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast('Code copied to clipboard');

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  // Split code into lines for line numbering
  const codeLines = code.split('\n');

  // No syntax highlighting - using consistent text color
  const highlightCode = useMemo(() => {
    if (language !== 'javascript') return null;

    // Just return the code lines without any syntax highlighting
    return codeLines.map((line) => line);
  }, [code, language, codeLines]);

  return (
    <div className={cn(
      "relative group rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-md",
      className
    )}>
      {/* Language indicator */}
      {language && (
        <div className="absolute top-2 right-12 px-2 py-1 text-xs font-mono text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 rounded">
          {language}
        </div>
      )}

      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
        aria-label="Copy code"
      >
        {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
      </button>

      {/* Code container */}
      <div className="bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-950 p-4 pt-10 overflow-x-auto">
        <pre className="font-mono text-sm">
          {showLineNumbers ? (
            <div className="flex">
              {/* Line numbers */}
              <div className="select-none pr-4 text-neutral-400 dark:text-neutral-600 text-right">
                {codeLines.map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>

              {/* Code content */}
              <code className="flex-1">
                {codeLines.map((line, i) => (
                  <div key={i} className="whitespace-pre">
                    {line || ' '}
                  </div>
                ))}
              </code>
            </div>
          ) : (
            // All code uses the same styling
            <code className="whitespace-pre-wrap">{code}</code>
          )}
        </pre>
      </div>

    </div>
  );
};

export default CodeBlock;
