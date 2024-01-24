import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure
} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useBackupService } from '../../services/useBackupService'
import HighlightingCode from '../shared/HighlightingCode'
import TitleContainer from '../shared/TitleContainer'
import { IconClock, IconCalendarCode } from '@tabler/icons-react'

export default function ModalDetailsBackupContent({ file }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [backupFile, setBackupFile] = useState('')
  const { readBackupFileContent } = useBackupService()

  useEffect(() => {
    if (isOpen) {
      readBackupFileContent({ backupFile: file }).then((val) => setBackupFile(val))
      console.log(isOpen)
    }
  }, [isOpen])

  return (
    <>
      <Button onPress={onOpen} size="sm" variant="flat" fullWidth>
        Detalles
      </Button>
      <Modal
        hideCloseButton
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        size="4xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex gap-4">
                <TitleContainer sx={{ root: 'grow' }} title="Respaldo">
                  <div className="flex gap-1 items-center">
                    <IconCalendarCode className="stroke-warning-600" stroke={1.5} />
                    <p className="text-gray-200 text-xl">{file.date}</p>
                  </div>
                  <div className="flex gap-1 items-center">
                    <IconClock className="stroke-warning-600" stroke={1.5} />
                    <p className="text-gray-200 text-xl">{file.time}</p>
                  </div>
                </TitleContainer>
              </ModalHeader>
              <ModalBody>
                <HighlightingCode code={backupFile} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose} className="w-1/2">
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
