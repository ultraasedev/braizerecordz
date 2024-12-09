"use client"

import { useState, useEffect } from "react"
import { Send } from "lucide-react"

interface Service {
  id: string
  name: string
  description: string
  email: string
}

interface ContactFormProps {
  selectedService: Service | null
}

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  budget: string
  heardFrom: string
}

interface FormErrors {
  [key: string]: string
}

const INITIAL_FORM_DATA: FormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  budget: "",
  heardFrom: ""
}

const budgetRanges = [
  { value: "", label: "Sélectionnez un budget" },
  { value: "< 5k", label: "Moins de 5 000€" },
  { value: "5k-10k", label: "5 000€ - 10 000€" },
  { value: "10k-20k", label: "10 000€ - 20 000€" },
  { value: "20k+", label: "Plus de 20 000€" }
]

const heardFromOptions = [
  { value: "", label: "Comment nous avez-vous connu ?" },
  { value: "social", label: "Réseaux sociaux" },
  { value: "search", label: "Recherche Google" },
  { value: "recommendation", label: "Recommandation" },
  { value: "event", label: "Événement" },
  { value: "press", label: "Presse" },
  { value: "other", label: "Autre" }
]

export default function ContactForm({ selectedService }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  // Réinitialiser le formulaire quand le service change
  useEffect(() => {
    setFormData(INITIAL_FORM_DATA)
    setErrors({})
    setSubmitStatus("idle")
  }, [selectedService])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Validation du nom
    if (!formData.name.trim()) {
      newErrors.name = "Veuillez entrer votre nom"
    }

    // Validation de l'email
    if (!formData.email.trim()) {
      newErrors.email = "Veuillez entrer votre email"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email invalide"
    }

    // Validation du téléphone (optionnel mais doit être valide si renseigné)
    if (formData.phone && !/^(\+33|0)[1-9](\d{2}){4}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = "Numéro de téléphone invalide"
    }

    // Validation du sujet
    if (!formData.subject.trim()) {
      newErrors.subject = "Veuillez entrer un sujet"
    }

    // Validation du message
    if (!formData.message.trim()) {
      newErrors.message = "Veuillez entrer votre message"
    } else if (formData.message.length < 20) {
      newErrors.message = "Votre message est trop court (minimum 20 caractères)"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSubmitStatus("success")
      setFormData(INITIAL_FORM_DATA)
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Effacer l'erreur quand l'utilisateur commence à corriger
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Style commun pour les inputs
  const inputClassName = (fieldName: keyof FormErrors) => `
    w-full bg-zinc-900/50 border ${errors[fieldName] ? 'border-red-500' : 'border-zinc-800'}
    rounded-lg px-4 py-3 text-white placeholder-zinc-500
    focus:outline-none focus:border-red-500 transition-colors
  `

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Service sélectionné */}
      {selectedService && (
        <div className="mb-8 p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
          <p className="text-zinc-400 text-sm">Service sélectionné :</p>
          <p className="text-white">{selectedService.name}</p>
        </div>
      )}

      {/* Nom et Email sur la même ligne */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm text-zinc-400 mb-2">
            Nom complet *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={inputClassName('name')}
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm text-zinc-400 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={inputClassName('email')}
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Téléphone et Budget */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-sm text-zinc-400 mb-2">
            Téléphone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={inputClassName('phone')}
            placeholder="+33 6 12 34 56 78"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
          )}
        </div>

        <div>
          <label htmlFor="budget" className="block text-sm text-zinc-400 mb-2">
            Budget estimé
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className={inputClassName('budget')}
          >
            {budgetRanges.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Sujet */}
      <div>
        <label htmlFor="subject" className="block text-sm text-zinc-400 mb-2">
          Sujet *
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={inputClassName('subject')}
          placeholder="L'objet de votre message"
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm text-zinc-400 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={formData.message}
          onChange={handleChange}
          className={`${inputClassName('message')} resize-none`}
          placeholder="Décrivez votre projet en détail..."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message}</p>
        )}
      </div>

      {/* Comment nous avez-vous connu ? */}
      <div>
        <label htmlFor="heardFrom" className="block text-sm text-zinc-400 mb-2">
          Comment nous avez-vous connu ?
        </label>
        <select
          id="heardFrom"
          name="heardFrom"
          value={formData.heardFrom}
          onChange={handleChange}
          className={inputClassName('heardFrom')}
        >
          {heardFromOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="
          group flex items-center justify-center gap-2 w-full
          bg-red-500 hover:bg-red-600 disabled:bg-zinc-800
          text-white rounded-lg px-6 py-3 transition-colors
        "
      >
        {isSubmitting ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
          <>
            <span>Envoyer le message</span>
            <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>

      {/* Status Messages */}
      {submitStatus === "success" && (
        <div className="p-4 rounded-lg bg-green-500/10 border border-green-500 text-green-500 text-sm">
          Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
        </div>
      )}
      {submitStatus === "error" && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500 text-red-500 text-sm">
          Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.
        </div>
      )}
    </form>
  )
}