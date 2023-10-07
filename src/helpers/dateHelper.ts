import { type IDateTime } from 'megio-api/types'

const toCzDateTime = (dateTime: IDateTime) => {
    const date = dateTime.date.split(' ')
    const time = date[1].split('.')

    const [year, month, day] = date[0].split('-')
    const [hours, minutes, seconds] = time[0].split(':')

    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`
}

const dateHelper = () => {
    return {
        toCzDateTime
    }
}

export default dateHelper