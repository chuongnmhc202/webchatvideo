import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { HttpStatusCode } from 'axios'
import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import authApi from 'src/apis/auth.api'
import Button from 'src/components/Button'
import Input from 'src/components/Input'
import { AppContext } from 'src/contexts/app.context'
import { SuccessResponse } from 'src/types/utils.type'
import { IAuthSchema, AuthSchema } from 'src/utils/rules'
import { connectSocket, disconnectSocket } from "src/socket/socket";

import { isAxiosError, isAxiosUnprocessableEntityError } from 'src/utils/utils'
import ForgotPasswordModal from './ForgotPasswordModal'

type FormData = Pick<IAuthSchema, 'email' | 'password'>
export const loginSchema = AuthSchema.pick(['email', 'password'])
export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  // loginAccount Mutation
  const loginAccountMutation = useMutation(authApi.loginAccount)

  // handle submit
  const onSubmit = handleSubmit(
    (data) => {
      loginAccountMutation.mutate(data, {
        onSuccess: (data) => {
          console.log('data', data.data.data)
          setProfile(data.data.data.user)
          setIsAuthenticated(true)
          connectSocket(data.data.data.user.phone as string);
          navigate('/')
        },
        onError: (error) => {
          if (isAxiosUnprocessableEntityError<SuccessResponse<FormData>>(error)) {
            console.log('error', error)
            const formError = error.response?.data?.data
            if (formError) {
              Object.keys(formError).forEach((key) => {
                setError(
                  key as keyof FormData,
                  {
                    type: 'Server',
                    message: formError[key as keyof FormData]
                  },
                  { shouldFocus: true }
                )
              })
            }
          }
          if (isAxiosError(error) && error.response?.status !== HttpStatusCode.UnprocessableEntity) {
            console.log('errorAxios', error)
          }
        }
      })
    },
    (error) => {
      console.log('error', error)
    }
  )

  const [isForgotOpen, setIsForgotOpen] = useState(false)

  const handleForgotSubmit = (data: { email: string; phone: string }) => {
    console.log('Forgot password data:', data)
    // Gọi API forgot password ở đây
    setIsForgotOpen(false)
  }

  return (
    <div className='h-[600px] bg-lime-200'>
      <Helmet>
        <title>Login | WEB CHAT</title>
        <meta name='description' content='Login | WEB CHAT' />
      </Helmet>
      <div className="container bg-[url('https://salt.tikicdn.com/ts/upload/df/48/21/b4d225f471fe06887284e1341751b36e.png')] bg-contain bg-center bg-no-repeat">
        <div className='grid grid-cols-1 py-12 lg:h-[470px] lg:grid-cols-5 lg:pr-10'>
          <div className='md:col-span-2 md:col-start-4 md:mx-8'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit}>
              <div className='text-2xl'>ĐĂNG NHẬP</div>
              <Input
                className='mt-6'
                type='email'
                placeholder='Email'
                name='email'
                register={register}
                errorMessage={errors.email?.message}
              />
              <Input
                className='my-2'
                type='password'
                placeholder='Password'
                name='password'
                register={register}
                errorMessage={errors.password?.message}
              />
              <Button
                type='submit'
                isLoading={loginAccountMutation.isLoading}
                disabled={loginAccountMutation.isLoading}
                className='flex w-full justify-center bg-teal-500 px-2 py-4 text-sm uppercase text-white hover:bg-teal-600'
              >
                Login
              </Button>
              <div className='mt-9 flex items-center justify-center gap-1 text-center'>
                <span className='text-gray-400'>Do not have an account?</span>
                <Link to='/register' className='text-teal-400'>
                  Register
                </Link>
              </div>
                    <div className='mt-2 flex items-center justify-center gap-1 text-center'>
        <span className='text-gray-400'>Forgotten password?</span>
        <span
          className='cursor-pointer text-teal-400'
          onClick={() => setIsForgotOpen(true)}
        >
          Forgot Password
        </span>
      </div>
<ForgotPasswordModal
  isOpen={isForgotOpen}
  onClose={() => setIsForgotOpen(false)}
/>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
