import { Button } from '@nextui-org/react'

function ActionApiButton({ table }) {
  return (
    <div className="flex gap-1">
      <Button size="sm" variant="faded" color="primary" onClick={() => console.log(table)}>
        Por Id
      </Button>
      <Button size="sm" variant="faded" onClick={() => console.log(table)}>
        General
      </Button>
    </div>
  )
}

export default ActionApiButton
