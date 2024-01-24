function TitleContainer({ title, Icon, children, sx }) {
  return (
    <header
      className={`border-warning-100/25  border flex justify-between gap-2 items-center bg-warning-100/25 py-2 px-4 rounded-small ${sx?.root}`}
    >
      <div className="flex gap-2 items-center">
        {Icon && <Icon className={`${!sx?.icon ? 'h-7 w-7' : sx?.icon}`} stroke={1.5} />}

        <h1 className={`${!sx?.title ? 'text-2xl' : sx?.title} text-warning-600 font-medium`}>
          {title}
        </h1>
      </div>
      {children}
    </header>
  )
}

export default TitleContainer
