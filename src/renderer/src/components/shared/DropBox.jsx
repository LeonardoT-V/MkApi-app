import Dropzone from 'react-dropzone'

function DropBox({ renderZone, sx, execFunt, ...props }) {
  // accept={{ 'aplication/sql': ['.sql'] }}
  return (
    <Dropzone onDrop={(e) => execFunt({ file: e })} {...props}>
      {({ getRootProps, getInputProps, isDragAccept, isDragActive, isDragReject }) => (
        <div {...getRootProps()} className={sx}>
          <input {...getInputProps()} />
          {renderZone(isDragAccept, isDragActive, isDragReject)}
        </div>
      )}
    </Dropzone>
  )
}

export default DropBox
