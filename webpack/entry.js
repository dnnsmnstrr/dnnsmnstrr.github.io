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
 } from 'kbar'
import { getMessage, prefersDarkScheme } from './helper'
import CommandButton from './CommandButton'
import actions from './actions'

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

function RenderResults({ isDarkMode }) {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) => {
        const isSection = typeof item === 'string';
        const backgroundColor = isDarkMode ? '#000' : '#fff';
        const activeColor = isDarkMode ? '#333' : '#eee';
        const textColor = isDarkMode ? '#fff' : '#000';
        if (item.hidden) return <div />;
        if (isSection) {
          return (
            <div
              style={{
                fontWeight: 'bold',
                padding: '10px',
                background: active ? activeColor : backgroundColor,
              }}
            >
              <span style={{ color: textColor }}>{item}</span>
            </div>
          )
        }
        return (
          <div
            style={{
              padding: '10px',
              background: active ? activeColor : backgroundColor,
            }}
          >
            <span style={{ color: textColor }}>{item.name}</span>
          </div>
        )
      }}
    />
  );
}


class App extends Component {
  constructor(props) {
    super(props);
    const defaultTheme = localStorage.getItem("theme") === 'dark' || prefersDarkScheme.matches;
    this.state = {
      isDarkMode: defaultTheme,
    };
  }

  componentDidMount() {
    const theme = localStorage.getItem("theme");
    console.log('theme', theme)
    this.setState({ isDarkMode: theme === "dark" });
    if (theme === 'light' && !document.body.classList.contains("light-theme")) {
      document.body.classList.toggle("light-theme");
    }
  }
  render () {
    console.info(getMessage(true))

    const searchStyle = {
      padding: '12px 16px',
      fontSize: '16px',
      width: '100%',
      outline: 'none',
      border: 'none',
      background: this.state.isDarkMode ? '#000': 'rgba(255, 255, 255, 0.98)',
      color: 'var(--foreground)',
      borderBottom: '0.5px solid #f0f0f0',
    };

    const onToggleDarkMode = (state) => {
      document.body.classList.toggle("light-theme");
      localStorage.setItem("theme", this.state.isDarkMode ? "light" : "dark");
      this.setState({ isDarkMode: !this.state.isDarkMode });
    };

    const darkModeAction =   {
      id: 'dark-mode',
      name: 'Toggle Dark Mode',
      shortcut: ['d', 'm'],
      keywords: 'dark mode, toggle dark mode, dark theme, toggle dark theme',
      perform: () => {
        onToggleDarkMode();
        // Then save the choice in localStorage
      }
    }
    const extendedActions = [...actions, darkModeAction]
    return (
      <KBarProvider actions={extendedActions} options={{
        disableScrollbarManagement: true,
      }}>
        <KBarPortal>
          <KBarPositioner>
            <KBarAnimator style={animatorStyle}>
              <KBarSearch style={searchStyle}/>
              <RenderResults isDarkMode={this.state.isDarkMode} />
            </KBarAnimator>
          </KBarPositioner>
        </KBarPortal>
        <CommandButton />
      </KBarProvider>
    )
  }
}

render(<App />, document.getElementById('root'))
