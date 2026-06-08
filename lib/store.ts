'use client'

import { create } from 'zustand'

export interface DashboardSection {
  id: string
  name: string
  icon: React.ReactNode
  subsections?: { id: string; name: string }[]
}

interface DashboardStore {
  activeSection: string
  activeSubsection: string
  sidebarOpen: boolean
  setActiveSection: (section: string) => void
  setActiveSubsection: (subsection: string) => void
  toggleSidebar: () => void
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  activeSection: 'dashboard',
  activeSubsection: 'overview',
  sidebarOpen: true,
  setActiveSection: (section) =>
    set({ activeSection: section, activeSubsection: 'overview' }),
  setActiveSubsection: (subsection) =>
    set({ activeSubsection: subsection }),
  toggleSidebar: () =>
    set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}))
