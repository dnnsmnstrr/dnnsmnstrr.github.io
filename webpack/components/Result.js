import React, { useEffect } from 'react'

const Result = ({ action, handlers, state }) => {
  const ownRef = React.useRef<HTMLDivElement>(null);

  const active = state.index === state.activeIndex;

  useEffect(() => {
    if (active) {
      // wait for the KBarContent to resize, _then_ scrollIntoView.
      // https://medium.com/@owencm/one-weird-trick-to-performant-touch-response-animations-with-react-9fe4a0838116
      window.requestAnimationFrame(() =>
        window.requestAnimationFrame(() => {
          const element = ownRef.current;
          if (!element) {
            return;
          }
          // @ts-ignore
          element.scrollIntoView({
            block: "nearest",
            behavior: "smooth",
            inline: "start",
          });
        })
      );
    }
  }, [active]);

  return (
    <div
      ref={ownRef}
      {...handlers}
      style={{
        padding: "12px 16px",
        background: active ? "var(--a1)" : "var(--background)",
        borderLeft: `2px solid ${active ? "var(--foreground)" : "transparent"}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "pointer",
      }}
    >
      <span>{action.name}</span>
      {action.shortcut?.length ? (
        <kbd
          style={{
            padding: "4px 6px",
            background: "rgba(0 0 0 / .1)",
            borderRadius: "4px",
          }}
        >
          {action.shortcut}
        </kbd>
      ) : null}
    </div>
  );
}

export default Result
