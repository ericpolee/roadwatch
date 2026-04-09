"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AuthPage() {
  const [phone, setPhone] = useState(["", "", "", "", "", "", "", "", "", ""])
  const [step, setStep] = useState<"phone" | "verify">("phone")
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const router = useRouter()

  const handlePhoneInput = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newPhone = [...phone]
      newPhone[index] = value
      setPhone(newPhone)

      if (value && index < 9) {
        const nextInput = document.getElementById(`phone-${index + 1}`)
        nextInput?.focus()
      }
    }
  }

  const handleCodeInput = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code]
      newCode[index] = value
      setCode(newCode)

      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`)
        nextInput?.focus()
      }
    }
  }

  const handlePhoneSubmit = () => {
    if (phone.every((digit) => digit !== "")) {
      localStorage.setItem("userPhone", phone.join(""))
      setStep("verify")
    }
  }

  const handleVerifySubmit = () => {
    if (code.every((digit) => digit !== "")) {
      router.push("/dashboard")
    }
  }

  return (
    <main className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary">
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 35px,
              rgba(0, 0, 0, 0.1) 35px,
              rgba(0, 0, 0, 0.1) 70px
            )`,
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
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-background/20" />
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-background/40 to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-card border-4 border-foreground shadow-brutal-xl p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-primary border-4 border-foreground flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-8 h-8 text-background"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold">RoadWatch</h1>
          </div>

          {step === "phone" ? (
            <>
              <h2 className="text-2xl font-bold mb-2">Enter Your Phone</h2>
              <p className="text-muted-foreground mb-8">We'll send you a verification code</p>

              <div className="mb-8">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xl font-bold text-muted-foreground">+1</span>
                  <div className="flex gap-1.5">
                    {phone.map((digit, index) => (
                      <input
                        key={index}
                        id={`phone-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handlePhoneInput(index, e.target.value)}
                        className="w-9 h-12 text-center text-xl font-bold border-4 border-foreground bg-background focus:bg-accent focus:outline-none transition-colors"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <Button
                onClick={handlePhoneSubmit}
                disabled={phone.some((digit) => digit === "")}
                className="w-full text-lg py-6 border-4 border-foreground shadow-brutal-lg hover:bg-primary hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </Button>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-2">Enter Verification Code</h2>
              <p className="text-muted-foreground mb-8">Sent to +1 {phone.join("")}</p>

              <div className="flex gap-3 mb-8 justify-center">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeInput(index, e.target.value)}
                    className="w-14 h-16 text-center text-3xl font-bold border-4 border-foreground bg-background focus:bg-accent focus:outline-none transition-colors"
                  />
                ))}
              </div>

              <Button
                onClick={handleVerifySubmit}
                disabled={code.some((digit) => digit === "")}
                className="w-full text-lg py-6 border-4 border-foreground shadow-brutal-lg hover:bg-primary hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Verify & Continue
              </Button>

              <button
                onClick={() => setStep("phone")}
                className="w-full mt-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                Change phone number
              </button>
            </>
          )}
        </div>
      </motion.div>
    </main>
  )
}
