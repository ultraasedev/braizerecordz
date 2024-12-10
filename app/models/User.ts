// app/models/User.ts
import mongoose, { Model, Document, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'

// Interface pour le document User
interface IUser extends Document {
  email: string
  password: string
  name: string
  role: 'superadmin' | 'employee' | 'accountant' | 'artist'
  permissions: string[]
  createdAt: Date
  lastLogin?: Date
  active: boolean
}

// Interface pour les méthodes
interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>
}

// Combinaison des interfaces pour le modèle
type UserModel = Model<IUser, {}, IUserMethods>

const userSchema = new Schema<IUser, UserModel>({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  role: {
    type: String,
    enum: ['superadmin', 'employee', 'accountant', 'artist'],
    required: true
  },
  permissions: [{
    type: String,
    enum: [
      'manage_artists',
      'manage_files',
      'view_analytics',
      'manage_social',
      'manage_calendar',
      'view_financials'
    ]
  }],
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  lastLogin: Date,
  active: {
    type: Boolean,
    default: true
  }
})

// Ajout de la méthode comparePassword
userSchema.method('comparePassword', async function(candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password)
})

// Middleware pre-save pour hasher le mot de passe
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12)
  }
  next()
})

// Compilation du modèle
const User = mongoose.models.User || mongoose.model<IUser, UserModel>('User', userSchema);

export default User;