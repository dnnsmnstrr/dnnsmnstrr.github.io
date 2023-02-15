const getRandomItem = (list) => {
  return list[Math.floor(Math.random() * list.length)]
}
export function getMessage(console = false) {
  const messages = [
    `Hello there, it's good to see you!`,
    `sup?`,
    `hey, i'm watching you `,
    `Nothing to see here, move along.`,
    `i knew you'd find this eventually...`,
    `I'm not sure what you're expecting to find here, but you won't find it.`,
    `This ain't it, chief.`,
    `You're not supposed to be here.`,
    `Move along, nothing to see here.`,
  ]
  const consoleMessages = [
    `Congratulations! You've discovered the console ;)`,
    `You're a developer, you know what to do.`,
    `Hack the planet!`,
    `Have you tried turning it off and on again?`,
    ...messages
  ]
  const randomMessage = getRandomItem(console ? consoleMessages : messages)
  return randomMessage
}

export const toCapitalCase = (string) => string.charAt(0).toUpperCase() + string.slice(1)
