import { toCapitalCase, prefersDarkScheme, getMessage } from './helper'

const goTo = (pathname) => () => (window.location.pathname = pathname)
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

const toPageAction = (id) => ({ id, shortcut: ['g', id[0]] })
const pages = ['about', 'projects', 'work', 'notes'].map(toPageAction)

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
    keywords: 'github, git, source, code, repository, developer',
    perform: goTo`github`
  },
  // Contact
  {
    id: 'contact',
    shortcut: '@',
    keywords: 'email',
    perform: goTo`contact`
  },
  // Links
  {
    id: 'spotify',
    shortcut: ['s', 'p'],
    keywords: 'music, playlist, song, artist, album, track, listen, listen to, play, play music, play song, play artist, play album, play track, listen to music, listen to song, listen to artist, listen to album, listen to track, listen to playlist',
    section: 'Links',
  },
  { id: 'telegram', section: 'Links', shortcut: ['t', 'g'] },
  { id: 'linkedin', section: 'Links', shortcut: ['g', 'l'] },
  { id: 'twitter', section: 'Links', shortcut: ['g', 't'] },
  { id: 'instagram', section: 'Links', shortcut: ['g', 'i'] },
  { id: 'google', section: 'Links', shortcut: ['g', 'g'], hidden: true },
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
    id: 'imprint',
    shortcut: ['i', 'm'],
    keywords: 'imprint, legal, privacy, terms, conditions, disclaimer, data protection, data privacy, data protection policy, data privacy policy, privacy policy, terms and conditions, legal notice, impressum',
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
    id: 'home',
    shortcut: ['g', '/'],
    keywords: 'home, index, main, start, beginning, first, landing, root',
    perform: goTo`/`,
    section: 'Navigation'
  },
  {
    id: 'markprompt',
    name: 'Chat',
    shortcut: ['g', 'c'],
    keywords: 'markprompt, query notes, chatbot',
    perform: goTo`chat`
  },
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
  },
].map(expandAction)

actions.push({
  id: 'easter-egg',
  name: ' ',
  keywords: 'hello, hidden, easter, egg',
  shortcut: ['a', 's', 'd', 'f'],
  perform: () => alert(getMessage())
})

export default actions