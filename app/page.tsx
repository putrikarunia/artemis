"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  Settings,
  Camera,
  Headphones,
  RefreshCcw,
  ZoomIn,
  RotateCw,
  Redo2,
} from "lucide-react"

const initialTimelineItems = [
  {
    id: "riccioli",
    label: "9. Riccioli Crater",
    time: "20:38 GMT",
    defaultChecked: true,
    badges: ["camera"],
    dimmed: true,
  },
  {
    id: "swap-d",
    label: "d. Cabin Teams Swap",
    time: "20:52 GMT",
    defaultChecked: true,
    badges: ["team"],
    dimmed: true,
  },
  {
    id: "grimaldi",
    label: "10. Grimaldi Basin",
    time: "20:55 GMT",
    defaultChecked: true,
    badges: ["camera", "headphones"],
    dimmed: true,
  },
  {
    id: "glushko",
    label: "11. Glushko Crater (2/2)",
    time: "21:10 GMT",
    defaultChecked: true,
    badges: ["camera", "headphones"],
    dimmed: true,
  },
  {
    id: "orientale",
    label: "12. Orientale Basin",
    time: "21:18 GMT",
    defaultChecked: false,
    badges: ["headphones"],
    active: true,
  },
  {
    id: "hertzsprung",
    label: "13. Hertzsprung Basin",
    time: "21:34 GMT",
    defaultChecked: false,
    badges: [],
  },
  {
    id: "swap-e",
    label: "e. Window Team Position Swap",
    time: "21:41 GMT",
    defaultChecked: false,
    badges: ["team"],
  },
  {
    id: "crew-choice",
    label: "14. Crew Choice #2",
    time: "21:42 GMT",
    defaultChecked: false,
    badges: [],
  },
  {
    id: "discussion",
    label: "15. Discussion #4: Terminator",
    time: "21:50 GMT",
    defaultChecked: false,
    badges: ["headphones"],
  },
  {
    id: "swap-f",
    label: "f. Cabin and Window Teams Swap",
    time: "22:05 GMT",
    defaultChecked: false,
    badges: ["team"],
  },
  {
    id: "korolev",
    label: "16. Korolev Basin",
    time: "22:12 GMT",
    defaultChecked: false,
    badges: ["camera", "headphones"],
  },
  {
    id: "gagarin",
    label: "17. Gagarin Crater",
    time: "22:28 GMT",
    defaultChecked: false,
    badges: ["camera"],
  },
  {
    id: "discussion-5",
    label: "18. Discussion #5: Far Side",
    time: "22:35 GMT",
    defaultChecked: false,
    badges: ["headphones"],
  },
  {
    id: "tsiolkovsky",
    label: "19. Tsiolkovsky Crater",
    time: "22:48 GMT",
    defaultChecked: false,
    badges: ["camera", "headphones"],
  },
  {
    id: "swap-g",
    label: "g. All Teams Rotate",
    time: "23:00 GMT",
    defaultChecked: false,
    badges: ["team"],
  },
  {
    id: "crew-choice-3",
    label: "20. Crew Choice #3",
    time: "23:05 GMT",
    defaultChecked: false,
    badges: [],
  },
  {
    id: "aitken",
    label: "21. South Pole–Aitken Basin",
    time: "23:15 GMT",
    defaultChecked: false,
    badges: ["camera", "headphones"],
  },
]

const observationGuide = [
  {
    title: "1. Feature ID",
    items: ["Feature type/name", "Target? (yes/no)", "Location", "Observation style"],
  },
  {
    title: "2. Geometry",
    items: ["Size", "Shape", "Boundary", "Preservation"],
  },
  {
    title: "3. Color & Shadow",
    items: ["Color tone", "Albedo", "Shadows/illumination"],
  },
  {
    title: "4. Structure & Texture",
    items: ["Structures", "Slopes", "Texture"],
  },
  {
    title: "5. Geologic Relations",
    items: ["Association", "Contact habit", "Contact relationship"],
  },
  {
    title: "* Thoughts *",
    items: ["Impressions", "Interpretations", "Any changes?"],
    accent: true,
  },
]

function BadgeIcon({ type }: { type: string }) {
  if (type === "camera") {
    return (
      <Badge variant="outline" className="bg-background p-1">
        <Camera size={10} className="text-muted-foreground" />
      </Badge>
    )
  }
  if (type === "headphones") {
    return (
      <Badge variant="outline" className="bg-background p-1">
        <Headphones size={10} className="text-muted-foreground" />
      </Badge>
    )
  }
  if (type === "team") {
    return (
      <Badge variant="outline" className="bg-background p-1 text-muted-foreground gap-1" style={{ fontSize: 8 }}>
        <RefreshCcw size={10} />
        TEAM
      </Badge>
    )
  }
  return null
}

