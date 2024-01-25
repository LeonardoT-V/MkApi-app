import { IconCode } from '@tabler/icons-react'
import { TitleContainer } from '../components/shared'
import TableResults from '../components/shared/TableResults'
import TextEditor from '../components/EditorPage/TextEditor'
import DropBoxEditor from '../components/EditorPage/DropBoxEditor'
import ActionEditorSide from '../components/EditorPage/ActionEditorSide'
import { useEditorStore } from '../stores/editorStore'
import ErrorQueryEditor from '../components/EditorPage/ErrorQueryEditor'

function EditorPage() {
  const results = useEditorStore((state) => state.results)
  return (
    <>
      <section className="flex flex-col gap-4">
        <section className="flex flex-col max-h-unit-8xl h-unit-8xl lg:flex-row gap-4">
          <div className="bg-content1/40 h-full grow p-4 rounded-small space-y-4 flex flex-col">
            <TitleContainer
              title="Editor Sql"
              sx={{ title: 'text-lg', icon: 'h-7 w-7' }}
              Icon={IconCode}
            />
            <div className="overflow-y-scroll rounded-md border-content2 border bg-content1">
              <TextEditor />
            </div>
          </div>
          <div className="lg:w-80 flex lg:flex-col gap-4">
            <DropBoxEditor />
            <ActionEditorSide />
          </div>
        </section>
        <section className="">
          {results?.code ? (
            <ErrorQueryEditor error={results} />
          ) : (
            <TableResults rows={results?.rows} editCol={false} />
          )}
        </section>
      </section>
    </>
  )
}

export default EditorPage
