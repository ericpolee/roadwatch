"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { AlertTriangle, DollarSign, MapPin } from "lucide-react"

const stats = [
  {
    icon: AlertTriangle,
    value: "2M+",
    label: "Annual crashes due to poor road maintenance",
  },
  {
    icon: DollarSign,
    value: "$3B+",
    label: "In insurance claims filed every year",
  },
  {
    icon: MapPin,
    value: "80%",
    label: "Of potholes go unreported",
  },
]

export function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 bg-muted">
      <div className="container px-4">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-background rounded-none border-4 border-foreground p-8 text-center shadow-brutal-lg"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary border-4 border-foreground mb-6">
                <stat.icon className="w-8 h-8 text-background" />
              </div>
              <div className="text-5xl font-bold text-primary mb-3">{stat.value}</div>
              <p className="text-lg text-foreground leading-relaxed">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
