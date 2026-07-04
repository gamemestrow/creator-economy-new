'use client'


import { Suspense, type CSSProperties, type DragEvent, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import { BuilderHeader } from '@/components/creator/pagebuilder/BuilderHeader'
import { ComponentPalette } from '@/components/creator/pagebuilder/ComponentPalette'
import { SettingsPanel } from '@/components/creator/pagebuilder/SettingsPanel'
import type { BuilderElement, ElementType } from '@/components/types'

type TemplatePreset = {
  id: string
  name: string
  pageTitle: string
  accent: string
  background: string
  elements: BuilderElement[]
}


const templatePresets: TemplatePreset[] = [
  {
    id: 'course-sales',
    name: 'Course Sales Page',
    pageTitle: 'Launch your signature course',
    accent: '#9AA59E',
    background: '#eff6ff',
    elements: [
      createElement('heading', {
        id: 'course-heading',
        content: 'Build a profitable creator business with one focused course',
        fontSize: 42,
        color: '#232323',
        width: 84,
      }),
      createElement('text', {
        id: 'course-copy',
        content: 'Teach your best system, sell with confidence, and guide students from first lesson to real results.',
        fontSize: 18,
        color: '#666666',
        width: 72,
      }),
      createElement('button', {
        id: 'course-cta',
        content: 'Join the course',
        url: 'https://example.com/course',
        backgroundColor: '#9AA59E',
        width: 28,
      }),
      createElement('image', {
        id: 'course-image',
        imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
        width: 70,
        height: 260,
      }),
    ],
  },
  {
    id: 'webinar-registration',
    name: 'Webinar Registration',
    pageTitle: 'Register for the live masterclass',
    accent: '#16a34a',
    background: '#ecfdf5',
    elements: [
      createElement('heading', {
        id: 'webinar-heading',
        content: 'Turn your audience into paying customers in 60 minutes',
        fontSize: 40,
        color: '#052e16',
      }),
      createElement('text', {
        id: 'webinar-copy',
        content: 'Save your seat for a practical training with examples, scripts, and a live Q&A.',
        fontSize: 18,
        color: '#3f6212',
      }),
      createElement('user', {
        id: 'webinar-host',
        content: 'Hosted by Aanya Sharma, creator growth strategist',
        imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
        width: 58,
      }),
      createElement('button', {
        id: 'webinar-cta',
        content: 'Reserve my seat',
        url: 'https://example.com/webinar',
        backgroundColor: '#16a34a',
        width: 30,
      }),
    ],
  },
  {
    id: 'membership',
    name: 'Membership Landing Page',
    pageTitle: 'Grow together every week',
    accent: '#db2777',
    background: '#fdf2f8',
    elements: [
      createElement('heading', {
        id: 'membership-heading',
        content: 'A private community for ambitious creators',
        fontSize: 40,
        color: '#500724',
      }),
      createElement('text', {
        id: 'membership-copy',
        content: 'Get weekly workshops, templates, accountability circles, and feedback from peers building alongside you.',
        fontSize: 18,
        color: '#831843',
        width: 78,
      }),
      createElement('section', {
        id: 'membership-section',
        content: 'Weekly calls - Resource library - Member wins',
        backgroundColor: '#ffffff',
        color: '#9d174d',
        width: 74,
        height: 110,
      }),
      createElement('button', {
        id: 'membership-cta',
        content: 'Become a member',
        url: 'https://example.com/membership',
        backgroundColor: '#db2777',
        width: 30,
      }),
    ],
  },
  {
    id: 'lead-magnet',
    name: 'Lead Magnet Funnel',
    pageTitle: 'Download the creator launch kit',
    accent: '#ea580c',
    background: '#fff7ed',
    elements: [
      createElement('heading', {
        id: 'lead-heading',
        content: 'Get the 7-day content launch planner',
        fontSize: 40,
        color: '#431407',
      }),
      createElement('text', {
        id: 'lead-copy',
        content: 'Plan your offer, write your posts, and launch without staring at a blank page.',
        fontSize: 18,
        color: '#9a3412',
      }),
      createElement('image', {
        id: 'lead-image',
        imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80',
        width: 62,
        height: 230,
      }),
      createElement('button', {
        id: 'lead-cta',
        content: 'Download now',
        url: 'https://example.com/download',
        backgroundColor: '#ea580c',
        width: 28,
      }),
    ],
  },
  {
    id: 'blank',
    name: 'Blank Page',
    pageTitle: 'Untitled landing page',
    accent: '#232323',
    background: '#F7F7F4',
    elements: [
      createElement('heading', {
        id: 'blank-heading',
        content: 'Start building your page',
        fontSize: 38,
        color: '#232323',
      }),
      createElement('text', {
        id: 'blank-copy',
        content: 'Drag elements into the canvas and customize them from the settings panel.',
        fontSize: 17,
        color: '#666666',
      }),
    ],
  },
]

function createElement(type: ElementType, overrides: Partial<BuilderElement> = {}): BuilderElement {
  const defaults: Record<ElementType, BuilderElement> = {
    heading: {
      id: '',
      type: 'heading',
      label: 'Heading',
      content: 'Write a strong headline',
      url: '',
      imageUrl: '',
      fontSize: 36,
      fontFamily: 'Inter',
      color: '#111827',
      backgroundColor: '#ffffff',
      align: 'left',
      width: 80,
      height: 80,
    },
    text: {
      id: '',
      type: 'text',
      label: 'Text',
      content: 'Add your supporting copy here.',
      url: '',
      imageUrl: '',
      fontSize: 16,
      fontFamily: 'Inter',
      color: '#666666',
      backgroundColor: '#ffffff',
      align: 'left',
      width: 76,
      height: 70,
    },
    button: {
      id: '',
      type: 'button',
      label: 'Link Button',
      content: 'Click here',
      url: 'https://example.com',
      imageUrl: '',
      fontSize: 15,
      fontFamily: 'Inter',
      color: '#ffffff',
      backgroundColor: '#9AA59E',
      align: 'center',
      width: 24,
      height: 48,
    },
    image: {
      id: '',
      type: 'image',
      label: 'Image',
      content: 'Image',
      url: '',
      imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80',
      fontSize: 16,
      fontFamily: 'Inter',
      color: '#111827',
      backgroundColor: '#ECE8DF',
      align: 'center',
      width: 64,
      height: 220,
    },
    user: {
      id: '',
      type: 'user',
      label: 'User Block',
      content: 'Creator name and short bio',
      url: '',
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      fontSize: 16,
      fontFamily: 'Inter',
      color: '#111827',
      backgroundColor: '#ffffff',
      align: 'left',
      width: 52,
      height: 82,
    },
    section: {
      id: '',
      type: 'section',
      label: 'Section',
      content: 'Add a section note, benefits, or feature list.',
      url: '',
      imageUrl: '',
      fontSize: 18,
      fontFamily: 'Inter',
      color: '#111827',
      backgroundColor: '#F7F7F4',
      align: 'left',
      width: 78,
      height: 130,
    },
  }

  return {
    ...defaults[type],
    id: `${type}-${Date.now()}`,
    ...overrides,
    type,
  }
}


export default function PageBuilderPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading builder...</div>}>
      <PageBuilderEditor />
    </Suspense>
  )
}

