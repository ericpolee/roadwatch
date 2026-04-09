"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Bluetooth, Map, FileText, TrendingUp } from "lucide-react"

const features = [
  {
    icon: Bluetooth,
    title: "Easy Dashcam Integration",
    description:
      "Pair your modern dashcam via Bluetooth or use our affordable $50 Raspberry Pi solution. Setup takes minutes.",
  },
  {
    icon: Map,
    title: "Interactive Mapping",
    description:
      "Every detection is logged on our interactive map, helping local governments pinpoint areas in need of repair.",
  },
  {
    icon: FileText,
    title: "Automated Reporting",
    description: "Formal reports are automatically sent to Offices of Public Works with all the details they need.",
  },
  {
    icon: TrendingUp,
    title: "Smart Prioritization",
    description: "Traffic data and repair costs help assign severity levels for efficient maintenance scheduling.",
  },
]

export function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 bg-muted">
      <div className="container px-4">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="bg-background border-4 border-foreground p-8 shadow-brutal-lg"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary border-4 border-foreground mb-6">
                <feature.icon className="w-7 h-7 text-background" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-foreground/80 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
