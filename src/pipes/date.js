import moment from 'moment'

const ONE_DAY = 24 * 3600

export class DateValueConverter {
  toView(value, format) {
    const date = moment(value)

    if (Date.now() - date < ONE_DAY) {
      return date.fromNow()
    }

    return date.format(format || 'M/D/YYYY')
  }
}

