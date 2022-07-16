export function getMessage(nameString) {
  const messages = [
    `Hello there, it's good to see you!`,
    `sup?`,
    `hey, i'm watching you `,
    `Nothing to see here, move along.`,
    `Congratulations! You've discovered the console ;)`,
    `i knew you'd find this Easter egg eventually...`,
  ]
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  return randomMessage
}

export const toCapitalCase = (string) => string.charAt(0).toUpperCase() + string.slice(1)
