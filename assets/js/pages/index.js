import React from 'react'
import { Head, Inertia, useForm } from '@inertiajs/inertia-react'

export default function Index({ name }) {
  const { data, setData, post, processing, errors } = useForm({
    emailAddress: '',
    password: '',
  })

  function handleSubmit(e) {
    e.preventDefault()
    post('/register')
  }

  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <main className="my-[8rem] flex h-full w-full items-center justify-center">
        <div className="w-[280px]">
          <div>
            <img src="/images/logo/qr.svg" alt="" />
          </div>
          <form
            className="my-3 flex flex-col gap-y-4"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="flex h-[60px] items-center justify-start gap-x-1 rounded-md border-2 border-[#DFD9C6] p-2">
              <img
                src="/images/icons/msg.svg"
                className="h-[20px] w-[20px]"
                alt="MSG Icon"
              />
              <input
                type="email"
                className="h-full w-full border-0 bg-transparent text-[16px] text-secondary outline-none placeholder:text-[16px]"
                placeholder="Email Address"
                value={data.emailAddress}
                onChange={(e) => setData('emailAddress', e.target.value)}
                required
              />
            </div>
            <span>{errors.emailAddress && <div>{errors.email}</div>}</span>
            <div className="flex h-[60px] items-center justify-start gap-x-1 rounded-md border-2 border-[#DFD9C6] p-2">
              <img
                src="/images/icons/lock.svg"
                className="h-[20px] w-[20px]"
                alt="Lock Icon"
              />
              <input
                type="password"
                className="h-full w-full border-0 bg-transparent text-[16px] text-secondary outline-none placeholder:text-[16px]"
                placeholder="Password"
                required
                value={data.password}
                autoComplete="off"
                onChange={(e) => setData('password', e.target.value)}
              />
            </div>
            <span>{errors.password && <div>{errors.password}</div>}</span>
            <button
              type="submit"
              disabled={processing}
              className="h-[60px] rounded-md bg-primary text-[#ECF1F4] disabled:bg-[#f5f5f5]"
            >
              Create An Account
            </button>
            <p className="mt-7 text-center text-[14px] font-normal text-[#8C8CA1]">
              Already have an Account?{' '}
              <a
                className="text-[#285A8C] underline hover:cursor-pointer"
                href="/"
              >
                Sign In
              </a>
            </p>
          </form>
        </div>
      </main>
    </>
  )
}
