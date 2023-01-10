
import { Head } from '@inertiajs/inertia-react'
import Navbar from '../../components/Navbar'

export default function Dashboard({ name, loggedInUser }) {


  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <Navbar />
      <button className="h-[50px] w-[180px] bg-secondary">
        Log Out
      </button>
    </>
  )
}
