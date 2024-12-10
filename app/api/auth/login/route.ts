// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/app/lib/mongodb'
import User from '@/app/models/User'
import { generateToken } from '@/app/lib/auth'

export async function POST(req: NextRequest) {
  console.log('=== Début de la tentative de connexion ===')
  
  try {
    // Connexion à la base de données
    console.log('Tentative de connexion à MongoDB...')
    await connectDB()
    console.log('✅ Connecté à MongoDB')
    
    // Récupération des données de la requête
    const body = await req.json()
    const { email, password } = body
    console.log('📧 Tentative de connexion pour:', email)

    // Recherche de l'utilisateur
    console.log('🔍 Recherche de l\'utilisateur dans la base de données...')
    const user = await User.findOne({ email, active: true })
    
    if (!user) {
      console.log('❌ Utilisateur non trouvé ou inactif')
      return NextResponse.json(
        { error: 'Email ou mot de passe incorrect' },
        { status: 401 }
      )
    }
    console.log('✅ Utilisateur trouvé')

    // Vérification du mot de passe
    console.log('🔐 Vérification du mot de passe...')
    const isValidPassword = await user.comparePassword(password)
    console.log('Résultat de la comparaison:', isValidPassword)
    
    if (!isValidPassword) {
      console.log('❌ Mot de passe incorrect')
      return NextResponse.json(
        { error: 'Email ou mot de passe incorrect' },
        { status: 401 }
      )
    }
    console.log('✅ Mot de passe valide')

    // Mise à jour de la dernière connexion
    console.log('📅 Mise à jour de la dernière connexion...')
    user.lastLogin = new Date()
    await user.save()
    console.log('✅ Dernière connexion mise à jour')

    // Génération du token
    console.log('🔑 Génération du token JWT...')
    const token = generateToken(user._id.toString(), user.role)
    console.log('✅ Token généré')

    // Création de la réponse avec cookie
    const response = NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        permissions: user.permissions
      }
    })

    // Ajout du cookie sécurisé
    response.cookies.set({
      name: 'auth-token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 // 24 heures
    })

    console.log('✅ Connexion réussie')
    return response

  } catch (error) {
    console.error('❌ Erreur lors de la connexion:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la connexion' },
      { status: 500 }
    )
  } finally {
    console.log('=== Fin de la tentative de connexion ===')
  }
}