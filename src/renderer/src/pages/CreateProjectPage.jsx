import { IconFolder } from '@tabler/icons-react'
import FormCreateProject from '../components/CreateProjectPage/FormCreateProject'
import ContainerProjects from '../components/CreateProjectPage/ContainerProjects'
import { Credits, TitleContainer } from '../components/shared'

function CreateProjectPage() {
  return (
    <div className="flex flex-col md:flex-row h-screen lg:px-0">
      <div className="flex flex-col px-4 py-10 lg:py-24 md:px-28 justify-center bg-content1/50">
        <div className="w-full md:w-full md:px-0 lg:w-96 sm:px-4">
          <div className="flex flex-col mb-12">
            <h2 className="text-2xl text-center">
              Conectate a una base de datos <br />{' '}
              <span className="text-primary-400 text-4xl underline">_PostgreSQL_</span>
            </h2>
          </div>
          <FormCreateProject />
        </div>
      </div>

      <section className="w-full flex flex-col px-4 py-10 lg:py-24 lg:px-16 justify-center">
        <TitleContainer title="Tus Proyectos" Icon={IconFolder} />
        <ContainerProjects />
        <Credits />
      </section>
    </div>
  )
}

export default CreateProjectPage
