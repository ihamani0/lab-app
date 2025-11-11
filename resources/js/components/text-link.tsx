import { Link } from "@inertiajs/react";




export default function TextLink({children, href , className }: {children: React.ReactNode , href: string , className?: string}) {
  return (
    <Link
        className={`text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500 ${className ?? ''}`}
        href={href}

        >
        {children}
    </Link>
  )
}
