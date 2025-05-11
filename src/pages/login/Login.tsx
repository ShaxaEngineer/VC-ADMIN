/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { LOGIN } from '@/assets';
import { SUPER_ADMIN_ROLES } from '@/constants';
import { useAppDispatch, usePost } from '@/hooks';
import { signIn } from '@/store';
import { employeeEnterRole } from '@/utils';
import { errorMasseg, successMasseg } from '@/utils/toastify';

interface TPostData {
  username: string;
  password: string;
}

export const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<TPostData>();
  const [type, settype] = useState(true);
  const { mutate, isLoading } = usePost();
  const { t } = useTranslation();
  const onSubmit = (data: TPostData) => {
    mutate({
      url: 'admin/login',
      data: { ...data },
      onSuccess: ({ data }: any) => {
        navigate(employeeEnterRole(SUPER_ADMIN_ROLES));
        dispatch(signIn(data));
        successMasseg(t('Tizimga kirish muvaffaqiyatli amalga oshirildi!'));
      },
      onError: (err: any) => {
        errorMasseg(err?.response?.data?.detail);
      },
    });
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${LOGIN})`,
        }}
        className="flex h-max min-h-screen w-full items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat pb-24 pt-10"
      >
        <div className="fixed left-0 top-0 z-10 h-screen w-full bg-gradient-to-r from-fuchsia-400 to-cyan-400 opacity-15"></div>
        <div className="relative z-20 w-[435px] max-md:w-full">
          <div className="relative z-30 mx-auto flex w-[435px] flex-col items-center justify-center gap-0 rounded-md bg-white/90 p-6 shadow-[-1px_-1px_1px_1px_rgba(236,22,102,0.5),_1px_1px_1px_1px_rgba(79,93,229,0.5)] backdrop-blur-sm max-md:w-[90%]">
            <div className="mt-2 text-center text-3xl font-extrabold text-primary">PWR</div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-7 flex w-full flex-col items-center justify-center gap-6"
            >
              {/* login */}
              <div className="flex w-full flex-col items-start justify-center gap-2">
                <label htmlFor="login-login" className="text-sm font-semibold">
                  {t('Foydalanuvchi nomi')}
                </label>
                <div className="relative w-full">
                  <label
                    htmlFor="login-login"
                    className="absolute left-3 top-[50%] h-max w-max translate-y-[-50%]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="16"
                      height="16"
                      x="0"
                      y="0"
                      viewBox="0 0 512 512.002"
                      className="[enable-background:new 0 0 512 512] fill-gray-400"
                      xmlSpace="preserve"
                    >
                      <g>
                        <path
                          d="M210.352 246.633c33.882 0 63.222-12.153 87.195-36.13 23.973-23.972 36.125-53.304 36.125-87.19 0-33.876-12.152-63.211-36.129-87.192C273.566 12.152 244.23 0 210.352 0c-33.887 0-63.22 12.152-87.192 36.125s-36.129 53.309-36.129 87.188c0 33.886 12.156 63.222 36.133 87.195 23.977 23.969 53.313 36.125 87.188 36.125zM426.129 393.703c-.692-9.976-2.09-20.86-4.149-32.351-2.078-11.579-4.753-22.524-7.957-32.528-3.308-10.34-7.808-20.55-13.37-30.336-5.774-10.156-12.555-19-20.165-26.277-7.957-7.613-17.699-13.734-28.965-18.2-11.226-4.44-23.668-6.69-36.976-6.69-5.227 0-10.281 2.144-20.043 8.5a2711.03 2711.03 0 0 1-20.879 13.46c-6.707 4.274-15.793 8.278-27.016 11.903-10.949 3.543-22.066 5.34-33.039 5.34-10.972 0-22.086-1.797-33.047-5.34-11.21-3.622-20.296-7.625-26.996-11.899-7.77-4.965-14.8-9.496-20.898-13.469-9.75-6.355-14.809-8.5-20.035-8.5-13.313 0-25.75 2.254-36.973 6.7-11.258 4.457-21.004 10.578-28.969 18.199-7.605 7.281-14.39 16.12-20.156 26.273-5.558 9.785-10.058 19.992-13.371 30.34-3.2 10.004-5.875 20.945-7.953 32.524-2.059 11.476-3.457 22.363-4.149 32.363A438.821 438.821 0 0 0 0 423.949c0 26.727 8.496 48.363 25.25 64.32 16.547 15.747 38.441 23.735 65.066 23.735h246.532c26.625 0 48.511-7.984 65.062-23.734 16.758-15.946 25.254-37.586 25.254-64.325-.004-10.316-.351-20.492-1.035-30.242zm0 0"
                          opacity="1"
                          data-original="#000000"
                        ></path>
                      </g>
                    </svg>
                  </label>
                  <input
                    id="login-login"
                    type="text"
                    placeholder={t('Foydalanuvchi nomi')}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 pl-[36px] text-sm outline-none focus:border-primary"
                    {...register('username', { required: true })}
                  />
                </div>
              </div>
              {/* passworsd */}
              <div className="flex w-full flex-col items-start justify-center gap-2">
                <label htmlFor="login-password" className="text-sm font-semibold">
                  {t('Foydalanuvchi paroli')}
                </label>
                <div className="relative w-full">
                  <label
                    htmlFor="login-password"
                    className="absolute left-3 top-[50%] h-max w-max translate-y-[-50%]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="16"
                      height="16"
                      x="0"
                      y="0"
                      viewBox="0 0 24 24"
                      className="[enable-background:new 0 0 512 512] fill-gray-400"
                      xmlSpace="preserve"
                    >
                      <g>
                        <path
                          d="M18.75 9H18V6c0-3.309-2.691-6-6-6S6 2.691 6 6v3h-.75A2.253 2.253 0 0 0 3 11.25v10.5C3 22.991 4.01 24 5.25 24h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5C21 10.009 19.99 9 18.75 9zM8 6c0-2.206 1.794-4 4-4s4 1.794 4 4v3H8zm5 10.722V19a1 1 0 1 1-2 0v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z"
                          opacity="1"
                          data-original="#000000"
                        ></path>
                      </g>
                    </svg>
                  </label>
                  <input
                    id="login-password"
                    type={type ? 'password' : 'text'}
                    placeholder={t('Foydalanuvchi paroli')}
                    className="w-full rounded-md border border-gray-300 bg-white px-[36px] py-2 text-sm outline-none focus:border-primary"
                    {...register('password', { required: true })}
                  />
                  <div
                    className="absolute right-3 top-[50%] h-max w-max translate-y-[-50%] cursor-pointer"
                    onClick={() => settype((e) => !e)}
                  >
                    {type ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="20"
                        height="20"
                        x="0"
                        y="0"
                        viewBox="0 0 512 512"
                        className="[enable-background:new 0 0 512 512] fill-gray-400"
                        xmlSpace="preserve"
                      >
                        <g>
                          <path
                            fillRule="evenodd"
                            d="M153.349 255.994c0-56.578 46.02-102.617 102.659-102.617 56.579 0 102.598 46.038 102.598 102.617 0 56.591-46.019 102.61-102.598 102.61-56.64 0-102.659-46.019-102.659-102.61zm-124.815-9.79c-3.54 6.403-3.54 13.177 0 19.586 45.959 82.53 133.115 133.799 227.474 133.799 94.297 0 181.454-51.268 227.413-133.799 3.601-6.409 3.601-13.183 0-19.586-45.959-82.53-133.115-133.793-227.413-133.793-94.359 0-181.515 51.263-227.474 133.793zm227.474-59.197c-38.085 0-69.03 30.944-69.03 68.987 0 38.042 30.944 68.987 69.03 68.987 38.024 0 68.968-30.944 68.968-68.987s-30.944-68.987-68.968-68.987z"
                            clipRule="evenodd"
                            opacity="1"
                            data-original="#000000"
                          ></path>
                        </g>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="20"
                        height="20"
                        x="0"
                        y="0"
                        viewBox="0 0 512 512"
                        className="[enable-background:new 0 0 512 512] fill-gray-400"
                        xmlSpace="preserve"
                      >
                        <g>
                          <path
                            d="M436.193 169.626a453.083 453.083 0 0 0-16.589-13.59l-64.701 64.701A104.558 104.558 0 0 1 361 256c0 57.897-47.103 105-105 105a104.534 104.534 0 0 1-35.263-6.098l-48.558 48.558C200.535 415.092 228.66 421 256 421c32.657 0 66.432-8.396 100.384-24.955 26.662-13.005 53.514-31.063 79.809-53.671 44.455-38.226 71.841-76.024 72.984-77.615a14.997 14.997 0 0 0 0-17.518c-1.144-1.591-28.529-39.389-72.984-77.615z"
                            opacity="1"
                            data-original="#000000"
                          ></path>
                          <path
                            d="M256 331c41.355 0 75-33.645 75-75 0-3.598-.27-7.134-.763-10.598l-84.835 84.835c3.465.493 7 .763 10.598.763zM507.607 4.394c-5.857-5.857-15.355-5.857-21.213 0L368.546 122.242a305.247 305.247 0 0 0-12.162-6.286C322.432 99.396 288.657 91 256 91s-66.432 8.396-100.384 24.955c-26.662 13.005-53.514 31.063-79.809 53.671-44.454 38.226-71.84 76.024-72.984 77.615a14.997 14.997 0 0 0 0 17.518c1.144 1.591 28.529 39.39 72.984 77.615 13.623 11.713 27.396 22.192 41.214 31.391L4.394 486.394c-5.858 5.857-5.858 15.355 0 21.213C7.323 510.535 11.161 512 15 512s7.678-1.465 10.606-4.394l482-482c5.859-5.857 5.859-15.355.001-21.212zM151 256c0-57.897 47.103-105 105-105 23.551 0 45.315 7.794 62.85 20.938l-21.52 21.52C285.471 185.594 271.265 181 256 181c-41.355 0-75 33.645-75 75 0 15.264 4.594 29.47 12.458 41.33l-21.52 21.52C158.794 301.315 151 279.551 151 256z"
                            opacity="1"
                            data-original="#000000"
                          ></path>
                        </g>
                      </svg>
                    )}
                  </div>
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-md bg-gradient-to-r from-[#ef1262] to-[#4361ee] p-2 text-center text-base font-semibold text-white drop-shadow-xl hover:from-[#4361ee] hover:to-[#ef1262]"
              >
                {isLoading ? <LoadingOutlined /> : t('Kirish')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
