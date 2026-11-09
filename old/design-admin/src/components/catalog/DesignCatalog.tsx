import Alert from '@/components/base/Alert'
import Button from '@/components/base/Button'

const swatches: { label: string; className: string }[] = [
  { label: 'primary-50', className: 'bg-primary-50' },
  { label: 'primary-100', className: 'bg-primary-100' },
  { label: 'primary-300', className: 'bg-primary-300' },
  { label: 'primary-500', className: 'bg-primary-500' },
  { label: 'primary-600', className: 'bg-primary-600' },
  { label: 'primary-700', className: 'bg-primary-700' },
  { label: 'primary-800', className: 'bg-primary-800' },
  { label: 'primary-900', className: 'bg-primary-900' },
  { label: 'secondary-500', className: 'bg-secondary-500' },
  { label: 'error-600', className: 'bg-error-600' },
  { label: 'warning-500', className: 'bg-warning-500' },
  { label: 'info-600', className: 'bg-info-600' },
  { label: 'success-600', className: 'bg-success-600' }
]

/**
 * 管理画面の色、ボタン、表、バッジの見本。
 */
const DesignCatalog: React.FC = () => {
  return (
    <div className="space-y-10 p-4">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">デザインカタログ</h1>
        <p className="mt-2 text-gray-600">管理画面の色、ボタン、アラート、表、バッジです。</p>
      </header>

      <section>
        <h2 className="mb-4 text-xl font-bold text-gray-900">カラー</h2>
        <div className="flex flex-wrap gap-3">
          {swatches.map((item) => (
            <div key={item.label} className="w-24">
              <div className={`h-12 rounded-lg border border-black/10 ${item.className}`} />
              <p className="mt-1 text-center text-xs text-gray-600">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold text-gray-900">ボタン</h2>
        <div className="flex flex-wrap gap-3 rounded-lg bg-white p-4 shadow-sm">
          <Button variant="default" text="Default" />
          <Button variant="primary" icon="mdi:plus-thick" text="追加" />
          <Button variant="info" size="md" icon="mdi:square-edit-outline" text="編集" />
          <Button variant="error" size="md" icon="mdi:trash-can-outline" text="削除" />
          <Button variant="warning" size="md" icon="mdi:email-sync-outline" text="再送" />
          <Button variant="success" text="Success" />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold text-gray-900">アラート</h2>
        <Alert message="ユーザを更新しました" type="success" />
        <Alert message="ユーザの更新に失敗しました" type="error" />
        <Alert message="パスワードは変更時のみ入力します" type="warning" />
        <Alert message="一覧はダミーデータです" type="info" />
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold text-gray-900">バッジと表</h2>
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="inline-block rounded bg-blue-100 px-2 py-1 text-sm font-semibold text-blue-800">
            イベント管理
          </span>
          <span className="inline-block rounded bg-green-100 px-2 py-1 text-sm font-semibold text-green-800">
            ユーザ管理
          </span>
          <span className="inline-flex items-center text-base text-gray-900">
            <span className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400" />
            有効
          </span>
          <span className="inline-flex items-center text-base text-gray-900">
            <span className="mr-2 h-2.5 w-2.5 rounded-full bg-red-500" />
            無効
          </span>
        </div>
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left font-medium text-gray-500">名前</th>
                <th className="p-4 text-left font-medium text-gray-500">権限</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              <tr className="hover:bg-gray-100">
                <td className="p-4 text-base font-semibold text-gray-900">田中 太郎</td>
                <td className="p-4 text-base text-gray-900">管理者</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default DesignCatalog
