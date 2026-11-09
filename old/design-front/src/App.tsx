import DesignCatalog from '@/components/catalog/DesignCatalog'
import { FullLayout, SiteLayout } from '@/components/layout/SiteChrome'
import AboutPage from '@/components/pages/AboutPage'
import ContactPage from '@/components/pages/ContactPage'
import HomePage from '@/components/pages/HomePage'
import LoginPage from '@/components/pages/LoginPage'
import NewsDetailPage from '@/components/pages/NewsDetailPage'
import NewsListPage from '@/components/pages/NewsListPage'
import SampleMenu from '@/components/SampleMenu'
import type { FrontPage } from '@/types/page'
import { useState } from 'react'

/**
 * 公開画面サンプルの画面切替。
 */
const App: React.FC = () => {
  const [page, setPage] = useState<FrontPage>('home')
  const [newsId, setNewsId] = useState('1')

  /**
   * 画面と、詳細で開くお知らせを切り替える。
   */
  const navigate = (next: FrontPage, nextNewsId?: string) => {
    if (nextNewsId) setNewsId(nextNewsId)
    setPage(next)
    window.scrollTo({ top: 0 })
  }

  const content = (() => {
    if (page === 'catalog') return <DesignCatalog />
    if (page === 'home') return <HomePage onNavigate={navigate} />
    if (page === 'about') return <AboutPage />
    if (page === 'news') return <NewsListPage onNavigate={navigate} />
    if (page === 'newsDetail') return <NewsDetailPage newsId={newsId} onNavigate={navigate} />
    if (page === 'contact') return <ContactPage />
    return null
  })()

  return (
    <>
      {page === 'login' ? (
        <FullLayout page={page} onNavigate={navigate}>
          <LoginPage />
        </FullLayout>
      ) : (
        <SiteLayout page={page} onNavigate={navigate} isHome={page === 'home'}>
          {content}
        </SiteLayout>
      )}
      <SampleMenu current={page} onSelect={(next) => navigate(next)} />
    </>
  )
}

export default App
