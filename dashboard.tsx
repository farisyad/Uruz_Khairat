"use client"

import { useState } from "react"
import {
  Bell,
  Menu,
  Home,
  Users,
  CreditCard,
  FileText,
  MessageSquare,
  Settings,
  User,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Plus,
  Users2,
  ClipboardList,
  HandHeart,
  Wallet,
  Search,
  Command,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import MemberList from "./member-list"
import Notifications from "./notifications"
import DependentsList from "./dependents-list"
import RegisterMemberForm from "./register-member-form"
import ImportDataPage from "./import-data-page"
import AccountTransactionsReport from "./account-transactions-report"
import MemberFeedback from "./member-feedback"
import PositionsManagement from "./positions-management"
import LocalityManagement from "./locality-management"
import MasjidProfileManagement from "./masjid-profile-management"
import KhairatPolicyManagement from "./khairat-policy-management" // Import the new component
import MemberReport from "./member-report"
import PaymentsManagement from "./payments-management" // Import the new component

export default function Component() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState("dashboard")

  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)

  const searchSuggestions = [
    { type: "member", title: "Ahmad bin Ali", subtitle: "Member ID: 001", icon: User },
    { type: "member", title: "Siti Aminah", subtitle: "Member ID: 002", icon: User },
    { type: "navigation", title: "Senarai Ahli", subtitle: "View all members", icon: Users },
    { type: "navigation", title: "Daftar Ahli", subtitle: "Register new member", icon: User },
    { type: "navigation", title: "Bayaran", subtitle: "Payment management", icon: CreditCard },
    { type: "navigation", title: "Laporan", subtitle: "View reports", icon: FileText },
    { type: "action", title: "Add New Member", subtitle: "Quick action", icon: Plus },
    { type: "action", title: "Record Payment", subtitle: "Quick action", icon: CreditCard },
    { type: "action", title: "Generate Report", subtitle: "Quick action", icon: FileText },
  ]

  const filteredSuggestions = searchSuggestions.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const stats = [
    {
      title: "Jumlah Ahli",
      value: "2",
      subtitle: "Ahli Aktif: 2",
      details: ["Ahli Tidak Aktif: 0", "Jumlah Tanggungan: 4"],
      color: "bg-blue-500",
      icon: Users2,
    },
    {
      title: "Jumlah Kutipan Yuran",
      value: "RM0",
      subtitle: "Ahli Bayar Yuran: 0",
      details: ["Ahli Tidak Bayar Yuran: 0", "Yuran Tertunggak: RM0"],
      color: "bg-green-500",
      icon: ClipboardList,
    },
    {
      title: "Jumlah Sumbangan",
      value: "RM0",
      subtitle: "Bilangan Tuntutan: 0",
      details: ["Tuntutan Belum Diproses: 0"],
      color: "bg-purple-500",
      icon: HandHeart,
    },
    {
      title: "Baki Semasa Akaun",
      value: "RM0.00",
      subtitle: "Baki Bank: RM0.00",
      details: ["Baki Tunai: RM0.00", "Perbelanjaan: RM0.00"],
      color: "bg-orange-500",
      icon: Wallet,
    },
  ]

  const adminTasks = [
    { task: "Pengesahan Daftar Ahli Baru", count: 0 },
    { task: "Pengesahan Bayaran", count: 0 },
    { task: "Urus Tunggakan Yuran", count: 0 },
    { task: "Urus Permohonan Tuntutan", count: 0 },
    { task: "Urus Maklum Balas Ahli", count: 0 },
  ]

  const sidebarItems = [
    { icon: Home, label: "Halaman Utama", active: currentPage === "dashboard", page: "dashboard" },
    {
      icon: User,
      label: "Ahli",
      expandable: true,
      subItems: [
        { label: "Senarai Ahli", page: "member-list" },
        { label: "Daftar Ahli", page: "add-member" },
        { label: "Sahkan Ahli", page: "approve-member" },
        { label: "Import Data Ahli", page: "import-member" },
      ],
    },
    { icon: Users, label: "Tanggungan", active: currentPage === "dependents", page: "dependents" },
    { icon: CreditCard, label: "Bayaran", active: currentPage === "payments", page: "payments" },
    { icon: FileText, label: "Tuntutan", active: currentPage === "claims", page: "claims" },
    { icon: Bell, label: "Makluman", active: currentPage === "notifications", page: "notifications" },
    { icon: Wallet, label: "Akaun", active: currentPage === "accounts", page: "accounts" },
    {
      icon: FileText,
      label: "Laporan",
      expandable: true,
      subItems: [
        { label: "Ahli", page: "reports-members" },
        { label: "Tunggakan Yuran", page: "reports-overdue-fees" },
        { label: "Pembayaran Yuran", page: "reports-fee-payments" },
        { label: "Tuntutan Ahli", page: "reports-member-claims" },
        { label: "Transaksi Akaun", page: "reports-account-transactions" },
      ],
    },
    { icon: MessageSquare, label: "Maklum Balas Ahli", active: currentPage === "feedback", page: "feedback" },
    {
      icon: Settings,
      label: "Tetapan Admin",
      expandable: true,
      subItems: [
        { label: "Profil Masjid", page: "settings-masjid-profile" },
        { label: "Polisi Khairat", page: "settings-khairat-policy" },
        { label: "Admin", page: "settings-admin" },
        { label: "Lokaliti", page: "settings-locality" },
        { label: "Yuran", page: "settings-fees" },
        { label: "Jawatan", page: "settings-positions" },
        { label: "Aktiviti Log", page: "settings-activity-log" },
        { label: "Sesi", page: "settings-sessions" },
      ],
    },
  ]

  const toggleMenuExpansion = (label: string) => {
    setExpandedMenus((prev) => (prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]))
  }

  const handleNavigation = (page: string) => {
    setCurrentPage(page)
    setSidebarOpen(false) // Close mobile sidebar when navigating
  }

  const SidebarContent = ({ showCollapse = true }) => (
    <div className="flex flex-col h-full">
      <div className={`p-6 border-b ${sidebarCollapsed ? "px-3" : ""}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            {!sidebarCollapsed && <span className="font-bold text-lg">KHAIRAT</span>}
          </div>
          {showCollapse && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="h-8 w-8 p-0"
            >
              {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </div>

      <div className="flex-1 p-4">
        <div className="mb-6">
          {!sidebarCollapsed && <h3 className="text-sm font-medium text-muted-foreground mb-3">Bahagian Utama</h3>}
          <nav className="space-y-1">
            {sidebarItems.slice(0, 5).map((item, index) => (
              <div key={index}>
                <Button
                  variant={item.active ? "default" : "ghost"}
                  className={`w-full ${sidebarCollapsed ? "justify-center px-2" : "justify-start gap-3"} ${
                    item.active ? "bg-yellow-500 text-white hover:bg-yellow-600 shadow-sm" : ""
                  }`}
                  size="sm"
                  title={sidebarCollapsed ? item.label : undefined}
                  onClick={() => {
                    if (item.page) {
                      handleNavigation(item.page)
                    } else if (item.expandable && !sidebarCollapsed) {
                      toggleMenuExpansion(item.label)
                    }
                  }}
                >
                  <item.icon className="h-4 w-4" />
                  {!sidebarCollapsed && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.expandable &&
                        (expandedMenus.includes(item.label) ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        ))}
                    </>
                  )}
                </Button>

                {/* Sub-menu items */}
                {item.expandable && !sidebarCollapsed && expandedMenus.includes(item.label) && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.subItems?.map((subItem, subIndex) => (
                      <Button
                        key={subIndex}
                        variant="ghost"
                        className={`w-full justify-start text-sm py-1.5 h-auto ${
                          currentPage === subItem.page
                            ? "bg-yellow-100 text-yellow-800"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                        size="sm"
                        onClick={() => handleNavigation(subItem.page)}
                      >
                        {subItem.label}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        <div>
          {!sidebarCollapsed && <h3 className="text-sm font-medium text-muted-foreground mb-3">Bahagian Tambahan</h3>}
          <nav className="space-y-1">
            {sidebarItems.slice(5).map((item, index) => (
              <div key={index}>
                {" "}
                {/* Added this wrapper div */}
                <Button
                  variant={item.active ? "default" : "ghost"}
                  className={`w-full ${sidebarCollapsed ? "justify-center px-2" : "justify-start gap-3"} ${
                    item.active ? "bg-yellow-500 text-white hover:bg-yellow-600 shadow-sm" : ""
                  }`}
                  size="sm"
                  title={sidebarCollapsed ? item.label : undefined}
                  onClick={() => {
                    if (item.page) {
                      handleNavigation(item.page)
                    } else if (item.expandable && !sidebarCollapsed) {
                      toggleMenuExpansion(item.label)
                    }
                  }}
                >
                  <item.icon className="h-4 w-4" />
                  {!sidebarCollapsed && (
                    <>
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.expandable &&
                        (expandedMenus.includes(item.label) ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        ))}
                    </>
                  )}
                </Button>
                {item.expandable && !sidebarCollapsed && expandedMenus.includes(item.label) && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.subItems?.map((subItem, subIndex) => (
                      <Button
                        key={subIndex}
                        variant="ghost"
                        className={`w-full justify-start text-sm py-1.5 h-auto ${
                          currentPage === subItem.page
                            ? "bg-yellow-100 text-yellow-800"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                        size="sm"
                        onClick={() => handleNavigation(subItem.page)}
                      >
                        {subItem.label}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "member-list":
        return <MemberList />
      case "add-member":
        return <RegisterMemberForm />
      case "approve-member":
        return (
          <main className={`flex-1 p-6 transition-all duration-300 ${sidebarCollapsed ? "lg:ml-0" : ""}`}>
            <div className="max-w-7xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Sahkan Ahli</h1>
              <p className="text-gray-600">Halaman untuk mengesahkan pendaftaran ahli baru.</p>
            </div>
          </main>
        )
      case "import-member":
        return <ImportDataPage />
      case "notifications":
        return <Notifications />
      case "dependents":
        return <DependentsList />
      case "payments":
        return <PaymentsManagement />
      case "reports-account-transactions":
        return <AccountTransactionsReport />
      case "feedback":
        return <MemberFeedback />
      case "settings-positions":
        return <PositionsManagement />
      case "settings-locality":
        return <LocalityManagement />
      case "settings-masjid-profile":
        return <MasjidProfileManagement />
      case "settings-khairat-policy": // New case for Khairat Policy
        return <KhairatPolicyManagement />
      case "reports-members":
        return <MemberReport />
      case "dashboard":
      default:
        return (
          <main className={`flex-1 p-6 transition-all duration-300 ${sidebarCollapsed ? "lg:ml-0" : ""}`}>
            <div className="max-w-7xl mx-auto">
              {/* Welcome Section */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Halaman Utama</h1>
                <p className="text-gray-600">Selamat datang ke sistem pengurusan khairat bagi pengguna Uruz!</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <Card key={index} className="relative overflow-hidden">
                    <div className={`absolute top-0 left-0 w-1 h-full ${stat.color}`} />
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                        <div className={`p-2 rounded-lg ${stat.color} bg-opacity-10`}>
                          <stat.icon className={`h-5 w-5 ${stat.color.replace("bg-", "text-")}`} />
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-gray-600 mb-2">{stat.subtitle}</p>
                      <div className="space-y-1">
                        {stat.details.map((detail, idx) => (
                          <p key={idx} className="text-xs text-gray-500">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Bottom Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Admin Tasks */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-1 h-6 bg-yellow-500 rounded-full" />
                      Tugasan Admin
                    </CardTitle>
                    <CardDescription>Senarai tugasan yang memerlukan perhatian</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {adminTasks.map((task, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-700">{task.task}</span>
                          <Badge variant={task.count > 0 ? "destructive" : "secondary"}>{task.count}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Announcements */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-6 bg-yellow-500 rounded-full" />
                        Pengumuman
                      </div>
                      <Button size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Tambah
                      </Button>
                    </CardTitle>
                    <CardDescription>Pengumuman terkini untuk ahli</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-gray-500">
                      <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p className="text-sm">Tiada pengumuman pada masa ini</p>
                      <p className="text-xs text-gray-400 mt-1">Klik butang "Tambah" untuk membuat pengumuman baru</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64">
                <SidebarContent showCollapse={false} />
              </SheetContent>
            </Sheet>

            <div className="hidden lg:flex items-center gap-2">
              <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">K</span>
              </div>
              <span className="font-bold text-lg">KHAIRAT</span>
            </div>
          </div>

          {/* Global Search Bar */}
          <div className="flex-1 max-w-md mx-4 relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search members, pages, or actions..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setShowSearchResults(e.target.value.length > 0)
                }}
                onFocus={() => setShowSearchResults(searchQuery.length > 0)}
                onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <kbd className="px-2 py-1 text-xs text-gray-500 bg-gray-100 rounded border">
                  <Command className="h-3 w-3 inline mr-1" />K
                </kbd>
              </div>
            </div>

            {/* Search Results Dropdown */}
            {showSearchResults && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                {filteredSuggestions.length > 0 ? (
                  <div className="py-2">
                    {filteredSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors"
                        onClick={() => {
                          if (suggestion.title === "Senarai Ahli") {
                            handleNavigation("member-list")
                          }
                          setSearchQuery("")
                          setShowSearchResults(false)
                        }}
                      >
                        <div
                          className={`p-2 rounded-lg ${
                            suggestion.type === "member"
                              ? "bg-blue-100 text-blue-600"
                              : suggestion.type === "navigation"
                                ? "bg-green-100 text-green-600"
                                : "bg-purple-100 text-purple-600"
                          }`}
                        >
                          <suggestion.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{suggestion.title}</div>
                          <div className="text-sm text-gray-500">{suggestion.subtitle}</div>
                        </div>
                        <div className="text-xs text-gray-400 capitalize">{suggestion.type}</div>
                      </button>
                    ))}
                  </div>
                ) : searchQuery.length > 0 ? (
                  <div className="py-8 text-center text-gray-500">
                    <Search className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">No results found for "{searchQuery}"</p>
                    <p className="text-xs text-gray-400 mt-1">Try searching for members, pages, or actions</p>
                  </div>
                ) : null}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>UA</AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:block">uruzadmin</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside
          className={`hidden lg:block bg-white border-r border-gray-200 min-h-[calc(100vh-65px)] transition-all duration-300 ${
            sidebarCollapsed ? "w-16" : "w-64"
          }`}
        >
          <SidebarContent />
        </aside>

        {/* Main Content */}
        {renderCurrentPage()}
      </div>
    </div>
  )
}
