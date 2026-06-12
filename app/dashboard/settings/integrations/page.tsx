"use client";

import {
  Settings,
  Plug,
  CheckCircle2,
  AlertCircle,
  Plus,
  Mail,
  MessageSquare,
  CreditCard,
  Database,
  Globe,
  Shield,
  Webhook,
  Smartphone,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const integrations = [
  {
    name: "Razorpay",
    category: "Payments",
    status: "Connected",
    icon: CreditCard,
  },
  {
    name: "Stripe",
    category: "Payments",
    status: "Disconnected",
    icon: CreditCard,
  },
  {
    name: "Mailchimp",
    category: "Email Marketing",
    status: "Connected",
    icon: Mail,
  },
  {
    name: "WhatsApp Business",
    category: "Messaging",
    status: "Connected",
    icon: MessageSquare,
  },
  {
    name: "Google Analytics",
    category: "Analytics",
    status: "Connected",
    icon: Globe,
  },
  {
    name: "Firebase",
    category: "Database",
    status: "Connected",
    icon: Database,
  },
];

export default function Page() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Integrations</h1>
          <p className="text-muted-foreground">
            Connect external services, payment gateways, email tools, analytics
            and APIs.
          </p>
        </div>

        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Integration
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Integrations
                </p>
                <h2 className="mt-2 text-3xl font-bold">18</h2>
              </div>
              <Plug className="h-10 w-10 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Connected Apps
                </p>
                <h2 className="mt-2 text-3xl font-bold">14</h2>
              </div>
              <CheckCircle2 className="h-10 w-10 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Pending Setup
                </p>
                <h2 className="mt-2 text-3xl font-bold">3</h2>
              </div>
              <AlertCircle className="h-10 w-10 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  API Requests
                </p>
                <h2 className="mt-2 text-3xl font-bold">1.2M</h2>
              </div>
              <Webhook className="h-10 w-10 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Popular Integrations */}
      <Card>
        <CardHeader>
          <CardTitle>Connected Services</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {integrations.map((integration) => {
              const Icon = integration.icon;

              return (
                <div
                  key={integration.name}
                  className="rounded-xl border p-5 transition-all hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <Icon className="h-10 w-10 text-blue-600" />

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        integration.status === "Connected"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {integration.status}
                    </span>
                  </div>

                  <h3 className="mt-4 font-semibold">
                    {integration.name}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {integration.category}
                  </p>

                  <Button
                    variant="outline"
                    className="mt-4 w-full"
                  >
                    Configure
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Integration Categories */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <CreditCard className="h-8 w-8 text-green-500" />
            <div>
              <h3 className="font-semibold">Payments</h3>
              <p className="text-sm text-muted-foreground">
                Razorpay, Stripe
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <Mail className="h-8 w-8 text-blue-500" />
            <div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-sm text-muted-foreground">
                Mailchimp, SendGrid
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <MessageSquare className="h-8 w-8 text-purple-500" />
            <div>
              <h3 className="font-semibold">Messaging</h3>
              <p className="text-sm text-muted-foreground">
                WhatsApp, Telegram
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <Database className="h-8 w-8 text-orange-500" />
            <div>
              <h3 className="font-semibold">Database</h3>
              <p className="text-sm text-muted-foreground">
                Firebase, Supabase
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Settings Panel */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>API Keys</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="rounded-lg border p-3">
              <p className="font-medium">Public Key</p>
              <p className="text-sm text-muted-foreground">
                pk_live_xxxxxxxxxxxxxx
              </p>
            </div>

            <div className="rounded-lg border p-3">
              <p className="font-medium">Secret Key</p>
              <p className="text-sm text-muted-foreground">
                ********************
              </p>
            </div>

            <Button className="w-full">
              Manage Keys
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Webhooks</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="rounded-lg border p-3">
              <p className="font-medium">
                Order Created
              </p>
              <p className="text-sm text-muted-foreground">
                Active
              </p>
            </div>

            <div className="rounded-lg border p-3">
              <p className="font-medium">
                Payment Success
              </p>
              <p className="text-sm text-muted-foreground">
                Active
              </p>
            </div>

            <Button className="w-full">
              Configure Webhooks
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-green-500" />
              <div>
                <p className="font-medium">OAuth Enabled</p>
                <p className="text-sm text-muted-foreground">
                  Secure authentication active
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Smartphone className="h-5 w-5 text-blue-500" />
              <div>
                <p className="font-medium">2FA Enabled</p>
                <p className="text-sm text-muted-foreground">
                  Additional account protection
                </p>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              <Settings className="mr-2 h-4 w-4" />
              Security Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}