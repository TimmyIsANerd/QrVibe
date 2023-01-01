import { Inertia } from '@inertiajs/inertia'
import { Head } from '@inertiajs/inertia-react';
import SideBar from '../../components/Sidebar'

export default function Dashboard({ name, loggedInUser }) {
  function logOut() {
    Inertia.get('/logout')
  }

  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <div className="w-full h-full">
        <div className="">

        </div>
      </div>
      <button className="h-[50px] w-[180px] bg-secondary" onClick={logOut}>
        Log Out
      </button>
    </>
  )
}
