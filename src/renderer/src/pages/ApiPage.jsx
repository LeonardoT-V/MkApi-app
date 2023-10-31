import ActionApiButton from '../components/ApiPage/ActionApiButton'
import JsonPreview from '../components/ApiPage/JsonPreview'
import { TitleContainer, ApiSwitch } from '../components/shared'
import ContainerTablesCreated from '../components/TablesMainPage/ContainerTablesCreated'

function ApiPage() {
  function hola(table) {
    console.log(table)
  }
  return (
    <div className="max-h-full h-full flex gap-8">
      <section className="w-1/2 lg:w-96 space-y-2 max-h-full overflow-auto">
        <div className="sticky top-0 bg-background space-y-4">
          <ApiSwitch sx="bg-content1 py-2 px-8 rounded-small" />
          <TitleContainer title="Tus endpoints" sx={{ title: 'text-xl' }} />
        </div>
        <div className="">
          <ContainerTablesCreated
            sx="space-y-2"
            func={hola}
            propCard={{ isHover: false }}
            buttonZone={({ name }) => <ActionApiButton table={name} />}
          />
        </div>
      </section>
      <section className="h-full grow">
        <JsonPreview result={{ hola: 'hola', name: 'leo', obj: { leo: 'a' } }} />
      </section>
    </div>
  )
}

export default ApiPage
