"use client"

import type React from "react"

import { useState } from "react"
import {
  UploadCloud,
  Download,
  Search,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function ImportDataPage() {
  const [activeTab, setActiveTab] = useState("members")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isAktifChecked, setIsAktifChecked] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Sample data for preview (replace with actual parsed CSV data)
  const sampleMembers = [
    { id: "1", name: "Ahmad bin Ali", ic: "900101012345", locality: "Masjid Aman", status: "new" },
    { id: "2", name: "Siti Aminah", ic: "850505054321", locality: "Taman Sejahtera", status: "new" },
    { id: "3", name: "Muhammad Farid", ic: "920303036789", locality: "Kampung Baru", status: "new" },
  ]

  const sampleDependents = [
    { id: "1", name: "Ali bin Ahmad", ic: "100303031234", relationship: "Anak", status: "new" },
    { id: "2", name: "Nurul Huda", ic: "120404045678", relationship: "Anak", status: "new" },
  ]

  const dataToDisplay = activeTab === "members" ? sampleMembers : sampleDependents

  const filteredData = dataToDisplay.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ic.includes(searchQuery) ||
      (activeTab === "members" && item.locality?.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (activeTab === "dependents" && item.relationship?.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0])
      // In a real application, you would parse the CSV here and update the data state
      console.log("Selected file:", event.target.files[0].name)
    }
  }

  const handleImport = () => {
    if (selectedFile) {
      console.log(`Importing ${selectedFile.name} for ${activeTab}. Aktif status: ${isAktifChecked}`)
      // Simulate import success
      alert(`File ${selectedFile.name} imported successfully for ${activeTab}!`)
      setSelectedFile(null)
      setIsAktifChecked(false)
      setSearchQuery("")
      setCurrentPage(1)
    } else {
      alert("Sila pilih fail untuk diimport.")
    }
  }

  const handleConfirm = () => {
    console.log(`Confirming imported data for ${activeTab}.`)
    alert(`Data for ${activeTab} confirmed!`)
    // Clear preview data after confirmation
    // setDataToDisplay([]) // In a real app, this would be handled by backend
  }

  const handleDiscard = () => {
    console.log(`Discarding imported data for ${activeTab}.`)
    alert(`Data for ${activeTab} discarded!`)
    setSelectedFile(null)
    setIsAktifChecked(false)
    setSearchQuery("")
    setCurrentPage(1)
    // Clear preview data
    // setDataToDisplay([]) // In a real app, this would be handled by backend
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            Baru
          </Badge>
        )
      case "error":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <XCircle className="w-3 h-3 mr-1" />
            Ralat
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Import Data Ahli</h1>
          <p className="text-gray-600">Import data ahli atau tanggungan secara pukal melalui fail CSV.</p>
        </div>

        {/* Main Content Card */}
        <Card>
          <CardHeader>
            <CardTitle>Import Data</CardTitle>
            <CardDescription>Pilih jenis data yang ingin diimport dan muat naik fail CSV.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="members">Ahli</TabsTrigger>
                <TabsTrigger value="dependents">Tanggungan</TabsTrigger>
              </TabsList>

              <TabsContent value="members" className="mt-6 space-y-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-3">
                    <UploadCloud className="h-6 w-6 text-gray-600" />
                    <Label htmlFor="file-upload-members" className="cursor-pointer text-gray-700">
                      {selectedFile ? selectedFile.name : "Pilih fail CSV untuk Ahli"}
                      <Input
                        id="file-upload-members"
                        type="file"
                        accept=".csv"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </Label>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => alert("Muat turun template ahli...")}>
                      <Download className="h-4 w-4 mr-2" />
                      Muat Turun Template
                    </Button>
                    <Button size="sm" onClick={handleImport} disabled={!selectedFile}>
                      Import
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="aktif-members"
                    checked={isAktifChecked}
                    onCheckedChange={(checked) => setIsAktifChecked(checked as boolean)}
                  />
                  <Label htmlFor="aktif-members">Set status ahli sebagai "Aktif" selepas import</Label>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <Button variant="outline" onClick={handleDiscard}>
                    Buang
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700" onClick={handleConfirm}>
                    Sah
                  </Button>
                </div>

                {/* Data Preview Table */}
                <h3 className="text-lg font-semibold mt-8 mb-4">Pratonton Data Ahli</h3>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Cari nama, No IC, atau lokaliti..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>
                  <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Papar 10 rekod" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">Papar 5 rekod</SelectItem>
                      <SelectItem value="10">Papar 10 rekod</SelectItem>
                      <SelectItem value="20">Papar 20 rekod</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="overflow-x-auto border border-gray-200 rounded-lg">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="text-left py-3 px-4">#</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">
                          <Button variant="ghost" size="sm" className="h-auto p-0 font-medium">
                            Nama <ArrowUpDown className="ml-1 h-4 w-4" />
                          </Button>
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">
                          <Button variant="ghost" size="sm" className="h-auto p-0 font-medium">
                            No IC <ArrowUpDown className="ml-1 h-4 w-4" />
                          </Button>
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">
                          <Button variant="ghost" size="sm" className="h-auto p-0 font-medium">
                            Lokaliti <ArrowUpDown className="ml-1 h-4 w-4" />
                          </Button>
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedData.length > 0 ? (
                        paginatedData.map((item, index) => (
                          <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4 px-4 text-gray-900">{startIndex + index + 1}</td>
                            <td className="py-4 px-4 font-medium text-gray-900">{item.name}</td>
                            <td className="py-4 px-4 text-gray-700">{item.ic}</td>
                            <td className="py-4 px-4 text-gray-700">
                              {activeTab === "members" ? item.locality : item.relationship}
                            </td>
                            <td className="py-4 px-4">{getStatusBadge(item.status)}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="py-12 text-center text-gray-500">
                            Tiada rekod makluman tersedia.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
                  <div className="text-sm text-gray-600">
                    Menunjukkan {paginatedData.length} daripada {filteredData.length} rekod
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
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className={currentPage === page ? "bg-yellow-500 hover:bg-yellow-600" : ""}
                        >
                          {page}
                        </Button>
                      ))}
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
              </TabsContent>

              <TabsContent value="dependents" className="mt-6 space-y-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex items-center gap-3">
                    <UploadCloud className="h-6 w-6 text-gray-600" />
                    <Label htmlFor="file-upload-dependents" className="cursor-pointer text-gray-700">
                      {selectedFile ? selectedFile.name : "Pilih fail CSV untuk Tanggungan"}
                      <Input
                        id="file-upload-dependents"
                        type="file"
                        accept=".csv"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </Label>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => alert("Muat turun template tanggungan...")}>
                      <Download className="h-4 w-4 mr-2" />
                      Muat Turun Template
                    </Button>
                    <Button size="sm" onClick={handleImport} disabled={!selectedFile}>
                      Import
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="aktif-dependents"
                    checked={isAktifChecked}
                    onCheckedChange={(checked) => setIsAktifChecked(checked as boolean)}
                  />
                  <Label htmlFor="aktif-dependents">Set status tanggungan sebagai "Aktif" selepas import</Label>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <Button variant="outline" onClick={handleDiscard}>
                    Buang
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700" onClick={handleConfirm}>
                    Sah
                  </Button>
                </div>

                {/* Data Preview Table */}
                <h3 className="text-lg font-semibold mt-8 mb-4">Pratonton Data Tanggungan</h3>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Cari nama, No IC, atau hubungan..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>
                  <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Papar 10 rekod" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">Papar 5 rekod</SelectItem>
                      <SelectItem value="10">Papar 10 rekod</SelectItem>
                      <SelectItem value="20">Papar 20 rekod</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="overflow-x-auto border border-gray-200 rounded-lg">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="text-left py-3 px-4">#</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">
                          <Button variant="ghost" size="sm" className="h-auto p-0 font-medium">
                            Nama <ArrowUpDown className="ml-1 h-4 w-4" />
                          </Button>
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">
                          <Button variant="ghost" size="sm" className="h-auto p-0 font-medium">
                            No IC <ArrowUpDown className="ml-1 h-4 w-4" />
                          </Button>
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">
                          <Button variant="ghost" size="sm" className="h-auto p-0 font-medium">
                            Hubungan <ArrowUpDown className="ml-1 h-4 w-4" />
                          </Button>
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedData.length > 0 ? (
                        paginatedData.map((item, index) => (
                          <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4 px-4 text-gray-900">{startIndex + index + 1}</td>
                            <td className="py-4 px-4 font-medium text-gray-900">{item.name}</td>
                            <td className="py-4 px-4 text-gray-700">{item.ic}</td>
                            <td className="py-4 px-4 text-gray-700">
                              {activeTab === "members" ? item.locality : item.relationship}
                            </td>
                            <td className="py-4 px-4">{getStatusBadge(item.status)}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="py-12 text-center text-gray-500">
                            Tiada rekod makluman tersedia.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
                  <div className="text-sm text-gray-600">
                    Menunjukkan {paginatedData.length} daripada {filteredData.length} rekod
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
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className={currentPage === page ? "bg-yellow-500 hover:bg-yellow-600" : ""}
                        >
                          {page}
                        </Button>
                      ))}
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
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
