import { contactInfo, contactSubjects } from '@/data/content'
import { type FormEvent, useState } from 'react'

/**
 * お問い合わせ。送信は成功メッセージを出すだけ。
 */
const ContactPage: React.FC = () => {
  const [sent, setSent] = useState(false)

  /**
   * 入力内容は送らず、完了表示へ切り替える。
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-8 text-3xl font-bold">お問い合わせ</h1>
      <div className="mb-12 rounded-lg bg-white p-6 shadow-md">
        {sent && (
          <div className="mb-4 rounded-md bg-green-50 p-4 text-green-800">お問い合わせを送信しました</div>
        )}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Field label="お名前" id="name" required>
            <input
              id="name"
              required
              disabled={sent}
              maxLength={50}
              className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 focus:outline-none"
            />
          </Field>
          <Field label="メールアドレス" id="email" required>
            <input
              id="email"
              type="email"
              required
              disabled={sent}
              maxLength={50}
              className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 focus:outline-none"
            />
          </Field>
          <div>
            <span className="mb-2 block text-base font-medium text-gray-700">
              会員種別
              <RequiredMark />
            </span>
            <div className="flex gap-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="memberType"
                  value="member"
                  required
                  disabled={sent}
                  className="text-primary-600 focus:ring-primary-500 h-4 w-4 border-gray-300"
                />
                <span className="ml-2 text-base text-gray-700">会員</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="memberType"
                  value="non-member"
                  disabled={sent}
                  className="text-primary-600 focus:ring-primary-500 h-4 w-4 border-gray-300"
                />
                <span className="ml-2 text-base text-gray-700">非会員</span>
              </label>
            </div>
          </div>
          <Field label="件名" id="subject" required>
            <select
              id="subject"
              required
              disabled={sent}
              defaultValue=""
              className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 focus:outline-none"
            >
              <option value="">選択してください</option>
              {contactSubjects.map((subject) => (
                <option key={subject.value} value={subject.value}>
                  {subject.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="お問い合わせ内容" id="message" required>
            <textarea
              id="message"
              required
              disabled={sent}
              rows={6}
              maxLength={500}
              className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 focus:outline-none"
            />
          </Field>
          <div className="flex items-center">
            <input
              id="privacy"
              type="checkbox"
              required
              disabled={sent}
              className="text-primary-600 focus:ring-primary-500 h-4 w-4 rounded border-gray-300"
            />
            <label htmlFor="privacy" className="ml-2 block text-base text-gray-700">
              <span className="text-primary-600">プライバシーポリシー</span>
              に同意する
              <RequiredMark />
            </label>
          </div>
          <button
            type="submit"
            disabled={sent}
            className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 w-full cursor-pointer rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            {sent ? '送信済み' : '送信する'}
          </button>
        </form>
      </div>
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold">その他のお問い合わせ方法</h2>
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <div className="space-y-4">
            <div>
              <h3 className="mb-3 text-xl font-bold">電話でのお問い合わせ</h3>
              <p className="text-gray-700">
                {contactInfo.tel}
                <span className="text-gray-600">（{contactInfo.businessHours}）</span>
              </p>
            </div>
            <div>
              <h3 className="mb-3 text-xl font-bold">メールでのお問い合わせ</h3>
              <p className="text-gray-700">{contactInfo.email}</p>
            </div>
            <div>
              <h3 className="mb-3 text-xl font-bold">FAXでのお問い合わせ</h3>
              <p className="text-gray-700">{contactInfo.fax}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

/**
 * 必須バッジ。
 */
const RequiredMark: React.FC = () => (
  <span className="ml-2 inline-block -translate-y-0.5 rounded bg-red-600 px-2 py-0.5 align-baseline text-sm text-white">
    必須
  </span>
)

interface FieldProps {
  label: string
  id: string
  required?: boolean
  children: React.ReactNode
}

/**
 * ラベル付きの入力欄。
 */
const Field: React.FC<FieldProps> = ({ label, id, required, children }) => (
  <div>
    <label htmlFor={id} className="mb-1 block text-base font-medium text-gray-700">
      {label}
      {required && <RequiredMark />}
    </label>
    {children}
  </div>
)

export default ContactPage
