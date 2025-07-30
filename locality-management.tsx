"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Edit, Trash2, MapPin, Search, ArrowUpDown } from "lucide-react"
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

interface Locality {
  id: string
  name: string
}

export default function LocalityManagement() {
  const [localities, setLocalities] = useState<Locality[]>([
    { id: "1", name: "Masjid Aman" },
    { id: "2", name: "Taman Sejahtera" },
    { id: "3", name: "Kampung Baru" },
  ])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentLocality, setCurrentLocality] = useState<Locality | null>(null)
  const [localityName, setLocalityName] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredLocalities = localities.filter((locality) =>
    locality.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddLocality = () => {
    setCurrentLocality(null)
    setLocalityName("")
    setIsDialogOpen(true)
  }

  const handleEditLocality = (locality: Locality) => {
    setCurrentLocality(locality)
    setLocalityName(locality.name)
    setIsDialogOpen(true)
  }

  const handleDeleteLocality = (id: string) => {
    if (window.confirm("Adakah anda pasti ingin memadam lokaliti ini?")) {
      setLocalities(localities.filter((loc) => loc.id !== id))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!localityName.trim()) return

    if (currentLocality) {
      // Edit existing locality
      setLocalities(localities.map((loc) => (loc.id === currentLocality.id ? { ...loc, name: localityName } : loc)))
    } else {
      // Add new locality
      const newLocality: Locality = {
        id: Date.now().toString(), // Simple unique ID
        name: localityName.trim(),
      }
      setLocalities([...localities, newLocality])
    }
    setIsDialogOpen(false)
    setLocalityName("")
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pengurusan Lokaliti</h1>
          <p className="text-gray-600">Urus lokaliti-lokaliti yang dinaungi oleh masjid anda.</p>
        </div>

        {/* Main Content Card */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Senarai Lokaliti</CardTitle>
                <CardDescription>Tambah, edit, atau padam lokaliti.</CardDescription>
              </div>
              <Button onClick={handleAddLocality} className="bg-yellow-500 hover:bg-yellow-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Lokaliti
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Cari nama lokaliti..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>

            {/* Table */}
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <Table>
                <TableHeader className="bg-gray-100">
                  <TableRow>
                    <TableHead className="w-[50px] py-3 px-4">#</TableHead>
                    <TableHead className="py-3 px-4 font-medium text-gray-900">
                      <Button variant="ghost" size="sm" className="h-auto p-0 font-medium">
                        Nama Lokaliti <ArrowUpDown className="ml-1 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead className="text-right py-3 px-4 font-medium text-gray-900">Tindakan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLocalities.length > 0 ? (
                    filteredLocalities.map((locality, index) => (
                      <TableRow key={locality.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <TableCell className="py-4 px-4 text-gray-900">{index + 1}</TableCell>
                        <TableCell className="py-4 px-4 font-medium text-gray-900">{locality.name}</TableCell>
                        <TableCell className="py-4 px-4 text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            className="mr-2 bg-transparent"
                            onClick={() => handleEditLocality(locality)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteLocality(locality.id)}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Padam
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="py-12 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <MapPin className="h-12 w-12 text-gray-300" />
                          <div>
                            <p className="text-gray-500 font-medium">Tiada lokaliti tersedia</p>
                            <p className="text-gray-400 text-sm mt-1">
                              {searchQuery
                                ? "Cuba ubah kriteria carian anda"
                                : "Klik butang 'Tambah Lokaliti' untuk membuat lokaliti pertama"}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add/Edit Locality Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{currentLocality ? "Edit Lokaliti" : "Tambah Lokaliti Baru"}</DialogTitle>
            <DialogDescription>
              {currentLocality ? "Kemaskini nama lokaliti di bawah." : "Masukkan nama lokaliti baru di sini."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="localityName" className="text-right">
                  Nama
                </Label>
                <Input
                  id="localityName"
                  value={localityName}
                  onChange={(e) => setLocalityName(e.target.value)}
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Batal
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                {currentLocality ? "Kemaskini" : "Tambah"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
