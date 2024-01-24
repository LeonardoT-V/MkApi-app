import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { IconMenu2, IconPencil, IconTrash } from '@tabler/icons-react'
import { useDataTable } from '../../../hooks/useDataTable'

export default function ActionsButtons({ params }) {
  const { setData, toggleModal, toggleDeleteModal } = useDataTable()

  const openModal = (data) => {
    toggleModal()
    setData(data)
  }

  const openDeleteModal = (data) => {
    toggleDeleteModal()
    setData(data)
  }

  return (
    <>
      <div className="flex justify-center items-center align-middle h-full">
        <Dropdown>
          <DropdownTrigger>
            <Button className="w-full" size="sm" variant="solid" isIconOnly>
              <IconMenu2 className="h-4 w-4" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Table actions for edit or delete">
            <DropdownItem
              color="success"
              startContent={<IconPencil className="h-5 w-5" stroke={1.5} />}
              key="editar"
              onClick={() => openModal(params.data)}
            >
              Editar
            </DropdownItem>
            <DropdownItem
              color="danger"
              startContent={<IconTrash className="h-5 w-5" stroke={1.5} />}
              key="borrar"
              onClick={() => openDeleteModal(params.data)}
            >
              Borrar
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </>
  )
}
