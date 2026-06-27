'use client'

import Link from 'next/link'
import { ArrowRight, FileEdit, LayoutTemplate, Plus } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const recentPages = [
  {
    id: 'course-sales',
    name: 'Course Sales Page',
    status: 'Draft',
    updated: 'Just now',
  },
  {
    id: 'webinar-registration',
    name: 'Webinar Registration',
    status: 'Draft',
    updated: 'Today',
  },
  {
    id: 'membership',
    name: 'Membership Landing Page',
    status: 'Draft',
    updated: 'Today',
  },
]

export default function PageBuilderPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Page Builder</h1>
          <p className="mt-1 text-muted-foreground">
            Choose a template or continue editing an existing landing page.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link href="/dashboard/landing-pages/templates" className={buttonVariants()}>
            <LayoutTemplate className="mr-2 h-4 w-4" />
            Choose template
          </Link>
          <Link
            href="/dashboard/landing-pages/page-builder/edit?template=blank"
            className={buttonVariants({ variant: 'outline' })}
          >
            <Plus className="mr-2 h-4 w-4" />
            Start blank
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Editable Pages</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentPages.map((page) => (
            <div
              key={page.id}
              className="flex flex-col gap-3 rounded-lg border bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-primary">
                  <FileEdit className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-semibold">{page.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {page.status} - Updated {page.updated}
                  </p>
                </div>
              </div>

              <Link
                href={`/dashboard/landing-pages/page-builder/edit?template=${page.id}`}
                className={buttonVariants({ variant: 'outline' })}
              >
                Edit
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}