function PageBuilderEditor() {
  const searchParams = useSearchParams()
  const templateId = searchParams.get('template') || 'blank'
  const selectedTemplate = useMemo(
    () => templatePresets.find((template) => template.id === templateId) || templatePresets[templatePresets.length - 1],
    [templateId],
  )
  const [pageTitle, setPageTitle] = useState(selectedTemplate.pageTitle)
  const [elements, setElements] = useState<BuilderElement[]>(selectedTemplate.elements)
  const [selectedId, setSelectedId] = useState(elements[0]?.id || '')
  const [pageBackground, setPageBackground] = useState(selectedTemplate.background)

  const selectedElement = elements.find((element) => element.id === selectedId)

  const addElement = (type: ElementType) => {
    const nextElement = createElement(type)
    setElements((current) => [...current, nextElement])
    setSelectedId(nextElement.id)
  }

  const updateElement = (updates: Partial<BuilderElement>) => {
    setElements((current) =>
      current.map((element) => (element.id === selectedId ? { ...element, ...updates } : element)),
    )
  }

  const removeSelectedElement = () => {
    setElements((current) => current.filter((element) => element.id !== selectedId))
    setSelectedId(elements.find((element) => element.id !== selectedId)?.id || '')
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const type = event.dataTransfer.getData('element/type') as ElementType
    if (type) addElement(type)
  }

  return (
    <div className="min-h-screen bg-muted p-5">
      <BuilderHeader
        templateName={selectedTemplate.name}
        pageTitle={pageTitle}
        onPageTitleChange={setPageTitle}
      />

      <div className="grid gap-4 xl:grid-cols-[76px_minmax(0,1fr)_310px]">
        <ComponentPalette onAddElement={addElement} />

        <div
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
          className="min-h-[760px] rounded-lg border bg-white p-4 shadow-sm"
        >
          <div
            className="mx-auto min-h-[720px] max-w-4xl rounded-lg border p-8 shadow-inner"
            style={{ backgroundColor: pageBackground }}
          >
            <div className="mb-8 flex items-center justify-between border-b border-black/10 pb-4">
              <div className="h-3 w-28 rounded-full bg-card" />
              <div className="flex gap-2">
                <span className="h-2.5 w-12 rounded-full bg-foreground/20" />
                <span className="h-2.5 w-12 rounded-full bg-foreground/20" />
                <span className="h-2.5 w-12 rounded-full bg-foreground/20" />
              </div>
            </div>

            <div className="space-y-5">
              {elements.map((element) => (
                <CanvasElement
                  key={element.id}
                  element={element}
                  selected={element.id === selectedId}
                  onSelect={() => setSelectedId(element.id)}
                />
              ))}
            </div>
          </div>
        </div>

        <SettingsPanel
          pageBackground={pageBackground}
          onPageBackgroundChange={setPageBackground}
          selectedElement={selectedElement}
          onUpdateElement={updateElement}
          onDeleteElement={removeSelectedElement}
        />
      </div>
    </div>
  )
}



