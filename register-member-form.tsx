"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Trash2, Edit, UserIcon as Male, UserIcon as Female } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Dependent {
  id: string
  name: string
  relationship: string
  ic: string
  age: number
  gender: string
  phone: string
}

export default function RegisterMemberForm() {
  const [memberData, setMemberData] = useState({
    name: "",
    ic: "",
    gender: "",
    email: "",
    phone: "",
    occupation: "",
    address: "",
    postcode: "",
    city: "",
    state: "",
    locality: "",
    category: "",
    tags: "",
    notes: "",
  })

  const [dependents, setDependents] = useState<Dependent[]>([])
  const [isDependentDialogOpen, setIsDependentDialogOpen] = useState(false)
  const [currentDependent, setCurrentDependent] = useState<(Omit<Dependent, "id"> & { id?: string }) | null>(null)
  const [editingDependentId, setEditingDependentId] = useState<string | null>(null)

  const handleMemberChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    setMemberData((prev) => ({ ...prev, [id]: value }))
  }

  const handleDependentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    setCurrentDependent((prev) => ({ ...prev!, [id]: value }))
  }

  const handleAddDependent = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentDependent) {
      if (editingDependentId) {
        setDependents(
          dependents.map((dep) =>
            dep.id === editingDependentId ? ({ ...currentDependent, id: editingDependentId } as Dependent) : dep,
          ),
        )
        setEditingDependentId(null)
      } else {
        setDependents((prev) => [...prev, { ...currentDependent, id: Date.now().toString() } as Dependent])
      }
      setCurrentDependent(null)
      setIsDependentDialogOpen(false)
    }
  }

  const handleEditDependent = (dependent: Dependent) => {
    setCurrentDependent(dependent)
    setEditingDependentId(dependent.id)
    setIsDependentDialogOpen(true)
  }

  const handleDeleteDependent = (id: string) => {
    setDependents(dependents.filter((dep) => dep.id !== id))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Member Data:", memberData)
    console.log("Dependents:", dependents)
    // Here you would typically send this data to your backend
    alert("Pendaftaran Ahli Berjaya!")
    // Reset form
    setMemberData({
      name: "",
      ic: "",
      gender: "",
      email: "",
      phone: "",
      occupation: "",
      address: "",
      postcode: "",
      city: "",
      state: "",
      locality: "",
      category: "",
      tags: "",
      notes: "",
    })
    setDependents([])
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Daftar Ahli Masjid Taqwa Bbm</h1>
          <p className="text-gray-600">
            Ahli yang didaftarkan oleh Admin akan terus aktif tanpa memerlukan pengesahan tambahan
          </p>
        </div>

        {/* Main Content Card */}
        <Card>
          <CardHeader>
            <CardTitle>Maklumat Ahli</CardTitle>
            <CardDescription>Isi borang di bawah untuk mendaftar ahli baru</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Member Information Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="name">
                    Nama Penuh <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="Nama Penuh"
                    value={memberData.name}
                    onChange={handleMemberChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="ic">
                    No IC <span className="text-red-500">*</span>
                  </Label>
                  <Input id="ic" placeholder="No IC" value={memberData.ic} onChange={handleMemberChange} required />
                </div>
                <div>
                  <Label htmlFor="gender">
                    Jantina <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={memberData.gender}
                    onValueChange={(value) => setMemberData({ ...memberData, gender: value })}
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
                  <Label htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={memberData.email}
                    onChange={handleMemberChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">No Telefon</Label>
                  <Input id="phone" placeholder="No Telefon" value={memberData.phone} onChange={handleMemberChange} />
                </div>
                <div>
                  <Label htmlFor="occupation">Pekerjaan</Label>
                  <Input
                    id="occupation"
                    placeholder="Pekerjaan"
                    value={memberData.occupation}
                    onChange={handleMemberChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="address">
                    Alamat <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="address"
                    placeholder="Alamat"
                    value={memberData.address}
                    onChange={handleMemberChange}
                    rows={3}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="postcode">
                    Poskod <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="postcode"
                    placeholder="Poskod"
                    value={memberData.postcode}
                    onChange={handleMemberChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="city">
                    Bandar <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="city"
                    placeholder="Bandar"
                    value={memberData.city}
                    onChange={handleMemberChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state">
                    Negeri <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="state"
                    placeholder="Negeri"
                    value={memberData.state}
                    onChange={handleMemberChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="locality">Lokaliti</Label>
                  <Select
                    value={memberData.locality}
                    onValueChange={(value) => setMemberData({ ...memberData, locality: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Lokaliti" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Masjid Aman">Masjid Aman</SelectItem>
                      <SelectItem value="Taman Sejahtera">Taman Sejahtera</SelectItem>
                      <SelectItem value="Kampung Baru">Kampung Baru</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="category">
                    Kategori <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={memberData.category}
                    onValueChange={(value) => setMemberData({ ...memberData, category: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ahli Biasa">Ahli Biasa</SelectItem>
                      <SelectItem value="Ahli Kehormat">Ahli Kehormat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    placeholder="Tags (e.g., VIP, Keluarga)"
                    value={memberData.tags}
                    onChange={handleMemberChange}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Catatan</Label>
                <Textarea
                  id="notes"
                  placeholder="Catatan tambahan..."
                  value={memberData.notes}
                  onChange={handleMemberChange}
                  rows={3}
                />
              </div>

              {/* Dependent Information Section */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Maklumat Tanggungan</h2>
                  <Dialog open={isDependentDialogOpen} onOpenChange={setIsDependentDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        type="button"
                        size="sm"
                        className="bg-yellow-500 hover:bg-yellow-600 text-white"
                        onClick={() => {
                          setCurrentDependent({ name: "", relationship: "", ic: "", age: 0, gender: "", phone: "" })
                          setEditingDependentId(null)
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Tambah
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>{editingDependentId ? "Edit Tanggungan" : "Tambah Tanggungan"}</DialogTitle>
                        <DialogDescription>
                          {editingDependentId ? "Kemaskini maklumat tanggungan." : "Isi maklumat tanggungan baru."}
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleAddDependent} className="space-y-4">
                        <div>
                          <Label htmlFor="name">
                            Nama <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="name"
                            value={currentDependent?.name || ""}
                            onChange={handleDependentChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="relationship">
                            Hubungan <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="relationship"
                            value={currentDependent?.relationship || ""}
                            onChange={handleDependentChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="ic">
                            No IC <span className="text-red-500">*</span>
                          </Label>
                          <Input id="ic" value={currentDependent?.ic || ""} onChange={handleDependentChange} required />
                        </div>
                        <div>
                          <Label htmlFor="age">
                            Umur <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="age"
                            type="number"
                            value={currentDependent?.age || ""}
                            onChange={handleDependentChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="gender">
                            Jantina <span className="text-red-500">*</span>
                          </Label>
                          <Select
                            value={currentDependent?.gender || ""}
                            onValueChange={(value) => setCurrentDependent({ ...currentDependent!, gender: value })}
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
                          <Label htmlFor="phone">No Telefon</Label>
                          <Input id="phone" value={currentDependent?.phone || ""} onChange={handleDependentChange} />
                        </div>
                        <div className="flex justify-end gap-2 pt-4">
                          <Button type="button" variant="outline" onClick={() => setIsDependentDialogOpen(false)}>
                            Batal
                          </Button>
                          <Button type="submit" className="bg-green-600 hover:bg-green-700">
                            {editingDependentId ? "Simpan Perubahan" : "Tambah"}
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader className="bg-gray-100">
                      <TableRow>
                        <TableHead className="w-[50px]">#</TableHead>
                        <TableHead>Nama</TableHead>
                        <TableHead>Hubungan</TableHead>
                        <TableHead>No IC</TableHead>
                        <TableHead>Umur</TableHead>
                        <TableHead>Jantina</TableHead>
                        <TableHead>No Telefon</TableHead>
                        <TableHead className="text-right">Tindakan</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dependents.length > 0 ? (
                        dependents.map((dep, index) => (
                          <TableRow key={dep.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                              <div className="font-medium">{dep.name}</div>
                            </TableCell>
                            <TableCell>{dep.relationship}</TableCell>
                            <TableCell>{dep.ic}</TableCell>
                            <TableCell>{dep.age}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                {dep.gender === "Lelaki" ? (
                                  <Male className="h-3 w-3" />
                                ) : (
                                  <Female className="h-3 w-3" />
                                )}
                                {dep.gender}
                              </div>
                            </TableCell>
                            <TableCell>{dep.phone}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" onClick={() => handleEditDependent(dep)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600"
                                onClick={() => handleDeleteDependent(dep.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                            Tiada maklumat tanggungan ahli
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-2">
                  Daftar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
