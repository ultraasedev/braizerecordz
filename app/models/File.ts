// models/File.ts

import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    path: { type: String, required: true },
    type: { type: String, required: true },
    size: Number,
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    sharedWith: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      accessType: { type: String, enum: ['view', 'edit'] }
    }],
    privateLink: String,
    expireAt: Date,
    createdAt: { type: Date, default: Date.now }
  })
  