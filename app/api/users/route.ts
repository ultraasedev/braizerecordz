// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/app/lib/mongodb'
import User from '@/app/models/User'
import { verifyAuth } from '@/app/lib/auth'
import crypto from 'crypto'

// Fonction pour générer l'URL Gravatar
function getGravatarUrl(email: string) {
  const hash = crypto
    .createHash('md5')
    .update(email.toLowerCase().trim())
    .digest('hex')
  return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=200`
}

// GET: Récupérer tous les utilisateurs
export async function GET(req: NextRequest) {
  console.log('🔍 Récupération des utilisateurs...')
  
  try {
    const auth = await verifyAuth(req)
    if (!auth || auth.role !== 'superadmin') {
      console.log('❌ Accès non autorisé')
      return NextResponse.json(
        { error: 'Accès non autorisé' },
        { status: 403 }
      )
    }

    await connectDB()
    console.log('✅ Connexion DB établie')

    const users = await User.find({})
      .select('-password')
      .sort({ createdAt: -1 })

    console.log(`✅ ${users.length} utilisateurs récupérés`)

    // Ajout des URLs Gravatar
    const usersWithAvatars = users.map(user => ({
      ...user.toJSON(),
      avatar: getGravatarUrl(user.email)
    }))

    return NextResponse.json(usersWithAvatars)
  } catch (error) {
    console.error('❌ Erreur:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des utilisateurs' },
      { status: 500 }
    )
  }
}

// POST: Créer un nouvel utilisateur
export async function POST(req: NextRequest) {
  console.log('➕ Création d\'un nouvel utilisateur...')
  
  try {
    const auth = await verifyAuth(req)
    if (!auth || auth.role !== 'superadmin') {
      console.log('❌ Accès non autorisé')
      return NextResponse.json(
        { error: 'Accès non autorisé' },
        { status: 403 }
      )
    }

    await connectDB()
    const userData = await req.json()
    
    // Vérification de l'email
    const existingUser = await User.findOne({ email: userData.email })
    if (existingUser) {
      console.log('❌ Email déjà utilisé')
      return NextResponse.json(
        { error: 'Cet email est déjà utilisé' },
        { status: 400 }
      )
    }

    // Ajout de l'avatar Gravatar
    const avatar = getGravatarUrl(userData.email)
    
    const newUser = await User.create({
      ...userData,
      avatar
    })

    console.log('✅ Utilisateur créé:', newUser.email)

    const userResponse = await User.findById(newUser._id)
      .select('-password')

    return NextResponse.json({
      ...userResponse.toJSON(),
      avatar
    })
  } catch (error) {
    console.error('❌ Erreur:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création de l\'utilisateur' },
      { status: 500 }
    )
  }
}

// PATCH: Modifier un utilisateur
export async function PATCH(req: NextRequest) {
  console.log('📝 Modification d\'un utilisateur...')
  
  try {
    const auth = await verifyAuth(req)
    if (!auth || auth.role !== 'superadmin') {
      console.log('❌ Accès non autorisé')
      return NextResponse.json(
        { error: 'Accès non autorisé' },
        { status: 403 }
      )
    }

    await connectDB()
    const { id, ...updateData } = await req.json()

    // Si l'email est modifié, mettre à jour l'avatar
    if (updateData.email) {
      updateData.avatar = getGravatarUrl(updateData.email)
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).select('-password')

    if (!updatedUser) {
      console.log('❌ Utilisateur non trouvé')
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      )
    }

    console.log('✅ Utilisateur modifié:', updatedUser.email)

    return NextResponse.json({
      ...updatedUser.toJSON(),
      avatar: updatedUser.avatar || getGravatarUrl(updatedUser.email)
    })
  } catch (error) {
    console.error('❌ Erreur:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la modification de l\'utilisateur' },
      { status: 500 }
    )
  }
}

// DELETE: Supprimer un utilisateur
export async function DELETE(req: NextRequest) {
  console.log('🗑️ Suppression d\'un utilisateur...')
  
  try {
    const auth = await verifyAuth(req)
    if (!auth || auth.role !== 'superadmin') {
      console.log('❌ Accès non autorisé')
      return NextResponse.json(
        { error: 'Accès non autorisé' },
        { status: 403 }
      )
    }

    await connectDB()
    const { id } = await req.json()

    // Vérifier si c'est le dernier superadmin
    if (auth.userId === id) {
      const superadminCount = await User.countDocuments({ 
        role: 'superadmin',
        _id: { $ne: id }
      })

      if (superadminCount === 0) {
        console.log('❌ Impossible de supprimer le dernier superadmin')
        return NextResponse.json(
          { error: 'Impossible de supprimer le dernier superadmin' },
          { status: 400 }
        )
      }
    }

    const deletedUser = await User.findByIdAndDelete(id)

    if (!deletedUser) {
      console.log('❌ Utilisateur non trouvé')
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      )
    }

    console.log('✅ Utilisateur supprimé:', deletedUser.email)

    return NextResponse.json({
      message: 'Utilisateur supprimé avec succès'
    })
  } catch (error) {
    console.error('❌ Erreur:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de l\'utilisateur' },
      { status: 500 }
    )
  }
}