import { Code } from '@nextui-org/react'
import { useTableStore } from '../../stores/tableStore'
import { AnimatePresence } from 'framer-motion'

function ModalTableError() {
  const error = useTableStore((state) => state.error)
  return (
    <AnimatePresence>
      {error && error.map((val) => val === true) && (
        <Code color="danger" className="w-full h-full p-3 ">
          {error.map((i) => (
            <p key={i}>{i}</p>
          ))}
        </Code>
      )}
    </AnimatePresence>
  )
}

export default ModalTableError
