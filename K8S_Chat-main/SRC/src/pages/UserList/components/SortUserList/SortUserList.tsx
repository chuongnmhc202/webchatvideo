import clsx from 'clsx'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import { order as orderConstant, sortBy } from 'src/constants/product'
import { UserTListConfig } from 'src/types/product.type'
import omit from 'lodash/omit'
import path from 'src/constants/path'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import useSearchProduct from 'src/hooks/useSearchProduct'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

export default function SortUserList({ queryConfig, pageSize }: Props) {
  const page = Number(queryConfig.page) || 1
  const { sort_by = sortBy.view, order } = queryConfig
  const navigate = useNavigate()
  const { register, onSubmitSearch } = useSearchProduct()

  const isActiveSortBy = (sortByValue: Exclude<UserTListConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }

  const handleSort = (sortByValue: Exclude<UserTListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }

  

  return (
    <div className='w-full bg-gray-100 py-4 shadow-sm'>
      <div className='max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>

        {/* Form tìm kiếm */}
        <form className='flex-1 min-w-0' role='search' onSubmit={onSubmitSearch}>
          <label htmlFor='search' className='sr-only'>
            Tìm kiếm người dùng theo số điện thoại
          </label>
          <div className='relative'>
            <input
              id='search'
              type='text'
              placeholder='Tìm kiếm người dùng theo số điện thoại...'
              className='w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-12 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500'
              // {...register('name')} // nếu dùng react-hook-form thì mở
              {...register('name')}
            />
            <div className='absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='2'
                stroke='currentColor'
                className='h-5 w-5 text-gray-400'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z' />
              </svg>
            </div>
            <button
              type='submit'
              aria-label='Tìm kiếm'
              className='absolute right-2 top-1/2 -translate-y-1/2 rounded bg-lime-500 px-3 py-1 text-white hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-400'
            >
              Tìm
            </button>
          </div>
        </form>

        {/* Sort và nút */}
        <div className='flex flex-wrap gap-2 items-center justify-end md:justify-start'>
          <span className='flex items-center gap-1 text-gray-600 font-medium'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 text-gray-500'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z' />
            </svg>
            Sắp xếp theo:
          </span>
          <button
            onClick={() => handleSort(sortBy.view)}
            className={clsx(
              'rounded px-4 py-2 text-sm transition-colors duration-200',
              {
                'bg-lime-500 text-white shadow hover:bg-lime-600': isActiveSortBy(sortBy.view),
                'bg-white text-gray-700 hover:bg-gray-200': !isActiveSortBy(sortBy.view)
              }
            )}
          >
            Nổi tiếng
          </button>
          <button
            onClick={() => handleSort(sortBy.createdAt)}
            className={clsx(
              'rounded px-4 py-2 text-sm transition-colors duration-200',
              {
                'bg-lime-500 text-white shadow hover:bg-lime-600': isActiveSortBy(sortBy.createdAt),
                'bg-white text-gray-700 hover:bg-gray-200': !isActiveSortBy(sortBy.createdAt)
              }
            )}
          >
            Mới tham gia
          </button>
        </div>
      </div>

      {/* Pagination */}
      <div className='max-w-screen-xl mx-auto mt-6 px-4 flex items-center justify-between gap-3'>
        <div className='text-sm text-gray-600'>
          <span className='text-orange-500 ml-8 font-semibold'>{page}</span> / <span>{pageSize}</span>
        </div>
        <div className='flex gap-1'>
          {page === 1 ? (
            <span className='flex h-8 w-9 items-center justify-center rounded bg-gray-300 text-gray-500 cursor-not-allowed'>
              <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
              </svg>
            </span>
          ) : (
            <Link
              to={{
                pathname: path.home,
                search: createSearchParams({
                  ...queryConfig,
                  page: (page - 1).toString()
                }).toString()
              }}
              className='flex h-8 w-9 items-center justify-center rounded bg-white shadow hover:bg-gray-200'
              aria-label='Trang trước'
            >
              <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
              </svg>
            </Link>
          )}

          {page === pageSize ? (
            <span className='flex h-8 w-9 items-center justify-center rounded bg-gray-300 text-gray-500 cursor-not-allowed'>
              <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
              </svg>
            </span>
          ) : (
            <Link
              to={{
                pathname: path.home,
                search: createSearchParams({
                  ...queryConfig,
                  page: (page + 1).toString()
                }).toString()
              }}
              className='flex h-8 w-9 items-center justify-center rounded bg-white shadow hover:bg-gray-200'
              aria-label='Trang tiếp theo'
            >
              <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