function TimelineItem({
  item,
  checked,
  onToggle,
  index,
}: {
  item: (typeof initialTimelineItems)[number]
  checked: boolean
  onToggle: () => void
  index: number
}) {
  const isDimmed = item.dimmed && checked
  return (
    <div
      className={`flex flex-row items-center gap-2 pl-4 pr-2 animate-fade-in-left ${isDimmed ? "opacity-50" : ""}`}
      style={{ animationDelay: `${index * 50 + 200}ms` }}
    >
      <div className="flex flex-col items-center gap-0.5">
        <Separator orientation="vertical" className="h-4" />
        <Checkbox
          checked={checked}
          onCheckedChange={onToggle}
          className="rounded-full cursor-pointer"
          style={{ width: 16, height: 16 }}
        />
        <Separator orientation="vertical" className="h-4" />
      </div>
      <div
        className={`flex flex-row items-center gap-2 flex-1 p-3 rounded-lg transition-colors ${item.active ? "bg-muted" : ""}`}
      >
        <span className={`flex-1 transition-all ${checked && !item.active ? "text-muted-foreground line-through" : "text-foreground"}`} style={{ fontSize: 13 }}>
          {item.label}
        </span>
        <div className="flex flex-row">
          {item.badges.map((b) => (
            <BadgeIcon key={b} type={b} />
          ))}
        </div>
        <span
          className="text-muted-foreground"
          style={{ fontSize: 11, fontWeight: 300 }}
        >
          {item.time}
        </span>
      </div>
    </div>
  )
}

const lensOptions = [
  { id: "unaided", label: "Unaided Eye", zoom: 1 },
  { id: "135mm", label: "135 mm", zoom: 1.8 },
  { id: "200mm", label: "200 mm", zoom: 2.8 },
  { id: "400mm", label: "400 mm", zoom: 4.5 },
]

