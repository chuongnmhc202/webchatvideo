import { useMutation } from '@tanstack/react-query'
import { HttpStatusCode } from 'axios'
import React, { useState } from 'react'
import reportApi from 'src/apis/report.api'

interface ForgotPasswordModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ForgotPasswordModal({ isOpen, onClose }: ForgotPasswordModalProps) {
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [message, setMessage] = useState<string | null>(null)

  const forgotPasswordMutation = useMutation({
    mutationFn: (body: { email: string; phone: string }) => reportApi.createForgotPass(body)
  })

const handleForgotPassword = async () => {
  setMessage(null)
  try {
    const res = await forgotPasswordMutation.mutateAsync({ email, phone })
    if (res.status === HttpStatusCode.Ok) {
      setMessage('Mật khẩu mới đã được gửi qua email và số điện thoại của bạn')
    }
  } catch (err: any) {
    if (err?.response?.status === 400) {
      // Lỗi validate (thiếu email/phone)
      setMessage(err.response.data?.error || 'Thông tin không hợp lệ')
    } else if (err?.response?.status === 500) {
      // Lỗi server
      setMessage('Lỗi hệ thống, vui lòng thử lại sau!')
    } else {
      // Lỗi khác
      setMessage('Có lỗi xảy ra, vui lòng thử lại!')
    }
  }
}


  if (!isOpen) return null

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/50'>
      <div className='w-full max-w-md rounded-xl bg-white p-6 shadow-xl'>
        <h2 className='mb-4 text-center text-xl font-semibold'>Quên mật khẩu</h2>
        
        {/* Bỏ form, chỉ dùng div */}
        <div className='space-y-4'>
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <input
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
              placeholder='Nhập email của bạn'
            />
          </div>

          <div>
            <label htmlFor='phone' className='block text-sm font-medium text-gray-700'>
              Số điện thoại
            </label>
            <input
              id='phone'
              type='text'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className='mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
              placeholder='Nhập số điện thoại của bạn'
            />
          </div>

          <button
            onClick={handleForgotPassword}
            disabled={forgotPasswordMutation.isLoading}
            className='w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400'
          >
            {forgotPasswordMutation.isLoading ? 'Đang gửi...' : 'Gửi yêu cầu'}
          </button>
        </div>

        {message && <p className='mt-4 text-center text-green-600'>{message}</p>}

        <div className='mt-4 text-center text-sm'>
          <button onClick={onClose} className='text-blue-600 hover:underline'>
            Quay lại đăng nhập
          </button>
        </div>
      </div>
    </div>
  )
}
