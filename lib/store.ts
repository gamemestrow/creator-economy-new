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
  activeSection: string
  setActiveSection: (section: string) => void
  activeSubsection: string | null
  setActiveSubsection: (subsection: string | null) => void
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  sidebarOpen: true,
  toggleSidebar: () =>
    set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  activeSection: 'dashboard',
  setActiveSection: (section) => set({ activeSection: section }),
  activeSubsection: null,
  setActiveSubsection: (subsection) => set({ activeSubsection: subsection }),
}))
