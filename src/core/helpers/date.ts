const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]

export const prettifyDate = (date: string): string => {  // Formatting date from "2024-01-01" to "01 Jan. 2024"
  const [year, month, day]: string[] = date.split("-")

  return `${day} ${monthNames[parseInt(month) - 1]}. ${year}`
}

export const parseDate = (date: string): string => {  // Formatting date from "01 Jan. 2024" to "2024-01-01"
  let [day, month, year]: string[] = date.split(" ")

  month = month.slice(0, month.length - 1)

  return `${year}-0${monthNames.indexOf(month) + 1}-${day}`
}

