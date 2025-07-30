"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { Search, Download, CalendarDays, Wallet, Banknote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

export default function AccountTransactionsReport() {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)

  // Sample data for balances and transactions
  const startingBalance = { cash: 1500.0, bank: 10000.0 }
  const endingBalance = { cash: 1200.0, bank: 10500.0 }

  const transactions = [
    { category: "Yuran", cash: 500.0, bank: 200.0 },
    { category: "Pendapatan", cash: 300.0, bank: 1000.0 },
    { category: "Perbelanjaan", cash: -600.0, bank: -500.0 },
    { category: "Sumbangan", cash: 0.0, bank: 0.0 },
    { category: "Pemindahan", cash: -200.0, bank: 0.0 },
  ]

  const handleSearch = () => {
    console.log("Searching transactions from", startDate, "to", endDate)
    // In a real app, you would fetch data based on the date range
  }

  const handleExport = () => {
    console.log("Exporting transactions to Excel from", startDate, "to", endDate)
    // In a real app, you would trigger an Excel export
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Laporan Transaksi Akaun Masjid Taqwa Bbm</h1>
          <p className="text-gray-600">Laporan lengkap bagi transaksi akaun untuk tempoh tertentu</p>
        </div>

        {/* Main Content Card */}
        <Card>
          <CardHeader>
            <CardTitle>Laporan Transaksi Akaun</CardTitle>
            <CardDescription>Pilih julat tarikh untuk melihat transaksi akaun.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Date Range and Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end mb-6">
              <div className="col-span-1">
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
              <div className="col-span-1">
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
              <div className="col-span-1 md:col-span-1 lg:col-span-1 flex gap-2">
                <Button onClick={handleSearch} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <Search className="h-4 w-4 mr-2" />
                  Cari
                </Button>
              </div>
              <div className="col-span-1 md:col-span-2 lg:col-span-2 flex justify-end">
                <Button onClick={handleExport} className="bg-green-600 hover:bg-green-700 text-white">
                  <Download className="h-4 w-4 mr-2" />
                  Export Ke Excel
                </Button>
              </div>
            </div>

            {/* Balance Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="border-l-4 border-yellow-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <CardTitle className="text-lg font-semibold text-gray-800">Baki Permulaan</CardTitle>
                    <Wallet className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-gray-700">
                      <span className="font-medium">Tunai:</span>
                      <span className="text-lg font-bold">RM{startingBalance.cash.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-700">
                      <span className="font-medium">Bank:</span>
                      <span className="text-lg font-bold">RM{startingBalance.bank.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <CardTitle className="text-lg font-semibold text-gray-800">Baki Akhir</CardTitle>
                    <Banknote className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-gray-700">
                      <span className="font-medium">Tunai:</span>
                      <span className="text-lg font-bold">RM{endingBalance.cash.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-700">
                      <span className="font-medium">Bank:</span>
                      <span className="text-lg font-bold">RM{endingBalance.bank.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Transaction Details Table */}
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Perincian Transaksi{" "}
              {startDate && endDate
                ? `Antara ${format(startDate, "dd MMM yyyy")} hingga ${format(endDate, "dd MMM yyyy")}`
                : "Tidak Ditentukan"}
            </h3>
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <Table>
                <TableHeader className="bg-gray-100">
                  <TableRow>
                    <TableHead className="w-[200px] py-3 px-4 font-medium text-gray-900">Kategori</TableHead>
                    <TableHead className="text-right py-3 px-4 font-medium text-gray-900">Tunai (RM)</TableHead>
                    <TableHead className="text-right py-3 px-4 font-medium text-gray-900">Bank (RM)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.length > 0 ? (
                    transactions.map((transaction, index) => (
                      <TableRow key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <TableCell className="py-4 px-4 font-medium text-gray-900">{transaction.category}</TableCell>
                        <TableCell
                          className={`py-4 px-4 text-right font-semibold ${
                            transaction.cash < 0 ? "text-red-600" : "text-green-600"
                          }`}
                        >
                          {transaction.cash < 0 ? "-" : ""}RM{Math.abs(transaction.cash).toFixed(2)}
                        </TableCell>
                        <TableCell
                          className={`py-4 px-4 text-right font-semibold ${
                            transaction.bank < 0 ? "text-red-600" : "text-green-600"
                          }`}
                        >
                          {transaction.bank < 0 ? "-" : ""}RM{Math.abs(transaction.bank).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="py-12 text-center text-gray-500">
                        Tiada transaksi tersedia untuk julat tarikh ini.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
