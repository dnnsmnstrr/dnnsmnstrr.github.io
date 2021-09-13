import * as React from "react"
import { KBarContent, KBarResults, KBarSearch } from 'kbar'
import Result from './Result'
// const searchStyles = {
//   padding: "12px 16px",
//   fontSize: "16px",
//   width: "100%",
//   boxSizing: "border-box",
//   outline: "none",
//   border: "none",
//   background: "var(--background)",
//   color: "var(--foreground)",
// };

const SearchBar = () => {
  return (
    <KBarContent
      contentStyle={{
        maxWidth: "400px",
        width: "100%",
        background: "var(--background)",
        color: "var(--foreground)",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "var(--shadow)",
      }}
    >
      <KBarSearch
        placeholder="Type a command or search…"
      />
      <KBarResults
        onRender={(action, handlers, state) => <Result key={action.id} {...{ action, handlers, state}}/>}
      />
    </KBarContent>
  )
}

export default SearchBar
