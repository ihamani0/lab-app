import { SidebarInset } from "./ui/sidebar";



interface AppContentProps extends React.ComponentProps<'main'>  {
    variant : string
}


function AppContent({children , variant = 'sidebar',...props} : AppContentProps) {

    if (variant === 'sidebar') {
        return <SidebarInset {...props}>{children}</SidebarInset>;
    }

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


