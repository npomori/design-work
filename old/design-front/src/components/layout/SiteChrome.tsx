import { contactInfo, footerLinks, siteTitle } from '@/data/content'
import type { FrontNavigate, FrontPage } from '@/types/page'
import { Icon } from '@iconify/react'
import { useState } from 'react'

interface ChromeProps {
  page: FrontPage
  onNavigate: FrontNavigate
  children: React.ReactNode
}

interface MenuChild {
  label: string
  page?: FrontPage
}

interface MenuItem {
  label: string
  page?: FrontPage
  children?: MenuChild[]
}

const desktopMenu: MenuItem[] = [
  { label: '森林ボランティアとは', page: 'about' },
  { label: '協会の概要' },
  {
    label: '活動情報',
    children: [
      { label: '活動地紹介' },
      { label: '活動予定表' },
      { label: '活動記録' },
      { label: '活動レポート' }
    ]
  },
  { label: '協会へ入会' },
  {
    label: 'その他',
    children: [
      { label: '森林大学' },
      { label: '各種講習会' },
      { label: 'お知らせ', page: 'news' },
      { label: 'アクセス' },
      { label: 'リンク集' }
    ]
  }
]

const mobileMenu: MenuChild[] = [
  { label: '森林ボランティアとは', page: 'about' },
  { label: '協会の概要' },
  { label: '活動地紹介' },
  { label: '活動予定表' },
  { label: '活動記録' },
  { label: '活動レポート' },
  { label: '協会へ入会' },
  { label: '森林大学' },
  { label: '各種講習会' },
  { label: 'お知らせ', page: 'news' },
  { label: 'アクセス' },
  { label: 'リンク集' }
]

/**
 * 画面遷移用のクリック。対応画面が無い項目は遷移しない。
 */
function useMenuClick(onNavigate: FrontNavigate) {
  return (event: React.MouseEvent, page?: FrontPage) => {
    event.preventDefault()
    if (page) onNavigate(page)
  }
}

/**
 * 固定ヘッダー。ホームではヒーローの上に重なる。
 */
