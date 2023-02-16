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

function RenderResults() {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) => {
        const isSection = typeof item === 'string';
        const backgroundColor = prefersDarkScheme.matches ? '#000' : '#fff';
        const activeColor = prefersDarkScheme.matches ? '#333' : '#eee';
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
              {item}
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
            {item.name}
          </div>
        )
      }}
    />
  );
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkMode: prefersDarkScheme.matches,
    };
  }
  render () {
    console.info(getMessage(true))

    const isDarkMode = prefersDarkScheme.matches;
    const searchStyle = {
      padding: '12px 16px',
      fontSize: '16px',
      width: '100%',
      outline: 'none',
      border: 'none',
      background: isDarkMode ? '#000': 'rgba(255, 255, 255, 0.98)',
      color: 'var(--foreground)',
      borderBottom: '0.5px solid #f0f0f0',
    };
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
        <CommandButton />
      </KBarProvider>
    )
  }
}

render(<App />, document.getElementById('root'))
