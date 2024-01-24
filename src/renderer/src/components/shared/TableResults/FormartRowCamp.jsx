import { Code } from '@nextui-org/react'

export default function FormartRowCamp(props) {
  const { value } = props
  if (value === '') {
    return <p className="text-gray-400">none</p>
  }

  if (typeof value !== 'boolean') {
    return <p className="">{value}</p>
  }
  const showData = value ? 'true' : 'false'
  return (
    <Code color={value ? 'success' : 'secondary'} radius="full">
      {showData}
    </Code>
  )
}
