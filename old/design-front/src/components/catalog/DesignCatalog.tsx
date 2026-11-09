import Alert from '@/components/base/Alert'
import Button from '@/components/base/Button'

const colorGroups: { title: string; items: { label: string; className: string }[] }[] = [
  {
    title: 'Primary',
    items: [
      { label: '50', className: 'bg-primary-50' },
      { label: '100', className: 'bg-primary-100' },
      { label: '200', className: 'bg-primary-200' },
      { label: '300', className: 'bg-primary-300' },
      { label: '400', className: 'bg-primary-400' },
      { label: '500', className: 'bg-primary-500' },
      { label: '600', className: 'bg-primary-600' },
      { label: '700', className: 'bg-primary-700' },
      { label: '800', className: 'bg-primary-800' },
      { label: '900', className: 'bg-primary-900' },
      { label: '950', className: 'bg-primary-950' }
    ]
  },
  {
    title: 'Secondary',
    items: [
      { label: '50', className: 'bg-secondary-50' },
      { label: '100', className: 'bg-secondary-100' },
      { label: '300', className: 'bg-secondary-300' },
      { label: '500', className: 'bg-secondary-500' },
      { label: '700', className: 'bg-secondary-700' },
      { label: '900', className: 'bg-secondary-900' }
    ]
  },
  {
    title: 'Success / Warning / Error / Info',
    items: [
      { label: 'success', className: 'bg-success-600' },
      { label: 'warning', className: 'bg-warning-500' },
      { label: 'error', className: 'bg-error-600' },
      { label: 'info', className: 'bg-info-600' }
    ]
  }
]

/**
 * 色、文字、ボタン、フォーム、カードの見本。
 */
const DesignCatalog: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl space-y-12">
      <header>
        <h1 className="mb-2 text-3xl font-bold">デザインカタログ</h1>
        <p className="text-gray-600">公開画面の色、文字、ボタン、入力、カードです。</p>
      </header>

      <section>
        <h2 className="mb-4 text-2xl font-bold">カラー</h2>
        <div className="space-y-6">
          {colorGroups.map((group) => (
            <div key={group.title}>
              <h3 className="mb-2 text-lg font-semibold">{group.title}</h3>
              <div className="flex flex-wrap gap-3">
                {group.items.map((item) => (
                  <div key={item.className} className="w-20">
                    <div className={`h-12 rounded-lg border border-black/10 ${item.className}`} />
                    <p className="mt-1 text-center text-xs text-gray-600">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">文字</h2>
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h1 className="mb-4 text-3xl font-bold">見出し1 森林ボランティア</h1>
          <h2 className="mb-3 text-2xl font-bold">見出し2 活動の意義</h2>
          <h3 className="mb-3 text-xl font-bold">見出し3 環境保全</h3>
          <p className="leading-relaxed text-gray-700">
            本文はグレー700、行間を広めに取ります。ボタンやリンクの強調色は primary-600 です。
          </p>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">ボタン</h2>
        <div className="flex flex-wrap gap-3 rounded-lg bg-white p-6 shadow-lg">
          <Button variant="default" text="Default" />
          <Button variant="primary" text="Primary" />
          <Button variant="secondary" text="Secondary" />
          <Button variant="info" text="Info" />
          <Button variant="success" text="Success" />
          <Button variant="warning" text="Warning" />
          <Button variant="error" text="Error" />
          <Button variant="primary" icon="mdi:plus-thick" text="アイコン" />
          <Button variant="primary" disabled text="無効" />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">アラート</h2>
        <Alert message="お問い合わせを送信しました" type="success" />
        <Alert message="ログインに失敗しました" type="error" />
        <Alert message="入力内容を確認してください" type="warning" />
        <Alert message="受付時間は平日9:00-17:00です" type="info" />
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">入力</h2>
        <div className="space-y-4 rounded-lg bg-white p-6 shadow-lg">
          <div>
            <label className="mb-1 block text-base font-medium text-gray-700">
              お名前
              <span className="ml-2 inline-block -translate-y-0.5 rounded bg-red-600 px-2 py-0.5 align-baseline text-sm text-white">
                必須
              </span>
            </label>
            <input
              type="text"
              placeholder="山田 太郎"
              className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-base font-medium text-gray-700">件名</label>
            <select className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 focus:outline-none">
              <option>選択してください</option>
              <option>会員について</option>
            </select>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">カード</h2>
        <div className="rounded-lg bg-white p-6 text-center shadow-lg">
          <h3 className="mb-4 text-xl font-bold">森林整備</h3>
          <p className="text-left leading-relaxed text-gray-600">
            植樹、下草刈り、枝打ちなど、森林の健全な成長を支える活動を行っています。
          </p>
        </div>
      </section>
    </div>
  )
}

export default DesignCatalog
