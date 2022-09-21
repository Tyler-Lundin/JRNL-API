// BgGreen = "\x1b[42m"
// Reset = "\x1b[0m"
export const isListeningOn = (PORT: string | number) => () =>
  console.log('\x1b[42m', `Server is running on port ${PORT}`, '\x1b[0m')
