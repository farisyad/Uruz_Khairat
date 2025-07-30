"use client"

import { useState } from "react"
import {
  Search,
  Eye,
  Archive,
  Trash2,
  MessageSquare,
  User,
  Calendar,
  CheckCircle,
  Mail,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface FeedbackItem {
  id: string
  subject: string
  message: string
  sender: string
  date: string
  status: "new" | "read" | "archived"
}

export default function MemberFeedback() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [currentFeedback, setCurrentFeedback] = useState<FeedbackItem | null>(null)

  // Sample feedback data
  const feedbackData: FeedbackItem[] = [
    {
      id: "1",
      subject: "Cadangan Penambahbaikan Kemudahan",
      message: "Saya ingin mencadangkan penambahan tempat letak basikal di kawasan masjid untuk kemudahan ahli.",
      sender: "Ahmad bin Ali",
      date: "2024-07-20",
      status: "new",
    },
    {
      id: "2",
      subject: "Pertanyaan Mengenai Yuran",
      message: "Bolehkah saya dapatkan maklumat lanjut mengenai cara pembayaran yuran bulanan?",
      sender: "Siti Aminah",
      date: "2024-07-18",
      status: "read",
    },
    {
      id: "3",
      subject: "Maklum Balas Program Ceramah",
      message: "Ceramah semalam sangat informatif dan bermanfaat. Terima kasih kepada penceramah dan pihak masjid.",
      sender: "Muhammad Farid",
      date: "2024-07-15",
      status: "archived",
    },
    {
      id: "4",
      subject: "Isu Kebersihan Tandas",
      message: "Tandas di bahagian lelaki perlu dibersihkan dengan lebih kerap. Terdapat bau yang kurang menyenangkan.",
      sender: "Fatimah binti Abdullah",
      date: "2024-07-10",
      status: "new",
    },
  ]

  const filteredFeedback = feedbackData.filter((feedback) => {
    const matchesSearch =
      feedback.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.sender.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || feedback.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filteredFeedback.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedFeedback = filteredFeedback.slice(startIndex, startIndex + itemsPerPage)

  const getStatusBadge = (status: FeedbackItem["status"]) => {
    switch (status) {
      case "new":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Mail className="w-3 h-3 mr-1" />
            Baru
          </Badge>
        )
      case "read":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            Dibaca
          </Badge>
        )
      case "archived":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            <Archive className="w-3 h-3 mr-1" />
            Diarkib
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const handleViewClick = (feedback: FeedbackItem) => {
    setCurrentFeedback(feedback)
    setIsViewModalOpen(true)
    // In a real app, you might update the status to 'read' here
  }

  const handleMarkAsRead = (id: string) => {
    console.log(`Marking feedback ${id} as read`)
    // Update state or call API to change status
  }

  const handleArchive = (id: string) => {
    console.log(`Archiving feedback ${id}`)
    // Update state or call API to change status
  }

  const handleDelete = (id: string) => {
    console.log(`Deleting feedback ${id}`)
    // Update state or call API to delete feedback
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Maklum Balas Ahli</h1>
          <p className="text-gray-600">Urus dan pantau maklum balas yang diterima daripada ahli masjid</p>
        </div>

        {/* Main Content Card */}
        <Card>
          <CardHeader>
            <CardTitle>Senarai Maklum Balas</CardTitle>
            <CardDescription>Lihat dan urus semua maklum balas ahli</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari tajuk, mesej, atau pengirim..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="new">Baru</SelectItem>
                  <SelectItem value="read">Dibaca</SelectItem>
                  <SelectItem value="archived">Diarkib</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left py-3 px-4">#</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      <Button variant="ghost" size="sm" className="h-auto p-0 font-medium">
                        Tajuk <ArrowUpDown className="ml-1 h-4 w-4" />
                      </Button>
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Pengirim</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Tarikh</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-900">Tindakan</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedFeedback.length > 0 ? (
                    paginatedFeedback.map((feedback, index) => (
                      <tr key={feedback.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4 text-gray-900">{startIndex + index + 1}</td>
                        <td className="py-4 px-4">
                          <div className="font-medium text-gray-900">{feedback.subject}</div>
                          <div className="text-sm text-gray-500 max-w-xs truncate">{feedback.message}</div>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {feedback.sender}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(feedback.date).toLocaleDateString("ms-MY")}
                          </div>
                        </td>
                        <td className="py-4 px-4">{getStatusBadge(feedback.status)}</td>
                        <td className="py-4 px-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Tindakan</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleViewClick(feedback)}>
                                <Eye className="h-4 w-4 mr-2" />
                                Lihat Detail
                              </DropdownMenuItem>
                              {feedback.status === "new" && (
                                <DropdownMenuItem onClick={() => handleMarkAsRead(feedback.id)}>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Tandakan Dibaca
                                </DropdownMenuItem>
                              )}
                              {feedback.status !== "archived" && (
                                <DropdownMenuItem onClick={() => handleArchive(feedback.id)}>
                                  <Archive className="h-4 w-4 mr-2" />
                                  Arkibkan
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(feedback.id)}>
                                <Trash2 className="h-4 w-4 mr-2" />
                                Padam
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-12 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <MessageSquare className="h-12 w-12 text-gray-300" />
                          <div>
                            <p className="text-gray-500 font-medium">Tiada rekod maklum balas tersedia</p>
                            <p className="text-gray-400 text-sm mt-1">
                              {searchQuery || statusFilter !== "all"
                                ? "Cuba ubah kriteria carian anda"
                                : "Maklum balas daripada ahli akan muncul di sini"}
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
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
                <span>daripada {filteredFeedback.length} rekod</span>
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

      {/* View Feedback Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Maklum Balas: {currentFeedback?.subject}</DialogTitle>
            <DialogDescription>Butiran penuh maklum balas daripada ahli.</DialogDescription>
          </DialogHeader>
          {currentFeedback && (
            <div className="space-y-4 py-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Pengirim</Label>
                <p className="text-gray-900 font-semibold">{currentFeedback.sender}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Tarikh</Label>
                <p className="text-gray-900">{new Date(currentFeedback.date).toLocaleDateString("ms-MY")}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Status</Label>
                {getStatusBadge(currentFeedback.status)}
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">Mesej</Label>
                <p className="text-gray-800 leading-relaxed">{currentFeedback.message}</p>
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsViewModalOpen(false)}>
              Tutup
            </Button>
            {currentFeedback?.status === "new" && (
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  handleMarkAsRead(currentFeedback.id)
                  setIsViewModalOpen(false)
                }}
              >
                Tandakan Dibaca
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
