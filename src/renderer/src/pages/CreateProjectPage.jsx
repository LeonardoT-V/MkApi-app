import { IconFolder } from '@tabler/icons-react'
import FormCreateProject from '../components/CreateProjectPage/FormCreateProject'
import ContainerProjects from '../components/CreateProjectPage/ContainerProjects'
import { Credits } from '../components/shared'
import { Link } from 'react-router-dom'

function CreateProjectPage() {
  return (
    <div className="flex flex-col md:flex-row h-screen lg:px-0">
      <div className="flex flex-col px-4 py-10 lg:py-24 md:px-28 justify-center bg-content1/50">
        <div className="w-full md:max-w-sm md:px-0 lg:w-96 sm:px-4">
          <div className="flex flex-col mb-12">
            <h2 className="text-4xl text-center">
              Crea un proyecto <span className="text-primary-400">PostgresSql</span>
            </h2>
          </div>
          <FormCreateProject />
        </div>
      </div>

      <section className="w-full flex flex-col px-4 py-10 lg:py-24 lg:px-16 justify-center">
        <header className="flex gap-4 items-center">
          <IconFolder className="h-9 w-9" />
          <h2 className="flex gap-4 text-warning-600 text-4xl">Tus Proyectos</h2>
          <Link to="/app/home">asd</Link>
        </header>
        <ContainerProjects />
        <Credits />
      </section>
    </div>
  )
}

export default CreateProjectPage
