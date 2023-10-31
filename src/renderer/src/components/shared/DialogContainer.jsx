function DialogContainer({ color = 'primary', children, sx }) {
  const colorKey = {
    danger: 'bg-danger-400/5 text-danger',
    primary: 'bg-primary-400/5 text-primary',
    success: 'bg-success-400/5 text-success',
    warning: 'bg-warning-400/5 text-warning'
  }
  return (
    <div className={`grow flex gap-4 w-full rounded-2xl ${colorKey[color]} ${sx}`}>{children}</div>
  )
}

export default DialogContainer
