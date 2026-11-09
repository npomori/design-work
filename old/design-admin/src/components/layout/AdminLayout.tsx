import InitialsAvatar from '@/components/base/InitialsAvatar'
import { siteTitle } from '@/data/content'
import type { AdminPage } from '@/types/page'
import { Icon } from '@iconify/react'
import { useState } from 'react'

interface ChromeProps {
  page: AdminPage
  onNavigate: (page: AdminPage) => void
  children: React.ReactNode
}

const menu = [
  { id: 'dashboard' as const, title: 'ダッシュボード', icon: 'mdi:view-dashboard', page: 'dashboard' as const },
  { id: 'users' as const, title: 'ユーザ', icon: 'mdi:account-multiple', page: 'users' as const }
]

/**
 * 管理画面の上部バー。
 */
const AdminNavbar: React.FC<{
  onNavigate: (page: AdminPage) => void
  onToggleSidebar: () => void
}> = ({ onNavigate, onToggleSidebar }) => {
  const [accountOpen, setAccountOpen] = useState(false)

  return (
    <nav className="fixed z-30 w-full border-b border-gray-200 bg-white">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center">
          <div className="flex flex-1 items-center justify-start">
            <button
              type="button"
              aria-label="サイドバー"
              className="mr-2 cursor-pointer rounded p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 lg:hidden"
              onClick={onToggleSidebar}
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <a
              href="#dashboard"
              className="ml-0 flex items-center lg:ml-64"
              onClick={(event) => {
                event.preventDefault()
                onNavigate('dashboard')
              }}
            >
              <span className="bg-primary-700 mr-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white">
                管
              </span>
              <span className="self-center text-xl font-semibold whitespace-nowrap sm:text-2xl">
                {siteTitle} 管理画面
              </span>
            </a>
          </div>
          <div className="relative mr-0 flex items-center lg:mr-64">
            <button
              type="button"
              className="inline-flex items-center justify-center overflow-hidden rounded-full"
              aria-label="userアイコン"
              onClick={() => setAccountOpen((value) => !value)}
            >
              <InitialsAvatar
                name="田中 太郎"
                alt="田中 太郎のアバター"
                className="h-10 w-10 cursor-pointer rounded-full ring-1 ring-white/60 ring-offset-gray-300"
                boxSize={64}
              />
            </button>
            {accountOpen && (
              <div className="absolute top-12 right-0 z-50 my-4 w-56 list-none divide-y divide-gray-100 rounded bg-white text-base shadow ring-1 ring-black/5">
                <div className="px-4 py-3">
                  <p className="text-gray-900">田中 太郎</p>
                  <p className="truncate text-gray-900">tanaka@example.com</p>
                </div>
                <ul className="py-1">
                  <li>
                    <button
                      type="button"
                      className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                      onClick={() => setAccountOpen(false)}
                    >
                      ログアウト
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

/**
 * 左サイドバー。
 */
const AdminSidebar: React.FC<{
  page: AdminPage
  open: boolean
  onNavigate: (page: AdminPage) => void
}> = ({ page, open, onNavigate }) => {
  return (
    <aside
      className={`${open ? 'flex' : 'hidden'} transition-width fixed top-0 left-0 z-20 h-full w-64 flex-shrink-0 flex-col pt-16 font-normal duration-75 lg:flex`}
      aria-label="Sidebar"
    >
      <div className="relative flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white pt-0">
        <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <div className="flex-1 bg-white px-3">
            <ul className="space-y-2 pb-2">
              {menu.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.page}`}
                    className={`group flex items-center rounded-lg p-2 text-base text-gray-900 hover:bg-gray-100 ${
                      page === item.page ? 'bg-gray-100' : ''
                    }`}
                    onClick={(event) => {
                      event.preventDefault()
                      onNavigate(item.page)
                    }}
                  >
                    <Icon
                      icon={item.icon}
                      className="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
                    />
                    <span className="ml-3">{item.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-auto border-t border-gray-200 px-3 py-4">
            <span className="text-primary-700 flex items-center rounded-lg p-2 text-base font-medium">
              <Icon icon="mdi:arrow-left-circle" className="text-primary-600 h-6 w-6" />
              <span className="ml-3">フロントへ戻る</span>
            </span>
          </div>
        </div>
      </div>
    </aside>
  )
}

/**
 * 管理画面の枠。
 */
const AdminLayout: React.FC<ChromeProps> = ({ page, onNavigate, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar
        onNavigate={onNavigate}
        onToggleSidebar={() => setSidebarOpen((value) => !value)}
      />
      <div className="flex overflow-hidden bg-gray-50 pt-16">
        <AdminSidebar
          page={page}
          open={sidebarOpen}
          onNavigate={(next) => {
            onNavigate(next)
            setSidebarOpen(false)
          }}
        />
        <main className="relative min-h-[calc(100vh-4rem)] w-full overflow-y-auto bg-gray-50 lg:ml-64">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
