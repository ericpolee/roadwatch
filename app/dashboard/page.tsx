"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

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
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"map" | "anomalies" | "stats">("map")
  const [userPhone, setUserPhone] = useState("")
  const router = useRouter()

  useEffect(() => {
    const phone = localStorage.getItem("userPhone")
    if (phone) {
      setUserPhone(phone)
    }
  }, [])

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  })

  const mapStyles = [
    {
      featureType: "all",
      elementType: "geometry",
      stylers: [{ color: "#242f3e" }],
    },
    {
      featureType: "all",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#242f3e" }],
    },
    {
      featureType: "all",
      elementType: "labels.text.fill",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca5b3" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f3d19c" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }],
    },
  ]

  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  }

  const center = {
    lat: 40.4862,
    lng: -74.4518,
  }

  const getMarkerIcon = (severity: number) => {
    const color = severity >= 7 ? "#ef4444" : severity >= 5 ? "#f59e0b" : "#22c55e"
    const svg = `
      <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="12" fill="${color}" stroke="#000000" strokeWidth="3"/>
      </svg>
    `
    return {
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
      scaledSize: isLoaded && window.google ? new window.google.maps.Size(32, 32) : undefined,
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem("userPhone")
    router.push("/auth")
  }

  if (loadError) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-8">
          <p className="text-lg font-bold mb-2">Error loading Google Maps</p>
          <p className="text-sm text-muted-foreground">Please check your API key and try again</p>
        </div>
      </main>
    )
  }

  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-8">
          <p className="text-lg font-bold mb-2">Google Maps API Key Required</p>
          <p className="text-sm text-muted-foreground">
            Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your environment variables
          </p>
        </div>
      </main>
    )
  }

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
              onClick={() => setActiveTab("map")}
              className={`px-6 py-3 font-bold border-4 border-b-0 border-foreground transition-all ${
                activeTab === "map"
                  ? "bg-background text-foreground -mb-1"
                  : "bg-muted text-muted-foreground hover:bg-background/50"
              }`}
            >
              Map
            </button>
            <button
              onClick={() => setActiveTab("anomalies")}
              className={`px-6 py-3 font-bold border-4 border-b-0 border-foreground transition-all ${
                activeTab === "anomalies"
                  ? "bg-background text-foreground -mb-1"
                  : "bg-muted text-muted-foreground hover:bg-background/50"
              }`}
            >
              Anomalies
            </button>
            <button
              onClick={() => setActiveTab("stats")}
              className={`px-6 py-3 font-bold border-4 border-b-0 border-foreground transition-all ${
                activeTab === "stats"
                  ? "bg-background text-foreground -mb-1"
                  : "bg-muted text-muted-foreground hover:bg-background/50"
              }`}
            >
              Stats
            </button>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8">
        {activeTab === "map" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid lg:grid-cols-3 gap-6"
          >
            <div className="lg:col-span-2">
              <div className="bg-card border-4 border-foreground shadow-brutal-xl p-6">
                <h2 className="text-2xl font-bold mb-4">Live Detection Map</h2>
                <div className="aspect-video border-4 border-foreground relative overflow-hidden">
                  {!isLoaded ? (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <p className="text-lg font-bold">Loading map...</p>
                    </div>
                  ) : (
                    <GoogleMap
                      mapContainerStyle={mapContainerStyle}
                      center={center}
                      zoom={11}
                      options={{
                        styles: mapStyles,
                        disableDefaultUI: true,
                        zoomControl: true,
                      }}
                    >
                      {anomalies.map((anomaly) => (
                        <Marker
                          key={anomaly.id}
                          position={{ lat: anomaly.lat, lng: anomaly.lng }}
                          icon={getMarkerIcon(anomaly.severity)}
                          onClick={() => router.push(`/dashboard/anomalies?id=${anomaly.id}`)}
                        />
                      ))}
                    </GoogleMap>
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className="bg-card border-4 border-foreground shadow-brutal-xl p-6">
                <h2 className="text-2xl font-bold mb-4">Recent Detections</h2>
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {anomalies.slice(0, 5).map((anomaly) => (
                    <motion.button
                      key={anomaly.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      onClick={() => router.push(`/dashboard/anomalies?id=${anomaly.id}`)}
                      className="w-full bg-muted border-4 border-foreground p-4 hover:bg-accent transition-colors text-left"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-lg">{anomaly.type}</span>
                        <span
                          className={`px-3 py-1 border-2 border-foreground font-bold ${
                            anomaly.severity >= 7
                              ? "bg-destructive text-destructive-foreground"
                              : anomaly.severity >= 5
                                ? "bg-accent text-accent-foreground"
                                : "bg-chart-2 text-chart-2-foreground"
                          }`}
                        >
                          {anomaly.severity.toFixed(1)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{anomaly.location}</p>
                      <p className="text-xs text-muted-foreground mt-1">{anomaly.time}</p>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "anomalies" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="text-center py-20">
              <p className="text-muted-foreground">Click on a marker or recent detection to view anomaly details</p>
            </div>
          </motion.div>
        )}

        {activeTab === "stats" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="text-center py-20">
              <p className="text-muted-foreground">Stats coming soon...</p>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  )
}
