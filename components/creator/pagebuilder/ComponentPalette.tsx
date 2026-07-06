'use client'

import type { DragEvent } from 'react'
import { Bold, Image, Link2, Plus, Square, Type, User } from 'lucide-react'

import type { ElementType } from '@/components/types'

const paletteItems: Array<{ type: ElementType; label: string; icon: typeof Type }> = [
  { type: 'heading', label: 'Heading', icon: Type },
  { type: 'text', label: 'Text', icon: Bold },
  { type: 'button', label: 'Link Button', icon: Link2 },
  { type: 'image', label: 'Image', icon: Image },
  { type: 'user', label: 'User Block', icon: User },
  { type: 'section', label: 'Section', icon: Square },
]

type ComponentPaletteProps = {
  onAddElement: (type: ElementType) => void
}

export function ComponentPalette({ onAddElement }: ComponentPaletteProps) {
  const handleDragStart = (event: DragEvent<HTMLButtonElement>, type: ElementType) => {
    event.dataTransfer.setData('element/type', type)
  }

  return (
    <aside className="group/stencil sticky top-5 z-20 h-fit w-[64px] overflow-hidden rounded-lg border bg-white shadow-sm transition-all duration-200 hover:w-[240px]">
      <div className="border-b px-3 py-4">
        <div className="flex items-center gap-3 whitespace-nowrap">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Plus className="h-4 w-4" />
          </div>
          <div className="opacity-0 transition-opacity duration-150 group-hover/stencil:opacity-100">
            <h2 className="text-sm font-semibold">Components</h2>
            <p className="text-xs text-muted-foreground">Drag onto canvas</p>
          </div>
        </div>
      </div>

      <div className="space-y-2 p-3">
        {paletteItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.type}
              draggable
              title={item.label}
              onClick={() => onAddElement(item.type)}
              onDragStart={(event) => handleDragStart(event, item.type)}
              className="flex h-11 w-full items-center gap-3 rounded-lg border bg-white px-2 text-left text-sm font-medium transition hover:border-primary hover:bg-primary/10"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-muted text-primary">
                <Icon className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1 whitespace-nowrap opacity-0 transition-opacity duration-150 group-hover/stencil:opacity-100">
                {item.label}
              </span>
              <Plus className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity duration-150 group-hover/stencil:opacity-100" />
            </button>
          )
        })}
      </div>
    </aside>
  )
}