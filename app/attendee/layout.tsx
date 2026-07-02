import { AttendeeAppLayout } from "@/components/attendee/attendee-layout"

export default function AttendeeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AttendeeAppLayout>{children}</AttendeeAppLayout>
}
