// models/SocialPost.ts

import mongoose from "mongoose";

const socialPostSchema = new mongoose.Schema({
    artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist' },
    platform: {
      type: String,
      enum: ['instagram', 'facebook', 'twitter', 'tiktok']
    },
    content: String,
    media: [String],
    scheduledFor: Date,
    status: {
      type: String,
      enum: ['draft', 'scheduled', 'published', 'failed']
    },
    analytics: {
      likes: Number,
      comments: Number,
      shares: Number,
      reach: Number
    },
    createdAt: { type: Date, default: Date.now }
  })