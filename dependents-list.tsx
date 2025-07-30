"use client"

import type React from "react"

import { useState } from "react"
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Phone,
  CheckCircle,
  XCircle,
  Clock,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  UserIcon as Male,
  UserIcon as Female,
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function DependentsList() {
  const [searchName, setSearchName] = useState("")
  const [searchIC, setSearchIC] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedDependents, setSelectedDependents] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentDependent, setCurrentDependent] = useState<any>(null)

  // Sample dependent data
  const dependents = [
    {
      id: "1",
      registrationDate: "2023-05-02",
      name: "MOHAMMAD FAHMI IRSYAD BIN MOHAMAD FAIZ",
      ic: "900101012345",
      age: 35,
      memberName: "Ahmad bin Ali",
      relationship: "Bapa",
      gender: "Lelaki",
      phone: "0172337426",
      deathStatus: "Tidak",
      deathDate: null,
      status: "active",
    },
    {
      id: "2",
      registrationDate: "2023-05-02",
      name: "Siti Nurhaliza binti Abu Bakar",
      ic: "880202026789",
      age: 37,
      memberName: "Ahmad bin Ali",
      relationship: "Ibu",
      gender: "Perempuan",
      phone: "0123456789",
      deathStatus: "Tidak",
      deathDate: null,
      status: "active",
    },
    {
      id: "3",
      registrationDate: "2023-05-02",
      name: "Ali bin Ahmad",
      ic: "100303031234",
      age: 15,
      memberName: "Ahmad bin Ali",
      relationship: "Anak",
      gender: "Lelaki",
      phone: "01122334455",
      deathStatus: "Tidak",
      deathDate: null,
      status: "inactive",
    },
    {
      id: "4",
      registrationDate: "2023-05-02",
      name: "Nurul Huda binti Ahmad",
      ic: "120404045678",
      age: 13,
      memberName: "Ahmad bin Ali",
      relationship: "Anak",
      gender: "Perempuan",
      phone: "01198765432",
      deathStatus: "Tidak",
      deathDate: null,
      status: "pending",
    },
  ]

  const filteredDependents = dependents.filter((dependent) => {
    const matchesName = dependent.name.toLowerCase().includes(searchName.toLowerCase())
    const matchesIC = dependent.ic.includes(searchIC)
    const matchesStatus = statusFilter === "all" || dependent.status === statusFilter

    return matchesName && matchesIC && matchesStatus
  })

  const totalPages = Math.ceil(filteredDependents.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedDependents = filteredDependents.slice(startIndex, startIndex + itemsPerPage)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            Aktif
          </Badge>
        )
      case "inactive":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <XCircle className="w-3 h-3 mr-1" />
            Tidak Aktif
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="w-3 h-3 mr-1" />
            Menunggu
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedDependents(paginatedDependents.map((dependent) => dependent.id))
    } else {
      setSelectedDependents([])
    }
  }

  const handleSelectDependent = (dependentId: string, checked: boolean) => {
    if (checked) {
      setSelectedDependents([...selectedDependents, dependentId])
    } else {
      setSelectedDependents(selectedDependents.filter((id) => id !== dependentId))
    }
  }

  const handleEditClick = (dependent: any) => {
    setCurrentDependent(dependent)
    setIsEditDialogOpen(true)
  }

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Updating dependent:", currentDependent)
    // Here you would typically send the updated data to your backend
    setIsEditDialogOpen(false)
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    setCurrentDependent((prev: any) => ({
      ...prev,
      [id]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Senarai Tanggungan Masjid Taqwa Bbm</h1>
          <p className="text-gray-600">Senarai tanggungan yang telah mendaftar dengan masjid</p>
        </div>

        {/* Main Content Card */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Senarai Tanggungan</CardTitle>
                <CardDescription>Urus dan pantau maklumat tanggungan ahli masjid</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Tanggungan
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari Nama Tanggungan..."
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari No IC Tanggungan..."
                  value={searchIC}
                  onChange={(e) => setSearchIC(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="inactive">Tidak Aktif</SelectItem>
                  <SelectItem value="pending">Menunggu</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bulk Actions */}
            {selectedDependents.length > 0 && (
              <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-800">{selectedDependents.length} tanggungan dipilih</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Export Dipilih
                    </Button>
                    <Button variant="outline" size="sm">
                      Bulk Edit
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4">
                      <Checkbox
                        checked={
                          selectedDependents.length === paginatedDependents.length && paginatedDependents.length > 0
                        }
                        onCheckedChange={handleSelectAll}
                      />
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      <Button variant="ghost" size="sm" className="h-auto p-0 font-medium">
                        Tarikh Daftar <ArrowUpDown className="ml-1 h-4 w-4" />
                      </Button>
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      <Button variant="ghost" size="sm" className="h-auto p-0 font-medium">
                        Nama Tanggungan <ArrowUpDown className="ml-1 h-4 w-4" />
                      </Button>
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">No IC</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Umur</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Nama Ahli</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Hubungan</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Tindakan</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedDependents.map((dependent) => (
                    <tr key={dependent.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <Checkbox
                          checked={selectedDependents.includes(dependent.id)}
                          onCheckedChange={(checked) => handleSelectDependent(dependent.id, checked as boolean)}
                        />
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {new Date(dependent.registrationDate).toLocaleDateString("ms-MY")}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={`/placeholder.svg?height=40&width=40&query=${dependent.gender}`} />
                            <AvatarFallback className="bg-yellow-100 text-yellow-800">
                              {dependent.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-gray-900">{dependent.name}</div>
                            <div className="text-sm text-gray-500">
                              {dependent.gender === "Lelaki" ? (
                                <Male className="h-3 w-3 inline mr-1" />
                              ) : (
                                <Female className="h-3 w-3 inline mr-1" />
                              )}
                              {dependent.gender}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">{dependent.ic}</td>
                      <td className="py-4 px-4 text-sm text-gray-600">{dependent.age}</td>
                      <td className="py-4 px-4 text-sm text-gray-600">{dependent.memberName}</td>
                      <td className="py-4 px-4 text-sm text-gray-600">{dependent.relationship}</td>
                      <td className="py-4 px-4">{getStatusBadge(dependent.status)}</td>
                      <td className="py-4 px-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Tindakan</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleEditClick(dependent)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Maklumat
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Phone className="h-4 w-4 mr-2" />
                              Hubungi
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Padam
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Papar</span>
                <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
                <span>daripada {filteredDependents.length} rekod</span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Sebelumnya
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = i + 1
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className={currentPage === page ? "bg-yellow-500 hover:bg-yellow-600" : ""}
                      >
                        {page}
                      </Button>
                    )
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Seterusnya
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Dependent Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Kemaskini Tanggungan</DialogTitle>
            <DialogDescription>Edit maklumat tanggungan di bawah.</DialogDescription>
          </DialogHeader>
          {currentDependent && (
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nama Tanggungan</Label>
                <Input id="name" value={currentDependent.name} onChange={handleFormChange} required />
              </div>
              <div>
                <Label htmlFor="ic">No IC</Label>
                <Input id="ic" value={currentDependent.ic} onChange={handleFormChange} required />
              </div>
              <div>
                <Label htmlFor="gender">Jantina</Label>
                <Select
                  value={currentDependent.gender}
                  onValueChange={(value) => setCurrentDependent({ ...currentDependent, gender: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Jantina" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Lelaki">Lelaki</SelectItem>
                    <SelectItem value="Perempuan">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="relationship">Hubungan</Label>
                <Input id="relationship" value={currentDependent.relationship} onChange={handleFormChange} required />
              </div>
              <div>
                <Label htmlFor="phone">No Telefon</Label>
                <Input id="phone" value={currentDependent.phone} onChange={handleFormChange} />
              </div>
              <div>
                <Label htmlFor="deathStatus">Status Kematian</Label>
                <Select
                  value={currentDependent.deathStatus}
                  onValueChange={(value) => setCurrentDependent({ ...currentDependent, deathStatus: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Status Kematian" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tidak">Tidak</SelectItem>
                    <SelectItem value="Ya">Ya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {currentDependent.deathStatus === "Ya" && (
                <div>
                  <Label htmlFor="deathDate">Tarikh Kematian</Label>
                  <Input
                    id="deathDate"
                    type="date"
                    value={currentDependent.deathDate || ""}
                    onChange={handleFormChange}
                  />
                </div>
              )}
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Batal
                </Button>
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  Lulus
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
