"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export default function StatsPage() {
  const router = useRouter()
  const [userPhone, setUserPhone] = useState("")

  useEffect(() => {
    const phone = localStorage.getItem("userPhone")
    if (phone) {
      setUserPhone(phone)
    }
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem("userPhone")
    router.push("/auth")
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
              onClick={() => router.push("/dashboard")}
              className="px-6 py-3 font-bold border-4 border-b-0 border-foreground bg-muted text-muted-foreground hover:bg-background/50 transition-all"
            >
              Map
            </button>
            <button
              onClick={() => router.push("/dashboard/anomalies")}
              className="px-6 py-3 font-bold border-4 border-b-0 border-foreground bg-muted text-muted-foreground hover:bg-background/50 transition-all"
            >
              Anomalies
            </button>
            <button className="px-6 py-3 font-bold border-4 border-b-0 border-foreground bg-background text-foreground -mb-1">
              Stats
            </button>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
          <div className="bg-card border-4 border-foreground shadow-brutal-xl p-12">
            <h2 className="text-3xl font-bold mb-4">Statistics Dashboard</h2>
            <p className="text-xl text-muted-foreground">Coming soon...</p>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
