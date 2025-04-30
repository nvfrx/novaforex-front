"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Declaração para o objeto global TradingView
declare global {
  interface Window {
    TradingView?: {
      widget: any
      signalOperation?: (type: "buy" | "sell", pair: string) => void
      activeChart?: any
      markers?: any[]
    }
  }
}

export default function TradingViewChart() {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetRef = useRef<any>(null)
  const [markers, setMarkers] = useState<any[]>([])
  const [showSignal, setShowSignal] = useState(false)
  const [signalType, setSignalType] = useState<"BUY" | "SELL" | null>(null)

  // Função para adicionar marcador ao gráfico
  const addMarker = (type: "BUY" | "SELL") => {
    if (widgetRef.current && widgetRef.current.chart && widgetRef.current.chart.setMarkers) {
      const newMarker = {
        time: Math.floor(Date.now() / 1000),
        position: type === "BUY" ? "belowBar" : "aboveBar",
        color: type === "BUY" ? "#00FF00" : "#FF0000",
        shape: type === "BUY" ? "arrowUp" : "arrowDown",
        text: type,
      }

      setMarkers((prev) => {
        const updatedMarkers = [...prev, newMarker]
        widgetRef.current.chart.setMarkers(updatedMarkers)
        return updatedMarkers
      })
    }
  }

  // Inicializar o widget
  useEffect(() => {
    if (containerRef.current) {
      const script = document.createElement("script")
      script.src = "https://s3.tradingview.com/tv.js"
      script.async = true
      script.onload = () => {
        if (typeof TradingView !== "undefined" && containerRef.current) {
          const widget = new window.TradingView.widget({
            width: "100%",
            height: 500,
            symbol: "OANDA:EURUSD",
            interval: "1",
            timezone: "Etc/UTC",
            theme: "dark",
            style: "1",
            locale: "br",
            toolbar_bg: "#f1f3f6",
            enable_publishing: false,
            hide_top_toolbar: false,
            hide_legend: false,
            save_image: false,
            container_id: containerRef.current.id,
          })

          widgetRef.current = widget

          // Armazenar a função de sinalização no objeto global
          window.TradingView = window.TradingView || {}
          window.TradingView.signalOperation = (type: "buy" | "sell", pair: string) => {
            // Efeito visual temporário
            setSignalType(type)
            setShowSignal(true)
            setTimeout(() => setShowSignal(false), 2000)

            // Se o widget estiver pronto, adicionar marcador
            if (widgetRef.current && widgetRef.current.chart && widgetRef.current.chart.setMarkers) {
              addMarker(type)
            }
          }
        }
      }
      document.head.appendChild(script)

      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script)
        }
      }
    }
  }, [])

  return (
    <Card className="w-full bg-black/60 border border-neon-blue/20 shadow-lg rounded-xl overflow-hidden backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-black via-black/90 to-black border-b border-neon-blue/20 pb-2">
        <CardTitle className="text-xl font-bold bg-gradient-to-r from-neon-blue via-neon-purple to-neon-cyan bg-clip-text text-transparent">
          Análise de Mercado Forex
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div id="tradingview_widget" ref={containerRef} className="w-full h-[500px] relative" />
      </CardContent>
    </Card>
  )
}
