import React, { useState } from 'react'
import axios from 'axios'
import { Head } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'
import { FiUser } from 'react-icons/fi'

export default function Index({ name }) {
  const [formData, setFormData] = useState({
    fullName: '',
    emailAddress: '',
    password: '',
  })

  const [error, setError] = useState('')

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
      fullName: '',
      emailAddress: '',
      password: '',
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    // Password Validation
    if (formData.password < 8) {
      setError('Password is too short')
    }

    axios
      .post('/register', formData)
      .then((res) => {
        if (res.status === 200) {
          Inertia.get('/dashboard')
        }
      })
      .catch((error) => {
        const { message } = error.response.data
        if (message === 'Email already in use') {
          setError(
            'This email address is already in use. Please log in or reset your password to continue.'
          )
          clearField()
        }
      })
  }

  return (
    <>
      <Head>
        <title>QrVibe | Generate Free Dynamic QR Codes</title>
      </Head>
      <main className="my-[5rem] flex h-full w-full items-center justify-center">
        <div className="w-[280px]">
          <div className="w-full">
            <img src="/images/logo/qr.svg" alt="" />
            <p className="mx-auto text-center text-[#8C8CA1]">
              Generate Free Dynamic QR Codes
            </p>
          </div>
          <form className="my-3 flex flex-col gap-y-2" onSubmit={handleSubmit}>
            <div className="flex h-[60px] items-center justify-start gap-x-1 rounded-md border-2 border-[#DFD9C6] p-2">
              <FiUser className="h-[20px] w-[20px]" color="#DFD9C6" />
              <input
                type="text"
                id="fullName"
                className="h-full w-full border-0 bg-transparent text-[16px] text-secondary outline-none placeholder:text-[16px]"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex h-[60px] items-center justify-start gap-x-1 rounded-md border-2 border-[#DFD9C6] p-2">
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
            <div className="flex h-[60px] items-center justify-start gap-x-1 rounded-md border-2 border-[#DFD9C6] p-2">
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
                minLength="8"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <span>
              <div className="text-center text-error">{error}</div>
            </span>
            <button
              type="submit"
              className="h-[60px] rounded-md bg-primary text-[#ECF1F4] disabled:outline-primary"
            >
              Create Account
            </button>
            <p className="mt-7 text-center text-[14px] font-normal text-[#8C8CA1]">
              Already have an Account?{' '}
              <a
                className="text-[#285A8C] underline hover:cursor-pointer"
                href="/login"
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
