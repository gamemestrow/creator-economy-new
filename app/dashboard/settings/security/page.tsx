"use client";

import {
  Shield,
  Lock,
  Key,
  Smartphone,
  Eye,
  AlertTriangle,
  CheckCircle2,
  Globe,
  Activity,
  Users,
  Fingerprint,
  Settings,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const sessions = [
  {
    device: "Windows Desktop",
    location: "Delhi, India",
    status: "Active",
    lastSeen: "Now",
  },
  {
    device: "iPhone 15 Pro",
    location: "Mumbai, India",
    status: "Active",
    lastSeen: "5 mins ago",
  },
  {
    device: "MacBook Pro",
    location: "Bangalore, India",
    status: "Expired",
    lastSeen: "2 days ago",
  },
];

const logs = [
  {
    action: "User Login",
    time: "2 minutes ago",
    status: "Success",
  },
  {
    action: "Password Changed",
    time: "3 hours ago",
    status: "Success",
  },
  {
    action: "Failed Login Attempt",
    time: "Yesterday",
    status: "Warning",
  },
  {
    action: "API Key Generated",
    time: "2 days ago",
    status: "Success",
  },
];

export default function Page() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Security</h1>
          <p className="text-muted-foreground">
            Manage account protection, sessions, authentication and security
            monitoring.
          </p>
        </div>

        <Button>
          <Settings className="mr-2 h-4 w-4" />
          Security Settings
        </Button>
      </div>

      {/* Security KPIs */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Security Score
                </p>
                <h2 className="mt-2 text-3xl font-bold">98%</h2>
              </div>
              <Shield className="h-10 w-10 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Active Sessions
                </p>
                <h2 className="mt-2 text-3xl font-bold">3</h2>
              </div>
              <Users className="h-10 w-10 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Threat Alerts
                </p>
                <h2 className="mt-2 text-3xl font-bold">1</h2>
              </div>
              <AlertTriangle className="h-10 w-10 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Login Events
                </p>
                <h2 className="mt-2 text-3xl font-bold">248</h2>
              </div>
              <Activity className="h-10 w-10 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Controls */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Authentication</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Password Protection</p>
                  <p className="text-sm text-muted-foreground">
                    Strong password enabled
                  </p>
                </div>
              </div>

              <CheckCircle2 className="h-5 w-5 text-green-500" />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">
                    Two-Factor Authentication
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Authenticator App Connected
                  </p>
                </div>
              </div>

              <CheckCircle2 className="h-5 w-5 text-green-500" />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <Fingerprint className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="font-medium">Biometric Login</p>
                  <p className="text-sm text-muted-foreground">
                    Enabled on mobile devices
                  </p>
                </div>
              </div>

              <CheckCircle2 className="h-5 w-5 text-green-500" />
            </div>

            <Button className="w-full">
              Configure Authentication
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API & Access Keys</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <Key className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">Public API Key</p>
                  <p className="text-sm text-muted-foreground">
                    pk_live_xxxxxxxxxxxxxx
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <Key className="h-5 w-5 text-red-500" />
                <div>
                  <p className="font-medium">Secret API Key</p>
                  <p className="text-sm text-muted-foreground">
                    **********************
                  </p>
                </div>
              </div>
            </div>

            <Button className="w-full">
              Manage API Keys
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            {sessions.map((session) => (
              <div
                key={session.device}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <h3 className="font-medium">{session.device}</h3>
                  <p className="text-sm text-muted-foreground">
                    {session.location}
                  </p>
                </div>

                <div className="text-right">
                  <p
                    className={`font-medium ${
                      session.status === "Active"
                        ? "text-green-600"
                        : "text-muted-foreground"
                    }`}
                  >
                    {session.status}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {session.lastSeen}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Logs */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Security Activity</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-3">
              {logs.map((log) => (
                <div
                  key={log.action}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <p className="font-medium">{log.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {log.time}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      log.status === "Success"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {log.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Threat Monitoring</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 rounded-lg border p-4">
              <Shield className="h-8 w-8 text-green-500" />
              <div>
                <h3 className="font-semibold">
                  Firewall Protection
                </h3>
                <p className="text-sm text-muted-foreground">
                  All systems secured
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border p-4">
              <Globe className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold">
                  Suspicious Login Detection
                </h3>
                <p className="text-sm text-muted-foreground">
                  Monitoring global login attempts
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border p-4">
              <Eye className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold">
                  Real-Time Monitoring
                </h3>
                <p className="text-sm text-muted-foreground">
                  Continuous security auditing
                </p>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              View Security Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}