function LensSelector({ active, onSelect }: { active: string; onSelect: (id: string) => void }) {
  return (
    <div className="flex items-center gap-0.5 rounded-lg p-[3px]" style={{ background: "rgba(255,255,255,0.08)" }}>
      {lensOptions.map((l) => (
        <button
          key={l.id}
          onClick={() => onSelect(l.id)}
          className="cursor-pointer transition-colors"
          style={{
            borderRadius: 6,
            padding: "6px 14px",
            fontSize: 13,
            fontWeight: active === l.id ? 600 : 500,
            color: active === l.id ? "oklch(0.145 0 0)" : "rgba(255,255,255,0.55)",
            background: active === l.id ? "white" : "transparent",
          }}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}

function OverlaySelector() {
  const [active, setActive] = useState("cuecard")
  const options = [
    { id: "onenote", label: "OneNote" },
    { id: "labels", label: "Labels Off" },
    { id: "cuecard", label: "Cue Card Off" },
  ]

  return (
    <div className="flex items-center gap-0.5 rounded-lg p-[3px]" style={{ background: "rgba(255,255,255,0.08)" }}>
      {options.map((o) => (
        <button
          key={o.id}
          onClick={() => setActive(o.id)}
          className="cursor-pointer transition-colors"
          style={{
            borderRadius: 6,
            padding: "6px 14px",
            fontSize: 13,
            fontWeight: active === o.id ? 600 : 500,
            color: active === o.id ? "oklch(0.145 0 0)" : "rgba(255,255,255,0.55)",
            background: active === o.id ? "white" : "transparent",
          }}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

function ViewToolbar() {
  const [activeTool, setActiveTool] = useState("zoom")
  const tools = [
    { id: "zoom", icon: ZoomIn },
    { id: "rotate", icon: RotateCw },
    { id: "flip", icon: Redo2 },
  ]

  return (
    <div className="flex items-center gap-0.5 rounded-lg p-[3px]" style={{ background: "rgba(255,255,255,0.08)" }}>
      {tools.map((t) => (
        <button
          key={t.id}
          onClick={() => setActiveTool(t.id)}
          className="flex items-center justify-center cursor-pointer"
          style={{
            width: 32,
            height: 32,
            borderRadius: 6,
            background: activeTool === t.id ? "white" : "transparent",
            color: activeTool === t.id ? "oklch(0.145 0 0)" : "rgba(255,255,255,0.55)",
          }}
        >
          <t.icon size={16} strokeWidth={2} />
        </button>
      ))}
    </div>
  )
}

export default function Home() {
  const [activeLens, setActiveLens] = useState("135mm")
  const currentZoom = lensOptions.find((l) => l.id === activeLens)?.zoom ?? 1

  const [timelineHeight, setTimelineHeight] = useState(350)
  const [isDragging, setIsDragging] = useState(false)

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    const startY = e.clientY
    const startHeight = timelineHeight

    const onMouseMove = (e: MouseEvent) => {
      const delta = e.clientY - startY
      setTimelineHeight(Math.max(100, Math.min(startHeight + delta, 600)))
    }
    const onMouseUp = () => {
      setIsDragging(false)
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseup", onMouseUp)
    }
    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseup", onMouseUp)
  }

  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {}
    initialTimelineItems.forEach((item) => {
      initial[item.id] = item.defaultChecked
    })
    return initial
  })

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="border-b flex-shrink-0 animate-slide-down">
        <div
          className="flex items-center h-14 px-4"
          style={{ background: "oklch(0.145 0 0)" }}
        >
          {/* Logo */}
          <div className="flex items-center gap-3 pr-6 shrink-0">
            <div
              className="flex items-center justify-center"
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "rgba(255,255,255,0.12)",
              }}
            >
              <span className="text-white text-[15px] font-bold">A</span>
            </div>
            <div className="flex flex-col gap-px">
              <span
                className="text-white font-semibold"
                style={{ fontSize: 14, letterSpacing: -0.2 }}
              >
                Lunar Targeting Package
              </span>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}>
                v 2026-04-04 06:36
              </span>
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              width: 1,
              height: 24,
              background: "rgba(255,255,255,0.12)",
              marginRight: 16,
              marginLeft: 8,
            }}
          />

          {/* Main tabs */}
          <Tabs defaultValue="targeting" className="h-full shrink-0">
            <TabsList className="h-full gap-0">
              <TabsTrigger
                value="targeting"
                className="h-full relative px-4 text-white/45 hover:text-white/70 data-[state=active]:text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-white after:opacity-0 data-[state=active]:after:opacity-100"
                style={{ fontSize: 13, width: 250 }}
              >
                Lunar Targeting Plan
              </TabsTrigger>
              <TabsTrigger
                value="geography"
                className="h-full relative px-4 text-white/45 hover:text-white/70 data-[state=active]:text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-white after:opacity-0 data-[state=active]:after:opacity-100"
                style={{ fontSize: 13, width: 250 }}
              >
                Lunar Geography Review
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Divider */}
          <div
            style={{
              width: 1,
              height: 24,
              background: "rgba(255,255,255,0.12)",
              marginRight: 12,
              marginLeft: 12,
            }}
          />

          {/* Right section */}
          <div className="flex flex-row gap-2 items-center justify-end flex-1">
            <Tabs defaultValue="overview">
              <TabsList className="border-none h-auto gap-0">
                {["Overview", "Timeline", "Targets", "Guide"].map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab.toLowerCase()}
                    className="border-none shadow-none text-[rgba(255,255,255,0.45)] hover:text-white data-[state=active]:text-white data-[state=active]:bg-[rgba(255,255,255,0.12)]"
                    style={{
                      borderRadius: 6,
                      padding: "5px 16px",
                      fontSize: 13,
                      fontWeight: 500,
                    }}
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <Button
              variant="ghost"
              size="icon"
              className="hover:text-white hover:bg-white/10"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              <Settings size={18} />
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-row flex-1 min-h-0">
        {/* Left sidebar */}
        <div className="flex flex-col bg-background border-r shrink-0 animate-fade-in-left" style={{ width: 400, animationDelay: "100ms" }}>
          {/* Timeline section */}
          <div className="flex flex-col min-h-0 shrink-0" style={{ height: timelineHeight }}>
            <div className="flex items-center justify-between px-4 py-4 border-b border-border shrink-0">
              <span className="text-foreground" style={{ fontSize: 16, letterSpacing: -0.2 }}>
                Timeline
              </span>
              <span className="text-muted-foreground" style={{ fontSize: 12, letterSpacing: -0.2 }}>
                Apr 6, 2026
              </span>
            </div>
            <div className="flex flex-col pb-2 overflow-y-auto scrollbar-hide flex-1">
              {initialTimelineItems.map((item, index) => (
                <TimelineItem
                  key={item.id}
                  item={item}
                  checked={checkedItems[item.id]}
                  onToggle={() => toggleItem(item.id)}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Resize handle */}
          <div
            onMouseDown={handleMouseDown}
            className="shrink-0 border-y border-border hover:bg-primary/10 transition-colors"
            style={{
              height: 6,
              cursor: isDragging ? "grabbing" : "row-resize",
              background: isDragging ? "oklch(0.708 0 0 / 0.2)" : undefined,
            }}
          />

          {/* Target detail card */}
          <div className="flex flex-col p-2 flex-1 overflow-y-auto min-h-0">
            <div className="flex flex-col gap-2 p-3 rounded-lg border border-border bg-gradient-to-tr from-transparent to-muted shadow-2xl shadow-black/25 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
              <div className="flex items-baseline gap-2 py-2">
                <span className="text-foreground font-bold" style={{ fontSize: 16, letterSpacing: -0.2 }}>
                  12. Orientale Basin
                </span>
                <span className="text-muted-foreground italic" style={{ fontSize: 13 }}>
                  OR-ee-ent-ALL
                </span>
              </div>

              <div className="flex flex-col gap-2 p-3 rounded-lg bg-background">
                <span className="text-foreground font-semibold" style={{ fontSize: 13 }}>
                  Target Information
                </span>
                <ul className="text-muted-foreground list-disc pl-5 flex flex-col gap-1.5" style={{ fontSize: 13 }}>
                  <li>Youngest large basin on the Moon.</li>
                  <li>Prominent ejecta with secondary crater chains.</li>
                  <li>Diameter is distance between JSC and KSC.</li>
                </ul>
              </div>

              <div className="flex flex-col gap-2 p-3 rounded-lg bg-background">
                <span className="text-foreground font-semibold" style={{ fontSize: 13 }}>
                  Camera Actions
                </span>
                <ul className="text-muted-foreground list-disc pl-5 flex flex-col gap-1.5" style={{ fontSize: 13 }}>
                  <li>Centered images of entire basin and surrounding craters in a single frame.</li>
                  <li>Mosaic entire basin at full zoom w/ overlap.</li>
                  <li>Image and describe color, albedo, texture, and topography across mare patches and ring mountains.</li>
                  <li>Image and describe southern dark annular ring, including boundaries and texture.</li>
                  <li>Image and describe color/albedo variations, topography, and extent of ejecta including secondary crater chains.</li>
                </ul>
              </div>

              <div className="flex flex-col gap-2 p-3 rounded-lg bg-background">
                <span className="text-foreground font-semibold" style={{ fontSize: 13 }}>
                  Unaided Eye Actions
                </span>
                <ul className="text-muted-foreground list-disc pl-5 flex flex-col gap-1.5" style={{ fontSize: 13 }}>
                  <li>Describe color, albedo, texture, and topography across mare patches and ring mountains.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Main area */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* Moon image */}
          <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden animate-fade-in-scale" style={{ animationDelay: "300ms" }}>
            <img
              src="/lunar-orientale.png"
              alt="Lunar Orientale Basin"
              className="w-full h-full object-cover"
              style={{
                transform: `scale(${currentZoom})`,
                transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
          </div>

          {/* Image toolbar */}
          <div
            className="flex items-center h-12 px-4 shrink-0 animate-fade-in-up"
            style={{ background: "oklch(0.145 0 0)", animationDelay: "500ms" }}
          >
            <LensSelector active={activeLens} onSelect={setActiveLens} />
            <div className="flex-1" />
            <OverlaySelector />
            <div
              style={{
                width: 1,
                height: 24,
                background: "rgba(255,255,255,0.12)",
                marginLeft: 12,
                marginRight: 8,
              }}
            />
            <ViewToolbar />
          </div>

          {/* Observation guide cards */}
          <div className="flex flex-row gap-2 p-2 border-t">
            {observationGuide.map((card, i) => (
              <div
                key={card.title}
                className={`flex flex-col gap-2 flex-1 p-3 rounded-lg border border-border shadow-2xl shadow-black/25 bg-gradient-to-tr animate-fade-in-up ${
                  card.accent
                    ? "from-muted to-[#3e3e3e]"
                    : "from-transparent to-[#1f1f1f]"
                }`}
                style={{ animationDelay: `${600 + i * 80}ms` }}
              >
                <span className="text-foreground font-semibold" style={{ fontSize: 13 }}>
                  {card.title}
                </span>
                <ul className="text-muted-foreground list-disc pl-5 flex flex-col gap-1.5" style={{ fontSize: 13 }}>
                  {card.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
