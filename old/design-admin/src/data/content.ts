import type { SampleUser } from '@/types/page'

export const siteTitle = '仮想森林ボランティア協会'

export const sampleUsers: SampleUser[] = [
  {
    id: 1,
    name: '田中 太郎',
    email: 'tanaka@example.com',
    role: 'ADMIN',
    isEnabled: true,
    createdAt: '2025-04-01',
    biography: '事務局を担当しています。'
  },
  {
    id: 2,
    name: '佐藤 花子',
    email: 'sato@example.com',
    role: 'EDITOR',
    isEnabled: true,
    createdAt: '2025-06-12'
  },
  {
    id: 3,
    name: '山田 次郎',
    email: 'yamada@example.com',
    role: 'MEMBER',
    isEnabled: false,
    createdAt: '2026-01-20'
  },
  {
    id: 4,
    name: '鈴木 美咲',
    email: 'suzuki@example.com',
    role: 'MODERATOR',
    isEnabled: true,
    createdAt: '2025-11-03'
  }
]

export const roleLabel: Record<SampleUser['role'], string> = {
  ADMIN: '管理者',
  MODERATOR: 'モデレータ',
  EDITOR: '編集者',
  MEMBER: '一般メンバー'
}

export const userStats = [
  { label: '総ユーザ数', value: '128', note: '前月比 +12%', tone: 'blue' },
  { label: 'アクティブユーザ', value: '86', note: '直近30日間', tone: 'green' },
  { label: '新規登録', value: '14', note: '今月', tone: 'purple' },
  { label: 'コメント数', value: '42', note: '今月', tone: 'orange' }
] as const

export const adminStats = [
  { label: 'イベント管理', value: '9', note: '前月比 +2', tone: 'blue' },
  { label: 'ユーザ管理', value: '6', note: '前月比 +1', tone: 'green' },
  { label: 'システム設定', value: '3', note: '前月比 0', tone: 'purple' }
] as const

export interface ActivityItem {
  id: number
  label: string
  tone: 'pink' | 'indigo' | 'green' | 'blue'
  userName: string
  createdAt: string
  description: string
}

export const userActivities: ActivityItem[] = [
  {
    id: 1,
    label: 'イベント参加',
    tone: 'pink',
    userName: '佐藤 花子',
    createdAt: '2026/4/2 10:15',
    description: '春の植樹活動に参加しました'
  },
  {
    id: 2,
    label: 'プロフィール',
    tone: 'indigo',
    userName: '山田 次郎',
    createdAt: '2026/4/1 18:02',
    description: '自己紹介を更新しました'
  }
]

export const adminActivities: ActivityItem[] = [
  {
    id: 1,
    label: 'ユーザ管理',
    tone: 'green',
    userName: '田中 太郎',
    createdAt: '2026/4/3 9:40',
    description: '会員アカウントを有効化しました'
  },
  {
    id: 2,
    label: 'イベント管理',
    tone: 'blue',
    userName: '鈴木 美咲',
    createdAt: '2026/4/2 14:20',
    description: '講習会の予定を追加しました'
  }
]