function CanvasElement({
  element,
  selected,
  onSelect,
}: {
  element: BuilderElement
  selected: boolean
  onSelect: () => void
}) {
  const wrapperStyle: CSSProperties = {
    width: `${element.width}%`,
    textAlign: element.align,
  }

  const textStyle: CSSProperties = {
    color: element.color,
    fontFamily: element.fontFamily,
    fontSize: element.fontSize,
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onSelect()
        }
      }}
      className={`block rounded-lg border-2 p-1 text-left transition ${
        selected ? 'border-primary bg-white/60 shadow-sm' : 'border-transparent hover:border-primary/40'
      }`}
      style={wrapperStyle}
    >
      {element.type === 'heading' && (
        <h2 className="font-bold leading-tight" style={textStyle}>
          {element.content}
        </h2>
      )}

      {element.type === 'text' && (
        <p className="leading-7" style={textStyle}>
          {element.content}
        </p>
      )}

      {element.type === 'button' && (
        <span
          className="inline-flex items-center justify-center rounded-md px-5 py-3 font-semibold shadow-sm"
          style={{
            ...textStyle,
            backgroundColor: element.backgroundColor,
            minHeight: element.height,
          }}
        >
          {element.content}
        </span>
      )}

      {element.type === 'image' && (
        <img
          src={element.imageUrl}
          alt={element.content}
          className="w-full rounded-lg object-cover shadow-sm"
          style={{
            height: element.height,
            backgroundColor: element.backgroundColor,
          }}
        />
      )}

      {element.type === 'user' && (
        <div
          className="flex items-center gap-3 rounded-lg border p-3 shadow-sm"
          style={{
            backgroundColor: element.backgroundColor,
            minHeight: element.height,
          }}
        >
          <img src={element.imageUrl} alt="" className="h-14 w-14 rounded-full object-cover" />
          <div style={textStyle}>{element.content}</div>
        </div>
      )}

      {element.type === 'section' && (
        <div
          className="flex items-center rounded-lg border p-5 shadow-sm"
          style={{
            ...textStyle,
            minHeight: element.height,
            backgroundColor: element.backgroundColor,
          }}
        >
          {element.content}
        </div>
      )}
    </div>
  )
}