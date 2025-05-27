export type DemandType = 'mentor' | 'investor' | 'startup';
export type DemandStatus = 'Nouveau' | 'Confirmé' | 'Abandonné' | 'En attente';

export interface Note {
  id: string;
  author: string;
  createdAt: string;
  content: string;
}

export interface ApplicantInfo {
  name: string;
  email: string;
  phone: string;
}

export interface MentorMeta {
  sectors: string[];
  yearsExperience: number;
  availability: string;
  motivation: string;
  cvUrl?: string;
}

export interface InvestorMeta {
  companyName: string;
  amountRange: string;
  interestedSectors: string[];
  pastExperience: string;
  source?: string;
}

export interface StartupMeta {
  projectStage: 'idéation' | 'MVP' | 'croissance';
  need: 'incubation' | 'accélération';
  sector: string;
  pitchDeckUrl?: string;
  description: string;
  mainChallenge: string;
}

export type DemandMeta = MentorMeta | InvestorMeta | StartupMeta;

export interface Demand {
  id: string;
  type: DemandType;
  status: DemandStatus;
  createdAt: string;
  applicant: ApplicantInfo;
  metadata: DemandMeta;
  lastUpdatedBy?: string;
  lastUpdatedAt?: string;
  notes: Note[];
}
