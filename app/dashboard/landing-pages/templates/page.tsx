'use client'

import { useRouter } from 'next/navigation'
import { ArrowRight, Eye, LayoutTemplate, Sparkles } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const templates = [
  {
    id: 'course-sales',
    name: 'Course Sales Page',
    category: 'Online course',
    description: 'A conversion-focused page for launching a paid course.',
    accent: '#78866B',
    background: ' via-white to-cyan-50',
    sections: ['Hero', 'Outcomes', 'Curriculum', 'Pricing'],
  },
  {
    id: 'webinar-registration',
    name: 'Webinar Registration',
    category: 'Live event', description: 'A compact signup page for webinars and workshops.',
    accent: '#16a34a',
    background: 'from-emerald-50 via-white to-lime-50',
    sections: ['Headline', 'Host', 'Agenda', 'Form'],
  },
  {
    id: 'membership',
    name: 'Membership Landing Page',
    category: 'Community',
    description: 'A warm landing page for paid memberships and cohorts.',
    accent: '#db2777',
    background: 'from-rose-50 via-white to-fuchsia-50',
    sections: ['Promise', 'Benefits', 'Community', 'CTA'],
  },
  {
    id: 'lead-magnet',
    name: 'Lead Magnet Funnel',
    category: 'Lead capture',
    description: 'A simple opt-in page for free guides, templates and kits.',
    accent: '#ea580c',
    background: 'from-orange-50 via-white to-amber-50',
    sections: ['Offer', 'Preview', 'Proof', 'Download'],
  },
]

export default function TemplatesPage() {
  const router = useRouter()

  const useTemplate = (templateId: string) => {
    router.push(`/dashboard/landing-pages/page-builder/edit?template=${templateId}`)
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
            <LayoutTemplate className="h-3.5 w-3.5" />
            Template first page builder
          </div>
          <h1 className="text-3xl font-bold">Choose a page design</h1>
          <p className="mt-1 max-w-2xl text-muted-foreground">
            Pick a starting template, then customize text, images, links and layout in the builder.
          </p>
        </div>

        <Button variant="outline" onClick={() => useTemplate('blank')}>
          <Sparkles className="mr-2 h-4 w-4" />
          Start blank
        </Button>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        {templates.map((template) => (
          <Card key={template.id} className="overflow-hidden bg-white">
            <CardContent className="grid gap-0 p-0 md:grid-cols-[1.1fr_0.9fr]">
              <div className={`min-h-[260px] bg-primary ${template.background} p-5`}>
                <div className="flex h-full flex-col rounded-lg border bg-white/78 p-4 shadow-sm backdrop-blur">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="h-2.5 w-24 rounded-full bg-card" />
                    <div className="flex gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-card" />
                      <span className="h-2.5 w-2.5 rounded-full bg-card" />
                      <span className="h-2.5 w-2.5 rounded-full bg-card" />
                    </div>
                  </div>

                  <div className="grid flex-1 gap-4 sm:grid-cols-[1fr_120px]">
                    <div className="space-y-3">
                      <div
                        className="h-3 w-20 rounded-full"
                        style={{ backgroundColor: template.accent }}
                      />
                      <div className="h-7 w-4/5 rounded-md bg-card" />
                      <div className="h-7 w-3/5 rounded-md bg-card" />
                      <div className="h-2.5 w-full rounded-full bg-card" />
                      <div className="h-2.5 w-5/6 rounded-full bg-card" />
                      <div
                        className="mt-4 h-9 w-32 rounded-md"
                        style={{ backgroundColor: template.accent }}
                      />
                    </div>

                    <div className="rounded-lg border bg-muted p-3">
                      <div className="h-full rounded-md bg-white shadow-inner" />
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-4 gap-2">
                    {template.sections.map((section) => (
                      <div key={section} className="h-10 rounded-md bg-white shadow-sm" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between p-5">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">{template.category}</div>
                  <h2 className="mt-2 text-2xl font-semibold">{template.name}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{template.description}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {template.sections.map((section) => (
                      <span key={section} className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
                        {section}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex gap-2">
                  <Button className="flex-1" onClick={() => useTemplate(template.id)}>
                    Use template
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline" aria-label={`Preview ${template.name}`}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
