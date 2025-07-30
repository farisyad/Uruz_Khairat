"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import {
  ArrowLeft,
  Edit,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Users,
  CreditCard,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Receipt,
  AlertCircle,
  CheckCircle2,
  Eye,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MemberDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [member, setMember] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showAddDependentModal, setShowAddDependentModal] = useState(false)
  const [showEditMemberModal, setShowEditMemberModal] = useState(false)
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false)
  const [dependentForm, setDependentForm] = useState({
    name: "",
    ic: "",
    gender: "",
    relationship: "",
    phone: ""
  })
  const [editMemberForm, setEditMemberForm] = useState({
    name: "",
    gender: "",
    phone: "",
    address: "",
    postcode: "",
    state: "",
    category: "",
    tags: "",
    ic: "",
    email: "",
    locality: "",
    city: "",
    occupation: "",
    notes: ""
  })
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  // Sample member data - in a real app, this would come from an API
  const sampleMembers = [
    {
      id: "1",
      memberNo: "2",
      name: "Ahmad bin Ali",
      ic: "900101012345",
      phone: "0123456789",
      email: "fahmiirsyad2002@gmail.com",
      location: "Masjid Aman",
      status: "active",
      joinDate: "2025-04-29",
      dependents: 2,
      lastPayment: "2024-01-01",
      address: "No. 12, Jalan Harmoni 3",
      emergencyContact: "Siti binti Ali",
      emergencyPhone: "0123456780",
      age: 35,
      gender: "Lelaki",
      occupation: "Software Developer",
      category: "Bujang",
      tag: "",
      notes: "",
      paymentHistory: [
        { date: "2024-01-01", amount: 50, status: "paid" },
        { date: "2023-12-01", amount: 50, status: "paid" },
        { date: "2023-11-01", amount: 50, status: "paid" },
      ],
      dependentsList: [
        { name: "Ali bin Ahmad", relationship: "Anak", ic: "120101012345" },
        { name: "Aminah binti Ahmad", relationship: "Anak", ic: "130101012345" },
      ],
      claimsHistory: [
        { 
          id: "1",
          date: "2024-01-15", 
          type: "Kematian", 
          amount: 5000, 
          status: "approved",
          description: "Tuntutan kematian untuk bapa",
          documents: ["Sijil Kematian", "Kad Pengenalan"]
        },
        { 
          id: "2",
          date: "2023-11-20", 
          type: "Pembedahan", 
          amount: 3000, 
          status: "pending",
          description: "Tuntutan pembedahan jantung",
          documents: ["Laporan Hospital", "Resit Bayaran"]
        },
        { 
          id: "3",
          date: "2023-08-10", 
          type: "Pendidikan", 
          amount: 1500, 
          status: "approved",
          description: "Tuntutan yuran pengajian anak",
          documents: ["Resit Yuran", "Sijil Pelajar"]
        },
      ],
    },
    {
      id: "2",
      memberNo: "3",
      name: "Siti Aminah binti Hassan",
      ic: "850505054321",
      phone: "0198765432",
      email: "siti.aminah@email.com",
      location: "Taman Sejahtera",
      status: "active",
      joinDate: "2023-02-20",
      dependents: 3,
      lastPayment: "2024-01-01",
      address: "No. 456, Jalan Sejahtera, Taman Sejahtera, 54321 Selangor",
      emergencyContact: "Hassan bin Omar",
      emergencyPhone: "0198765430",
      age: 28,
      gender: "Perempuan",
      occupation: "Teacher",
      category: "Berkahwin",
      tag: "",
      notes: "",
      paymentHistory: [
        { date: "2024-01-01", amount: 50, status: "paid" },
        { date: "2023-12-01", amount: 50, status: "paid" },
        { date: "2023-11-01", amount: 50, status: "paid" },
      ],
      dependentsList: [
        { name: "Hassan bin Omar", relationship: "Suami", ic: "800505054321" },
        { name: "Fatimah binti Omar", relationship: "Anak", ic: "120505054321" },
        { name: "Ahmad bin Omar", relationship: "Anak", ic: "130505054321" },
      ],
      claimsHistory: [
        { 
          id: "1",
          date: "2024-01-10", 
          type: "Pembedahan", 
          amount: 2500, 
          status: "approved",
          description: "Tuntutan pembedahan kecil",
          documents: ["Laporan Hospital", "Resit Bayaran"]
        },
        { 
          id: "2",
          date: "2023-12-05", 
          type: "Pendidikan", 
          amount: 2000, 
          status: "approved",
          description: "Tuntutan yuran pengajian",
          documents: ["Resit Yuran", "Sijil Pelajar"]
        },
      ],
    },
  ]

  useEffect(() => {
    // Simulate API call
    const fetchMember = () => {
      const memberId = params.id as string
      const foundMember = sampleMembers.find((m) => m.id === memberId)
      
      if (foundMember) {
        setMember(foundMember)
      } else {
        // Handle member not found
        router.push("/members")
      }
      setLoading(false)
    }

    fetchMember()
  }, [params.id, router])

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

  const getClaimStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle2 className="w-3 h-3 mr-1" />
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

  const handleAddDependent = () => {
    // Here you would typically save the dependent data
    console.log("Adding dependent:", dependentForm)
    setShowAddDependentModal(false)
    setDependentForm({
      name: "",
      ic: "",
      gender: "",
      relationship: "",
      phone: ""
    })
  }

  const handleEditMember = () => {
    // Here you would typically save the member data
    console.log("Updating member:", editMemberForm)
    setShowEditMemberModal(false)
  }

  const handleChangePassword = () => {
    // Here you would typically validate and save the new password
    console.log("Changing password:", passwordForm)
    setShowChangePasswordModal(false)
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    })
  }

  const openEditMemberModal = () => {
    setEditMemberForm({
      name: member.name,
      gender: member.gender,
      phone: member.phone,
      address: member.address,
      postcode: member.postcode || "57000",
      state: member.state || "KEDAH",
      category: member.category,
      tags: member.tag,
      ic: member.ic,
      email: member.email,
      locality: member.location,
      city: member.city || "LANGKAWI",
      occupation: member.occupation,
      notes: member.notes
    })
    setShowEditMemberModal(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded mb-4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!member) {
    return null
  }

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
            Kembali ke Senarai Ahli
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Maklumat Ahli</h1>
              <p className="text-gray-600">Butiran lengkap ahli masjid</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={openEditMemberModal}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Maklumat
              </Button>
              <Button variant="outline" onClick={() => setShowChangePasswordModal(true)}>
                <FileText className="h-4 w-4 mr-2" />
                Tukar Kata Laluan
              </Button>
              <Button>
                <Phone className="h-4 w-4 mr-2" />
                Hubungi
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={`/placeholder.svg?height=48&width=48`} />
                  <AvatarFallback className="bg-yellow-100 text-yellow-800">
                    {member.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-xl font-semibold">{member.name}</div>
                  <div className="text-sm text-gray-500">No Ahli: {member.memberNo}</div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Status</span>
                {getStatusBadge(member.status)}
              </div>
              <Separator />
              
              {/* Detailed Personal Information */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Nama</div>
                      <div className="font-medium">{member.name}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">No Ahli</div>
                      <div className="font-medium">{member.memberNo}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Tarikh Daftar</div>
                      <div className="font-medium">{new Date(member.joinDate).toLocaleDateString("ms-MY")}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">No IC</div>
                      <div className="font-medium">{member.ic}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Umur</div>
                      <div className="font-medium">{member.age || "35"} tahun</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Jantina</div>
                      <div className="font-medium">{member.gender || "Lelaki"}</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Pekerjaan</div>
                      <div className="font-medium">{member.occupation || "Software Developer"}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Kategori</div>
                      <div className="font-medium">{member.category || "Bujang"}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Alamat</div>
                      <div className="font-medium">{member.address}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Lokaliti</div>
                      <div className="font-medium">{member.location}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">No Phone</div>
                      <div className="font-medium">{member.phone}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Email</div>
                      <div className="font-medium">{member.email}</div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Tag</div>
                    <div className="font-medium">{member.tag || "-"}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Catatan</div>
                    <div className="font-medium">{member.notes || "-"}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>



          {/* Tabs Section */}
          <Tabs defaultValue="dependents" className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-14">
              <TabsTrigger value="dependents" className="flex items-center gap-3 text-base font-medium py-4">
                <Users className="h-5 w-5" />
                Tanggungan
              </TabsTrigger>
              <TabsTrigger value="payments" className="flex items-center gap-3 text-base font-medium py-4">
                <CreditCard className="h-5 w-5" />
                Bayaran
              </TabsTrigger>
              <TabsTrigger value="claims" className="flex items-center gap-3 text-base font-medium py-4">
                <Receipt className="h-5 w-5" />
                Tuntutan
              </TabsTrigger>
            </TabsList>

            {/* Dependents Tab */}
            <TabsContent value="dependents" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader className="border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <CardTitle>Maklumat Tanggungan</CardTitle>
                  </div>
                  <CardDescription>Maklumat tanggungan ahli</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Pagination Controls - Top */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>Papar</span>
                        <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                          <option value="10">10</option>
                          <option value="20">20</option>
                          <option value="50">50</option>
                        </select>
                        <span>rekod per halaman</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        Jumlah Rekod : {member.dependentsList.length}
                      </div>
                    </div>

                    {/* Dependents Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-green-700 text-white">
                            <th className="text-left py-3 px-4 font-medium">#</th>
                            <th className="text-left py-3 px-4 font-medium">Nama</th>
                            <th className="text-left py-3 px-4 font-medium">Hubungan</th>
                            <th className="text-left py-3 px-4 font-medium">No IC</th>
                            <th className="text-left py-3 px-4 font-medium">Jantina</th>
                            <th className="text-left py-3 px-4 font-medium">No Telefon</th>
                            <th className="text-left py-3 px-4 font-medium">Tarikh Daftar</th>
                            <th className="text-left py-3 px-4 font-medium">Status Mati</th>
                            <th className="text-left py-3 px-4 font-medium">
                              <div className="flex items-center justify-between">
                                <span>Tindakan</span>
                                <Button 
                                  size="sm" 
                                  className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-2 py-1"
                                  onClick={() => setShowAddDependentModal(true)}
                                >
                                  Tambah
                                </Button>
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {member.dependentsList.length === 0 ? (
                            <tr>
                              <td colSpan={9} className="text-center py-12 bg-gray-50">
                                <div className="text-gray-500">
                                  Tiada rekod tanggungan tersedia.
                                </div>
                              </td>
                            </tr>
                          ) : (
                            member.dependentsList.map((dependent: any, index: number) => (
                              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-4 text-sm text-gray-600">{index + 1}</td>
                                <td className="py-3 px-4">
                                  <div className="font-medium text-gray-900">{dependent.name}</div>
                                </td>
                                <td className="py-3 px-4 text-sm text-gray-600">{dependent.relationship}</td>
                                <td className="py-3 px-4 text-sm text-gray-600">{dependent.ic}</td>
                                <td className="py-3 px-4 text-sm text-gray-600">
                                  {dependent.relationship === "Anak" ? "Lelaki" : "Perempuan"}
                                </td>
                                <td className="py-3 px-4 text-sm text-gray-600">0123456789</td>
                                <td className="py-3 px-4 text-sm text-gray-600">02/05/2025</td>
                                <td className="py-3 px-4 text-sm text-gray-600">Ya</td>
                                <td className="py-3 px-4">
                                  <div className="flex gap-2">
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
                    {member.dependentsList.length > 0 && (
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm" disabled>
                          Sebelumnya
                        </Button>
                        <Button variant="outline" size="sm" className="bg-blue-600 text-white">
                          1
                        </Button>
                        <Button variant="outline" size="sm" disabled>
                          Seterusnya
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payments Tab */}
            <TabsContent value="payments" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader className="border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-green-600" />
                    <CardTitle>Maklumat Bayaran</CardTitle>
                  </div>
                  <CardDescription>Sejarah bayaran yuran masjid</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Payment Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-3xl font-bold text-blue-600 mb-1">
                          {member.paymentHistory.length}
                        </div>
                        <div className="text-sm text-gray-600">Jumlah Bayaran</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-3xl font-bold text-green-600 mb-1">
                          {member.paymentHistory.filter((payment: any) => payment.status === "paid").length}
                        </div>
                        <div className="text-sm text-gray-600">Dibayar</div>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <div className="text-3xl font-bold text-yellow-600 mb-1">
                          {member.paymentHistory.filter((payment: any) => payment.status === "pending").length}
                        </div>
                        <div className="text-sm text-gray-600">Menunggu</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-3xl font-bold text-purple-600 mb-1">
                          RM {member.paymentHistory.reduce((total: number, payment: any) => total + payment.amount, 0).toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">Jumlah Dibayar</div>
                      </div>
                    </div>

                    {/* Pagination Controls - Top */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>Papar</span>
                        <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                          <option value="10">10</option>
                          <option value="20">20</option>
                          <option value="50">50</option>
                        </select>
                        <span>rekod per halaman</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {member.paymentHistory.length === 0 ? "Tiada rekod tersedia" : ""}
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
                          {member.paymentHistory.length === 0 ? (
                            <tr>
                              <td colSpan={10} className="text-center py-12 bg-gray-50">
                                <div className="text-gray-500">
                                  Tiada rekod yuran tersedia.
                                </div>
                              </td>
                            </tr>
                          ) : (
                            member.paymentHistory.map((payment: any, index: number) => (
                              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-4 text-sm text-gray-600">{index + 1}</td>
                                <td className="py-3 px-4">
                                  <div className="font-medium text-gray-900">Yuran Bulanan</div>
                                </td>
                                <td className="py-3 px-4 text-sm text-gray-600">2024</td>
                                <td className="py-3 px-4 font-medium text-gray-900">
                                  RM {payment.amount.toLocaleString()}
                                </td>
                                <td className="py-3 px-4">
                                  {payment.status === "paid" ? (
                                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                      <CheckCircle className="w-3 h-3 mr-1" />
                                      Dibayar
                                    </Badge>
                                  ) : (
                                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                                      <Clock className="w-3 h-3 mr-1" />
                                      Menunggu
                                    </Badge>
                                  )}
                                </td>
                                <td className="py-3 px-4 text-sm text-gray-600">
                                  {new Date(payment.date).toLocaleDateString("ms-MY")}
                                </td>
                                <td className="py-3 px-4 text-sm text-gray-600">Tunai</td>
                                <td className="py-3 px-4 text-sm text-gray-600">RES-{String(index + 1).padStart(3, '0')}-2024</td>
                                <td className="py-3 px-4">
                                  <Button variant="outline" size="sm" className="text-xs">
                                    <FileText className="h-3 w-3 mr-1" />
                                    Lihat
                                  </Button>
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
                    {member.paymentHistory.length > 0 && (
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm" disabled>
                          Sebelumnya
                        </Button>
                        <Button variant="outline" size="sm" disabled>
                          Seterusnya
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Claims Tab */}
            <TabsContent value="claims" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader className="border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <Receipt className="h-5 w-5 text-blue-600" />
                    <CardTitle>Maklumat Tuntutan</CardTitle>
                  </div>
                  <CardDescription>Sejarah tuntutan dan maklumat bayaran</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Claims Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-3xl font-bold text-blue-600 mb-1">
                          {member.claimsHistory.length}
                        </div>
                        <div className="text-sm text-gray-600">Jumlah Tuntutan</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-3xl font-bold text-green-600 mb-1">
                          {member.claimsHistory.filter((claim: any) => claim.status === "approved").length}
                        </div>
                        <div className="text-sm text-gray-600">Diluluskan</div>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <div className="text-3xl font-bold text-yellow-600 mb-1">
                          {member.claimsHistory.filter((claim: any) => claim.status === "pending").length}
                        </div>
                        <div className="text-sm text-gray-600">Menunggu</div>
                      </div>
                    </div>

                    {/* Pagination Controls - Top */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>Papar</span>
                        <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                          <option value="10">10</option>
                          <option value="20">20</option>
                          <option value="50">50</option>
                        </select>
                        <span>rekod per halaman</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {member.claimsHistory.length === 0 ? "Tiada rekod tersedia" : ""}
                      </div>
                    </div>

                    {/* Claims Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-green-700 text-white">
                            <th className="text-left py-3 px-4 font-medium">#</th>
                            <th className="text-left py-3 px-4 font-medium">Si-Mati</th>
                            <th className="text-left py-3 px-4 font-medium">Nama Pemohon</th>
                            <th className="text-left py-3 px-4 font-medium">Tarikh Mohon</th>
                            <th className="text-left py-3 px-4 font-medium">Status Tuntutan</th>
                            <th className="text-left py-3 px-4 font-medium">Jumlah</th>
                            <th className="text-left py-3 px-4 font-medium">
                              <div className="flex items-center justify-between">
                                <span>Tindakan</span>
                                <Button 
                                  size="sm" 
                                  className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-2 py-1"
                                  onClick={() => router.push("/claims/add")}
                                >
                                  Tambah
                                </Button>
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {member.claimsHistory.length === 0 ? (
                            <tr>
                              <td colSpan={7} className="text-center py-12 bg-blue-50">
                                <div className="text-gray-500">
                                  Tiada rekod tuntutan yang berdaftar.
                                </div>
                              </td>
                            </tr>
                          ) : (
                            member.claimsHistory.map((claim: any, index: number) => (
                              <tr key={claim.id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-4 text-sm text-gray-600">{index + 1}</td>
                                <td className="py-3 px-4">
                                  <div className="font-medium text-gray-900">{claim.type}</div>
                                  <div className="text-sm text-gray-500">{claim.description}</div>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="font-medium text-gray-900">Pemohon</div>
                                  <div className="text-sm text-gray-500">Kategori</div>
                                </td>
                                <td className="py-3 px-4 text-sm text-gray-600">
                                  {new Date(claim.date).toLocaleDateString("ms-MY")}
                                </td>
                                <td className="py-3 px-4">
                                  {getClaimStatusBadge(claim.status)}
                                </td>
                                <td className="py-3 px-4 font-medium text-gray-900">
                                  RM {claim.amount.toLocaleString()}
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="text-xs">
                                      Lihat
                                    </Button>
                                    <Button variant="outline" size="sm" className="text-xs">
                                      Edit
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
                    {member.claimsHistory.length > 0 && (
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm" disabled>
                          Sebelumnya
                        </Button>
                        <Button variant="outline" size="sm" disabled>
                          Seterusnya
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

                 {/* Add Dependent Modal */}
         <Dialog open={showAddDependentModal} onOpenChange={setShowAddDependentModal}>
           <DialogContent className="sm:max-w-md">
             <DialogHeader>
               <DialogTitle>Tambah Maklumat Tanggungan</DialogTitle>
               <DialogDescription>
                 Masukkan maklumat tanggungan yang akan ditambah
               </DialogDescription>
             </DialogHeader>
             <div className="space-y-4">
               <div>
                 <Label htmlFor="name" className="text-sm font-medium">
                   Nama Tanggungan <span className="text-red-500">*</span>
                 </Label>
                 <Input
                   id="name"
                   placeholder="Nama"
                   value={dependentForm.name}
                   onChange={(e) => setDependentForm({...dependentForm, name: e.target.value})}
                   className="mt-1"
                 />
               </div>
               <div>
                 <Label htmlFor="ic" className="text-sm font-medium">
                   No IC <span className="text-red-500">*</span>
                 </Label>
                 <Input
                   id="ic"
                   placeholder="No IC"
                   value={dependentForm.ic}
                   onChange={(e) => setDependentForm({...dependentForm, ic: e.target.value})}
                   className="mt-1"
                 />
               </div>
               <div>
                 <Label htmlFor="gender" className="text-sm font-medium">
                   Jantina <span className="text-red-500">*</span>
                 </Label>
                 <Select value={dependentForm.gender} onValueChange={(value) => setDependentForm({...dependentForm, gender: value})}>
                   <SelectTrigger className="mt-1">
                     <SelectValue placeholder="Jantina" />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="Lelaki">Lelaki</SelectItem>
                     <SelectItem value="Perempuan">Perempuan</SelectItem>
                   </SelectContent>
                 </Select>
               </div>
               <div>
                 <Label htmlFor="relationship" className="text-sm font-medium">
                   Hubungan <span className="text-red-500">*</span>
                 </Label>
                 <Select value={dependentForm.gender} onValueChange={(value) => setDependentForm({...dependentForm, relationship: value})}>
                   <SelectTrigger className="mt-1">
                     <SelectValue placeholder="Hubungan" />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="Bapa">Bapa</SelectItem>
                     <SelectItem value="Ibu">Ibu</SelectItem>
                     <SelectItem value="Anak">Anak</SelectItem>
                     <SelectItem value="Suami">Suami</SelectItem>
                     <SelectItem value="Isteri">Isteri</SelectItem>
                   </SelectContent>
                 </Select>
               </div>
               <div>
                 <Label htmlFor="phone" className="text-sm font-medium">
                   No Telefon
                 </Label>
                 <Input
                   id="phone"
                   placeholder="No Telefon"
                   value={dependentForm.phone}
                   onChange={(e) => setDependentForm({...dependentForm, phone: e.target.value})}
                   className="mt-1"
                 />
               </div>
               <div className="flex justify-end gap-2 pt-4">
                 <Button
                   variant="outline"
                   onClick={() => setShowAddDependentModal(false)}
                 >
                   Batal
                 </Button>
                 <Button
                   className="bg-yellow-500 hover:bg-yellow-600"
                   onClick={handleAddDependent}
                 >
                   Tambah
                 </Button>
               </div>
             </div>
           </DialogContent>
         </Dialog>

         {/* Edit Member Modal */}
         <Dialog open={showEditMemberModal} onOpenChange={setShowEditMemberModal}>
           <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto">
             <DialogHeader>
               <DialogTitle>Kemaskini Maklumat Ahli</DialogTitle>
               <DialogDescription>
                 Kemaskini maklumat ahli yang dipilih
               </DialogDescription>
             </DialogHeader>
             <div className="space-y-6">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                 {/* Left Column */}
                 <div className="space-y-3 md:space-y-4">
                   <div>
                     <Label htmlFor="edit-name" className="text-sm font-medium">
                       Nama <span className="text-red-500">*</span>
                     </Label>
                     <Input
                       id="edit-name"
                       placeholder="Nama"
                       value={editMemberForm.name}
                       onChange={(e) => setEditMemberForm({...editMemberForm, name: e.target.value})}
                       className="mt-1"
                     />
                   </div>
                   <div>
                     <Label htmlFor="edit-gender" className="text-sm font-medium">
                       Jantina <span className="text-red-500">*</span>
                     </Label>
                     <Select value={editMemberForm.gender} onValueChange={(value) => setEditMemberForm({...editMemberForm, gender: value})}>
                       <SelectTrigger className="mt-1">
                         <SelectValue placeholder="Jantina" />
                       </SelectTrigger>
                       <SelectContent>
                         <SelectItem value="Lelaki">Lelaki</SelectItem>
                         <SelectItem value="Perempuan">Perempuan</SelectItem>
                       </SelectContent>
                     </Select>
                   </div>
                   <div>
                     <Label htmlFor="edit-phone" className="text-sm font-medium">
                       No Phone <span className="text-red-500">*</span>
                     </Label>
                     <Input
                       id="edit-phone"
                       placeholder="No Phone"
                       value={editMemberForm.phone}
                       onChange={(e) => setEditMemberForm({...editMemberForm, phone: e.target.value})}
                       className="mt-1"
                     />
                   </div>
                   <div>
                     <Label htmlFor="edit-address" className="text-sm font-medium">
                       Alamat <span className="text-red-500">*</span>
                     </Label>
                     <Input
                       id="edit-address"
                       placeholder="Alamat"
                       value={editMemberForm.address}
                       onChange={(e) => setEditMemberForm({...editMemberForm, address: e.target.value})}
                       className="mt-1"
                     />
                   </div>
                   <div>
                     <Label htmlFor="edit-postcode" className="text-sm font-medium">
                       Poskod <span className="text-red-500">*</span>
                     </Label>
                     <Input
                       id="edit-postcode"
                       placeholder="Poskod"
                       value={editMemberForm.postcode}
                       onChange={(e) => setEditMemberForm({...editMemberForm, postcode: e.target.value})}
                       className="mt-1"
                     />
                   </div>
                   <div>
                     <Label htmlFor="edit-state" className="text-sm font-medium">
                       Negeri <span className="text-red-500">*</span>
                     </Label>
                     <Select value={editMemberForm.state} onValueChange={(value) => setEditMemberForm({...editMemberForm, state: value})}>
                       <SelectTrigger className="mt-1">
                         <SelectValue placeholder="Negeri" />
                       </SelectTrigger>
                       <SelectContent>
                         <SelectItem value="KEDAH">KEDAH</SelectItem>
                         <SelectItem value="KELANTAN">KELANTAN</SelectItem>
                         <SelectItem value="MELAKA">MELAKA</SelectItem>
                         <SelectItem value="NEGERI SEMBILAN">NEGERI SEMBILAN</SelectItem>
                         <SelectItem value="PAHANG">PAHANG</SelectItem>
                         <SelectItem value="PERAK">PERAK</SelectItem>
                         <SelectItem value="PERLIS">PERLIS</SelectItem>
                         <SelectItem value="PULAU PINANG">PULAU PINANG</SelectItem>
                         <SelectItem value="SABAH">SABAH</SelectItem>
                         <SelectItem value="SARAWAK">SARAWAK</SelectItem>
                         <SelectItem value="SELANGOR">SELANGOR</SelectItem>
                         <SelectItem value="TERENGGANU">TERENGGANU</SelectItem>
                         <SelectItem value="KUALA LUMPUR">KUALA LUMPUR</SelectItem>
                         <SelectItem value="LABUAN">LABUAN</SelectItem>
                         <SelectItem value="PUTRAJAYA">PUTRAJAYA</SelectItem>
                       </SelectContent>
                     </Select>
                   </div>
                   <div>
                     <Label htmlFor="edit-category" className="text-sm font-medium">
                       Kategori <span className="text-red-500">*</span>
                     </Label>
                     <Select value={editMemberForm.category} onValueChange={(value) => setEditMemberForm({...editMemberForm, category: value})}>
                       <SelectTrigger className="mt-1">
                         <SelectValue placeholder="Kategori" />
                       </SelectTrigger>
                       <SelectContent>
                         <SelectItem value="Bujang">Bujang</SelectItem>
                         <SelectItem value="Berkahwin">Berkahwin</SelectItem>
                         <SelectItem value="Bercerai">Bercerai</SelectItem>
                       </SelectContent>
                     </Select>
                   </div>
                   <div>
                     <Label htmlFor="edit-tags" className="text-sm font-medium">
                       Tags
                     </Label>
                     <Input
                       id="edit-tags"
                       placeholder="Tag"
                       value={editMemberForm.tags}
                       onChange={(e) => setEditMemberForm({...editMemberForm, tags: e.target.value})}
                       className="mt-1"
                     />
                   </div>
                 </div>

                 {/* Right Column */}
                 <div className="space-y-3 md:space-y-4">
                   <div>
                     <Label htmlFor="edit-ic" className="text-sm font-medium">
                       No IC <span className="text-red-500">*</span>
                     </Label>
                     <Input
                       id="edit-ic"
                       placeholder="No IC"
                       value={editMemberForm.ic}
                       onChange={(e) => setEditMemberForm({...editMemberForm, ic: e.target.value})}
                       className="mt-1"
                     />
                   </div>
                   <div>
                     <Label htmlFor="edit-email" className="text-sm font-medium">
                       Email <span className="text-red-500">*</span>
                     </Label>
                     <Input
                       id="edit-email"
                       placeholder="Email"
                       value={editMemberForm.email}
                       onChange={(e) => setEditMemberForm({...editMemberForm, email: e.target.value})}
                       className="mt-1"
                     />
                   </div>
                   <div>
                     <Label htmlFor="edit-locality" className="text-sm font-medium">
                       Lokaliti <span className="text-red-500">*</span>
                     </Label>
                     <Select value={editMemberForm.locality} onValueChange={(value) => setEditMemberForm({...editMemberForm, locality: value})}>
                       <SelectTrigger className="mt-1">
                         <SelectValue placeholder="Lokaliti" />
                       </SelectTrigger>
                       <SelectContent>
                         <SelectItem value="Masjid Aman">Masjid Aman</SelectItem>
                         <SelectItem value="Masjid Al-Hidayah">Masjid Al-Hidayah</SelectItem>
                         <SelectItem value="Masjid Al-Ikhlas">Masjid Al-Ikhlas</SelectItem>
                         <SelectItem value="Masjid Al-Muttaqin">Masjid Al-Muttaqin</SelectItem>
                       </SelectContent>
                     </Select>
                   </div>
                   <div>
                     <Label htmlFor="edit-city" className="text-sm font-medium">
                       Bandar <span className="text-red-500">*</span>
                     </Label>
                     <Select value={editMemberForm.city} onValueChange={(value) => setEditMemberForm({...editMemberForm, city: value})}>
                       <SelectTrigger className="mt-1">
                         <SelectValue placeholder="Bandar" />
                       </SelectTrigger>
                       <SelectContent>
                         <SelectItem value="LANGKAWI">LANGKAWI</SelectItem>
                         <SelectItem value="ALOR SETAR">ALOR SETAR</SelectItem>
                         <SelectItem value="KUALA LUMPUR">KUALA LUMPUR</SelectItem>
                         <SelectItem value="SHAH ALAM">SHAH ALAM</SelectItem>
                         <SelectItem value="PENANG">PENANG</SelectItem>
                       </SelectContent>
                     </Select>
                   </div>
                   <div>
                     <Label htmlFor="edit-occupation" className="text-sm font-medium">
                       Pekerjaan <span className="text-red-500">*</span>
                     </Label>
                     <Input
                       id="edit-occupation"
                       placeholder="Pekerjaan"
                       value={editMemberForm.occupation}
                       onChange={(e) => setEditMemberForm({...editMemberForm, occupation: e.target.value})}
                       className="mt-1"
                     />
                   </div>
                   <div>
                     <Label htmlFor="edit-notes" className="text-sm font-medium">
                       Catatan
                     </Label>
                     <Input
                       id="edit-notes"
                       placeholder="Catatan"
                       value={editMemberForm.notes}
                       onChange={(e) => setEditMemberForm({...editMemberForm, notes: e.target.value})}
                       className="mt-1"
                     />
                   </div>
                 </div>
               </div>

               <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
                 <Button
                   variant="outline"
                   onClick={() => setShowEditMemberModal(false)}
                   className="w-full sm:w-auto"
                 >
                   Batal
                 </Button>
                 <Button
                   className="bg-yellow-500 hover:bg-yellow-600 w-full sm:w-auto"
                   onClick={handleEditMember}
                 >
                   Simpan
                 </Button>
               </div>
             </div>
           </DialogContent>
         </Dialog>

         {/* Change Password Modal */}
         <Dialog open={showChangePasswordModal} onOpenChange={setShowChangePasswordModal}>
           <DialogContent className="sm:max-w-md">
             <DialogHeader>
               <DialogTitle>Tukar Kata Laluan</DialogTitle>
               <DialogDescription>
                 Masukkan kata laluan semasa dan kata laluan baru
               </DialogDescription>
             </DialogHeader>
             <div className="space-y-4">
               <div>
                 <Label htmlFor="current-password" className="text-sm font-medium">
                   Kata Laluan Semasa <span className="text-red-500">*</span>
                 </Label>
                 <Input
                   id="current-password"
                   type="password"
                   placeholder="Kata laluan semasa"
                   value={passwordForm.currentPassword}
                   onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                   className="mt-1"
                 />
               </div>
               <div>
                 <Label htmlFor="new-password" className="text-sm font-medium">
                   Kata Laluan Baru <span className="text-red-500">*</span>
                 </Label>
                 <Input
                   id="new-password"
                   type="password"
                   placeholder="Kata laluan baru"
                   value={passwordForm.newPassword}
                   onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                   className="mt-1"
                 />
               </div>
               <div>
                 <Label htmlFor="confirm-password" className="text-sm font-medium">
                   Sahkan Kata Laluan Baru <span className="text-red-500">*</span>
                 </Label>
                 <Input
                   id="confirm-password"
                   type="password"
                   placeholder="Sahkan kata laluan baru"
                   value={passwordForm.confirmPassword}
                   onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                   className="mt-1"
                 />
               </div>
               <div className="flex justify-end gap-2 pt-4">
                 <Button
                   variant="outline"
                   onClick={() => setShowChangePasswordModal(false)}
                 >
                   Batal
                 </Button>
                 <Button
                   className="bg-yellow-500 hover:bg-yellow-600"
                   onClick={handleChangePassword}
                 >
                   Simpan
                 </Button>
               </div>
             </div>
           </DialogContent>
         </Dialog>
      </div>
    </div>
  )
} 