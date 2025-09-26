import { useState, useCallback, useEffect } from 'react'
import { router } from '@inertiajs/react'
import debounce from 'lodash.debounce'



interface UseDebouncedSearchOptions {
  route: string
  minChars?: number
  delay?: number
}

export function useDebouncedSearch({
  route,
  minChars = 4,
  delay = 500,
}: UseDebouncedSearchOptions){


    const [searchTerm, setSearchTerm] = useState('')


    const performSearch = useCallback(
    (query: string) => {
      if (query.length >= minChars || query.length === 0) {
        router.get(route, { search: query }, { preserveState: true, replace: true })
      }
    },
    [route, minChars]
  )


  // Debounced version
  const debouncedSearch = useCallback(
    debounce((query: string) => performSearch(query), delay),
    [performSearch, delay]
  )

    // Cleanup on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel()
    }
  }, [debouncedSearch])


    const handleSearchChange = useCallback(
    (value: string) => {
      setSearchTerm(value)
      debouncedSearch(value)
    },
    [debouncedSearch]
  )


   return {
    searchTerm,
    handleSearchChange,
    setSearchTerm, // in case you want to reset externally
  }

}
