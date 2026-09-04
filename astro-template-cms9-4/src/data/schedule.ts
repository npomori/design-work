export interface Outing {
  date: string
  title: string
  place: string
  href: string
}

export const upcomingOutings: Outing[] = [
  {
    date: '4/15',
    title: '春の植樹祭',
    place: '奥多摩町 森林公園',
    href: '/schedule'
  },
  {
    date: '4/22',
    title: '森林整備活動',
    place: '秩父市 森林整備エリア',
    href: '/schedule'
  },
  {
    date: '5/1',
    title: '新入会員の現場見学',
    place: '高尾山 自然観察路',
    href: '/schedule'
  }
]
