export type GameStage = 'STAGE_LOCKED' | 'STAGE_CINEMATIC' | 'STAGE_CLUEBOARD' | 'STAGE_CAMCORDER';

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
