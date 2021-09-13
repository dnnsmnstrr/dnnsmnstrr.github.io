import React, { Component } from 'react'
import { render } from 'react-dom'
import { KBarProvider, KBarContent, KBarResults, KBarSearch } from 'kbar'

const toCapitalCase = (string) => string.charAt(0).toUpperCase() + string.slice(1)

const goTo = (pathname) => () => (window.location.pathname = pathname)
const toId = (id) => ({ id })
const shortcuts = []
const expandAction = ({ id, name, shortcut, keywords, perform }) => {
  if ((!shortcut || !shortcut.length)) {
    shortcut = [id.charAt(0)]
  }
  if (!shortcuts.includes(shortcut[0])) {
    shortcuts.push(...shortcut)
  } else {
    console.error(`shortcut ${shortcut} already exists! try a different one for ${id}`)
    shortcut = null
  }
  return {
    id,
    shortcut,
    keywords,
    name: name || toCapitalCase(id),
    perform: perform || goTo(id)
  }
}

const pages = ['about', 'projects', 'work'].map(toId)
const actions = [
  ...pages,
  { id: 'telegram' },
  {
    id: 'redirects',
    shortcut: 'h',
    keywords: 'help, ls, list',
    perform: goTo`help`
  },
  {
    id: 'contact',
    keywords: 'email',
    perform: goTo`contact`
  },
  {
    id: 'zettelkasten',
    shortcut: ['z'],
    keywords: 'notes, zettel, slipbox, knowledge, wiki'
  },
  {
    id: 'back',
    name: 'Go Back',
    keywords: 'previous, last, history',
    perform: () => window.history.back(),
    section: 'navigation'
  },
  {
    id: 'forward',
    name: 'Go Forward',
    keywords: 'next',
    perform: () => window.history.forward(),
    section: 'navigation'
  }
].map(expandAction)

class App extends Component {
  render () {
    return (
      <KBarProvider
        actions={actions}
        options={{
          animations: {
            enterMs: 200,
            exitMs: 100,
            maxContentHeight: 400
          }
        }}
      >
        <KBarContent>
          <KBarSearch />
          <KBarResults />
        </KBarContent>
      </KBarProvider>
    )
  }
}

render(<App />, document.getElementById('root'))
