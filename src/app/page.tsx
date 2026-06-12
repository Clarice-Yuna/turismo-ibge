"use client"

import React, { useState, useEffect, useCallback } from "react"
import { useAuthStore } from "@/lib/auth-store"
import { api } from "@/lib/api"
import type { ViewType } from "@/lib/types"
import {
  Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  AreaChart, Area, ComposedChart, Line, Treemap, ScatterChart, Scatter, ZAxis,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/components/ui/chart"
import {
  LayoutDashboard, Lightbulb, HelpCircle, Trophy, LogOut, Menu, X,
  Building2, Hotel, Bed, Star, Link, MapPin, ChevronRight, CheckCircle2,
  XCircle, ArrowRight, Clock, Target, Users, Activity, TrendingUp,
  Waves, TreePine, Car, Crown, Scale, ShieldCheck, Calculator, BarChart3,
  Store, Trophy as TrophyIcon, Network, Sun, Heart, Accessibility, Globe,
  Eye, UserPlus, LogIn, Loader2,
} from "lucide-react"

// ============ CHART COLORS ============
const CHART_COLORS = ["#38bdf8", "#0ea5e9", "#06b6d4", "#8b5cf6", "#ec4899", "#22c55e", "#f59e0b", "#ef4444"]

// ============ ICON MAP ============
const iconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 className="w-5 h-5" />,
  Hotel: <Hotel className="w-5 h-5" />,
  Bed: <Bed className="w-5 h-5" />,
  Star: <Star className="w-5 h-5" />,
  Link: <Link className="w-5 h-5" />,
  MapPin: <MapPin className="w-5 h-5" />,
  Trophy: <TrophyIcon className="w-5 h-5" />,
  Store: <Store className="w-5 h-5" />,
  Lightbulb: <Lightbulb className="w-5 h-5" />,
  Crown: <Crown className="w-5 h-5" />,
  Car: <Car className="w-5 h-5" />,
  Calculator: <Calculator className="w-5 h-5" />,
  Accessibility: <Accessibility className="w-5 h-5" />,
  Building: <Building2 className="w-5 h-5" />,
  TreePine: <TreePine className="w-5 h-5" />,
  Waves: <Waves className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  Heart: <Heart className="w-5 h-5" />,
  Scale: <Scale className="w-5 h-5" />,
  Network: <Network className="w-5 h-5" />,
  Sun: <Sun className="w-5 h-5" />,
  BarChart3: <BarChart3 className="w-5 h-5" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5" />,
  Globe: <Globe className="w-5 h-5" />,
}

