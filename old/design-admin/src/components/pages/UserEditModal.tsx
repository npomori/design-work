import Alert from '@/components/base/Alert'
import Button from '@/components/base/Button'
import InitialsAvatar from '@/components/base/InitialsAvatar'
import type { SampleUser, UserRole } from '@/types/page'
import { type FormEvent, useState } from 'react'

interface UserEditModalProps {
  user: SampleUser
  onClose: () => void
}

const roles: { value: UserRole; label: string }[] = [
  { value: 'MEMBER', label: '一般メンバー' },
  { value: 'EDITOR', label: '編集者' },
  { value: 'MODERATOR', label: 'モデレータ' },
  { value: 'ADMIN', label: '管理者' }
]

/**
 * 見本用のランダムパスワードを作る。
 */
function generatePassword(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789'
  return Array.from({ length: 10 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

/**
 * ユーザ編集モーダル。保存は画面を閉じるだけ。
 */
const UserEditModal: React.FC<UserEditModalProps> = ({ user, onClose }) => {
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [role, setRole] = useState<UserRole>(user.role)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isEnabled, setIsEnabled] = useState(user.isEnabled)
  const [error, setError] = useState('')

  /**
   * 入力が足りなければエラーを出し、足りていれば閉じる。
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!name.trim() || !email.trim()) {
      setError('名前とメールアドレスは必須です')
      return
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black/50">
      <div className="relative m-4 w-full max-w-md transform overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-2xl">
        <div className="relative px-6 pt-6">
          <div className="absolute top-6 right-6">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-full bg-gray-500 p-2 text-white transition-all hover:bg-gray-600"
              aria-label="閉じる"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <h2 className="mb-3 text-3xl font-bold text-gray-900">ユーザ編集</h2>
        </div>
        <div className="px-6 pt-0 pb-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <Alert message={error} type="error" />}
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-4">
                <label className="mb-1 block font-medium text-gray-500">アバター</label>
                <InitialsAvatar
                  name={user.name}
                  alt={`${user.name}のアバター`}
                  className="h-16 w-16 rounded-full ring-1 ring-white/60 ring-offset-gray-300"
                  boxSize={64}
                />
              </div>
              {user.biography && (
                <div className="col-span-4">
                  <label className="mb-1 block font-medium text-gray-500">自己紹介</label>
                  <div className="text-gray-900">{user.biography}</div>
                </div>
              )}
              <div className="col-span-4">
                <label htmlFor="name" className="mb-1 block font-medium text-gray-900">
                  名前
                </label>
                <input
                  id="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
                  required
                />
              </div>
              <div className="col-span-4">
                <label htmlFor="email" className="mb-1 block font-medium text-gray-900">
                  メールアドレス
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
                  required
                />
              </div>
              <div className="col-span-4">
                <div className="mb-1 flex items-center">
                  <label htmlFor="password" className="mr-2 block font-medium text-gray-900">
                    パスワード
                  </label>
                  <button
                    type="button"
                    onClick={() => setPassword(generatePassword())}
                    className="hover:text-primary-600 cursor-pointer text-gray-400"
                    title="ランダムパスワード生成"
                    aria-label="ランダムパスワード生成"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12a7.5 7.5 0 0113.5-5.303M19.5 12a7.5 7.5 0 01-13.5 5.303M4.5 12H2.25M19.5 12h2.25"
                      />
                    </svg>
                  </button>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="変更する場合のみ入力してください"
                    className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pr-12 text-gray-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                    aria-label={showPassword ? 'パスワードを非表示' : 'パスワードを表示'}
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>
                </div>
                <p className="mt-1 text-sm text-gray-500">入力がない場合は現在のパスワードが維持されます</p>
              </div>
              <div className="col-span-4">
                <label htmlFor="role" className="mb-1 block font-medium text-gray-900">
                  権限
                </label>
                <select
                  id="role"
                  value={role}
                  onChange={(event) => setRole(event.target.value as UserRole)}
                  className="focus:border-primary-500 focus:ring-primary-500 block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
                >
                  {roles.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-4 pt-2">
                <label className="inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={isEnabled}
                    onChange={(event) => setIsEnabled(event.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="peer peer-checked:bg-primary-600 peer-focus:ring-primary-300 relative h-6 w-11 rounded-full bg-gray-200 peer-focus:ring-2 peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white" />
                  <span className="ms-3 font-medium text-gray-900">アカウントを有効にする</span>
                </label>
              </div>
              <div className="col-span-4">
                <label className="mb-1 block font-medium text-gray-500">登録日</label>
                <div className="text-gray-900">{new Date(user.createdAt).toLocaleDateString('ja-JP')}</div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="default" onClick={onClose}>
                キャンセル
              </Button>
              <Button type="submit" variant="primary">
                更新する
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserEditModal
