/**
 * 下層の本文ページ。森林ボランティアとは、の構成をそのまま使う。
 */
const AboutPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-8 text-3xl font-bold">森林ボランティアとは</h1>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold">森林ボランティアの役割</h2>
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <img
                src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=60"
                alt="森林整備活動"
                className="mb-4 h-64 w-full rounded-lg object-cover"
              />
              <p className="text-gray-700">
                森林ボランティアは、森林の整備や保全活動を通じて、自然環境の保護と地域社会の発展に貢献する活動です。主な活動内容は以下の通りです：
              </p>
            </div>
            <ul className="space-y-4">
              {['植樹や下草刈りなどの森林整備', '間伐や枝打ちなどの林業作業', '森林調査や環境モニタリング', '環境教育や自然体験活動の企画・運営'].map(
                (item) => (
                  <li key={item} className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    <span>{item}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold">活動の意義</h2>
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-3 text-xl font-bold">環境保全</h3>
              <p className="mb-4 text-gray-700">
                森林は地球の肺とも呼ばれ、二酸化炭素の吸収や水資源の涵養など、重要な役割を果たしています。森林ボランティア活動は、これらの機能を維持・向上させるために不可欠です。
              </p>
              <h3 className="mb-3 text-xl font-bold">地域貢献</h3>
              <p className="text-gray-700">
                森林整備は、地域の自然環境を守り、災害防止にもつながります。また、活動を通じて地域住民との交流も深まります。
              </p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?w=800&auto=format&fit=crop&q=60"
              alt="森林の役割"
              className="h-64 w-full rounded-lg object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-bold">参加方法</h2>
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <img
                src="https://images.unsplash.com/photo-1475483768296-6163e08872a1?w=800&auto=format&fit=crop&q=60"
                alt="活動の様子"
                className="mb-4 h-64 w-full rounded-lg object-cover"
              />
              <p className="text-gray-700">森林ボランティア活動に参加するには、以下の方法があります：</p>
            </div>
            <ul className="space-y-4">
              {['協会への入会（正会員・賛助会員）', '単発のボランティア活動への参加', '森林大学での学習と実践'].map(
                (item) => (
                  <li key={item} className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    <span>{item}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-primary-50 rounded-lg p-8">
        <h2 className="mb-4 text-2xl font-bold">活動に参加してみませんか？</h2>
        <p className="mb-6 text-gray-700">
          森林ボランティア活動は、自然を守りたい方、地域に貢献したい方、新しい仲間と出会いたい方など、様々な目的を持つ方々が参加しています。まずは、お気軽に活動に参加してみてください。
        </p>
        <div className="flex flex-wrap gap-4">
          <span className="bg-primary-600 rounded-lg px-6 py-3 text-white">入会案内へ</span>
          <span className="border-primary-600 text-primary-600 rounded-lg border bg-white px-6 py-3">
            活動紹介を見る
          </span>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
