/**
 * TECHBYTES SUMMIT '26 — SYMPOSIUM CENTRAL DATA REPOSITORY
 * 
 * Centralized data configuration for all symposium events, timeline points,
 * and mission dossiers. Exact official content for TECHBYTES SUMMIT '26.
 */

export const SYMPOSIUM_INFO = {
  name: "TECHBYTES SUMMIT '26",
  subtitle: "A Two-Day Technical Symposium",
  institution: "KPR Institute of Engineering and Technology",
  location: "Coimbatore, Tamil Nadu, India",
  fullAddress: "Avinashi Road, Arasur, Coimbatore, Tamil Nadu 641407",
  venueBlock: "Department of CSE, D Block, near Symphony Amphitheatre",
  dates: "09–10 OCTOBER 2026",
  department: "Department of Computer Science and Engineering",
  passPrice: "₹399",
  overallPrizePool: "₹15K PRIZE POOL",
  additionalPerks: "GeeksforGeeks Coupons",
  ticketingPartner: "Ticket9",
  passPerks: [
    "ALL 6 MISSIONS",
    "BOTH DAYS",
    "LUNCH INCLUDED",
    "REFRESHMENTS"
  ],
  overallCoordinators: {
    faculty: [
      { name: "Dr. V. Priya", phone: "9965418490" },
      { name: "Dr. M. Ambika", phone: "8754606290" },
    ],
    students: [
      { name: "Sathya R V", phone: "7604903115" },
      { name: "Srivishnu J", phone: "6382906285" },
      { name: "Aswath S", phone: "8056473519" },
    ]
  }
};

