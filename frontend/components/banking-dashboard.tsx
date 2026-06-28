"use client"

import { useEffect, useMemo, useState } from "react"
import {
  ArrowDownLeft,
  ArrowUpRight,
  Bell,
  Briefcase,
  ChevronDown,
  CreditCard,
  Plane,
  Search,
  Settings,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  UtensilsCrossed,
  Wallet,
} from "lucide-react"

/* -------------------------------------------------------------------------- */
/*  Types & static data                                                        */
/* -------------------------------------------------------------------------- */

type CategoryKey = "food" | "travel" | "salary" | "misc"

const CATEGORIES: Record<
  CategoryKey,
  { label: string; icon: typeof UtensilsCrossed; dot: string; soft: string; text: string }
> = {
  food: {
    label: "Food & Dining",
    icon: UtensilsCrossed,
    dot: "bg-[var(--chart-1)]",
    soft: "bg-[color-mix(in_oklab,var(--chart-1)_14%,white)]",
    text: "text-[var(--chart-1)]",
  },
  travel: {
    label: "Travel",
    icon: Plane,
    dot: "bg-[var(--chart-2)]",
    soft: "bg-[color-mix(in_oklab,var(--chart-2)_14%,white)]",
    text: "text-[var(--chart-2)]",
  },
  salary: {
    label: "Salary",
    icon: Briefcase,
    dot: "bg-[var(--chart-3)]",
    soft: "bg-[color-mix(in_oklab,var(--chart-3)_14%,white)]",
    text: "text-[var(--chart-3)]",
  },
  misc: {
    label: "Miscellaneous",
    icon: ShoppingBag,
    dot: "bg-[var(--chart-4)]",
    soft: "bg-[color-mix(in_oklab,var(--chart-4)_16%,white)]",
    text: "text-[var(--chart-4)]",
  },
}

type Transaction = {
  id: string
  message: string
  merchant: string
  amount: number
  type: "debit" | "credit"
  category: CategoryKey
  date: string
  cashback?: number
}

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: "t1",
    message: "Payment to The Coffee Collective",
    merchant: "Coffee Collective",
    amount: 18.4,
    type: "debit",
    category: "food",
    date: "Today · 9:24 AM",
    cashback: 0.92,
  },
  {
    id: "t2",
    message: "Monthly salary credited",
    merchant: "Northwind Labs",
    amount: 5200,
    type: "credit",
    category: "salary",
    date: "Today · 8:00 AM",
  },
  {
    id: "t3",
    message: "Uber ride to airport",
    merchant: "Uber",
    amount: 42.75,
    type: "debit",
    category: "travel",
    date: "Yesterday · 6:12 PM",
    cashback: 2.1,
  },
  {
    id: "t4",
    message: "Dinner at Saffron Kitchen",
    merchant: "Saffron Kitchen",
    amount: 86.2,
    type: "debit",
    category: "food",
    date: "Yesterday · 1:40 PM",
  },
  {
    id: "t5",
    message: "Flight booking — London",
    merchant: "SkyAir",
    amount: 312.0,
    type: "debit",
    category: "travel",
    date: "Mar 12 · 11:05 AM",
    cashback: 9.4,
  },
  {
    id: "t6",
    message: "Amazon order — desk lamp",
    merchant: "Amazon",
    amount: 54.99,
    type: "debit",
    category: "misc",
    date: "Mar 11 · 4:18 PM",
    cashback: 1.65,
  },
  {
    id: "t7",
    message: "Grocery run at FreshMart",
    merchant: "FreshMart",
    amount: 124.3,
    type: "debit",
    category: "food",
    date: "Mar 10 · 7:50 PM",
  },
  {
    id: "t8",
    message: "Freelance project payout",
    merchant: "Studio Mono",
    amount: 880,
    type: "credit",
    category: "salary",
    date: "Mar 9 · 2:00 PM",
  },
  {
    id: "t9",
    message: "Train pass top-up",
    merchant: "Metro Transit",
    amount: 40.0,
    type: "debit",
    category: "travel",
    date: "Mar 8 · 8:30 AM",
    cashback: 1.2,
  },
  {
    id: "t10",
    message: "Bookstore purchase",
    merchant: "Paper & Co.",
    amount: 27.5,
    type: "debit",
    category: "misc",
    date: "Mar 7 · 5:45 PM",
  },
]

