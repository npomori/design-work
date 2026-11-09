import { adminActivities, adminStats, userActivities, userStats, type ActivityItem } from '@/data/content'

const iconWrap: Record<(typeof userStats)[number]['tone'], string> = {
  blue: 'bg-blue-100 text-blue-500',
  green: 'bg-green-100 text-green-500',
  purple: 'bg-purple-100 text-purple-500',
  orange: 'bg-orange-100 text-orange-500'
}

const valueColor: Record<(typeof userStats)[number]['tone'], string> = {
  blue: 'text-blue-600',
  green: 'text-green-600',
  purple: 'text-purple-600',
  orange: 'text-orange-600'
}

const badgeClass = {
  pink: 'text-pink-800 bg-pink-100',
  indigo: 'text-indigo-800 bg-indigo-100',
  green: 'text-green-800 bg-green-100',
  blue: 'text-blue-800 bg-blue-100'
} as const

/**
 * 統計カードの人物アイコン。
 */
const PeopleIcon: React.FC = () => (
  <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
  </svg>
)

/**
 * ダッシュボード。数値は固定の見本。
 */
const DashboardPage: React.FC = () => {
  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">ダッシュボード</h1>
      </div>
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-bold text-gray-900">ユーザ活動</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {userStats.map((stat) => (
            <div key={stat.label} className="rounded-lg bg-white p-4 shadow-sm">
              <div className="flex items-center">
                <div
                  className={`inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${iconWrap[stat.tone]}`}
                >
                  <PeopleIcon />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-700">{stat.label}</h3>
                  <p className={`text-2xl font-bold ${valueColor[stat.tone]}`}>{stat.value}</p>
                  <p className="text-gray-500">{stat.note}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-bold text-gray-900">管理者活動</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {adminStats.map((stat) => (
            <div key={stat.label} className="rounded-lg bg-white p-4 shadow-sm">
              <div className="flex items-center">
                <div
                  className={`inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${iconWrap[stat.tone]}`}
                >
                  <PeopleIcon />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-700">{stat.label}</h3>
                  <p className={`text-2xl font-bold ${valueColor[stat.tone]}`}>{stat.value}</p>
                  <p className="text-gray-500">{stat.note}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-bold text-gray-900">最近の活動</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <ActivityCard title="ユーザの最近の活動" items={userActivities} />
          <ActivityCard title="管理者の最近の活動" items={adminActivities} />
        </div>
      </div>
    </div>
  )
}

/**
 * 最近の活動リスト。
 */
const ActivityCard: React.FC<{ title: string; items: ActivityItem[] }> = ({ title, items }) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">{title}</h3>
      <div className="space-y-4">
        {items.map((activity) => (
          <div key={activity.id} className="border-b border-gray-200 pb-4 last:border-0">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className={`inline-block rounded px-2 py-1 text-sm font-semibold ${badgeClass[activity.tone]}`}>
                  {activity.label}
                </span>
                <span className="text-gray-500">{activity.userName}</span>
              </div>
              <span className="text-gray-500">{activity.createdAt}</span>
            </div>
            <p className="mt-2 text-gray-600">{activity.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DashboardPage
