import { ILink } from 'types'
import { getDate } from 'utils/date'

export const getLinkClicksCount = (link: ILink) => {
  const map = link.clicks.reduce((acc, curr) => {
    const clickDate = getDate(curr.clickedAt)
    if (acc.has(clickDate)) {
      return acc.set(clickDate, (acc.get(clickDate) || 0) + 1)
    }
    return acc.set(clickDate, 1)
  }, new Map<string, number>())
  return Array.from(map, ([date, clicks]) => ({ date, clicks }))
}
