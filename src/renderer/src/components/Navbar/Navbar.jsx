import { Credits, DatabaseInfo } from '../shared'
import { App_Routes_Links } from '../../../const'
import { SubNavLinks, NavLinks } from '../shared/NavLinks'
import { useLocation } from 'react-router-dom'
import { useProject } from '../../hooks/useProject'
import { useTables } from '../../hooks/useTables'

function Navbar() {
  const location = useLocation()
  const { project } = useProject()
  const { displayTableName: tables } = useTables()

  return (
    <aside
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-content1"
      aria-label="Sidebar"
    >
      <section className="h-full p-3 flex flex-col gap-unit-md ">
        <Credits isHead={true} />

        <div className="flex flex-col gap-1 grow mt-5">
          {App_Routes_Links.map((link) => (
            <NavLinks
              to={link.path}
              name={link.name}
              icon={<link.icon stroke={1.5} className="h-5 w-5" />}
              key={link.name}
              isSub={link.isSub || false}
            >
              {link.isSub && location.pathname.includes('tables') && <SubNavLinks links={tables} />}
            </NavLinks>
          ))}
        </div>
        <DatabaseInfo database={project} isHeader={true} />
      </section>
    </aside>
  )
}

export default Navbar
