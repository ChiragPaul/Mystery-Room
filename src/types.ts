export type GameStage = 'STAGE_LOCKED' | 'STAGE_CINEMATIC' | 'STAGE_CLUEBOARD' | 'STAGE_CAMCORDER' | 'STAGE_FILEROOM';

export interface CaseReport {
  id: string;
  year: string;
  codename: string;
  status: 'SOLVED' | 'COLD CASE' | 'CLASSIFIED';
  date: string;
  location: string;
  leadInvestigator: string;
  summary: string;
  videoUrl: string;
  videoTitle: string;
  photos: {
    url: string;
    caption: string;
    rotation: number;
  }[];
  caseNotes: string[];
  solvedTime?: string;
  stampText: string;
}

export interface EvidenceItem {
  id: string;
  tag: string;
  title: string;
  category: 'memo' | 'photo' | 'suspect' | 'forensics' | 'wiretap';
  // Percent coordinates on the detective board (0-100)
  boardPos: {
    xPercent: number;
    yPercent: number;
    rotation: number; // degrees
  };
  // Pin point relative to card center for connecting red SVG conspiracy threads
  pinPos: {
    xPercent: number;
    yPercent: number;
  };
  image?: string;
  shortSnippet: string;
  stamp: string;
  stampColor: 'red' | 'amber' | 'white';
  dossier: {
    classification: string;
    date: string;
    investigator: string;
    subject: string;
    synopsis: string;
    keyFindings: string[];
    secretClue?: string;
    hasUvLight?: boolean;
    uvMessage?: string;
    hasKeypad?: boolean;
  };
}
