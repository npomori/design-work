import Button from '@/components/base/Button'
import InitialsAvatar from '@/components/base/InitialsAvatar'
import UserEditModal from '@/components/pages/UserEditModal'
import { roleLabel, sampleUsers } from '@/data/content'
import type { SampleUser } from '@/types/page'
import { useMemo, useState } from 'react'

/**
 * ユーザ一覧。編集ボタンでモーダルを開く。
 */
const UserListPage: React.FC = () => {
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState<SampleUser | null>(null)

  const users = useMemo(() => {
    const keyword = search.trim().toLowerCase()
    if (!keyword) return sampleUsers
    return sampleUsers.filter(
      (user) => user.name.toLowerCase().includes(keyword) || user.email.toLowerCase().includes(keyword)
    )
  }, [search])

  return (
    <>
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 sm:flex">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">ユーザ一覧</h1>
          </div>
          <div className="sm:flex">
            <div className="mb-3 items-center sm:mb-0 sm:flex">
              <label htmlFor="users-search" className="sr-only">
                検索
              </label>
              <input
                id="users-search"
                type="text"
                placeholder="ユーザを検索"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 lg:w-64 xl:w-96"
              />
            </div>
            <div className="ml-auto flex items-center space-x-2 sm:space-x-3">
              <Button type="button" variant="primary" className="w-full sm:w-auto" icon="mdi:plus-thick">
                ユーザを追加
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <table className="min-w-full table-fixed divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    {['名前', '権限', '登録日', '状態', '操作'].map((label) => (
                      <th key={label} scope="col" className="p-4 text-left font-medium text-gray-500">
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-100">
                      <td className="p-4 whitespace-nowrap">
                        <div className="flex items-center space-x-6">
                          <InitialsAvatar
                            name={user.name}
                            alt={`${user.name}のアバター`}
                            className="h-10 w-10 rounded-full ring-1 ring-white/60 ring-offset-gray-300"
                            boxSize={64}
                          />
                          <div>
                            <div className="text-base font-semibold text-gray-900">{user.name}</div>
                            <div className="font-normal text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-base font-medium whitespace-nowrap text-gray-900">
                        {roleLabel[user.role]}
                      </td>
                      <td className="p-4 text-base whitespace-nowrap text-gray-900">
                        {new Date(user.createdAt).toLocaleDateString('ja-JP')}
                      </td>
                      <td className="p-4 text-base whitespace-nowrap text-gray-900">
                        <div className="flex items-center">
                          <div
                            className={`mr-2 h-2.5 w-2.5 rounded-full ${user.isEnabled ? 'bg-green-400' : 'bg-red-500'}`}
                          />
                          <span>{user.isEnabled ? '有効' : '無効'}</span>
                        </div>
                      </td>
                      <td className="space-x-2 p-4 whitespace-nowrap">
                        <Button
                          type="button"
                          variant="info"
                          size="md"
                          icon="mdi:square-edit-outline"
                          onClick={() => setEditing(user)}
                        >
                          編集
                        </Button>
                        <Button type="button" variant="error" size="md" icon="mdi:trash-can-outline">
                          削除
                        </Button>
                        {!user.isEnabled && (
                          <Button type="button" variant="warning" size="md" icon="mdi:email-sync-outline">
                            再送
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                        ユーザがいません
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="sticky right-0 bottom-0 w-full items-center border-t border-b border-gray-300 bg-white p-4 sm:flex sm:justify-between">
          <span className="font-normal text-gray-500">
            <span className="font-semibold text-gray-900">全{users.length}件</span>
          </span>
        </div>
      </div>

      {editing && <UserEditModal user={editing} onClose={() => setEditing(null)} />}
    </>
  )
}

export default UserListPage
