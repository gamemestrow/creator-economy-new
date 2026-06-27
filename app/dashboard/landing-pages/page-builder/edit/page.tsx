'use client'

import { Suspense, type CSSProperties, type DragEvent, type ReactNode, useMemo, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowLeft,
  Bold,
  Image,
  Link2,
  MousePointer2,
  Plus,
  Save,
  Square,
  Trash2,
  Type,
  User,
} from 'lucide-react'

import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

type ElementType = 'heading' | 'text' | 'button' | 'image' | 'user' | 'section'
type TextAlign = 'left' | 'center' | 'right'

type BuilderElement = {
  id: string
  type: ElementType
  label: string
  content: string
  url: string
  imageUrl: string
  fontSize: number
  fontFamily: string
  color: string
  backgroundColor: string
  align: TextAlign
  width: number
  height: number
}

type TemplatePreset = {
  id: string
  name: string
  pageTitle: string
  accent: string
  background: string
  elements: BuilderElement[]
}

const paletteItems: Array<{
  type: ElementType
  label: string
  icon: typeof Type
}> = [
  { type: 'heading', label: 'Heading', icon: Type },
  { type: 'text', label: 'Text', icon: Bold },
  { type: 'button', label: 'Link Button', icon: Link2 },
  { type: 'image', label: 'Image', icon: Image },
  { type: 'user', label: 'User Block', icon: User },
  { type: 'section', label: 'Section', icon: Square },
]

