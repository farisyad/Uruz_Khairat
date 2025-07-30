"use client"

import type React from "react"

import { useState } from "react"
import { Bell, Plus, Search, Edit, Trash2, Eye, Users, UserCheck, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Notifications() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  // Form states
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  })

  // Sample notification data
  const notifications = [
    {
      id: "1",
      title: "test",
      content: "Lihat Lebih Lanjut",
      editor: "Admin URUZ",
      category: "Semua Ahli",
      createdDate: "2024-01-15",
    },
    {
      id: "2",
      title: "Pengumuman Solat Jumaat",
      content: "Solat Jumaat akan bermula pada pukul 12:30 PM. Semua ahli dijemput hadir.",
      editor: "Admin URUZ",
      category: "Semua Ahli",
      createdDate: "2024-01-14",
    },
    {
      id: "3",
      title: "Reminder Bayaran Yuran",
      content: "Sila jelaskan bayaran yuran bulanan sebelum 31 Januari 2024.",
      editor: "Admin URUZ",
      category: "Ahli Tunggakan",
      createdDate: "2024-01-13",
    },
  ]

  const categories = [
    { value: "semua-ahli", label: "Semua Ahli", icon: Users },
    { value: "ahli-tunggakan", label: "Ahli Tunggakan", icon: AlertTriangle },
    { value: "ahli-aktif", label: "Ahli Aktif", icon: UserCheck },
  ]

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.content.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory =
      categoryFilter === "all" || notification.category.toLowerCase().replace(" ", "-") === categoryFilter

    return matchesSearch && matchesCategory
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would normally submit to your backend
    console.log("Submitting:", formData)

    // Show success message
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 3000)

    // Reset form and close dialog
    setFormData({ title: "", content: "", category: "" })
    setIsAddDialogOpen(false)
  }

  const getCategoryIcon = (categoryLabel: string) => {
    const category = categories.find((cat) => cat.label === categoryLabel)
    return category ? category.icon : Users
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Success Message */}
        {showSuccessMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-medium">Feedback submitted successfully!</p>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 bg-yellow-500 rounded-full" />
            <h1 className="text-3xl font-bold text-gray-900">Makluman Masjid</h1>
          </div>
          <p className="text-gray-600">Urus dan hantar makluman kepada ahli masjid</p>
        </div>

        {/* Main Content Card */}
        <Card className="shadow-sm">
          <CardHeader className="border-b border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-xl">Senarai Makluman</CardTitle>
                <CardDescription>Urus semua makluman dan pengumuman masjid</CardDescription>
              </div>

              {/* Add Notification Dialog */}
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Tambah Makluman</DialogTitle>
                    <DialogDescription>Buat makluman baru untuk ahli masjid</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="title">Tajuk</Label>
                      <Input
                        id="title"
                        placeholder="Tajuk"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="content">Isi</Label>
                      <Textarea
                        id="content"
                        placeholder="Isi kandungan makluman..."
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        rows={4}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Kategori Penerima</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Kategori Penerima" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              <div className="flex items-center gap-2">
                                <category.icon className="h-4 w-4" />
                                {category.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-end gap-2 pt-4">
                      <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                        Batal
                      </Button>
                      <Button type="submit" className="bg-green-600 hover:bg-green-700">
                        Simpan
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Label htmlFor="search" className="text-sm font-medium text-gray-700 mb-2 block">
                  Tajuk
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Tajuk"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex-1">
                <Label htmlFor="category-filter" className="text-sm font-medium text-gray-700 mb-2 block">
                  Kategori Penerima
                </Label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Kategori Penerima" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Kategori</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        <div className="flex items-center gap-2">
                          <category.icon className="h-4 w-4" />
                          {category.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Table */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-600 text-white">
                    <tr>
                      <th className="text-left py-4 px-6 font-medium">#</th>
                      <th className="text-left py-4 px-6 font-medium">Tajuk</th>
                      <th className="text-left py-4 px-6 font-medium">Isi</th>
                      <th className="text-left py-4 px-6 font-medium">Editor</th>
                      <th className="text-left py-4 px-6 font-medium">Kategori Penerima</th>
                      <th className="text-right py-4 px-6 font-medium">
                        <Button
                          size="sm"
                          className="bg-yellow-500 hover:bg-yellow-600"
                          onClick={() => setIsAddDialogOpen(true)}
                        >
                          Tambah
                        </Button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredNotifications.length > 0 ? (
                      filteredNotifications.map((notification, index) => {
                        const CategoryIcon = getCategoryIcon(notification.category)
                        return (
                          <tr key={notification.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4 px-6 text-gray-900 font-medium">{index + 1}</td>
                            <td className="py-4 px-6">
                              <div className="font-medium text-gray-900">{notification.title}</div>
                              <div className="text-sm text-gray-500">
                                {new Date(notification.createdDate).toLocaleDateString("ms-MY")}
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="max-w-xs">
                                {notification.content.length > 50 ? (
                                  <div>
                                    <p className="text-gray-700 text-sm">{notification.content.substring(0, 50)}...</p>
                                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-1">
                                      Lihat Lebih Lanjut
                                    </button>
                                  </div>
                                ) : (
                                  <p className="text-gray-700 text-sm">{notification.content}</p>
                                )}
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="text-gray-900 font-medium">{notification.editor}</div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-2">
                                <CategoryIcon className="h-4 w-4 text-gray-500" />
                                <span className="text-gray-700">{notification.category}</span>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <div className="flex flex-col gap-0.5">
                                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                    </div>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="h-4 w-4 mr-2" />
                                    Lihat
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Padam
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        )
                      })
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-12 text-center">
                          <div className="flex flex-col items-center gap-3">
                            <Bell className="h-12 w-12 text-gray-300" />
                            <div>
                              <p className="text-gray-500 font-medium">Tiada rekod makluman tersedia</p>
                              <p className="text-gray-400 text-sm mt-1">
                                {searchQuery || categoryFilter !== "all"
                                  ? "Cuba ubah kriteria carian anda"
                                  : "Klik butang 'Tambah' untuk membuat makluman pertama"}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table Footer */}
            {filteredNotifications.length > 0 && (
              <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                <p>
                  Menunjukkan {filteredNotifications.length} daripada {notifications.length} rekod
                </p>
                <div className="flex items-center gap-2">
                  <span>Rekod per halaman: 10</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
