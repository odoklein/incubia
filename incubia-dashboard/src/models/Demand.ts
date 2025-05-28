// src/models/Demand.ts
import mongoose, { Schema, Document } from 'mongoose'

export interface Note {
  content: string
  createdAt: Date
}

export interface DemandDoc extends Document {
  type: string
  status: string
  createdAt: Date
  applicantName: string
  applicantEmail: string
  applicantPhone?: string
  sectors: string[]
  yearsExperience: number
  availability: string
  motivation: string
  cvUrl?: string
  notes: Note[]
}

const NoteSchema = new Schema<Note>({
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

const DemandSchema = new Schema<DemandDoc>({
  type: { type: String, required: true },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  applicantName: { type: String, required: true },
  applicantEmail: { type: String, required: true },
  applicantPhone: { type: String },
  sectors: [{ type: String }],
  yearsExperience: { type: Number, required: true },
  availability: { type: String, required: true },
  motivation: { type: String, required: true },
  cvUrl: { type: String },
  notes: [NoteSchema],
})

export default mongoose.models.Demand || mongoose.model<DemandDoc>('Demand', DemandSchema)
