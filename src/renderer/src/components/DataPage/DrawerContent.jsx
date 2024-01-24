import Drawer from 'react-modern-drawer'

import { Button, ScrollShadow } from '@nextui-org/react'
import { IconPencil } from '@tabler/icons-react'
import { useState } from 'react'

export default function DrawerContent({ item }) {
  const [isOpen, setIsOpen] = useState(false)
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }

  return (
    <>
      <Button
        onClick={toggleDrawer}
        size="sm"
        color="default"
        variant="flat"
        startContent={<IconPencil className="h-4 w-4" stroke={1.5} />}
      >
        Editar
      </Button>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="right"
        className="!w-unit-8xl !bg-content1"
        lockBackgroundScroll={true}
      >
        <ScrollShadow>
          <div>Hello World</div>
        </ScrollShadow>
        <Button>Editar</Button>
      </Drawer>
    </>
  )
}
