"use client"

import { useAuth } from "@/contexts/user-context"
import { ArrowLeft, Bookmark, ChevronDown, ChevronLeft, Heart, HelpCircle, Home, LogOut, Menu } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from "react"

export interface DashboardSideMenuProps {
    isSidebarCollapsed: boolean
    setIsSidebarCollapsed: Dispatch<SetStateAction<boolean>>
}

export function DashboardSideMenu({ isSidebarCollapsed, setIsSidebarCollapsed}: DashboardSideMenuProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [expandedMenu, setExpandedMenu] = useState<string | null>(null)
    const router = useRouter()
    const pathname = usePathname()
    const { signOut } = useAuth()

    const menuItems: {
    icon: typeof Home
    label: string
    href?: string
    submenu: { label: string; href: string }[]
    isFeatured?: boolean
  }[] = useMemo(() => [
    {
      icon: Home,
      label: 'Dashboard',
      href: '/dashboard',
      submenu: [],
    },
    {
      icon: Bookmark,
      label: 'My Saved Plans',
      submenu: [
        { label: 'Weekly Plans', href: '/saved/plans' },
        { label: 'Favorite Recipes', href: '/saved/recipes' },
      ],
    },
    {
      icon: HelpCircle,
      label: 'Support',
      submenu: [
        { label: 'Contact Us', href: '/support#contact' },
        { label: 'FAQ', href: '/support#faq' },
      ],
    },
    {
      icon: Heart,
      label: 'Donate',
      href: '/donate',
      submenu: [],
      isFeatured: true,
    },
  ], [])

  const toggleMenu = useCallback((label: string) => {
    setExpandedMenu(prev => prev === label ? null : label)
  }, [])

  const handleLogout = useCallback(async () => {
    await signOut()
    router.push('/')
  }, [])

    return (
    <>
        <button
          onClick={() => setIsSidebarOpen(prev => !prev)}
          className={`lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-card border border-border shadow-lg ${isSidebarOpen ? 'hidden' : ''}`}
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 bg-card border-r border-border transform transition-all duration-300 lg:translate-x-0 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-border">
              {!isSidebarCollapsed && (
                <h2 className="text-lg font-semibold">Menu</h2>
              )}
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="p-2 rounded-lg hover:bg-muted ml-auto cursor-pointer"
              >
                <ChevronLeft
                  className={`w-5 h-5 transition-transform ${isSidebarCollapsed ? 'rotate-180' : ''}`}
                />
              </button>
            </div>
            <nav
              className={`flex-1 p-4 space-y-1 overflow-y-auto ${isSidebarCollapsed ? 'px-2' : ''}`}
            >
              {menuItems.map((item) => {
                const Icon = item.icon
                const hasSubmenu = item.submenu && item.submenu.length > 0
                const isExpanded = expandedMenu === item.label

                return (
                  <div key={item.label}>
                    <button
                      onClick={() => {
                        if (hasSubmenu) {
                          toggleMenu(item.label)
                        } else if (item.href) {
                          router.push(item.href)
                          setIsSidebarOpen(false)
                        }
                      }}
                      className={`flex items-center justify-between w-full rounded-lg hover:opacity-90 transition-all text-left cursor-pointer ${
                        isSidebarCollapsed ? 'p-3 justify-center' : 'p-3 gap-3'
                      } ${item.isFeatured ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white hover:shadow-lg hover:shadow-rose-500/25' : 'hover:bg-muted'} ${
                        !item.isFeatured && item.href && pathname === item.href
                          ? 'bg-muted font-medium'
                          : ''
                      }`}
                    >
                      <div
                        className={`flex items-center ${isSidebarCollapsed ? 'justify-center w-full' : 'gap-3'}`}
                      >
                        <Icon
                          className={`w-5 h-5 flex-shrink-0 ${item.isFeatured ? 'text-white' : item.href && pathname === item.href ? 'text-foreground' : ''}`}
                        />
                        {!isSidebarCollapsed && (
                          <span
                            className={
                              item.isFeatured
                                ? 'text-white font-medium'
                                : item.href && pathname === item.href
                                  ? 'text-foreground font-medium'
                                  : ''
                            }
                          >
                            {item.label}
                          </span>
                        )}
                      </div>
                      {hasSubmenu && !isSidebarCollapsed && (
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      )}
                    </button>
                    {hasSubmenu && isExpanded && !isSidebarCollapsed && (
                      <div className="ml-9 mt-1 space-y-1">
                        {item.submenu?.map((sub) => (
                          <button
                            key={sub.label}
                            onClick={() => {
                              router.push(sub.href)
                              setIsSidebarOpen(false)
                            }}
                            className="flex items-center w-full p-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors text-left cursor-pointer"
                          >
                            {sub.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>
            <div
              className={`p-4 border-t border-border ${isSidebarCollapsed ? 'px-2' : ''}`}
            >
              <button
                onClick={() => {
                  router.push('/')
                  setIsSidebarOpen(false)
                }}
                className={`flex items-center justify-center w-full p-3 rounded-lg hover:bg-muted transition-colors text-left cursor-pointer gap-2`}
              >
                <ArrowLeft className="w-5 h-5" />
                {!isSidebarCollapsed && <span>Back to Main Page</span>}
              </button>
            </div>
            <div
              className={`p-4 border-t border-border ${isSidebarCollapsed ? 'px-2' : ''}`}
            >
              <button
                onClick={handleLogout}
                className={`flex items-center rounded-lg hover:bg-muted transition-colors text-left text-red-500 cursor-pointer ${
                  isSidebarCollapsed
                    ? 'p-3 justify-center w-full'
                    : 'gap-3 w-full p-3'
                }`}
              >
                <LogOut className="w-5 h-5" />
                {!isSidebarCollapsed && <span>Logout</span>}
              </button>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 z-30 bg-black/50"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
    </>
  )
}