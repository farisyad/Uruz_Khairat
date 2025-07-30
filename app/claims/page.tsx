"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  Download,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Receipt,
  CheckCircle,
  XCircle,
  Clock,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  FileText,
  User,
  AlertCircle,
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
import { Input } from "@/components/ui/input"

export default function ClaimsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedClaims, setSelectedClaims] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Sample claims data
  const claims = [
    {
      id: "1",
      deceasedName: "Ahmad bin Omar",
      applicantName: "Siti binti Ahmad",
      applicantCategory: "Anak",
      applicationDate: "2024-01-15",
      claimType: "Kematian",
      amount: 5000,
      status: "approved",
      documents: ["Sijil Kematian", "Kad Pengenalan"],
      memberNo: "2",
    },
    {
      id: "2",
      deceasedName: "Hassan bin Ali",
      applicantName: "Fatimah binti Hassan",
      applicantCategory: "Isteri",
      applicationDate: "2024-01-10",
      claimType: "Kematian",
      amount: 5000,
      status: "pending",
      documents: ["Sijil Kematian", "Kad Pengenalan"],
      memberNo: "3",
    },
    {
      id: "3",
      deceasedName: "Muhammad bin Omar",
      applicantName: "Aminah binti Muhammad",
      applicantCategory: "Anak",
      applicationDate: "2024-01-05",
      claimType: "Pembedahan",
      amount: 3000,
      status: "approved",
      documents: ["Laporan Hospital", "Resit Bayaran"],
      memberNo: "4",
    },
    {
      id: "4",
      deceasedName: "Omar bin Abdullah",
      applicantName: "Zainab binti Omar",
      applicantCategory: "Isteri",
      applicationDate: "2023-12-20",
      claimType: "Pendidikan",
      amount: 1500,
      status: "rejected",
      documents: ["Resit Yuran", "Sijil Pelajar"],
      memberNo: "5",
    },
  ]

  const filteredClaims = claims.filter((claim) => {
    const matchesSearch =
      claim.deceasedName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.memberNo.includes(searchQuery)

    const matchesStatus = statusFilter === "all" || claim.status === statusFilter
    const matchesType = typeFilter === "all" || claim.claimType === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const totalPages = Math.ceil(filteredClaims.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedClaims = filteredClaims.slice(startIndex, startIndex + itemsPerPage)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            Diluluskan
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="w-3 h-3 mr-1" />
            Menunggu
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <XCircle className="w-3 h-3 mr-1" />
            Ditolak
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getClaimTypeIcon = (type: string) => {
    switch (type) {
      case "Kematian":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      case "Pembedahan":
        return <FileText className="h-4 w-4 text-blue-600" />
      case "Pendidikan":
        return <User className="h-4 w-4 text-green-600" />
      default:
        return <Receipt className="h-4 w-4 text-gray-600" />
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedClaims(paginatedClaims.map((claim) => claim.id))
    } else {
      setSelectedClaims([])
    }
  }

  const handleSelectClaim = (claimId: string, checked: boolean) => {
    if (checked) {
      setSelectedClaims([...selectedClaims, claimId])
    } else {
      setSelectedClaims(selectedClaims.filter((id) => id !== claimId))
    }
  }

  const stats = [
    { 
      label: "Jumlah Tuntutan", 
      value: claims.length, 
      icon: Receipt, 
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      label: "Diluluskan",
      value: claims.filter((c) => c.status === "approved").length,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      label: "Menunggu",
      value: claims.filter((c) => c.status === "pending").length,
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    },
    {
      label: "Ditolak",
      value: claims.filter((c) => c.status === "rejected").length,
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Maklumat Tuntutan</h1>
          <p className="text-gray-600">Urus dan pantau tuntutan ahli masjid</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Card */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-xl">Senarai Tuntutan</CardTitle>
                <CardDescription>Urus dan pantau maklumat tuntutan</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Tuntutan
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Cari nama si-mati, pemohon, atau No Ahli..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="approved">Diluluskan</SelectItem>
                  <SelectItem value="pending">Menunggu</SelectItem>
                  <SelectItem value="rejected">Ditolak</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Jenis Tuntutan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Jenis</SelectItem>
                  <SelectItem value="Kematian">Kematian</SelectItem>
                  <SelectItem value="Pembedahan">Pembedahan</SelectItem>
                  <SelectItem value="Pendidikan">Pendidikan</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
                <Search className="h-4 w-4 mr-2" />
                CARI
              </Button>
            </div>

            {/* Bulk Actions */}
            {selectedClaims.length > 0 && (
              <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-800">{selectedClaims.length} tuntutan dipilih</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Export Dipilih
                    </Button>
                    <Button variant="outline" size="sm">
                      Bulk Approve
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-4 px-4">
                      <Checkbox
                        checked={selectedClaims.length === paginatedClaims.length && paginatedClaims.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </th>
                    <th className="text-left py-4 px-4 font-medium text-gray-900">
                      <Button variant="ghost" size="sm" className="h-auto p-0 font-medium">
                        Si-Mati <ArrowUpDown className="ml-1 h-4 w-4" />
                      </Button>
                    </th>
                    <th className="text-left py-4 px-4 font-medium text-gray-900">Nama Pemohon</th>
                    <th className="text-left py-4 px-4 font-medium text-gray-900">Tarikh Mohon</th>
                    <th className="text-left py-4 px-4 font-medium text-gray-900">Jenis Tuntutan</th>
                    <th className="text-left py-4 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-4 px-4 font-medium text-gray-900">Jumlah</th>
                    <th className="text-left py-4 px-4 font-medium text-gray-900">Tindakan</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedClaims.map((claim) => (
                    <tr key={claim.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <Checkbox
                          checked={selectedClaims.includes(claim.id)}
                          onCheckedChange={(checked) => handleSelectClaim(claim.id, checked as boolean)}
                        />
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                            <AvatarFallback className="bg-gray-100 text-gray-800">
                              {claim.deceasedName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-gray-900">{claim.deceasedName}</div>
                            <div className="text-sm text-gray-500">No Ahli: {claim.memberNo}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium text-gray-900">{claim.applicantName}</div>
                          <div className="text-sm text-gray-500">{claim.applicantCategory}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Calendar className="h-3 w-3" />
                          {new Date(claim.applicationDate).toLocaleDateString("ms-MY")}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          {getClaimTypeIcon(claim.claimType)}
                          <span className="font-medium">{claim.claimType}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">{getStatusBadge(claim.status)}</td>
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-900">
                          RM {claim.amount.toLocaleString()}
                        </div>
                      </td>
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
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              Lihat Detail
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Tuntutan
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="h-4 w-4 mr-2" />
                              Lihat Dokumen
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

            {/* Empty State */}
            {paginatedClaims.length === 0 && (
              <div className="text-center py-12">
                <Receipt className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Tiada rekod tuntutan</h3>
                <p className="text-gray-500 mb-4">Tiada tuntutan yang berdaftar pada masa ini.</p>
                <Button className="bg-yellow-500 hover:bg-yellow-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Tuntutan Pertama
                </Button>
              </div>
            )}

            {/* Pagination */}
            {paginatedClaims.length > 0 && (
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
                  <span>daripada {filteredClaims.length} rekod</span>
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
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 