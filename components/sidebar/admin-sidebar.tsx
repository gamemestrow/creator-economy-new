'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronsUpDown,
  Sparkles,
  Settings,
  LogOut,
  Crown,
  Command,
  Menu,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSidebarStore } from '@/lib/sidebar-store'
import { CommandPalette } from '@/components/command-palette'
import { SidebarTooltip } from './sidebar-tooltip'
import {
  PRODUCT_NAME,
  dashboardLink,
  navGroups,
  filterNavGroups,
  isRouteActive,
  getActiveGroupId,
  type NavGroup,
  type NavItem,
} from './sidebar-config'

const SIDEBAR_EXPANDED = 280
const SIDEBAR_COLLAPSED = 80

function NavBadge({ badge }: { badge: number | string }) {
  return (
    <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-[#9AA59E] px-1.5 text-[10px] font-semibold text-white">
      {badge}
    </span>
  )
}

function SubNavLink({
  item,
  isActive,
  isCollapsed,
  onNavigate,
}: {
  item: NavItem
  isActive: boolean
  isCollapsed: boolean
  onNavigate?: () => void
}) {
  const link = (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        'group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-[15px] font-medium transition-all duration-200',
        isActive
          ? 'bg-[rgba(37,99,235,0.12)] text-white'
          : 'text-[#232323] hover:bg-[rgba(37,99,235,0.08)] hover:text-white'
      )}
    >
      <span className={cn('flex-1 truncate', isActive && 'text-white')}>{item.label}</span>
      {item.badge != null && !isCollapsed && <NavBadge badge={item.badge} />}
    </Link>
  )

  if (isCollapsed) {
    return (
      <SidebarTooltip label={item.label}>
        <Link
          href={item.href}
          onClick={onNavigate}
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200',
            isActive
              ? 'bg-[rgba(37,99,235,0.12)] text-white'
              : 'text-[#666666] hover:bg-[rgba(37,99,235,0.08)] hover:text-white'
          )}
        >
          <span className="text-[10px] font-bold">{item.label.charAt(0)}</span>
        </Link>
      </SidebarTooltip>
    )
  }

  return link
}

