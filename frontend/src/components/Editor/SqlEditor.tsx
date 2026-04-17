import { useState, useRef } from "react";

interface SqlEditorProps {
  onRun: (query: string) => void;
  isLoading?: boolean;
}

export const SqlEditor = ({ onRun, isLoading }: SqlEditorProps) => {
  const [query, setQuery] = useState("");
  const [cursorPos, setCursorPos] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCursorMove = () => {
    if (textareaRef.current) {
      setCursorPos(textareaRef.current.selectionStart);
    }
  };

  const highlightAndInjectCursor = (code: string) => {
    // 1. Escape HTML special characters to prevent XSS/Bugs
    let safeCode = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // 2. Insert the Cursor Marker at the correct position if focused
    const textWithMarker = isFocused 
      ? safeCode.slice(0, cursorPos) + "█" + safeCode.slice(cursorPos)
      : safeCode;

    // 3. Highlighting Logic
    const keywords = [
      "SELECT", "FROM", "JOIN", "ON", "WHERE", "AND", "OR",
      "ORDER BY", "LIMIT", "DESC", "ASC", "LEFT JOIN", "GROUP BY"
    ];

    // Create a regex that matches any keyword, case-insensitive (\bi)
    const regex = new RegExp(`\\b(${keywords.join("|")})\\b`, "gi");

    // Replace keywords while PRESERVING the original case (e.g., Select stays Select)
    let highlighted = textWithMarker.replace(regex, (matched) => {
      return `<span class="text-primary font-bold">${matched}</span>`;
    });

    // 4. Style strings (text inside ' ')
    highlighted = highlighted.replace(/'(.*?)'/g, '<span class="text-green-400">\'$1\'</span>');

    // 5. Replace the marker with the actual glowing cursor
    const cursorHtml = `<span class="inline-block w-[2px] h-[1.1em] bg-primary shadow-[0_0_12px_#FF8C00] align-middle animate-pulse mx-[1px]"></span>`;
    
    return highlighted.replace("█", cursorHtml);
  };

  return (
    <div className="bg-surface-container rounded-lg overflow-hidden flex flex-col shadow-2xl border border-surface-bright/5">
      {/* Editor Header */}
      <div className="px-4 py-3 bg-surface-high/30 flex justify-between items-center border-b border-surface-bright/10">
        <div className="flex items-center gap-2">
           <div className="flex gap-1.5 mr-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/40" />
           </div>
           <span className="font-mono text-[10px] text-on-surface-variant/40 tracking-[0.2em]">QUERY_EDITOR.SQL</span>
        </div>
      </div>

      {/* Editor Surface */}
      <div 
        className="bg-surface-lowest p-6 min-h-[300px] font-mono text-sm relative group cursor-text"
        onClick={() => textareaRef.current?.focus()}
      >
        <div className="flex gap-6 h-full min-h-[250px]">
          {/* Line Numbers */}
          <div className="text-on-surface-variant/20 select-none text-right w-5 leading-6 border-r border-surface-bright/10 pr-4 italic">
            {query.split("\n").map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>

          <div className="relative flex-1 leading-6">
            {/* Display Layer */}
            <div
              className="absolute inset-0 pointer-events-none whitespace-pre-wrap break-words text-white/90 z-10"
              dangerouslySetInnerHTML={{
                __html: highlightAndInjectCursor(query),
              }}
            />

            {/* Input Layer */}
            <textarea
              ref={textareaRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCursorPos(e.target.selectionStart);
              }}
              onKeyUp={handleCursorMove}
              onClick={handleCursorMove}
              onSelect={handleCursorMove}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              spellCheck={false}
              className="absolute inset-0 bg-transparent text-transparent caret-transparent outline-none resize-none w-full h-full whitespace-pre-wrap break-words z-20 overflow-hidden"
            />
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="p-4 flex flex-col gap-4 bg-background/40 backdrop-blur-sm border-t border-surface-bright/10">
        <div className="flex justify-between items-center">
            <button
              onClick={() => onRun(query)}
              disabled={isLoading}
              className={`min-w-[160px] bg-gradient-to-r from-primary to-primary-container text-black font-bold py-2.5 rounded uppercase tracking-[0.1em] text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:shadow-[0_0_20px_rgba(255,140,0,0.3)]"}`}
            >
              {isLoading ? <span className="animate-spin">◌</span> : <><span>▶</span> RUN QUERY</>}
            </button>
        </div>
        <p className="text-[13px] text-on-surface-variant/40 italic flex items-center gap-2">
          <span className="text-primary opacity-60">TIP:</span> Use standard SQL syntax. The visualizer supports JOINs and WHERE clauses.
        </p>
      </div>
    </div>
  );
};

export default SqlEditor;