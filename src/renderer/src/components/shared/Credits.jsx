import { Divider } from '@nextui-org/react'
import { APP_LOGO_PATH, APP_NAME } from '@renderer/env'

function Credits({ isHead = false }) {
  return (
    <footer className="flex justify-center gap-4 items-center">
      <div className={`${!isHead && 'justify-end items-center'} flex gap-2  basis-0 grow`}>
        <img
          src={APP_LOGO_PATH}
          alt="logo mkapi"
          className={`${isHead ? 'h-8 w-8' : 'h-10 w-10'}`}
        />
        <h5 className={`${isHead ? 'text-2xl' : 'text-3xl'} font-logo text-warning-700`}>
          {APP_NAME}
        </h5>
        {isHead && <p className="text-gray-300 text-xs inline-flex mt-auto mb-1">1.0.0</p>}
      </div>
      {!isHead && (
        <>
          <Divider orientation="vertical" />
          <div className="text-xs basis-0 grow text-gray-300">
            <p>Carranza Delgado</p>
            <p>Leonardo Toro</p>
          </div>
        </>
      )}
    </footer>
  )
}

export default Credits
