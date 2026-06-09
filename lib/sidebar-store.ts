import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SidebarStore {
  isCollapsed: boolean
  commandOpen: boolean
  toggleCollapse: () => void
  setCollapsed: (collapsed: boolean) => void
  setCommandOpen: (open: boolean) => void
  toggleCommand: () => void
}

export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set) => ({
      isCollapsed: false,
      commandOpen: false,
      toggleCollapse: () => set((s) => ({ isCollapsed: !s.isCollapsed })),
      setCollapsed: (isCollapsed) => set({ isCollapsed }),
      setCommandOpen: (commandOpen) => set({ commandOpen }),
      toggleCommand: () => set((s) => ({ commandOpen: !s.commandOpen })),
    }),
    { name: 'creatorworks-sidebar' }
  )
)
