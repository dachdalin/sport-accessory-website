"use client"

import { useEffect, useRef, useState } from "react"
import { LifeBuoy, ChevronLeft, Plus, Send } from "lucide-react"
import {
  MOCK_TICKETS,
  ticketStatusClass,
  type SupportTicket,
  type TicketCategory,
  type TicketMessage,
} from "@/lib/dashboard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const CATEGORIES: TicketCategory[] = ["Order Issue", "Payment", "Shipping", "Product", "Other"]

const ACK_MESSAGES: Record<TicketCategory, string> = {
  "Order Issue": "Thanks for reaching out — we've located your order and are checking with our fulfillment team.",
  Payment: "Got it, we're verifying this with our payment processor now and will follow up shortly.",
  Shipping: "Thanks for the heads up — we're checking with the courier on this shipment.",
  Product: "Thanks for flagging this — our product team has been notified and is looking into it.",
  Other: "Thanks for reaching out! Our team will take a look and get back to you shortly.",
}

const FOLLOWUP_MESSAGES = [
  "Thanks for the extra details — we're looking into this now and will update you soon.",
  "Got it, appreciate you following up. We'll check on this and reply shortly.",
  "Thanks! Passing this along to the right team, we'll get back to you soon.",
]

function TicketRow({ ticket, onSelect }: { ticket: SupportTicket; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-border bg-muted/30 p-4 hover:border-orange-500/20 transition-colors text-left"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="h-10 w-10 rounded-lg bg-orange-500/15 flex items-center justify-center flex-shrink-0">
          <LifeBuoy className="h-5 w-5 text-orange-600 dark:text-orange-400" />
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-foreground text-sm truncate">{ticket.subject}</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {ticket.id} · {ticket.category} · {ticket.date}
          </p>
        </div>
      </div>
      <span className={`text-xs font-medium px-2.5 py-1 rounded-full self-start sm:self-auto flex-shrink-0 ${ticketStatusClass(ticket.status)}`}>
        {ticket.status}
      </span>
    </button>
  )
}

