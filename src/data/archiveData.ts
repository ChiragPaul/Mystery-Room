import type { CaseReport } from '../types';

export const CASE_ARCHIVES: CaseReport[] = [
  {
    id: 'case-2025',
    year: '2025',
    codename: 'THE RED ROOM OCCURRENCE',
    status: 'SOLVED',
    date: 'OCTOBER 31, 2025 - 22:14 HRS',
    location: 'PENTHOUSE 404, BLACKSTONE TOWERS',
    leadInvestigator: 'DETECTIVE V. CHEN // SPECIAL ARCHIVE',
    summary:
      'A high-stakes homicide staged inside a fortified penthouse. The victim was silenced seconds before the encrypted safe could be breached. Five pieces of critical physical evidence unlocked the conspirators identity.',
    videoUrl: '/assets/scene1.mp4',
    videoTitle: 'SECURITY TAPE // REEL 804 - INCIDENT RECONSTRUCTION',
    photos: [
      {
        url: '/assets/crime_scene.jpg',
        caption: 'EXHIBIT A: Penthouse study, blood spatter pattern near safe',
        rotation: -2,
      },
      {
        url: '/assets/cassette_recorder.jpg',
        caption: 'EXHIBIT B: Wiretap cassette player found hidden under floorboard',
        rotation: 3,
      },
      {
        url: '/assets/forensic_autopsy.jpg',
        caption: 'EXHIBIT C: Ballistics report confirming .38 snub special caliber',
        rotation: -1.5,
      },
      {
        url: '/assets/suspect_mugshot.jpg',
        caption: 'EXHIBIT D: Primary suspect apprehended at border checkpoint',
        rotation: 2.5,
      },
    ],
    caseNotes: [
      '22:14 - A single gunshot reported by concierge on 4th floor.',
      '22:20 - Emergency police response unit establishes perimeter.',
      '22:45 - Safe mechanism inspected; UV luminescent fingerprints recovered.',
      '01:10 - Team deciphered encrypted audio cassette, revealing inside informant.',
    ],
    solvedTime: '48m 12s',
    stampText: 'DE-CLASSIFIED // ARCHIVED',
  },
  {
    id: 'case-2024',
    year: '2024',
    codename: 'THE BLACKOUT PROTOCOL',
    status: 'SOLVED',
    date: 'OCTOBER 28, 2024 - 03:00 HRS',
    location: 'SECTOR 9 SUBTERRANEAN RESEARCH VAULT',
    leadInvestigator: 'AGENT M. KOWALSKI // FORENSIC UNIT',
    summary:
      'A complete electrical and communication shutdown plunged the underground laboratory into darkness. Investigators had 60 minutes to bypass biological lockdown bulkheads and reconstruct the sabotage trail.',
    videoUrl: '/assets/scene 2.mp4',
    videoTitle: 'VAULT CCTV // AUXILIARY POWER SURVEILLANCE FEED',
    photos: [
      {
        url: '/assets/archive_room.jpg',
        caption: 'EXHIBIT A: Decommissioned control station with analog monitors',
        rotation: 2,
      },
      {
        url: '/assets/final.png',
        caption: 'EXHIBIT B: Biological containment seal ruptured with crimson fluid',
        rotation: -3,
      },
      {
        url: '/assets/cassette_recorder.jpg',
        caption: 'EXHIBIT C: Distress frequency loop transmitted on 142.85 MHz',
        rotation: 1.5,
      },
      {
        url: '/assets/crime_scene.jpg',
        caption: 'EXHIBIT D: Emergency manual override terminal',
        rotation: -2,
      },
    ],
    caseNotes: [
      '03:00 - Main substation grid severed. Emergency red emergency lights active.',
      '03:18 - Investigators deciphered chemical reagent color chart on chalkboard.',
      '03:42 - Pneumatic tube dispatch system overridden via manual valve sequence.',
      '03:54 - Vault door unsealed; escape route secured with 5 minutes remaining.',
    ],
    solvedTime: '54m 38s',
    stampText: 'VAULT SEALED // ESCAPED',
  },
  {
    id: 'case-2023',
    year: '2023',
    codename: 'THE CLOCKTOWER SÉANCE',
    status: 'COLD CASE',
    date: 'OCTOBER 30, 2023 - 23:59 HRS',
    location: 'OLD TOWN BELL TOWER & SANCTUM',
    leadInvestigator: 'INSPECTOR E. STERLING // OCCULT DIVISION',
    summary:
      'The town clock halted at midnight following the disappearance of a prominent antiquarian. An eerie parlor room filled with ciphers, tarot symbology, and a mechanical pendulum concealed the clockmaker secrets.',
    videoUrl: '/assets/scene3.mp4',
    videoTitle: 'ANALOG CHRONOGRAPH // GEAR MECHANISM TIME-LAPSE',
    photos: [
      {
        url: '/assets/Name.png',
        caption: 'EXHIBIT A: Heavy velvet drapes concealing the sanctum chamber',
        rotation: -2.5,
      },
      {
        url: '/assets/archive_room.jpg',
        caption: 'EXHIBIT B: The antiquarian parlor with abandoned mahogany cabinets',
        rotation: 3,
      },
      {
        url: '/assets/forensic_autopsy.jpg',
        caption: 'EXHIBIT C: Astrological star chart annotated with cipher codes',
        rotation: -1,
      },
      {
        url: '/assets/suspect_mugshot.jpg',
        caption: 'EXHIBIT D: Shadowy silhouette observed fleeing across the rooftops',
        rotation: 2,
      },
    ],
    caseNotes: [
      '23:59 - Grandfather clock pendulum pinned with antique bone dagger.',
      '00:15 - Ultraviolet examination revealed astronomical glyphs on the rug.',
      '00:39 - Gearbox puzzle realigned to sound the midnight bell chime.',
      '00:58 - Secret chamber discovered behind the mahogany wardrobe.',
    ],
    solvedTime: '59m 02s',
    stampText: 'COLD CASE // UNSOLVED MYSTERY',
  },
];
