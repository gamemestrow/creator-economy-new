"use client";

import {
  Package,
  Plus,
  Users,
  IndianRupee,
  ShoppingBag,
  TrendingUp,
  Eye,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const bundles = [
  {
    name: "Creator Launch Bundle",
    products: 4,
    price: "₹4,999",
    sales: 124,
    revenue: "₹6.2L",
    status: "Active",
  },
  {
    name: "Business Growth Bundle",
    products: 6,
    price: "₹9,999",
    sales: 86,
    revenue: "₹8.6L",
    status: "Active",
  },
  {
    name: "Premium Coaching Bundle",
    products: 3,
    price: "₹14,999",
    sales: 41,
    revenue: "₹6.1L",
    status: "Draft",
  },
  {
    name: "Content Creator Pack",
    products: 5,
    price: "₹7,499",
    sales: 68,
    revenue: "₹5.1L",
    status: "Active",
  },
];

export default function Page() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Bundles</h1>
          <p className="text-muted-foreground">
            Package multiple products together and increase revenue.
          </p>
        </div>

        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Bundle
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Bundles
                </p>
                <h2 className="mt-2 text-3xl font-bold">18</h2>
              </div>
              <Package className="h-10 w-10 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Bundle Sales
                </p>
                <h2 className="mt-2 text-3xl font-bold">319</h2>
              </div>
              <ShoppingBag className="h-10 w-10 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Customers
                </p>
                <h2 className="mt-2 text-3xl font-bold">1,254</h2>
              </div>
              <Users className="h-10 w-10 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Revenue
                </p>
                <h2 className="mt-2 text-3xl font-bold">₹26L</h2>
              </div>
              <IndianRupee className="h-10 w-10 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Analytics */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Bundle Performance</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {bundles.map((bundle) => (
                <div
                  key={bundle.name}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <h3 className="font-semibold">{bundle.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {bundle.products} Products Included
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">{bundle.price}</p>
                    <p className="text-sm text-muted-foreground">
                      {bundle.sales} Sales
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">{bundle.revenue}</p>
                    <p
                      className={`text-sm ${
                        bundle.status === "Active"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {bundle.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bundle Insights</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <div>
                <p className="font-medium">Revenue Growth</p>
                <p className="text-sm text-muted-foreground">
                  +28% this month
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ShoppingBag className="h-5 w-5 text-blue-500" />
              <div>
                <p className="font-medium">Best Seller</p>
                <p className="text-sm text-muted-foreground">
                  Business Growth Bundle
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Eye className="h-5 w-5 text-purple-500" />
              <div>
                <p className="font-medium">Views</p>
                <p className="text-sm text-muted-foreground">
                  12,480 Bundle Page Visits
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bundle Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Bundles</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3">Bundle</th>
                  <th className="pb-3">Products</th>
                  <th className="pb-3">Price</th>
                  <th className="pb-3">Sales</th>
                  <th className="pb-3">Revenue</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {bundles.map((bundle) => (
                  <tr
                    key={bundle.name}
                    className="border-b transition-colors hover:bg-muted/40"
                  >
                    <td className="py-4 font-medium">{bundle.name}</td>
                    <td>{bundle.products}</td>
                    <td>{bundle.price}</td>
                    <td>{bundle.sales}</td>
                    <td>{bundle.revenue}</td>
                    <td>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          bundle.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {bundle.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
