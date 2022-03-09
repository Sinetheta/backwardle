import { useCallback, useEffect } from 'react';

import './ShareSnippet.css';

function translateMarkdownEnojis(markdown) {
  return markdown
    .replaceAll(':black_large_square:', '⬛')
    .replaceAll(':white_large_square:', '⬜')
    .replaceAll(':large_yellow_square:', '🟨')
    .replaceAll(':large_green_square:', '🟩');
}

function ShareSnippet({ snippet, onPaste }) {
  const handleUserPaste = useCallback(event => {
    event.preventDefault();
    let clipText = (event.clipboardData || window.clipboardData).getData('text');
    let smsText = translateMarkdownEnojis(clipText);
    onPaste(smsText);
  }, [onPaste]);

  useEffect(() => {
    window.addEventListener("paste", handleUserPaste);
    return () => {
      window.removeEventListener("paste", handleUserPaste);
    };
  }, [handleUserPaste]);

  return (
    <div className="ShareSnippet">
      <button onClick={async () => {
        const text = await navigator.clipboard.readText();
        if (text)
          onPaste(text);
      }}>
        <div className="ShareSnippet-prompt">Paste Shared Wordle</div>
      </button>
      <div id='pasted-result' className="showLineBreaks">{snippet}</div>
    </div>
  );
}

export default ShareSnippet;
