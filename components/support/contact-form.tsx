"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail } from "lucide-react"

export function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  return (
    <form
      className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault()
        const mailto =
          "mailto:hello@titlebase.nz" +
          `?subject=${encodeURIComponent(subject || "TitleBase Support")}` +
          `&body=${encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\n${message || "Describe your issue here."}`,
          )}`
        window.location.href = mailto
      }}
    >
      <div className="grid md:grid-cols-2 gap-3">
        <Input placeholder="Your name" required value={name} onChange={(e) => setName(e.target.value)} />
        <Input
          type="email"
          placeholder="Your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <Input placeholder="Subject" required value={subject} onChange={(e) => setSubject(e.target.value)} />
      <Textarea
        placeholder="How can we help you?"
        required
        rows={5}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button type="submit" className="w-full md:w-auto">
        <Mail className="w-4 h-4 mr-2" />
        Send Email
      </Button>
    </form>
  )
}