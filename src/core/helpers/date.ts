import { Showtime, Option } from "../../interfaces"

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

export const isDateInPast = (date: string): boolean => {
  const currentDate = new Date()
  const showtimeDate = new Date(date)
  return showtimeDate < currentDate
}

export const getDateOptions = (showtimes: Showtime[]): Option[] => {
  const uniqueDates = [...new Set(showtimes.map((showtime) => showtime.date.split("T")[0]))]
  return uniqueDates.map((uniqueDate, key) => ({ id: key, name: prettifyDate(uniqueDate) }))
}

export const formatShowtimeDate = (date: string): string => {
  const time = new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  return time.replace(/\s/g, "")
}
