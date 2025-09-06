import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import authApi from 'src/apis/auth.api'
import { AppContext } from 'src/contexts/app.context'
import { useMutation } from '@tanstack/react-query'
import ListUser from './Components/ListUser'
import ListReport from './Components/ListReport'
import { useQuery } from '@tanstack/react-query'
import { User } from 'src/types/user.type'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminPage: React.FC = () => {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const logoutMutation = useMutation(authApi.logoutAccount)
const navigate = useNavigate()
  const [selectedItem, setSelectedItem] = useState<'users' | 'reports'>('users')

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        setIsAuthenticated(false)
        setProfile(null)
        toast.success('Logout success')
      }
    })
  }



    const { data: profileDataLS, refetch } = useQuery<User>({
      queryKey: ['profile'],
      queryFn: async () => {
        const raw = localStorage.getItem('profile');
        if (!raw) throw new Error('No profile found in localStorage');
        return JSON.parse(raw) as User;
      },
    });

      useEffect(() => {
  if (profileDataLS && profileDataLS.role !== 'ADMIN') {
    toast.warning('Bạn không có quyền truy cập trang này!')
    navigate('/') // quay về trang chủ
  }
}, [profileDataLS, navigate])
  

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-600 text-white p-6">
        <h1>
          <Link to="/" className="text-2xl font-bold mb-6 block">
            Trang Quản Trị
          </Link>
        </h1>
        <nav className="flex flex-col space-y-3 m-4">
          <button
            onClick={() => setSelectedItem('users')}
            className={`p-2 rounded text-left ${
              selectedItem === 'users' ? 'bg-blue-500' : 'hover:bg-blue-500'
            }`}
          >
            Danh sách User
          </button>
          <button
            onClick={() => setSelectedItem('reports')}
            className={`p-2 rounded text-left ${
              selectedItem === 'reports' ? 'bg-blue-500' : 'hover:bg-blue-500'
            }`}
          >
            Thông tin báo cáo
          </button>
          <div onClick={handleLogout} className="hover:bg-blue-500 p-2 rounded cursor-pointer">
            Đăng xuất
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <h2 className="text-3xl font-bold mb-6">Trang Quản Lý</h2>

        <div className="bg-white shadow rounded-lg p-4">
          {selectedItem === 'users' && (
            <>
              <h3 className="text-xl font-semibold mb-4">Users List</h3>
              <ListUser />
            </>
          )}
          {selectedItem === 'reports' && (
            <>
              <h3 className="text-xl font-semibold mb-4">Reports List</h3>
              <ListReport />
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default AdminPage
