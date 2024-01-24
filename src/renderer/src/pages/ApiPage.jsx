import { IconSignRight } from '@tabler/icons-react'
import JsonPreview from '../components/ApiPage/JsonPreview'
import { TitleContainer, ApiSwitch } from '../components/shared'
import ContainerEndpoints from '../components/ApiPage/ContainerEndpoints'
import { useState } from 'react'

function ApiPage() {
  const [apiGet, setApiGet] = useState({})

  return (
    <>
      <TitleContainer title="Prueba tu API" Icon={IconSignRight} />
      <section className="flex-grow flex-row flex gap-4">
        <div className="w-2/5 flex flex-col gap-4">
          <ApiSwitch sx="bg-content1/40 px-4 py-2 rounded-small" />
          <TitleContainer title="Endpoints disponibles" sx={{ title: 'text-base' }} />
          <ContainerEndpoints setApiGet={setApiGet} />
        </div>
        <div className="w-3/5 bg-primary-900/20 border border-content2 rounded-small p-4 overflow-y-scroll">
          <JsonPreview result={apiGet} />
        </div>
      </section>
    </>
  )
}

export default ApiPage
