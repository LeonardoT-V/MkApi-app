export function updateQuery(object) {
  let insertIntoParam = ''
  for (const key in object) {
    if (Object.hasOwnProperty.call(object, key)) {
      if (insertIntoParam.length === 0) {
        insertIntoParam += `SET ${key} = '${object[key]}'`
      } else {
        insertIntoParam += `, ${key} = '${object[key]}'`
      }
    }
  }
  return insertIntoParam
}

export function insertQuery(object) {
  let insertIntoParam = ''
  let insertIntoValue = ''

  for (const key in object) {
    if (Object.hasOwnProperty.call(object, key)) {
      if (object[key] !== '') {
        if (insertIntoParam.length === 0) {
          insertIntoParam += `${key}`
          insertIntoValue += `'${object[key]}'`
        } else {
          insertIntoParam += `,${key}`
          insertIntoValue += `,'${object[key]}'`
        }
      }
    }
  }
  return { insertIntoParam, insertIntoValue }
}

export function extractDefaultValueTable(unParsed) {
  if (unParsed === null) {
    return
  }

  if (!unParsed.includes('::')) {
    return unParsed
  }

  if (unParsed.includes('nextval(') && unParsed.includes('::regclass)')) {
    return 'AutoIncrement()'
  }
  console.log(unParsed)
  const parsed = unParsed.split('::')
  const jij = parsed[0].replace(`'`, '')
  return jij.replace(`'`, '')
}