const templatePresets: TemplatePreset[] = [
  {
    id: 'course-sales',
    name: 'Course Sales Page',
    pageTitle: 'Launch your signature course',
    accent: '#2563eb',
    background: '#eff6ff',
    elements: [
      createElement('heading', {
        id: 'course-heading',
        content: 'Build a profitable creator business with one focused course',
        fontSize: 42,
        color: '#0f172a',
        width: 84,
      }),
      createElement('text', {
        id: 'course-copy',
        content: 'Teach your best system, sell with confidence, and guide students from first lesson to real results.',
        fontSize: 18,
        color: '#475569',
        width: 72,
      }),
      createElement('button', {
        id: 'course-cta',
        content: 'Join the course',
        url: 'https://example.com/course',
        backgroundColor: '#2563eb',
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
    accent: '#0f172a',
    background: '#f8fafc',
    elements: [
      createElement('heading', {
        id: 'blank-heading',
        content: 'Start building your page',
        fontSize: 38,
        color: '#0f172a',
      }),
      createElement('text', {
        id: 'blank-copy',
        content: 'Drag elements into the canvas and customize them from the settings panel.',
        fontSize: 17,
        color: '#475569',
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
      color: '#475569',
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
      backgroundColor: '#2563eb',
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
      backgroundColor: '#e2e8f0',
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
      backgroundColor: '#f8fafc',
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
      current.map((element) =>
        element.id === selectedId ? { ...element, ...updates } : element,
      ),
    )
  }

  const removeSelectedElement = () => {
    setElements((current) => current.filter((element) => element.id !== selectedId))
    setSelectedId(elements.find((element) => element.id !== selectedId)?.id || '')
  }

  const handleDragStart = (event: DragEvent<HTMLButtonElement>, type: ElementType) => {
    event.dataTransfer.setData('element/type', type)
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const type = event.dataTransfer.getData('element/type') as ElementType
    if (type) addElement(type)
  }

  return (
    <div className="min-h-screen bg-slate-50 p-5">
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/landing-pages/templates"
            className={buttonVariants({ variant: 'outline', size: 'icon' })}
            aria-label="Back to templates"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="text-sm text-muted-foreground">{selectedTemplate.name}</div>
            <h1 className="text-2xl font-bold">Page Builder</h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Input
            className="w-full bg-white sm:w-80"
            value={pageTitle}
            onChange={(event) => setPageTitle(event.target.value)}
            aria-label="Page title"
          />
          <Button variant="outline">
            <MousePointer2 className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save draft
          </Button>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[76px_minmax(0,1fr)_310px]">
        <aside className="group/stencil sticky top-5 z-20 h-fit w-[64px] overflow-hidden rounded-lg border bg-white shadow-sm transition-all duration-200 hover:w-[240px]">
          <div className="border-b px-3 py-4">
            <div className="flex items-center gap-3 whitespace-nowrap">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-primary">
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
                  onClick={() => addElement(item.type)}
                  onDragStart={(event) => handleDragStart(event, item.type)}
                  className="flex h-11 w-full items-center gap-3 rounded-lg border bg-white px-2 text-left text-sm font-medium transition hover:border-primary hover:bg-blue-50"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-100 text-primary">
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
              <div className="h-3 w-28 rounded-full bg-slate-900" />
              <div className="flex gap-2">
                <span className="h-2.5 w-12 rounded-full bg-black/20" />
                <span className="h-2.5 w-12 rounded-full bg-black/20" />
                <span className="h-2.5 w-12 rounded-full bg-black/20" />
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

        <Card className="h-fit bg-white">
          <CardHeader>
            <CardTitle className="text-lg">Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field label="Page background">
              <Input
                type="color"
                value={pageBackground}
                onChange={(event) => setPageBackground(event.target.value)}
                className="h-10 p-1"
              />
            </Field>

            {selectedElement ? (
              <>
                <div className="rounded-lg border bg-slate-50 p-3">
                  <div className="text-xs font-medium uppercase text-muted-foreground">Selected</div>
                  <div className="mt-1 font-semibold">{selectedElement.label}</div>
                </div>

                {selectedElement.type !== 'image' && (
                  <Field label={selectedElement.type === 'button' ? 'Button text' : 'Text'}>
                    <textarea
                      value={selectedElement.content}
                      onChange={(event) => updateElement({ content: event.target.value })}
                      className="min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                  </Field>
                )}

                {(selectedElement.type === 'button' || selectedElement.type === 'user') && (
                  <Field label="URL">
                    <Input
                      value={selectedElement.url}
                      onChange={(event) => updateElement({ url: event.target.value })}
                      placeholder="https://example.com"
                    />
                  </Field>
                )}

                {(selectedElement.type === 'image' || selectedElement.type === 'user') && (
                  <Field label="Image URL">
                    <Input
                      value={selectedElement.imageUrl}
                      onChange={(event) => updateElement({ imageUrl: event.target.value })}
                      placeholder="https://..."
                    />
                  </Field>
                )}

                <Field label="Font">
                  <select
                    value={selectedElement.fontFamily}
                    onChange={(event) => updateElement({ fontFamily: event.target.value })}
                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  >
                    <option value="Inter">Inter</option>
                    <option value="Arial">Arial</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Times New Roman">Times New Roman</option>
                  </select>
                </Field>

                <Field label={`Text size: ${selectedElement.fontSize}px`}>
                  <Input
                    type="range"
                    min="12"
                    max="64"
                    value={selectedElement.fontSize}
                    onChange={(event) => updateElement({ fontSize: Number(event.target.value) })}
                  />
                </Field>

                <div className="grid grid-cols-2 gap-3">
                  <Field label="Text color">
                    <Input
                      type="color"
                      value={selectedElement.color}
                      onChange={(event) => updateElement({ color: event.target.value })}
                      className="h-10 p-1"
                    />
                  </Field>
                  <Field label="Fill color">
                    <Input
                      type="color"
                      value={selectedElement.backgroundColor}
                      onChange={(event) => updateElement({ backgroundColor: event.target.value })}
                      className="h-10 p-1"
                    />
                  </Field>
                </div>

                <Field label="Alignment">
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 'left', icon: AlignLeft },
                      { value: 'center', icon: AlignCenter },
                      { value: 'right', icon: AlignRight },
                    ].map((option) => {
                      const Icon = option.icon
                      return (
                        <Button
                          key={option.value}
                          type="button"
                          variant={selectedElement.align === option.value ? 'default' : 'outline'}
                          onClick={() => updateElement({ align: option.value as TextAlign })}
                          aria-label={`Align ${option.value}`}
                        >
                          <Icon className="h-4 w-4" />
                        </Button>
                      )
                    })}
                  </div>
                </Field>

                <Field label={`Width: ${selectedElement.width}%`}>
                  <Input
                    type="range"
                    min="20"
                    max="100"
                    value={selectedElement.width}
                    onChange={(event) => updateElement({ width: Number(event.target.value) })}
                  />
                </Field>

                <Field label={`Height: ${selectedElement.height}px`}>
                  <Input
                    type="range"
                    min="40"
                    max="360"
                    value={selectedElement.height}
                    onChange={(event) => updateElement({ height: Number(event.target.value) })}
                  />
                </Field>

                <Button variant="destructive" className="w-full" onClick={removeSelectedElement}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete element
                </Button>
              </>
            ) : (
              <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
                Select an element on the canvas.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block space-y-2 text-sm font-medium">
      <span>{label}</span>
      {children}
    </label>
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


