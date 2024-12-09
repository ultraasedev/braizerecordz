import { ServiceCategory } from "@/app/types/contact"
import { Music, Building2, FileText, Play } from "lucide-react"

export const serviceCategories: ServiceCategory[] = [
  {
    id: "label",
    name: "LABEL",
    icon: Music,
    services: [
      {
        id: "artist-dev",
        name: "Développement Artiste",
        description: "Pour les artistes cherchant un accompagnement complet",
        email: "artists@braizerecords.com",
        phone: "+33 2 99 XX XX XX",
        contactName: "Sarah Martin"
      },
      {
        id: "production",
        name: "Production",
        description: "Production musicale et accompagnement studio",
        email: "production@braizerecords.com",
        phone: "+33 2 99 XX XX XX",
        contactName: "Thomas Dubois"
      }
    ]
  },
  {
    id: "business",
    name: "BUSINESS",
    icon: Building2,
    services: [
      {
        id: "consulting",
        name: "Consulting",
        description: "Conseils stratégiques pour les professionnels",
        email: "consulting@braizerecords.com",
        phone: "+33 2 99 XX XX XX",
        contactName: "Julie Rousseau"
      }
    ]
  },
  {
    id: "publishing",
    name: "ÉDITION",
    icon: FileText,
    services: [
      {
        id: "rights",
        name: "Gestion des Droits",
        description: "Administration et valorisation de catalogue",
        email: "publishing@braizerecords.com",
        phone: "+33 2 99 XX XX XX",
        contactName: "Marc Dubois"
      }
    ]
  },
  {
    id: "festival",
    name: "FESTIVAL",
    icon: Play,
    services: [
      {
        id: "booking",
        name: "Booking",
        description: "Programmation et réservations",
        email: "festival@braizerecords.com",
        phone: "+33 2 99 XX XX XX",
        contactName: "Emma Laurent"
      }
    ]
  }
]

export const budgetRanges = [
  { value: "", label: "Sélectionnez un budget" },
  { value: "< 5k", label: "Moins de 5 000€" },
  { value: "5k-10k", label: "5 000€ - 10 000€" },
  { value: "10k-20k", label: "10 000€ - 20 000€" },
  { value: "20k+", label: "Plus de 20 000€" }
]

export const heardFromOptions = [
  { value: "", label: "Comment nous avez-vous connu ?" },
  { value: "social", label: "Réseaux sociaux" },
  { value: "search", label: "Recherche Google" },
  { value: "recommendation", label: "Recommandation" },
  { value: "event", label: "Événement" },
  { value: "press", label: "Presse" },
  { value: "other", label: "Autre" }
]