import Alert from '@/components/base/Alert'
import Button from '@/components/base/Button'
import { type FormEvent, useState } from 'react'

/**
 * ログインカード。送信すると失敗メッセージの見本を出す。
 */
const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  /**
   * 認証は行わず、エラー表示だけを出す。
   */
  const login = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('ログインに失敗しました')
  }

  return (
    <div className="w-full max-w-md">
      <div className="w-full space-y-8 rounded-lg bg-white p-6 shadow ring-1 ring-black/5 sm:p-8">
        <h2 className="text-2xl font-bold text-gray-900">ログイン</h2>
        {error && <Alert message={error} type="error" />}
        <form className="mt-8 space-y-6" onSubmit={login}>
          <div>
            <label htmlFor="email" className="mb-1 block font-medium text-gray-900">
              Eメール
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block font-medium text-gray-900">
              パスワード
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? 'パスワードを非表示' : 'パスワードを表示'}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {showPassword ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3l18 18M10.477 10.485a3 3 0 004.038 4.038M9.88 9.88A3 3 0 0114.12 14.12M6.1 6.1C7.77 5.4 9.82 5 12 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411M6.1 6.1A9.97 9.97 0 002.457 12"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
          <label htmlFor="rememberMe" className="inline-flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
              className="text-primary-600 focus:ring-primary-500 h-4 w-4 rounded border-gray-300"
            />
            <span className="ml-2 text-gray-900">ログイン状態を保持する</span>
          </label>
          <div className="flex items-center justify-between">
            <span className="text-primary-600 text-base font-medium">パスワードを忘れた方はこちら</span>
            <Button variant="primary" type="submit" text="ログイン" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
