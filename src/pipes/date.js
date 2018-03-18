import { format, isToday, distanceInWordsToNow } from 'date-fns'

export class DateValueConverter {
  toView(value, format) {
    const date = new Date(value)

    if (isToday(date)) {
      return distanceInWordsToNow(date)
    }

    return format(date, format || 'M/D/YYYY')
  }
}
