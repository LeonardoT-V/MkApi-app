import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { useState } from 'react'
import { ScrollShadow } from '@nextui-org/react'

export default function DrawerComponent() {
  const [isOpen, setIsOpen] = useState(false)
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }

  return (
    <>
      <button onClick={toggleDrawer}>Show</button>
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
      </Drawer>
    </>
  )
}
