import { IconColumns3 } from '@tabler/icons-react'
import { AnimatePresence } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

export function NavLinks({ to, name, icon, children }) {
  const defaultVariant =
    'transition-all px-unit-md py-unit-xs rounded-small flex gap-unit-sm capitalize text-sm items-center'
  return (
    <>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? `${defaultVariant}  bg-primary-500 text-black`
            : `${defaultVariant} hover:bg-primary-700/25 hover:scale-95 hover:text-primary-400 text-gray-400`
        }
      >
        {icon && icon}
        <p>{name}</p>
      </NavLink>
      <AnimatePresence>{children}</AnimatePresence>
    </>
  )
}

export function SubNavLinks({ links }) {
  const defaultVariant =
    'transition-all px-unit-md py-1 rounded-small text-sm flex gap-unit-sm items-center'
  if (links.length >= 0) {
    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: 1,
          height: 'fit-content'
        }}
        exit={{ opacity: 0, height: 0 }}
        className="ml-4  flex-col flex gap-1 capitalize max-h-48 overflow-auto"
      >
        {links.map((table_name) => (
          <NavLink
            key={table_name}
            to={`/app/tables/${table_name}`}
            className={({ isActive }) =>
              isActive
                ? `${defaultVariant} bg-primary-700/25 text-gray-300`
                : `${defaultVariant} text-gray-400 hover:bg-primary-700/25`
            }
          >
            <IconColumns3 size={20} className="stroke-primary-400" stroke={1.5} />
            {table_name}
          </NavLink>
        ))}
      </motion.div>
    )
  }
}
