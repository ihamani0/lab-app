// components/Pagination.tsx
import { PaginationLink } from "@/Types"
import { Link } from "@inertiajs/react" // ✅ CORRECT IMPORT

// Optional: Helper to decode HTML entities
function decodeHTMLEntities(text: string): string {
  const textarea = document.createElement('textarea')
  textarea.innerHTML = text
  return textarea.value
}

type Props = {
  links: PaginationLink[]
}

function Pagination({ links }: Props) {
  return (
    <div className="flex justify-center gap-2 mt-4">
      {links.map((link, i) =>
        link.url ? (
          <Link
            key={i}
            href={link.url}
            className={`px-3 py-1 rounded-md text-sm ${
              link.active
                ? "bg-primary dark:bg-slate-100 dark:text-slate-900 text-white"
                : "bg-muted text-foreground"
            }`}
          >
            {decodeHTMLEntities(link.label)} {/* ✅ No dangerouslySetInnerHTML */}
          </Link>
        ) : (
          <span
            key={i}
            className="px-3 py-1 rounded-md text-sm text-muted-foreground"
          >
            {decodeHTMLEntities(link.label)} {/* ✅ Same here */}
          </span>
        )
      )}
    </div>
  )
}

export default Pagination
