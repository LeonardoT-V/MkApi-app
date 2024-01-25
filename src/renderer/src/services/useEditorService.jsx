import { useState } from 'react'
import { useProject } from '../hooks/useProject'
import { useEditorStore } from '../stores/editorStore'
import toast from '../utils/toast'

export function useEditorService() {
  const [loader, setLoader] = useState(false)
  const { project } = useProject()
  const code = useEditorStore((state) => state.code)
  const setResults = useEditorStore((state) => state.setResults)
  const setCode = useEditorStore((state) => state.setCode)

  const executeSqlCommand = async ({ command, isEditor = true }) => {
    setLoader(true)
    if (isEditor) {
      const res = await window.editor.executeSqlCommand({ project, command: code })
      const query = JSON.parse(res)
      if (query.error) {
        setResults(query.error)
        return
      }
      setLoader(false)
      setResults(query)
      return query
    }

    if (!isEditor) {
      const res = await window.editor.executeSqlCommand({ project, command })
      const query = JSON.parse(res)
      setLoader(false)
      return query
    }
  }

  const executeFileCommand = async ({ file }) => {
    const filePath = file[0].path
    const res = await window.editor.executeFileCommand({ project, path: filePath })
    const query = JSON.parse(res)
    if (query.error) {
      setResults(query.error)
      return
    }
    setCode(query.queryPassed)
    setResults(query)
    return res
  }

  const copyCodeSnippets = async ({ data }) => {
    await navigator.clipboard.writeText(data)
    toast.successToast(0, 'Elemento copiado', 'Se ha guardado en el portapapeles')
    return
  }

  return {
    executeSqlCommand,
    loader,
    executeFileCommand,
    copyCodeSnippets
  }
}
