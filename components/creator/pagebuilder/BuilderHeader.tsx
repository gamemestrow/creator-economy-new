'use client'

import Link from 'next/link'
import { ArrowLeft, MousePointer2, Save } from 'lucide-react'

import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type BuilderHeaderProps = {
  templateName: string
  pageTitle: string
  onPageTitleChange: (value: string) => void
  onPreview?: () => void
  onSave?: () => void
}

export function BuilderHeader({
  templateName,
  pageTitle,
  onPageTitleChange,
  onPreview,
  onSave,
}: BuilderHeaderProps) {
  return (
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
          <div className="text-sm text-muted-foreground">{templateName}</div>
          <h1 className="text-2xl font-bold">Page Builder</h1>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Input
          className="w-full bg-white sm:w-80"
          value={pageTitle}
          onChange={(event) => onPageTitleChange(event.target.value)}
          aria-label="Page title"
        />
        <Button variant="outline" onClick={onPreview}>
          <MousePointer2 className="mr-2 h-4 w-4" />
          Preview
        </Button>
        <Button onClick={onSave}>
          <Save className="mr-2 h-4 w-4" />
          Save draft
        </Button>
      </div>
    </div>
  )
}