// ============ LOGIN SCREEN ============
function LoginScreen() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const login = useAuthStore((s) => s.login)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      if (isLogin) {
        const res = await api.auth.login(email, password)
        login(res.user)
      } else {
        const res = await api.auth.register(email, name, password)
        login(res.user)
      }
    } catch (err: any) {
      setError(err.message || "Erro ao processar")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-950 dark:to-blue-950 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-sky-500/10 mb-4">
            <Building2 className="w-8 h-8 text-sky-500" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-sky-600">Turismo - IBGE 2016</h1>
          <p className="text-muted-foreground mt-1">Pesquisa de Serviços de Hospedagem</p>
        </div>
        <div className="bg-card rounded-2xl border shadow-sm p-6">
          <div className="flex gap-1 p-1 bg-muted rounded-xl mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${isLogin ? "bg-background shadow-sm" : "text-muted-foreground"}`}
            >
              <LogIn className="w-4 h-4 inline mr-1.5" />Entrar
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${!isLogin ? "bg-background shadow-sm" : "text-muted-foreground"}`}
            >
              <UserPlus className="w-4 h-4 inline mr-1.5" />Criar Conta
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-sm font-medium mb-1.5 block">Nome</label>
                <input
                  type="text" value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  placeholder="Seu nome" required={!isLogin}
                />
              </div>
            )}
            <div>
              <label className="text-sm font-medium mb-1.5 block">Email</label>
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                placeholder="seu@email.com" required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Senha</label>
              <input
                type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                placeholder="••••••" required
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit" disabled={loading}
              className="w-full py-2.5 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-medium text-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isLogin ? "Entrar" : "Criar Conta"}
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}

// ============ DASHBOARD CHARTS ============
function DashboardCharts({ data }: { data: any }) {
  if (!data) return <div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-sky-500" /></div>

  const estados = data.estabPorTipo.filter((d: any) => d.uf !== "Brasil")
  const brasil = data.estabPorTipo.find((d: any) => d.uf === "Brasil")
  const estadosUH = data.uhLeitosUF.filter((d: any) => d.uf !== "Brasil")
  const capitais = data.capitais
  const categorias = data.estabPorCategoria.filter((d: any) => d.uf !== "Brasil")
  const caracteristicas = data.estabPorCaracteristica.filter((d: any) => d.uf !== "Brasil")
  const localizacao = data.estabPorLocalizacao.filter((d: any) => d.uf !== "Brasil")
  const grupoUH = data.estabPorGrupoUH.filter((d: any) => d.uf !== "Brasil")

  // Top 10 estados por estabelecimentos
  const top10Estab = [...estados].sort((a: any, b: any) => b.total - a.total).slice(0, 10)
  // Top 10 estados por leitos
  const top10Leitos = [...estadosUH].sort((a: any, b: any) => b.leitosTotal - a.leitosTotal).slice(0, 10)
  // Top 10 capitais por leitos
  const top10Capitais = [...capitais].sort((a: any, b: any) => b.leitosTotal - a.leitosTotal).slice(0, 10)

  // Chart 1 - Tipos de estabelecimento no Brasil (pie)
  const tiposData = brasil ? [
    { name: "Hotéis", value: brasil.hoteis, fill: "#38bdf8" },
    { name: "Pousadas", value: brasil.pousadas, fill: "#f59e0b" },
    { name: "Motéis", value: brasil.moteis, fill: "#06b6d4" },
    { name: "Apart-hotéis", value: brasil.apartHoteis, fill: "#8b5cf6" },
    { name: "Hostels", value: brasil.hostels, fill: "#ec4899" },
    { name: "Pensões", value: brasil.pensoes, fill: "#22c55e" },
    { name: "Outros", value: brasil.outros, fill: "#ef4444" },
  ] : []

  // Chart 2 - Categorias (pie)
  const catBrasil = data.estabPorCategoria.find((d: any) => d.uf === "Brasil")
  const catData = catBrasil ? [
    { name: "Luxo", value: catBrasil.luxo, fill: "#8b5cf6" },
    { name: "Superior", value: catBrasil.superior, fill: "#38bdf8" },
    { name: "Turístico", value: catBrasil.turistico, fill: "#06b6d4" },
    { name: "Econômico", value: catBrasil.economico, fill: "#f59e0b" },
    { name: "Simples", value: catBrasil.simples, fill: "#ec4899" },
  ] : []

  // Chart 3 - Localização (pie)
  const locBrasil = data.estabPorLocalizacao.find((d: any) => d.uf === "Brasil")
  const locData = locBrasil ? [
    { name: "Urbana/Centro", value: locBrasil.urbanaCentro, fill: "#38bdf8" },
    { name: "Urbana/Fora", value: locBrasil.urbanaFora, fill: "#06b6d4" },
    { name: "Orla Marítima", value: locBrasil.orlaMaritima, fill: "#f59e0b" },
    { name: "Zona Rural", value: locBrasil.zonaRural, fill: "#22c55e" },
  ] : []

  // Chart 4 - Características (pie)
  const caracBrasil = data.estabPorCaracteristica.find((d: any) => d.uf === "Brasil")
  const caracData = caracBrasil ? [
    { name: "Independentes", value: caracBrasil.independentes, fill: "#38bdf8" },
    { name: "Cadeia Nacional", value: caracBrasil.cadeiaNacional, fill: "#f59e0b" },
    { name: "Cadeia Internacional", value: caracBrasil.cadeiaInternacional, fill: "#8b5cf6" },
  ] : []

  // Chart 5 - Grupos de UH Brasil (bar)
  const grupoBrasil = data.estabPorGrupoUH.find((d: any) => d.uf === "Brasil")
  const grupoData = grupoBrasil ? [
    { name: "Até 4", value: grupoBrasil.ate4 },
    { name: "5-9", value: grupoBrasil.de5a9 },
    { name: "10-19", value: grupoBrasil.de10a19 },
    { name: "20-29", value: grupoBrasil.de20a29 },
    { name: "30-49", value: grupoBrasil.de30a49 },
    { name: "50-99", value: grupoBrasil.de50a99 },
    { name: "100+", value: grupoBrasil.de100mais },
  ] : []

  // Chart 6 - Leitos simples vs duplos por UF
  const leitosCompData = top10Leitos.map((d: any) => ({
    uf: d.uf.length > 10 ? d.uf.substring(0, 8) + "…" : d.uf,
    Simples: d.leitosSimples,
    Duplos: d.leitosDuplos,
  }))

  // Chart 7 - Top 10 estados barras
  const top10Data = top10Estab.map((d: any) => ({
    uf: d.uf.length > 10 ? d.uf.substring(0, 8) + "…" : d.uf,
    Hotéis: d.hoteis,
    Pousadas: d.pousadas,
    Motéis: d.moteis,
  }))

  // Chart 8 - Capitais leitos
  const capData = top10Capitais.map((d: any) => ({
    capital: d.capital.length > 10 ? d.capital.substring(0, 8) + "…" : d.capital,
    Leitos: d.leitosTotal,
  }))

  // Chart 9 - Radar categorias por região
  const regioes: Record<string, string[]> = {
    "Norte": ["Rondônia","Acre","Amazonas","Roraima","Pará","Amapá","Tocantins"],
    "Nordeste": ["Maranhão","Piauí","Ceará","Rio Grande do Norte","Paraíba","Pernambuco","Alagoas","Sergipe","Bahia"],
    "Sudeste": ["Minas Gerais","Espírito Santo","Rio de Janeiro","São Paulo"],
    "Sul": ["Paraná","Santa Catarina","Rio Grande do Sul"],
    "Centro-Oeste": ["Mato Grosso do Sul","Mato Grosso","Goiás","Distrito Federal"],
  }
  const radarData = Object.entries(regioes).map(([reg, ufs]) => {
    const states = categorias.filter((c: any) => ufs.includes(c.uf))
    return {
      region: reg,
      Luxo: states.reduce((s: number, c: any) => s + c.luxo, 0),
      Superior: states.reduce((s: number, c: any) => s + c.superior, 0),
      Turístico: states.reduce((s: number, c: any) => s + c.turistico, 0),
      Econômico: states.reduce((s: number, c: any) => s + c.economico, 0),
    }
  })

  // Chart 10 - Localização por região (stacked bar)
  const locRegiao = Object.entries(regioes).map(([reg, ufs]) => {
    const states = localizacao.filter((l: any) => ufs.includes(l.uf))
    return {
      region: reg,
      "Urbana/Centro": states.reduce((s: number, l: any) => s + l.urbanaCentro, 0),
      "Urbana/Fora": states.reduce((s: number, l: any) => s + l.urbanaFora, 0),
      "Orla Marítima": states.reduce((s: number, l: any) => s + l.orlaMaritima, 0),
      "Zona Rural": states.reduce((s: number, l: any) => s + l.zonaRural, 0),
    }
  })

  // Chart 11 - UH adaptadas por região
  const uhAdaptData = Object.entries(regioes).map(([reg, ufs]) => {
    const states = data.uhLeitosUF.filter((u: any) => ufs.includes(u.uf))
    return {
      region: reg,
      "Total UH": states.reduce((s: number, u: any) => s + u.uhTotal, 0),
      "Adaptadas": states.reduce((s: number, u: any) => s + u.uhAdaptadas, 0),
    }
  })

  // Chart 12 - Cadeias por região
  const cadeiaData = Object.entries(regioes).map(([reg, ufs]) => {
    const states = caracteristicas.filter((c: any) => ufs.includes(c.uf))
    return {
      region: reg,
      "Independentes": states.reduce((s: number, c: any) => s + c.independentes, 0),
      "Cadeia Nacional": states.reduce((s: number, c: any) => s + c.cadeiaNacional, 0),
      "Cadeia Internacional": states.reduce((s: number, c: any) => s + c.cadeiaInternacional, 0),
    }
  })

  // Chart 13 - UH e Leitos por estado (scatter)
  const scatterData = estadosUH.map((d: any) => ({
    uf: d.uf, uh: d.uhTotal, leitos: d.leitosTotal
  }))

  // Chart 14 - Distribuição por tamanho (area)
  const tamanhoData = Object.entries(regioes).map(([reg, ufs]) => {
    const states = grupoUH.filter((g: any) => ufs.includes(g.uf))
    return {
      region: reg,
      "Pequeno (até 19)": states.reduce((s: number, g: any) => s + g.ate4 + g.de5a9 + g.de10a19, 0),
      "Médio (20-49)": states.reduce((s: number, g: any) => s + g.de20a29 + g.de30a49, 0),
      "Grande (50+)": states.reduce((s: number, g: any) => s + g.de50a99 + g.de100mais, 0),
    }
  })

  // Chart 15 - Hotéis por estado
  const hoteisData = [...estados].sort((a: any, b: any) => b.hoteis - a.hoteis).slice(0, 15).map((d: any) => ({
    uf: d.uf.length > 12 ? d.uf.substring(0, 10) + "…" : d.uf,
    Hotéis: d.hoteis
  }))

  // Chart 16 - Pousadas vs Hotéis por estado
  const pousVsHotData = [...estados].sort((a: any, b: any) => b.total - a.total).slice(0, 12).map((d: any) => ({
    uf: d.uf.length > 10 ? d.uf.substring(0, 8) + "…" : d.uf,
    Hotéis: d.hoteis,
    Pousadas: d.pousadas,
  }))

  const tiposConfig: ChartConfig = { Hotéis: { label: "Hotéis", color: "#38bdf8" }, Pousadas: { label: "Pousadas", color: "#f59e0b" }, Motéis: { label: "Motéis", color: "#06b6d4" } }
  const leitosConfig: ChartConfig = { Simples: { label: "Simples", color: "#38bdf8" }, Duplos: { label: "Duplos", color: "#8b5cf6" } }
  const radarConfig: ChartConfig = { Luxo: { label: "Luxo", color: "#8b5cf6" }, Superior: { label: "Superior", color: "#38bdf8" }, Turístico: { label: "Turístico", color: "#06b6d4" }, Econômico: { label: "Econômico", color: "#f59e0b" } }
  const locConfig: ChartConfig = { "Urbana/Centro": { label: "Urbana/Centro", color: "#38bdf8" }, "Urbana/Fora": { label: "Urbana/Fora", color: "#06b6d4" }, "Orla Marítima": { label: "Orla Marítima", color: "#f59e0b" }, "Zona Rural": { label: "Zona Rural", color: "#22c55e" } }
  const uhConfig: ChartConfig = { "Total UH": { label: "Total UH", color: "#06b6d4" }, Adaptadas: { label: "Adaptadas", color: "#38bdf8" } }
  const cadeiaConfig: ChartConfig = { Independentes: { label: "Independentes", color: "#38bdf8" }, "Cadeia Nacional": { label: "Cadeia Nacional", color: "#f59e0b" }, "Cadeia Internacional": { label: "Cadeia Internacional", color: "#8b5cf6" } }
  const tamConfig: ChartConfig = { "Pequeno (até 19)": { label: "Pequeno", color: "#38bdf8" }, "Médio (20-49)": { label: "Médio", color: "#f59e0b" }, "Grande (50+)": { label: "Grande", color: "#8b5cf6" } }

  const cardClass = "bg-card rounded-xl border shadow-sm p-4"
  const chartTitleClass = "text-sm font-semibold text-foreground mb-3"

  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Estabelecimentos", value: brasil?.total?.toLocaleString("pt-BR"), icon: <Building2 className="w-4 h-4" />, color: "text-sky-500" },
          { label: "Unidades Habitacionais", value: data.uhLeitosUF.find((d: any) => d.uf === "Brasil")?.uhTotal?.toLocaleString("pt-BR"), icon: <Bed className="w-4 h-4" />, color: "text-blue-500" },
          { label: "Leitos", value: data.uhLeitosUF.find((d: any) => d.uf === "Brasil")?.leitosTotal?.toLocaleString("pt-BR"), icon: <Activity className="w-4 h-4" />, color: "text-sky-600" },
          { label: "Capitais", value: data.capitais.length.toString(), icon: <MapPin className="w-4 h-4" />, color: "text-blue-400" },
        ].map((stat, i) => (
          <div key={i} className={`${cardClass} flex items-center gap-3`}>
            <div className={`${stat.color} p-2 rounded-lg bg-opacity-10`} style={{ backgroundColor: `color-mix(in srgb, ${stat.color} 10%, transparent)` }}>
              {stat.icon}
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-lg font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Row 1: Pie Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={cardClass}>
          <h3 className={chartTitleClass}>Tipos de Estabelecimento</h3>
          <ChartContainer config={{}} className="h-[220px] w-full">
            <PieChart>
              <Pie data={tiposData} cx="50%" cy="50%" innerRadius={40} outerRadius={80} dataKey="value" nameKey="name" strokeWidth={2} stroke="var(--color-background)">
                {tiposData.map((entry: any, index: number) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ChartContainer>
          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-[10px] text-muted-foreground justify-center">
            {tiposData.map((d: any) => <span key={d.name} className="flex items-center gap-1"><span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: d.fill }} />{d.name}</span>)}
          </div>
        </div>

        <div className={cardClass}>
          <h3 className={chartTitleClass}>Categorias Hoteleiras</h3>
          <ChartContainer config={{}} className="h-[220px] w-full">
            <PieChart>
              <Pie data={catData} cx="50%" cy="50%" innerRadius={40} outerRadius={80} dataKey="value" nameKey="name" strokeWidth={2} stroke="var(--color-background)">
                {catData.map((entry: any, index: number) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ChartContainer>
          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-[10px] text-muted-foreground justify-center">
            {catData.map((d: any) => <span key={d.name} className="flex items-center gap-1"><span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: d.fill }} />{d.name}</span>)}
          </div>
        </div>

        <div className={cardClass}>
          <h3 className={chartTitleClass}>Localização</h3>
          <ChartContainer config={{}} className="h-[220px] w-full">
            <PieChart>
              <Pie data={locData} cx="50%" cy="50%" innerRadius={40} outerRadius={80} dataKey="value" nameKey="name" strokeWidth={2} stroke="var(--color-background)">
                {locData.map((entry: any, index: number) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ChartContainer>
          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-[10px] text-muted-foreground justify-center">
            {locData.map((d: any) => <span key={d.name} className="flex items-center gap-1"><span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: d.fill }} />{d.name}</span>)}
          </div>
        </div>

        <div className={cardClass}>
          <h3 className={chartTitleClass}>Características</h3>
          <ChartContainer config={{}} className="h-[220px] w-full">
            <PieChart>
              <Pie data={caracData} cx="50%" cy="50%" innerRadius={40} outerRadius={80} dataKey="value" nameKey="name" strokeWidth={2} stroke="var(--color-background)">
                {caracData.map((entry: any, index: number) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ChartContainer>
          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-[10px] text-muted-foreground justify-center">
            {caracData.map((d: any) => <span key={d.name} className="flex items-center gap-1"><span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: d.fill }} />{d.name}</span>)}
          </div>
        </div>
      </div>

      {/* Row 2: Top estados + Grupos UH */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className={cardClass}>
          <h3 className={chartTitleClass}>Top 10 Estados por Estabelecimentos</h3>
          <ChartContainer config={tiposConfig} className="h-[280px] w-full">
            <BarChart data={top10Data} layout="vertical" margin={{ left: 20, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" />
              <YAxis dataKey="uf" type="category" width={80} tick={{ fontSize: 11 }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="Hotéis" stackId="a" fill="var(--color-Hotéis)" radius={[0,0,0,0]} />
              <Bar dataKey="Pousadas" stackId="a" fill="var(--color-Pousadas)" />
              <Bar dataKey="Motéis" stackId="a" fill="var(--color-Motéis)" radius={[0,4,4,0]} />
            </BarChart>
          </ChartContainer>
        </div>

        <div className={cardClass}>
          <h3 className={chartTitleClass}>Estabelecimentos por Tamanho (UHs)</h3>
          <ChartContainer config={{}} className="h-[280px] w-full">
            <BarChart data={grupoData} margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#06b6d4" radius={[4,4,0,0]}>
                {grupoData.map((_: any, i: number) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </div>
      </div>

      {/* Row 3: Leitos comparison + Capitais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className={cardClass}>
          <h3 className={chartTitleClass}>Leitos Simples vs Duplos (Top 10)</h3>
          <ChartContainer config={leitosConfig} className="h-[280px] w-full">
            <BarChart data={leitosCompData} margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="uf" tick={{ fontSize: 10 }} angle={-30} textAnchor="end" height={60} />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="Simples" fill="var(--color-Simples)" radius={[4,4,0,0]} />
              <Bar dataKey="Duplos" fill="var(--color-Duplos)" radius={[4,4,0,0]} />
            </BarChart>
          </ChartContainer>
        </div>

        <div className={cardClass}>
          <h3 className={chartTitleClass}>Top 10 Capitais por Leitos</h3>
          <ChartContainer config={{ Leitos: { label: "Leitos", color: "#38bdf8" } }} className="h-[280px] w-full">
            <BarChart data={capData} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" />
              <YAxis dataKey="capital" type="category" width={90} tick={{ fontSize: 11 }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="Leitos" fill="var(--color-Leitos)" radius={[0,4,4,0]} />
            </BarChart>
          </ChartContainer>
        </div>
      </div>

      {/* Row 4: Radar + Localização por Região */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className={cardClass}>
          <h3 className={chartTitleClass}>Categorias por Região (Radar)</h3>
          <ChartContainer config={radarConfig} className="h-[300px] w-full">
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
              <PolarGrid />
              <PolarAngleAxis dataKey="region" tick={{ fontSize: 11 }} />
              <PolarRadiusAxis tick={{ fontSize: 9 }} />
              <Radar name="Luxo" dataKey="Luxo" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.15} />
              <Radar name="Superior" dataKey="Superior" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.15} />
              <Radar name="Turístico" dataKey="Turístico" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.15} />
              <Radar name="Econômico" dataKey="Econômico" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.15} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
            </RadarChart>
          </ChartContainer>
        </div>

        <div className={cardClass}>
          <h3 className={chartTitleClass}>Localização por Região</h3>
          <ChartContainer config={locConfig} className="h-[300px] w-full">
            <BarChart data={locRegiao} margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" tick={{ fontSize: 11 }} />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="Urbana/Centro" stackId="a" fill="var(--color-Urbana/Centro)" />
              <Bar dataKey="Urbana/Fora" stackId="a" fill="var(--color-Urbana/Fora)" />
              <Bar dataKey="Orla Marítima" stackId="a" fill="var(--color-Orla Marítima)" />
              <Bar dataKey="Zona Rural" stackId="a" fill="var(--color-Zona Rural)" radius={[4,4,0,0]} />
            </BarChart>
          </ChartContainer>
        </div>
      </div>

      {/* Row 5: UH Adaptadas + Cadeias por Região */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className={cardClass}>
          <h3 className={chartTitleClass}>UH Adaptadas por Região</h3>
          <ChartContainer config={uhConfig} className="h-[280px] w-full">
            <BarChart data={uhAdaptData} margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" tick={{ fontSize: 11 }} />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="Total UH" fill="var(--color-Total UH)" radius={[4,4,0,0]} />
              <Bar dataKey="Adaptadas" fill="var(--color-Adaptadas)" radius={[4,4,0,0]} />
            </BarChart>
          </ChartContainer>
        </div>

        <div className={cardClass}>
          <h3 className={chartTitleClass}>Cadeias por Região</h3>
          <ChartContainer config={cadeiaConfig} className="h-[280px] w-full">
            <BarChart data={cadeiaData} margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" tick={{ fontSize: 11 }} />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="Independentes" fill="var(--color-Independentes)" radius={[4,4,0,0]} />
              <Bar dataKey="Cadeia Nacional" fill="var(--color-Cadeia Nacional)" radius={[4,4,0,0]} />
              <Bar dataKey="Cadeia Internacional" fill="var(--color-Cadeia Internacional)" radius={[4,4,0,0]} />
            </BarChart>
          </ChartContainer>
        </div>
      </div>

      {/* Row 6: Scatter + Tamanho */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className={cardClass}>
          <h3 className={chartTitleClass}>UH vs Leitos por Estado</h3>
          <ChartContainer config={{}} className="h-[280px] w-full">
            <ScatterChart margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="uh" name="UH" tick={{ fontSize: 10 }} />
              <YAxis dataKey="leitos" name="Leitos" tick={{ fontSize: 10 }} />
              <ZAxis range={[40, 200]} />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} formatter={(v: number, n: string) => [v.toLocaleString("pt-BR"), n]} />
              <Scatter data={scatterData} fill="#38bdf8" />
            </ScatterChart>
          </ChartContainer>
        </div>

        <div className={cardClass}>
          <h3 className={chartTitleClass}>Tamanho dos Estabelecimentos por Região</h3>
          <ChartContainer config={tamConfig} className="h-[280px] w-full">
            <BarChart data={tamanhoData} margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" tick={{ fontSize: 11 }} />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="Pequeno (até 19)" stackId="a" fill="var(--color-Pequeno (até 19))" />
              <Bar dataKey="Médio (20-49)" stackId="a" fill="var(--color-Médio (20-49))" />
              <Bar dataKey="Grande (50+)" stackId="a" fill="var(--color-Grande (50+))" radius={[4,4,0,0]} />
            </BarChart>
          </ChartContainer>
        </div>
      </div>

      {/* Row 7: More charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className={cardClass}>
          <h3 className={chartTitleClass}>Hotéis por Estado</h3>
          <ChartContainer config={{ Hotéis: { label: "Hotéis", color: "#38bdf8" } }} className="h-[280px] w-full">
            <BarChart data={hoteisData} margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="uf" tick={{ fontSize: 10 }} angle={-30} textAnchor="end" height={60} />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="Hotéis" fill="var(--color-Hotéis)" radius={[4,4,0,0]} />
            </BarChart>
          </ChartContainer>
        </div>

        <div className={cardClass}>
          <h3 className={chartTitleClass}>Pousadas vs Hotéis (Top 12)</h3>
          <ChartContainer config={tiposConfig} className="h-[280px] w-full">
            <BarChart data={pousVsHotData} margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="uf" tick={{ fontSize: 10 }} angle={-30} textAnchor="end" height={60} />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="Hotéis" fill="var(--color-Hotéis)" radius={[4,4,0,0]} />
              <Bar dataKey="Pousadas" fill="var(--color-Pousadas)" radius={[4,4,0,0]} />
            </BarChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  )
}

// ============ CURIOSITIES SECTION ============
function CuriositiesSection() {
  const [curiosities, setCuriosities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("Todas")

  useEffect(() => {
    api.curiosities.list().then((res) => {
      setCuriosities(res.curiosities)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const categories = ["Todas", ...Array.from(new Set(curiosities.map((c: any) => c.category)))]
  const filtered = filter === "Todas" ? curiosities : curiosities.filter((c: any) => c.category === filter)

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-sky-500" /></div>

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat} onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === cat ? "bg-sky-500 text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((c: any) => (
          <div key={c.id} className="bg-card rounded-xl border shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-lg bg-sky-500/10 text-sky-500 shrink-0">
                {iconMap[c.icon] || <Lightbulb className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="text-sm font-semibold leading-tight">{c.title}</h3>
                {c.source && <p className="text-[10px] text-muted-foreground mt-0.5">{c.source}</p>}
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{c.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============ QUIZ SECTION ============
function QuizSection({ onPlay }: { onPlay: (categoryId: string) => void }) {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.quiz.categories().then((res) => {
      setCategories(res.categories)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-sky-500" /></div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((cat: any) => (
        <div key={cat.id} className="bg-card rounded-xl border shadow-sm p-5 hover:shadow-md transition-shadow cursor-pointer group" onClick={() => onPlay(cat.id)}>
          <div className="flex items-start justify-between mb-3">
            <div className="p-2.5 rounded-xl" style={{ backgroundColor: cat.color + "15", color: cat.color }}>
              {iconMap[cat.icon] || <HelpCircle className="w-6 h-6" />}
            </div>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
              {cat.questionCount || 0} perguntas
            </span>
          </div>
          <h3 className="font-semibold text-sm mb-1">{cat.name}</h3>
          <p className="text-xs text-muted-foreground mb-4">{cat.description}</p>
          <div className="flex items-center text-sky-500 text-xs font-medium group-hover:gap-2 transition-all gap-1">
            Iniciar Quiz <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      ))}
    </div>
  )
}

// ============ QUIZ PLAY ============
function QuizPlay({ categoryId, onBack, userId }: { categoryId: string; onBack: () => void; userId: string }) {
  const [questions, setQuestions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [results, setResults] = useState<any>(null)

  useEffect(() => {
    api.quiz.questions(categoryId).then((res) => {
      setQuestions(res.questions)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [categoryId])

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }))
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const formattedAnswers = Object.entries(answers).map(([questionId, selectedAnswer]) => ({
        questionId, selectedAnswer,
      }))
      const res = await api.quiz.submit({ userId, categoryId, answers: formattedAnswers })
      setResults(res)
    } catch (err) {
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-sky-500" /></div>

  if (results) {
    const { attempt, results: answerResults } = results
    const pct = Math.round((attempt.score / attempt.totalQuestions) * 100)
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-card rounded-xl border shadow-sm p-8 text-center">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${pct >= 70 ? "bg-sky-500/10 text-sky-500" : pct >= 40 ? "bg-amber-500/10 text-amber-500" : "bg-red-500/10 text-red-500"}`}>
            {pct >= 70 ? <Trophy className="w-10 h-10" /> : pct >= 40 ? <Target className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
          </div>
          <h2 className="text-2xl font-bold mb-2">{pct >= 70 ? "Excelente!" : pct >= 40 ? "Bom trabalho!" : "Continue tentando!"}</h2>
          <p className="text-muted-foreground mb-4">Você acertou {attempt.score} de {attempt.totalQuestions} perguntas</p>
          <div className="text-4xl font-bold text-sky-500 mb-6">{pct}%</div>
          <button onClick={onBack} className="px-6 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-medium text-sm transition-colors">
            Voltar ao Quiz
          </button>
        </div>

        <div className="space-y-3">
          {answerResults.map((r: any, i: number) => (
            <div key={i} className={`bg-card rounded-xl border shadow-sm p-4 ${r.correct ? "border-sky-500/30" : "border-red-500/30"}`}>
              <div className="flex items-start gap-3">
                {r.correct ? <CheckCircle2 className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" /> : <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />}
                <div>
                  <p className="text-sm font-medium">Pergunta {i + 1}</p>
                  {!r.correct && <p className="text-xs text-muted-foreground mt-1">Resposta correta: <span className="font-medium text-sky-500">{r.correctAnswer}</span></p>}
                  {r.explanation && <p className="text-xs text-muted-foreground mt-1">{r.explanation}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const q = questions[current]
  const options = [
    { key: "A", text: q.optionA },
    { key: "B", text: q.optionB },
    { key: "C", text: q.optionC },
    { key: "D", text: q.optionD },
  ]

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
        ← Voltar
      </button>
      <div className="bg-card rounded-xl border shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-muted-foreground">Pergunta {current + 1} de {questions.length}</span>
          <div className="flex gap-1">
            {questions.map((_: any, i: number) => (
              <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-sky-500" : answers[questions[i].id] ? "bg-sky-500/50" : "bg-muted"}`} />
            ))}
          </div>
        </div>
        <div className="w-full bg-muted rounded-full h-1.5 mb-6">
          <div className="bg-sky-500 h-1.5 rounded-full transition-all" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
        </div>
        <h3 className="text-base font-semibold mb-6">{q.question}</h3>
        <div className="space-y-3">
          {options.map((opt) => (
            <button
              key={opt.key} onClick={() => handleAnswer(q.id, opt.key)}
              className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all flex items-center gap-3 ${answers[q.id] === opt.key ? "border-sky-500 bg-sky-500/5 text-sky-700 dark:text-sky-300" : "hover:border-muted-foreground/30 hover:bg-muted/50"}`}
            >
              <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${answers[q.id] === opt.key ? "bg-sky-500 text-white" : "bg-muted"}`}>
                {opt.key}
              </span>
              {opt.text}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        <button
          onClick={() => setCurrent(Math.max(0, current - 1))} disabled={current === 0}
          className="px-4 py-2 rounded-lg border text-sm font-medium transition-colors disabled:opacity-30 hover:bg-muted"
        >
          Anterior
        </button>
        {current < questions.length - 1 ? (
          <button
            onClick={() => setCurrent(current + 1)} disabled={!answers[q.id]}
            className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium transition-colors disabled:opacity-30"
          >
            Próxima
          </button>
        ) : (
          <button
            onClick={handleSubmit} disabled={submitting || Object.keys(answers).length < questions.length}
            className="px-6 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium transition-colors disabled:opacity-30 flex items-center gap-2"
          >
            {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
            Finalizar Quiz
          </button>
        )}
      </div>
    </div>
  )
}

// ============ RANKING SECTION ============
function RankingSection() {
  const [ranking, setRanking] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.ranking.global().then((res) => {
      setRanking(res.ranking)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-sky-500" /></div>

  const medals = ["🥇", "🥈", "🥉"]

  return (
    <div className="space-y-4">
      <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left px-4 py-3 font-medium">#</th>
                <th className="text-left px-4 py-3 font-medium">Usuário</th>
                <th className="text-left px-4 py-3 font-medium">Categoria</th>
                <th className="text-center px-4 py-3 font-medium">Acertos</th>
                <th className="text-center px-4 py-3 font-medium">Percentual</th>
                <th className="text-right px-4 py-3 font-medium">Data</th>
              </tr>
            </thead>
            <tbody>
              {ranking.map((r: any, i: number) => (
                <tr key={r.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">{i < 3 ? medals[i] : i + 1}</td>
                  <td className="px-4 py-3 font-medium">{r.userName}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.categoryName}</td>
                  <td className="px-4 py-3 text-center">{r.score}/{r.totalQuestions}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${r.percentage >= 70 ? "bg-sky-500/10 text-sky-500" : r.percentage >= 40 ? "bg-amber-500/10 text-amber-500" : "bg-red-500/10 text-red-500"}`}>
                      {r.percentage}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-muted-foreground text-xs">
                    {new Date(r.completedAt).toLocaleDateString("pt-BR")}
                  </td>
                </tr>
              ))}
              {ranking.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">Nenhum resultado ainda. Seja o primeiro a completar um quiz!</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ============ MAIN APP ============
export default function HomePage() {
  const { user, isAuthenticated, logout } = useAuthStore()
  const [view, setView] = useState<ViewType>("dashboard")
  const [quizCategoryId, setQuizCategoryId] = useState<string | null>(null)
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [dataLoading, setDataLoading] = useState(true)

  useEffect(() => {
    if (isAuthenticated) {
      api.dashboard.data().then((res) => {
        setDashboardData(res)
        setDataLoading(false)
      }).catch(() => setDataLoading(false))
    }
  }, [isAuthenticated])

  const handlePlayQuiz = useCallback((categoryId: string) => {
    setQuizCategoryId(categoryId)
    setView("quiz-play")
  }, [])

  const handleBackFromQuiz = useCallback(() => {
    setQuizCategoryId(null)
    setView("quiz")
  }, [])

  if (!isAuthenticated) return <LoginScreen />

  const navItems = [
    { id: "dashboard" as ViewType, label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: "curiosities" as ViewType, label: "Curiosidades", icon: <Lightbulb className="w-4 h-4" /> },
    { id: "quiz" as ViewType, label: "Quiz", icon: <HelpCircle className="w-4 h-4" /> },
    { id: "ranking" as ViewType, label: "Ranking", icon: <Trophy className="w-4 h-4" /> },
  ]

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transform transition-transform lg:translate-x-0 lg:static lg:inset-auto ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-sky-500/10">
                <Globe className="w-6 h-6 text-sky-500" />
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-tight text-sky-600">Turismo</h1>
                <p className="text-xs text-muted-foreground font-medium">IBGE 2016</p>
              </div>
            </div>
          </div>
          <nav className="flex-1 p-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id} onClick={() => { setView(item.id); setSidebarOpen(false) }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${view === item.id ? "bg-sky-500/10 text-sky-500" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </nav>
          <div className="p-3 border-t">
            <div className="flex items-center gap-3 px-3 py-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-500 font-bold text-xs">
                {user?.name?.charAt(0) || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <p className="text-[10px] text-muted-foreground truncate">{user?.email}</p>
              </div>
            </div>
            <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:bg-red-500/5 hover:text-red-500 transition-all">
              <LogOut className="w-4 h-4" /> Sair
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main content */}
      <main className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b px-4 lg:px-6 py-3">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-1.5 rounded-lg hover:bg-muted">
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold tracking-tight text-sky-600">Turismo - IBGE 2016</h1>
            <span className="hidden sm:inline text-muted-foreground/60">·</span>
            <span className="hidden sm:inline text-sm text-muted-foreground">
              {view === "dashboard" && "Dashboard"}
              {view === "curiosities" && "Curiosidades"}
              {view === "quiz" && "Quiz"}
              {view === "quiz-play" && "Quiz"}
              {view === "ranking" && "Ranking"}
            </span>
          </div>
        </header>
        <div className="p-4 lg:p-6">
          {view === "dashboard" && <DashboardCharts data={dashboardData} />}
          {view === "curiosities" && <CuriositiesSection />}
          {view === "quiz" && <QuizSection onPlay={handlePlayQuiz} />}
          {view === "quiz-play" && quizCategoryId && (
            <QuizPlay categoryId={quizCategoryId} onBack={handleBackFromQuiz} userId={user?.id || ""} />
          )}
          {view === "ranking" && <RankingSection />}
        </div>
      </main>
    </div>
  )
}
