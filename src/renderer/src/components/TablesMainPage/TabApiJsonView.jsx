import { Tab, Tabs } from '@nextui-org/react'
import { IconRouter } from '@tabler/icons-react'
import ApiPreviewTable from './ApiPreviewTable'
import { IconBraces } from '@tabler/icons-react'
import JsonPreviewTable from './JsonPreviewTable'

function TabApiJsonView() {
  return (
    <Tabs
      aria-label="Dynamic tabs"
      radius="sm"
      color="primary"
      variant="bordered"
      fullWidth
      classNames={{ panel: 'm-0 mt-4 p-0' }}
    >
      <Tab
        key="hola 1"
        title={
          <div className="flex items-center space-x-2">
            <IconRouter stroke={1.5} size={20} />
            <span className="text-base">Api</span>
          </div>
        }
      >
        <ApiPreviewTable />
      </Tab>
      <Tab
        key="hola2"
        title={
          <div className="flex items-center space-x-2">
            <IconBraces stroke={1.5} size={20} />
            <span className="text-base">Json</span>
          </div>
        }
      >
        <JsonPreviewTable />
      </Tab>
    </Tabs>
  )
}

export default TabApiJsonView