const currency = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 })

/* -------------------------------------------------------------------------- */
/*  Analytics card                                                             */
/* -------------------------------------------------------------------------- */

function AnalyticsCard({
  category,
  amount,
  delta,
  share,
}: {
  category: CategoryKey
  amount: number
  delta: number
  share: number
}) {
  const meta = CATEGORIES[category]
  const Icon = meta.icon
  const positive = delta >= 0

  return (
    <div className="group rounded-3xl border border-border bg-card p-5 shadow-[0_2px_12px_rgba(15,23,42,0.04)] transition-shadow hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
      <div className="flex items-center justify-between">
        <div className={`flex size-11 items-center justify-center rounded-2xl ${meta.soft}`}>
          <Icon className={`size-5 ${meta.text}`} aria-hidden="true" />
        </div>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
            positive ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
          }`}
        >
          {positive ? <ArrowUpRight className="size-3" /> : <ArrowDownLeft className="size-3" />}
          {Math.abs(delta)}%
        </span>
      </div>

      <p className="mt-4 text-sm font-medium text-muted-foreground">{meta.label}</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">{currency(amount)}</p>

      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div className={`h-full rounded-full ${meta.dot}`} style={{ width: `${share}%` }} />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{share}% of monthly activity</p>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Category dropdown                                                          */
/* -------------------------------------------------------------------------- */

function CategoryDropdown({
  value,
  onChange,
}: {
  value: CategoryKey
  onChange: (next: CategoryKey) => void
}) {
  const [open, setOpen] = useState(false)
  const meta = CATEGORIES[value]
  const Icon = meta.icon

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-secondary"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={`size-2 rounded-full ${meta.dot}`} aria-hidden="true" />
        {meta.label}
        <ChevronDown className="size-3.5 text-muted-foreground" aria-hidden="true" />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-2xl border border-border bg-popover p-1 shadow-[0_12px_40px_rgba(15,23,42,0.14)]"
        >
          {(Object.keys(CATEGORIES) as CategoryKey[]).map((key) => {
            const c = CATEGORIES[key]
            const CIcon = c.icon
            const active = key === value
            return (
              <li key={key}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    onChange(key)
                    setOpen(false)
                  }}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                    active ? "bg-secondary font-medium text-foreground" : "text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  <span className={`flex size-6 items-center justify-center rounded-lg ${c.soft}`}>
                    <CIcon className={`size-3.5 ${c.text}`} aria-hidden="true" />
                  </span>
                  {c.label}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Transaction row                                                            */
/* -------------------------------------------------------------------------- */

function TransactionRow({
  txn,
  onCategoryChange,
}: {
  txn: Transaction
  onCategoryChange: (id: string, next: CategoryKey) => void
}) {
  const meta = CATEGORIES[txn.category]
  const Icon = meta.icon
  const credit = txn.type === "credit"

  return (
    <div className="rounded-3xl border border-border bg-card p-4 shadow-[0_1px_8px_rgba(15,23,42,0.04)] transition-shadow hover:shadow-[0_8px_24px_rgba(15,23,42,0.07)]">
      <div className="flex items-start gap-4">
        <div className={`flex size-11 shrink-0 items-center justify-center rounded-2xl ${meta.soft}`}>
          <Icon className={`size-5 ${meta.text}`} aria-hidden="true" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">{txn.message}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{txn.date}</p>
            </div>
            <div className="text-right">
              <p
                className={`text-sm font-semibold tabular-nums ${
                  credit ? "text-success" : "text-foreground"
                }`}
              >
                {credit ? "+" : "−"}
                {currency(txn.amount)}
              </p>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${meta.soft} ${meta.text}`}
            >
              <span className={`size-1.5 rounded-full ${meta.dot}`} aria-hidden="true" />
              {meta.label}
            </span>
            <CategoryDropdown value={txn.category} onChange={(next) => onCategoryChange(txn.id, next)} />
          </div>

          {txn.cashback ? (
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
              <Sparkles className="size-3.5" aria-hidden="true" />
              Expected Savings · {currency(txn.cashback)}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Dashboard                                                                  */
/* -------------------------------------------------------------------------- */

export default function BankingDashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  async function loadTransactions() {
    try {
      const res = await fetch("http://localhost:5000/transactions")
      const data = await res.json()

      const mapped = data.map((t: any) => ({
        ...t,
        merchant: t.message,
        cashback: t.expectedSavings,
        date: "Today",
        category:
          t.category === "Food"
            ? "food"
            : t.category === "Travel"
            ? "travel"
            : t.category === "Salary"
            ? "salary"
            : "misc",
      }))

      setTransactions(mapped)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  loadTransactions()
}, [])

  const handleCategoryChange = (id: string, next: CategoryKey) =>
    setTransactions((prev) => prev.map((t) => (t.id === id ? { ...t, category: next } : t)))

  const analytics = useMemo(() => {
    const totals: Record<CategoryKey, number> = { food: 0, travel: 0, salary: 0, misc: 0 }
    for (const t of transactions) totals[t.category] += t.amount
    const grand = Object.values(totals).reduce((a, b) => a + b, 0) || 1
    const deltas: Record<CategoryKey, number> = { food: -4, travel: 12, salary: 6, misc: -2 }
    return (Object.keys(totals) as CategoryKey[]).map((key) => ({
      category: key,
      amount: totals[key],
      delta: deltas[key],
      share: Math.round((totals[key] / grand) * 100),
    }))
  }, [transactions])

  const balance = useMemo(
    () =>
      transactions.reduce((acc, t) => acc + (t.type === "credit" ? t.amount : -t.amount), 12450) ,
    [transactions],
  )
  const totalSavings = useMemo(
    () => transactions.reduce((acc, t) => acc + (t.cashback ?? 0), 0),
    [transactions],
  )
  if (loading) {
  return <div className="p-10">Loading...</div>
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:py-10">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Wallet className="size-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Welcome back,</p>
              <h1 className="text-lg font-semibold tracking-tight text-foreground">Alex Morgan</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-sm text-muted-foreground shadow-sm sm:flex">
              <Search className="size-4" aria-hidden="true" />
              <input
                className="w-32 bg-transparent outline-none placeholder:text-muted-foreground"
                placeholder="Search"
                aria-label="Search transactions"
              />
            </div>
            <button
              type="button"
              className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm transition-colors hover:bg-secondary"
              aria-label="Notifications"
            >
              <Bell className="size-4" />
            </button>
            <button
              type="button"
              className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm transition-colors hover:bg-secondary"
              aria-label="Settings"
            >
              <Settings className="size-4" />
            </button>
          </div>
        </header>

        {/* Balance hero */}
        <section className="mt-6 grid gap-4 lg:grid-cols-3">
          <div className="rounded-3xl bg-primary p-6 text-primary-foreground shadow-[0_12px_40px_rgba(30,58,138,0.25)] lg:col-span-2">
            <div className="flex items-center justify-between">
              <p className="text-sm/none opacity-80">Total balance</p>
              <CreditCard className="size-5 opacity-80" aria-hidden="true" />
            </div>
            <p className="mt-4 text-4xl font-semibold tracking-tight">{currency(balance)}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium">
                <TrendingUp className="size-3.5" aria-hidden="true" />
                +3.2% this month
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium">
                •••• 4827
              </span>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-success/10">
              <Sparkles className="size-5 text-success" aria-hidden="true" />
            </div>
            <p className="mt-4 text-sm font-medium text-muted-foreground">Expected savings</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">{currency(totalSavings)}</p>
            <p className="mt-2 text-xs text-muted-foreground">Cashback earned across recent activity</p>
          </div>
        </section>

        {/* Analytics cards */}
        <section className="mt-6">
          <h2 className="mb-3 text-sm font-semibold text-foreground">Spending analytics</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {analytics.map((a) => (
              <AnalyticsCard
                key={a.category}
                category={a.category}
                amount={a.amount}
                delta={a.delta}
                share={a.share}
              />
            ))}
          </div>
        </section>

        {/* Transaction timeline */}
        <section className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Recent transactions</h2>
            <span className="text-xs text-muted-foreground">{transactions.length} this period</span>
          </div>
          <div className="max-h-[560px] space-y-3 overflow-y-auto rounded-3xl border border-border bg-secondary/40 p-3 sm:p-4">
            {transactions.map((txn) => (
              <TransactionRow key={txn.id} txn={txn} onCategoryChange={handleCategoryChange} />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
