import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface CourseFiltersType {
  search: string
  category: string
  level: string
  priceRange: [number, number]
  rating: number
}

interface CourseFiltersProps {
  filters: CourseFiltersType
  onFiltersChange: (filters: CourseFiltersType) => void
}

const CATEGORIES = ['Development', 'Business', 'Design', 'Marketing']
const LEVELS = ['Beginner', 'Intermediate', 'Advanced']
const RATINGS = [
  { value: 0, label: 'All Ratings' },
  { value: 4.5, label: '4.5+ ⭐' },
  { value: 4.7, label: '4.7+ ⭐' },
  { value: 4.8, label: '4.8+ ⭐' },
]

export function CourseFilters({ filters, onFiltersChange }: CourseFiltersProps) {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    level: true,
    price: true,
    rating: true,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleCategoryChange = (category: string) => {
    onFiltersChange({
      ...filters,
      category: filters.category === category ? '' : category,
    })
  }

  const handleLevelChange = (level: string) => {
    onFiltersChange({
      ...filters,
      level: filters.level === level ? '' : level,
    })
  }

  const handleRatingChange = (rating: number) => {
    onFiltersChange({
      ...filters,
      rating: filters.rating === rating ? 0 : rating,
    })
  }

  const handlePriceChange = (min: number, max: number) => {
    onFiltersChange({
      ...filters,
      priceRange: [min, max],
    })
  }

  return (
    <div className="bg-white border border-border rounded-lg p-6 space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-foreground">Filters</h3>
        {(filters.category || filters.level || filters.rating > 0 || 
          filters.priceRange[0] > 0 || filters.priceRange[1] < 150) && (
          <button
            onClick={() =>
              onFiltersChange({
                search: filters.search,
                category: '',
                level: '',
                priceRange: [0, 150],
                rating: 0,
              })
            }
            className="text-xs text-[#78866B] hover:text-primary font-medium mt-2 transition-colors"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="border-b border-border pb-6">
        <button
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full mb-4 group"
        >
          <h4 className="font-semibold text-foreground">Category</h4>
          <ChevronDown
            className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${
              expandedSections.category ? 'rotate-180' : ''
            }`}
          />
        </button>
        {expandedSections.category && (
          <div className="space-y-3">
            {CATEGORIES.map((category) => (
              <label
                key={category}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={filters.category === category}
                  onChange={() => handleCategoryChange(category)}
                  className="h-4 w-4 rounded border-border text-[#78866B] focus:ring-[#78866B]"
                />
                <span className="text-sm text-foreground group-hover:text-foreground transition-colors">
                  {category}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Level Filter */}
      <div className="border-b border-border pb-6">
        <button
          onClick={() => toggleSection('level')}
          className="flex items-center justify-between w-full mb-4 group"
        >
          <h4 className="font-semibold text-foreground">Level</h4>
          <ChevronDown
            className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${
              expandedSections.level ? 'rotate-180' : ''
            }`}
          />
        </button>
        {expandedSections.level && (
          <div className="space-y-3">
            {LEVELS.map((level) => (
              <label
                key={level}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={filters.level === level}
                  onChange={() => handleLevelChange(level)}
                  className="h-4 w-4 rounded border-border text-[#78866B] focus:ring-[#78866B]"
                />
                <span className="text-sm text-foreground group-hover:text-foreground transition-colors">
                  {level}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="border-b border-border pb-6">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full mb-4 group"
        >
          <h4 className="font-semibold text-foreground">Price Range</h4>
          <ChevronDown
            className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${
              expandedSections.price ? 'rotate-180' : ''
            }`}
          />
        </button>
        {expandedSections.price && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="text-xs text-muted-foreground block mb-2">Min</label>
                <input
                  type="number"
                  min="0"
                  max="150"
                  value={filters.priceRange[0]}
                  onChange={(e) =>
                    handlePriceChange(
                      Number(e.target.value),
                      filters.priceRange[1]
                    )
                  }
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#78866B]"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-muted-foreground block mb-2">Max</label>
                <input
                  type="number"
                  min="0"
                  max="150"
                  value={filters.priceRange[1]}
                  onChange={(e) =>
                    handlePriceChange(
                      filters.priceRange[0],
                      Number(e.target.value)
                    )
                  }
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#78866B]"
                />
              </div>
            </div>
            <div className="text-sm text-foreground font-medium">
              ${filters.priceRange[0]} - ${filters.priceRange[1]}
            </div>
          </div>
        )}
      </div>

      {/* Rating Filter */}
      <div>
        <button
          onClick={() => toggleSection('rating')}
          className="flex items-center justify-between w-full mb-4 group"
        >
          <h4 className="font-semibold text-foreground">Rating</h4>
          <ChevronDown
            className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${
              expandedSections.rating ? 'rotate-180' : ''
            }`}
          />
        </button>
        {expandedSections.rating && (
          <div className="space-y-3">
            {RATINGS.map((ratingOption) => (
              <label
                key={ratingOption.value}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="rating"
                  checked={filters.rating === ratingOption.value}
                  onChange={() => handleRatingChange(ratingOption.value)}
                  className="h-4 w-4 border-border text-[#78866B] focus:ring-[#78866B]"
                />
                <span className="text-sm text-foreground group-hover:text-foreground transition-colors">
                  {ratingOption.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
