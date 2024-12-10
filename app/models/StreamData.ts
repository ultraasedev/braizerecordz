
// models/StreamData.ts
import mongoose from "mongoose";
const streamDataSchema = new mongoose.Schema({
    artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist' },
    platform: {
      type: String,
      enum: ['spotify', 'deezer', 'appleMusic', 'youtubeMusic']
    },
    streams: Number,
    listeners: Number,
    revenue: Number,
    date: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now }
  })
  