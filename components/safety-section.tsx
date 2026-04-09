"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Bell, Phone } from "lucide-react"

export function SafetySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="container px-4">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-background border-4 border-foreground p-8 md:p-10 shadow-brutal-lg"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary border-4 border-foreground mb-6">
              <Bell className="w-8 h-8 text-background" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Critical Alerts</h3>
            <p className="text-foreground/80 leading-relaxed">
              When critical hazards like deer or debris are detected, RoadWatch immediately notifies you through
              auditory instructions—giving you precious seconds to react.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-background border-4 border-foreground p-8 md:p-10 shadow-brutal-lg"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary border-4 border-foreground mb-6">
              <Phone className="w-8 h-8 text-background" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Emergency Response</h3>
            <p className="text-foreground/80 leading-relaxed">
              In the event of a crash, RoadWatch automatically triggers a 911 call on your behalf and relays the
              appropriate footage to help officers on the scene.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
