"use client"

import { Calendar } from "@/components/ui/calendar"
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type React from "react"
import { useState } from "react"
import {
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Receipt,
  CalendarDays,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"

interface Payment {
  id: string
  name: string
  ic: string
  feeType: string
  amount: number
  status: "paid" | "pending" | "failed"
  paymentDate: string
  receiptUrl: string | null
  notes?: string
}

export default function PaymentsManagement() {
  const [searchName, setSearchName] = useState("")
  const [searchIC, setSearchIC] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentPayment, setCurrentPayment] = useState<Payment | null>(null)

  // Sample payment data
  const payments: Payment[] = [
    {
      id: "1",
      name: "Ahmad bin Ali",
      ic: "900101012345",
      feeType: "Yuran Bulanan",
      amount: 50.0,
      status: "paid",
      paymentDate: "2024-07-01",
      receiptUrl: "/placeholder.pdf?query=payment-receipt-ahmad-ali",
    },
    {
      id: "2",
      name: "Siti Aminah",
      ic: "850505054321",
      feeType: "Yuran Tahunan",
      amount: 120.0,
      status: "pending",
      paymentDate: "2024-06-25",
      receiptUrl: null,
    },
    {
      id: "3",
      name: "Muhammad Farid",
      ic: "920303036789",
      feeType: "Sumbangan",
      amount: 100.0,
      status: "paid",
      paymentDate: "2024-07-05",
      receiptUrl: "/placeholder.pdf?query=payment-receipt-muhammad-farid",
    },
    {
      id: "4",
      name: "Fatimah binti Abdullah",
      ic: "880808087654",
      feeType: "Yuran Bulanan",
      amount: 50.0,
      status: "failed",
      paymentDate: "2024-06-30",
      receiptUrl: null,
    },
    {
      id: "5",
      name: "Nurul Izzah",
      ic: "950606061122",
      feeType: "Yuran Bulanan",
      amount: 50.0,
      status: "paid",
      paymentDate: "2024-07-02",
      receiptUrl: "/placeholder.pdf?query=payment-receipt-nurul-izzah",
    },
  ]

  const filteredPayments = payments.filter((payment) => {
    const matchesName = payment.name.toLowerCase().includes(searchName.toLowerCase())
    const matchesIC = payment.ic.includes(searchIC)
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter

    return matchesName && matchesIC && matchesStatus
  })

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedPayments = filteredPayments.slice(startIndex, startIndex + itemsPerPage)

  const getStatusBadge = (status: Payment["status"]) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            Berjaya
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="w-3 h-3 mr-1" />
            Menunggu
          </Badge>
        )
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <XCircle className="w-3 h-3 mr-1" />
            Gagal
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const handleAddPayment = () => {
    setCurrentPayment(null)
    setIsDialogOpen(true)
  }

  const handleEditPayment = (payment: Payment) => {
    setCurrentPayment(payment)
    setIsDialogOpen(true)
  }

  const handleDeletePayment = (id: string) => {
    if (window.confirm("Adakah anda pasti ingin memadam rekod bayaran ini?")) {
      console.log(`Deleting payment with ID: ${id}`)
      // In a real app, you would update state or call API to delete
    }
  }

  const handleDialogSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentPayment) {
      console.log("Updating payment:", currentPayment)
      // Update existing payment via API
    } else {
      console.log("Adding new payment:", currentPayment)
      // Add new payment via API
    }
    setIsDialogOpen(false)
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    setCurrentPayment((prev) => ({
      ...prev!,
      [id]: value,
    }))
  }

  const handleDateChange = (date: Date | undefined) => {
    setCurrentPayment((prev) => ({
      ...prev!,
      paymentDate: date ? format(date, "yyyy-MM-dd") : "",
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Yuran Masjid Taqwa Bbm</h1>
          <p className="text-gray-600">Kemaskini yuran yang dinaungi oleh masjid anda.</p>
        </div>

        {/* Main Content Card */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Kemaskini Yuran Masjid</CardTitle>
                <CardDescription>Urus rekod pembayaran yuran ahli.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Cari Nama Ahli..."
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Cari No IC..."
                  value={searchIC}
                  onChange={(e) => setSearchIC(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Status Bayaran" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="paid">Berjaya</SelectItem>
                  <SelectItem value="pending">Menunggu</SelectItem>
                  <SelectItem value="failed">Gagal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <Table>
                <TableHeader className="bg-gray-100">
                  <TableRow>
                    <TableHead className="w-[50px] py-3 px-4">#</TableHead>
                    <TableHead className="py-3 px-4 font-medium text-gray-900">
                      <Button variant="ghost" size="sm" className="h-auto p-0 font-medium">
                        Nama <ArrowUpDown className="ml-1 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead className="py-3 px-4 font-medium text-gray-900">No IC</TableHead>
                    <TableHead className="py-3 px-4 font-medium text-gray-900">Jenis Yuran</TableHead>
                    <TableHead className="py-3 px-4 font-medium text-gray-900 text-right">Jumlah (RM)</TableHead>
                    <TableHead className="py-3 px-4 font-medium text-gray-900">Tarikh Bayaran</TableHead>
                    <TableHead className="py-3 px-4 font-medium text-gray-900">Status</TableHead>
                    <TableHead className="text-right py-3 px-4 font-medium text-gray-900">Tindakan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedPayments.length > 0 ? (
                    paginatedPayments.map((payment, index) => (
                      <TableRow key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <TableCell className="py-4 px-4 text-gray-900">{startIndex + index + 1}</TableCell>
                        <TableCell className="py-4 px-4 font-medium text-gray-900">{payment.name}</TableCell>
                        <TableCell className="py-4 px-4 text-gray-700">{payment.ic}</TableCell>
                        <TableCell className="py-4 px-4 text-gray-700">{payment.feeType}</TableCell>
                        <TableCell className="py-4 px-4 text-right font-semibold text-green-600">
                          RM{payment.amount.toFixed(2)}
                        </TableCell>
                        <TableCell className="py-4 px-4 text-gray-700">
                          {new Date(payment.paymentDate).toLocaleDateString("ms-MY")}
                        </TableCell>
                        <TableCell className="py-4 px-4">{getStatusBadge(payment.status)}</TableCell>
                        <TableCell className="py-4 px-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Tindakan</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              {payment.receiptUrl && (
                                <DropdownMenuItem asChild>
                                  <a href={payment.receiptUrl} target="_blank" rel="noopener noreferrer">
                                    <Receipt className="h-4 w-4 mr-2" />
                                    Lihat Resit
                                  </a>
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem onClick={() => handleEditPayment(payment)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Maklumat
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleDeletePayment(payment.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Padam
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="py-12 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <Receipt className="h-12 w-12 text-gray-300" />
                          <div>
                            <p className="text-gray-500 font-medium">Tiada rekod bayaran tersedia</p>
                            <p className="text-gray-400 text-sm mt-1">
                              {searchName || searchIC || statusFilter !== "all"
                                ? "Cuba ubah kriteria carian atau penapis anda"
                                : "Klik butang 'Tambah Bayaran' untuk merekod bayaran pertama"}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
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
                <span>daripada {filteredPayments.length} rekod</span>
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

      {/* Add/Edit Payment Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{currentPayment ? "Edit Bayaran" : "Tambah Bayaran Baru"}</DialogTitle>
            <DialogDescription>
              {currentPayment ? "Kemaskini maklumat bayaran di bawah." : "Isi maklumat bayaran baru di sini."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleDialogSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Nama Ahli</Label>
              <Input
                id="name"
                value={currentPayment?.name || ""}
                onChange={handleFormChange}
                placeholder="Nama Penuh Ahli"
                required
              />
            </div>
            <div>
              <Label htmlFor="ic">No IC</Label>
              <Input
                id="ic"
                value={currentPayment?.ic || ""}
                onChange={handleFormChange}
                placeholder="No Kad Pengenalan"
                required
              />
            </div>
            <div>
              <Label htmlFor="feeType">Jenis Yuran</Label>
              <Input
                id="feeType"
                value={currentPayment?.feeType || ""}
                onChange={handleFormChange}
                placeholder="Contoh: Yuran Bulanan, Sumbangan"
                required
              />
            </div>
            <div>
              <Label htmlFor="amount">Jumlah (RM)</Label>
              <Input
                id="amount"
                type="number"
                value={currentPayment?.amount || ""}
                onChange={handleFormChange}
                placeholder="Jumlah Bayaran"
                required
                step="0.01"
              />
            </div>
            <div>
              <Label htmlFor="paymentDate">Tarikh Bayaran</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !currentPayment?.paymentDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarDays className="mr-2 h-4 w-4" />
                    {currentPayment?.paymentDate ? format(new Date(currentPayment.paymentDate), "PPP") : "Pilih Tarikh"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={currentPayment?.paymentDate ? new Date(currentPayment.paymentDate) : undefined}
                    onSelect={handleDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label htmlFor="status">Status Bayaran</Label>
              <Select
                value={currentPayment?.status || ""}
                onValueChange={(value) => setCurrentPayment({ ...currentPayment!, status: value as Payment["status"] })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paid">Berjaya</SelectItem>
                  <SelectItem value="pending">Menunggu</SelectItem>
                  <SelectItem value="failed">Gagal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="notes">Catatan (Pilihan)</Label>
              <Textarea
                id="notes"
                value={currentPayment?.notes || ""}
                onChange={handleFormChange}
                placeholder="Catatan tambahan mengenai bayaran..."
                rows={3}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Batal
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                {currentPayment ? "Kemaskini" : "Tambah"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
