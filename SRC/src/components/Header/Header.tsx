import { AiOutlineBell } from 'react-icons/ai'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import authApi from 'src/apis/auth.api'
import noproduct from 'src/assets/images/no-product.png'
import path from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchase'
import { AppContext } from 'src/contexts/app.context'
import useSearchProduct from 'src/hooks/useSearchProduct'
import { getAvatarUrl } from 'src/utils/utils'
import Popover from '../Popover'
import { locales } from 'src/i18n/i18n'
import { useTranslation } from 'react-i18next'
import notificationApi from 'src/apis/notification.api'
import { Notification } from 'src/types/utils.type'
import moment from 'moment'
import friendApi from 'src/apis/friend.api'
import { FriendRequest } from 'src/types/user.type'
import { getSocket } from 'src/socket/socket'
import { User } from 'src/types/user.type'

const MAX_PURCHASES = 5

export default function Header() {
  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const currentLanguage = locales[i18n.language as keyof typeof locales]
  const { setIsAuthenticated, isAuthenticated, setProfile, profile } = useContext(AppContext)
  const queryClient = useQueryClient()
  const [currentPage, setCurrentPage] = useState(1)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const itemsPerPage = 5

  const { data: notifications } = useQuery({
    queryKey: ['notifications', profile?.phone, currentPage],
    queryFn: () => notificationApi.getNotifications(profile?.phone || '', { page: currentPage, limit: itemsPerPage }).then(res => res.data),
    enabled: !!profile?.phone
  })

  const logoutMutation = useMutation(authApi.logoutAccount)
  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        setIsAuthenticated(false)
        setProfile(null)
        toast.success('Logout success')
        const socket = getSocket()
        if (socket) {
          socket.emit('logout')
          socket.disconnect()
        }
        queryClient.removeQueries(['purchases', { status: purchasesStatus.inCart }])
      }
    })
  }

  const handleClickNotification = async (purchase: Notification) => {
    try {
      await notificationApi.updateNotification(purchase._id, { ...purchase, status: 'read' })
      if (purchase.type === 'friend_accept' || purchase.type === 'friend_remove') {
        navigate('/profile/' + purchase.sender)
      }
    } catch (error) {
      toast.error((error as any)?.response?.data?.message || 'Lỗi xử lý thông báo')
    }
  }

  const handleAcceptFriend = async (purchase: Notification) => {
    const body: FriendRequest = {
      senderPhone: purchase.receiver,
      receiverPhone: purchase.sender
    }
    try {
      await notificationApi.updateNotification(purchase._id, { ...purchase, status: 'read' })
      const res = await friendApi.sendFriendRequest(body)
      toast[res.data.includes('yourself') ? 'warning' : 'success'](res.data)
    } catch (error) {
      toast.error((error as any)?.response?.data?.message || 'Lỗi kết bạn')
    }
  }

  const handleDeclineFriend = async (purchase: Notification) => {
    const body: FriendRequest = {
      senderPhone: purchase.sender,
      receiverPhone: purchase.receiver
    }
    try {
      await notificationApi.updateNotification(purchase._id, { ...purchase, status: 'read' })
      const res = await friendApi.unfriend(body)
      toast.success(res.data)
    } catch (error) {
      toast.error((error as any)?.response?.data?.message || 'Lỗi huỷ kết bạn')
    }
  }

  const changeLanguage = (lng: 'en' | 'vi') => {
    i18n.changeLanguage(lng)
  }

  const { data: profileDataLS } = useQuery<User>({
    queryKey: ['profile'],
    queryFn: async () => {
      const raw = localStorage.getItem('profile')
      if (!raw) throw new Error('No profile found in localStorage')
      return JSON.parse(raw) as User
    }
  })

  const totalPages = Math.ceil((notifications?.length || 0) / itemsPerPage)

  return (
    <div className='sticky top-0 z-20 bg-gray-100 p-4 text-white'>
      <div className='container mx-auto'>
        <div className='flex items-center  lg:justify-between justify-end'>

          {/* LOGO + Toggle Button */}
          <div className='flex items-center gap-4 '>
            <Link to='/' className='text-orange font-bold text-xl'>
              Zalo - {profileDataLS?.name}
            </Link>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='lg:hidden text-blue-500 bg-gray-200 cursor-pointer focus:outline-none px-2 py-1 rounded'>
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                </svg>
              </button>
          </div>

          {/* MENU ITEMS */}
{/* MENU SECTION */}
<div className={`lg:flex ${isMenuOpen ? 'block' : 'hidden'} mt-4`}>
  <div className='flex flex-col lg:flex-row items-start lg:items-center gap-4 text-orange'>
    {/* Chat Center, Download */}
    <p className='cursor-pointer'>Chat Center</p>
    <p className='cursor-pointer'>Download</p>

    {/* Language */}
    <Popover
      renderPopover={
        <div className='rounded-sm border border-gray-200 bg-white shadow-md'>
          <button className='block px-4 py-2 hover:text-orange' onClick={() => changeLanguage('vi')}>
            Tiếng Việt
          </button>
          <button className='block px-4 py-2 hover:text-orange' onClick={() => changeLanguage('en')}>
            English
          </button>
        </div>
      }
    >
      <div className='flex items-center cursor-pointer'>
        <svg className='h-5 w-5 mr-1' viewBox='0 0 24 24' fill='none' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M12 3v18m9-9H3' />
        </svg>
        <span>{currentLanguage}</span>
      </div>
    </Popover>

    {/* Notifications */}
    <Popover
      placement='bottom-end'
      renderPopover={
                  <div className='w-[300px] rounded-sm border border-gray-200 bg-white shadow-md text-black'>
                    {notifications && notifications.length > 0 ? (
                      <div className='p-2'>
                        <div className='text-sm font-semibold text-gray-500 mb-3'>Thông báo</div>
                        {notifications.slice(0, MAX_PURCHASES).map((n) => (
                          <div key={n._id} className='flex gap-2 p-2 hover:bg-gray-100 bg-gray-50 rounded mb-2'>
                            <img
                              src={
                                n.type === 'message'
                                  ? 'https://cdn.tgdd.vn/hoi-dap/929605/cach-tat-tu-dong-luu-anh-tren-messenger-100.jpg'
                                  : 'https://png.pngtree.com/png-clipart/20190705/original/pngtree-vector-notification-icon-png-image_4187244.jpg'
                              }
                              className='w-10 h-10 rounded-full object-cover'
                              alt='icon'
                            />
                            <div className='flex-1'>
                              <div className='font-medium text-sm'>{n.content}</div>
                              <div className='text-xs text-gray-400'>
                                {moment(n.timestamp).calendar()}
                              </div>
                              {n.status === 'unread' && (
                                <div className='w-2 h-2 mt-1 bg-blue-500 rounded-full'></div>
                              )}
                              {n.type === 'friend_request' && n.status === 'unread' && (
                                <div className='mt-2 flex gap-2'>
                                  <button onClick={() => handleAcceptFriend(n)} className='bg-green-500 text-white px-2 py-1 rounded text-xs'>
                                    Accept
                                  </button>
                                  <button onClick={() => handleDeclineFriend(n)} className='bg-red-500 text-white px-2 py-1 rounded text-xs'>
                                    Decline
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className='p-4 flex flex-col items-center justify-center'>
                        <img src={noproduct} className='w-16 h-16 mb-2' />
                        <span className='text-sm'>Không có thông báo</span>
                      </div>
                    )}
                  </div>}
    >
      <div className='relative cursor-pointer'>
        <AiOutlineBell className='w-6 h-6' />
        {notifications?.some(n => n.status === 'unread') && (
          <span className='absolute top-[-5px] right-[-8px] text-[10px] bg-red-500 text-white rounded-full px-1'>
            {notifications.filter(n => n.status === 'unread').length}
          </span>
        )}
      </div>
    </Popover>

    {/* Auth section */}
    {isAuthenticated ? (
      <Popover renderPopover={
 <div className='rounded-sm border border-gray-200 bg-white shadow-md'>
                      <Link to={path.profile} className='block px-4 py-2 hover:text-orange'>
                        My Account
                      </Link>
                      <button onClick={handleLogout} className='block px-4 py-2 hover:text-orange w-full text-left'>
                        Logout
                      </button>
                    </div>}>
        <div className='flex items-center gap-2 cursor-pointer'>
          <img src={getAvatarUrl(profile?.avatar)} className='w-6 h-6 rounded-full object-cover' alt='avatar' />
          <span className='text-sm'>{profile?.phone}</span>
        </div>
      </Popover>
    ) : (
      <div className='flex gap-3'>
        <Link to={path.register} className='hover:text-orange'>Register</Link>
        <Link to={path.login} className='hover:text-orange'>Login</Link>
      </div>
    )}
  </div>
</div>
          
        </div>
      </div>
    </div>
  )
}
