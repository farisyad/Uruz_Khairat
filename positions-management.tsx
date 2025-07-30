"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, Briefcase, Search, ArrowUpDown } from "lucide-react"
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
import { Checkbox } from "@/components/ui/checkbox"

interface Permissions {
  members: {
    list: boolean
    update: boolean
  }
  registerMember: {
    list: boolean
    add: boolean
  }
  approveMember: {
    list: boolean
    approveCancel: boolean
  }
  importData: {
    list: boolean
    import: boolean
    discard: boolean
  }
  dependents: {
    list: boolean
    update: boolean
  }
  payments: {
    list: boolean
    approveCancel: boolean
  }
  claims: {
    list: boolean
    approveCancel: boolean
  }
  notifications: {
    list: boolean
    add: boolean
  }
  accounts: {
    list: boolean
    add: boolean
  }
  reports: {
    list: boolean
    export: boolean
  }
  feedback: {
    list: boolean
    update: boolean
  }
  masjidProfile: {
    list: boolean
    update: boolean
  }
  khairatPolicy: {
    list: boolean
    update: boolean
  }
  admin: {
    list: boolean
    add: boolean
  }
  locality: {
    list: boolean
    add: boolean
  }
  fees: {
    list: boolean
    add: boolean
  }
  positions: {
    list: boolean
    add: boolean
  }
  activityLog: {
    list: boolean
  }
  sessions: {
    list: boolean
  }
}

interface Position {
  id: string
  name: string
  permissions: Permissions
}

const initialPermissions: Permissions = {
  members: { list: false, update: false },
  registerMember: { list: false, add: false },
  approveMember: { list: false, approveCancel: false },
  importData: { list: false, import: false, discard: false },
  dependents: { list: false, update: false },
  payments: { list: false, approveCancel: false },
  claims: { list: false, approveCancel: false },
  notifications: { list: false, add: false },
  accounts: { list: false, add: false },
  reports: { list: false, export: false },
  feedback: { list: false, update: false },
  masjidProfile: { list: false, update: false },
  khairatPolicy: { list: false, update: false },
  admin: { list: false, add: false },
  locality: { list: false, add: false },
  fees: { list: false, add: false },
  positions: { list: false, add: false },
  activityLog: { list: false },
  sessions: { list: false },
}

