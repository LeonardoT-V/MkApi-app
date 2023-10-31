import { Input, Radio, RadioGroup, Switch } from '@nextui-org/react'
import { AnimatePresence, motion } from 'framer-motion'
import { Types_Postgres_Table } from './types_table'
import { Controller } from 'react-hook-form'
function ModalSelectionType({ register, tipoData, control, setValue }) {
  return (
    <RadioGroup name="tipo">
      <AnimatePresence>
        <motion.div className="grid grid-cols-2 gap-x-7 gap-y-6" layout>
          {Types_Postgres_Table.map((item) => (
            <div key={item.name} className="flex flex-col gap-unit-md">
              <Radio
                value={item.name}
                classNames={{
                  base: `group max-w-[500px] cursor-pointer rounded-small border-2 border-transparent data-[selected=true]:border-content4  data-[selected=true]:bg-content2 hover:scale-[.98] transition-all p-0`,
                  wrapper: 'hidden p-0 m-0 ',
                  labelWrapper: 'w-full p-0 m-0 '
                }}
                {...register('tipo')}
                onClick={() => {
                  if (tipoData === item.name) {
                    return
                  }
                  setValue('parametro', '')
                  setValue('default', '')
                  setValue('null', false)
                }}
              >
                <div className={`h-auto flex gap-unit-sm p-unit-xs items-center text-secondary`}>
                  <div>
                    <item.icon size={48} className="text-warning-600" />
                  </div>
                  <div className="">
                    <div className="flex gap-1 items-baseline">
                      <h2 className="text-lg font-medium capitalize text-gray-300 group-data-[selected=true]:text-warning-700">
                        {item.name}
                      </h2>
                      <p className="text-xs text-gray-200">{item?.label}</p>
                    </div>
                    <p className="text-gray-400 text-xs">{item.description}</p>
                  </div>
                </div>
              </Radio>
              <AnimatePresence>
                {item.name === tipoData && (
                  <motion.div
                    className="bg-primary-700/25 border-primary-400 border-2 p-unit-md rounded-small w-full"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: 1,
                      height: '100%'
                    }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="flex flex-col gap-unit-xs">
                      <Input
                        size="sm"
                        labelPlacement="outside-left"
                        placeholder="[Opcional]"
                        label="Valor por defecto"
                        color="primary"
                        variant="faded"
                        name="default"
                        {...register('default')}
                      />
                      {item.param && (
                        <Input
                          size="sm"
                          labelPlacement="outside-left"
                          placeholder="[Opcional]"
                          label="Parametro"
                          color="primary"
                          variant="faded"
                          name="parametro"
                          {...register('parametro')}
                        />
                      )}

                      <div className="flex gap-unit-sm items-center">
                        <p className="text-tiny text-primary-400 mr-6">Es null</p>
                        <Controller
                          control={control}
                          name="null"
                          render={({ field: { onChange, value } }) => (
                            <Switch defaultSelected onChange={onChange} isSelected={value} />
                          )}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </RadioGroup>
  )
}

export default ModalSelectionType
