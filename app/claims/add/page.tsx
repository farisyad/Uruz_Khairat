"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Save,
  Upload,
  X,
  User,
  Calendar,
  FileText,
  AlertCircle,
  CheckCircle,
  CreditCard,
  Camera,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function AddClaimPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    deceasedIs: "",
    deceasedName: "",
    deathDate: "",
    deathCertificate: null as File | null,
    applicantName: "",
    applicantCategory: "",
    applicantIc: "",
    applicantPhone: "",
    applicationDate: "",
    paymentMethod: "",
    paymentDate: "",
    contributionAmount: "",
    paymentProof: null as File | null,
    submissionImage: null as File | null,
  })

  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: File }>({})

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (field: string, file: File) => {
    setFormData(prev => ({ ...prev, [field]: file }))
    setUploadedFiles(prev => ({ ...prev, [field]: file }))
  }

  const removeFile = (field: string) => {
    setFormData(prev => ({ ...prev, [field]: null }))
    setUploadedFiles(prev => {
      const newFiles = { ...prev }
      delete newFiles[field]
      return newFiles
    })
  }

  const FileUploadField = ({ 
    label, 
    field, 
    accept = "*/*",
    required = false 
  }: { 
    label: string
    field: string
    accept?: string
    required?: boolean
  }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-400 transition-colors">
        {uploadedFiles[field] ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">{uploadedFiles[field].name}</span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeFile(field)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-2">Klik untuk memilih fail</p>
            <input
              type="file"
              accept={accept}
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleFileUpload(field, file)
              }}
              className="hidden"
              id={field}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => document.getElementById(field)?.click()}
            >
              Pilih Fail
            </Button>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.push("/claims")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Senarai Tuntutan
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Tambah Tuntutan Baru</h1>
              <p className="text-gray-600">Isi maklumat tuntutan dengan lengkap</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Save className="h-4 w-4 mr-2" />
                Simpan Draft
              </Button>
              <Button className="bg-yellow-500 hover:bg-yellow-600">
                <CheckCircle className="h-4 w-4 mr-2" />
                Hantar Tuntutan
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Deceased Information */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <CardTitle>Maklumat Si Mati</CardTitle>
                </div>
                <CardDescription>Maklumat mengenai si mati</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Si-mati ialah <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.deceasedIs} onValueChange={(value) => handleInputChange("deceasedIs", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ahli">Ahli</SelectItem>
                        <SelectItem value="tanggungan">Tanggungan</SelectItem>
                        <SelectItem value="lain">Lain-lain</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Nama Si-mati <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      placeholder="Nama Si-mati"
                      value={formData.deceasedName}
                      onChange={(e) => handleInputChange("deceasedName", e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Tarikh kematian <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="date"
                        value={formData.deathDate}
                        onChange={(e) => handleInputChange("deathDate", e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Sijil mati</Label>
                    <FileUploadField label="" field="deathCertificate" accept=".pdf,.jpg,.jpeg,.png" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Applicant Information */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  <CardTitle>Maklumat Pemohon</CardTitle>
                </div>
                <CardDescription>Maklumat mengenai pemohon tuntutan</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Nama Pemohon <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      placeholder="Nama Pemohon"
                      value={formData.applicantName}
                      onChange={(e) => handleInputChange("applicantName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Kategori Pemohon <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.applicantCategory} onValueChange={(value) => handleInputChange("applicantCategory", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="suami">Suami</SelectItem>
                        <SelectItem value="isteri">Isteri</SelectItem>
                        <SelectItem value="anak">Anak</SelectItem>
                        <SelectItem value="bapa">Bapa</SelectItem>
                        <SelectItem value="ibu">Ibu</SelectItem>
                        <SelectItem value="lain">Lain-lain</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      No IC Pemohon <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      placeholder="No IC Pemohon"
                      value={formData.applicantIc}
                      onChange={(e) => handleInputChange("applicantIc", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      No Telefon Pemohon <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      placeholder="No Telefon Pemohon"
                      value={formData.applicantPhone}
                      onChange={(e) => handleInputChange("applicantPhone", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Tarikh Mohon <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="date"
                      value={formData.applicationDate}
                      onChange={(e) => handleInputChange("applicationDate", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Office Information */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-green-600" />
                  <CardTitle>Pejabat</CardTitle>
                </div>
                <CardDescription>Maklumat pembayaran dan dokumen</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Cara Bayaran</Label>
                    <Select value={formData.paymentMethod} onValueChange={(value) => handleInputChange("paymentMethod", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih cara bayaran" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tunai">Tunai</SelectItem>
                        <SelectItem value="bank">Bank Transfer</SelectItem>
                        <SelectItem value="cek">Cek</SelectItem>
                        <SelectItem value="lain">Lain-lain</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Tarikh Bayar</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="date"
                        value={formData.paymentDate}
                        onChange={(e) => handleInputChange("paymentDate", e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Jumlah Sumbangan</Label>
                  <Input
                    placeholder="Jumlah Sumbangan"
                    value={formData.contributionAmount}
                    onChange={(e) => handleInputChange("contributionAmount", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FileUploadField label="Bukti Bayaran" field="paymentProof" accept=".pdf,.jpg,.jpeg,.png" />
                  <FileUploadField label="Gambar Serahan" field="submissionImage" accept=".jpg,.jpeg,.png" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Indicator */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Kemajuan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-medium">Maklumat Si Mati</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-medium">Maklumat Pemohon</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                    <span className="text-sm font-medium">Pejabat</span>
                  </div>
                </div>
                <Separator />
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">67%</div>
                  <div className="text-sm text-gray-600">Lengkap</div>
                </div>
              </CardContent>
            </Card>

            {/* Requirements Checklist */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Senarai Keperluan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Sijil Kematian</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Kad Pengenalan Si Mati</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Kad Pengenalan Pemohon</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
                  <span className="text-sm text-gray-500">Bukti Bayaran</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
                  <span className="text-sm text-gray-500">Gambar Serahan</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Tindakan Pantas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Save className="h-4 w-4 mr-2" />
                  Simpan Draft
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Muat Turun Borang
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Camera className="h-4 w-4 mr-2" />
                  Ambil Gambar
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 