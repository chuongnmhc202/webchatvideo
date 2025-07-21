<div className="col-span-11  h-[calc(100vh-80px)] overflow-hidden grid grid-cols-12 gap-2">
    {/* Sidebar 3 phần */}
    {(selectedCategory === '1' || selectedCategory === '2') && (
        <div className="col-span-3 h-full overflow-hidden">
            {selectedCategory === '1' && <AsideFilterMessage selectedCategory={selectedCategory} />}
            {selectedCategory === '2' && <AsideFilterMessageGroup selectedCategory={selectedCategory} />}
        </div>
    )}

    {/* Nội dung chính: ChatBox hoặc Tìm kiếm người dùng */}
    <div
        className={`${selectedCategory === '1' || selectedCategory === '2'
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
                <ChatBox selectedCategory={selectedCategory} onBack={() => setIsMobileChatOpen(false)} />
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