export const MISSIONS_DATA = {
  "mission-01": {
    id: "mission-01",
    num: "01",
    day: "DAY 01",
    date: "09 OCTOBER 2026",
    dayTrack: "DAY 01 // 09 OCTOBER 2026",
    title: "PAPER PRESENTATION",
    fullTitle: "MISSION 01 // PAPER PRESENTATION",
    categoryBadge: "RESEARCH DOSSIER",
    icon: "article",
    briefing: "Open topic — participants can present any engineering related open theme papers.",
    about: "Participants can present any engineering related open theme papers.",
    theme: "Open topic — engineering related open themes.",
    participation: "2–4 members per team",
    duration: "5 + 3 mins",
    presentationTime: "5 minutes presentation",
    qaTime: "3 minutes Q&A",
    prizePool: "₹5,000 PRIZE POOL",
    certificatePolicy: {
      hardCopy: "1st, 2nd & 3rd Place Winners — Hard Copy Certificates",
      eCert: "All Other Participants — E-Certificates"
    },
    rules: [
      "Come prepared",
      "No vulnerable topic",
      "Present within the time limit",
      "Jury decision would be final",
      "1st, 2nd & 3rd Place Winners receive Hard Copy Certificates",
      "All other participants receive E-Certificates"
    ],
    coordinators: [
      { name: "Vishnushri S", phone: "8807831204" },
      { name: "Varsha V", phone: "9791656082" }
    ]
  },
  "mission-02": {
    id: "mission-02",
    num: "02",
    day: "DAY 01",
    date: "09 OCTOBER 2026",
    dayTrack: "DAY 01 // 09 OCTOBER 2026",
    title: "PROJECT PRESENTATION",
    fullTitle: "MISSION 02 // PROJECT PRESENTATION",
    categoryBadge: "BLUEPRINT LAB",
    icon: "developer_mode",
    briefing: "Open topic — participants can present any engineering related open theme projects.",
    about: "Participants can present any engineering related open theme projects. Project type: Hardware / Software / anything engineering-related.",
    theme: "Hardware / Software / anything engineering-related.",
    participation: "2–4 members per team",
    projectType: "Hardware / Software / anything engineering-related",
    duration: "5 + 3 mins",
    presentationTime: "5 minutes presentation",
    qaTime: "3 minutes Q&A",
    prizePool: "₹5,000 PRIZE POOL",
    certificatePolicy: {
      hardCopy: "1st, 2nd & 3rd Place Winners — Hard Copy Certificates",
      eCert: "All Other Participants — E-Certificates"
    },
    rules: [
      "Come prepared",
      "No vulnerable theme",
      "Present within the time limit",
      "Jury decision would be final",
      "Prototype is mandatory for both hardware and software",
      "Prototype explanation must be included within the presentation time limit",
      "There is no separate time for prototype explanation",
      "1st, 2nd & 3rd Place Winners receive Hard Copy Certificates",
      "All other participants receive E-Certificates"
    ],
    coordinators: [
      { name: "Thinakar V", phone: "9345733975" },
      { name: "Varun B", phone: "8137880602" }
    ]
  },
  "mission-03": {
    id: "mission-03",
    num: "03",
    day: "DAY 01",
    date: "09 OCTOBER 2026",
    dayTrack: "DAY 01 // 09 OCTOBER 2026",
    title: "POSTER PRESENTATION",
    fullTitle: "MISSION 03 // POSTER PRESENTATION",
    categoryBadge: "VISUAL INTEL",
    icon: "photo_library",
    briefing: "Open topic — participants can present any engineering related open theme.",
    about: "Participants can present any engineering related open theme.",
    theme: "Engineering related open theme.",
    participation: "2–4 members per team",
    duration: "5 + 3 mins",
    presentationTime: "5 minutes presentation",
    qaTime: "3 minutes Q&A",
    prizePool: "₹5,000 PRIZE POOL",
    certificatePolicy: {
      hardCopy: "1st, 2nd & 3rd Place Winners — Hard Copy Certificates",
      eCert: "All Other Participants — E-Certificates"
    },
    rules: [
      "Come prepared",
      "No vulnerable topic",
      "Present within the time limit",
      "Jury decision would be final",
      "AI usage is permitted. Participants must clearly disclose which parts or elements of the poster were generated or assisted using AI.",
      "1st, 2nd & 3rd Place Winners receive Hard Copy Certificates",
      "All other participants receive E-Certificates"
    ],
    coordinators: [
      { name: "Varnika M", phone: "9360659455" },
      { name: "Sowmitha M R", phone: "6369776485" }
    ]
  },
  "mission-04": {
    id: "mission-04",
    num: "04",
    day: "DAY 02",
    date: "10 OCTOBER 2026",
    dayTrack: "DAY 02 // 10 OCTOBER 2026",
    title: "EXECUTIVE DEVELOPMENT PROGRAMME",
    fullTitle: "MISSION 04 // EXECUTIVE DEVELOPMENT PROGRAMME",
    categoryBadge: "WORKSHOP",
    icon: "military_tech",
    briefing: "Executive Development Programme — Topic and Resource Person will be updated shortly.",
    about: "Executive Development Programme for delegates. E-Certificates will be provided.",
    topic: "Will be updated shortly",
    resourcePerson: "Will be updated shortly",
    participation: "Individual participation",
    duration: "Will be announced shortly",
    certificate: "E-Certificates for all registered participants",
    certificatePolicy: {
      hardCopy: null,
      eCert: "All Registered Participants — E-Certificates"
    },
    rules: [
      "Individual participation",
      "Topic: Will be updated shortly",
      "Resource Person: Will be updated shortly",
      "All registered participants receive E-Certificates"
    ],
    coordinators: [
      { name: "Shri Harithraa D", phone: "9345558509", role: "Workshop Coordinator" },
      { name: "Subashini S", phone: "9384198044", role: "Workshop Coordinator" }
    ]
  },
  "mission-05": {
    id: "mission-05",
    num: "05",
    day: "DAY 02",
    date: "10 OCTOBER 2026",
    dayTrack: "DAY 02 // 10 OCTOBER 2026",
    title: "CONCLAVE",
    fullTitle: "MISSION 05 // CONCLAVE",
    categoryBadge: "CONCLAVE",
    icon: "groups",
    briefing: "Conclave on emergent trends. More details will be furnished shortly.",
    about: "Conclave on emergent trends. E-Certificates will be provided.",
    participation: "Individual participation",
    theme: "Conclave on emergent trends",
    duration: "Will be announced",
    certificate: "E-Certificates for all registered delegates",
    certificatePolicy: {
      hardCopy: null,
      eCert: "All Registered Delegates — E-Certificates"
    },
    additionalDetails: "More details will be furnished shortly",
    rules: [
      "Participation: Individual participation",
      "Theme: Conclave on emergent trends",
      "Duration: Will be announced",
      "All registered delegates receive E-Certificates",
      "More details will be furnished shortly"
    ],
    coordinators: [
      { name: "Yogasree K S", phone: "9566968555" },
      { name: "Vishali T", phone: "8825540542" }
    ]
  },
  "mission-06": {
    id: "mission-06",
    num: "06",
    day: "DAY 02",
    date: "10 OCTOBER 2026",
    dayTrack: "DAY 02 // 10 OCTOBER 2026",
    title: "CODING CONTEST",
    fullTitle: "MISSION 06 // CODING CONTEST",
    subtitle: "Powered by GeeksforGeeks",
    poweredBy: "GeeksforGeeks",
    categoryBadge: "ALGO WAR",
    icon: "terminal",
    briefing: "Time based competitive programming contest. Powered by GeeksforGeeks.",
    about: "Time based competitive programming contest powered by GeeksforGeeks. Prizes: GeeksforGeeks Coupons. Participants receive GeeksforGeeks-powered certificates.",
    participation: "Individual",
    format: "Time based",
    theme: "Algorithms & Competitive Programming",
    additionalDetails: "Powered by GeeksforGeeks • Prizes: GeeksforGeeks Coupons",
    rewardTitle: "GEEKSFORGEEKS COUPONS",
    certificatePolicy: {
      hardCopy: "1st, 2nd & 3rd Place Winners — Hard Copy Certificates",
      eCert: "All Other Participants — GeeksforGeeks-Powered E-Certificates"
    },
    rules: [
      "Powered by GeeksforGeeks",
      "Participation: Individual",
      "Format: Time based competitive programming",
      "Coding Contest prizes: GeeksforGeeks Coupons",
      "1st, 2nd & 3rd Place Winners receive Hard Copy Certificates",
      "All other participants receive GeeksforGeeks-powered E-Certificates",
      "Other operational details will be shared shortly"
    ],
    coordinators: [
      { name: "Vigneshwaran K K", phone: "9543772772" },
      { name: "Sudharsan S", phone: "6380376871" }
    ]
  }
};

