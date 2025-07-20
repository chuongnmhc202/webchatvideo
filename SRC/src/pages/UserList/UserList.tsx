import { useQuery  } from '@tanstack/react-query'
import userApi from 'src/apis/user.api'
import { useEffect, useRef, useState } from "react";
// import categoryApi from 'src/apis/categoriest'
import Pagination from 'src/components/Pagination'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { UserTListConfig, UserT as ProductType } from 'src/types/product.type'
import AsideFilter from './components/AsideFilter'
import AsideFilterMessage from './components/AsideFilterMessage'
import AsideFilterMessageGroup from './components/AsideFilterMessageGroup'
import SortUserList from './components/SortUserList'
import { Head } from 'src/components/head'
import ChatBox from './components/ChatBox'
import { User } from 'src/types/user.type'
import UserComponent from './components/User/User'
import { MessagesProvider } from 'src/contexts/MessagesContext';

export default function UserList() {
  const queryConfig = useQueryConfig()
  const [selectedCategory, setSelectedCategory] = useState('0')
  const { data: profileDataLS, refetch } = useQuery<User>({
    queryKey: ['profile'],
    queryFn: async () => {
      const raw = localStorage.getItem('profile');
      if (!raw) throw new Error('No profile found in localStorage');
      return JSON.parse(raw) as User;
    },
  });

  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return userApi.getListUser(queryConfig as UserTListConfig, profileDataLS?.phone as string)
    },
    enabled: !!profileDataLS?.phone && selectedCategory === '3',
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  // console.log(productsData?.data.data)


  const categoriesDataFEATURE = [
    { _id: '1', name: 'Bạn bè' ,icon:'' },
    { _id: '2', name: 'Nhóm', icon:'🎁' },
    { _id: '3', name: 'Tìm kiếm người dùng', icon:'💻' }
  ]


  const handleChangeCategory = (categoryId: string) => {
    setSelectedCategory(categoryId)
  }

return (
  <MessagesProvider>

{profileDataLS?.phone && (

    <div className='bg-gray-200'>
      <Head title={'Trang chủ | Shopee Clone'} />
      <div className='container-fluid'>
        <div className='grid grid-cols-12 gap-2 overflow-hidden'>

          {/* Sidebar: chiếm 2 phần */}
          <div className='md:col-span-1'>
            <AsideFilter
              categories={categoriesDataFEATURE}
              selectedCategory={selectedCategory}
              onChangeCategory={handleChangeCategory}
            />
          </div>

          <div className="md:col-span-11 h-[calc(100vh-80px)] overflow-hidden grid grid-cols-12 gap-2">
  {/* Sidebar 3 phần */}
  {(selectedCategory === '1' || selectedCategory === '2') && (
    <div className="col-span-3 h-full overflow-hidden">
      {selectedCategory === '1' && <AsideFilterMessage selectedCategory={selectedCategory} />}
      {selectedCategory === '2' && <AsideFilterMessageGroup selectedCategory={selectedCategory} />}
    </div>
  )}

  {/* Nội dung chính: ChatBox hoặc Tìm kiếm người dùng */}
  <div
    className={`${
      selectedCategory === '1' || selectedCategory === '2'
        ? 'col-span-9'
        : 'col-span-12'
    } h-full overflow-hidden`}
  >
    {selectedCategory === '3' ? (
      productsData ? (
        <div className='h-full overflow-y-auto p-4'>
          <SortUserList
            queryConfig={queryConfig}
            pageSize={productsData.data.data.pagination.page_size}
          />
          <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4'>
            {productsData.data.data.users.map((product: ProductType) => (
              <div className='col-span-1' key={product.phone}>
                <UserComponent product={product} profileDataLS={profileDataLS as User} />
              </div>
            ))}
          </div>
          <Pagination
            queryConfig={queryConfig}
            pageSize={productsData.data.data.pagination.page_size}
          />
        </div>
      ) : null
    ) : (selectedCategory === '1' || selectedCategory === '2') ? (
      <div className='h-full'>
        <ChatBox selectedCategory={selectedCategory} />
      </div>
    ) : (
      <div className='fixed inset-0 flex flex-col items-center justify-center bg-white p-4 text-center'>
        <img
          src='https://img.freepik.com/free-vector/social-media-concept-illustration_114360-4313.jpg'
          alt='Welcome illustration'
          className='max-w-full w-3/4 md:w-1/2 lg:w-1/3 rounded-lg shadow-lg transition-transform hover:scale-105'
        />
        <h2 className='mt-6 text-2xl font-bold text-gray-700'>Chào mừng bạn đến với hệ thống trò chuyện</h2>
        <p className='mt-2 text-gray-500 text-base'>Vui lòng chọn một danh mục để bắt đầu trò chuyện</p>
      </div>
    )}
  </div>
</div>


          {/* Sidebar: chiếm 3 phần
            {(selectedCategory === '1' || selectedCategory === '2') && (
            <div className="md:col-span-3 min-h-screen">
              {selectedCategory === '1' && <AsideFilterMessage selectedCategory={selectedCategory} />}
              {selectedCategory === '2' && <AsideFilterMessageGroup selectedCategory={selectedCategory} />}
            </div>
          )} */}

          {/* Nội dung chính: chiếm 9 phần */}
          {/* <div
            className={`${
              selectedCategory === '1' || selectedCategory === '2'
                ? 'md:col-span-8 overflow-hidden'
                : 'md:col-span-11 overflow-hidden'
            }` }
          >
            {selectedCategory === '3' ? (
              productsData ? (
                <div className=''>
                  <SortUserList
                    queryConfig={queryConfig}
                    pageSize={productsData.data.data.pagination.page_size}
                  />
                  <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4'>
                    {productsData.data.data.users.map((product: ProductType) => (
                      <div className='col-span-1' key={product.phone}>
                        <UserComponent product={product} profileDataLS={profileDataLS as User} />
                      </div>
                    ))}
                  </div>
                  <Pagination
                    queryConfig={queryConfig}
                    pageSize={productsData.data.data.pagination.page_size}
                  />
                </div>
              ) : null
            ) : (selectedCategory === '1' || selectedCategory === '2') ? (
              <div className="md:col-span-2
              ">
              <ChatBox 
                selectedCategory={selectedCategory}
              />

              </div>
            ) : (
              <div className='fixed inset-0 flex flex-col items-center justify-center bg-white p-4 text-center'>
                <img
                  src='https://img.freepik.com/free-vector/social-media-concept-illustration_114360-4313.jpg'
                  alt='Welcome illustration'
                  className='max-w-full w-3/4 md:w-1/2 lg:w-1/3 rounded-lg shadow-lg transition-transform hover:scale-105'
                />
                <h2 className='mt-6 text-2xl font-bold text-gray-700'>Chào mừng bạn đến với hệ thống trò chuyện</h2>
                <p className='mt-2 text-gray-500 text-base'>Vui lòng chọn một danh mục để bắt đầu trò chuyện</p>
              </div>
            )}

          </div> */}

        </div>
      </div>
    </div>

     )}
  </MessagesProvider>
)

}
