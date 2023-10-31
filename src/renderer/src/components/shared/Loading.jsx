import { Spinner } from '@nextui-org/react'

function Loading() {
  return (
    <div className="grow flex flex-col gap-4 px-4 my-8 w-full items-center justify-center bg-primary-400/5 p-6 rounded-3xl">
      <div className="">
        <Spinner size="lg" />
      </div>
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-2xl text-gray-300">Cargando...</h2>
      </div>
    </div>
  )
}

export default Loading
