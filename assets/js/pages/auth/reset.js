import { useState } from 'react'
import { Head } from '@inertiajs/inertia-react'

export default function Reset() {
  const [emailAddress, setEmailAddress] = useState('')
  const [message, setMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage('')
    const response = await fetch('/reset/password', {
      method: 'POST',
      body: JSON.stringify({ emailAddress }),
    })

    if (response.status === 200) {
      setMessage(
        'A password reset email has been sent to your email address. Please check your email and follow the instructions to reset your password.'
      )
    }

    if (response.status === 404) {
      setMessage('Failed to Find Email Address on Database')
    }

    if (response.status === 500) {
      setMessage('Server Error')
    }
  }
  return (
    <>
      <Head>
        <title>Reset Password</title>
      </Head>
      <main className="my-[5rem] flex h-full w-full items-center justify-center">
        <div className="w-[280px]">
          <div className="w-full">
            <img src="/images/logo/qr.svg" alt="" />
            <p className="mx-auto text-center text-[#8C8CA1]">
              Reset Your Password
            </p>
          </div>
          <form
            className="my-3 flex flex-col gap-y-2"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div
              className={`flex h-[60px] items-center justify-start gap-x-1 rounded-md border-2 p-2 ${
                message === '' ? 'border-[#DFD9C6]' : 'border-error'
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
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-center">
              <p className="text-center text-[15px] text-secondary">
                {message}
              </p>
            </div>
            <button
              type="submit"
              className="h-[60px] rounded-md bg-primary text-[#ECF1F4] disabled:bg-[#f5f5f5]"
            >
              Reset Password
            </button>
          </form>
        </div>
      </main>
    </>
  )
}
