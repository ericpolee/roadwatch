"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Apple, Play } from "lucide-react"
import { useState, useEffect } from "react"

const anomalyTypes = [
  { label: "Pothole Detected", color: "bg-primary", image: "/pothole-in-road.png" },
  { label: "Crack Detected", color: "bg-accent", image: "/road-crack.jpg" },
  { label: "Animal on Road", color: "bg-destructive", image: "/deer-on-road.jpg" },
  { label: "Debris Detected", color: "bg-accent", image: "/debris-on-road.jpg" },
  { label: "Traffic Light Malfunction", color: "bg-destructive", image: "/broken-traffic-light.png" },
]

export function HeroSection() {
  const [currentAnomaly, setCurrentAnomaly] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnomaly((prev) => (prev + 1) % anomalyTypes.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary">
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(0,0,0,.1) 35px, rgba(0,0,0,.1) 70px),
              repeating-linear-gradient(-45deg, transparent, transparent 35px, rgba(0,0,0,.05) 35px, rgba(0,0,0,.05) 70px)
            `,
          }}
          animate={{
            backgroundPosition: ["0px 0px", "100px 100px"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-transparent" />
      </div>

      <div className="container relative z-10 px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex items-center gap-8">
              <div className="w-16 h-16 bg-background rounded-none border-4 border-foreground shadow-brutal flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-10 h-10 text-foreground"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground">RoadWatch</h1>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative mb-12 max-w-5xl w-full"
          >
            <div className="relative w-full max-w-4xl mx-auto">
              <div className="relative bg-foreground border-4 border-foreground px-8 py-12">
                {/* Pothole in bottom left */}
                

                {/* Pothole in top right */}
                

                {/* Three lanes with text */}
                <div className="space-y-6">
                  {/* Top lane - WE ARE */}
                  <div className="relative border-b-4 border-dashed pb-6 border-muted">
                    <motion.div
                      initial={{ x: "-100%", opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                      className="text-3xl md:text-5xl lg:text-6xl font-bold text-background"
                    >
                      DRIVING TOWARDS
                    </motion.div>
                    {/* Left turn/straight arrow marking */}
                    
                  </div>

                  {/* Middle lane - DRIVING TOWARDS */}
                  <div className="relative border-b-4 border-dashed pb-6 border-chart-4">
                    <motion.div
                      initial={{ x: "-100%", opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                      className="text-3xl md:text-5xl lg:text-6xl font-bold text-background"
                    >
                      SAFER ROADS
                    </motion.div>
                  </div>

                  {/* Bottom lane - SAFER ROADS FOR EVERYONE */}
                  <div className="relative">
                    <motion.div
                      initial={{ x: "-100%", opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 1, delay: 1.1, ease: "easeOut" }}
                      className="text-3xl md:text-5xl lg:text-6xl font-bold text-background"
                    >
                      FOR EVERYONE
                    </motion.div>
                    {/* Right turn arrow marking */}
                    
                  </div>
                </div>
              </div>

              {/* Road edges */}
              <div className="absolute -left-2 top-0 bottom-0 w-2 bg-accent" />
              <div className="absolute -right-2 top-0 bottom-0 w-2 bg-accent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mb-20"
          >
            <Button
              size="lg"
              className="text-lg px-8 py-6 gap-2 border-4 border-foreground shadow-brutal-lg hover:bg-primary hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all bg-background text-foreground"
            >
              <Apple className="w-5 h-5" />
              Download on App Store
            </Button>
            <Button
              size="lg"
              className="text-lg px-8 py-6 gap-2 border-4 border-foreground shadow-brutal-lg hover:bg-primary hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all text-foreground bg-background"
            >
              <Play className="w-5 h-5" />
              Get it on Google Play
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="relative w-full max-w-4xl"
          >
            <div className="relative aspect-video bg-background rounded-none shadow-brutal-xl border-4 border-foreground p-6">
              <div className="relative w-full h-full overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentAnomaly}
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <img
                      src={anomalyTypes[currentAnomaly].image || "/placeholder.svg"}
                      alt={anomalyTypes[currentAnomaly].label}
                      className="w-full h-full object-cover"
                    />

                    {/* Bounding box animation */}
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64"
                    >
                      <motion.div
                        className="absolute inset-0 border-4 border-primary"
                        animate={{
                          boxShadow: [
                            "0 0 0 0 rgba(255, 107, 0, 0.4)",
                            "0 0 0 8px rgba(255, 107, 0, 0)",
                            "0 0 0 0 rgba(255, 107, 0, 0)",
                          ],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                      />

                      <div className="absolute top-0 left-0 w-8 h-8 border-t-8 border-l-8 border-primary" />
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-8 border-r-8 border-primary" />
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-8 border-l-8 border-primary" />
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-8 border-r-8 border-primary" />

                      <motion.div
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="absolute -top-12 left-0 bg-primary border-4 border-foreground px-4 py-2 font-bold text-background shadow-brutal"
                      >
                        {anomalyTypes[currentAnomaly].label}
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-16"
          style={{ transform: "rotate(180deg)" }}
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="#FFFFFF"
          />
        </svg>
      </div>
    </section>
  )
}
