"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { Service } from "@/app/types/contact"
import { serviceCategories } from "@/app/data/contact"
import ContactForm from "./ContactForm"
import MapComponent from "./MapComponent"

export default function ContactSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  return (
    <section className="relative min-h-screen bg-black py-12 sm:py-16 md:py-24">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#FF0000,transparent_70%)] opacity-[0.02]" />
      </div>

      <div className="container relative mx-auto px-4">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 md:mb-20 text-center space-y-4"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white">
            CONTACTEZ <span className="text-red-500">NOUS</span>
          </h1>
          <p className="text-zinc-400 max-w-lg mx-auto">
            Choisissez le service qui correspond à votre projet pour un accompagnement personnalisé
          </p>
        </motion.div>

        {/* Grille des services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {serviceCategories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id)
                setSelectedService(null)
              }}
              className={`
                relative overflow-hidden rounded-lg p-6 text-left
                transition-all duration-300 group
                ${selectedCategory === category.id 
                  ? 'bg-red-500 text-white' 
                  : 'bg-zinc-900/50 hover:bg-zinc-900 text-white'}
              `}
              whileHover={{ scale: 1.02 }}
            >
              <category.icon className="h-6 w-6 mb-4" />
              <h3 className="text-lg font-medium mb-2">{category.name}</h3>
              <p className="text-sm text-zinc-400">
                {category.services.length} {category.services.length > 1 ? 'services' : 'service'}
              </p>
            </motion.button>
          ))}
        </div>

        {/* Services spécifiques */}
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {serviceCategories
                .find(cat => cat.id === selectedCategory)
                ?.services.map((service) => (
                  <motion.button
                    key={service.id}
                    onClick={() => setSelectedService(service)}
                    className={`
                      p-6 rounded-lg text-left transition-all
                      ${selectedService?.id === service.id 
                        ? 'bg-zinc-800 border-2 border-red-500' 
                        : 'bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700'}
                    `}
                    whileHover={{ scale: 1.02 }}
                  >
                    <h4 className="text-white text-lg mb-2">{service.name}</h4>
                    <p className="text-zinc-400 text-sm mb-4">{service.description}</p>
                    {service.contactName && (
                      <p className="text-zinc-500 text-sm">Contact : {service.contactName}</p>
                    )}
                  </motion.button>
                ))}
            </div>
          </motion.div>
        )}

        {/* Grille principale : Formulaire et Informations */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          {/* Formulaire */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="order-2 md:order-1"
          >
            <ContactForm selectedService={selectedService} />
          </motion.div>

          {/* Informations de contact */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="order-1 md:order-2 space-y-8"
          >
            {/* Contact details */}
            <div className="space-y-6">
              {selectedService ? (
                <div className="p-6 rounded-lg bg-zinc-900/50 border border-zinc-800">
                  <h3 className="text-xl font-medium text-white mb-4">
                    {selectedService.name}
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-red-500/10 p-3">
                        <Mail className="h-5 w-5 text-red-500" />
                      </div>
                      <div>
                        <p className="text-zinc-400">{selectedService.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-red-500/10 p-3">
                        <Phone className="h-5 w-5 text-red-500" />
                      </div>
                      <div>
                        <p className="text-zinc-400">{selectedService.phone}</p>
                        <p className="text-sm text-zinc-500">Lun-Ven, 10h-19h</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-red-500/10 p-3">
                      <Mail className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1">Email</h3>
                      <p className="text-zinc-400">contact@braizerecords.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-red-500/10 p-3">
                      <Phone className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1">Téléphone</h3>
                      <p className="text-zinc-400">+33 2 99 XX XX XX</p>
                      <p className="text-sm text-zinc-500">Lun-Ven, 10h-19h</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Adresse et Map */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-red-500/10 p-3">
                  <MapPin className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">Studios & Bureaux</h3>
                  <p className="text-zinc-400 mb-2">
                    5 Allée de la Grande Treille
                    <br />
                    35000 Rennes, France
                  </p>
                  <div className="flex gap-2 text-sm text-zinc-500">
                    <Clock className="h-4 w-4" />
                    <span>Du lundi au vendredi, 10h-19h</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg overflow-hidden border border-zinc-800">
                <MapComponent />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}