import { Head } from '@inertiajs/inertia-react'
import Navbar from '../../components/Navbar'
import Card from '../../components/Card'

export default function Dashboard({ name, loggedInUser }) {
  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <Navbar />
      <div className="flex flex-row justify-center gap-3">
        <Card user={loggedInUser} />
        <button className="h-[50px] w-[180px] rounded-md bg-secondary">
          Log Out
        </button>
      </div>
    </>
  )
}
