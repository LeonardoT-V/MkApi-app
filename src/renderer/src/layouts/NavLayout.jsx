import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'

function NavLayout() {
  return (
    <>
      <Navbar />

      <div className="sm:ml-64 min-h-screen ">
        <div className="px-3 py-4 min-h-screen h-screen flex flex-col gap-y-unit-md">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default NavLayout
