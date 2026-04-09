"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Camera, Cpu, FileText } from "lucide-react"

export function MLVisualizationSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [isInView])

  return (
    <section ref={ref} className="py-24 bg-muted">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-balance mb-6">Powered by Advanced Machine Learning</h2>
          <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto leading-relaxed">
            Our YOLO Ensemble neural networks analyze dashcam footage in real-time to detect potholes, cracks, animals,
            debris, malfunctioning traffic lights, and more—all while you drive.
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-24 items-stretch">
            {/* Step 1: Dashcam */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex"
            >
              <div
                className={`bg-background border-4 border-foreground p-8 shadow-brutal-lg transition-all flex-1 flex flex-col ${
                  activeStep === 0 ? "scale-105 shadow-brutal-xl" : ""
                }`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary border-4 border-foreground flex items-center justify-center">
                    <Camera className="w-6 h-6 text-background" />
                  </div>
                  <h3 className="text-2xl font-bold">Dashcam Feed</h3>
                </div>

                <div className="relative aspect-video bg-muted border-4 border-foreground overflow-hidden flex-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-muted-foreground/20 to-muted-foreground/5" />
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 border-4 border-primary mx-auto mb-2" />
                      <div className="text-sm font-bold">LIVE FEED</div>
                    </div>
                  </motion.div>
                </div>

                {/* Data dots animation */}
                {activeStep === 0 && (
                  <div className="absolute -right-12 top-1/2 -translate-y-1/2 hidden lg:block">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-3 h-3 bg-accent border-2 border-foreground absolute"
                        initial={{ x: 0, opacity: 1 }}
                        animate={{ x: 200, opacity: 0 }}
                        transition={{
                          duration: 2,
                          delay: i * 0.2,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatDelay: 1.5,
                        }}
                        style={{ top: `${i * 8}px` }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative flex"
            >
              <div
                className={`bg-background border-4 border-foreground p-8 shadow-brutal-lg transition-all flex-1 flex flex-col ${
                  activeStep === 1 ? "scale-105 shadow-brutal-xl" : ""
                }`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-accent border-4 border-foreground flex items-center justify-center">
                    <Cpu className="w-6 h-6 text-background" />
                  </div>
                  <h3 className="text-2xl font-bold">YOLO Ensemble</h3>
                </div>

                <div className="space-y-4 flex-1">
                  {["Dashcam Footage", "Traffic Data", "Repair Estimations"].map((layer, i) => (
                    <div key={i} className="relative">
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-bold w-32">{layer}</div>
                        <div className="flex-1 h-8 border-4 border-foreground bg-muted relative overflow-hidden">
                          {activeStep === 1 && (
                            <motion.div
                              className="absolute inset-0 bg-accent"
                              initial={{ x: "-100%" }}
                              animate={{ x: "100%" }}
                              transition={{
                                duration: 1.5,
                                delay: i * 0.3,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatDelay: 1,
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <div className="inline-block bg-accent border-4 border-foreground px-4 py-2 font-bold">
                    ANALYZING...
                  </div>
                </div>

                {/* Data dots animation out */}
                {activeStep === 1 && (
                  <div className="absolute -right-12 top-1/2 -translate-y-1/2 hidden lg:block">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-3 h-3 bg-primary border-2 border-foreground absolute"
                        initial={{ x: 0, opacity: 1 }}
                        animate={{ x: 200, opacity: 0 }}
                        transition={{
                          duration: 2,
                          delay: i * 0.2 + 0.5,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatDelay: 1.5,
                        }}
                        style={{ top: `${i * 8}px` }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative flex"
            >
              <div
                className={`bg-background border-4 border-foreground p-8 shadow-brutal-lg transition-all flex-1 flex flex-col ${
                  activeStep === 2 ? "scale-105 shadow-brutal-xl" : ""
                }`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary border-4 border-foreground flex items-center justify-center">
                    <FileText className="w-6 h-6 text-background" />
                  </div>
                  <h3 className="text-2xl font-bold">Detection Report</h3>
                </div>

                <div className="mb-4 text-sm text-muted-foreground">
                  <p className="font-bold">SCORES: 1.0 to 10.0</p>
                  <p className="text-xs">(10.0 most severe, 1.0 not that bad)</p>
                </div>

                <div className="space-y-3 flex-1">
                  {[
                    { label: "Pothole", score: "9.4", severity: "high" },
                    { label: "Road Crack", score: "6.7", severity: "medium" },
                    { label: "Debris", score: "3.2", severity: "low" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={activeStep === 2 ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ delay: i * 0.2 }}
                      className="bg-muted border-4 border-foreground p-3 flex items-center justify-between"
                    >
                      <span className="font-bold">{item.label}</span>
                      <span
                        className={`border-2 border-foreground px-3 py-1 text-sm font-bold ${
                          item.severity === "high"
                            ? "bg-red-500 text-white"
                            : item.severity === "medium"
                              ? "bg-yellow-500 text-foreground"
                              : "bg-green-500 text-white"
                        }`}
                      >
                        {item.score}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 bg-accent border-4 border-foreground p-3 text-center font-bold">
                  REPORT SENT TO OFFICE
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