function AccordionGroup({
  group,
  isExpanded,
  isCollapsed,
  pathname,
  onToggle,
  searchQuery,
  onNavigate,
}: {
  group: NavGroup
  isExpanded: boolean
  isCollapsed: boolean
  pathname: string
  onToggle: () => void
  searchQuery: string
  onNavigate?: () => void
}) {
  const Icon = group.icon
  const hasActiveChild = group.items.some((item) => isRouteActive(pathname, item.href))
  const filteredItems = searchQuery
    ? group.items.filter(
        (item) =>
          item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          group.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : group.items

  if (filteredItems.length === 0) return null

  const trigger = (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] font-medium transition-all duration-200',
        hasActiveChild
          ? 'bg-[rgba(37,99,235,0.12)] text-white'
          : 'text-[#232323] hover:bg-[rgba(37,99,235,0.08)] hover:text-[#FFFFFF]'
      )}
    >
      <Icon
        className={cn(
          'h-[18px] w-[18px] shrink-0 transition-colors',
          hasActiveChild ? 'text-[#9AA59E]' : 'text-[#666666] group-hover:text-white'
        )}
      />
      {!isCollapsed && (
        <>
          <span className="flex-1 truncate text-left">{group.label}</span>
          <motion.span
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-[#666666]"
          >
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </>
      )}
    </button>
  )

  return (
    <div className="space-y-0.5">
      {isCollapsed ? (
        <SidebarTooltip label={group.label}>{trigger}</SidebarTooltip>
      ) : (
        trigger
      )}

      <AnimatePresence initial={false}>
        {!isCollapsed && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="ml-3 space-y-0.5 border-l border-white/[0.06] py-1 pl-3">
              {filteredItems.map((item) => (
                <SubNavLink
                  key={item.href}
                  item={item}
                  isActive={isRouteActive(pathname, item.href)}
                  isCollapsed={false}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Mobile Top Bar ────────────────────────────────────────────────────────────

function MobileTopBar({
  onOpen,
  pathname,
}: {
  onOpen: () => void
  pathname: string
}) {
  return (
    <div className="fixed left-0 right-0 top-0 z-40 flex h-14 items-center gap-3 border-b border-white/[0.06] bg-[#FBFAF7] px-4 md:hidden">
      <button
        type="button"
        onClick={onOpen}
        aria-label="Open navigation"
        className="flex h-9 w-9 items-center justify-center rounded-lg text-[#666666] transition-colors hover:bg-[rgba(37,99,235,0.08)] hover:text-white"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#9AA59E] shadow-[0_10px_30px_rgba(0,0,0,0.05)] shadow-blue-500/20">
        <Sparkles className="h-3.5 w-3.5 text-white" />
      </div>

      <p className="flex-1 truncate text-sm font-semibold text-white">{PRODUCT_NAME}</p>

      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#9AA59E] text-[10px] font-bold text-white">
        AP
      </div>
    </div>
  )
}

// ─── Mobile Drawer ─────────────────────────────────────────────────────────────

function MobileDrawer({
  isOpen,
  onClose,
  pathname,
  router,
}: {
  isOpen: boolean
  onClose: () => void
  pathname: string
  router: ReturnType<typeof useRouter>
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedGroups, setExpandedGroups] = useState<string[]>(() => {
    const active = getActiveGroupId(pathname)
    return active ? [active] : ['analytics']
  })

  const filteredGroups = useMemo(() => filterNavGroups(searchQuery), [searchQuery])
  const DashboardIcon = dashboardLink.icon
  const dashboardActive = isRouteActive(pathname, dashboardLink.href)

  const toggleGroup = useCallback((groupId: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]
    )
  }, [])

  // Close on route change
  useEffect(() => {
    onClose()
  }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  // Trap scroll behind overlay
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm md:hidden"
          />

          {/* Drawer panel */}
          <motion.div
            key="drawer"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            className="fixed bottom-0 left-0 top-0 z-50 flex w-[280px] flex-col border-r border-white/[0.06] bg-[#FBFAF7] text-[#232323] md:hidden"
          >
            {/* Drawer header */}
            <div className="shrink-0 border-b border-white/[0.06] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#9AA59E] shadow-[0_10px_30px_rgba(0,0,0,0.05)] shadow-blue-500/20">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">{PRODUCT_NAME}</p>
                  <button
                    type="button"
                    className="mt-0.5 flex w-full items-center gap-1.5 rounded-md px-1 py-0.5 text-left text-xs text-[#666666] transition-colors hover:bg-[rgba(37,99,235,0.08)] hover:text-[#232323]"
                  >
                    <span className="truncate">My Workspace</span>
                    <ChevronsUpDown className="h-3 w-3 shrink-0" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close navigation"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#666666] transition-colors hover:bg-[rgba(37,99,235,0.08)] hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="shrink-0 px-4 py-3">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#666666]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search navigation..."
                  className="w-full rounded-lg border border-white/[0.06] bg-white/[0.04] py-2 pl-9 pr-4 text-sm text-[#232323] placeholder:text-[#666666] outline-none transition-all focus:border-[#9AA59E]/40 focus:bg-white/[0.06] focus:ring-1 focus:ring-[#9AA59E]/30"
                />
              </div>
            </div>

            {/* Navigation */}
            <nav className="admin-sidebar-scroll flex-1 space-y-1 overflow-y-auto px-3 py-2">
              <p className="px-3 pb-1 pt-2 text-[12px] font-semibold uppercase tracking-wider text-[#666666]">
                Main
              </p>

              <Link
                href={dashboardLink.href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] font-medium transition-all duration-200',
                  dashboardActive
                    ? 'bg-[rgba(37,99,235,0.12)] text-white'
                    : 'text-[#232323] hover:bg-[rgba(37,99,235,0.08)] hover:text-white'
                )}
              >
                <DashboardIcon
                  className={cn(
                    'h-[18px] w-[18px]',
                    dashboardActive ? 'text-[#9AA59E]' : 'text-[#666666]'
                  )}
                />
                <span>{dashboardLink.label}</span>
              </Link>

              <p className="px-3 pb-1 pt-4 text-[12px] font-semibold uppercase tracking-wider text-[#666666]">
                Platform
              </p>

              {filteredGroups.map((group) => (
                <AccordionGroup
                  key={group.id}
                  group={group}
                  isExpanded={expandedGroups.includes(group.id) || !!searchQuery}
                  isCollapsed={false}
                  pathname={pathname}
                  onToggle={() => toggleGroup(group.id)}
                  searchQuery={searchQuery}
                  onNavigate={onClose}
                />
              ))}
            </nav>

            {/* Footer */}
            <div className="shrink-0 space-y-2 border-t border-white/[0.06] p-3">
              <Link
                href="/dashboard/billing/plans"
                onClick={onClose}
                className="block rounded-xl border border-[#9AA59E]/20 bg-primary from-[#9AA59E]/15 to-[#7F8F84]/10 p-3 transition-all hover:border-[#9AA59E]/40 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-blue-500/10"
              >
                <div className="flex items-center gap-2">
                  <Crown className="h-4 w-4 text-[#9AA59E]" />
                  <span className="text-xs font-semibold text-white">Upgrade Plan</span>
                </div>
                <p className="mt-1 text-[11px] leading-relaxed text-[#666666]">
                  Unlock advanced analytics, automation, and team seats.
                </p>
              </Link>

              <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#666666]">
                  Subscription
                </p>
                <p className="mt-0.5 text-xs font-medium text-white">Pro Plan</p>
                <p className="text-[11px] text-[#666666]">Renews Apr 9, 2026</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg px-2 py-1.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#9AA59E] text-xs font-bold text-white">
                    AP
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">Tannu</p>
                    <p className="truncate text-[11px] text-[#666666]">creator@works.cloud</p>
                  </div>
                </div>
                <SidebarTooltip label="Settings" side="top">
                  <Link
                    href="/dashboard/settings/general"
                    onClick={onClose}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-[#666666] transition-colors hover:bg-[rgba(37,99,235,0.08)] hover:text-white"
                  >
                    <Settings className="h-4 w-4" />
                  </Link>
                </SidebarTooltip>
                <SidebarTooltip label="Logout" side="top">
                  <button
                    type="button"
                    onClick={() => { onClose(); router.push('/login') }}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-[#666666] transition-colors hover:bg-red-500/10 hover:text-red-400"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </SidebarTooltip>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ─── Main Export ───────────────────────────────────────────────────────────────

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const searchRef = useRef<HTMLInputElement>(null)
  const { isCollapsed, commandOpen, toggleCollapse, setCommandOpen, toggleCommand } =
    useSidebarStore()

  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedGroups, setExpandedGroups] = useState<string[]>(() => {
    const active = getActiveGroupId(pathname)
    return active ? [active] : ['analytics']
  })
  const [focusedIndex, setFocusedIndex] = useState(-1)

  const filteredGroups = useMemo(() => filterNavGroups(searchQuery), [searchQuery])

  const flatFocusableItems = useMemo(() => {
    const items: { href: string; label: string }[] = [
      { href: dashboardLink.href, label: dashboardLink.label },
    ]
    for (const group of filteredGroups) {
      if (expandedGroups.includes(group.id) || searchQuery) {
        for (const item of group.items) {
          items.push({ href: item.href, label: item.label })
        }
      }
    }
    return items
  }, [filteredGroups, expandedGroups, searchQuery])

  useEffect(() => {
    const active = getActiveGroupId(pathname)
    if (active && !expandedGroups.includes(active)) {
      setExpandedGroups((prev) => [...prev, active])
    }
  }, [pathname, expandedGroups])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      const isInput =
        target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        toggleCommand()
        return
      }

      if (e.key === '[' && !isInput) {
        e.preventDefault()
        toggleCollapse()
        return
      }

      if (isInput && target !== searchRef.current) return

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setFocusedIndex((prev) => Math.min(prev + 1, flatFocusableItems.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setFocusedIndex((prev) => Math.max(prev - 1, 0))
      } else if (e.key === 'Enter' && focusedIndex >= 0) {
        e.preventDefault()
        const item = flatFocusableItems[focusedIndex]
        if (item) router.push(item.href)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [flatFocusableItems, focusedIndex, router, toggleCollapse, toggleCommand])

  const toggleGroup = useCallback((groupId: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]
    )
  }, [])

  const DashboardIcon = dashboardLink.icon
  const dashboardActive = isRouteActive(pathname, dashboardLink.href)

  return (
    <>
      {/* ── Mobile: top bar + slide-over drawer ── */}
      <MobileTopBar onOpen={() => setMobileOpen(true)} pathname={pathname} />
      <MobileDrawer
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        pathname={pathname}
        router={router}
      />

      {/* ── Desktop: fixed sidebar (unchanged behaviour) ── */}
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED }}
        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          'admin-sidebar fixed left-0 top-0 z-40 hidden h-screen flex-col md:flex',
          'border-r border-white/[0.06] bg-[#FBFAF7] text-[#232323]'
        )}
      >
        {/* Header */}
        <div className="shrink-0 border-b border-white/[0.06] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#9AA59E] shadow-[0_10px_30px_rgba(0,0,0,0.05)] shadow-blue-500/20">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-w-0 flex-1"
              >
                <p className="truncate text-sm font-semibold text-white">{PRODUCT_NAME}</p>
                <button
                  type="button"
                  className="mt-0.5 flex w-full items-center gap-1.5 rounded-md px-1 py-0.5 text-left text-xs text-[#666666] transition-colors hover:bg-[rgba(37,99,235,0.08)] hover:text-[#232323]"
                >
                  <span className="truncate">My Workspace</span>
                  <ChevronsUpDown className="h-3 w-3 shrink-0" />
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Search */}
        {!isCollapsed ? (
          <div className="shrink-0 px-4 py-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#666666]" />
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setFocusedIndex(-1)
                }}
                placeholder="Search navigation..."
                className="w-full rounded-lg border border-white/[0.06] bg-white/[0.04] py-2 pl-9 pr-16 text-sm text-[#232323] placeholder:text-[#666666] outline-none transition-all focus:border-[#9AA59E]/40 focus:bg-white/[0.06] focus:ring-1 focus:ring-[#9AA59E]/30"
              />
              <button
                type="button"
                onClick={() => setCommandOpen(true)}
                className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-0.5 rounded border border-white/[0.08] bg-white/[0.04] px-1.5 py-0.5 text-[10px] text-[#666666] transition-colors hover:text-white"
              >
                <Command className="h-2.5 w-2.5" />K
              </button>
            </div>
          </div>
        ) : (
          <div className="flex shrink-0 justify-center py-3">
            <SidebarTooltip label="Search">
              <button
                type="button"
                onClick={() => {
                  toggleCollapse()
                  setTimeout(() => searchRef.current?.focus(), 300)
                }}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-[#666666] transition-colors hover:bg-[rgba(37,99,235,0.08)] hover:text-white"
              >
                <Search className="h-4 w-4" />
              </button>
            </SidebarTooltip>
          </div>
        )}

        {/* Navigation */}
        <nav className="admin-sidebar-scroll flex-1 space-y-1 overflow-y-auto px-3 py-2">
          {!isCollapsed && (
            <p className="px-3 pb-1 pt-2 text-[12px] font-semibold uppercase tracking-wider text-[#666666]">
              Main
            </p>
          )}

          {isCollapsed ? (
            <SidebarTooltip label={dashboardLink.label}>
              <Link
                href={dashboardLink.href}
                className={cn(
                  'mx-auto flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200',
                  dashboardActive
                    ? 'bg-[rgba(37,99,235,0.12)] text-[#9AA59E]'
                    : 'text-[#666666] hover:bg-[rgba(37,99,235,0.08)] hover:text-white'
                )}
              >
                <DashboardIcon className="h-[18px] w-[18px]" />
              </Link>
            </SidebarTooltip>
          ) : (
            <Link
              href={dashboardLink.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] font-medium transition-all duration-200',
                dashboardActive
                  ? 'bg-[rgba(37,99,235,0.12)] text-white'
                  : 'text-[#232323] hover:bg-[rgba(37,99,235,0.08)] hover:text-white'
              )}
            >
              <DashboardIcon
                className={cn(
                  'h-[18px] w-[18px]',
                  dashboardActive ? 'text-[#9AA59E]' : 'text-[#666666]'
                )}
              />
              <span>{dashboardLink.label}</span>
            </Link>
          )}

          {!isCollapsed && (
            <p className="px-3 pb-1 pt-4 text-[12px] font-semibold uppercase tracking-wider text-[#666666]">
              Platform
            </p>
          )}

          {filteredGroups.map((group) => (
            <AccordionGroup
              key={group.id}
              group={group}
              isExpanded={expandedGroups.includes(group.id) || !!searchQuery}
              isCollapsed={isCollapsed}
              pathname={pathname}
              onToggle={() => {
                if (isCollapsed) toggleCollapse()
                toggleGroup(group.id)
              }}
              searchQuery={searchQuery}
            />
          ))}
        </nav>

        {/* Footer */}
        <div className="shrink-0 space-y-2 border-t border-white/[0.06] p-3">
          {!isCollapsed && (
            <Link
              href="/dashboard/billing/plans"
              className="block rounded-xl border border-[#9AA59E]/20 bg-primary from-[#9AA59E]/15 to-[#7F8F84]/10 p-3 transition-all hover:border-[#9AA59E]/40 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-blue-500/10"
            >
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-[#9AA59E]" />
                <span className="text-xs font-semibold text-white">Upgrade Plan</span>
              </div>
              <p className="mt-1 text-[11px] leading-relaxed text-[#666666]">
                Unlock advanced analytics, automation, and team seats.
              </p>
            </Link>
          )}

          {!isCollapsed && (
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#666666]">
                Subscription
              </p>
              <p className="mt-0.5 text-xs font-medium text-white">Pro Plan</p>
              <p className="text-[11px] text-[#666666]">Renews Apr 9, 2026</p>
            </div>
          )}

          <div className="flex items-center gap-2">
            {!isCollapsed ? (
              <>
                <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg px-2 py-1.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#9AA59E] text-xs font-bold text-white">
                    AP
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">Tannu</p>
                    <p className="truncate text-[11px] text-[#666666]">creator@works.cloud</p>
                  </div>
                </div>
                <SidebarTooltip label="Settings" side="top">
                  <Link
                    href="/dashboard/settings/general"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-[#666666] transition-colors hover:bg-[rgba(37,99,235,0.08)] hover:text-white"
                  >
                    <Settings className="h-4 w-4" />
                  </Link>
                </SidebarTooltip>
                <SidebarTooltip label="Logout" side="top">
                  <button
                    type="button"
                    onClick={() => router.push('/login')}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-[#666666] transition-colors hover:bg-red-500/10 hover:text-red-400"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </SidebarTooltip>
              </>
            ) : (
              <div className="mx-auto flex flex-col items-center gap-2">
                <SidebarTooltip label="Profile">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#9AA59E] text-xs font-bold text-white">
                    AP
                  </div>
                </SidebarTooltip>
                <SidebarTooltip label="Settings">
                  <Link
                    href="/dashboard/settings/general"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-[#666666] hover:bg-[rgba(37,99,235,0.08)] hover:text-white"
                  >
                    <Settings className="h-4 w-4" />
                  </Link>
                </SidebarTooltip>
                <SidebarTooltip label="Logout">
                  <button
                    type="button"
                    onClick={() => router.push('/login')}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-[#666666] hover:bg-red-500/10 hover:text-red-400"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </SidebarTooltip>
              </div>
            )}
          </div>
        </div>

        {/* Collapse toggle */}
        <button
          type="button"
          onClick={toggleCollapse}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="absolute -right-3 top-20 z-50 flex h-6 w-6 items-center justify-center rounded-full border border-white/[0.08] bg-[#FBFAF7] text-[#666666] shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all hover:border-[#9AA59E]/40 hover:text-white"
        >
          <ChevronLeft
            className={cn('h-3.5 w-3.5 transition-transform duration-300', isCollapsed && 'rotate-180')}
          />
        </button>
      </motion.aside>

      <CommandPalette isOpen={commandOpen} onClose={() => setCommandOpen(false)} />
    </>
  )
}

export function useSidebarWidth() {
  const isCollapsed = useSidebarStore((s) => s.isCollapsed)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (isMobile) return 0
  return isCollapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED
}