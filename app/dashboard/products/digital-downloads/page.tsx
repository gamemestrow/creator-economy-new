"use client";

import {
  Download,
  FileText,
  IndianRupee,
  TrendingUp,
  Users,
  Plus,
  Eye,
  HardDrive,
  ImageIcon,
  Music,
  FileArchive,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const downloads = [
  {
    name: "Instagram Growth eBook",
    type: "PDF",
    size: "12 MB",
    price: "₹499",
    downloads: 1245,
    revenue: "₹6.2L",
    status: "Published",
  },
  {
    name: "Canva Templates Pack",
    type: "ZIP",
    size: "84 MB",
    price: "₹999",
    downloads: 856,
    revenue: "₹8.5L",
    status: "Published",
  },
  {
    name: "Creator Toolkit",
    type: "ZIP",
    size: "145 MB",
    price: "₹1,499",
    downloads: 421,
    revenue: "₹6.3L",
    status: "Published",
  },
  {
    name: "Podcast Audio Bundle",
    type: "MP3",
    size: "320 MB",
    price: "₹799",
    downloads: 210,
    revenue: "₹1.6L",
    status: "Draft",
  },
];

export default function Page() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Digital Downloads</h1>
          <p className="text-muted-foreground">
            Sell ebooks, templates, files, resources and downloadable products.
          </p>
        </div>

        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Upload Download
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Products
                </p>
                <h2 className="mt-2 text-3xl font-bold">42</h2>
              </div>
              <FileText className="h-10 w-10 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Downloads
                </p>
                <h2 className="mt-2 text-3xl font-bold">7,842</h2>
              </div>
              <Download className="h-10 w-10 text-green-500" />
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
                <h2 className="mt-2 text-3xl font-bold">2,154</h2>
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
                <h2 className="mt-2 text-3xl font-bold">₹22.6L</h2>
              </div>
              <IndianRupee className="h-10 w-10 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Top Selling Downloads</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {downloads.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.type} • {item.size}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">{item.price}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.downloads} Downloads
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">{item.revenue}</p>
                    <p
                      className={`text-sm ${
                        item.status === "Published"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {item.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Insights</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <div>
                <p className="font-medium">Revenue Growth</p>
                <p className="text-sm text-muted-foreground">
                  +32% this month
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Eye className="h-5 w-5 text-blue-500" />
              <div>
                <p className="font-medium">Product Views</p>
                <p className="text-sm text-muted-foreground">
                  45,820 visitors
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <HardDrive className="h-5 w-5 text-purple-500" />
              <div>
                <p className="font-medium">Storage Used</p>
                <p className="text-sm text-muted-foreground">
                  18.4 GB / 100 GB
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Categories */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-3 p-6">
            <FileText className="h-8 w-8 text-blue-500" />
            <div>
              <p className="font-semibold">PDFs</p>
              <p className="text-sm text-muted-foreground">18 Files</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-3 p-6">
            <ImageIcon className="h-8 w-8 text-pink-500" />
            <div>
              <p className="font-semibold">Templates</p>
              <p className="text-sm text-muted-foreground">12 Packs</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-3 p-6">
            <Music className="h-8 w-8 text-green-500" />
            <div>
              <p className="font-semibold">Audio</p>
              <p className="text-sm text-muted-foreground">7 Products</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-3 p-6">
            <FileArchive className="h-8 w-8 text-orange-500" />
            <div>
              <p className="font-semibold">ZIP Bundles</p>
              <p className="text-sm text-muted-foreground">5 Bundles</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Digital Downloads</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3">Product</th>
                  <th className="pb-3">Type</th>
                  <th className="pb-3">Size</th>
                  <th className="pb-3">Price</th>
                  <th className="pb-3">Downloads</th>
                  <th className="pb-3">Revenue</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {downloads.map((item) => (
                  <tr
                    key={item.name}
                    className="border-b transition-colors hover:bg-muted/50"
                  >
                    <td className="py-4 font-medium">{item.name}</td>
                    <td>{item.type}</td>
                    <td>{item.size}</td>
                    <td>{item.price}</td>
                    <td>{item.downloads}</td>
                    <td>{item.revenue}</td>
                    <td>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          item.status === "Published"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {item.status}
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