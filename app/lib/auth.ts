// lib/auth.ts
import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET!

// Interface pour le payload JWT
interface JWTPayload {
  userId: string
  role: string
  iat?: number
  exp?: number
}

export function generateToken(userId: string, role: string): string {
  return jwt.sign(
    { userId, role } as JWTPayload,
    JWT_SECRET,
    { expiresIn: '24h' }
  )
}

export async function verifyAuth(req: NextRequest): Promise<JWTPayload | null> {
  try {
    const token = req.headers.get('authorization')?.split(' ')[1]

    if (!token) {
      return null
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload
    return decoded
  } catch (error) {
    return null
  }
}

// Fonction utilitaire pour vérifier les permissions
export function hasPermission(
  userRole: string,
  requiredRoles: string[]
): boolean {
  if (userRole === 'superadmin') return true
  return requiredRoles.includes(userRole)
}