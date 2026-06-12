"use client";

import {
  Shield,
  Users,
  UserCog,
  Key,
  Lock,
  CheckCircle2,
  Plus,
  Settings,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const roles = [
  {
    name: "Super Admin",
    users: 2,
    permissions: 48,
    status: "Active",
  },
  {
    name: "Admin",
    users: 5,
    permissions: 40,
    status: "Active",
  },
  {
    name: "Creator Manager",
    users: 12,
    permissions: 28,
    status: "Active",
  },
  {
    name: "Support Agent",
    users: 8,
    permissions: 16,
    status: "Limited",
  },
  {
    name: "Finance Manager",
    users: 3,
    permissions: 18,
    status: "Active",
  },
];

const permissions = [
  "Manage Products",
  "Manage Courses",
  "Manage Memberships",
  "Manage Orders",
  "Manage Customers",
  "View Analytics",
  "Manage Payments",
  "Manage Marketing",
  "Manage Community",
  "Manage Integrations",
];

export default function Page() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Roles & Permissions</h1>
          <p className="text-muted-foreground">
            Control access levels, permissions and team management.
          </p>
        </div>

        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Role
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Roles
                </p>
                <h2 className="mt-2 text-3xl font-bold">12</h2>
              </div>
              <Shield className="h-10 w-10 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Team Members
                </p>
                <h2 className="mt-2 text-3xl font-bold">30</h2>
              </div>
              <Users className="h-10 w-10 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Active Permissions
                </p>
                <h2 className="mt-2 text-3xl font-bold">48</h2>
              </div>
              <Key className="h-10 w-10 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Security Score
                </p>
                <h2 className="mt-2 text-3xl font-bold">96%</h2>
              </div>
              <Lock className="h-10 w-10 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Roles Table */}
      <Card>
        <CardHeader>
          <CardTitle>Role Management</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3">Role</th>
                  <th className="pb-3">Users</th>
                  <th className="pb-3">Permissions</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {roles.map((role) => (
                  <tr
                    key={role.name}
                    className="border-b hover:bg-muted/50"
                  >
                    <td className="py-4 font-medium">
                      {role.name}
                    </td>
                    <td>{role.users}</td>
                    <td>{role.permissions}</td>
                    <td>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          role.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {role.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <Button size="icon" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>

                        <Button size="icon" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>

                        <Button size="icon" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Permissions + Team */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Available Permissions</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid gap-3">
              {permissions.map((permission) => (
                <div
                  key={permission}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <span>{permission}</span>

                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Access Summary</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 rounded-lg border p-4">
              <UserCog className="h-8 w-8 text-blue-500" />
              <div>
                <h3 className="font-semibold">Administrators</h3>
                <p className="text-sm text-muted-foreground">
                  Full platform access and settings management.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border p-4">
              <Shield className="h-8 w-8 text-green-500" />
              <div>
                <h3 className="font-semibold">Managers</h3>
                <p className="text-sm text-muted-foreground">
                  Manage products, orders and customers.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border p-4">
              <Users className="h-8 w-8 text-purple-500" />
              <div>
                <h3 className="font-semibold">Support Team</h3>
                <p className="text-sm text-muted-foreground">
                  Access customer tickets and community support.
                </p>
              </div>
            </div>

            <Button className="w-full">
              <Settings className="mr-2 h-4 w-4" />
              Configure Access Control
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Audit Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Permission Changes</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            <div className="rounded-lg border p-4">
              <p className="font-medium">
                Admin role updated permissions
              </p>
              <p className="text-sm text-muted-foreground">
                2 hours ago • Added Marketing Access
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <p className="font-medium">
                New Support Agent created
              </p>
              <p className="text-sm text-muted-foreground">
                Yesterday • Assigned Community Access
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <p className="font-medium">
                Finance Manager role modified
              </p>
              <p className="text-sm text-muted-foreground">
                3 days ago • Payment permissions updated
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}