// app/dashboard/page.tsx
"use client"

import { useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { 
  Users, Music, Calendar, TrendingUp,
  Download, Loader2, ArrowDown, ArrowUp,
  Clock, Activity, PlayCircle, Share2,
  Award, DollarSign
} from "lucide-react"
import { 
  AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts'

// Types
interface DashboardData {
  totalArtists: number
  totalReleases: number
  totalEvents: number
  totalStreams: string
  monthlyRevenue: string
  artistGrowth: number
  streamGrowth: number
  revenueGrowth: number
}

interface Activity {
  id: number
  type: 'release' | 'stream' | 'event' | 'revenue'
  title: string
  subtitle: string
  timestamp: string
  icon: typeof PlayCircle
  color: string
}

// Données de test pour le graphique
const streamingData = [
  { date: '01/24', spotify: 2400, deezer: 1398, apple: 9800 },
  { date: '02/24', spotify: 1398, deezer: 2800, apple: 3908 },
  { date: '03/24', spotify: 9800, deezer: 3908, apple: 4800 },
  { date: '04/24', spotify: 3908, deezer: 4800, apple: 3800 },
  { date: '05/24', spotify: 4800, deezer: 3800, apple: 4300 },
  { date: '06/24', spotify: 3800, deezer: 4300, apple: 4300 }
]

// Données de test pour les activités récentes
const recentActivities: Activity[] = [
  {
    id: 1,
    type: 'release',
    title: "Nouvelle sortie",
    subtitle: "LASHKA - 'Burn Out' maintenant disponible",
    timestamp: "Il y a 2h",
    icon: PlayCircle,
    color: "text-emerald-500"
  },
  {
    id: 2,
    type: 'stream',
    title: "Record de streams",
    subtitle: "1M de streams sur Spotify ce mois-ci",
    timestamp: "Il y a 5h",
    icon: Activity,
    color: "text-blue-500"
  },
  {
    id: 3,
    type: 'event',
    title: "Nouveau concert",
    subtitle: "MAES - Le Bataclan complet",
    timestamp: "Il y a 12h",
    icon: Calendar,
    color: "text-purple-500"
  },
  {
    id: 4,
    type: 'revenue',
    title: "Revenus",
    subtitle: "+15% de revenus ce mois-ci",
    timestamp: "Il y a 1j",
    icon: DollarSign,
    color: "text-yellow-500"
  }
]

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<DashboardData | null>(null)
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month' | 'year'>('month')

  const fetchDashboardData = useCallback(async () => {
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setData({
        totalArtists: 12,
        totalReleases: 45,
        totalEvents: 8,
        totalStreams: "1.2M",
        monthlyRevenue: "50K",
        artistGrowth: 20,
        streamGrowth: 15,
        revenueGrowth: 25
      })
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDashboardData()
  }, [fetchDashboardData])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-red-500" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Tableau de bord
          </h1>
          <p className="mt-1 text-zinc-400">
            Vue d'ensemble des performances
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as any)}
            className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-red-500"
          >
            <option value="day">Aujourd'hui</option>
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
            <option value="year">Cette année</option>
          </select>
        </div>
      </div>

      {/* Cartes statistiques */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Artistes"
          value={data?.totalArtists.toString() || "0"}
          change={data?.artistGrowth || 0}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Streams"
          value={data?.totalStreams || "0"}
          change={data?.streamGrowth || 0}
          icon={Activity}
          color="emerald"
        />
        <StatCard
          title="Revenus"
          value={data?.monthlyRevenue || "0"}
          change={data?.revenueGrowth || 0}
          icon={DollarSign}
          color="yellow"
          prefix="€"
        />
        <StatCard
          title="Événements"
          value={data?.totalEvents.toString() || "0"}
          change={data?.streamGrowth || 0}
          icon={Calendar}
          color="purple"
        />
      </div>

      {/* Graphiques et activités */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Graphique des streams */}
        <div className="lg:col-span-2 p-6 rounded-xl bg-zinc-900/50 border border-zinc-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Streams</h2>
            <select 
              className="mt-2 sm:mt-0 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white"
              defaultValue="all"
            >
              <option value="all">Toutes les plateformes</option>
              <option value="spotify">Spotify</option>
              <option value="deezer">Deezer</option>
              <option value="apple">Apple Music</option>
            </select>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={streamingData}>
                <defs>
                  <linearGradient id="colorSpotify" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1DB954" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1DB954" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDeezer" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF0092" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#FF0092" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorApple" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FC3C44" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#FC3C44" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis 
                  dataKey="date" 
                  stroke="#71717a" 
                  fontSize={12}
                />
                <YAxis 
                  stroke="#71717a" 
                  fontSize={12}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181b',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: '#fff'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="spotify"
                  stroke="#1DB954"
                  fillOpacity={1}
                  fill="url(#colorSpotify)"
                />
                <Area
                  type="monotone"
                  dataKey="deezer"
                  stroke="#FF0092"
                  fillOpacity={1}
                  fill="url(#colorDeezer)"
                />
                <Area
                  type="monotone"
                  dataKey="apple"
                  stroke="#FC3C44"
                  fillOpacity={1}
                  fill="url(#colorApple)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activités récentes */}
        <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Activité récente</h2>
            <button className="text-sm text-zinc-400 hover:text-white transition-colors">
              Voir tout
            </button>
          </div>

          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-4 p-3 rounded-lg hover:bg-zinc-800/50 transition-colors"
              >
                <div className={`p-2 rounded-lg bg-zinc-800 ${activity.color}`}>
                  <activity.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white">{activity.title}</p>
                  <p className="mt-0.5 text-sm text-zinc-400">{activity.subtitle}</p>
                  <p className="mt-1 text-xs text-zinc-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {activity.timestamp}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Composant StatCard
interface StatCardProps {
  title: string
  value: string
  change: number
  icon: React.ElementType
  color: 'blue' | 'emerald' | 'yellow' | 'purple'
  prefix?: string
}

const StatCard = ({ title, value, change, icon: Icon, color, prefix }: StatCardProps) => {
  const colors = {
    blue: 'bg-blue-500/10 text-blue-500',
    emerald: 'bg-emerald-500/10 text-emerald-500',
    yellow: 'bg-yellow-500/10 text-yellow-500',
    purple: 'bg-purple-500/10 text-purple-500'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:bg-zinc-900 transition-colors"
    >
      <div className="flex items-start justify-between">
        <div className={`p-3 rounded-lg ${colors[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${
          change >= 0 ? 'text-emerald-500' : 'text-red-500'
        }`}>
          {change >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
          {Math.abs(change)}%
        </div>
      </div>

      <div className="mt-3">
        <h3 className="text-sm text-zinc-400">{title}</h3>
        <p className="text-2xl font-semibold text-white mt-1">
          {prefix}{value}
        </p>
      </div>
    </motion.div>
  )
}