function TicketThread({ messages, adminTyping }: { messages: TicketMessage[]; adminTyping?: boolean }) {
  return (
    <div className="space-y-3">
      {messages.map((m) => (
        <div
          key={m.id}
          className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
              m.from === "user"
                ? "bg-orange-500 text-white rounded-br-sm"
                : "bg-muted text-foreground rounded-bl-sm"
            }`}
          >
            <p className="leading-relaxed">{m.message}</p>
            <p className={`text-[10px] mt-1 ${m.from === "user" ? "text-white/70" : "text-muted-foreground"}`}>
              {m.from === "user" ? "You" : "Admin"} · {m.date}
            </p>
          </div>
        </div>
      ))}
      {adminTyping && (
        <div className="flex justify-start">
          <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-muted px-4 py-2.5 text-sm flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:-0.3s]" />
            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:-0.15s]" />
            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce" />
          </div>
        </div>
      )}
    </div>
  )
}

function TicketDetail({
  ticket,
  onBack,
  onReply,
  adminTyping,
}: {
  ticket: SupportTicket
  onBack: () => void
  onReply: (message: string) => void
  adminTyping: boolean
}) {
  const [reply, setReply] = useState("")
  const closed = ticket.status === "Closed" || ticket.status === "Resolved"

  function submit() {
    if (!reply.trim()) return
    onReply(reply.trim())
    setReply("")
  }

  return (
    <div className="space-y-4">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Support Tickets
      </button>

      <div className="rounded-2xl border border-border bg-card/80 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
              {ticket.subject}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {ticket.id} · {ticket.category} · Opened {ticket.date}
            </p>
          </div>
          <span className={`text-xs font-semibold px-3 py-1.5 rounded-full self-start sm:self-auto ${ticketStatusClass(ticket.status)}`}>
            {ticket.status}
          </span>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card/80 p-5">
        <TicketThread messages={ticket.messages} adminTyping={adminTyping} />

        {closed ? (
          <p className="text-xs text-muted-foreground text-center mt-4 pt-4 border-t border-border">
            This ticket is {ticket.status.toLowerCase()} and no longer accepts replies.
          </p>
        ) : (
          <div className="flex items-end gap-2 mt-4 pt-4 border-t border-border">
            <Textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Type a reply…"
              className="min-h-10 resize-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  submit()
                }
              }}
            />
            <Button
              onClick={submit}
              disabled={!reply.trim()}
              className="bg-orange-500 hover:bg-orange-600 text-white h-9 w-9 p-0 flex-shrink-0"
              aria-label="Send reply"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

function NewTicketForm({
  onCancel,
  onCreate,
}: {
  onCancel: () => void
  onCreate: (subject: string, category: TicketCategory, message: string) => void
}) {
  const [subject, setSubject] = useState("")
  const [category, setCategory] = useState<TicketCategory>("Order Issue")
  const [message, setMessage] = useState("")

  const canSubmit = subject.trim().length > 0 && message.trim().length > 0

  return (
    <div className="rounded-2xl border border-border bg-card/80 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
          New Support Ticket
        </h2>
        <Button size="sm" variant="ghost" onClick={onCancel} className="text-muted-foreground hover:text-foreground h-8">
          Cancel
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="ticket-subject">Subject</Label>
          <Input
            id="ticket-subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Briefly describe your issue"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="ticket-category">Category</Label>
          <Select value={category} onValueChange={(v) => setCategory(v as TicketCategory)}>
            <SelectTrigger id="ticket-category" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="ticket-message">Message</Label>
          <Textarea
            id="ticket-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us more about what happened…"
            className="min-h-28"
          />
        </div>

        <Button
          onClick={() => onCreate(subject.trim(), category, message.trim())}
          disabled={!canSubmit}
          className="bg-orange-500 hover:bg-orange-600 text-white w-full sm:w-auto"
        >
          Submit Ticket
        </Button>
      </div>
    </div>
  )
}

export function SupportSection() {
  const [tickets, setTickets] = useState<SupportTicket[]>(MOCK_TICKETS)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [creating, setCreating] = useState(false)
  const [typingId, setTypingId] = useState<string | null>(null)
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    return () => timeouts.current.forEach(clearTimeout)
  }, [])

  const selectedTicket = tickets.find((t) => t.id === selectedId)

  function appendMessage(ticketId: string, from: TicketMessage["from"], message: string, nextStatus?: SupportTicket["status"]) {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? {
              ...t,
              status: nextStatus ?? t.status,
              messages: [...t.messages, { id: `m${t.messages.length + 1}`, from, message, date: "Just now" }],
            }
          : t
      )
    )
  }

  function queueAdminReply(ticketId: string, message: string, nextStatus?: SupportTicket["status"]) {
    setTypingId(ticketId)
    const timeout = setTimeout(() => {
      setTypingId((current) => (current === ticketId ? null : current))
      appendMessage(ticketId, "support", message, nextStatus)
    }, 1200 + Math.random() * 800)
    timeouts.current.push(timeout)
  }

  function createTicket(subject: string, category: TicketCategory, message: string) {
    const id = `#TCK-${Math.floor(1000 + Math.random() * 9000)}`
    const newTicket: SupportTicket = {
      id,
      subject,
      category,
      status: "Open",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      messages: [
        { id: "m1", from: "user", message, date: "Just now" },
      ],
    }
    setTickets((prev) => [newTicket, ...prev])
    setCreating(false)
    setSelectedId(id)
    queueAdminReply(id, ACK_MESSAGES[category], "In Progress")
  }

  function addReply(message: string) {
    if (!selectedTicket) return
    const ticketId = selectedTicket.id
    appendMessage(ticketId, "user", message, selectedTicket.status === "Open" ? "In Progress" : undefined)
    const followUp = FOLLOWUP_MESSAGES[Math.floor(Math.random() * FOLLOWUP_MESSAGES.length)]
    queueAdminReply(ticketId, followUp)
  }

  if (selectedTicket) {
    return (
      <TicketDetail
        ticket={selectedTicket}
        onBack={() => setSelectedId(null)}
        onReply={addReply}
        adminTyping={typingId === selectedTicket.id}
      />
    )
  }

  if (creating) {
    return <NewTicketForm onCancel={() => setCreating(false)} onCreate={createTicket} />
  }

  return (
    <div className="rounded-2xl border border-border bg-card/80 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
          Support Tickets
          {tickets.length > 0 && (
            <span className="ml-2 text-sm font-normal text-muted-foreground">({tickets.length})</span>
          )}
        </h2>
        <Button
          size="sm"
          onClick={() => setCreating(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white gap-1.5 h-8"
        >
          <Plus className="h-3.5 w-3.5" />
          New Ticket
        </Button>
      </div>

      {tickets.length === 0 ? (
        <div className="flex flex-col items-center py-16 text-center">
          <LifeBuoy className="h-12 w-12 text-muted-foreground/40 mb-3" />
          <p className="text-sm text-muted-foreground mb-4">You have no support tickets yet.</p>
          <Button onClick={() => setCreating(true)} className="bg-orange-500 hover:bg-orange-600 text-white">
            Open a Ticket
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {tickets.map((ticket) => (
            <TicketRow key={ticket.id} ticket={ticket} onSelect={() => setSelectedId(ticket.id)} />
          ))}
        </div>
      )}
    </div>
  )
}
