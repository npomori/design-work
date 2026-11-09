import { homeNews, latestPosts, priorityColor, priorityName, recruitmentEvents, upcomingEvents } from '@/data/content'
import type { FrontNavigate } from '@/types/page'
import { Icon } from '@iconify/react'

interface HomePageProps {
  onNavigate: FrontNavigate
}

/**
 * ホーム。予定とお知らせは静的データでカードの見た目を再現する。
 */
const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="mx-auto max-w-4xl">
      <section className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">最新の活動予定</h2>
            <span className="text-primary-600" title="活動予定を見る">
              <Icon icon="mdi:calendar" className="h-8 w-8" />
            </span>
          </div>
          <ul className="space-y-4">
            {upcomingEvents.map((event) => (
              <li key={event.id} className="flex items-center">
                <span className="text-primary-600 mr-4 font-bold">{event.date}</span>
                <span>{event.title}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">お知らせ</h2>
            <button
              type="button"
              className="text-primary-600 hover:text-primary-700 cursor-pointer"
              title="お知らせを見る"
              onClick={() => onNavigate('news')}
            >
              <Icon icon="mdi:format-list-bulleted" className="h-8 w-8" />
            </button>
          </div>
          <ul className="space-y-4">
            {homeNews.map((news) => (
              <li key={news.id} className="flex items-start justify-between">
                <button
                  type="button"
                  className="flex min-w-0 flex-1 cursor-pointer items-start text-left"
                  onClick={() => onNavigate('newsDetail', news.id)}
                >
                  <span className="text-primary-600 mr-4 flex-shrink-0 font-bold">{news.date}</span>
                  <span className="truncate">{news.title}</span>
                </button>
                <span
                  className="ml-2 flex-shrink-0 rounded px-2 py-1 text-xs font-bold text-white"
                  style={{ backgroundColor: priorityColor(news.priority) }}
                >
                  {priorityName(news.priority)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mb-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold">参加者募集中</h2>
          <span className="text-primary-600 font-semibold">すべてのイベントを見る</span>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {recruitmentEvents.map((event) => (
            <article key={event.slug} className="overflow-hidden rounded-lg bg-white shadow-lg">
              <div className="bg-primary-600 p-4 text-white">
                <div className="mb-2 flex items-center text-sm">
                  <Icon icon="mdi:calendar" className="mr-2 h-4 w-4" />
                  {event.date}
                </div>
                <h3 className="text-xl font-bold">{event.title}</h3>
              </div>
              <div className="p-4">
                <p className="mb-4 line-clamp-3 text-gray-600">{event.description}</p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-primary-100 text-primary-800 rounded-full px-3 py-1 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-primary-600 inline-flex items-center font-semibold">
                  詳細を見る
                  <Icon icon="mdi:arrow-right" className="ml-2 h-4 w-4" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold">主な活動</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              icon: 'mdi:tree',
              title: '森林整備',
              text: '植樹、下草刈り、枝打ちなど、森林の健全な成長を支える活動を行っています。定期的な整備により、生物多様性豊かな森づくりを推進しています。'
            },
            {
              icon: 'mdi:school',
              title: '森林大学',
              text: '森林の知識と技術を学ぶ講座を開催しています。初心者から経験者まで、森林について深く学べる場を提供しています。'
            },
            {
              icon: 'mdi:human-male-board',
              title: '各種講習会',
              text: '安全な活動のための技術講習や、森林の基礎知識を学ぶ講習会を開催。ボランティア活動に必要なスキルを身につけることができます。'
            }
          ].map((item) => (
            <div key={item.title} className="rounded-lg bg-white p-6 text-center shadow-lg">
              <div className="text-primary-600 mb-4 flex justify-center">
                <Icon icon={item.icon} className="h-12 w-12" />
              </div>
              <h3 className="mb-4 text-xl font-bold">{item.title}</h3>
              <p className="text-left leading-relaxed text-gray-600">{item.text}</p>
              <div className="mt-4">
                <span className="text-primary-600 inline-flex items-center text-base font-semibold">
                  詳しく見る
                  <Icon icon="mdi:arrow-right" className="ml-1 h-4 w-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold">最新の活動レポート</h2>
          <span className="text-primary-600 font-semibold">すべてのレポートを見る</span>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {latestPosts.map((post) => (
            <article
              key={post.id}
              className="overflow-hidden rounded-lg bg-white shadow-lg transition-shadow hover:shadow-xl"
            >
              <img src={post.image} alt="活動写真" className="h-48 w-full object-cover" />
              <div className="p-4">
                <div className="mb-2 flex items-center text-base text-gray-500">
                  <Icon icon="mdi:calendar" className="mr-2 h-4 w-4" />
                  {post.date}
                  <Icon icon="mdi:account" className="mr-2 ml-4 h-4 w-4" />
                  {post.author}
                </div>
                <p className="mb-4 line-clamp-3 text-base text-gray-600">{post.content}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-base text-gray-500">
                    <Icon icon="mdi:heart" className="mr-1 h-4 w-4 text-red-500" />
                    <span>{post.likes}</span>
                  </div>
                  <span className="text-primary-600 inline-flex items-center text-base font-semibold">
                    詳細を見る
                    <Icon icon="mdi:arrow-right" className="ml-1 h-4 w-4" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold">支援・募集</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6 text-center shadow-lg">
            <div className="text-primary-600 mb-4 flex justify-center">
              <Icon icon="mdi:map-marker" className="h-12 w-12" />
            </div>
            <h3 className="mb-4 text-xl font-bold">活動地募集</h3>
            <p className="mb-4 text-left leading-relaxed text-gray-600">
              森林整備活動の新しい活動地を募集しています。企業のCSR活動の支援も行っています。ご所有の森林や、整備が必要な森林がありましたら、ぜひご相談ください。
            </p>
            <button
              type="button"
              className="text-primary-600 hover:text-primary-800 inline-flex cursor-pointer items-center text-base font-semibold"
              onClick={() => onNavigate('contact')}
            >
              お問い合わせ
              <Icon icon="mdi:arrow-right" className="ml-1 h-4 w-4" />
            </button>
          </div>
          <div className="rounded-lg bg-white p-6 text-center shadow-lg">
            <div className="text-primary-600 mb-4 flex justify-center">
              <Icon icon="mdi:heart" className="h-12 w-12" />
            </div>
            <h3 className="mb-4 text-xl font-bold">寄付募集</h3>
            <p className="mb-4 text-left leading-relaxed text-gray-600">
              森林整備活動の継続的な運営のため、寄付を募集しています。皆様のご支援が、豊かな森林づくりの原動力となります。
            </p>
            <button
              type="button"
              className="text-primary-600 hover:text-primary-800 inline-flex cursor-pointer items-center text-base font-semibold"
              onClick={() => onNavigate('contact')}
            >
              寄付について
              <Icon icon="mdi:arrow-right" className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="bg-primary-50 mb-16 rounded-lg p-8">
        <h2 className="mb-6 text-2xl font-bold">協会への入会を募集中</h2>
        <p className="mb-6">森林ボランティア活動に興味のある方、ぜひご入会ください。</p>
        <span className="bg-primary-600 rounded-lg px-6 py-3 text-white">入会案内へ</span>
      </section>
    </div>
  )
}

export default HomePage
