"use client"

import { useState } from "react"
import { Search, Download, CalendarDays, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

interface Member {
  id: string
  memberNo: string
  name: string
  ic: string
  locality: string
  joinDate: string
}

export default function MemberReport() {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [localityFilter, setLocalityFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Sample member data
  const members: Member[] = [
    {
      id: "1",
      memberNo: "2",
      name: "Ahmad bin Ali",
      ic: "900101012345",
      locality: "Masjid Aman",
      joinDate: "2023-01-15",
    },
    {
      id: "2",
      memberNo: "3",
      name: "Siti Aminah binti Hassan",
      ic: "850505054321",
      locality: "Taman Sejahtera",
      joinDate: "2023-02-20",
    },
    {
      id: "3",
      memberNo: "4",
      name: "Muhammad Farid bin Omar",
      ic: "920303036789",
      locality: "Kampung Baru",
      joinDate: "2022-11-10",
    },
    {
      id: "4",
      memberNo: "5",
      name: "Fatimah binti Abdullah",
      ic: "880808087654",
      locality: "Bandar Utama",
      joinDate: "2024-01-05",
    },
    {
      id: "5",
      memberNo: "6",
      name: "Nurul Izzah",
      ic: "950606061122",
      locality: "Masjid Aman",
      joinDate: "2023-03-01",
    },
    {
      id: "6",
      memberNo: "7",
      name: "Khairul Anuar",
      ic: "800707073344",
      locality: "Taman Sejahtera",
      joinDate: "2022-09-25",
    },
    {
      id: "7",
      memberNo: "8",
      name: "Zainab binti Kassim",
      ic: "750808085566",
      locality: "Kampung Baru",
      joinDate: "2024-02-10",
    },
    {
      id: "8",
      memberNo: "9",
      name: "Hafizuddin",
      ic: "980909097788",
      locality: "Bandar Utama",
      joinDate: "2023-06-12",
    },
    {
      id: "9",
      memberNo: "10",
      name: "Siti Aisyah",
      ic: "911010109900",
      locality: "Masjid Aman",
      joinDate: "2023-04-01",
    },
    {
      id: "10",
      memberNo: "11",
      name: "Amirul Hakim",
      ic: "871111112233",
      locality: "Taman Sejahtera",
      joinDate: "2022-10-05",
    },
  ]

  const localities = Array.from(new Set(members.map((m) => m.locality)))

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.ic.includes(searchQuery) ||
      member.memberNo.includes(searchQuery) ||
      member.locality.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesLocality = localityFilter === "all" || member.locality === localityFilter

    const joinDate = new Date(member.joinDate)
    const matchesStartDate = !startDate || joinDate >= startDate
    const matchesEndDate = !endDate || joinDate <= endDate

    return matchesSearch && matchesLocality && matchesStartDate && matchesEndDate
  })

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedMembers = filteredMembers.slice(startIndex, startIndex + itemsPerPage)

  const handleExport = () => {
    console.log("Exporting member report to Excel...")
    // In a real app, you would trigger an Excel export based on current filters
    alert("Laporan ahli diexport ke Excel!")
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Laporan Senarai Ahli</h1>
          <p className="text-gray-600">Jana laporan senarai ahli berdasarkan kriteria yang dipilih.</p>
        </div>

        {/* Main Content Card */}
        <Card>
          <CardHeader>
            <CardTitle>Jana Laporan Ahli</CardTitle>
            <CardDescription>Pilih julat tarikh dan lokaliti untuk menjana laporan.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Filters and Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end mb-6">
              <div>
                <Label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">
                  Tarikh Mula
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarDays className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : "Pilih Tarikh"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-1">
                  Tarikh Akhir
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}
                    >
                      <CalendarDays className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : "Pilih Tarikh"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label htmlFor="locality-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Lokaliti
                </Label>
                <Select value={localityFilter} onValueChange={setLocalityFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Lokaliti" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Lokaliti</SelectItem>
                    {localities.map((locality) => (
                      <SelectItem key={locality} value={locality}>
                        {locality}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleExport} className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            {/* Search Bar for Table */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Cari nama, No IC, No Ahli, atau Lokaliti..."
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
                        No Ahli <ArrowUpDown className="ml-1 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead className="py-3 px-4 font-medium text-gray-900">
                      <Button variant="ghost" size="sm" className="h-auto p-0 font-medium">
                        Nama <ArrowUpDown className="ml-1 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead className="py-3 px-4 font-medium text-gray-900">No IC</TableHead>
                    <TableHead className="py-3 px-4 font-medium text-gray-900">Lokaliti</TableHead>
                    <TableHead className="py-3 px-4 font-medium text-gray-900">Tarikh Sertai</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedMembers.length > 0 ? (
                    paginatedMembers.map((member, index) => (
                      <TableRow key={member.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <TableCell className="py-4 px-4 text-gray-900">{startIndex + index + 1}</TableCell>
                        <TableCell className="py-4 px-4 font-medium text-gray-900">{member.memberNo}</TableCell>
                        <TableCell className="py-4 px-4 text-gray-700">{member.name}</TableCell>
                        <TableCell className="py-4 px-4 text-gray-700">{member.ic}</TableCell>
                        <TableCell className="py-4 px-4 text-gray-700">{member.locality}</TableCell>
                        <TableCell className="py-4 px-4 text-gray-700">
                          {new Date(member.joinDate).toLocaleDateString("ms-MY")}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="py-12 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <Search className="h-12 w-12 text-gray-300" />
                          <div>
                            <p className="text-gray-500 font-medium">Tiada rekod ahli tersedia</p>
                            <p className="text-gray-400 text-sm mt-1">Cuba ubah kriteria carian atau penapis anda</p>
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
                <span>daripada {filteredMembers.length} rekod</span>
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
    </div>
  )
}
