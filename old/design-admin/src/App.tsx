import DesignCatalog from '@/components/catalog/DesignCatalog'
import AdminLayout from '@/components/layout/AdminLayout'
import DashboardPage from '@/components/pages/DashboardPage'
import UserListPage from '@/components/pages/UserListPage'
import SampleMenu from '@/components/SampleMenu'
import type { AdminPage } from '@/types/page'
import { useState } from 'react'

/**
 * 管理画面サンプルの画面切替。
 */
const App: React.FC = () => {
  const [page, setPage] = useState<AdminPage>('dashboard')

  /**
   * 画面を切り替えて先頭へ戻す。
   */
  const navigate = (next: AdminPage) => {
    setPage(next)
    window.scrollTo({ top: 0 })
  }

  return (
    <>
      <AdminLayout page={page} onNavigate={navigate}>
        {page === 'catalog' && <DesignCatalog />}
        {page === 'dashboard' && <DashboardPage />}
        {page === 'users' && <UserListPage />}
      </AdminLayout>
      <SampleMenu current={page} onSelect={navigate} />
    </>
  )
}

export default App
