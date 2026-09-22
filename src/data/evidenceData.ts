import type { EvidenceItem } from '../types';

export const EVIDENCE_LIST: EvidenceItem[] = [
  {
    id: 'memo-rules',
    tag: 'DIRECTIVE // 00',
    title: 'CASE FILE 804 PROTOCOL',
    category: 'memo',
    boardPos: { xPercent: 12, yPercent: 14, rotation: -2.5 },
    pinPos: { xPercent: 12, yPercent: 14 },
    stamp: 'CLASSIFIED',
    stampColor: 'red',
    shortSnippet: 'Standard investigative directive for the Red Room occurrence. Examine evidence, connect threads, decipher safe.',
    dossier: {
      classification: 'LEVEL 4 // INVESTIGATOR EYES ONLY',
      date: 'OCT 12, 1997 - 01:15 HRS',
      investigator: 'DETECTIVE J. RENARD',
      subject: 'SPECIAL DIRECTIVE 804: CRIME SCENE ACCESS',
      synopsis: 'At 22:14 hours, silent distress beacons were tripped in Penthouse 404. Patrol discovered the body of council diplomat Evelyn Cross. The doors were deadbolted from the inside with no sign of forced entry.',
      keyFindings: [
        'MISSION: Scrutinize the four pieces of evidence on this board.',
        'UV SCANNER: Crime scene photographs may contain hidden luminal traces under UV light.',
        'SUSPECT TIES: Check suspect mugshot booking records for matching numerical sequences.',
        'THE SAFE: An encrypted steel lockbox remains sealed in the corner of Suite 404. Find the 4-digit code to crack it.'
      ],
      secretClue: 'NOTE: The killer dropped a numerical footprint across multiple exhibits.'
    }
  },
  {
    id: 'crime-scene',
    tag: 'EXHIBIT // A',
    title: 'SUITE 404 CRIME SCENE',
    category: 'photo',
    image: '/assets/crime_scene.jpg',
    boardPos: { xPercent: 38, yPercent: 12, rotation: 1.8 },
    pinPos: { xPercent: 38, yPercent: 12 },
    stamp: 'SCENE EVIDENCE',
    stampColor: 'red',
    shortSnippet: 'Chalk outline on hardwood, broken vintage crystal, heavy rain streaks on panoramic glass.',
    dossier: {
      classification: 'FORENSIC PHOTOGRAPHY // CONFIDENTIAL',
      date: 'OCT 11, 1997 - 23:45 HRS',
      investigator: 'CSI AGENT MORRISON',
      subject: 'LIVING ROOM PERIMETER - SUITE 404',
      synopsis: 'Victim was found collapsed adjacent to the balcony sliding door. The glass is intact from the exterior. A crystal wine goblet was crushed near the chalk outline, containing residues of Romanée-Conti 1945 mixed with paralytics.',
      keyFindings: [
        'Single silhouette with cigarette embers still smoldering on the balcony.',
        'Chalk outline indicates victim collapsed abruptly facing away from the shooter.',
        'Scattered glass shards show inward explosive fracture velocity.',
        'Curtain rods slightly dislodged, suggesting a brief struggle.'
      ],
      hasUvLight: true,
      uvMessage: 'BLOOD ETCHING FOUND UNDER UV LAMP: "VAULT KEY = 7 3 0 4"'
    }
  },
  {
    id: 'suspect-vance',
    tag: 'DOSSIER // 01',
    title: 'SUSPECT: VICTOR VANCE',
    category: 'suspect',
    image: '/assets/suspect_mugshot.jpg',
    boardPos: { xPercent: 68, yPercent: 15, rotation: -1.2 },
    pinPos: { xPercent: 68, yPercent: 15 },
    stamp: 'PRIME SUSPECT',
    stampColor: 'red',
    shortSnippet: 'Alias "The Broker". Booking ID #73045. Claims alibi at the downtown jazz club at time of death.',
    dossier: {
      classification: 'CRIMINAL ARCHIVE // ARREST WARRANT',
      date: 'OCT 12, 1997 - 03:20 HRS',
      investigator: 'INSPECTOR G. STONE',
      subject: 'VICTOR VANCE (ALIAS: THE GHOST BROKER)',
      synopsis: 'Arrested 3 blocks from the perimeter carrying a damp black trenchcoat and smelling of gun residue. Claims he was at The Velvet Room until 23:00. Bartender testimony contradicts his arrival time by over two hours.',
      keyFindings: [
        'Booking Registry Number: 73045.',
        'Height: 6\'0", Weight: 185 lbs. Prior military weapons specialization.',
        'Fingerprint matches latent smudges lifted from the broken crystal goblet.',
        'Motive: Evelyn Cross was preparing an anti-corruption deposition targeting Vance\'s syndicate.'
      ],
      secretClue: 'Notice his prisoner placard digits: "73045". The first 4 numbers match the safe code!'
    }
  },
  {
    id: 'coroner-report',
    tag: 'AUTOPSY // 03',
    title: 'CORONER REPORT & TOXICOLOGY',
    category: 'forensics',
    image: '/assets/forensic_autopsy.jpg',
    boardPos: { xPercent: 22, yPercent: 58, rotation: -2.0 },
    pinPos: { xPercent: 22, yPercent: 58 },
    stamp: 'CONFIDENTIAL',
    stampColor: 'amber',
    shortSnippet: 'Fatal 9mm thoracic round. High blood alcohol (0.14%) combined with synthetic sedative.',
    dossier: {
      classification: 'OFFICE OF THE CHIEF MEDICAL EXAMINER',
      date: 'OCT 12, 1997 - 05:40 HRS',
      investigator: 'DR. TAKEMI, CHIEF PATHOLOGIST',
      subject: 'AUTOPSY POST-MORTEM // VICTIM 804',
      synopsis: 'Subject sustained two penetrating gunshot wounds. CSW1 entered left anterior thorax at a 15-degree downward trajectory, perforating the myocardium. CSW2 grazed the right forearm (defensive reflex).',
      keyFindings: [
        'Time of death estimated between 22:00 and 22:30 hours.',
        'Toxicology indicates 0.14% blood alcohol alongside concentrated synthetic neuro-sedative.',
        'Ballistics: 9mm hollow-point fired from a suppressed firearm at point-blank range.',
        'Conclusion: Victim was chemically incapacitated before being executed.'
      ],
      secretClue: 'Sedative reaction time is under 90 seconds. The poison was administered inside the room.'
    }
  },
  {
    id: 'safe-cipher',
    tag: 'CIPHER // 04',
    title: 'ENCRYPTED SAFE & TAPE',
    category: 'wiretap',
    image: '/assets/cassette_recorder.jpg',
    boardPos: { xPercent: 62, yPercent: 56, rotation: 2.2 },
    pinPos: { xPercent: 62, yPercent: 56 },
    stamp: 'RESTRICTED',
    stampColor: 'amber',
    shortSnippet: 'Reinforced electronic safe and wiretap recorder seized from the crime scene. Awaiting 4-digit code.',
    dossier: {
      classification: 'PHYSICAL EVIDENCE VAULT // SECURE STORAGE',
      date: 'OCT 12, 1997 - 02:00 HRS',
      investigator: 'TECH SPECIALIST N. KANE',
      subject: 'ELECTRONIC LOCKBOX MODEL-7 & AUDIO LOG',
      synopsis: 'Heavy gauge alloy safe discovered concealed behind the bookcase in Penthouse 404. Connected to an analog reel-to-reel audio tap that triggered automatically on loud decibel spikes.',
      keyFindings: [
        'Keypad requires a 4-digit security code.',
        'Clues to the passcode are hidden across the crime scene UV scans and suspect booking numbers.',
        'Unlocking the safe reveals the audio tape confession and clears the case!'
      ],
      hasKeypad: true
    }
  }
];

// Conspiracy threads connecting the pins on the board
export const THREAD_CONNECTIONS: [string, string][] = [
  ['memo-rules', 'crime-scene'],
  ['crime-scene', 'suspect-vance'],
  ['crime-scene', 'coroner-report'],
  ['suspect-vance', 'safe-cipher'],
  ['coroner-report', 'safe-cipher'],
];
