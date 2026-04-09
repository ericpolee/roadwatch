"use client"

import { motion } from "framer-motion"
import { useState, useEffect, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { LogOut, Download, Search, Filter, ArrowUpDown } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { GoogleMap, useJsApiLoader, Marker, StreetViewPanorama } from "@react-google-maps/api"

function AnomaliesContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedId = searchParams.get("id")
  const [userPhone, setUserPhone] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"time" | "severity">("time")
  const [filterSeverity, setFilterSeverity] = useState<"all" | "high" | "medium" | "low">("all")
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  useEffect(() => {
    const phone = localStorage.getItem("userPhone")
    if (phone) {
      setUserPhone(phone)
    }
  }, [])

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  })

  const anomalies = [
    {
      id: 1,
      type: "Pothole",
      severity: 8.5,
      lat: 40.4862,
      lng: -74.4518,
      location: "Route 1, Edison, NJ",
      time: "2 min ago",
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      description: "Large pothole detected on Route 1 northbound lane causing significant road hazard.",
      status: "In Progress",
      photos: ["/pothole-in-road.png", "/pothole-in-road.png", "/pothole-in-road.png"],
    },
    {
      id: 2,
      type: "Road Crack",
      severity: 4.2,
      lat: 40.5584,
      lng: -74.3057,
      location: "Main St, Woodbridge, NJ",
      time: "15 min ago",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      description: "Moderate crack formation detected on Main Street requiring monitoring and potential repair.",
      status: "Delivered",
      photos: ["/road-crack.jpg", "/road-crack.jpg", "/road-crack.jpg"],
    },
    {
      id: 3,
      type: "Debris",
      severity: 6.8,
      lat: 40.4168,
      lng: -74.401,
      location: "Amboy Ave, Perth Amboy, NJ",
      time: "32 min ago",
      timestamp: new Date(Date.now() - 32 * 60 * 1000),
      description: "Large debris obstruction detected on Amboy Avenue posing immediate safety concern.",
      status: "Accepted",
      photos: ["/debris-on-road.jpg", "/debris-on-road.jpg", "/debris-on-road.jpg"],
    },
    {
      id: 4,
      type: "Traffic Light Malfunction",
      severity: 9.2,
      lat: 40.5187,
      lng: -74.4121,
      location: "Oak Tree Rd, Iselin, NJ",
      time: "1 hour ago",
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      description:
        "Critical traffic light malfunction at major intersection requiring immediate attention to prevent accidents.",
      status: "Fixed",
      photos: ["/broken-traffic-light.png", "/broken-traffic-light.png", "/broken-traffic-light.png"],
    },
    {
      id: 5,
      type: "Pothole",
      severity: 7.3,
      lat: 40.4623,
      lng: -74.4421,
      location: "Lincoln Hwy, Edison, NJ",
      time: "1.5 hours ago",
      timestamp: new Date(Date.now() - 90 * 60 * 1000),
      description: "Deep pothole formation on Lincoln Highway causing vehicle damage risk.",
      status: "In Progress",
      photos: ["/pothole-in-road.png", "/pothole-in-road.png", "/pothole-in-road.png"],
    },
    {
      id: 6,
      type: "Animal on Road",
      severity: 5.1,
      lat: 40.5723,
      lng: -74.3238,
      location: "Garden State Pkwy, Woodbridge, NJ",
      time: "2 hours ago",
      timestamp: new Date(Date.now() - 120 * 60 * 1000),
      description: "Wildlife crossing detected on Garden State Parkway requiring driver caution.",
      status: "Denied",
      photos: ["/deer-on-road.jpg", "/deer-on-road.jpg", "/deer-on-road.jpg"],
    },
    {
      id: 7,
      type: "Road Crack",
      severity: 3.8,
      lat: 40.4401,
      lng: -74.4123,
      location: "Convery Blvd, Perth Amboy, NJ",
      time: "3 hours ago",
      timestamp: new Date(Date.now() - 180 * 60 * 1000),
      description: "Minor surface crack detected on Convery Boulevard for routine maintenance scheduling.",
      status: "Delivered",
      photos: ["/road-crack.jpg", "/road-crack.jpg", "/road-crack.jpg"],
    },
    {
      id: 8,
      type: "Debris",
      severity: 6.2,
      lat: 40.5012,
      lng: -74.3456,
      location: "Rahway Ave, Woodbridge, NJ",
      time: "4 hours ago",
      timestamp: new Date(Date.now() - 240 * 60 * 1000),
      description: "Road debris detected on Rahway Avenue requiring cleanup to maintain safe driving conditions.",
      status: "Accepted",
      photos: ["/debris-on-road.jpg", "/debris-on-road.jpg", "/debris-on-road.jpg"],
    },
    {
      id: 9,
      type: "Pothole",
      severity: 8.9,
      lat: 40.4789,
      lng: -74.4012,
      location: "Middlesex Ave, Metuchen, NJ",
      time: "5 hours ago",
      timestamp: new Date(Date.now() - 300 * 60 * 1000),
      description:
        "Severe pothole damage on Middlesex Avenue requiring urgent repair to prevent further deterioration.",
      status: "In Progress",
      photos: ["/pothole-in-road.png", "/pothole-in-road.png", "/pothole-in-road.png"],
    },
    {
      id: 10,
      type: "Road Crack",
      severity: 4.5,
      lat: 40.5345,
      lng: -74.3678,
      location: "St Georges Ave, Rahway, NJ",
      time: "6 hours ago",
      timestamp: new Date(Date.now() - 360 * 60 * 1000),
      description: "Moderate crack formation on St Georges Avenue requiring monitoring and scheduled maintenance.",
      status: "Delivered",
      photos: ["/road-crack.jpg", "/road-crack.jpg", "/road-crack.jpg"],
    },
  ]

  const filteredAnomalies = anomalies
    .filter((a) => {
      const matchesSearch =
        a.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.location.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesSeverity =
        filterSeverity === "all" ||
        (filterSeverity === "high" && a.severity >= 7) ||
        (filterSeverity === "medium" && a.severity >= 5 && a.severity < 7) ||
        (filterSeverity === "low" && a.severity < 5)
      return matchesSearch && matchesSeverity
    })
    .sort((a, b) => {
      if (sortBy === "time") {
        return b.timestamp.getTime() - a.timestamp.getTime()
      }
      return b.severity - a.severity
    })

  const selectedAnomaly = selectedId ? anomalies.find((a) => a.id === Number.parseInt(selectedId)) : null

  const handleSignOut = () => {
    localStorage.removeItem("userPhone")
    router.push("/auth")
  }

  const generatePDF = (anomaly: (typeof anomalies)[0]) => {
    alert(`Generating PDF for ${anomaly.type} at ${anomaly.location}`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-blue-500 text-white"
      case "In Progress":
        return "bg-yellow-500 text-foreground"
      case "Denied":
        return "bg-red-500 text-white"
      case "Accepted":
        return "bg-green-500 text-white"
      case "Fixed":
        return "bg-purple-500 text-white"
      default:
        return "bg-muted text-foreground"
    }
  }

  useEffect(() => {
    if (selectedAnomaly) {
      const interval = setInterval(() => {
        setCurrentPhotoIndex((prev) => (prev + 1) % selectedAnomaly.photos.length)
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [selectedAnomaly])

  return (
    <main className="min-h-screen bg-background">
      <header className="bg-card border-b-4 border-foreground">
        <div className="container px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary border-4 border-foreground flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-6 h-6 text-background"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold">RoadWatch</h1>
            </div>
            <div className="flex items-center gap-4">
              {userPhone && (
                <div className="text-sm">
                  <span className="text-muted-foreground">Account: </span>
                  <span className="font-bold">+1 {userPhone}</span>
                </div>
              )}
              <Button
                onClick={handleSignOut}
                variant="outline"
                size="sm"
                className="border-4 border-foreground shadow-brutal hover:bg-destructive hover:text-destructive-foreground hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all bg-transparent"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-muted border-b-4 border-foreground">
        <div className="container px-4">
          <div className="flex gap-2">
            <button
              onClick={() => router.push("/dashboard")}
              className="px-6 py-3 font-bold border-4 border-b-0 border-foreground bg-muted text-muted-foreground hover:bg-background/50 transition-all"
            >
              Map
            </button>
            <button className="px-6 py-3 font-bold border-4 border-b-0 border-foreground bg-background text-foreground -mb-1">
              Anomalies
            </button>
            <button
              onClick={() => router.push("/dashboard/stats")}
              className="px-6 py-3 font-bold border-4 border-b-0 border-foreground bg-muted text-muted-foreground hover:bg-background/50 transition-all"
            >
              Stats
            </button>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8">
        {selectedAnomaly ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Button
              onClick={() => router.push("/dashboard/anomalies")}
              variant="outline"
              className="mb-6 border-4 border-foreground shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              ← Back to All Anomalies
            </Button>

            <div className="bg-card border-4 border-foreground shadow-brutal-xl p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{selectedAnomaly.type}</h1>
                  <p className="text-xl text-muted-foreground">{selectedAnomaly.location}</p>
                  <p className="text-sm text-muted-foreground mt-1">{selectedAnomaly.time}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`px-4 py-2 border-4 border-foreground font-bold text-lg ${
                      selectedAnomaly.severity >= 7
                        ? "bg-red-500 text-white"
                        : selectedAnomaly.severity >= 5
                          ? "bg-yellow-500 text-foreground"
                          : "bg-green-500 text-white"
                    }`}
                  >
                    Severity: {selectedAnomaly.severity.toFixed(1)}
                  </span>
                  <Button
                    onClick={() => generatePDF(selectedAnomaly)}
                    className="border-4 border-foreground shadow-brutal hover:bg-primary hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Generate PDF
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Description</h3>
                  <p className="text-lg leading-relaxed mb-6">{selectedAnomaly.description}</p>

                  <h3 className="text-2xl font-bold mb-4">Report Status</h3>
                  <div className="bg-muted border-4 border-foreground p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold">Office of Public Works - Middlesex County</span>
                      <span
                        className={`px-3 py-1 border-2 border-foreground font-bold ${getStatusColor(selectedAnomaly.status)}`}
                      >
                        {selectedAnomaly.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Automatic report generated and submitted to local authorities
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4">Photo Evidence</h3>
                  <div className="relative aspect-video bg-muted border-4 border-foreground overflow-hidden">
                    <motion.div
                      key={currentPhotoIndex}
                      initial={{ rotateY: 90, scale: 0.8 }}
                      animate={{ rotateY: 0, scale: 1 }}
                      exit={{ rotateY: -90, scale: 0.8 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                    >
                      <img
                        src={selectedAnomaly.photos[currentPhotoIndex] || "/placeholder.svg"}
                        alt={`${selectedAnomaly.type} photo ${currentPhotoIndex + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <div className="absolute bottom-4 right-4 bg-background/90 border-2 border-foreground px-3 py-1 font-bold">
                      {currentPhotoIndex + 1} / {selectedAnomaly.photos.length}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Location Map</h3>
                  <div className="aspect-video border-4 border-foreground overflow-hidden">
                    {isLoaded && (
                      <GoogleMap
                        mapContainerStyle={{ width: "100%", height: "100%" }}
                        center={{ lat: selectedAnomaly.lat, lng: selectedAnomaly.lng }}
                        zoom={15}
                        options={{
                          disableDefaultUI: true,
                          zoomControl: true,
                        }}
                      >
                        <Marker position={{ lat: selectedAnomaly.lat, lng: selectedAnomaly.lng }} />
                      </GoogleMap>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4">Street View</h3>
                  <div className="aspect-video border-4 border-foreground overflow-hidden">
                    {isLoaded && (
                      <GoogleMap
                        mapContainerStyle={{ width: "100%", height: "100%" }}
                        center={{ lat: selectedAnomaly.lat, lng: selectedAnomaly.lng }}
                        zoom={15}
                        options={{
                          disableDefaultUI: true,
                        }}
                      >
                        <StreetViewPanorama
                          position={{ lat: selectedAnomaly.lat, lng: selectedAnomaly.lng }}
                          visible={true}
                          options={{
                            disableDefaultUI: true,
                          }}
                        />
                      </GoogleMap>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="bg-card border-4 border-foreground shadow-brutal-xl p-6 mb-6">
              <h1 className="text-3xl font-bold mb-6">All Detected Anomalies</h1>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search anomalies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-4 border-foreground bg-background focus:bg-accent focus:outline-none transition-colors font-bold"
                  />
                </div>

                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <select
                    value={filterSeverity}
                    onChange={(e) => setFilterSeverity(e.target.value as any)}
                    className="w-full pl-10 pr-4 py-3 border-4 border-foreground bg-background focus:bg-accent focus:outline-none transition-colors font-bold appearance-none"
                  >
                    <option value="all">All Severities</option>
                    <option value="high">High (7.0+)</option>
                    <option value="medium">Medium (5.0-6.9)</option>
                    <option value="low">Low (&lt;5.0)</option>
                  </select>
                </div>

                <div className="relative">
                  <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full pl-10 pr-4 py-3 border-4 border-foreground bg-background focus:bg-accent focus:outline-none transition-colors font-bold appearance-none"
                  >
                    <option value="time">Sort by Time</option>
                    <option value="severity">Sort by Severity</option>
                  </select>
                </div>
              </div>

              <div className="text-sm text-muted-foreground mb-4">
                Showing {filteredAnomalies.length} of {anomalies.length} anomalies
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAnomalies.map((anomaly) => (
                <motion.button
                  key={anomaly.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => router.push(`/dashboard/anomalies?id=${anomaly.id}`)}
                  className="bg-card border-4 border-foreground shadow-brutal-lg hover:shadow-brutal-xl hover:translate-x-1 hover:translate-y-1 transition-all p-6 text-left"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">{anomaly.type}</h3>
                    <span
                      className={`px-3 py-1 border-2 border-foreground font-bold text-sm ${
                        anomaly.severity >= 7
                          ? "bg-red-500 text-white"
                          : anomaly.severity >= 5
                            ? "bg-yellow-500 text-foreground"
                            : "bg-green-500 text-white"
                      }`}
                    >
                      {anomaly.severity.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{anomaly.location}</p>
                  <p className="text-xs text-muted-foreground mb-4">{anomaly.time}</p>
                  <div
                    className={`inline-block px-3 py-1 border-2 border-foreground text-xs font-bold ${getStatusColor(anomaly.status)}`}
                  >
                    {anomaly.status}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </main>
  )
}

export default function AnomaliesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AnomaliesContent />
    </Suspense>
  )
}
