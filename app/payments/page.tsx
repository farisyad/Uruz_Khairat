"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Calendar,
  CreditCard,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PaymentsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [recordsPerPage, setRecordsPerPage] = useState("10")

  // Sample payments data
  const payments = [
    {
      id: "1",
      feeType: "Yuran Bulanan",
      year: "2024",
      amount: 50,
      status: "paid",
      paymentDate: "2024-01-15",
      paymentMethod: "Tunai",
      receipt: "RES-001-2024",
      proof: "Bukti-001.pdf",
    },
    {
      id: "2",
      feeType: "Yuran Tahunan",
      year: "2024",
      amount: 600,
      status: "pending",
      paymentDate: null,
      paymentMethod: null,
      receipt: null,
      proof: null,
    },
    {
      id: "3",
      feeType: "Yuran Khas",
      year: "2024",
      amount: 100,
      status: "paid",
      paymentDate: "2024-01-10",
      paymentMethod: "Bank Transfer",
      receipt: "RES-002-2024",
      proof: "Bukti-002.pdf",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            Dibayar
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="w-3 h-3 mr-1" />
            Menunggu
          </Badge>
        )
      case "overdue":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <XCircle className="w-3 h-3 mr-1" />
            Lewat
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch = payment.feeType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         payment.receipt?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter
    const matchesType = typeFilter === "all" || payment.feeType === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.push("/members")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Kemaskini Yuran Masjid</h1>
              <div className="w-1 h-1 bg-yellow-500 rounded-full"></div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Yuran
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="flex space-x-8 border-b border-gray-200">
            <button className="text-gray-500 hover:text-gray-700 pb-2">Peribadi</button>
            <button className="text-gray-500 hover:text-gray-700 pb-2">Tanggungan</button>
            <button className="text-yellow-600 border-b-2 border-yellow-500 pb-2">Bayaran</button>
            <button className="text-gray-500 hover:text-gray-700 pb-2">Tuntutan</button>
          </div>
        </div>

        {/* Main Content */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            {/* Pagination Controls - Top */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Papar</span>
                <Select value={recordsPerPage} onValueChange={setRecordsPerPage}>
                  <SelectTrigger className="w-20 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
                <span>rekod per halaman</span>
              </div>
              <div className="text-sm text-gray-500">
                {filteredPayments.length === 0 ? "Tiada rekod tersedia" : ""}
              </div>
            </div>

            {/* Payments Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-green-700 text-white">
                    <th className="text-left py-3 px-4 font-medium">#</th>
                    <th className="text-left py-3 px-4 font-medium">Jenis Yuran</th>
                    <th className="text-left py-3 px-4 font-medium">Tahun</th>
                    <th className="text-left py-3 px-4 font-medium">Jumlah</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                    <th className="text-left py-3 px-4 font-medium">Tarikh Bayaran</th>
                    <th className="text-left py-3 px-4 font-medium">Cara Bayaran</th>
                    <th className="text-left py-3 px-4 font-medium">Resit Bayaran</th>
                    <th className="text-left py-3 px-4 font-medium">Bukti Bayaran</th>
                    <th className="text-left py-3 px-4 font-medium">Tindakan</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="text-center py-12 bg-gray-50">
                        <div className="text-gray-500">
                          Tiada rekod yuran tersedia.
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredPayments.map((payment, index) => (
                      <tr key={payment.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-gray-600">{index + 1}</td>
                        <td className="py-3 px-4">
                          <div className="font-medium text-gray-900">{payment.feeType}</div>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{payment.year}</td>
                        <td className="py-3 px-4 font-medium text-gray-900">
                          RM {payment.amount.toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          {getStatusBadge(payment.status)}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {payment.paymentDate 
                            ? new Date(payment.paymentDate).toLocaleDateString("ms-MY")
                            : "-"
                          }
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {payment.paymentMethod || "-"}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {payment.receipt || "-"}
                        </td>
                        <td className="py-3 px-4">
                          {payment.proof ? (
                            <Button variant="outline" size="sm" className="text-xs">
                              <FileText className="h-3 w-3 mr-1" />
                              Lihat
                            </Button>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="text-xs">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-xs">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-xs">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls - Bottom */}
            {filteredPayments.length > 0 && (
              <div className="flex items-center justify-end gap-2 mt-4">
                <Button variant="outline" size="sm" disabled>
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Sebelumnya
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Seterusnya
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 