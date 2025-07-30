"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Edit, Trash2, UploadCloud, Eye, CheckCircle } from "lucide-react"
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

interface Category {
  id: string
  name: string
}

interface Tag {
  id: string
  name: string
}

export default function KhairatPolicyManagement() {
  const [policyDocument, setPolicyDocument] = useState<File | null>(null)
  // Simulate an existing policy document URL. In a real app, this would be fetched.
  const [currentPolicyUrl, setCurrentPolicyUrl] = useState<string | null>(
    "https://www.africau.edu/images/default/sample.pdf",
  )
  const [currentPolicyName, setCurrentPolicyName] = useState<string | null>("Polisi_Khairat_Terkini.pdf")
  const [dependentAgeLimit, setDependentAgeLimit] = useState<number>(0)
  const [dependentCategories, setDependentCategories] = useState<Category>([])
  const [memberTags, setMemberTags] = useState<Tag>([])

  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false)
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null)
  const [categoryName, setCategoryName] = useState("")

  const [isTagDialogOpen, setIsTagDialogOpen] = useState(false)
  const [currentTag, setCurrentTag] = useState<Tag | null>(null)
  const [tagName, setTagName] = useState("")

  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      setPolicyDocument(file)
      setCurrentPolicyUrl(URL.createObjectURL(file))
      setCurrentPolicyName(file.name)
    }
  }

  const handleSavePolicy = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Saving Policy:", {
      policyDocument: policyDocument?.name,
      dependentAgeLimit,
      dependentCategories,
      memberTags,
    })
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 3000)
  }

  // Dependent Category Handlers
  const handleAddCategory = () => {
    setCurrentCategory(null)
    setCategoryName("")
    setIsCategoryDialogOpen(true)
  }

  const handleEditCategory = (category: Category) => {
    setCurrentCategory(category)
    setCategoryName(category.name)
    setIsCategoryDialogOpen(true)
  }

  const handleDeleteCategory = (id: string) => {
    if (window.confirm("Adakah anda pasti ingin memadam kategori tanggungan ini?")) {
      setDependentCategories(dependentCategories.filter((cat) => cat.id !== id))
    }
  }

  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!categoryName.trim()) return

    if (currentCategory) {
      setDependentCategories(
        dependentCategories.map((cat) => (cat.id === currentCategory.id ? { ...cat, name: categoryName } : cat)),
      )
    } else {
      const newCategory: Category = {
        id: Date.now().toString(),
        name: categoryName.trim(),
      }
      setDependentCategories([...dependentCategories, newCategory])
    }
    setIsCategoryDialogOpen(false)
    setCategoryName("")
  }

  // Member Tag Handlers
  const handleAddTag = () => {
    setCurrentTag(null)
    setTagName("")
    setIsTagDialogOpen(true)
  }

  const handleEditTag = (tag: Tag) => {
    setCurrentTag(tag)
    setTagName(tag.name)
    setIsTagDialogOpen(true)
  }

  const handleDeleteTag = (id: string) => {
    if (window.confirm("Adakah anda pasti ingin memadam tagging ahli ini?")) {
      setMemberTags(memberTags.filter((tag) => tag.id !== id))
    }
  }

  const handleTagSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!tagName.trim()) return

    if (currentTag) {
      setMemberTags(memberTags.map((tag) => (tag.id === currentTag.id ? { ...tag, name: tagName } : tag)))
    } else {
      const newTag: Tag = {
        id: Date.now().toString(),
        name: tagName.trim(),
      }
      setMemberTags([...memberTags, newTag])
    }
    setIsTagDialogOpen(false)
    setTagName("")
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Polisi Khairat Masjid Taqwa Bbm</h1>
          <p className="text-gray-600">Kemaskini polisi khairat bagi masjid anda.</p>
        </div>

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <p className="text-green-800 font-medium">Polisi khairat berjaya dikemaskini!</p>
          </div>
        )}

        {/* Main Content Card */}
        <Card>
          <CardHeader>
            <CardTitle>Kemaskini Polisi Khairat</CardTitle>
            <CardDescription>Urus dokumen polisi, had umur tanggungan, kategori, dan tagging ahli.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSavePolicy} className="space-y-8">
              {/* Policy Document Section */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Dokumen Polisi</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div>
                    <Label htmlFor="policy-document" className="block text-sm font-medium text-gray-700 mb-2">
                      Muat Naik Dokumen Polisi (PDF)
                    </Label>
                    <div className="flex items-center gap-3">
                      <Label
                        htmlFor="policy-document-upload"
                        className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                      >
                        <UploadCloud className="h-4 w-4 mr-2" />
                        {policyDocument ? "Tukar Fail" : "Pilih Fail"}
                      </Label>
                      <Input
                        id="policy-document-upload"
                        type="file"
                        accept=".pdf"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                      <span className="text-gray-500 text-sm">
                        {policyDocument ? policyDocument.name : "Tiada fail dipilih"}
                      </span>
                    </div>
                  </div>
                  {currentPolicyUrl && currentPolicyName && (
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-700">Dokumen Polisi Terkini:</span>
                      <span className="text-gray-900 font-medium">{currentPolicyName}</span>
                      <Button variant="outline" size="sm" asChild>
                        <a href={currentPolicyUrl} target="_blank" rel="noopener noreferrer">
                          <Eye className="h-4 w-4 mr-2" />
                          Lihat
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Dependent Age Limit Section */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Had Umur Tanggungan</h2>
                <div className="max-w-xs">
                  <Label htmlFor="dependent-age-limit" className="block text-sm font-medium text-gray-700 mb-2">
                    Had Umur Tanggungan (tahun)
                  </Label>
                  <Input
                    id="dependent-age-limit"
                    type="number"
                    value={dependentAgeLimit}
                    onChange={(e) => setDependentAgeLimit(Number(e.target.value))}
                    min={0}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Dependent Categories Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Kategori Tanggungan</h2>
                  <Button type="button" onClick={handleAddCategory} className="bg-yellow-500 hover:bg-yellow-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah
                  </Button>
                </div>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader className="bg-gray-100">
                      <TableRow>
                        <TableHead className="w-[50px] py-3 px-4">#</TableHead>
                        <TableHead className="py-3 px-4 font-medium text-gray-900">Kategori</TableHead>
                        <TableHead className="text-right py-3 px-4 font-medium text-gray-900">Tindakan</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {dependentCategories.length > 0 ? (
                        dependentCategories.map((category, index) => (
                          <TableRow key={category.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <TableCell className="py-4 px-4 text-gray-900">{index + 1}</TableCell>
                            <TableCell className="py-4 px-4 font-medium text-gray-900">{category.name}</TableCell>
                            <TableCell className="py-4 px-4 text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="mr-2"
                                onClick={() => handleEditCategory(category)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600"
                                onClick={() => handleDeleteCategory(category.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} className="py-12 text-center text-gray-500">
                            Tiada maklumat kategori tanggungan
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Member Tags Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Tagging Ahli</h2>
                  <Button type="button" onClick={handleAddTag} className="bg-yellow-500 hover:bg-yellow-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah
                  </Button>
                </div>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader className="bg-gray-100">
                      <TableRow>
                        <TableHead className="w-[50px] py-3 px-4">#</TableHead>
                        <TableHead className="py-3 px-4 font-medium text-gray-900">Tagging</TableHead>
                        <TableHead className="text-right py-3 px-4 font-medium text-gray-900">Tindakan</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {memberTags.length > 0 ? (
                        memberTags.map((tag, index) => (
                          <TableRow key={tag.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <TableCell className="py-4 px-4 text-gray-900">{index + 1}</TableCell>
                            <TableCell className="py-4 px-4 font-medium text-gray-900">{tag.name}</TableCell>
                            <TableCell className="py-4 px-4 text-right">
                              <Button variant="ghost" size="sm" className="mr-2" onClick={() => handleEditTag(tag)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600"
                                onClick={() => handleDeleteTag(tag.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} className="py-12 text-center text-gray-500">
                            Tiada maklumat tagging ahli
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-8 py-2">
                  Simpan
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Add/Edit Category Dialog */}
      <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {currentCategory ? "Edit Kategori Tanggungan" : "Tambah Kategori Tanggungan Baru"}
            </DialogTitle>
            <DialogDescription>
              {currentCategory
                ? "Kemaskini nama kategori di bawah."
                : "Masukkan nama kategori tanggungan baru di sini."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCategorySubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="categoryName" className="text-right">
                  Nama
                </Label>
                <Input
                  id="categoryName"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="col-span-3"
                  required
                  placeholder="Contoh: Anak, Ibu Bapa"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsCategoryDialogOpen(false)}>
                Batal
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                {currentCategory ? "Kemaskini" : "Tambah"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Tag Dialog */}
      <Dialog open={isTagDialogOpen} onOpenChange={setIsTagDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{currentTag ? "Edit Tagging Ahli" : "Tambah Tagging Ahli Baru"}</DialogTitle>
            <DialogDescription>
              {currentTag ? "Kemaskini nama tagging di bawah." : "Masukkan nama tagging ahli baru di sini."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleTagSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tagName" className="text-right">
                  Nama
                </Label>
                <Input
                  id="tagName"
                  value={tagName}
                  onChange={(e) => setTagName(e.target.value)}
                  className="col-span-3"
                  required
                  placeholder="Contoh: VIP, Keluarga"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsTagDialogOpen(false)}>
                Batal
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                {currentTag ? "Kemaskini" : "Tambah"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
