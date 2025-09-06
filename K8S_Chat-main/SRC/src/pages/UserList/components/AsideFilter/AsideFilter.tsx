import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { Category } from 'src/types/category.type'
import { useTranslation } from 'react-i18next'
import { MdMessage,MdMarkEmailUnread, MdGroup, MdPersonSearch, MdCloud, MdCloudQueue, MdCrop, MdCropFree, MdScreenshotMonitor, MdBuild, MdHomeRepairService, MdWork, MdSettings } from 'react-icons/md'
import Popover from '../../../../components/Popover'

interface Props {
  categories: Category[]
  selectedCategory: string
  onChangeCategory: (id: string) => void
  isScreenSM: boolean
}

export default function AsideFilter({ categories, selectedCategory, onChangeCategory, isScreenSM }: Props) {
  const { t } = useTranslation('home')

  return (
    <div className={`fixed left-0 top-0 z-20 h-screen bg-blue-600 p-3 shadow-lg overflow-hidden ${isScreenSM ? 'w-[70px]' : ''}`}>



      <div className="flex h-full flex-col justify-between">
        {/* TOP SECTION - Category Icons */}
        <div>
          <div
            className="flex justify-center items-center mb-6 cursor-pointer"
            onClick={() => onChangeCategory('')}
          >
            <Link to='/'>
              <img
                src="https://png.pngtree.com/png-clipart/20190925/original/pngtree-cartoon-social-chat-life-icon-png-image_4977759.jpg"
                alt="Logo"
                className="h-20 w-20 rounded-full object-cover shadow-md hover:scale-105 transition-transform duration-300"
              />
            </Link>
          </div>

          <div className="my-4  mb-4 h-px w-full bg-gray-200" />

          <ul className="space-y-3 text-center">
            {categories.map((categoryItem) => {
              const isActive = categoryItem._id === selectedCategory;

              let IconComponent = null;
              if (categoryItem._id === '1') IconComponent = MdMessage;
              else if (categoryItem._id === '4') IconComponent = MdMarkEmailUnread;
              else if (categoryItem._id === '2') IconComponent = MdGroup;
              else if (categoryItem._id === '3') IconComponent = MdPersonSearch;

              return (
                <li key={categoryItem._id}>
                  <div
                    className={clsx(
                      'mx-auto flex items-center text-white justify-center items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer',
                      {
                        'bg-orange/20 text-orange font-semibold': isActive,
                        'hover:bg-gray-300': !isActive,
                      }
                    )}
                    onClick={() => onChangeCategory(categoryItem._id)}
                  >
                    {/* {IconComponent && <IconComponent className="text-3xl" />} */}
                    <Popover
                    renderPopover={
<div className="relative bg-white rounded-lg border border-gray-200 shadow-lg px-3 py-2 text-sm font-medium text-gray-800">
  {categoryItem.name}
  {/* Mũi tên chỉ xuống */}
</div>

                    }
                  >
                    <div
                      className={clsx(
                        'mx-auto flex items-center text-white justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer',
                        {
                          'bg-orange/20 text-orange font-semibold': isActive,
                          'hover:bg-gray-300': !isActive,
                        }
                      )}
                      onClick={() => onChangeCategory(categoryItem._id)}
                    >
                      {IconComponent && <IconComponent className="text-3xl" />}
                    </div>
                  </Popover>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* BOTTOM SECTION - Static Icons */}
        <ul className="space-y-3 mt-4 text-center">
          <li>
            <div className="mx-auto flex items-center text-white justify-center w-12 h-12 rounded-lg hover:bg-gray-200 hover:text-orange transition-colors cursor-pointer">
              <MdCloud className="text-3xl" />
            </div>
          </li>
          <li>
            <div className="mx-auto flex items-center text-white justify-center w-12 h-12 rounded-lg hover:bg-gray-200 hover:text-orange transition-colors cursor-pointer">
              <MdCloudQueue className="text-3xl" />
            </div>
          </li>
          <li>
            <div className="mx-auto flex items-center text-white justify-center w-12 h-12 rounded-lg hover:bg-gray-200 hover:text-orange transition-colors cursor-pointer">
              <MdCropFree className="text-3xl" />
            </div>
          </li>
          <li>
            <div className="mx-auto flex items-center text-white justify-center w-12 h-12 rounded-lg hover:bg-gray-200 hover:text-orange transition-colors cursor-pointer">
              <MdHomeRepairService className="text-3xl" />
            </div>
          </li>
          <li>
            <div className="mx-auto flex items-center text-white justify-center w-12 h-12 rounded-lg hover:bg-gray-200 hover:text-orange transition-colors cursor-pointer">
              <MdSettings className="text-3xl" />
            </div>
          </li>
          <li>
            <div className="mx-auto flex items-center text-white justify-center w-12 h-12 rounded-lg hover:bg-gray-200 hover:text-orange transition-colors cursor-pointer">
              <MdSettings className="text-3xl opacity-0" />
            </div>
          </li>
        </ul>
      </div>
    </div>

  )
}
