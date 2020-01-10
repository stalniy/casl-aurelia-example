import { format, isToday, formatDistanceToNow } from 'date-fns'

export class DateValueConverter {
  toView(value, format) {
    const date = new Date(value)

    if (isToday(date)) {
      return formatDistanceToNow(date)
    }

    return format(date, format || 'M/D/YYYY')
  }
}
