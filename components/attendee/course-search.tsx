import { useState, useCallback, useEffect } from 'react'
import { Search, X } from 'lucide-react'

interface CourseSearchProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function CourseSearch({ searchQuery, onSearchChange }: CourseSearchProps) {
  const [localQuery, setLocalQuery] = useState(searchQuery)

  useEffect(() => {
    setLocalQuery(searchQuery)
  }, [searchQuery])

  const handleClear = useCallback(() => {
    setLocalQuery('')
    onSearchChange('')
  }, [onSearchChange])

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setLocalQuery(value)
      onSearchChange(value)
    },
    [onSearchChange]
  )

  return (
    <div className="relative w-full">
      <div className="relative flex items-center">
        <Search className="absolute left-4 h-5 w-5 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          placeholder="Search courses by title, creatorName, or keyword..."
          value={localQuery}
          onChange={handleInputChange}
          className="w-full pl-12 pr-10 py-3 bg-white border border-border rounded-lg text-foreground placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#78866B] focus:border-transparent transition-all"
        />
        {localQuery && (
          <button
            onClick={handleClear}
            className="absolute right-3 p-1 text-muted-foreground hover:text-muted-foreground transition-colors"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
