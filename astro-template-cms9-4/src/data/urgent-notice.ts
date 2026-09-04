export interface UrgentNotice {
  date: string
  title: string
  href: string
}

export const urgentNotice: UrgentNotice | null = {
  date: '4/15',
  title: '春の植樹祭は雨天中止',
  href: '/news'
}
