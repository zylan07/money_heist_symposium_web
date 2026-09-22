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
  overallPrizePool: "₹15K PRIZE POOL",
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
    "A two-day national technical symposium conducted by the Department of CSE in collaboration with Yi Yuva Club, KPRIET. Featuring six events across research paper presentation, project demonstration, poster presentation, an executive development programme, an emerging tech conclave, and a competitive coding contest.",
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
    title: "PAPER PRESENTATION",
    fullTitle: "MISSION 01 // PAPER PRESENTATION",
    categoryBadge: "RESEARCH PAPER",
    icon: "article",

    tagline: "PRESENT YOUR RESEARCH PAPER",
    heistBrief:
      "Present your research paper on any engineering-related topic. You will have 5 minutes to present, followed by 3 minutes of Q&A.",
    briefing:
      "Present a research paper on any engineering-related topic.",

    about:
      "Present your research paper on any engineering-related topic. You will have 5 minutes to present, followed by 3 minutes of Q&A with the jury.",
    theme: "Any engineering-related topic",
    participation: "2–4 members per team",
    duration: "5 minutes presentation + 3 minutes Q&A",
    presentationTime: "5 minutes presentation",
    qaTime: "3 minutes Q&A",
    prizePool: "₹5,000 PRIZE POOL",
    certificate: "Certificates will be provided to all participants.",
    rules: [
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
    title: "PROJECT PRESENTATION",
    fullTitle: "MISSION 02 // PROJECT PRESENTATION",
    categoryBadge: "PROJECT DEMO",
    icon: "developer_mode",

    tagline: "DEMONSTRATE YOUR PROTOTYPE",
    heistBrief:
      "Present your hardware or software project and explain how it works. A working prototype is mandatory and must be demonstrated within the 5-minute presentation.",
    briefing:
      "Present your hardware or software project and explain how it works.",

    about:
      "Present your hardware or software project and explain how it works. A working prototype is mandatory. The prototype must be demonstrated within the 5-minute presentation. There is no separate prototype demonstration time.",
    theme: "Hardware / Software / Engineering-related projects",
    projectType: "Hardware / Software / Engineering-related projects",
    participation: "2–4 members per team",
    duration: "5 minutes presentation + 3 minutes Q&A",
    presentationTime: "5 minutes presentation",
    qaTime: "3 minutes Q&A",
    importantNote: "A working prototype is mandatory. The prototype must be demonstrated within the 5-minute presentation. There is no separate prototype demonstration time.",
    prizePool: "₹5,000 PRIZE POOL",
    certificate: "Certificates will be provided to all participants.",
    rules: [
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
  // MISSION 03 — POSTER PRESENTATION
  // ─────────────────────────────────────────────────────────────────────────
  "mission-03": {
    id: "mission-03",
    num: "03",
    day: "DAY 01",
    date: "14 OCTOBER 2026",
    dayTrack: "DAY 01 // 14 OCTOBER 2026",
    title: "POSTER PRESENTATION",
    fullTitle: "MISSION 03 // POSTER PRESENTATION",
    categoryBadge: "POSTER DISPLAY",
    icon: "photo_library",

    tagline: "CREATE AND PRESENT YOUR POSTER",
    heistBrief:
      "Create and present a poster on any engineering-related topic. 5 minutes presentation followed by 3 minutes of Q&A. AI tools are allowed with proper disclosure.",
    briefing:
      "Create and present a poster on any engineering-related topic.",

    about:
      "Create and present a poster on any engineering-related topic. Participants will have 5 minutes to present their poster, followed by 3 minutes of Q&A. AI tools are allowed — participants must clearly disclose which parts or elements were generated or assisted using AI.",
    theme: "Any engineering-related topic",
    participation: "2–4 members per team",
    duration: "5 minutes presentation + 3 minutes Q&A",
    presentationTime: "5 minutes presentation",
    qaTime: "3 minutes Q&A",
    aiRule: "AI tools are allowed. Participants must mention which parts of the poster were created or assisted by AI.",
    prizePool: "₹5,000 PRIZE POOL",
    certificate: "Certificates will be provided to all participants.",
    rules: [
      "Be prepared with your poster.",
      "Choose an engineering-related topic.",
      "Complete your presentation within 5 minutes.",
      "3 minutes will be given for Q&A.",
      "AI tools are allowed with proper disclosure.",
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
    title: "EXECUTIVE DEVELOPMENT PROGRAMME",
    fullTitle: "MISSION 04 // EXECUTIVE DEVELOPMENT PROGRAMME",
    categoryBadge: "WORKSHOP",
    icon: "military_tech",

    tagline: "PROFESSIONAL & TECHNICAL SKILLS",
    heistBrief:
      "An interactive session designed to develop professional and technical skills.",
    briefing:
      "An interactive session designed to develop professional and technical skills.",

    about:
      "An interactive session designed to develop professional and technical skills.",
    topic: "Will be announced soon",
    resourcePerson: "Will be announced soon",
    participation: "Individual participation",
    duration: "Will be announced soon",
    certificate: "Certificates will be provided to all participants.",
    rules: [
      "Individual participation.",
      "Topic and resource person will be announced soon.",
      "Session duration will be announced soon.",
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
    title: "CONCLAVE",
    fullTitle: "MISSION 05 // CONCLAVE",
    categoryBadge: "DISCUSSION",
    icon: "groups",

    tagline: "EMERGING TRENDS IN TECHNOLOGY",
    heistBrief:
      "A discussion session on emerging trends in technology and engineering.",
    briefing:
      "A discussion session on emerging trends in technology and engineering.",

    about:
      "A discussion session on emerging trends in technology and engineering.",
    participation: "Individual participation",
    theme: "Emerging Trends in Technology",
    duration: "Will be announced",
    additionalDetails: "More details will be announced soon.",
    certificate: "Certificates will be provided to all participants.",
    rules: [
      "Individual participation.",
      "Theme is Emerging Trends in Technology.",
      "Active participation and discussion are encouraged.",
      "Full programme schedule will be announced soon.",
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
    title: "CODING CONTEST",
    fullTitle: "MISSION 06 // CODING CONTEST",
    subtitle: "Powered by GeeksforGeeks",
    poweredBy: "GeeksforGeeks",
    categoryBadge: "CODING",
    icon: "terminal",

    tagline: "ALGORITHMS & PROBLEM SOLVING",
    heistBrief:
      "A time-based coding contest focused on algorithms and problem solving. Powered by GeeksforGeeks.",
    briefing:
      "A time-based coding contest focused on algorithms and problem solving.",

    about:
      "A time-based coding contest focused on algorithms and problem solving. Powered by GeeksforGeeks.",
    participation: "Individual participation",
    format: "Time-based coding contest",
    theme: "Algorithms & Competitive Programming",
    additionalDetails: "Powered by GeeksforGeeks • Prizes: GeeksforGeeks Coupons",
    rewardTitle: "GEEKSFORGEEKS COUPONS",
    prize: "GeeksforGeeks Coupons",
    certificate: "Certificates will be provided to all participants.",
    rules: [
      "This contest is powered by GeeksforGeeks.",
      "Individual participation only.",
      "The contest is a time-based competitive programming challenge.",
      "Rankings are based on the number of problems solved and total time taken.",
      "Top performers will receive GeeksforGeeks coupons.",
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
    timing: "5 + 3 MINS",
    timelineTag: "DAY 01 // 14 OCTOBER 2026",
    timelineBlurb: "Present your research paper on any engineering topic. 5 mins presentation + 3 mins Q&A.",
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
    timelineTag: "DAY 01 // 14 OCTOBER 2026",
    timelineBlurb: "Demonstrate your working project. 5 mins presentation + 3 mins Q&A.",
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
    timelineTag: "DAY 01 // 14 OCTOBER 2026",
    timelineBlurb: "Present your engineering poster. AI tools allowed with proper disclosure.",
    schedule: [
      { time: "5 MINS", label: "Poster Presentation" },
      { time: "3 MINS", label: "Q&A Session" },
      { time: "AI TOOLS", label: "Allowed with disclosure" }
    ]
  },
  {
    num: "04",
    id: "mission-04",
    title: "EXECUTIVE DEVELOPMENT PROGRAMME",
    shortTitle: "EDP WORKSHOP",
    day: "DAY 02",
    timing: "DAY 02",
    timelineTag: "DAY 02 // 15 OCTOBER 2026",
    timelineBlurb: "Interactive session to develop professional and technical skills.",
    schedule: [
      { time: "TOPIC", label: "Will be announced soon" },
      { time: "SPEAKER", label: "Industry expert — TBA" },
      { time: "AWARD", label: "Certificates for all participants" }
    ]
  },
  {
    num: "05",
    id: "mission-05",
    title: "CONCLAVE",
    shortTitle: "CONCLAVE",
    day: "DAY 02",
    timing: "DAY 02",
    timelineTag: "DAY 02 // 15 OCTOBER 2026",
    timelineBlurb: "Discussion session on emerging trends in technology and engineering.",
    schedule: [
      { time: "THEME", label: "Emerging Trends in Technology" },
      { time: "DURATION", label: "Will be announced" },
      { time: "DETAILS", label: "More details announced soon" }
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
    timelineTag: "DAY 02 // 15 OCTOBER 2026",
    timelineBlurb: "Time-based coding contest focused on algorithms and problem solving.",
    schedule: [
      { time: "POWERED", label: "By GeeksforGeeks" },
      { time: "FORMAT", label: "Individual • Time-Based Contest" },
      { time: "PRIZES", label: "GeeksforGeeks Coupons" }
    ]
  }
];
