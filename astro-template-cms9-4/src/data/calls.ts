export interface OpenCall {
  date: string
  title: string
  place: string
  note: string
  href: string
}

export const openCalls: OpenCall[] = [
  {
    date: '4月',
    title: '森林大学 受講生',
    place: '協会研修センター',
    note: '定員30',
    href: '/university'
  },
  {
    date: '随時',
    title: '安全な森林作業の基礎',
    place: '各種講習会',
    note: '定員15',
    href: '/lectures'
  }
]
