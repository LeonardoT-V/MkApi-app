import { IconBrackets } from '@tabler/icons-react'

export const Types_Postgres_Table = [
  { name: 'bigint', description: 'signed eight-byte integer', icon: IconBrackets, color: 'red' },
  {
    name: 'bigserial',
    description: 'autoincrementing eight-byte integer',
    icon: IconBrackets,
    color: 'blue'
  },
  { name: 'bit', description: 'fixed-length bit string', icon: IconBrackets, color: 'green' },
  {
    name: 'bit Varying',
    description: 'variable-length bit string',
    icon: IconBrackets,
    color: 'amber'
  },
  {
    name: 'boolean',
    description: 'logical Boolean (true/false)',
    icon: IconBrackets,
    color: 'purple'
  },
  { name: 'box', description: 'rectangular box on a plane', icon: IconBrackets, color: 'cyan' },
  {
    name: 'bytea',
    description: 'binary data (“byte array”)',
    icon: IconBrackets,
    color: 'red'
  },
  {
    name: 'character',
    description: '	fixed-length character string',
    icon: IconBrackets,
    color: 'blue'
  },
  {
    name: 'character varying',
    description: 'variable-length character string',
    icon: IconBrackets,
    color: 'green'
  },
  { name: 'cidr', description: 'IPv4 or IPv6 network address', icon: IconBrackets, color: 'amber' },
  { name: 'circle', description: 'circle on a plane', icon: IconBrackets, color: 'purple' },
  {
    name: 'date',
    description: 'calendar date (year, month, day)',
    icon: IconBrackets,
    color: 'cyan'
  },
  {
    name: 'double precision',
    label: 'doble',
    description: 'double precision floating-point number (8 bytes)',
    icon: IconBrackets,
    color: 'red'
  },
  { name: 'inet', description: 'IPv4 or IPv6 host address', icon: IconBrackets, color: 'blue' },
  { name: 'integer', description: 'signed four-byte integer', icon: IconBrackets, color: 'green' },
  { name: 'interval', description: 'time span', icon: IconBrackets, color: 'amber' },
  { name: 'json', description: '	textual JSON data', icon: IconBrackets, color: 'purple' },
  {
    name: 'jsonb',
    description: 'binary JSON data, decomposed',
    icon: IconBrackets,
    color: 'cyan'
  },
  { name: 'line', description: 'infinite line on a plane', icon: IconBrackets, color: 'red' },
  { name: 'lseg', description: 'line segment on a plane', icon: IconBrackets, color: 'blue' },
  {
    name: 'macaddr',
    description: 'MAC (Media Access Control) address',
    icon: IconBrackets,
    color: 'green'
  },
  {
    name: 'macaddr8',
    description: 'MAC (Media Access Control) address (EUI-64 format)',
    icon: IconBrackets,
    color: 'amber'
  },
  { name: 'money', description: 'currency amount', icon: IconBrackets, color: 'purple' },
  {
    name: 'numeric',
    description: 'exact numeric of selectable precision',
    icon: IconBrackets,
    color: 'cyan'
  },
  { name: 'path', description: 'geometric path on a plane', icon: IconBrackets, color: 'red' },
  { name: 'point', description: 'geometric point on a plane', icon: IconBrackets, color: 'blue' },
  {
    name: 'polygon',
    description: 'closed geometric path on a plane',
    icon: IconBrackets,
    color: 'green'
  },
  {
    name: 'real',
    description: 'single precision floating-point number (4 bytes)',
    icon: IconBrackets,
    color: 'amber'
  },
  { name: 'smallint', description: 'signed two-byte integer', icon: IconBrackets, color: 'purple' },
  {
    name: 'smallserial',
    description: 'autoincrementing two-byte integer',
    icon: IconBrackets,
    color: 'cyan'
  },
  {
    name: 'serial',
    description: 'autoincrementing four-byte integer',
    icon: IconBrackets,
    color: 'red'
  },
  {
    name: 'text',
    description: 'variable-length character string',
    icon: IconBrackets,
    color: 'blue'
  },
  { name: 'time', description: 'time of day (no time zone)', icon: IconBrackets, color: 'green' },
  {
    name: 'timez',
    description: 'time of day, including time zone',
    icon: IconBrackets,
    color: 'amber',
    param: '(time, zone)'
  },
  {
    name: 'timestamp',
    description: 'date and time (no time zone)',
    icon: IconBrackets,
    color: 'purple'
  },
  {
    name: 'timestampz',
    description: 'date and time, including time zone',
    icon: IconBrackets,
    color: 'cyan',
    param: '(time, zone)'
  },
  { name: 'tsquery', description: 'text search query', icon: IconBrackets, color: 'red' },
  { name: 'tsvector', description: 'text search document', icon: IconBrackets, color: 'blue' },
  {
    name: 'uuid',
    description: 'universally unique identifier',
    icon: IconBrackets,
    color: 'green'
  },
  { name: 'xml', description: 'XML data', icon: IconBrackets, color: 'amber' }
]
