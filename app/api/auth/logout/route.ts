// app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    // Créer une réponse qui supprime le cookie
    const response = NextResponse.json(
      { success: true },
      { status: 200 }
    )

    // Supprimer le cookie d'authentification
    response.cookies.delete('auth-token')

    return response
  } catch (error) {
    console.error('Erreur de déconnexion:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la déconnexion' },
      { status: 500 }
    )
  }
}