import ContainerTablesCreated from '../components/TablesMainPage/ContainerTablesCreated'
import { ApiSwitch, TitleContainer } from '../components/shared'

function HomePage() {
  return (
    <div className="grid grid-cols-3 justify-center items-center align-middle gap-8 w-full ">
      <h1 className="col-span-1 w-full ">Home page</h1>
      <ApiSwitch sx="col-span-1 w-full " />
      <section className="col-span-1 row-span-2 space-y-3 py-4 px-2 h-96 border rounded-small border-content2 bg-content1/40 overflow-auto">
        <TitleContainer
          title="Tus tablas"
          sx={{ title: 'text-lg', root: 'sticky top-0 z-40 shadow-xl' }}
        />
        <ContainerTablesCreated sx="space-y-1 px-2  flex flex-col" />
      </section>
      <ApiSwitch sx="col-span-1 h-full w-full bg-blue-400" />
      <ApiSwitch sx="col-span-1 w-full " />
    </div>
  )
}

export default HomePage
