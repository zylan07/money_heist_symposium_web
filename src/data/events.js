/**
 * TECHBYTE SUMMIT '26 — SYMPOSIUM CENTRAL DATA REPOSITORY
 * 
 * Centralized data configuration for all symposium events, timeline points,
 * and mission dossiers. Exact official content for TECHBYTE SUMMIT '26.
 */

export const SYMPOSIUM_INFO = {
  name: "TECHBYTE SUMMIT '26",
  subtitle: "A Two-Day Technical Symposium",
  institution: "KPR Institute of Engineering and Technology",
  location: "Coimbatore, Tamil Nadu, India",
  fullAddress: "Avinashi Road, Arasur, Coimbatore, Tamil Nadu 641407",
  venueBlock: "Department of CSE, D Block, near Symphony Amphitheatre",
  dates: "14–15 OCTOBER 2026",
  department: "Department of Computer Science and Engineering",
  organizer: "Department of CSE",
  collaborator: "Yi Yuva Club, KPRIET",
  conductedBy: "Department of CSE in collaboration with Yi Yuva Club, KPRIET",
  passPrice: "₹399",
  overallPrizePool: "EXCITING CASH PRIZES & GIFTS",
  ticketingPartner: "Ticket9",
  passPerks: [
    "ALL 6 MISSIONS",
    "BOTH DAYS",
    "LUNCH INCLUDED",
    "REFRESHMENTS"
  ],
  operationCodename: "TECHBYTE SUMMIT '26",
  operationTagline: "A TWO-DAY NATIONAL TECHNICAL SYMPOSIUM",
  missionBrief:
    "A two-day national technical symposium conducted by the Department of CSE in collaboration with Yi Yuva Club, KPRIET. Featuring six events across research paper presentation, project demonstration, poster creation & presentation, an executive development programme, an emerging tech conclave, and a competitive coding contest.",
  welcomeTransmission:
    "Welcome to TECHBYTE SUMMIT '26 on 14–15 October 2026 at KPR Institute of Engineering and Technology, Coimbatore. Conducted by the Department of CSE in collaboration with Yi Yuva Club, KPRIET. Featuring six events designed to test and showcase your technical, problem-solving, and presentation skills. Register today and participate across both days.",
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
  // ─────────────────────────────────────────────────────────────────────────
  // MISSION 01 — PAPER PRESENTATION
  // ─────────────────────────────────────────────────────────────────────────
  "mission-01": {
    id: "mission-01",
    num: "01",
    day: "DAY 01",
    date: "14 OCTOBER 2026",
    dayTrack: "DAY 01 // 14 OCTOBER 2026",
    time: "10:00 AM onwards",
    timing: "10:00 AM onwards",
    title: "PAPER PRESENTATION",
    fullTitle: "MISSION 01 // PAPER PRESENTATION",
    categoryBadge: "RESEARCH PAPER",
    icon: "article",

    tagline: "PRESENT YOUR RESEARCH PAPER",
    shortDesc: "Present your research paper.",
    heistBrief:
      "Present your research paper on any engineering-related topic. 10:00 AM onwards on Day 01.",
    briefing:
      "Present your research paper.",
    cardSpecs: [
      { label: "TOPIC", value: "Engineering-related topic", icon: "category" },
      { label: "DURATION", value: "5 min presentation + 3 min Q&A", icon: "timer" },
      { label: "FORMAT", value: "Research paper presentation", icon: "article" }
    ],

    about:
      "Present your research paper on any engineering-related topic. You will have 5 minutes to present, followed by 3 minutes of Q&A with the jury.",
    theme: "Any engineering-related topic",
    participation: "2–4 members per team",
    duration: "5 minutes presentation + 3 minutes Q&A",
    presentationTime: "5 minutes presentation",
    qaTime: "3 minutes Q&A",
    prizePool: "EXCITING CASH PRIZES & GIFTS",
    certificate: "Certificates will be provided to all participants.",
    rules: [
      "Event timing: 10:00 AM onwards.",
      "Be prepared with your presentation.",
      "Choose an engineering-related topic.",
      "Complete your presentation within 5 minutes.",
      "3 minutes will be given for Q&A.",
      "The jury's decision will be final.",
      "Certificates will be provided to all participants."
    ],
    coordinators: [
      { name: "Vishnushri S", phone: "8807831204" },
      { name: "Varsha V", phone: "9791656082" }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────
  // MISSION 02 — PROJECT PRESENTATION
  // ─────────────────────────────────────────────────────────────────────────
  "mission-02": {
    id: "mission-02",
    num: "02",
    day: "DAY 01",
    date: "14 OCTOBER 2026",
    dayTrack: "DAY 01 // 14 OCTOBER 2026",
    time: "10:00 AM onwards",
    timing: "10:00 AM onwards",
    title: "PROJECT PRESENTATION",
    fullTitle: "MISSION 02 // PROJECT PRESENTATION",
    categoryBadge: "PROJECT DEMO",
    icon: "developer_mode",

    tagline: "DEMONSTRATE YOUR PROTOTYPE",
    shortDesc: "Present and demonstrate your project.",
    heistBrief:
      "Present your hardware or software project and explain how it works. A working prototype is mandatory. 10:00 AM onwards on Day 01.",
    briefing:
      "Present and demonstrate your project.",
    cardSpecs: [
      { label: "PROJECT TYPE", value: "Hardware / Software", icon: "devices" },
      { label: "KEY REQUIREMENT", value: "Working prototype required", icon: "verified" },
      { label: "DURATION", value: "5 min presentation + 3 min Q&A", icon: "timer" }
    ],

    about:
      "Present your hardware or software project and explain how it works. A working prototype is mandatory. The prototype must be demonstrated within the 5-minute presentation. There is no separate prototype demonstration time.",
    theme: "Hardware / Software / Engineering-related projects",
    projectType: "Hardware / Software / Engineering-related projects",
    participation: "2–4 members per team",
    duration: "5 minutes presentation + 3 minutes Q&A",
    presentationTime: "5 minutes presentation",
    qaTime: "3 minutes Q&A",
    importantNote: "A working prototype is mandatory. The prototype must be demonstrated within the 5-minute presentation. There is no separate prototype demonstration time.",
    prizePool: "EXCITING CASH PRIZES & GIFTS",
    certificate: "Certificates will be provided to all participants.",
    rules: [
      "Event timing: 10:00 AM onwards.",
      "Be prepared with your project.",
      "A working prototype is mandatory.",
      "The prototype must be demonstrated during the presentation.",
      "Complete the presentation within 5 minutes.",
      "3 minutes will be given for Q&A.",
      "The jury's decision will be final.",
      "Certificates will be provided to all participants."
    ],
    coordinators: [
      { name: "Thinakar V", phone: "9345733975" },
      { name: "Varun B", phone: "8137880602" }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────
  // MISSION 03 — POSTER CREATION & PRESENTATION
  // ─────────────────────────────────────────────────────────────────────────
  "mission-03": {
    id: "mission-03",
    num: "03",
    day: "DAY 01",
    date: "14 OCTOBER 2026",
    dayTrack: "DAY 01 // 14 OCTOBER 2026",
    time: "2:00 PM onwards",
    timing: "2:00 PM onwards",
    title: "POSTER CREATION & PRESENTATION",
    fullTitle: "MISSION 03 // POSTER CREATION & PRESENTATION",
    categoryBadge: "POSTER CREATION",
    icon: "photo_library",

    tagline: "CREATE IN 1 HOUR • PRESENT TO JURY",
    shortDesc: "Create a poster in 1 hour, then present it.",
    heistBrief:
      "Create a poster on a theme of your choice using your own laptop and present it to the jury. 2:00 PM onwards on Day 01.",
    briefing:
      "Create a poster in 1 hour, then present it.",
    cardSpecs: [
      { label: "CREATION TIME", value: "1 Hour", icon: "timer" },
      { label: "LAPTOP", value: "Own laptop required", icon: "laptop_mac" },
      { label: "TOOLS & AI", value: "Any tools • AI with disclosure", icon: "auto_fix_high" }
    ],

    about:
      "Create a poster on a theme of your choice using your own laptop and present it to the jury after the creation time. Participants will have 1 hour to design their poster using any tools available on their laptop. After the 1-hour creation period, participants must present their completed poster to the jury.",
    theme: "Theme of your choice (any engineering-related topic)",
    participation: "2–4 members per team",
    creationTime: "1 Hour",
    duration: "1 Hour Creation + Presentation to Jury",
    presentationTime: "1 Hour creation",
    qaTime: "Presentation to jury",
    laptopRequirement: "Participants must bring their own laptop.",
    toolsRequirement: "Participants can use any tools available on their laptop to create the poster.",
    presentationRequirement: "After the 1-hour creation time, participants must present their poster to the jury.",
    presentationExplanation: [
      "The theme they selected",
      "Why they selected it",
      "The concept and message of the poster",
      "Tools used to create the poster",
      "AI tools used, if any",
      "Which parts or elements were generated or assisted by AI"
    ],
    aiRule: "AI tools are allowed. Participants must clearly disclose which parts or elements of the poster were generated or assisted using AI.",
    prizePool: "EXCITING CASH PRIZES & GIFTS",
    certificate: "Certificates will be provided to all participants.",
    rules: [
      "Event timing: 2:00 PM onwards.",
      "Participants must bring their own laptop.",
      "The poster must be created during the event (1 hour creation time).",
      "Participants can use any tools available on their laptop.",
      "After 1 hour, the completed poster must be presented to the jury.",
      "Participants must explain: theme selected, why selected, concept/message, tools used, and any AI tools used / assisted elements.",
      "The jury's decision will be final.",
      "Certificates will be provided to all participants."
    ],
    coordinators: [
      { name: "Varnika M", phone: "9360659455" },
      { name: "Sowmitha M R", phone: "6369776485" }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────
  // MISSION 04 — EXECUTIVE DEVELOPMENT PROGRAMME
  // ─────────────────────────────────────────────────────────────────────────
  "mission-04": {
    id: "mission-04",
    num: "04",
    day: "DAY 02",
    date: "15 OCTOBER 2026",
    dayTrack: "DAY 02 // 15 OCTOBER 2026",
    time: "2:00 PM – 3:00 PM",
    timing: "2:00 PM – 3:00 PM",
    title: "EXECUTIVE DEVELOPMENT PROGRAMME",
    fullTitle: "MISSION 04 // EXECUTIVE DEVELOPMENT PROGRAMME",
    categoryBadge: "WORKSHOP",
    icon: "military_tech",

    tagline: "PROFESSIONAL & TECHNICAL SKILLS",
    shortDesc: "Learn practical skills from an expert.",
    heistBrief:
      "An interactive session designed to develop professional and technical skills. 2:00 PM – 3:00 PM on Day 02.",
    briefing:
      "Learn practical skills from an expert.",
    cardSpecs: [
      { label: "TOPIC", value: "To be announced", icon: "school" },
      { label: "RESOURCE PERSON", value: "To be announced", icon: "person" },
      { label: "CERTIFICATE", value: "Certificates provided to all participants", icon: "verified" }
    ],

    about:
      "An interactive session designed to develop professional and technical skills. 2:00 PM – 3:00 PM on Day 02.",
    topic: "Will be announced soon",
    resourcePerson: "Will be announced soon",
    participation: "Individual",
    duration: "1 Hour (2:00 PM – 3:00 PM)",
    certificate: "Certificates will be provided to all participants.",
    rules: [
      "Individual participation.",
      "Session timing: 2:00 PM – 3:00 PM.",
      "Topic and resource person will be announced soon.",
      "Please arrive on time for the session.",
      "Certificates will be provided to all participants."
    ],
    coordinators: [
      { name: "Shri Harithraa D", phone: "9345558509", role: "Workshop Coordinator" },
      { name: "Subashini S", phone: "9384198044", role: "Workshop Coordinator" }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────
  // MISSION 05 — CONCLAVE
  // ─────────────────────────────────────────────────────────────────────────
  "mission-05": {
    id: "mission-05",
    num: "05",
    day: "DAY 02",
    date: "15 OCTOBER 2026",
    dayTrack: "DAY 02 // 15 OCTOBER 2026",
    time: "9:30 AM – 10:30 AM",
    timing: "9:30 AM – 10:30 AM",
    title: "CONCLAVE",
    fullTitle: "MISSION 05 // CONCLAVE",
    categoryBadge: "DISCUSSION",
    icon: "groups",

    tagline: "EMERGING TRENDS IN TECHNOLOGY",
    shortDesc: "Discuss emerging trends in technology.",
    heistBrief:
      "A discussion session on emerging trends in technology and engineering. 9:30 AM – 10:30 AM on Day 02.",
    briefing:
      "Discuss emerging trends in technology.",
    cardSpecs: [
      { label: "THEME", value: "Emerging Trends in Technology", icon: "trending_up" },
      { label: "FORMAT", value: "Discussion session", icon: "forum" },
      { label: "CERTIFICATE", value: "Certificates provided to all participants", icon: "verified" }
    ],

    about:
      "A discussion session on emerging trends in technology and engineering. 9:30 AM – 10:30 AM on Day 02.",
    participation: "Individual",
    theme: "Emerging Trends in Technology",
    duration: "1 Hour (9:30 AM – 10:30 AM)",
    additionalDetails: "More details will be announced soon.",
    certificate: "Certificates will be provided to all participants.",
    rules: [
      "Individual participation.",
      "Session timing: 9:30 AM – 10:30 AM.",
      "Theme is Emerging Trends in Technology.",
      "Active participation and discussion are encouraged.",
      "Certificates will be provided to all participants."
    ],
    coordinators: [
      { name: "Yogasree K S", phone: "9566968555" },
      { name: "Vishali T", phone: "8825540542" }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────
  // MISSION 06 — CODING CONTEST
  // ─────────────────────────────────────────────────────────────────────────
  "mission-06": {
    id: "mission-06",
    num: "06",
    day: "DAY 02",
    date: "15 OCTOBER 2026",
    dayTrack: "DAY 02 // 15 OCTOBER 2026",
    time: "10:30 AM – 12:30 PM",
    timing: "10:30 AM – 12:30 PM",
    title: "CODING CONTEST",
    fullTitle: "MISSION 06 // CODING CONTEST",
    subtitle: "Powered by GeeksforGeeks",
    poweredBy: "GeeksforGeeks",
    categoryBadge: "CODING",
    icon: "terminal",

    tagline: "ALGORITHMS & PROBLEM SOLVING",
    shortDesc: "Compete in a time-based coding challenge.",
    heistBrief:
      "A time-based coding contest focused on algorithms and problem solving. Powered by GeeksforGeeks. 10:30 AM – 12:30 PM on Day 02.",
    briefing:
      "Compete in a time-based coding challenge.",
    cardSpecs: [
      { label: "FOCUS", value: "Algorithms & Competitive Programming", icon: "terminal" },
      { label: "EQUIPMENT", value: "Own laptop required", icon: "laptop_mac" },
      { label: "PLATFORM", value: "Powered by GeeksforGeeks", icon: "code" }
    ],

    about:
      "A time-based coding contest focused on algorithms and problem solving. Powered by GeeksforGeeks. Participants must bring their own laptop for the contest.",
    laptopRequirement: "Participants must bring their own laptop.",
    participation: "Individual",
    format: "Time-based coding contest",
    theme: "Algorithms & Competitive Programming",
    duration: "2 Hours (10:30 AM – 12:30 PM)",
    additionalDetails: "Powered by GeeksforGeeks • Prizes: GeeksforGeeks Coupons",
    rewardTitle: "GEEKSFORGEEKS COUPONS",
    prize: "GeeksforGeeks Coupons",
    certificate: "Certificates will be provided to all participants.",
    rules: [
      "This contest is powered by GeeksforGeeks.",
      "Individual participation only.",
      "Participants must bring their own laptop.",
      "Contest timing: 10:30 AM – 12:30 PM.",
      "Time-based competitive coding contest focused on Algorithms & Competitive Programming.",
      "Rankings are based on the number of problems solved and total time taken.",
      "Prizes: GeeksforGeeks Coupons.",
      "Certificates will be provided to all participants."
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
    date: "14 OCTOBER 2026",
    timing: "10:00 AM onwards",
    timelineTag: "DAY 01 // 14 OCTOBER 2026",
    timelineBlurb: "Present your research paper.",
    schedule: [
      { time: "10:00 AM", label: "Session Starts" },
      { time: "5 MINS", label: "Presentation" },
      { time: "3 MINS", label: "Q&A Session" }
    ]
  },
  {
    num: "02",
    id: "mission-02",
    title: "PROJECT PRESENTATION",
    shortTitle: "PROJECT PRESENTATION",
    day: "DAY 01",
    date: "14 OCTOBER 2026",
    timing: "10:00 AM onwards",
    timelineTag: "DAY 01 // 14 OCTOBER 2026",
    timelineBlurb: "Present and demonstrate your project.",
    schedule: [
      { time: "10:00 AM", label: "Session Starts" },
      { time: "5 MINS", label: "Presentation & Prototype Demo" },
      { time: "3 MINS", label: "Q&A Session" }
    ]
  },
  {
    num: "03",
    id: "mission-03",
    title: "POSTER CREATION & PRESENTATION",
    shortTitle: "POSTER CREATION & PRESENTATION",
    day: "DAY 01",
    date: "14 OCTOBER 2026",
    timing: "2:00 PM onwards",
    timelineTag: "DAY 01 // 14 OCTOBER 2026",
    timelineBlurb: "Create a poster in 1 hour, then present it.",
    schedule: [
      { time: "2:00 PM", label: "Poster Creation Starts (Bring Laptop)" },
      { time: "1 HOUR", label: "On-Spot Design Period" },
      { time: "POST 1 HR", label: "Presentation to Jury" }
    ]
  },
  {
    num: "05",
    id: "mission-05",
    title: "CONCLAVE",
    shortTitle: "CONCLAVE",
    day: "DAY 02",
    date: "15 OCTOBER 2026",
    timing: "9:30 AM – 10:30 AM",
    timelineTag: "DAY 02 // 15 OCTOBER 2026",
    timelineBlurb: "Discuss emerging trends in technology.",
    schedule: [
      { time: "9:30 AM", label: "Conclave Commences" },
      { time: "THEME", label: "Emerging Trends in Tech" },
      { time: "10:30 AM", label: "Session Wrap" }
    ]
  },
  {
    num: "06",
    id: "mission-06",
    title: "CODING CONTEST",
    shortTitle: "CODING CONTEST",
    subtitle: "Powered by GeeksforGeeks",
    day: "DAY 02",
    date: "15 OCTOBER 2026",
    timing: "10:30 AM – 12:30 PM",
    timelineTag: "DAY 02 // 15 OCTOBER 2026",
    timelineBlurb: "Compete in a time-based coding challenge.",
    schedule: [
      { time: "10:30 AM", label: "Contest Begins (Bring Laptop)" },
      { time: "2 HOURS", label: "Competitive Programming" },
      { time: "12:30 PM", label: "Contest Concludes & Leaderboard" }
    ]
  },
  {
    num: "04",
    id: "mission-04",
    title: "EXECUTIVE DEVELOPMENT PROGRAMME / WORKSHOP",
    shortTitle: "EDP / WORKSHOP",
    day: "DAY 02",
    date: "15 OCTOBER 2026",
    timing: "2:00 PM – 3:00 PM",
    timelineTag: "DAY 02 // 15 OCTOBER 2026",
    timelineBlurb: "Learn practical skills from an expert.",
    schedule: [
      { time: "2:00 PM", label: "Session Starts" },
      { time: "1 HOUR", label: "Interactive Skill Programme" },
      { time: "3:00 PM", label: "Session Wrap & Certificates" }
    ]
  }
];
