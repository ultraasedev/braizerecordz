// scripts/createDefaultUser.ts
import connectDB from '../app/lib/mongodb'
import User from '../app/models/User'
import { MongoServerError } from 'mongodb'

async function createDefaultUser() {
  try {
    console.log('Tentative de connexion à MongoDB...')
    await connectDB()
    console.log('Connecté à MongoDB avec succès')

    const defaultUser = {
      email: 'admin@braizerecords.com',
      password: 'admin123', // Le hashage sera fait automatiquement par le schema
      name: 'Super Admin',
      role: 'superadmin',
      permissions: [
        'manage_artists',
        'manage_files',
        'view_analytics',
        'manage_social',
        'manage_calendar',
        'view_financials'
      ]
    }

    console.log('Vérification de l\'existence de l\'utilisateur...')
    const existingUser = await User.findOne({ email: defaultUser.email })

    if (!existingUser) {
      console.log('Création de l\'utilisateur par défaut...')
      const user = await User.create(defaultUser)
      console.log('Utilisateur par défaut créé avec succès:', {
        email: user.email,
        name: user.name,
        role: user.role
      })
    } else {
      console.log('L\'utilisateur par défaut existe déjà')
    }

  } catch (error: unknown) {
    if (error instanceof MongoServerError) {
      console.error('Erreur MongoDB lors de la création de l\'utilisateur:', {
        code: error.code,
        codeName: error.codeName,
        message: error.message
      })
    } else if (error instanceof Error) {
      console.error('Erreur lors de la création de l\'utilisateur:', error.message)
    } else {
      console.error('Une erreur inconnue est survenue:', error)
    }
  } finally {
    process.exit()
  }
}

createDefaultUser()