const SiteHeader: React.FC<{ page: FrontPage; onNavigate: FrontNavigate }> = ({
  page,
  onNavigate
}) => {
  const [open, setOpen] = useState(false)
  const go = useMenuClick(onNavigate)

  return (
    <nav className="bg-primary-800/90 fixed top-0 right-0 left-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <a
            href="/"
            className="flex items-center text-xl font-bold text-white xl:text-2xl"
            onClick={(event) => go(event, 'home')}
          >
            <span className="bg-primary-600 mr-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-sm">
              森
            </span>
            {siteTitle}
          </a>
          <button
            type="button"
            className="text-white md:hidden"
            aria-label="メニュー"
            onClick={() => setOpen((value) => !value)}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <ul className="hidden items-center space-x-2 md:flex xl:space-x-4">
            {desktopMenu.map((item) => (
              <li
                key={item.label}
                className={item.children ? 'group relative flex items-center' : 'flex items-center'}
              >
                {item.children ? (
                  <>
                    <button
                      type="button"
                      className="hover:text-primary-200 flex items-center py-2 text-white"
                    >
                      {item.label}
                      <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <ul className="bg-primary-700 border-primary-600 absolute top-full left-0 hidden min-w-[200px] rounded border py-2 shadow-lg group-hover:block">
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <a
                            href="#"
                            className="hover:bg-primary-600 block px-4 py-2 text-white"
                            onClick={(event) => go(event, child.page)}
                          >
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <a
                    href="#"
                    className={`hover:text-primary-200 py-2 text-white ${
                      page === item.page ? 'text-primary-200' : ''
                    }`}
                    onClick={(event) => go(event, item.page)}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
            <li className="group relative">
              <button
                type="button"
                className="hover:text-primary-200 flex items-center text-white"
                aria-label="検索"
              >
                <Icon className="h-8 w-8" icon="mdi:magnify" />
              </button>
              <div className="bg-primary-700 border-primary-600 absolute right-0 hidden min-w-[300px] rounded border p-4 group-hover:block">
                <div className="space-y-3">
                  <h4 className="text-base font-semibold text-white">検索</h4>
                  <form className="flex space-x-2" onSubmit={(event) => event.preventDefault()}>
                    <input
                      type="text"
                      placeholder="キーワードを入力..."
                      className="focus:border-primary-500 focus:ring-primary-500 flex-1 rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:ring-2 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="bg-primary-600 hover:bg-primary-700 rounded-md px-4 py-2 text-white"
                      aria-label="検索する"
                    >
                      <Icon icon="mdi:magnify" className="h-5 w-5" />
                    </button>
                  </form>
                </div>
              </div>
            </li>
            <li className="group relative">
              <button type="button" className="hover:text-primary-200 flex items-center text-white">
                <Icon className="h-8 w-8" icon="mdi:account-lock" />
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="bg-primary-700 border-primary-600 absolute right-0 hidden min-w-[200px] rounded border py-2 shadow-lg group-hover:block">
                <a
                  href="#"
                  className="hover:bg-primary-600 flex w-full items-center px-4 py-2 text-left text-white"
                  onClick={(event) => go(event, 'login')}
                >
                  <Icon className="mr-2 h-4 w-4" icon="mdi:login" />
                  ログイン
                </a>
              </div>
            </li>
          </ul>
        </div>
        {open && (
          <ul className="mt-4 space-y-4 md:hidden">
            {mobileMenu.map((item) => (
              <li key={item.label}>
                <a
                  href="#"
                  className="hover:text-primary-200 block text-white"
                  onClick={(event) => {
                    go(event, item.page)
                    setOpen(false)
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="border-primary-700 border-t pt-4">
              <a
                href="#"
                className="hover:text-primary-200 flex items-center text-white"
                onClick={(event) => {
                  go(event, 'login')
                  setOpen(false)
                }}
              >
                <Icon className="mr-3 h-5 w-5" icon="mdi:login" />
                ログイン
              </a>
            </li>
          </ul>
        )}
      </div>
    </nav>
  )
}

/**
 * サイトフッター。
 */
const SiteFooter: React.FC<{ onNavigate: FrontNavigate; className?: string }> = ({
  onNavigate,
  className = ''
}) => {
  const go = useMenuClick(onNavigate)

  return (
    <footer className={`bg-gray-800 text-white ${className}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-xl font-bold">お問い合わせ</h3>
            <p>〒{contactInfo.postalCode}</p>
            <p>{contactInfo.address}</p>
            <p>TEL(FAX): {contactInfo.tel}</p>
            <p>受付時間: {contactInfo.businessHours}</p>
            <p>Email: {contactInfo.email}</p>
            <p className="mt-4">
              <a href="#" className="text-white hover:text-gray-300" onClick={(event) => go(event, 'contact')}>
                お問い合わせフォーム
              </a>
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-xl font-bold">リンク</h3>
            <ul>
              {footerLinks.map((link) => (
                <li key={link.id}>
                  <a href="#" className="hover:text-gray-300" onClick={(event) => event.preventDefault()}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-xl font-bold">SNS</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300" onClick={(event) => event.preventDefault()}>
                Twitter
              </a>
              <a href="#" className="hover:text-gray-300" onClick={(event) => event.preventDefault()}>
                Facebook
              </a>
              <a href="#" className="hover:text-gray-300" onClick={(event) => event.preventDefault()}>
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2025-2026 NPO法人 {siteTitle} All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

/**
 * 通常ページとホームの枠。
 */
export const SiteLayout: React.FC<ChromeProps & { isHome?: boolean }> = ({
  page,
  onNavigate,
  isHome = false,
  children
}) => {
  return (
    <div className="flex min-h-screen flex-col">
      {isHome ? (
        <div className="bg-header relative">
          <div className="absolute inset-0 z-10 bg-black/15" />
          <div className="relative z-20">
            <SiteHeader page={page} onNavigate={onNavigate} />
            <div className="container mx-auto px-4 py-32 text-center">
              <div className="inline-block text-left">
                <h1 className="mb-4 text-4xl font-bold text-white drop-shadow-lg md:text-6xl">
                  <div className="mb-2 text-3xl drop-shadow-lg md:text-5xl">NPO法人</div>
                  <div className="drop-shadow-lg whitespace-nowrap">{siteTitle}へようこそ</div>
                </h1>
              </div>
              <p className="text-xl text-white drop-shadow-md md:text-2xl">
                人づくり、森づくり、未来づくり。自然と共生する豊かな社会を目指して。
              </p>
            </div>
          </div>
        </div>
      ) : (
        <header className="bg-primary-800">
          <SiteHeader page={page} onNavigate={onNavigate} />
        </header>
      )}
      <main className={`container mx-auto flex-1 px-4 py-8 ${isHome ? 'mt-4' : 'mt-16'}`}>{children}</main>
      <SiteFooter onNavigate={onNavigate} />
    </div>
  )
}

/**
 * ログインなど、中央寄せの枠。
 */
export const FullLayout: React.FC<ChromeProps> = ({ page, onNavigate, children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader page={page} onNavigate={onNavigate} />
      <main className="flex flex-1 items-center justify-center px-4 py-8 pt-24 md:pt-28">{children}</main>
      <SiteFooter onNavigate={onNavigate} className="mt-auto" />
    </div>
  )
}
