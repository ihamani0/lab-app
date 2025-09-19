


interface AppContentProps extends React.ComponentProps<'main'>  {
}


function AppContent({children,...props} : AppContentProps) {
  return (
        <main
            className="mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl"
            {...props}
        >
            {children}
        </main>
  )
}
export default AppContent;


