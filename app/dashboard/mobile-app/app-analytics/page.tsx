'use client'

import {
  Activity,
  Users,
  Smartphone,
  TrendingUp,
  Clock,
  Globe,
  Download,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Button } from '@/components/ui/button'

export default function Page() {
  const topPages = [
    {
      page: '/courses/react-mastery',
      views: '12,540',
      users: '8,940',
    },
    {
      page: '/community',
      views: '10,122',
      users: '7,331',
    },
    {
      page: '/membership/pro',
      views: '8,743',
      users: '5,990',
    },
    {
      page: '/checkout',
      views: '6,220',
      users: '4,121',
    },
  ]

  const devices = [
    { name: 'Mobile', percentage: '68%' },
    { name: 'Desktop', percentage: '24%' },
    { name: 'Tablet', percentage: '8%' },
  ]

  const countries = [
    { country: 'India', users: '12,430' },
    { country: 'United States', users: '4,210' },
    { country: 'United Kingdom', users: '2,111' },
    { country: 'Canada', users: '1,340' },
    { country: 'Australia', users: '1,012' },
  ]

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">App Analytics</h1>
          <p className="text-muted-foreground">
            Track user behavior, engagement and platform performance.
          </p>
        </div>

        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* KPI Cards */}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <Users className="h-5 w-5 text-primary" />
              <span className="flex items-center text-green-600 text-sm">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                12%
              </span>
            </div>

            <h3 className="mt-4 text-3xl font-bold">28,421</h3>

            <p className="text-muted-foreground text-sm">
              Monthly Active Users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <Activity className="h-5 w-5 text-primary" />
              <span className="flex items-center text-green-600 text-sm">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                8%
              </span>
            </div>

            <h3 className="mt-4 text-3xl font-bold">74,920</h3>

            <p className="text-muted-foreground text-sm">
              Sessions This Month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <Clock className="h-5 w-5 text-orange-500" />
              <span className="flex items-center text-green-600 text-sm">
                <ArrowUpRight className="mr-1 h-4 w-4" />
                5%
              </span>
            </div>

            <h3 className="mt-4 text-3xl font-bold">12m 42s</h3>

            <p className="text-muted-foreground text-sm">
              Average Session Time
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span className="flex items-center text-red-500 text-sm">
                <ArrowDownRight className="mr-1 h-4 w-4" />
                2%
              </span>
            </div>

            <h3 className="mt-4 text-3xl font-bold">41.3%</h3>

            <p className="text-muted-foreground text-sm">
              Bounce Rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts Area */}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex h-[280px] items-center justify-center rounded-lg border border-dashed">
              <div className="text-center">
                <TrendingUp className="mx-auto mb-3 h-10 w-10 text-primary" />
                <p className="font-medium">
                  User Growth Chart
                </p>
                <p className="text-sm text-muted-foreground">
                  Connect Recharts or Chart.js
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Session Analytics</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex h-[280px] items-center justify-center rounded-lg border border-dashed">
              <div className="text-center">
                <Activity className="mx-auto mb-3 h-10 w-10 text-primary" />
                <p className="font-medium">
                  Session Analytics Chart
                </p>
                <p className="text-sm text-muted-foreground">
                  Daily active sessions and retention
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Device + Geography */}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Device Breakdown</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {devices.map((device) => (
              <div
                key={device.name}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  <span>{device.name}</span>
                </div>

                <span className="font-semibold">
                  {device.percentage}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Countries</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {countries.map((country) => (
              <div
                key={country.country}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  {country.country}
                </div>

                <span className="font-semibold">
                  {country.users}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Top Pages */}

      <Card>
        <CardHeader>
          <CardTitle>Top Performing Pages</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3">Page</th>
                  <th className="pb-3">Views</th>
                  <th className="pb-3">Users</th>
                </tr>
              </thead>

              <tbody>
                {topPages.map((page) => (
                  <tr
                    key={page.page}
                    className="border-b"
                  >
                    <td className="py-4 font-medium">
                      {page.page}
                    </td>

                    <td>{page.views}</td>

                    <td>{page.users}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Retention */}

      <Card>
        <CardHeader>
          <CardTitle>User Retention Metrics</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                Day 1 Retention
              </p>
              <h3 className="mt-2 text-2xl font-bold">
                82%
              </h3>
            </div>

            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                Day 7 Retention
              </p>
              <h3 className="mt-2 text-2xl font-bold">
                61%
              </h3>
            </div>

            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                Day 30 Retention
              </p>
              <h3 className="mt-2 text-2xl font-bold">
                42%
              </h3>
            </div>

            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">
                Returning Users
              </p>
              <h3 className="mt-2 text-2xl font-bold">
                17,942
              </h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}