export default function PositionsManagement() {
  const [positions, setPositions] = useState<Position[]>([
    {
      id: "1",
      name: "Bendahari",
      permissions: {
        ...initialPermissions,
        members: { list: true, update: true },
        payments: { list: true, approveCancel: true },
        accounts: { list: true, add: true },
        reports: { list: true, export: true },
      },
    },
    {
      id: "2",
      name: "Setiausaha",
      permissions: {
        ...initialPermissions,
        members: { list: true, update: true },
        registerMember: { list: true, add: true },
        notifications: { list: true, add: true },
        feedback: { list: true, update: true },
      },
    },
    {
      id: "3",
      name: "Pengerusi",
      permissions: {
        ...initialPermissions,
        members: { list: true, update: true },
        registerMember: { list: true, add: true },
        approveMember: { list: true, approveCancel: true },
        importData: { list: true, import: true, discard: true },
        dependents: { list: true, update: true },
        payments: { list: true, approveCancel: true },
        claims: { list: true, approveCancel: true },
        notifications: { list: true, add: true },
        accounts: { list: true, add: true },
        reports: { list: true, export: true },
        feedback: { list: true, update: true },
        masjidProfile: { list: true, update: true },
        khairatPolicy: { list: true, update: true },
        admin: { list: true, add: true },
        locality: { list: true, add: true },
        fees: { list: true, add: true },
        positions: { list: true, add: true },
        activityLog: { list: true },
        sessions: { list: true },
      },
    },
  ])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentPosition, setCurrentPosition] = useState<Position | null>(null)
  const [positionName, setPositionName] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [formPermissions, setFormPermissions] = useState<Permissions>(initialPermissions)

  useEffect(() => {
    if (currentPosition) {
      setPositionName(currentPosition.name)
      setFormPermissions(currentPosition.permissions)
    } else {
      setPositionName("")
      setFormPermissions(initialPermissions)
    }
  }, [currentPosition])

  const filteredPositions = positions.filter((position) =>
    position.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddPosition = () => {
    setCurrentPosition(null)
    setIsDialogOpen(true)
  }

  const handleEditPosition = (position: Position) => {
    setCurrentPosition(position)
    setIsDialogOpen(true)
  }

  const handleDeletePosition = (id: string) => {
    if (window.confirm("Adakah anda pasti ingin memadam jawatan ini?")) {
      setPositions(positions.filter((pos) => pos.id !== id))
    }
  }

  const handlePermissionChange = (
    category: keyof Permissions,
    permissionType: keyof Permissions[keyof Permissions],
    checked: boolean,
  ) => {
    setFormPermissions((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [permissionType]: checked,
      },
    }))
  }

  const handleSelectAllCategory = (category: keyof Permissions, checked: boolean) => {
    setFormPermissions((prev) => {
      const updatedCategoryPermissions = { ...prev[category] } as Permissions[keyof Permissions]
      for (const key in updatedCategoryPermissions) {
        if (Object.prototype.hasOwnProperty.call(updatedCategoryPermissions, key)) {
          ;(updatedCategoryPermissions as any)[key] = checked
        }
      }
      return {
        ...prev,
        [category]: updatedCategoryPermissions,
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!positionName.trim()) return

    if (currentPosition) {
      // Edit existing position
      setPositions(
        positions.map((pos) =>
          pos.id === currentPosition.id ? { ...pos, name: positionName, permissions: formPermissions } : pos,
        ),
      )
    } else {
      // Add new position
      const newPosition: Position = {
        id: Date.now().toString(), // Simple unique ID
        name: positionName.trim(),
        permissions: formPermissions,
      }
      setPositions([...positions, newPosition])
    }
    setIsDialogOpen(false)
  }

  const renderPermissionRow = (label: string, category: keyof Permissions, permissions: { [key: string]: boolean }) => {
    const allChecked = Object.values(permissions).every(Boolean)
    const isIndeterminate = Object.values(permissions).some(Boolean) && !allChecked

    return (
      <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4 py-2 border-b border-gray-100 last:border-b-0">
        <Label className="col-span-1 text-gray-700">{label}</Label>
        <div className="col-span-2 flex flex-wrap gap-x-6 gap-y-2">
          {Object.entries(permissions).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-2">
              <Checkbox
                id={`${category}-${key}`}
                checked={value}
                onCheckedChange={(checked) =>
                  handlePermissionChange(category, key as keyof Permissions[keyof Permissions], checked as boolean)
                }
              />
              <Label htmlFor={`${category}-${key}`} className="capitalize text-sm">
                {key === "list"
                  ? "Lihat"
                  : key === "update"
                    ? "Kemaskini"
                    : key === "add"
                      ? "Tambah"
                      : key === "approveCancel"
                        ? "Lulus dan Batal"
                        : key === "import"
                          ? "Import"
                          : key === "discard"
                            ? "Buang"
                            : key === "export"
                              ? "Export"
                              : key}
              </Label>
            </div>
          ))}
        </div>
        <div className="col-span-1 flex justify-end">
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`${category}-all`}
              checked={allChecked}
              indeterminate={isIndeterminate ? true : undefined} // Changed this line
              onCheckedChange={(checked) => handleSelectAllCategory(category, checked as boolean)}
            />
            <Label htmlFor={`${category}-all`} className="text-sm">
              Semua
            </Label>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pengurusan Jawatan</h1>
          <p className="text-gray-600">Urus jawatan-jawatan yang ada dalam organisasi masjid.</p>
        </div>

        {/* Main Content Card */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Senarai Jawatan</CardTitle>
                <CardDescription>Tambah, edit, atau padam jawatan.</CardDescription>
              </div>
              <Button onClick={handleAddPosition} className="bg-yellow-500 hover:bg-yellow-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Jawatan
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Cari nama jawatan..."
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
                        Nama Jawatan <ArrowUpDown className="ml-1 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead className="text-right py-3 px-4 font-medium text-gray-900">Tindakan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPositions.length > 0 ? (
                    filteredPositions.map((position, index) => (
                      <TableRow key={position.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <TableCell className="py-4 px-4 text-gray-900">{index + 1}</TableCell>
                        <TableCell className="py-4 px-4 font-medium text-gray-900">{position.name}</TableCell>
                        <TableCell className="py-4 px-4 text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            className="mr-2 bg-transparent"
                            onClick={() => handleEditPosition(position)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDeletePosition(position.id)}>
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
                          <Briefcase className="h-12 w-12 text-gray-300" />
                          <div>
                            <p className="text-gray-500 font-medium">Tiada jawatan tersedia</p>
                            <p className="text-gray-400 text-sm mt-1">
                              {searchQuery
                                ? "Cuba ubah kriteria carian anda"
                                : "Klik butang 'Tambah Jawatan' untuk membuat jawatan pertama"}
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

      {/* Add/Edit Position Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{currentPosition ? "Edit Jawatan" : "Tambah Jawatan Baru"}</DialogTitle>
            <DialogDescription>
              {currentPosition
                ? "Kemaskini nama jawatan dan kebenaran di bawah."
                : "Masukkan nama jawatan baru dan tetapkan kebenaran."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="positionName" className="text-right">
                  Nama Jawatan <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="positionName"
                  value={positionName}
                  onChange={(e) => setPositionName(e.target.value)}
                  className="col-span-3"
                  required
                />
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Kebenaran</h3>
                <div className="border border-gray-200 rounded-lg p-4 space-y-2">
                  {renderPermissionRow("Senarai Ahli", "members", formPermissions.members)}
                  {renderPermissionRow("Daftar Ahli", "registerMember", formPermissions.registerMember)}
                  {renderPermissionRow("Sahkan Ahli", "approveMember", formPermissions.approveMember)}
                  {renderPermissionRow("Import Data Ahli", "importData", formPermissions.importData)}
                  {renderPermissionRow("Tanggungan", "dependents", formPermissions.dependents)}
                  {renderPermissionRow("Bayaran", "payments", formPermissions.payments)}
                  {renderPermissionRow("Tuntutan", "claims", formPermissions.claims)}
                  {renderPermissionRow("Makluman", "notifications", formPermissions.notifications)}
                  {renderPermissionRow("Akaun", "accounts", formPermissions.accounts)}
                  {renderPermissionRow("Laporan", "reports", formPermissions.reports)}
                  {renderPermissionRow("Maklum Balas Ahli", "feedback", formPermissions.feedback)}
                  {renderPermissionRow("Profil Masjid", "masjidProfile", formPermissions.masjidProfile)}
                  {renderPermissionRow("Polisi Khairat", "khairatPolicy", formPermissions.khairatPolicy)}
                  {renderPermissionRow("Admin", "admin", formPermissions.admin)}
                  {renderPermissionRow("Lokaliti", "locality", formPermissions.locality)}
                  {renderPermissionRow("Yuran", "fees", formPermissions.fees)}
                  {renderPermissionRow("Jawatan", "positions", formPermissions.positions)}
                  {renderPermissionRow("Aktiviti Log", "activityLog", formPermissions.activityLog)}
                  {renderPermissionRow("Sesi", "sessions", formPermissions.sessions)}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Batal
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                {currentPosition ? "Kemaskini" : "Tambah"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
