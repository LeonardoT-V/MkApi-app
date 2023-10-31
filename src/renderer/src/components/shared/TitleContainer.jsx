function TitleContainer({ title, Icon, children, sx }) {
  return (
    <header
      className={`flex justify-between gap-2 items-center bg-content2 py-2 px-8 rounded-small ${sx?.root}`}
    >
      <div className="flex gap-2 items-center">
        {Icon && <Icon className={`${!sx?.icon ? 'h-9 w-9' : sx?.icon}`} stroke={1.5} />}

        <h1 className={`${!sx?.title ? 'text-4xl' : sx?.title} text-warning-600 font-medium`}>
          {title}
        </h1>
      </div>
      {children}
    </header>
  )
}

export default TitleContainer
