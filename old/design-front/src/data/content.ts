export const siteTitle = '仮想森林ボランティア協会'

export const contactInfo = {
  postalCode: 'xxx-xxxx',
  address: '東京都○○区○○町1-2-3',
  tel: '03-xxxx-xxxx',
  fax: '03-xxxx-xxxx',
  email: 'info@example.com',
  businessHours: '平日9:00-17:00'
}

export const footerLinks = [
  { id: 'staff', label: '事務局員紹介' },
  { id: 'access', label: 'アクセス' },
  { id: 'privacy', label: 'プライバシーポリシー' },
  { id: 'sitemap', label: 'サイトマップ' },
  { id: 'member', label: '会員専用' }
]

export const newsCategories = [
  { value: 'recruitment', name: '募集', color: '#2563EB' },
  { value: 'insurance', name: '保険', color: '#059669' },
  { value: 'event', name: 'イベント', color: '#7C3AED' },
  { value: 'regular_activity', name: '定例活動', color: '#0891B2' },
  { value: 'training', name: '講習', color: '#D97706' },
  { value: 'newsletter', name: '会報', color: '#DB2777' },
  { value: 'office', name: '事務局', color: '#6B7280' },
  { value: 'member', name: '会員向け', color: '#059669' },
  { value: 'public', name: '一般向け', color: '#7C2D12' }
]

export const newsPriorities = [
  { value: 'important', name: '重要', color: '#DC2626' },
  { value: 'urgent', name: '至急', color: '#EA580C' },
  { value: 'confirmation', name: '要確認', color: '#2563EB' }
]

export const contactSubjects = [
  { value: 'membership', label: '会員について' },
  { value: 'activities', label: '森林活動について' },
  { value: 'university', label: '森林大学について' },
  { value: 'lectures', label: '講習会について' },
  { value: 'other', label: 'その他' }
]

export interface NewsItem {
  id: string
  title: string
  date: string
  categories: string[]
  priority?: string
  isPinned?: boolean
  author: string
  content: string
  attachmentName?: string
}

export const newsItems: NewsItem[] = [
  {
    id: '1',
    title: '春の植樹活動ボランティアを募集します',
    date: '2026-04-01',
    categories: ['recruitment', 'event'],
    priority: 'important',
    isPinned: true,
    author: '事務局',
    content:
      '近畿圏内の森林で春の植樹活動を行います。初心者の方も大歓迎です。道具はこちらで用意しますので、動きやすい服装と軍手をお持ちください。',
    attachmentName: '参加案内.pdf'
  },
  {
    id: '2',
    title: '森林整備技術講習会のお知らせ',
    date: '2026-03-20',
    categories: ['training'],
    priority: 'confirmation',
    author: '佐藤 花子',
    content:
      '安全な森林整備作業の基本から応用まで学べる講習会です。チェーンソーの使い方、下草刈り、枝打ちなどの実践的な技術を習得できます。'
  },
  {
    id: '3',
    title: '会報第12号を発行しました',
    date: '2026-03-01',
    categories: ['newsletter'],
    author: '編集部',
    content: '冬の活動報告と、春の予定をまとめました。会員の皆さまは添付の会報をご覧ください。'
  },
  {
    id: '4',
    title: 'ボランティア保険の更新手続き',
    date: '2026-02-15',
    categories: ['insurance', 'member'],
    priority: 'urgent',
    author: '事務局',
    content: '今年度の森林ボランティア保険の更新期限が近づいています。手続き方法を確認してください。'
  },
  {
    id: '5',
    title: '定例活動の集合場所を変更します',
    date: '2026-02-01',
    categories: ['regular_activity', 'office'],
    author: '山田 次郎',
    content: '3月の定例活動は、駐車場の都合により集合場所を活動地の東口に変更します。'
  }
]

export const upcomingEvents = [
  { id: 1, date: '4/15', title: '春の植樹活動' },
  { id: 2, date: '4/22', title: '森林整備技術講習会' },
  { id: 3, date: '5/6', title: '下草刈りと観察会' }
]

export const homeNews = [
  { id: '1', date: '4/1', title: '春の植樹活動ボランティアを募集します', priority: 'important' },
  { id: '2', date: '3/20', title: '森林整備技術講習会のお知らせ', priority: 'confirmation' },
  { id: '4', date: '2/15', title: 'ボランティア保険の更新手続き', priority: 'urgent' }
]

export const recruitmentEvents = [
  {
    slug: 'spring-tree-planting-2026',
    title: '春の植樹活動ボランティア募集',
    description:
      '近畿圏内の森林で春の植樹活動を行います。初心者の方も大歓迎!道具はこちらで用意しますので、動きやすい服装と軍手をお持ちください。みんなで協力して、未来の森を育てましょう。',
    date: '2026年4月15日',
    tags: ['植樹', '初心者歓迎', '春']
  },
  {
    slug: 'forest-maintenance-workshop',
    title: '森林整備技術講習会',
    description:
      '安全な森林整備作業の基本から応用まで学べる講習会です。チェーンソーの使い方、下草刈り、枝打ちなどの実践的な技術を習得できます。経験豊富な指導員が丁寧に指導します。',
    date: '2026年4月22日',
    tags: ['講習会', '技術習得', '森林整備']
  }
]

export const latestPosts = [
  {
    id: 1,
    content:
      '今日は春の植樹活動でした！参加者30名でクヌギとコナラの苗木を100本植樹しました。みんなで協力して作業したので、予定より早く終了。植えた苗木が大きく育つのが楽しみです。',
    date: '2026/3/20',
    author: '田中 太郎',
    image:
      'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=60',
    likes: 24
  },
  {
    id: 2,
    content:
      '森林調査の結果が出ました！昨年植えた苗木の生存率95%達成。平均樹高も15%成長。生物多様性も向上していて、森林が健康に育っている証拠ですね。',
    date: '2026/3/10',
    author: '佐藤 花子',
    image:
      'https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?w=800&auto=format&fit=crop&q=60',
    likes: 31
  },
  {
    id: 3,
    content:
      '冬の森林整備活動。寒い中でしたが、枯れ枝の除去と下草刈りを完了！森林の健康状態が改善されました。作業後は温かいお茶で一息。',
    date: '2026/2/15',
    author: '山田 次郎',
    image:
      'https://images.unsplash.com/photo-1475483768296-6163e08872a1?w=800&auto=format&fit=crop&q=60',
    likes: 18
  }
]

/**
 * カテゴリ値から表示名を返す。
 */
export function categoryName(value: string): string {
  return newsCategories.find((item) => item.value === value)?.name ?? value
}

/**
 * カテゴリ値から色を返す。
 */
export function categoryColor(value: string): string {
  return newsCategories.find((item) => item.value === value)?.color ?? '#6B7280'
}

/**
 * 優先度の値から表示名を返す。
 */
export function priorityName(value: string): string {
  return newsPriorities.find((item) => item.value === value)?.name ?? value
}

/**
 * 優先度の値から色を返す。
 */
export function priorityColor(value: string): string {
  return newsPriorities.find((item) => item.value === value)?.color ?? '#6B7280'
}
