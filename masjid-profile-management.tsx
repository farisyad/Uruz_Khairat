"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle } from "lucide-react"

export default function MasjidProfileManagement() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bankName: "",
    bankAccountName: "",
    bankAccountNumber: "",
    cashInHand: "",
    cashInBank: "",
    address: "",
    postcode: "",
    city: "",
    state: "",
    latitude: "",
    longitude: "",
  })
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Saving Masjid Profile:", formData)
    // Simulate API call
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profil Masjid</h1>
          <p className="text-gray-600">Maklumat lengkap profil masjid anda.</p>
        </div>

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <p className="text-green-800 font-medium">Profil masjid berjaya dikemaskini!</p>
          </div>
        )}

        {/* Main Content Card */}
        <Card>
          <CardHeader>
            <CardTitle>Kemaskini Profil Masjid</CardTitle>
            <CardDescription>Isi borang di bawah untuk mengemaskini maklumat masjid.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* General Information Section */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Maklumat Umum</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="name">
                      Nama Masjid <span className="text-red-500">*</span>
                    </Label>
                    <Input id="name" value={formData.name} onChange={handleChange} placeholder="Nama Masjid" required />
                  </div>
                  <div>
                    <Label htmlFor="email">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">
                      No Telefon <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="No Telefon"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Bank Information Section */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Maklumat Bank</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="bankName">
                      Nama Bank <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="bankName"
                      value={formData.bankName}
                      onChange={handleChange}
                      placeholder="Nama Bank"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="bankAccountName">
                      Nama Akaun Bank <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="bankAccountName"
                      value={formData.bankAccountName}
                      onChange={handleChange}
                      placeholder="Nama Akaun Bank"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="bankAccountNumber">
                      No Akaun Bank <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="bankAccountNumber"
                      value={formData.bankAccountNumber}
                      onChange={handleChange}
                      placeholder="No Akaun Bank"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cashInHand">
                      Baki Tunai Di Tangan (RM) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="cashInHand"
                      type="number"
                      value={formData.cashInHand}
                      onChange={handleChange}
                      placeholder="Baki Tunai Di Tangan"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cashInBank">
                      Baki Tunai Di Bank (RM) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="cashInBank"
                      type="number"
                      value={formData.cashInBank}
                      onChange={handleChange}
                      placeholder="Baki Tunai Di Bank"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Address & Location Section */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Alamat & Lokasi</h2>
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <div>
                    <Label htmlFor="address">
                      Alamat <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Alamat"
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
                      value={formData.postcode}
                      onChange={handleChange}
                      placeholder="Poskod"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">
                      Bandar <span className="text-red-500">*</span>
                    </Label>
                    <Input id="city" value={formData.city} onChange={handleChange} placeholder="Bandar" required />
                  </div>
                  <div>
                    <Label htmlFor="state">
                      Negeri <span className="text-red-500">*</span>
                    </Label>
                    <Input id="state" value={formData.state} onChange={handleChange} placeholder="Negeri" required />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label htmlFor="latitude">Latitud</Label>
                    <Input id="latitude" value={formData.latitude} onChange={handleChange} placeholder="Latitud" />
                  </div>
                  <div>
                    <Label htmlFor="longitude">Longitud</Label>
                    <Input id="longitude" value={formData.longitude} onChange={handleChange} placeholder="Longitud" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-8 py-2">
                  Simpan Perubahan
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
