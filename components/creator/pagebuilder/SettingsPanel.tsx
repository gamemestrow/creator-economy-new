'use client'

import type { ReactNode } from 'react'
import { AlignCenter, AlignLeft, AlignRight, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

import type { BuilderElement, TextAlign } from '@/components/types'

type SettingsPanelProps = {
  pageBackground: string
  onPageBackgroundChange: (value: string) => void
  selectedElement: BuilderElement | undefined
  onUpdateElement: (updates: Partial<BuilderElement>) => void
  onDeleteElement: () => void
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block space-y-2 text-sm font-medium">
      <span>{label}</span>
      {children}
    </label>
  )
}

export function SettingsPanel({
  pageBackground,
  onPageBackgroundChange,
  selectedElement,
  onUpdateElement,
  onDeleteElement,
}: SettingsPanelProps) {
  return (
    <Card className="h-fit bg-white">
      <CardHeader>
        <CardTitle className="text-lg">Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Field label="Page background">
          <Input
            type="color"
            value={pageBackground}
            onChange={(event) => onPageBackgroundChange(event.target.value)}
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
                  onChange={(event) => onUpdateElement({ content: event.target.value })}
                  className="min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </Field>
            )}

            {(selectedElement.type === 'button' || selectedElement.type === 'user') && (
              <Field label="URL">
                <Input
                  value={selectedElement.url}
                  onChange={(event) => onUpdateElement({ url: event.target.value })}
                  placeholder="https://example.com"
                />
              </Field>
            )}

            {(selectedElement.type === 'image' || selectedElement.type === 'user') && (
              <Field label="Image URL">
                <Input
                  value={selectedElement.imageUrl}
                  onChange={(event) => onUpdateElement({ imageUrl: event.target.value })}
                  placeholder="https://..."
                />
              </Field>
            )}

            <Field label="Font">
              <select
                value={selectedElement.fontFamily}
                onChange={(event) => onUpdateElement({ fontFamily: event.target.value })}
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
                onChange={(event) => onUpdateElement({ fontSize: Number(event.target.value) })}
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Text color">
                <Input
                  type="color"
                  value={selectedElement.color}
                  onChange={(event) => onUpdateElement({ color: event.target.value })}
                  className="h-10 p-1"
                />
              </Field>
              <Field label="Fill color">
                <Input
                  type="color"
                  value={selectedElement.backgroundColor}
                  onChange={(event) => onUpdateElement({ backgroundColor: event.target.value })}
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
                      onClick={() => onUpdateElement({ align: option.value as TextAlign })}
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
                onChange={(event) => onUpdateElement({ width: Number(event.target.value) })}
              />
            </Field>

            <Field label={`Height: ${selectedElement.height}px`}>
              <Input
                type="range"
                min="40"
                max="360"
                value={selectedElement.height}
                onChange={(event) => onUpdateElement({ height: Number(event.target.value) })}
              />
            </Field>

            <Button variant="destructive" className="w-full" onClick={onDeleteElement}>
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
  )
}