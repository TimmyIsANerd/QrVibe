import { useState } from 'react'
import { Head } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'
import axios from 'axios'

export default function Login() {
  const [formData, setFormData] = useState({
    emailAddress: '',
    password: '',
  })

  const [error, setError] = useState(false)

  function Error() {
    return (
      <p className="mt-3 text-center text-[14px] font-normal text-[#8C8CA1]">
        Incorrect Email/Password?{' '}
        <a
          className="text-error underline hover:cursor-pointer"
          href="/reset/password"
        >
          Reset Password
        </a>
      </p>
    )
  }

  function handleChange(e) {
    const key = e.target.id
    const value = e.target.value

    setFormData((formData) => ({
      ...formData,
      [key]: value,
    }))
  }

  function clearField() {
    setFormData((formData) => ({
      ...formData,
      emailAddress: '',
      password: '',
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    axios
      .post('/login', formData)
      .then((res) => {
        if (res.status === 200) {
          Inertia.get('/dashboard')
        }
      })
      .catch((error) => {
        const { message } = error.response.data
        if (message === "The provided email and password didn't match") {
          setError(true)
          clearField()
        }
      })
  }

  return (
    <>
      <Head>
        <title>QrVibe | Login</title>
      </Head>
      <main className="my-[5rem] flex h-full w-full items-center justify-center">
        <div className="w-[280px]">
          <div className="w-full">
            <img src="/images/logo/qr.svg" alt="" />
            <p className="mx-auto text-center text-[#8C8CA1]">
              Generate Free Dynamic QR Codes
            </p>
          </div>
          <form
            className="my-3 flex flex-col gap-y-2"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div
              className={`flex h-[60px] items-center justify-start gap-x-1 rounded-md border-2 p-2 ${
                error ? 'border-error' : 'border-[#DFD9C6]'
              }`}
            >
              <img
                src="/images/icons/msg.svg"
                className="h-[20px] w-[20px]"
                alt="MSG Icon"
              />
              <input
                type="email"
                id="emailAddress"
                className="h-full w-full border-0 bg-transparent text-[16px] text-secondary outline-none placeholder:text-[16px]"
                placeholder="Email Address"
                value={formData.emailAddress}
                onChange={handleChange}
                required
              />
            </div>
            <div
              className={`flex h-[60px] items-center justify-start gap-x-1 rounded-md border-2 p-2 ${
                error ? 'border-error' : 'border-[#DFD9C6]'
              }`}
            >
              <img
                src="/images/icons/lock.svg"
                className="h-[20px] w-[20px]"
                alt="Lock Icon"
              />
              <input
                type="password"
                id="password"
                className="h-full w-full border-0 bg-transparent text-[16px] text-secondary outline-none placeholder:text-[16px]"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="h-[60px] rounded-md bg-primary text-[#ECF1F4] disabled:bg-[#f5f5f5]"
            >
              Login
            </button>
            {error && <Error />}
            <p className="mt-7 text-center text-[14px] font-normal text-[#8C8CA1]">
              Don't have an Account?{' '}
              <a
                className="text-[#285A8C] underline hover:cursor-pointer"
                href="/"
              >
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </main>
    </>
  )
}
