import fs from 'fs'

export const WriteToFile = (message: string) => {
  const date = new Date()
  const fileName = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}.log`
  const logsDirectory = `${__dirname}/../logs`
  const pre = `[ ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ]`

  fs.appendFile(`${logsDirectory}/${fileName}`, `\n${pre} ${message}\n`, (err) => {
    if (err) throw err
  })
}
