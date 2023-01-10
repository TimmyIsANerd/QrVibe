import { Head } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'
import { useState } from 'react'

export default function NewPassword({ user }) {
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState('')

  async function handleSubmit(e) {
    setMessage('')
    e.preventDefault()

    const response = await fetch('/new/password', {
      method: 'POST',
      body: JSON.stringify({ emailAddress: user.emailAddress, newPassword }),
    })

    if (response.status === 200) {
      setMessage('Successfully Changed Password')
      Inertia.get('/dashboard')
    }

    if (response.status === 401) {
      setMessage("Password can't be less than 8 characters")
    }

    if (response.status === 409) {
      setMessage('Failed to Change Password... Please try again later')
    }
  }
  return (
    <>
      <Head>
        <title>Set New Passsword</title>
      </Head>

      <main className="my-[5rem] flex h-full w-full items-center justify-center">
        <div className="w-[280px]">
          <div className="w-full">
            <img src="/images/logo/qr.svg" alt="" />
            <p className="mx-auto text-center text-[#8C8CA1]">
              Reset Your Password
            </p>
            <p className="mx-auto text-center text-[#8C8CA1]">
              {user.emailAddress}
            </p>
          </div>
          <form
            className="my-3 flex flex-col gap-y-2"
            onSubmit={(e) => handleSubmit(e)}
          >
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
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <p className="text-center text-secondary">{message}</p>
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
