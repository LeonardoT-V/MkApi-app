export function formatDateTime(date) {
  const dateTime = new Date(date)
  const formatedMinutes = formatNumberDate(dateTime.getMinutes())
  const formatTime = `${formatNumberDate(dateTime.getDate())}-${formatNumberDate(
    dateTime.getMonth() + 1
  )}-${formatNumberDate(dateTime.getFullYear())}_${formatNumberDate(
    dateTime.getHours()
  )}:${formatedMinutes}:${formatNumberDate(dateTime.getSeconds())}`
  const separatedName = formatTime.split('_')
  return {
    date: separatedName[0],
    time: separatedName[1]
  }
}

export function formatNumberDate(value) {
  if (value <= 9) {
    return `0${value}`
  }
  return value
}
