'use client'

import { create } from 'zustand'

export interface DashboardSection {
  id: string
  name: string
  icon: React.ReactNode
  subsections?: { id: string; name: string }[]
}

interface DashboardStore {
  sidebarOpen: boolean
  toggleSidebar: () => void
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  sidebarOpen: true,
  toggleSidebar: () =>
    set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}))
