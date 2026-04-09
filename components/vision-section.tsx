"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Apple, Play, Users, Building2, Shield } from "lucide-react"

export function VisionSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-24 bg-muted">
      <div className="container px-4">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {[
            {
              icon: Users,
              title: "Proactive Drivers",
              description:
                "Join thousands of drivers who care about improving road conditions and developing safer communities.",
            },
            {
              icon: Building2,
              title: "Government Partnership",
              description: "Counties listening to their citizens to develop data-driven maintenance strategies.",
            },
            {
              icon: Shield,
              title: "Insurance Benefits",
              description:
                "Insurance companies encouraging careful driving with RoadWatch for safer roads and lower claims.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-background border-4 border-foreground p-8 text-center shadow-brutal-lg"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary border-4 border-foreground mb-6">
                <item.icon className="w-8 h-8 text-background" />
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-foreground/80 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-primary border-4 border-foreground p-12 md:p-16 text-center max-w-4xl mx-auto shadow-brutal-xl"
        >
          <p className="text-xl text-background mb-8 text-balance leading-relaxed font-bold">
            Download RoadWatch today and start driving toward safer roads for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-lg px-8 py-6 gap-2 bg-foreground text-background border-4 border-foreground shadow-brutal-lg hover:bg-primary hover:text-background hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              <Apple className="w-5 h-5" />
              Download on App Store
            </Button>
            <Button
              size="lg"
              className="text-lg px-8 py-6 gap-2 bg-foreground text-background border-4 border-foreground shadow-brutal-lg hover:bg-primary hover:text-background hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              <Play className="w-5 h-5" />
              Get it on Google Play
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
