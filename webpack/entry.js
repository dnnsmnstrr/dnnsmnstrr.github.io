import React, { Component } from 'react'
import { render } from 'react-dom'
import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  KBarResults,
  useMatches,
  useKBar
 } from 'kbar'
import { getMessage, toCapitalCase } from './helper'

const goTo = (pathname) => () => (window.location.pathname = pathname)
const toId = (id) => ({ id })
const shortcuts = []
const expandAction = ({ id, name, shortcut, keywords, perform, ...restAction }) => {

  if (shortcut && !Array.isArray(shortcut)) {
    shortcut = [shortcut]
  }

  return {
    id,
    shortcut,
    keywords,
    name: name || toCapitalCase(id),
    perform: perform || goTo(id),
    ...restAction
  }
}

const pages = ['about', 'projects', 'work'].map(toId)
const actions = [
  ...pages,
    {
    id: 'zettelkasten',
    shortcut: ['z', 'k'],
    keywords: 'notes, zettel, slipbox, knowledge, wiki'
  },
  {
    id: 'github',
    shortcut: ['g', 'h'],
    keywords: 'github, git, source, code, repository',
    perform: goTo`github`
  },
  // Contact
  {
    id: 'contact',
    shortcut: '@',
    keywords: 'email',
    perform: goTo`contact`
  },
  {
    id: 'spotify',
    shortcut: ['s', 'p'],
    keywords: 'music, playlist, song, artist, album, track, listen, listen to, play, play music, play song, play artist, play album, play track, listen to music, listen to song, listen to artist, listen to album, listen to track, listen to playlist',
    section: 'Links',
  },
  { id: 'telegram', section: 'Links' },
  { id: 'linkedin', section: 'Links' },
  { id: 'twitter', section: 'Links' },
  { id: 'instagram', section: 'Links' },
  // Utilities
  {
    id: 'help',
    shortcut: '?',
    keywords: 'help, ls, list',
    perform: goTo`help`
  },
  {
    id: 'status',
    name: 'Status',
    shortcut: ['u', 't'],
    keywords: 'status s uptime',
    section: 'Utilities',
    perform: goTo`uptime`
  },
  {
    id: 'sourcecode',
    name: 'Source Code',
    shortcut: ['s', 'c'],
    keywords: 'source code s',
    section: 'Utilities',
    perform: () => window.open('https://github.com/dnnsmnstrr/dnnsmnstrr.github.io/', '_blank'),
  },
  // Navigation
  {
    id: 'back',
    name: 'Go Back',
    keywords: 'previous, last, history',
    perform: () => window.history.back(),
    section: 'Navigation'
  },
  {
    id: 'forward',
    name: 'Go Forward',
    keywords: 'next',
    perform: () => window.history.forward(),
    section: 'Navigation'
  },
  {
    id: 'reload',
    perform: () => window.location.reload(),
    shortcut: ['r', 'l'],
    keywords: 'refresh, update',
    section: 'Navigation'
  }
].map(expandAction)

actions.push({
  id: 'easter-egg',
  name: ' ',
  keywords: 'hello, hidden, easter, egg',
  perform: () => alert(getMessage())
})

const searchStyle = {
  padding: '12px 16px',
  fontSize: '16px',
  width: '100%',
  outline: 'none',
  border: 'none',
  background: 'rgba(255, 255, 255, 0.98)',
  color: 'var(--foreground)',
  borderBottom: '0.5px solid #f0f0f0',
};

const animatorStyle = {
  maxWidth: '600px',
  width: '100%',
  height: '300px',
  background: 'var(--background)',
  color: 'var(--foreground)',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0px 7px 29px 0px rgba(100, 100, 111, 0.2) ',
};

function RenderResults() {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) => {
        const isSection = typeof item === 'string';
        if (isSection) {
          return (
            <div
              style={{
                fontWeight: 'bold',
                padding: '10px',
                background: active ? '#eee' : '#fff',
              }}
            >
              {item}
            </div>
          )
        }
        return (
          <div
            style={{
              padding: '10px',
              background: active ? '#eee' : '#fff',
            }}
          >
            {item.name}
          </div>
        )
      }}
    />
  );
}

const Button = ({ children, onClick }) => {
  const { query } = useKBar();
  return (
    <button
      onClick={() => query.toggle()}
      style={{
        marginLeft: 8,
        padding: '8px',
        background: '#ddd',
        color: '#444',
        fontSize: 20,
        border: 'none',
        borderRadius: '8px',
        outline: 'none',
        cursor: 'pointer',
      }}
    >
      ⌘k
    </button>
  )
}
class App extends Component {
  render () {
    console.info(getMessage(true))
    return (
      <KBarProvider actions={actions} options={{
        disableScrollbarManagement: true,
      }}>
        <KBarPortal>
          <KBarPositioner>
            <KBarAnimator style={animatorStyle}>
              <KBarSearch style={searchStyle}/>
              <RenderResults />
            </KBarAnimator>
          </KBarPositioner>
        </KBarPortal>
        <Button />
      </KBarProvider>
    )
  }
}

render(<App />, document.getElementById('root'))
