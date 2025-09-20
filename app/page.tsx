"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
/* removed next/image import; using plain <img> for hero to avoid domain/config constraints */
import { useRouter } from "next/navigation"
import { propertiesApi } from "@/lib/api/client"
import { PropertyCard } from "@/components/marketplace/property-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Instagram, Linkedin, Home as HomeIcon, ChevronLeft, ChevronRight } from "lucide-react"

type NoteProps = { title: string; desc: string; className?: string }

function GlassNote({ title, desc, className }: NoteProps) {
  return (
    <div
      className={[
        "rounded-2xl border border-white/15 bg-white/10 text-white shadow-xl backdrop-blur-md",
        "px-4 py-3 w-[260px] max-w-[70vw]",
        className || "",
      ].join(" ")}
    >
      <h4 className="text-sm font-semibold leading-tight">{title}</h4>
      <p className="mt-1 text-[11px] leading-relaxed text-white/80">{desc}</p>
    </div>
  )
}

export default function HomePage() {
  const [featuredProperties, setFeaturedProperties] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Hero carousel state and derived data
  const [heroIndex, setHeroIndex] = useState(0)
  const heroItems = featuredProperties && featuredProperties.length > 0 ? featuredProperties.slice(0, 8) : []
  const currentHero = heroItems.length > 0 ? heroItems[heroIndex % heroItems.length] : null
  const heroImage =
    (currentHero?.images && currentHero.images.length > 0 && currentHero.images[0]) || "/luxury-beach-house.png"
  const heroTitle = currentHero?.title || "Discover the difference with TitleBase"
  const heroLocation = currentHero?.address || "Premium Real‑Estate NFTs"
  const heroPrice = currentHero?.listing_price ? `${currentHero.listing_price} ETH` : undefined
  const primaryCtaLabel = currentHero?.listing_type === "auction" ? "Bid Now" : "View Property"

  useEffect(() => {
    if (heroItems.length > 1) {
      const id = setInterval(() => setHeroIndex((i: number) => (i + 1) % heroItems.length), 6000)
      return () => clearInterval(id)
    }
  }, [heroItems.length])

  const prevHero = () =>
    setHeroIndex((i: number) => (i - 1 + (heroItems.length || 1)) % (heroItems.length || 1))
  const nextHero = () =>
    setHeroIndex((i: number) => (i + 1) % (heroItems.length || 1))

  useEffect(() => {
    fetchFeaturedProperties()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchFeaturedProperties = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await propertiesApi.getProperties({ status: "verified", limit: 8 })
      setFeaturedProperties((response as any).properties || [])
    } catch (err) {
      console.error("Failed to fetch featured properties", err)
      setError("Failed to load featured properties. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading featured properties...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Cinematic Hero */}
      <section className="relative h-[88vh] min-h-[560px] overflow-hidden bg-black">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black to-black" />
        <img
          src={heroImage}
          alt={currentHero?.title || "Hero property"}
          loading="eager"
          className="absolute inset-0 z-10 h-full w-full object-cover transition-opacity duration-700"
        />
        <div className="absolute inset-0 z-20 bg-black/50 md:bg-black/35" />
 
        {/* Oversized watermark */}
        <div className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center">
          <span className="select-none text-[20vw] md:text-[16vw] leading-none font-black tracking-tight titlebase-animated opacity-25">
            TITLEBASE
          </span>
        </div>

        {/* Top meta */}
        <div className="absolute left-8 top-8 z-40 text-white/90 text-[11px] leading-5 uppercase tracking-widest">
          <p>Quality //</p>
          <p>Integrity //</p>
          <p>Assurance //</p>
        </div>
        

        {/* Glass notes (bound to currentHero) */}
        <div className="absolute inset-0 z-40">
          <div className="absolute left-[12%] top-[48%] hidden md:block">
            <div className="absolute -left-5 -top-5 h-2 w-2 rounded-full bg-white"></div>
            <GlassNote
              title={currentHero?.title || "Featured Property"}
              desc={(currentHero?.address as string) || "Explore curated listings"}
            />
          </div>
          <div className="absolute right-[12%] top-[52%] hidden md:block">
            <div className="absolute -left-5 -top-3 h-2 w-2 rounded-full bg-white"></div>
            <GlassNote
              title={currentHero?.listing_type === "auction" ? "Auction" : "Fixed Price"}
              desc={
                heroPrice
                  ? `Price: ${heroPrice}`
                  : currentHero?.assessed_value
                  ? `Assessed: NZD ${currentHero.assessed_value}`
                  : "Verified listing"
              }
            />
          </div>
        </div>

        {/* Hero content (relative, always visible) */}
        <div className="relative z-40 h-full">
          <div className="container mx-auto h-full px-4">
            <div className="flex h-full flex-col gap-6 justify-end md:flex-row md:items-end md:justify-between py-12 md:py-16">
              <div className="max-w-xl text-white">
                <h1 className="text-3xl md:text-5xl font-semibold">
                  {heroTitle}
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-white/80 text-sm">
                  <span className="truncate max-w-[70vw] md:max-w-md">{heroLocation}</span>
                  {heroPrice && (
                    <span className="rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-white">
                      {heroPrice}
                    </span>
                  )}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {currentHero ? (
                    <>
                      <Button asChild size="lg" className="backdrop-blur-md">
                        <Link href={`/property/${currentHero.id}`}>{primaryCtaLabel}</Link>
                      </Button>
                      <Button size="lg" variant="outline" onClick={() => router.push("/marketplace")}>
                        Browse All
                      </Button>
                    </>
                  ) : (
                    <Button asChild size="lg">
                      <Link href="/marketplace">Browse Marketplace</Link>
                    </Button>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {["House", "Apartment", "Residential", "Coastal"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => router.push(`/marketplace?search=${encodeURIComponent(tag)}`)}
                    className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur hover:bg-white/15"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Carousel controls */}
        {heroItems.length > 1 && (
          <>
            <div className="absolute inset-y-0 left-2 z-40 hidden sm:flex items-center">
              <button
                aria-label="Previous"
                onClick={prevHero}
                className="h-10 w-10 rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 backdrop-blur flex items-center justify-center"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            </div>
            <div className="absolute inset-y-0 right-2 z-40 hidden sm:flex items-center">
              <button
                aria-label="Next"
                onClick={nextHero}
                className="h-10 w-10 rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 backdrop-blur flex items-center justify-center"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div className="absolute bottom-6 left-1/2 z-40 -translate-x-1/2 flex gap-2">
              {heroItems.map((_, i) => (
                <button
                  key={`dot-${i}`}
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => setHeroIndex(i)}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${i === heroIndex ? "bg-white" : "bg-white/40"}`}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {/* Editorial intro */}
      <section className="relative py-14 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Invest in Premium Property NFTs
          </h2>
          <p className="mt-3 text-muted-foreground max-w-3xl mx-auto">
            Discover fractional ownership opportunities in real estate through secure blockchain technology.
            Start your investment journey today.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="relative py-14">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h3 className="text-2xl md:text-3xl font-semibold">How it works</h3>
            <p className="mt-2 text-muted-foreground">Three steps from idea to income.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="relative rounded-2xl border border-white/10 bg-background/70 p-6 backdrop-blur">
              <div className="absolute -top-3 left-6 rounded-full border border-white/10 bg-background/80 px-3 py-1 text-xs">
                01
              </div>
              <h4 className="mt-2 text-lg font-semibold">Verify & Tokenize</h4>
              <p className="mt-2 text-sm text-muted-foreground">
                Properties are legally verified and tokenized into NFTs for transparent on‑chain ownership.
              </p>
            </div>
            <div className="relative rounded-2xl border border-white/10 bg-background/70 p-6 backdrop-blur">
              <div className="absolute -top-3 left-6 rounded-full border border-white/10 bg-background/80 px-3 py-1 text-xs">
                02
              </div>
              <h4 className="mt-2 text-lg font-semibold">Fractional Invest</h4>
              <p className="mt-2 text-sm text-muted-foreground">
                Acquire fractions as NFTs to access income and appreciation with low friction.
              </p>
            </div>
            <div className="relative rounded-2xl border border-white/10 bg-background/70 p-6 backdrop-blur">
              <div className="absolute -top-3 left-6 rounded-full border border-white/10 bg-background/80 px-3 py-1 text-xs">
                03
              </div>
              <h4 className="mt-2 text-lg font-semibold">Automated Payouts</h4>
              <p className="mt-2 text-sm text-muted-foreground">
                Rental income is distributed to holders via audited smart contracts with real‑time tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Estates */}
      <section className="relative py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold">Featured Estates</h2>
              <p className="mt-2 text-muted-foreground">
                Curated homes with verified documentation and on‑chain distribution.
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href="/marketplace">View All</Link>
            </Button>
          </div>

          {error && (
            <Card className="mb-8">
              <CardContent className="py-4">
                <p className="text-destructive text-center">{error}</p>
              </CardContent>
            </Card>
          )}

          {featuredProperties.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {featuredProperties.map((property, idx) => {
                const firstImage =
                  property.images && property.images.length > 0 ? property.images[0] : "/placeholder.jpg"
                const isVerified = property.verification_status === "verified"
                const price = property.listing_price ? `${property.listing_price} ETH` : "Contact for Price"
                const isAuction = property.listing_type === "auction"
                const auctionEndTime = property.end_time
                const currentBid = property.listing_price ? `${property.listing_price} ETH` : undefined
                const assessedValue = property.assessed_value || "N/A"

                return (
                  <div key={`prop-${property.id}-${idx}`} className="group relative rounded-2xl border border-border p-[1px]">
                    <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-white/10 to-white/0 opacity-0 blur-sm transition-opacity group-hover:opacity-100" />
                    <div className="rounded-2xl bg-card/80 backdrop-blur">
                      <PropertyCard
                        id={property.id}
                        title={property.title || "Untitled Property"}
                        location={property.address || "Unknown Location"}
                        price={price}
                        assessedValue={assessedValue}
                        image={firstImage}
                        isVerified={isVerified}
                        isAuction={isAuction}
                        auctionEndTime={auctionEndTime}
                        currentBid={currentBid}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <HomeIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No Properties Available</h3>
                <p className="text-muted-foreground mb-4">Check back soon for new featured listings</p>
                <Button onClick={fetchFeaturedProperties} variant="outline">
                  Refresh
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Search */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-0">
              <div className="flex gap-2 p-6">
                <div className="relative flex-1">
                  <Input
                    placeholder="Search city, suburb, or property type..."
                    className="pl-3 pr-4"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const q = (e.currentTarget as HTMLInputElement).value
                        router.push(`/marketplace?search=${encodeURIComponent(q)}`)
                      }
                    }}
                  />
                </div>
                <Button onClick={() => router.push("/marketplace")}>Search</Button>
              </div>
            </CardContent>
          </Card>

          {/* Trust band */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
            <span className="rounded-full border border-white/10 bg-background/60 px-3 py-1 backdrop-blur">
              Audited Contracts
            </span>
            <span className="rounded-full border border-white/10 bg-background/60 px-3 py-1 backdrop-blur">
              Real‑time Income
            </span>
            <span className="rounded-full border border-white/10 bg-background/60 px-3 py-1 backdrop-blur">
              Global Access (KYC/AML)
            </span>
            <span className="rounded-full border border-white/10 bg-background/60 px-3 py-1 backdrop-blur">
              Institutional‑grade Custody
            </span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-fuchsia-500/10 via-cyan-500/10 to-emerald-400/10 p-8 md:p-10">
            <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-fuchsia-500/25 to-cyan-400/25 blur-3xl" />
            <div className="relative z-10 flex flex-col items-start gap-4 text-left md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-2xl md:text-3xl font-semibold">
                  Start your premium property NFT portfolio today
                </h3>
                <p className="mt-2 max-w-2xl text-muted-foreground">
                  Browse live listings or learn how TitleBase turns real estate into investable digital assets.
                </p>
              </div>
              <div className="flex gap-3">
                <Button asChild size="lg" className="relative group">
                  <Link href="/marketplace">
                    <span className="relative z-10">Browse Listings</span>
                    <span
                      aria-hidden
                      className="absolute inset-0 -z-10 rounded-md bg-gradient-to-r from-fuchsia-500/30 via-cyan-500/30 to-emerald-400/30 blur-xl"
                    />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="backdrop-blur">
                  <Link href="/support#help">How it works</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
