

const App = () => {
  const history = useHistory();
  return (
    <KBarProvider
      actions={[
        {
          id: "searchDocsAction",
          name: "Search docs…",
          shortcut: [],
          keywords: "find",
          section: "",
          children: ["docs1", "docs2"],
        },
        {
          id: "homeAction",
          name: "Home",
          shortcut: ["h"],
          keywords: "back",
          section: "Navigation",
          perform: () => history.push("/"),
        },
        {
          id: "docsAction",
          name: "Docs",
          shortcut: ["d"],
          keywords: "help",
          section: "Navigation",
          perform: () => history.push("/docs"),
        },
        {
          id: "contactAction",
          name: "Contact",
          shortcut: ["c"],
          keywords: "email hello",
          section: "Navigation",
          perform: () => window.open("mailto:timchang@hey.com", "_blank"),
        },
        {
          id: "twitterAction",
          name: "Twitter",
          shortcut: ["t"],
          keywords: "social contact dm",
          section: "Navigation",
          perform: () => window.open("https://twitter.com/timcchang", "_blank"),
        },
        {
          id: "docs1",
          name: "Docs 1 (Coming soon)",
          shortcut: [],
          keywords: "Docs 1",
          section: "",
          perform: () => window.alert("nav -> Docs 1"),
          parent: "searchBlogAction",
        },
        {
          id: "docs2",
          name: "Docs 2 (Coming soon)",
          shortcut: [],
          keywords: "Docs 2",
          section: "",
          perform: () => window.alert("nav -> Docs 2"),
          parent: "searchBlogAction",
        },
        {
          id: "theme",
          name: "Change theme…",
          shortcut: [],
          keywords: "interface color dark light",
          section: "",
          children: ["darkTheme", "lightTheme"],
        },
        {
          id: "darkTheme",
          name: "Dark",
          shortcut: [],
          keywords: "dark",
          section: "",
          perform: () =>
            document.documentElement.setAttribute("data-theme-dark", ""),
          parent: "theme",
        },
        {
          id: "lightTheme",
          name: "Light",
          shortcut: [],
          keywords: "light",
          section: "",
          perform: () =>
            document.documentElement.removeAttribute("data-theme-dark"),
          parent: "theme",
        },
      ]}
      options={{
        animations: {
          enterMs: 200,
          exitMs: 100,
          maxContentHeight: 400,
        },
      }}
    >
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
          style={searchStyles}
          placeholder="Type a command or search…"
        />
        <KBarResults
          onRender={(action, handlers, state) => (
            <Render
              key={action.id}
              action={action}
              handlers={handlers}
              state={state}
            />
          )}
        />
      </KBarContent>
      <Layout>
        <Switch>
          <Route path="/docs">
            <Docs />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Layout>
    </KBarProvider>
  );
};
