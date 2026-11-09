import type { AdminPage } from '@/types/page'
import { useState } from 'react'

interface SampleMenuProps {
  current: AdminPage
  onSelect: (page: AdminPage) => void
}

const items: { id: AdminPage; label: string }[] = [
  { id: 'catalog', label: 'デザインカタログ' },
  { id: 'dashboard', label: 'ダッシュボード' },
  { id: 'users', label: 'ユーザ一覧' }
]

/**
 * 公式サイドバーとは別に、サンプル画面を切り替える。
 */
const SampleMenu: React.FC<SampleMenuProps> = ({ current, onSelect }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-4 left-4 z-[70]">
      {open && (
        <ul className="mb-2 w-52 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
          {items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={`block w-full cursor-pointer px-4 py-2 text-left text-sm hover:bg-primary-50 ${
                  current === item.id ? 'bg-primary-100 font-semibold text-primary-800' : 'text-gray-800'
                }`}
                onClick={() => {
                  onSelect(item.id)
                  setOpen(false)
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
      <button
        type="button"
        className="cursor-pointer rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-lg"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        サンプル
      </button>
    </div>
  )
}

export default SampleMenu
