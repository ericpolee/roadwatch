"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const roadSteps = [
  {
    letter: "R",
    title: "Recognize",
    description: "Anomalies on the road through dashcam footage",
    animation: "dashcam-scanning",
  },
  {
    letter: "O",
    title: "Observe",
    description: "Their location and severity of threat in real-time ",
    animation: "location-tracking",
  },
  {
    letter: "A",
    title: "Analyze",
    description: "The data holistically with machine learning",
    animation: "ml-processing",
  },
  {
    letter: "D",
    title: "Deliver",
    description: "Structured reports to government agencies",
    animation: "report-delivery",
  },
]

export function RoadSystemSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  })

  const lineColor = useTransform(scrollYProgress, [0, 1], ["rgba(0, 0, 0, 1)", "rgba(255, 107, 0, 1)"])

  return (
    <section ref={containerRef} className="relative py-24 bg-background">
      <div className="container px-4 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-balance mb-4">
            Meet the <span className="text-primary">R.O.A.D.</span> System
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto leading-relaxed">
            Our machine learning system that transforms how communities maintain their roads.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 origin-top"
            style={{
              backgroundColor: lineColor,
              scaleY: scrollYProgress,
            }}
          />
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-border -translate-x-1/2" />

          <div className="space-y-0">
            {roadSteps.map((step, index) => (
              <TimelineStep key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-16"
          style={{ transform: "rotate(180deg)" }}
        >
          <path
            className="bg-card"
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="#EDEDED"
          />
        </svg>
      </div>
    </section>
  )
}

function TimelineStep({ step, index }: { step: (typeof roadSteps)[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative grid md:grid-cols-2 items-center my-9 mx-0 gap-16"
    >
      <div className={`${isEven ? "md:order-1" : "md:order-2"} ${isEven ? "md:text-right" : "md:text-left"}`}>
        <div className="bg-card border-4 border-foreground shadow-brutal-lg p-8 mx-0">
          <div className={`flex items-center gap-4 mb-4 ${isEven ? "md:justify-end" : "md:justify-start"}`}>
            <div className="w-16 h-16 bg-primary border-4 border-foreground flex items-center justify-center">
              <span className="text-3xl font-bold text-background">{step.letter}</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold">{step.title}</h3>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">{step.description}</p>
        </div>
      </div>

      <div className={`${isEven ? "md:order-2" : "md:order-1"}`}>
        <div className="bg-muted border-4 border-foreground relative overflow-hidden shadow-brutal-lg w-full h-52">
          {step.animation === "dashcam-scanning" && <DashcamAnimation />}
          {step.animation === "location-tracking" && <LocationAnimation />}
          {step.animation === "ml-processing" && <MLProcessingAnimation />}
          {step.animation === "report-delivery" && <ReportAnimation />}
        </div>
      </div>

      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="absolute left-1/2 top-1/2 w-8 h-8 bg-primary border-4 border-background rounded-full -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block"
      />
    </motion.div>
  )
}

// Animation components
function DashcamAnimation() {
  return (
    <motion.div className="flex items-center justify-center bg-foreground/5 w-full h-full">
      <motion.div
        className="w-32 h-24 border-4 border-primary relative"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <motion.div
          className="absolute inset-0 border-2 border-accent"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary font-bold">SCAN</div>
      </motion.div>
    </motion.div>
  )
}

function LocationAnimation() {
  return (
    <motion.div className="w-full h-full flex items-center justify-center bg-foreground/5 relative mx-0">
      <motion.div
        className="w-4 h-4 bg-primary rounded-full"
        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        className="absolute w-16 h-16 border-4 border-primary rounded-full"
        animate={{ scale: [1, 2, 1], opacity: [0.8, 0, 0.8] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      />
    </motion.div>
  )
}

function MLProcessingAnimation() {
  return (
    <motion.div className="w-full h-full flex items-center justify-center bg-foreground/5 gap-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-12 h-12 bg-primary border-4 border-foreground"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
        />
      ))}
    </motion.div>
  )
}

function ReportAnimation() {
  return (
    <motion.div className="w-full h-full flex items-center justify-center bg-foreground/5">
      <motion.div
        className="w-32 h-40 bg-background border-4 border-foreground p-2"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 1 }}
      >
        <div className="space-y-2">
          <div className="h-2 bg-primary w-full" />
          <div className="h-2 bg-accent w-3/4" />
          <div className="h-2 bg-accent w-1/2" />
        </div>
      </motion.div>
    </motion.div>
  )
}
