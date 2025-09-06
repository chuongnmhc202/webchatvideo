import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import friendApi from 'src/apis/friend.api'
import { BlockedFriend } from 'src/types/product.type'
import { User } from 'src/types/user.type'
import { useQueryClient } from '@tanstack/react-query'

export default function Block() {
    const queryClient = useQueryClient()
    // Lấy profile từ localStorage
    const { data: profileDataLS } = useQuery<User, AxiosError, User>({
        queryKey: ['profile'],
        queryFn: async () => {
            const raw = localStorage.getItem('profile')
            if (!raw) throw new Error('No profile found in localStorage')
            return JSON.parse(raw) as User
        },
    })

    // Lấy danh sách bạn bị block
    const { data: blockedFriends } = useQuery<BlockedFriend[], AxiosError, BlockedFriend[]>({
        queryKey: ['blocked-friends', profileDataLS?.phone],
        queryFn: () =>
            friendApi.getblockfriend(profileDataLS!.phone || '').then(res => res.data),
        enabled: !!profileDataLS?.phone,
    })

    return (
        <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
            <div className='border-b border-b-gray-200 py-6'>
                <h1 className='text-lg font-medium capitalize text-gray-900'>
                    Danh Sách Người dùng bị chặn
                </h1>
                <div className='mt-1 text-sm text-gray-700'>
                    Quản lý thông tin hồ sơ để bảo mật tài khoản
                </div>
            </div>

            <div className='mt-4 space-y-3'>
                {blockedFriends?.map((friend: BlockedFriend) => (
                    <div
                        key={friend.u_phone}
                        className='flex items-center justify-between border p-2 rounded'
                    >
                        <div className='flex items-center space-x-3'>
                            <img
                                src={friend.u_avatar}
                                alt={friend.u_name}
                                className='w-10 h-10 rounded-full object-cover'
                            />
                            <div>
                                <p className='font-medium'>{friend.u_name}</p>
                                <p className='text-sm text-gray-500'>{friend.u_email}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                friendApi
                                    .unfriend({
                                        senderPhone: profileDataLS!.phone || '',
                                        receiverPhone: friend.u_phone
                                    })
                                    .then(() => {
                                        // Sau khi huỷ chặn, refetch lại danh sách
                                        queryClient.invalidateQueries(['blocked-friends', profileDataLS!.phone])
                                    })
                                    .catch(err => {
                                        console.error('Lỗi khi huỷ chặn:', err)
                                    })
                            }}
                            className='px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600'
                        >
                            Huỷ chặn
                        </button>

                    </div>
                ))}

                {!blockedFriends?.length && (
                    <p className='text-gray-500 text-sm'>
                        Không có người dùng nào bị chặn
                    </p>
                )}
            </div>
        </div>
    )
}