export const TIMELINE_POINTS = [
  {
    num: "01",
    id: "mission-01",
    title: "PAPER PRESENTATION",
    shortTitle: "PAPER PRESENTATION",
    day: "DAY 01",
    timing: "5 + 3 MINS",
    schedule: [
      { time: "5 MINS", label: "Presentation" },
      { time: "3 MINS", label: "Q&A Session" },
      { time: "FINAL", label: "Jury Decision" }
    ]
  },
  {
    num: "02",
    id: "mission-02",
    title: "PROJECT PRESENTATION",
    shortTitle: "PROJECT PRESENTATION",
    day: "DAY 01",
    timing: "5 + 3 MINS",
    schedule: [
      { time: "5 MINS", label: "Presentation & Prototype Demo" },
      { time: "3 MINS", label: "Q&A Session" },
      { time: "FINAL", label: "Jury Decision" }
    ]
  },
  {
    num: "03",
    id: "mission-03",
    title: "POSTER PRESENTATION",
    shortTitle: "POSTER PRESENTATION",
    day: "DAY 01",
    timing: "5 + 3 MINS",
    schedule: [
      { time: "5 MINS", label: "Poster Presentation" },
      { time: "3 MINS", label: "Q&A Session" },
      { time: "NOTE", label: "AI Allowed (No Fully AI Generated)" }
    ]
  },
  {
    num: "04",
    id: "mission-04",
    title: "EXECUTIVE DEVELOPMENT PROGRAMME",
    shortTitle: "EXECUTIVE DEVELOPMENT PROGRAMME",
    day: "DAY 02",
    timing: "DAY 02",
    schedule: [
      { time: "TOPIC", label: "Will be updated shortly" },
      { time: "SPEAKER", label: "Will be updated shortly" },
      { time: "AWARD", label: "Certificates will be provided" }
    ]
  },
  {
    num: "05",
    id: "mission-05",
    title: "CONCLAVE",
    shortTitle: "CONCLAVE",
    day: "DAY 02",
    timing: "DAY 02",
    schedule: [
      { time: "THEME", label: "Emergent Trends" },
      { time: "DETAILS", label: "Furnished Shortly" },
      { time: "ACCESS", label: "Open to Registered Delegates" }
    ]
  },
  {
    num: "06",
    id: "mission-06",
    title: "CODING CONTEST",
    shortTitle: "CODING CONTEST",
    subtitle: "Powered by GeeksforGeeks",
    day: "DAY 02",
    timing: "TIME BASED",
    schedule: [
      { time: "POWERED", label: "By GeeksforGeeks" },
      { time: "FORMAT", label: "Individual • Time Based" },
      { time: "PRIZES", label: "GeeksforGeeks Coupons" }
    ]
  }
];
