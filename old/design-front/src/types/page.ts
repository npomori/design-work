/** 公開画面サンプルで切り替える画面 */
export type FrontPage = 'catalog' | 'home' | 'about' | 'news' | 'newsDetail' | 'contact' | 'login'

export interface FrontNavigate {
  (page: FrontPage, newsId?: string): void
}
