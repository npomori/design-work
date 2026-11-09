/** 管理画面サンプルで切り替える画面 */
export type AdminPage = 'catalog' | 'dashboard' | 'users'

export type UserRole = 'ADMIN' | 'MODERATOR' | 'EDITOR' | 'MEMBER'

export interface SampleUser {
  id: number
  name: string
  email: string
  role: UserRole
  isEnabled: boolean
  createdAt: string
  biography?: string
}
