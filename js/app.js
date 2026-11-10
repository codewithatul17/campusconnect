/**
 * CampusConnect - Global Core Application Script
 * Theme, Toast, Global Search, Notifications, Navigation & Data Layer
 */

// Initial Seed Data (persists to localStorage if not yet set)
const DEFAULT_SAMPLE_DATA = {
  dataVersion: "2026_bu_real_v6",
  currentUser: {
    uid: "bu_student_atul_101",
    name: "Atul Yadav",
    email: "atul.yadav@bennett.edu.in",
    course: "B.Tech",
    year: "2nd Year",
    branch: "Computer Science & Engineering (AI & Data Science)",
    college: "Bennett University, Greater Noida (The Times Group)",
    bio: "Passionate sophomore at SCSET, Bennett University. Working on AI agents, Full-Stack Dev, and Competitive Coding. Active member of ACM Bennett Chapter and Bennett Hatchery Incubator.",
    interests: ["Artificial Intelligence", "Full-Stack Dev", "Bennett Hatchery Startups", "Competitive Coding", "Hackathons"],
    skills: ["Python", "C++", "JavaScript", "Data Structures & Algorithms", "Machine Learning", "Git"],
    photoURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
    stats: {
      posts: 5,
      eventsJoined: 4,
      clubsJoined: 3,
      resourcesUploaded: 7
    }
  },
  events: [
    {
      id: "ev-1",
      title: "Mahatma Gandhi Jayanti (University Holiday)",
      organizer: "Office of the Registrar, Bennett University",
      category: "Holiday",
      date: "02 Oct 2026",
      time: "Full Day Holiday",
      location: "Campus-Wide",
      seats: 5000,
      registeredCount: 5000,
      description: "Official gazetted national holiday honoring Mahatma Gandhi. No teaching sessions or laboratory evaluations scheduled. University administrative offices closed; central LRC reading room operates on special holiday hours.",
      image: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=700&q=80",
      isRegistered: true
    },
    {
      id: "ev-2",
      title: "Bennett Competitive Coding League (BCCL Round 3)",
      organizer: "GeeksforGeeks & ACM Bennett Student Chapter",
      category: "Technical",
      date: "12 Oct 2026",
      time: "05:30 PM - 07:30 PM",
      location: "High Performance Computing Lab, Block A-201",
      seats: 120,
      registeredCount: 114,
      description: "Algorithmic speed contest for Bennett engineering students. Focuses on dynamic programming, graph algorithms, and competitive speed with university leaderboard ranking and swags.",
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=700&q=80",
      isRegistered: false
    },
    {
      id: "ev-3",
      title: "AI & Generative LLMs in Production Masterclass",
      organizer: "Google Developer Groups (GDG) & SCSET AI Club",
      category: "Workshop",
      date: "18 Oct 2026",
      time: "02:30 PM - 05:30 PM",
      location: "Auditorium 2, Block B, Bennett University",
      seats: 150,
      registeredCount: 142,
      description: "Hands-on engineering workshop conducted by AI researchers from SCSET. Hands-on deployment of autonomous agent workflows, vector embeddings, and multimodal models using modern APIs.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=700&q=80",
      isRegistered: true
    },
    {
      id: "ev-4",
      title: "Odd Semester Mid-Term Examinations 2026",
      organizer: "Office of the Controller of Examinations, BU",
      category: "Exam",
      date: "20 Oct - 26 Oct 2026",
      time: "Slot A: 09:30 AM | Slot B: 02:00 PM",
      location: "Examination Halls (Block A, Block B & Block C)",
      seats: 3500,
      registeredCount: 3500,
      description: "Mandatory mid-semester written assessments for all B.Tech, BCA, Law, MBA, and Media cohorts. Detailed roll-number seat maps and seating charts are published on the BU Student ERP portal. Valid Bennett University ID card is strictly mandatory.",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=700&q=80",
      isRegistered: true
    },
    {
      id: "ev-5",
      title: "Maharishi Valmiki Jayanti (University Holiday)",
      organizer: "Office of the Registrar, Bennett University",
      category: "Holiday",
      date: "24 Oct 2026",
      time: "Full Day Holiday",
      location: "Campus-Wide",
      seats: 5000,
      registeredCount: 5000,
      description: "University non-instructional holiday in observance of Maharishi Valmiki Jayanti as per the official Bennett University academic calendar. Regular classes and instructional labs resume the following working day.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80",
      isRegistered: true
    },
    {
      id: "ev-6",
      title: "Sportikon 2026 - National Inter-University Sports Fest",
      organizer: "Bennett Sports Council & Athletics Committee",
      category: "Sports",
      date: "28 Oct - 30 Oct 2026",
      time: "08:00 AM - 09:00 PM (Daily)",
      location: "BU Sports Complex (Turf, Courts & Aquatic Centre)",
      seats: 1800,
      registeredCount: 1620,
      description: "Bennett University's premier national athletic championship. Over 1,800 collegiate athletes from 40+ universities competing across 16 sports: Football, Cricket, Basketball, Badminton, Squash, Lawn Tennis, Swimming, and Kabaddi. Features evening pro-nites and celebrity DJ shows.",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=700&q=80",
      isRegistered: true
    },
    {
      id: "ev-7",
      title: "Evaluated Mid-Sem Answer Scripts Display & Marks Lock",
      organizer: "Academic Affairs & School Departments, BU",
      category: "Exam",
      date: "01 Nov 2026",
      time: "10:00 AM - 04:00 PM",
      location: "Respective Faculty Cabins, Block A & B",
      seats: 3500,
      registeredCount: 3500,
      description: "Official academic calendar window for course instructors to show evaluated Mid-Semester answer scripts to students. Grievances and re-checking requests must be submitted to course coordinators before 05:00 PM prior to ERP grade freeze.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=700&q=80",
      isRegistered: false
    },
    {
      id: "ev-8",
      title: "HackBennett 36H - Flagship National Hackathon",
      organizer: "School of Computer Science & The Bennett Hatchery",
      category: "Hackathon",
      date: "07 Nov - 08 Nov 2026",
      time: "08:00 AM (36 Hours Continuous)",
      location: "The Hatchery & Advanced Computing Labs, Block A",
      seats: 250,
      registeredCount: 228,
      description: "36 hours of non-stop prototyping, coding, and pitching mentored by Times Group tech leaders, VCs, and AI researchers. ₹2,50,000+ cash prizes with direct incubation grants from Bennett Hatchery for top winning startup prototypes.",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=700&q=80",
      isRegistered: true
    },
    {
      id: "ev-9",
      title: "Diwali & Bhai Dooj Festival Break (University Holidays)",
      organizer: "Office of the Registrar, Bennett University",
      category: "Holiday",
      date: "08 Nov - 12 Nov 2026",
      time: "Festival Vacation Period",
      location: "Campus-Wide",
      seats: 5000,
      registeredCount: 5000,
      description: "Five-day festive holiday break for Deepawali, Govardhan Puja, and Bhai Dooj. Hostel mess operates on special festive timings; special holiday shuttle buses operate to Botanical Garden Metro Station and IGI Airport.",
      image: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=700&q=80",
      isRegistered: true
    },
    {
      id: "ev-10",
      title: "Guru Nanak Jayanti (University Holiday)",
      organizer: "Office of the Registrar, Bennett University",
      category: "Holiday",
      date: "15 Nov 2026",
      time: "Full Day Holiday",
      location: "Campus-Wide",
      seats: 5000,
      registeredCount: 5000,
      description: "Official gazetted university holiday in honor of Guru Nanak Jayanti (Gurpurab). Instructional classes, laboratories, and administrative offices remain suspended as per the Bennett University academic calendar.",
      image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=700&q=80",
      isRegistered: true
    },
    {
      id: "ev-11",
      title: "AALEKH 2026 - Annual National Literary & Debating Fest",
      organizer: "Cerebrum - The Literary & Debating Society of BU",
      category: "Cultural",
      date: "20 Nov - 22 Nov 2026",
      time: "10:00 AM - 07:00 PM (Daily)",
      location: "Central Auditorium & LRC Amphitheatre",
      seats: 600,
      registeredCount: 510,
      description: "Flagship literary confluence of Bennett University. Featuring Asian Parliamentary Debates, slam poetry, national journalism panels, open-mic storytelling, and keynote sessions with Times Group editors and distinguished authors.",
      image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=700&q=80",
      isRegistered: false
    },
    {
      id: "ev-12",
      title: "Uphoria 2026 - Annual National Cultural Fest",
      organizer: "Student Council, Cultural Affairs & Verve / Advaita",
      category: "Cultural",
      date: "27 Nov - 29 Nov 2026",
      time: "04:30 PM - 11:30 PM",
      location: "Main Sports Grounds & Outdoor Amphitheatre",
      seats: 2500,
      registeredCount: 2280,
      description: "The grand annual youth fest of Bennett University. Three days of electrifying star pro-nights, battle of the bands, Panache fashion runway, Verve western dance showdown, food carnivals, and inter-university competitions.",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=700&q=80",
      isRegistered: true
    },
    {
      id: "ev-13",
      title: "Practical Lab Examinations & Capstone Project Viva",
      organizer: "Academic Evaluation Cell & SCSET / SOL",
      category: "Exam",
      date: "05 Dec - 08 Dec 2026",
      time: "09:00 AM - 05:00 PM",
      location: "Computing Labs, Moot Court & Media Studios",
      seats: 3200,
      registeredCount: 3200,
      description: "End-semester practical evaluations, code viva, capstone project presentations, and continuous internal assessments prior to theory examinations as mandated by the academic calendar.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=700&q=80",
      isRegistered: true
    },
    {
      id: "ev-14",
      title: "Odd Semester End-Term Theory Examinations 2026",
      organizer: "Office of the Controller of Examinations, BU",
      category: "Exam",
      date: "14 Dec - 24 Dec 2026",
      time: "Morning Slot: 09:30 AM | Afternoon Slot: 02:00 PM",
      location: "Examination Blocks A, B, C & Central Hall",
      seats: 3800,
      registeredCount: 3800,
      description: "Final comprehensive end-semester examinations for all undergraduate and postgraduate programs. Admit cards with roll-number barcoding must be downloaded from the BU ERP portal. Strict university anti-plagiarism and exam guidelines apply.",
      image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=700&q=80",
      isRegistered: true
    },
    {
      id: "ev-15",
      title: "Christmas Day (Gazetted Holiday)",
      organizer: "Office of the Registrar, Bennett University",
      category: "Holiday",
      date: "25 Dec 2026",
      time: "Full Day Holiday",
      location: "Campus-Wide",
      seats: 5000,
      registeredCount: 5000,
      description: "National holiday celebrating Christmas. All university academic operations and student evaluation facilities remain closed.",
      image: "https://images.unsplash.com/photo-1543258103-a62bdc069871?auto=format&fit=crop&w=700&q=80",
      isRegistered: true
    },
    {
      id: "ev-16",
      title: "Winter Vacation & Semester Break",
      organizer: "Office of the Dean, Academic Affairs, BU",
      category: "Holiday",
      date: "26 Dec 2026 - 10 Jan 2027",
      time: "Semester Vacation Window",
      location: "Campus-Wide",
      seats: 5000,
      registeredCount: 5000,
      description: "Official winter recess following completion of end-semester examinations. Hostels remain open for international scholars, project researchers, and competitive sports squad members.",
      image: "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=700&q=80",
      isRegistered: true
    },
    {
      id: "ev-17",
      title: "Commencement of Even Semester 2027 & Course Registration",
      organizer: "Dean of Academic Affairs & Registrar, BU",
      category: "Academic",
      date: "11 Jan 2027",
      time: "08:30 AM Onwards",
      location: "Academic Blocks & BU ERP Portal",
      seats: 4500,
      registeredCount: 4500,
      description: "First day of instruction for the Spring/Even Semester 2027 across all schools. Course add/drop window opens on the ERP; students must clear academic dues to access course enrollment.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=700&q=80",
      isRegistered: false
    }
  ],
  clubs: [
    {
      id: "cl-cerebrum",
      name: "Cerebrum - Literary & Debating Society",
      category: "Literature",
      members: 340,
      lead: "Aditya Sharma",
      description: "The official literary and debating society of Bennett University. Organizers of the flagship national literature fest AALEKH, hosting Oxford-style parliamentary debates, open mics, and poetry slams.",
      logo: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=150&q=80",
      isJoined: true
    },
    {
      id: "cl-verve",
      name: "Verve - The Official Western Dance Society",
      category: "Cultural",
      members: 310,
      lead: "Rhea Khurana",
      description: "The premier western dance collective of Bennett University. Specializing in high-octane hip-hop, urban, contemporary choreography, and representing BU at IIT and national collegiate cultural fests.",
      logo: "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=150&q=80",
      isJoined: true
    },
    {
      id: "cl-advaita",
      name: "Advaita - The Official Music Society",
      category: "Music",
      members: 380,
      lead: "Dhruv Sen",
      description: "The musical soul of Bennett University. Uniting instrumentalists, rock bands, classical fusion artists, and vocalists. Organizes acoustic sunset jam sessions at the cafeteria amphitheatre.",
      logo: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=150&q=80",
      isJoined: false
    },
    {
      id: "cl-ansh",
      name: "Ansh - The Dramatics & Theatre Society",
      category: "Drama",
      members: 240,
      lead: "Siddharth Rao",
      description: "The official dramatics society of Bennett University. Renowned for power-packed street plays (Nukkad Natak), stage productions, scriptwriting, and mono-act showcases on social themes.",
      logo: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=150&q=80",
      isJoined: false
    },
    {
      id: "cl-rivaaz",
      name: "Rivaaz - Traditional & Classical Dance Club",
      category: "Cultural",
      members: 220,
      lead: "Ananya Deshmukh",
      description: "Preserving and celebrating Indian classical and folk heritage at Bennett University. Specialized performances in Kathak, Bharatanatyam, Bhangra, Garba, and semi-classical fusion.",
      logo: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=150&q=80",
      isJoined: false
    },
    {
      id: "cl-panache",
      name: "Panache - The Official Fashion Society",
      category: "Lifestyle",
      members: 195,
      lead: "Ishita Malhotra",
      description: "The official fashion society of Bennett University. Dedicated to avant-garde styling, runway choreography, costume design, and representing BU at collegiate fashion circuits.",
      logo: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=150&q=80",
      isJoined: false
    },
    {
      id: "cl-silhouette",
      name: "Silhouette - Creative Arts & Photography Society",
      category: "Art",
      members: 275,
      lead: "Kabir Singhal",
      description: "The visual and fine arts collective of Bennett University. Creates campus graffiti, canvas murals, digital design graphics, and visual photo documentation of campus life.",
      logo: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=150&q=80",
      isJoined: false
    },
    {
      id: "cl-isac",
      name: "ISAC - The Official Media Club",
      category: "Media",
      members: 260,
      lead: "Tanvi Mathur",
      description: "The student-run media and broadcasting powerhouse of Bennett University. Operating in sync with the Times School of Media for video journalism, campus podcasts, and newsletter coverage.",
      logo: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=150&q=80",
      isJoined: false
    },
    {
      id: "cl-acm",
      name: "ACM Bennett University Student Chapter",
      category: "Coding",
      members: 620,
      lead: "Aarav Mehta",
      description: "The premier computing society at SCSET, Bennett University. Organizes weekly CP leagues, tech bootcamps, AI hackathons, and research symposiums (Episteme).",
      logo: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=150&q=80",
      isJoined: true
    },
    {
      id: "cl-ieee",
      name: "IEEE Bennett Student Branch",
      category: "Coding",
      members: 490,
      lead: "Rohan Varma",
      description: "Global technical chapter at Bennett University fostering research and technological innovation in Artificial Intelligence, IoT, Cloud Systems, and Robotics.",
      logo: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=150&q=80",
      isJoined: false
    },
    {
      id: "cl-gfg",
      name: "GeeksforGeeks (GFG) Bennett Chapter",
      category: "Coding",
      members: 530,
      lead: "Pranav Joshi",
      description: "Peer-led technical learning chapter conducting the Bennett Competitive Coding League (BCCL), DSA problem sprints, and mock technical interview rounds.",
      logo: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=150&q=80",
      isJoined: true
    },
    {
      id: "cl-technotix",
      name: "Technotix - Robotics & Automation Club",
      category: "Robotics",
      members: 280,
      lead: "Manish Chawla",
      description: "The official robotics society of Bennett University. Focuses on bot combat, line followers, drone technology, microcontrollers, and national technical expos.",
      logo: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=150&q=80",
      isJoined: false
    },
    {
      id: "cl-spark",
      name: "Spark - Innovation & Entrepreneurship Club",
      category: "Entrepreneurship",
      members: 410,
      lead: "Rhea Kapoor",
      description: "The official student entrepreneurship wing working in direct synergy with The Bennett Hatchery and Centre for Innovation & Entrepreneurship (CIE) for startup pitches and grants.",
      logo: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=150&q=80",
      isJoined: false
    },
    {
      id: "cl-bugamers",
      name: "BU Gamers - Official Esports & Gaming Society",
      category: "Gaming",
      members: 460,
      lead: "Aryan Bakshi",
      description: "The official esports and gaming community of Bennett University. Hosts inter-college LAN tournaments in Valorant, BGMI, EA Sports FC, and student game development jams.",
      logo: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=150&q=80",
      isJoined: false
    },
    {
      id: "cl-astronomy",
      name: "Astronomy Club of Bennett University",
      category: "Science",
      members: 230,
      lead: "Kavya Menon",
      description: "Stargazing and astrophysics society of Bennett University. Conducts telescopic observation nights on campus, astrophotography workshops, and aerospace discussions.",
      logo: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=150&q=80",
      isJoined: false
    },
    {
      id: "cl-alexis",
      name: "Alexis - Official Social Welfare Club",
      category: "Social Service",
      members: 360,
      lead: "Pooja Hegde",
      description: "The official social impact body of Bennett University operating under the motto 'We Act, We Serve, We Care'. Conducts blood drives, rural teaching, and animal welfare in Greater Noida.",
      logo: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=150&q=80",
      isJoined: false
    },
    {
      id: "cl-pulse",
      name: "Pulse - Official Event Management Club",
      category: "Management",
      members: 310,
      lead: "Arjun Nambiar",
      description: "The operational powerhouse behind Bennett University's mega festivals. Coordinates artist management, stage logistics, security, and crowd coordination for Uphoria and Sportikon.",
      logo: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=150&q=80",
      isJoined: false
    },
    {
      id: "cl-nomads",
      name: "Nomads - Travel & Exploration Club",
      category: "Adventure",
      members: 240,
      lead: "Sameer Saxena",
      description: "The official travel and adventure club of Bennett University. Organizes weekend treks to Himachal, heritage photowalks in Old Delhi, and outdoor camping for hostellers.",
      logo: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=150&q=80",
      isJoined: false
    }
  ],
  sports: {
    facilities: [
      {
        id: "fac-1",
        name: "Floodlit Football Turf",
        timing: "06:00 AM - 10:00 PM",
        location: "Outdoor Sports Arena",
        description: "Full-size FIFA-standard natural-synthetic hybrid turf equipped with high-mast LED floodlights for night league matches and varsity training.",
        image: "https://images.unsplash.com/photo-1529900244928-8742b7ddbc1f?auto=format&fit=crop&w=600&q=80",
        equipmentAvailable: "Match Footballs, Training Cones, Tactical Bibs, Goalkeeper Gloves"
      },
      {
        id: "fac-2",
        name: "Olympic-Sized Swimming Pool",
        timing: "06:00 AM - 09:30 AM & 04:30 PM - 08:30 PM",
        location: "Indoor Aquatic Centre",
        description: "Temperature-controlled 8-lane 50m competitive swimming pool with certified campus lifeguards, diving blocks, and shower lockers.",
        image: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&w=600&q=80",
        equipmentAvailable: "Kickboards, Pull Buoys, Swim Caps, Goggles"
      },
      {
        id: "fac-3",
        name: "Cricket Ground & Practice Nets",
        timing: "06:30 AM - 07:00 PM",
        location: "Main Oval Grounds",
        description: "BCCI-dimension turf pitch with pavilion, sightscreens, and 4 dedicated automated bowling machine practice net cages.",
        image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=600&q=80",
        equipmentAvailable: "Cricket Balls (Leather & Tennis), Helmets, Leg Pads, Bowling Machine"
      },
      {
        id: "fac-4",
        name: "Indoor Badminton & Squash Courts",
        timing: "06:00 AM - 11:00 PM",
        location: "Air-Conditioned Sports Complex",
        description: "4 Yonex-certified wooden synthetic court bays and 2 glass-back squash courts with glare-free international lighting.",
        image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=600&q=80",
        equipmentAvailable: "Badminton Racquets, Feather Shuttles, Squash Racquets & Dunlop Balls"
      },
      {
        id: "fac-5",
        name: "Basketball Courts (Indoor & Outdoor)",
        timing: "06:00 AM - 10:30 PM",
        location: "Basketball Arena",
        description: "3 outdoor floodlit synthetic acrylic courts and 1 maple hardwood indoor court with spring-loaded NBA-spec breakaway rims.",
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=600&q=80",
        equipmentAvailable: "Spalding Official Basketballs, Training Cones, Scoreboards"
      },
      {
        id: "fac-6",
        name: "High-Performance Gymnasium & Fitness Lab",
        timing: "06:00 AM - 10:00 PM",
        location: "Block C, 1st Floor",
        description: "Fully equipped air-conditioned fitness centre with LifeFitness treadmills, Olympic barbells, squat racks, and certified strength trainers.",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
        equipmentAvailable: "Free Weights, Kettlebells, Resistance Bands, Foam Rollers"
      }
    ],
    trials: [
      {
        id: "tr-1",
        sport: "Football (Men & Women)",
        title: "Bennett Varsity Football Team Selection Trials",
        date: "29 Oct 2026",
        time: "06:00 PM - 08:30 PM",
        venue: "Main Football Turf",
        eligibility: "Open to all UG/PG batches with valid Bennett ID",
        coach: "Coach Rajesh Negi (Chief Football Coach)",
        kitRequired: "Football studs, shin guards, and athletic jersey",
        status: "Registrations Open",
        isRegistered: false
      },
      {
        id: "tr-2",
        sport: "Cricket",
        title: "Bennett Lions Cricket Squad Trials (Inter-University)",
        date: "31 Oct 2026",
        time: "04:00 PM - 07:00 PM",
        venue: "Cricket Practice Nets (Block D Grounds)",
        eligibility: "Open to 1st, 2nd, and 3rd year students (All Schools)",
        coach: "Coach Virendra Sharma (Ex-Ranji Player, Head of Cricket)",
        kitRequired: "White cricket trousers/t-shirt, spikes, personal bat & abdominal guard",
        status: "Registrations Open",
        isRegistered: true
      },
      {
        id: "tr-3",
        sport: "Basketball (Men & Women)",
        title: "BU Falcons Basketball Varsity Selection Trials",
        date: "02 Nov 2026",
        time: "05:30 PM - 08:00 PM",
        venue: "Indoor Hardwood Basketball Court",
        eligibility: "All enrolled Bennett University students",
        coach: "Coach Anjali Chauhan (National Coach)",
        kitRequired: "Non-marking basketball shoes and athletic jersey",
        status: "Registrations Open",
        isRegistered: false
      },
      {
        id: "tr-4",
        sport: "Badminton & Squash",
        title: "Varsity Racquet Squad Trials for Sportikon 2026",
        date: "03 Nov 2026",
        time: "05:00 PM - 07:30 PM",
        venue: "Indoor AC Sports Complex",
        eligibility: "Singles and Doubles players across all semesters",
        coach: "Coach Sandeep Rawat (NIS Certified Badminton Coach)",
        kitRequired: "Non-marking gum sole shoes and personal racquets",
        status: "Registrations Open",
        isRegistered: false
      },
      {
        id: "tr-5",
        sport: "Aquatics (Swimming)",
        title: "Bennett University Swimming Team Selection Trials",
        date: "05 Nov 2026",
        time: "06:30 AM - 08:30 AM",
        venue: "Olympic-Sized Aquatic Centre",
        eligibility: "Freestyle, Breaststroke, Backstroke, Butterfly (50m, 100m, 200m)",
        coach: "Coach Pradeep Kumar (Aquatic Director)",
        kitRequired: "FINA approved swim briefs/suit, swim cap, and goggles",
        status: "Registrations Open",
        isRegistered: false
      },
      {
        id: "tr-6",
        sport: "Table Tennis & Chess",
        title: "Indoor Brain & Reflex Varsity Selections",
        date: "06 Nov 2026",
        time: "05:00 PM - 07:00 PM",
        venue: "Student Recreation Arena, Block B",
        eligibility: "All undergraduate and postgraduate cohorts",
        coach: "Sports Officer BU",
        kitRequired: "Personal TT bat (for table tennis participants)",
        status: "Registrations Open",
        isRegistered: false
      }
    ],
    competitions: [
      {
        id: "comp-1",
        title: "Sportikon 2026 - National Inter-University Sports Fest",
        sport: "Multi-Sport Mega Fest (16+ Disciplines)",
        date: "28 Oct - 30 Oct 2026",
        venue: "BU Sports Complex, Football Turf & Athletic Track",
        category: "National Championship",
        status: "Active & Upcoming",
        teamsCount: "40+ Universities (1,800+ Athletes)",
        description: "The flagship annual sports championship of Bennett University. Featuring knockout tournaments in Football, Basketball, Cricket, Lawn Tennis, Badminton, Squash, Kabaddi, Table Tennis, Chess, and Track & Field.",
        prizePool: "₹3,00,000+ & Rolling Trophies",
        badge: "Flagship Mega Fest"
      },
      {
        id: "comp-2",
        title: "Bennett Inter-House Football League (IHFL 2026)",
        sport: "Football",
        date: "04 Nov - 10 Nov 2026",
        venue: "Main Football Turf",
        category: "Inter-House Championship",
        status: "Fixtures Announced",
        teamsCount: "4 University Houses (Falcons, Tigers, Stallions, Gladiators)",
        description: "Annual university house championship featuring round-robin group matches followed by semi-finals and electric floodlit night finals under the floodlights.",
        prizePool: "House Championship Points & Medals",
        badge: "House League"
      },
      {
        id: "comp-3",
        title: "Bennett Cricket Premier League (BCPL 2026 - T20)",
        sport: "Cricket",
        date: "12 Nov - 18 Nov 2026",
        venue: "Main Cricket Oval Grounds",
        category: "Inter-Batch Tournament",
        status: "Registrations Open",
        teamsCount: "12 Department Teams",
        description: "The premier T20 white-ball tournament of Bennett University. Live student commentary, digital scoreboard display, and live YouTube streaming.",
        prizePool: "₹50,000 + Winners Trophy",
        badge: "T20 Championship"
      },
      {
        id: "comp-4",
        title: "Bennett 3v3 Streetball Showdown",
        sport: "Basketball",
        date: "20 Nov 2026",
        venue: "Outdoor Floodlit Basketball Courts",
        category: "Intra-University Fast Break",
        status: "Registrations Open",
        teamsCount: "24 Teams",
        description: "Fast-paced FIBA 3x3 half-court tournament featuring 10-minute running clock games, three-point shootout, and slam dunk contest.",
        prizePool: "₹25,000 + Custom Jerseys",
        badge: "FIBA 3x3"
      }
    ],
    houses: [
      { name: "Falcons", color: "#EF4444", points: 420, rank: 1, emblem: "🦅", moto: "Soar Beyond Limits" },
      { name: "Tigers", color: "#F59E0B", points: 395, rank: 2, emblem: "🐅", moto: "Fierce & Unstoppable" },
      { name: "Gladiators", color: "#3B82F6", points: 370, rank: 3, emblem: "⚔️", moto: "Strength & Honour" },
      { name: "Stallions", color: "#10B981", points: 350, rank: 4, emblem: "🐎", moto: "Relentless Speed" }
    ]
  },
  announcements: [
    {
      id: "an-1",
      title: "Autumn Semester Mid-Term Examination Timetable 2026 Released",
      category: "Examination",
      important: true,
      date: "02 Oct 2026",
      department: "Office of Controller of Examinations, Bennett University",
      targetProgram: "All Programmes",
      description: "The timetable for Mid-Semester Examinations commencing from 20th October has been officially released on the BU Student ERP Portal. Examination halls in Block A, B, and C will be allocated by roll number."
    },
    {
      id: "an-2",
      title: "Times Group & Top Tech Placement Drive: Registrations Open",
      category: "Placement",
      important: true,
      date: "01 Oct 2026",
      department: "Centre for Career Services (CCS), Bennett University",
      targetProgram: "B.Tech (CSE, AI & Data Science)",
      description: "On-campus placement and summer internship registrations for Google, Microsoft, Adobe, and Times Internet have commenced for eligible 3rd and 4th-year students with CGPA >= 7.5."
    },
    {
      id: "an-3",
      title: "Learning Resource Centre (LRC) 24x7 Extended Hours for Mid-Terms",
      category: "Academic",
      important: false,
      date: "28 Sep 2026",
      department: "Bennett University LRC & Digital Media Library",
      targetProgram: "All Programmes",
      description: "The central LRC reading rooms, digital reference sections, and discussion pods will operate 24 hours daily from 10th October to 30th October to support midterm preparation."
    },
    {
      id: "an-4",
      title: "Bennett Hatchery Seed Grant 2026: Up to ₹10 Lakhs Funding",
      category: "Important",
      important: true,
      date: "25 Sep 2026",
      department: "The Bennett Hatchery & Incubation Centre",
      targetProgram: "School of Management (MBA, BBA)",
      description: "Student startup ventures in AI, AgriTech, FinTech, and D2C can apply for incubation support, Times Group media visibility, and seed grants up to ₹10,00,000. Pitch deadline: 15th October."
    },
    {
      id: "an-5",
      title: "Campus Shuttle Bus Schedule Update: Botanical Garden & Pari Chowk Routes",
      category: "General",
      important: false,
      date: "24 Sep 2026",
      department: "Campus Administration & Transport Services, BU",
      targetProgram: "All Programmes",
      description: "Updated weekend shuttle timings between Bennett University Campus and Botanical Garden Metro Station / Pari Chowk have been released for day-scholars and hostellers."
    },
    {
      id: "an-6",
      title: "Bennett National Moot Court 2026 Selections: School of Law",
      category: "Academic",
      important: true,
      date: "22 Sep 2026",
      department: "School of Law (SOL) Moot Court Society",
      targetProgram: "School of Law (BA-LLB, BBA-LLB)",
      description: "Internal preliminary oral pleadings and memorial drafting trials for the Bennett National Moot Court Competition 2026. Open exclusively for 2nd to 5th-year Law cohorts."
    },
    {
      id: "an-7",
      title: "Times Television Broadcast Masterclass & Live Chroma Production",
      category: "Workshop",
      important: false,
      date: "20 Sep 2026",
      department: "Times School of Media (TSOM) Broadcast Lab",
      targetProgram: "Times School of Media (BA-JMC)",
      description: "Practical production workshop in Block B television studio covering multi-camera setup, teleprompter control, audio mixing, and broadcast post-production."
    }
  ],
  resources: [
    {
        "id": "res-1",
        "title": "Complete DSA Hand-Written Cheat Sheet & LeetCode Patterns",
        "subject": "DSA",
        "type": "PDF",
        "uploadedBy": "Atul Yadav",
        "date": "29 Sep 2026",
        "downloads": 412,
        "fileSize": "4.2 MB",
        "description": "Comprehensive notes covering Trees, Graphs, Dynamic Programming, Two Pointers, and LeetCode top 150 patterns for BU campus placements.",
        "fullContent": "================================================================================\nBENNETT UNIVERSITY - SCHOOL OF COMPUTER SCIENCE ENGINEERING & TECHNOLOGY (SCSET)\nDATA STRUCTURES & ALGORITHMS (CPSC201) - COMPREHENSIVE REVISION CHEAT SHEET\nCurated by: Atul Yadav | Verified by: ACM Bennett Chapter & Placement Prep Wing\n================================================================================\n\nTABLE OF CONTENTS:\n1. Two Pointers & Sliding Window Patterns\n2. Fast & Slow Pointers (Floyd's Cycle Detection)\n3. Binary Search on Answer Space\n4. Binary Trees & Binary Search Trees (BST) Mastery\n5. Graph Traversal, Topological Sort & Dijkstra\n6. Dynamic Programming Patterns (0/1 Knapsack, LCS, LIS)\n7. Top 30 LeetCode Patterns & Complexity Reference\n\n--------------------------------------------------------------------------------\n1. TWO POINTERS & SLIDING WINDOW PATTERNS\n--------------------------------------------------------------------------------\nA. Opposite Direction Two Pointers (Sorted Arrays):\nUse-case: Two Sum II, 3Sum, Container With Most Water, Trapping Rainwater.\nTemplate:\n```cpp\nint left = 0, right = n - 1;\nwhile (left < right) {\n    int currentSum = arr[left] + arr[right];\n    if (currentSum == target) {\n        return {left, right}; // Found target pair\n    } else if (currentSum < target) {\n        left++;\n    } else {\n        right--;\n    }\n}\n```\nComplexity: Time: O(N), Space: O(1).\n\nB. Sliding Window (Dynamic Size Window):\nUse-case: Longest Substring Without Repeating Characters, Minimum Window Substring.\nTemplate:\n```python\ndef dynamic_sliding_window(s):\n    char_map = {}\n    left = 0\n    max_len = 0\n    for right in range(len(s)):\n        char = s[right]\n        if char in char_map and char_map[char] >= left:\n            left = char_map[char] + 1\n        char_map[char] = right\n        max_len = max(max_len, right - left + 1)\n    return max_len\n```\nComplexity: Time: O(N), Space: O(min(N, AlphabetSize)).\n\n--------------------------------------------------------------------------------\n2. FAST & SLOW POINTERS (FLOYD'S CYCLE DETECTION)\n--------------------------------------------------------------------------------\nUse-case: Linked List Cycle I/II, Find the Duplicate Number, Happy Number.\nAlgorithm:\n1. Initialize `slow = head`, `fast = head`.\n2. Move `slow = slow.next`, `fast = fast.next.next`.\n3. If `slow == fast`, a cycle exists!\n4. To find the start of the cycle:\n   Reset `slow = head`. Keep `fast` at meeting point.\n   Advance both by 1 step: `slow = slow.next; fast = fast.next;`\n   The node where they collide is the START of the cycle.\nMathematical Proof:\nLet Distance from head to cycle start = L.\nDistance from start to meeting point = d.\nLength of cycle = C.\nDistance traveled by slow = L + d.\nDistance traveled by fast = L + n*C + d.\nSince fast travels twice as fast: 2(L + d) = L + n*C + d => L = n*C - d.\nThus, traversing L steps from head matches traversing n*C - d steps from meeting point.\n\n--------------------------------------------------------------------------------\n3. BINARY SEARCH ON ANSWER SPACE\n--------------------------------------------------------------------------------\nUse-case: Koko Eating Bananas, Capacity To Ship Packages Within D Days, Aggressive Cows.\nTemplate:\n```java\nint low = min_possible_answer, high = max_possible_answer;\nint ans = high;\nwhile (low <= high) {\n    int mid = low + (high - low) / 2;\n    if (isValid(mid, conditions)) {\n        ans = mid;\n        high = mid - 1; // Minimize answer (or low = mid + 1 if maximizing)\n    } else {\n        low = mid + 1;\n    }\n}\nreturn ans;\n```\nComplexity: Time: O(N * log(SearchSpace)), Space: O(1).\n\n--------------------------------------------------------------------------------\n4. BINARY TREES & BINARY SEARCH TREES (BST)\n--------------------------------------------------------------------------------\nA. Lowest Common Ancestor (LCA) in Binary Tree:\n```cpp\nTreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {\n    if (!root || root == p || root == q) return root;\n    TreeNode* left = lowestCommonAncestor(root->left, p, q);\n    TreeNode* right = lowestCommonAncestor(root->right, p, q);\n    if (left && right) return root; // p and q found in separate subtrees\n    return left ? left : right;\n}\n```\n\nB. Validate Binary Search Tree:\nCondition: Every node in left subtree < root->val < every node in right subtree.\n```python\ndef isValidBST(root, low=float('-inf'), high=float('inf')):\n    if not root:\n        return True\n    if not (low < root.val < high):\n        return False\n    return isValidBST(root.left, low, root.val) and isValidBST(root.right, root.val, high)\n```\n\n--------------------------------------------------------------------------------\n5. GRAPH ALGORITHMS\n--------------------------------------------------------------------------------\nA. Dijkstra's Shortest Path (Non-negative Edge Weights):\n```cpp\nvector<int> dijkstra(int V, vector<vector<pair<int,int>>>& adj, int S) {\n    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<pair<int,int>>> pq;\n    vector<int> dist(V, 1e9);\n    dist[S] = 0;\n    pq.push({0, S});\n    while (!pq.empty()) {\n        auto [d, u] = pq.top(); pq.pop();\n        if (d > dist[u]) continue;\n        for (auto& edge : adj[u]) {\n            int v = edge.first, w = edge.second;\n            if (dist[u] + w < dist[v]) {\n                dist[v] = dist[u] + w;\n                pq.push({dist[v], v});\n            }\n        }\n    }\n    return dist;\n}\n```\nComplexity: Time: O((V + E) log V), Space: O(V).\n\nB. Topological Sort (Kahn's Algorithm via In-Degree):\n1. Compute in-degree of all vertices.\n2. Push vertices with in-degree == 0 into queue.\n3. While queue not empty, pop u, add to topo list, reduce in-degree of neighbors by 1.\n4. If neighbor in-degree becomes 0, push to queue.\nIf topo list size < V, graph contains a CYCLE.\n\n--------------------------------------------------------------------------------\n6. DYNAMIC PROGRAMMING (DP) PATTERNS\n--------------------------------------------------------------------------------\nA. 0/1 Knapsack Problem (Space Optimized):\n```cpp\nint knapSack(int W, vector<int>& wt, vector<int>& val, int n) {\n    vector<int> dp(W + 1, 0);\n    for (int i = 0; i < n; i++) {\n        for (int w = W; w >= wt[i]; w--) { // Traverse backwards to avoid recomputation\n            dp[w] = max(dp[w], val[i] + dp[w - wt[i]]);\n        }\n    }\n    return dp[W];\n}\n```\n\nB. Longest Common Subsequence (LCS):\nState: `dp[i][j]` = LCS of `s1[0..i-1]` and `s2[0..j-1]`.\nRecurrence:\nIf `s1[i-1] == s2[j-1]`: `dp[i][j] = 1 + dp[i-1][j-1]`\nElse: `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`\nBase Case: `dp[0][j] = 0, dp[i][0] = 0`.\n\nC. Kadane's Algorithm (Max Subarray Sum):\n```python\ndef maxSubArray(nums):\n    max_so_far = nums[0]\n    curr_sum = 0\n    for x in nums:\n        curr_sum = max(x, curr_sum + x)\n        max_so_far = max(max_so_far, curr_sum)\n    return max_so_far\n```\nComplexity: Time: O(N), Space: O(1).\n================================================================================"
    },
    {
        "id": "res-2",
        "title": "DBMS Normalization & SQL Queries Mastery Guide (CPSC204)",
        "subject": "DBMS",
        "type": "Notes",
        "uploadedBy": "Pooja Verma",
        "date": "24 Sep 2026",
        "downloads": 289,
        "fileSize": "2.8 MB",
        "description": "Concise revision sheet for 1NF, 2NF, 3NF, BCNF, ACID properties, indexing, and complex SQL joins aligned with Bennett SCSET syllabus.",
        "fullContent": "================================================================================\nBENNETT UNIVERSITY - SCHOOL OF COMPUTER SCIENCE ENGINEERING & TECHNOLOGY (SCSET)\nDATABASE MANAGEMENT SYSTEMS (CPSC204) - NORMALIZATION & SQL MASTERY GUIDE\nCurated by: Pooja Verma | Verified by: Bennett Faculty of Database Engineering\n================================================================================\n\nTABLE OF CONTENTS:\n1. Functional Dependencies & Candidate Key Derivation\n2. Normal Forms Step-by-Step (1NF, 2NF, 3NF, BCNF)\n3. Lossless Decomposition & Dependency Preservation\n4. Transactions & Conflict Serializability\n5. Concurrency Control (2PL, Strict 2PL)\n6. Complex SQL Queries for Examinations & Technical Interviews\n\n--------------------------------------------------------------------------------\n1. FUNCTIONAL DEPENDENCIES & FINDING CANDIDATE KEYS\n--------------------------------------------------------------------------------\nA. Definition:\nA functional dependency X -> Y holds on relation R if whenever two tuples have the same value for X, they must have the same value for Y.\n\nB. Attribute Closure (X)+ Algorithm:\n1. Set Closure = {X}.\n2. Repeat until no more attributes can be added:\n   For every FD A -> B in F:\n   If A is a subset of Closure, then Closure = Closure U B.\n3. Return Closure.\n\nC. Finding Candidate Keys from Schema R(A, B, C, D, E) with F = {A -> BC, CD -> E, B -> D, E -> A}:\n1. Check right-hand side (RHS) of all FDs:\n   Attributes appearing on RHS: B, C, D, E, A.\n   Attributes never appearing on RHS: None.\n2. Test closures of single attributes:\n   (A)+: A -> BC -> BCD -> BCDE -> ABCDE (All attributes!). Therefore, A is a Candidate Key!\n   (E)+: E -> A -> ABCDE. Therefore, E is a Candidate Key!\n   (B)+: B -> D (Not all attributes).\n   (BC)+: BC -> D -> E -> A -> ABCDE. Therefore, BC is a Candidate Key!\n   (CD)+: CD -> E -> A -> ABCDE. Therefore, CD is a Candidate Key!\nCandidate Keys: {A}, {E}, {BC}, {CD}.\nPrime Attributes: {A, B, C, D, E} (all attributes participating in at least one candidate key).\n\n--------------------------------------------------------------------------------\n2. NORMAL FORMS STEP-BY-STEP\n--------------------------------------------------------------------------------\nA. First Normal Form (1NF):\n- Every attribute must hold only atomic (indivisible) single values.\n- No multi-valued attributes (e.g. Phone = {987..., 991...} violates 1NF).\n- No repeating groups or nested tables.\n\nB. Second Normal Form (2NF):\n- Must be in 1NF.\n- NO PARTIAL DEPENDENCY: No non-prime attribute should be functionally dependent on a proper subset of ANY candidate key.\nExample of Violation:\nR(Emp_ID, Project_ID, Emp_Name, Hours) with Candidate Key: {Emp_ID, Project_ID}.\nFD: Emp_ID -> Emp_Name.\nHere, Emp_Name (non-prime) depends only on Emp_ID (a proper subset of the key).\nSolution: Decompose into R1(Emp_ID, Emp_Name) and R2(Emp_ID, Project_ID, Hours).\n\nC. Third Normal Form (3NF):\n- Must be in 2NF.\n- NO TRANSITIVE DEPENDENCY: For every non-trivial FD X -> Y:\n  EITHER X is a Super Key\n  OR Y is a Prime Attribute (member of a candidate key).\nExample of Violation:\nR(Emp_ID, Dept_ID, Dept_Name) with Key: {Emp_ID}.\nFDs: Emp_ID -> Dept_ID, Dept_ID -> Dept_Name.\nDept_ID is not a super key, and Dept_Name is not prime!\nSolution: Decompose into R1(Emp_ID, Dept_ID) and R2(Dept_ID, Dept_Name).\n\nD. Boyce-Codd Normal Form (BCNF):\n- Strictly stronger than 3NF.\n- For every non-trivial FD X -> Y:\n  X MUST BE A SUPER KEY (No exceptions for prime attributes!).\nNote: Every BCNF decomposition is guaranteed to be lossless, but it might NOT always preserve functional dependencies. 3NF always guarantees both lossless join AND dependency preservation.\n\n--------------------------------------------------------------------------------\n3. LOSSLESS JOIN & DEPENDENCY PRESERVATION\n--------------------------------------------------------------------------------\nDecomposition of R into R1 and R2 is LOSSLESS if and only if:\n(R1 \u2229 R2) -> R1  OR  (R1 \u2229 R2) -> R2\nMeaning: The common attributes must form a super key in at least one decomposed sub-relation.\n\n--------------------------------------------------------------------------------\n4. TRANSACTIONS & CONFLICT SERIALIZABILITY\n--------------------------------------------------------------------------------\nA. Conflicting Operations:\nTwo operations conflict if they:\n1. Belong to different transactions.\n2. Access the SAME data item.\n3. At least one of them is a WRITE operation (Read-Write, Write-Read, Write-Write).\n\nB. Testing Serializability via Precedence Graph:\n1. Create a node for each transaction Ti.\n2. Draw a directed edge Ti -> Tj if an operation of Ti conflicts with and precedes an operation of Tj.\n3. If the precedence graph has NO CYCLES, the schedule is CONFLICT SERIALIZABLE.\n4. Topological order of the graph gives the equivalent serial schedule.\n\n--------------------------------------------------------------------------------\n5. COMPLEX SQL QUERIES MASTERY\n--------------------------------------------------------------------------------\nA. Find N-th Highest Salary without LIMIT:\n```sql\nSELECT DISTINCT salary \nFROM Employee e1\nWHERE (\n    SELECT COUNT(DISTINCT salary) \n    FROM Employee e2 \n    WHERE e2.salary > e1.salary\n) = (N - 1);\n```\n\nB. Using Modern Window Functions (DENSE_RANK):\n```sql\nWITH RankedSalaries AS (\n    SELECT emp_name, salary, department_id,\n           DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) as rank_num\n    FROM Employee\n)\nSELECT emp_name, salary, department_id\nFROM RankedSalaries\nWHERE rank_num = 2; -- 2nd highest salary per department\n```\n\nC. Correlated Subquery: Employees earning more than their department's average:\n```sql\nSELECT e.emp_id, e.emp_name, e.salary, e.dept_id\nFROM Employee e\nWHERE e.salary > (\n    SELECT AVG(d.salary)\n    FROM Employee d\n    WHERE d.dept_id = e.dept_id\n);\n```\n================================================================================"
    },
    {
        "id": "res-3",
        "title": "Operating Systems Previous 5-Year Question Papers Solved",
        "subject": "Operating Systems",
        "type": "Question Paper",
        "uploadedBy": "Prof. R. Mathur (SCSET)",
        "date": "20 Sep 2026",
        "downloads": 530,
        "fileSize": "6.5 MB",
        "description": "Solved university question papers with CPU scheduling numericals, Banker's algorithm, and virtual memory page replacement diagrams.",
        "fullContent": "================================================================================\nBENNETT UNIVERSITY - SCHOOL OF COMPUTER SCIENCE ENGINEERING & TECHNOLOGY (SCSET)\nOPERATING SYSTEMS (CPSC205) - PREVIOUS 5-YEAR EXAM PAPERS FULLY SOLVED\nCompiled by: Prof. R. Mathur (SCSET) | Department of Systems & Software\n================================================================================\n\nQUESTION 1: CPU SCHEDULING ALGORITHMS (15 MARKS)\n--------------------------------------------------------------------------------\nConsider the following set of 4 processes with arrival times (AT) and burst times (BT):\nProcess | Arrival Time (AT) | Burst Time (BT) | Priority (Lower # = Higher Priority)\nP1      | 0                 | 8               | 3\nP2      | 1                 | 4               | 1\nP3      | 2                 | 9               | 4\nP4      | 3                 | 5               | 2\n\nA. FCFS (First Come First Served):\nGantt Chart:\n|-- P1 (0-8) --|-- P2 (8-12) --|-- P3 (12-21) --|-- P4 (21-26) --|\nCalculation:\nProcess | CT | TAT (CT - AT) | WT (TAT - BT)\nP1      | 8  | 8 - 0 = 8     | 8 - 8 = 0\nP2      | 12 | 12 - 1 = 11   | 11 - 4 = 7\nP3      | 21 | 21 - 2 = 19   | 19 - 9 = 10\nP4      | 26 | 26 - 3 = 23   | 23 - 5 = 18\nAverage Turnaround Time (ATAT) = (8 + 11 + 19 + 23) / 4 = 61 / 4 = 15.25 ms\nAverage Waiting Time (AWT) = (0 + 7 + 10 + 18) / 4 = 35 / 4 = 8.75 ms\n\nB. SRTF (Shortest Remaining Time First / Preemptive SJF):\nTime 0: P1 arrives (rem: 8). Runs until time 1.\nTime 1: P2 arrives (rem: 4). Since 4 < 7 (P1 rem), P2 preempts P1!\nTime 1 to 5: P2 runs and finishes at time 5.\nTime 5: Ready queue: P1 (rem: 7), P3 (rem: 9), P4 (rem: 5). Shortest is P4!\nTime 5 to 10: P4 runs and finishes at time 10.\nTime 10: Ready queue: P1 (rem: 7), P3 (rem: 9). P1 runs!\nTime 10 to 17: P1 finishes at time 17.\nTime 17 to 26: P3 runs and finishes at time 26.\nGantt Chart:\n| P1 (0-1) | P2 (1-5) | P4 (5-10) | P1 (10-17) | P3 (17-26) |\nProcess | CT | TAT (CT - AT) | WT (TAT - BT)\nP1      | 17 | 17 - 0 = 17   | 17 - 8 = 9\nP2      | 5  | 5 - 1 = 4     | 4 - 4 = 0\nP3      | 26 | 26 - 2 = 24   | 24 - 9 = 15\nP4      | 10 | 10 - 3 = 7    | 7 - 5 = 2\nAverage Turnaround Time = (17 + 4 + 24 + 7) / 4 = 52 / 4 = 13.0 ms\nAverage Waiting Time = (9 + 0 + 15 + 2) / 4 = 26 / 4 = 6.5 ms\n\n--------------------------------------------------------------------------------\nQUESTION 2: BANKER'S DEADLOCK AVOIDANCE ALGORITHM (15 MARKS)\n--------------------------------------------------------------------------------\nSystem state with 5 processes (P0-P4) and 3 resource types (A=10, B=5, C=7):\nAllocation Matrix:     Max Matrix:          Available Vector:\n   A  B  C                A  B  C              A  B  C\nP0 0  1  0             P0 7  5  3              3  3  2\nP1 2  0  0             P1 3  2  2\nP2 3  0  2             P2 9  0  2\nP3 2  1  1             P3 2  2  2\nP4 0  0  2             P4 4  3  3\n\nStep 1: Calculate Need Matrix (Need = Max - Allocation):\n   A  B  C\nP0 7  4  3\nP1 1  2  2\nP2 6  0  0\nP3 0  1  1\nP4 4  3  1\n\nStep 2: Safety Algorithm Execution:\nWork = Available = [3, 3, 2], Finish = [F, F, F, F, F]\n- Check P0: Need (7, 4, 3) <= Work (3, 3, 2)? NO.\n- Check P1: Need (1, 2, 2) <= Work (3, 3, 2)? YES!\n  P1 completes. Work = Work + Alloc(P1) = [3+2, 3+0, 2+0] = [5, 3, 2]. Finish[P1] = True.\n- Check P2: Need (6, 0, 0) <= Work (5, 3, 2)? NO.\n- Check P3: Need (0, 1, 1) <= Work (5, 3, 2)? YES!\n  P3 completes. Work = Work + Alloc(P3) = [5+2, 3+1, 2+1] = [7, 4, 3]. Finish[P3] = True.\n- Check P4: Need (4, 3, 1) <= Work (7, 4, 3)? YES!\n  P4 completes. Work = Work + Alloc(P4) = [7+0, 4+0, 3+2] = [7, 4, 5]. Finish[P4] = True.\n- Check P0: Need (7, 4, 3) <= Work (7, 4, 5)? YES!\n  P0 completes. Work = Work + Alloc(P0) = [7+0, 4+1, 5+0] = [7, 5, 5]. Finish[P0] = True.\n- Check P2: Need (6, 0, 0) <= Work (7, 5, 5)? YES!\n  P2 completes. Work = Work + Alloc(P2) = [7+3, 5+0, 5+2] = [10, 5, 7]. Finish[P2] = True.\n\nResult: System is in a SAFE STATE!\nSafe Sequence: < P1, P3, P4, P0, P2 >.\n\n--------------------------------------------------------------------------------\nQUESTION 3: VIRTUAL MEMORY PAGE REPLACEMENT NUMERICALS (10 MARKS)\n--------------------------------------------------------------------------------\nReference String: 7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1\nNumber of Frames: 3\n\nA. FIFO (First In First Out):\nTotal Page Faults = 15.\nHit Ratio = 5 / 20 = 25%.\n\nB. LRU (Least Recently Used):\nTotal Page Faults = 12.\nHit Ratio = 8 / 20 = 40%.\n\nC. Optimal Page Replacement:\nReplaces the page that will not be used for the longest period of time in future.\nTotal Page Faults = 9.\nHit Ratio = 11 / 20 = 55%.\n================================================================================"
    },
    {
        "id": "res-4",
        "title": "Computer Networks: OSI Model & TCP/IP Protocol Suite",
        "subject": "Computer Networks",
        "type": "PDF",
        "uploadedBy": "Rahul Deshmukh",
        "date": "15 Sep 2026",
        "downloads": 195,
        "fileSize": "3.1 MB",
        "description": "Clear diagrams illustrating packet flows, subnetting IP calculations, DNS, DHCP, and HTTP/HTTPS handshakes.",
        "fullContent": "================================================================================\nBENNETT UNIVERSITY - SCHOOL OF COMPUTER SCIENCE ENGINEERING & TECHNOLOGY (SCSET)\nCOMPUTER NETWORKS (CPSC301) - OSI MODEL & PROTOCOL SUITE MASTERY GUIDE\nCurated by: Rahul Deshmukh | Verified by: Networks & Cyber Systems Lab\n================================================================================\n\nTABLE OF CONTENTS:\n1. OSI 7-Layer Architecture vs TCP/IP Protocol Model\n2. Subnetting & CIDR Address Calculations (Fully Worked)\n3. Data Link Layer (CRC Error Detection & ARQ Flow Control)\n4. Transport Layer (TCP 3-Way Handshake & Congestion Control)\n5. Network Routing Algorithms (Distance Vector vs Link State)\n6. Application Layer Protocols (DNS, DHCP, HTTP/1.1 vs HTTP/2 vs HTTP/3)\n\n--------------------------------------------------------------------------------\n1. OSI 7 LAYERS VS TCP/IP PROTOCOL SUITE\n--------------------------------------------------------------------------------\nLayer (OSI)      | PDU      | Core Functionality                   | Primary Protocols\n7. Application   | Data     | Network services to applications     | HTTP, HTTPS, DNS, SMTP, FTP\n6. Presentation  | Data     | Translation, Encryption, Compression | TLS/SSL, JPEG, ASCII\n5. Session       | Data     | Dialog control, session checkpoints  | NetBIOS, RPC, PPTP\n4. Transport     | Segment  | End-to-end reliability & ports       | TCP, UDP, SCTP\n3. Network       | Packet   | Logical addressing & routing         | IPv4, IPv6, ICMP, OSPF, BGP\n2. Data Link     | Frame    | Framing, MAC addressing, error check | Ethernet (802.3), Wi-Fi (802.11)\n1. Physical      | Bit      | Transmission of raw bits over medium | Cat6 Cables, Fiber, Manchester\n\n--------------------------------------------------------------------------------\n2. IPV4 SUBNETTING & CIDR NUMERICAL CALCULATIONS\n--------------------------------------------------------------------------------\nProblem: An organization is allocated the network block 192.168.10.68/26.\nCalculate:\n1. Subnet Mask\n2. Network ID / Subnet Address\n3. First and Last Usable Host IP Addresses\n4. Directed Broadcast Address\n5. Total usable host IPs\n\nStep-by-Step Derivation:\n1. Prefix /26 means 26 network bits and (32 - 26) = 6 host bits.\n   Binary mask: 11111111.11111111.11111111.11000000\n   Decimal Subnet Mask = 255.255.255.192.\n\n2. Network Address:\n   IP 4th octet = 68 = 01000100 in binary.\n   Mask 4th octet = 192 = 11000000 in binary.\n   Bitwise AND: 01000100 & 11000000 = 01000000 = 64.\n   Network Address = 192.168.10.64.\n\n3. Range of Host Addresses:\n   Host bits can vary from 000001 to 111110 (all 0s is network, all 1s is broadcast).\n   First Usable Host = 192.168.10.65.\n   Last Usable Host  = 192.168.10.126.\n\n4. Broadcast Address:\n   All 6 host bits set to 1: 01111111 = 64 + 63 = 127.\n   Directed Broadcast Address = 192.168.10.127.\n\n5. Total Usable Hosts = 2^(6) - 2 = 64 - 2 = 62 usable hosts.\n\n--------------------------------------------------------------------------------\n3. TRANSPORT LAYER: TCP PROTOCOL MECHANISMS\n--------------------------------------------------------------------------------\nA. TCP 3-Way Handshake (Connection Establishment):\nClient                            Server\n  | ----- SYN (Seq = x) ----------> | (Client in SYN_SENT state)\n  | <---- SYN-ACK (Seq=y, Ack=x+1)- | (Server in SYN_RCVD state)\n  | ----- ACK (Seq = x+1, Ack=y+1)->| (Both in ESTABLISHED state)\n\nB. TCP 4-Way Handshake (Connection Termination):\nClient                            Server\n  | ----- FIN (Seq = u) ----------> | (Client enters FIN_WAIT_1)\n  | <---- ACK (Ack = u+1) --------- | (Client enters FIN_WAIT_2, Server in CLOSE_WAIT)\n  | <---- FIN (Seq = v) ----------- | (Server finished sending data, enters LAST_ACK)\n  | ----- ACK (Ack = v+1) --------> | (Client enters TIME_WAIT: 2*MSL duration)\n\nC. TCP Congestion Control (AIMD):\n1. Slow Start: cwnd doubles every RTT (exponential growth).\n2. Congestion Avoidance: cwnd increases by 1 MSS per RTT (linear growth).\n3. Fast Retransmit: Triggered by 3 duplicate ACKs without waiting for timeout.\n================================================================================"
    },
    {
        "id": "res-5",
        "title": "Python for Data Science & Machine Learning Crash Course",
        "subject": "Python",
        "type": "Video",
        "uploadedBy": "ACM BU Tech Team",
        "date": "10 Sep 2026",
        "downloads": 340,
        "fileSize": "Link / Video",
        "description": "Curated walkthrough and notebook code covering NumPy, Pandas, Matplotlib, and Scikit-learn basics for Bennett AI specializations.",
        "fullContent": "================================================================================\nBENNETT UNIVERSITY - SCHOOL OF COMPUTER SCIENCE ENGINEERING & TECHNOLOGY (SCSET)\nPYTHON FOR DATA SCIENCE & MACHINE LEARNING (CPSC312) - MASTER CRASH COURSE\nCurated by: ACM Bennett University Chapter | AI & Machine Learning Specialization\n================================================================================\n\nTABLE OF CONTENTS:\n1. High-Performance NumPy (Vectorization & Broadcasting)\n2. Data Wrangling Mastery with Pandas\n3. Exploratory Data Analysis & Visualization (Matplotlib & Seaborn)\n4. Scikit-Learn Supervised Machine Learning Pipeline\n5. Model Evaluation Metrics & Classification Diagnostics\n\n--------------------------------------------------------------------------------\n1. NUMPY CORE ESSENTIALS\n--------------------------------------------------------------------------------\nVectorized operations execute in compiled C code at 50x-100x the speed of native Python loops.\n```python\nimport numpy as np\n\n# Multi-dimensional arrays\na = np.array([[1, 2, 3], [4, 5, 6]], dtype=np.float32)\nprint(\"Shape:\", a.shape) # (2, 3)\n\n# Broadcasting Rules:\nx = np.ones((3, 1)) # Shape (3, 1)\ny = np.array([10, 20, 30, 40]) # Shape (4,)\nz = x + y # Broadcasts to shape (3, 4)!\n\n# Matrix Multiplication:\nA = np.random.randn(2, 3)\nB = np.random.randn(3, 4)\nC = A @ B # Resulting shape: (2, 4)\n```\n\n--------------------------------------------------------------------------------\n2. PANDAS DATA WRANGLING MASTERY\n--------------------------------------------------------------------------------\n```python\nimport pandas as pd\n\n# Load Student Dataset\ndf = pd.read_csv(\"student_scores.csv\")\n\n# Cleaning & Imputation\ndf.dropna(subset=['cgpa'], inplace=True)\ndf['branch'].fillna('CSE', inplace=True)\n\n# Fast Filtering & Conditional Selection\nplaced_ai_students = df[(df['cgpa'] >= 8.0) & (df['specialization'] == 'AI & DS')]\n\n# Aggregations via GroupBy\nbranch_summary = df.groupby('branch').agg({\n    'cgpa': ['mean', 'max'],\n    'placement_package_lpa': 'mean'\n}).reset_index()\n```\n\n--------------------------------------------------------------------------------\n3. SCIKIT-LEARN SUPERVISED ML PIPELINE\n--------------------------------------------------------------------------------\n```python\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import classification_report, roc_auc_score\n\n# Feature Matrix and Target Vector\nX = df.drop(columns=['placed_status', 'student_id'])\ny = df['placed_status'] # Target (1 = Placed, 0 = Unplaced)\n\n# Train-Test Split (80% Train, 20% Test)\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.20, random_state=42, stratify=y\n)\n\n# Pipeline Definition\npreprocessor = ColumnTransformer(transformers=[\n    ('num', StandardScaler(), ['cgpa', 'leetcode_solved_count', 'hackathon_count']),\n    ('cat', OneHotEncoder(drop='first'), ['branch'])\n])\n\nmodel_pipeline = Pipeline(steps=[\n    ('preprocessor', preprocessor),\n    ('classifier', RandomForestClassifier(n_estimators=100, max_depth=8, random_state=42))\n])\n\n# Fit & Evaluate\nmodel_pipeline.fit(X_train, y_train)\ny_pred = model_pipeline.predict(X_test)\nprint(classification_report(y_test, y_pred))\n```\n\n--------------------------------------------------------------------------------\n4. MODEL EVALUATION METRICS\n--------------------------------------------------------------------------------\n- Accuracy = (TP + TN) / (TP + TN + FP + FN)\n- Precision = TP / (TP + FP)  -> High precision avoids false positives.\n- Recall = TP / (TP + FN)     -> High recall avoids missed detections.\n- F1-Score = 2 * (Precision * Recall) / (Precision + Recall) -> Harmonic mean.\n================================================================================"
    },
    {
        "id": "res-6",
        "title": "Engineering Mathematics III: Laplace & Fourier Transforms",
        "subject": "Mathematics",
        "type": "Notes",
        "uploadedBy": "Ananya Sen",
        "date": "05 Sep 2026",
        "downloads": 220,
        "fileSize": "1.9 MB",
        "description": "Formula sheets, solved boundary value problems, and step-by-step Fourier series derivations for BU mid-terms.",
        "fullContent": "================================================================================\nBENNETT UNIVERSITY - SCHOOL OF ENGINEERING & APPLIED SCIENCES (SEAS)\nENGINEERING MATHEMATICS III (MATH201) - LAPLACE & FOURIER TRANSFORMS\nCurated by: Ananya Sen | Verified by: Mathematics Department Faculty\n================================================================================\n\nTABLE OF CONTENTS:\n1. Definition & Master Table of Standard Laplace Transforms\n2. First & Second Shifting Theorems\n3. Transforms of Derivatives & Integrals\n4. Inverse Laplace Transforms & Convolution Theorem\n5. Solving Ordinary Differential Equations (Initial Value Problems)\n6. Fourier Series & Half-Range Expansions (Euler's Formulas)\n\n--------------------------------------------------------------------------------\n1. MASTER TABLE OF STANDARD LAPLACE TRANSFORMS\n--------------------------------------------------------------------------------\nDefinition:\nL{f(t)} = F(s) = Integral from 0 to infinity of [e^(-st) * f(t)] dt, for s > 0.\n\nStandard Functions Table:\nf(t)                | L{f(t)} = F(s)             | Convergence Condition\n-------------------------------------------------------------------------\n1                   | 1 / s                      | s > 0\nt^n (n is positive) | n! / s^(n + 1)             | s > 0\ne^(at)              | 1 / (s - a)                | s > a\nsin(at)             | a / (s^2 + a^2)            | s > 0\ncos(at)             | s / (s^2 + a^2)            | s > 0\nsinh(at)            | a / (s^2 - a^2)            | s > |a|\ncosh(at)            | s / (s^2 - a^2)            | s > |a|\n\n--------------------------------------------------------------------------------\n2. OPERATIONAL PROPERTIES & THEOREMS\n--------------------------------------------------------------------------------\nA. First Shifting Property (Exponential Damping):\nIf L{f(t)} = F(s), then:\nL{e^(at) * f(t)} = F(s - a)\nExamples:\n- L{e^(3t) * cos(4t)} = (s - 3) / [ (s - 3)^2 + 16 ]\n- L{e^(-2t) * t^3} = 3! / (s + 2)^4 = 6 / (s + 2)^4\n\nB. Multiplication by t:\nL{t * f(t)} = -d/ds [F(s)]\nExample: Find L{t * sin(2t)}:\nL{sin(2t)} = 2 / (s^2 + 4)\n-d/ds [2 / (s^2 + 4)] = 4s / (s^2 + 4)^2.\n\n--------------------------------------------------------------------------------\n3. TRANSFORMS OF DERIVATIVES\n--------------------------------------------------------------------------------\n- L{f'(t)} = s * F(s) - f(0)\n- L{f''(t)} = s^2 * F(s) - s * f(0) - f'(0)\n\n--------------------------------------------------------------------------------\n4. SOLVING INITIAL VALUE PROBLEMS (DIFFERENTIAL EQUATIONS)\n--------------------------------------------------------------------------------\nExam Problem (10 Marks):\nSolve the second-order ODE:\ny'' + 4y = sin(t), given y(0) = 0, y'(0) = 1.\n\nStep-by-Step Solution:\n1. Apply Laplace Transform on both sides:\n   [s^2 * Y(s) - s * y(0) - y'(0)] + 4 * Y(s) = 1 / (s^2 + 1)\n\n2. Substitute initial conditions y(0) = 0, y'(0) = 1:\n   s^2 * Y(s) - 0 - 1 + 4 * Y(s) = 1 / (s^2 + 1)\n   (s^2 + 4) * Y(s) = 1 + 1 / (s^2 + 1) = (s^2 + 2) / (s^2 + 1)\n   Y(s) = (s^2 + 2) / [ (s^2 + 4)(s^2 + 1) ]\n\n3. Partial Fractions Decomposition:\n   Y(s) = (2/3) * [ 1 / (s^2 + 4) ] + (1/3) * [ 1 / (s^2 + 1) ]\n\n4. Apply Inverse Laplace Transform:\n   y(t) = (2/3) * (1/2) * sin(2t) + (1/3) * sin(t)\n   y(t) = (1/3) * sin(2t) + (1/3) * sin(t)\nFinal Answer: y(t) = (1/3) * [ sin(2t) + sin(t) ].\n\n--------------------------------------------------------------------------------\n5. FOURIER SERIES & HALF-RANGE EXPANSIONS\n--------------------------------------------------------------------------------\nFourier Series of f(x) on interval [-pi, pi]:\nf(x) = (a0 / 2) + Sum from n=1 to infinity of [ an * cos(nx) + bn * sin(nx) ]\n\nEuler's Formulas:\na0 = (1 / pi) * Integral from -pi to pi of f(x) dx\nan = (1 / pi) * Integral from -pi to pi of [ f(x) * cos(nx) ] dx\nbn = (1 / pi) * Integral from -pi to pi of [ f(x) * sin(nx) ] dx\n================================================================================"
    }
],
  lostFound: [
    {
      id: "lf-1",
      type: "lost",
      itemName: "Black HP Laptop Charger (65W Type-C)",
      category: "Electronics",
      location: "Learning Resource Centre (LRC), 2nd Floor Cubicle 14",
      date: "02 Oct 2026",
      reportedBy: "Kunal Mehra (B.Tech ECE)",
      contact: "kunal.ece@bennett.edu.in",
      status: "active",
      description: "Left near cubicle 14 during evening study hours. Has a small yellow sticker with initials 'KM' on the adapter.",
      image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "lf-2",
      type: "found",
      itemName: "Blue Milton ThermoSteel Water Bottle",
      category: "Accessories",
      location: "Block C Cafeteria (Near Quench Counter)",
      date: "01 Oct 2026",
      reportedBy: "Sunita (Cafeteria Staff)",
      contact: "Admin Desk Block C",
      status: "active",
      description: "Found on the table after lunch rush. Please claim with student ID card.",
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "lf-3",
      type: "lost",
      itemName: "Scientific Calculator Casio fx-991EX",
      category: "Electronics",
      location: "Sports Complex Indoor Badminton Arena",
      date: "30 Sep 2026",
      reportedBy: "Arjun Verma (B.Tech ME)",
      contact: "arjun.v@bennett.edu.in",
      status: "active",
      description: "Black and silver casing with initials on inside lid. Needed urgently for BU mid-term exams!",
      image: "https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "lf-4",
      type: "found",
      itemName: "Set of Two Honda Keys with Marvel Keychain",
      category: "Keys",
      location: "Main Gate Parking & Shuttle Drop Point",
      date: "29 Sep 2026",
      reportedBy: "Campus Security Desk",
      contact: "Main Security Office (Gate 1)",
      status: "active",
      description: "Found on ground near student two-wheeler stand #4. Has an Iron Man pendant.",
      image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=400&q=80"
    }
  ],
  posts: [
    {
      id: "post-1",
      userId: "bu_student_atul_101",
      userName: "Atul Yadav",
      userBranch: "B.Tech CSE (AI & DS), 2nd Year",
      userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
      content: "Hey everyone! 👋 We're assembling a team of 4 for the upcoming HackBennett 36H Hackathon at The Hatchery. Looking for 1 frontend dev and 1 designer. If you want to build an AI product and compete for the ₹2.5L prize pool, drop a comment or DM me!",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
      category: "Event",
      timestamp: "2 hours ago",
      likes: 24,
      isLiked: false,
      comments: [
        { name: "Tanvi Rao", text: "Hey Atul! I do UI/UX in Figma. Would love to jam together at the Hatchery!" },
        { name: "Rohan Das", text: "I can take up the frontend development. Let's meet at LRC after class." }
      ]
    },
    {
      id: "post-2",
      userId: "user_simran_202",
      userName: "Simran Kaur",
      userBranch: "B.Tech CSE, 3rd Year",
      userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80",
      content: "Just uploaded the complete handwritten notes for Operating Systems CPU Scheduling algorithms to the Study Resources section! Includes step-by-step Gantt charts for SJF, Round Robin, and Priority Scheduling. Hope this helps for the upcoming Bennett mid-terms! 📚✨",
      image: "",
      category: "Academic",
      timestamp: "5 hours ago",
      likes: 56,
      isLiked: true,
      comments: [
        { name: "Devansh Gupta", text: "Thank you so much Simran! These are lifesavers for the exams." }
      ]
    },
    {
      id: "post-3",
      userId: "user_aditya_303",
      userName: "Dhruv Sen",
      userBranch: "School of Management, 2nd Year",
      userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
      content: "Pulse Music Society open acoustic jam session this Friday at 5:30 PM by the Cafeteria Amphitheatre! Bring your guitars, cajons, or just your voice. Open to all Bennett students!",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
      category: "General",
      timestamp: "Yesterday",
      likes: 38,
      isLiked: false,
      comments: []
    }
  ],
  notifications: [
    {
      id: "notif-1",
      title: "Bennett Mid-Term Timetable",
      message: "Autumn Semester 2026 Mid-Term Examination Schedule announced by Examination Cell.",
      time: "10m ago",
      unread: true,
      link: "announcements.html"
    },
    {
      id: "notif-2",
      title: "HackBennett 36H Announced",
      message: "SCSET & ACM Student Chapter posted HackBennett 36H with ₹2.5L prize pool.",
      time: "2h ago",
      unread: true,
      link: "events.html"
    },
    {
      id: "notif-3",
      title: "Uphoria 2026 Registration Confirmed",
      message: "Your student pass for Uphoria 2026 Cultural Fest is verified!",
      time: "Yesterday",
      unread: false,
      link: "events.html"
    },
    {
      id: "notif-4",
      title: "Community Post Activity",
      message: "Tanvi Rao commented on your HackBennett team search post.",
      time: "1d ago",
      unread: false,
      link: "dashboard.html"
    }
  ]
};

// Data Store Layer
const CampusData = {
  parseEventDate(dateStr) {
    if (!dateStr) return 0;
    try {
      const clean = dateStr.trim();
      // Handle ranges like "20 Oct - 26 Oct 2026" or "26 Dec 2026 - 10 Jan 2027"
      if (clean.includes('-')) {
        const parts = clean.split('-');
        let startPart = parts[0].trim();
        // If startPart doesn't contain a 4-digit year, borrow from endPart or default 2026
        if (!/\b\d{4}\b/.test(startPart)) {
          const yearMatch = clean.match(/\b\d{4}\b/);
          const year = yearMatch ? yearMatch[0] : '2026';
          startPart = `${startPart} ${year}`;
        }
        const parsed = new Date(startPart);
        if (!isNaN(parsed.getTime())) return parsed.getTime();
      }
      const direct = new Date(clean);
      return isNaN(direct.getTime()) ? 0 : direct.getTime();
    } catch (e) {
      return 0;
    }
  },

  init() {
    const existing = localStorage.getItem('campusconnect_data');
    if (!existing || !existing.includes('Atul Yadav')) {
      localStorage.setItem('campusconnect_data', JSON.stringify(DEFAULT_SAMPLE_DATA));
      return;
    }
    try {
      const parsed = JSON.parse(existing);
      // Update clubs, events, and sports if data version differs
      if (!parsed.dataVersion || parsed.dataVersion !== DEFAULT_SAMPLE_DATA.dataVersion) {
        parsed.dataVersion = DEFAULT_SAMPLE_DATA.dataVersion;
        parsed.events = DEFAULT_SAMPLE_DATA.events;
        parsed.clubs = DEFAULT_SAMPLE_DATA.clubs;
        parsed.sports = DEFAULT_SAMPLE_DATA.sports;
        parsed.resources = DEFAULT_SAMPLE_DATA.resources;
        parsed.announcements = DEFAULT_SAMPLE_DATA.announcements;
        localStorage.setItem('campusconnect_data', JSON.stringify(parsed));
      }
    } catch (e) {
      localStorage.setItem('campusconnect_data', JSON.stringify(DEFAULT_SAMPLE_DATA));
    }
  },

  _memoryData: null,

  getAll() {
    if (this._memoryData) {
      return this._memoryData;
    }
    try {
      const data = localStorage.getItem('campusconnect_data');
      if (!data) {
        this._memoryData = DEFAULT_SAMPLE_DATA;
        return DEFAULT_SAMPLE_DATA;
      }
      const parsed = JSON.parse(data);
      if (!parsed.dataVersion || parsed.dataVersion !== DEFAULT_SAMPLE_DATA.dataVersion) {
        parsed.dataVersion = DEFAULT_SAMPLE_DATA.dataVersion;
        parsed.events = DEFAULT_SAMPLE_DATA.events;
        parsed.clubs = DEFAULT_SAMPLE_DATA.clubs;
        parsed.sports = DEFAULT_SAMPLE_DATA.sports;
        parsed.resources = DEFAULT_SAMPLE_DATA.resources;
        parsed.announcements = DEFAULT_SAMPLE_DATA.announcements;
        localStorage.setItem('campusconnect_data', JSON.stringify(parsed));
      }
      this._memoryData = parsed;
      return parsed;
    } catch (e) {
      this._memoryData = DEFAULT_SAMPLE_DATA;
      return DEFAULT_SAMPLE_DATA;
    }
  },

  save(data) {
    this._memoryData = data;
    localStorage.setItem('campusconnect_data', JSON.stringify(data));
  },

  getCurrentUser() {
    const data = this.getAll();
    return data.currentUser || DEFAULT_SAMPLE_DATA.currentUser;
  },

  updateCurrentUser(updatedFields) {
    const data = this.getAll();
    data.currentUser = { ...data.currentUser, ...updatedFields };
    this.save(data);
    return data.currentUser;
  },

  // Fast In-Memory Sync Tracking
  _cache: {},

  getEventsSync() {
    const eventsList = [...this.getAll().events];
    return eventsList.sort((a, b) => this.parseEventDate(a.date) - this.parseEventDate(b.date));
  },

  // Events API (Instant 0ms Local Return + Non-Blocking Background Sync)
  async getEvents() {
    const eventsList = [...this.getAll().events];
    const sorted = eventsList.sort((a, b) => this.parseEventDate(a.date) - this.parseEventDate(b.date));

    if (window.CampusConnectFirebase && window.CampusConnectFirebase.isReady && !this._cache.eventsSynced) {
      this._cache.eventsSynced = true;
      window.CampusConnectFirebase.db.collection('events').get().then(snapshot => {
        if (!snapshot.empty) {
          const remote = [];
          snapshot.forEach(doc => remote.push({ id: doc.id, ...doc.data() }));
          if (remote.length > 0) {
            const data = this.getAll();
            data.events = remote;
            this.save(data);
          }
        }
      }).catch(() => {});
    }
    return sorted;
  },

  // Clubs API (Instant 0ms Local Return + Non-Blocking Background Sync)
  async getClubs() {
    const clubs = [...this.getAll().clubs];
    if (window.CampusConnectFirebase && window.CampusConnectFirebase.isReady && !this._cache.clubsSynced) {
      this._cache.clubsSynced = true;
      window.CampusConnectFirebase.db.collection('clubs').get().then(snapshot => {
        if (!snapshot.empty) {
          const remote = [];
          snapshot.forEach(doc => remote.push({ id: doc.id, ...doc.data() }));
          if (remote.length > 0) {
            const data = this.getAll();
            data.clubs = remote;
            this.save(data);
          }
        }
      }).catch(() => {});
    }
    return clubs;
  },

  // Sports API (Facilities, Varsity Trials, Tournaments, House Standings)
  async getSports() {
    const data = this.getAll();
    return data.sports || DEFAULT_SAMPLE_DATA.sports;
  },

  registerForTrial(trialId, applicantData = {}) {
    const data = this.getAll();
    if (!data.sports || !data.sports.trials) return false;
    const trial = data.sports.trials.find(t => t.id === trialId);
    if (trial) {
      trial.isRegistered = true;
      trial.registeredApplicant = applicantData;
      this.save(data);
      return true;
    }
    return false;
  },

  // Autonomous Live Feed Sync (Option 1: Auto-updates silently from public feed)
  async syncWithLiveFeed(feedUrl = null, showToastNotification = false) {
    try {
      const url = feedUrl || (typeof localStorage !== 'undefined' && localStorage.getItem('bu_live_feed_url')) || 'data/bennett_live_feed.json';
      const response = await fetch(url + '?_t=' + Date.now());
      if (!response.ok) return false;
      const feed = await response.json();
      if (!feed) return false;

      const current = this.getAll();
      let updated = false;

      if (feed.events && Array.isArray(feed.events) && feed.events.length > 0) {
        current.events = feed.events;
        updated = true;
      }
      if (feed.clubs && Array.isArray(feed.clubs) && feed.clubs.length > 0) {
        current.clubs = feed.clubs;
        updated = true;
      }
      if (feed.sports && typeof feed.sports === 'object') {
        current.sports = feed.sports;
        updated = true;
      }
      if (feed.feedVersion) {
        current.feedVersion = feed.feedVersion;
      }
      current.lastLiveSync = new Date().toISOString();

      if (updated) {
        this.save(current);
        if (showToastNotification && typeof window !== 'undefined' && typeof window.showToast === 'function') {
          window.showToast(`Bennett University feed synced (${current.events.length} events, ${current.clubs.length} clubs)`, 'success', 3500);
        }
        if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
          window.dispatchEvent(new CustomEvent('campusdata:synced', { detail: feed }));
        }
        return true;
      }
    } catch (err) {
      console.warn("Autonomous live feed sync skipped:", err.message);
    }
    return false;
  },

  // Announcements API (Instant 0ms Local Return + Non-Blocking Background Sync)
  async getAnnouncements(programFilter = null) {
    let list = [...this.getAll().announcements];
    if (window.CampusConnectFirebase && window.CampusConnectFirebase.isReady && !this._cache.announcementsSynced) {
      this._cache.announcementsSynced = true;
      window.CampusConnectFirebase.db.collection('announcements').get().then(snapshot => {
        if (!snapshot.empty) {
          const remote = [];
          snapshot.forEach(doc => remote.push({ id: doc.id, ...doc.data() }));
          if (remote.length > 0) {
            const data = this.getAll();
            data.announcements = remote;
            this.save(data);
          }
        }
      }).catch(() => {});
    }
    if (programFilter && programFilter !== 'All' && programFilter !== 'All Programmes') {
      return list.filter(a => {
        if (!a.targetProgram || a.targetProgram === 'All Programmes' || a.targetProgram === 'All') return true;
        return a.targetProgram.toLowerCase().includes(programFilter.toLowerCase()) || 
               programFilter.toLowerCase().includes(a.targetProgram.toLowerCase());
      });
    }
    return list;
  },

  async addClub(newClub) {
    const data = this.getAll();
    if (!newClub.id) newClub.id = 'club-' + Date.now();
    if (!newClub.members) newClub.members = 1;
    if (!newClub.status) newClub.status = "Active";
    data.clubs.unshift(newClub);
    this.save(data);

    if (window.CampusConnectFirebase && window.CampusConnectFirebase.isReady) {
      try {
        await window.CampusConnectFirebase.db.collection('clubs').doc(newClub.id).set(newClub);
      } catch (e) {
        console.warn("Firestore club add error:", e);
      }
    }
    return newClub;
  },

  async updateClub(clubId, updatedFields) {
    const data = this.getAll();
    const idx = data.clubs.findIndex(c => c.id === clubId);
    if (idx !== -1) {
      data.clubs[idx] = { ...data.clubs[idx], ...updatedFields };
      this.save(data);

      if (window.CampusConnectFirebase && window.CampusConnectFirebase.isReady) {
        try {
          await window.CampusConnectFirebase.db.collection('clubs').doc(clubId).update(updatedFields);
        } catch (e) {
          console.warn("Firestore club update error:", e);
        }
      }
      return data.clubs[idx];
    }
    return null;
  },

  async deleteClub(clubId) {
    const data = this.getAll();
    data.clubs = data.clubs.filter(c => c.id !== clubId);
    this.save(data);

    if (window.CampusConnectFirebase && window.CampusConnectFirebase.isReady) {
      try {
        await window.CampusConnectFirebase.db.collection('clubs').doc(clubId).delete();
      } catch (e) {
        console.warn("Firestore club delete error:", e);
      }
    }
    return true;
  },

  async addAnnouncement(announcement) {
    const data = this.getAll();
    if (!announcement.id) announcement.id = 'an-' + Date.now();
    if (!announcement.targetProgram) announcement.targetProgram = "All Programmes";
    data.announcements.unshift(announcement);
    this.save(data);

    if (window.CampusConnectFirebase && window.CampusConnectFirebase.isReady) {
      try {
        await window.CampusConnectFirebase.db.collection('announcements').doc(announcement.id).set(announcement);
      } catch (e) {
        console.warn("Firestore announcement add error:", e);
      }
    }
    return announcement;
  },

  async updateAnnouncement(id, updatedFields) {
    const data = this.getAll();
    const idx = data.announcements.findIndex(a => a.id === id);
    if (idx !== -1) {
      data.announcements[idx] = { ...data.announcements[idx], ...updatedFields };
      this.save(data);

      if (window.CampusConnectFirebase && window.CampusConnectFirebase.isReady) {
        try {
          await window.CampusConnectFirebase.db.collection('announcements').doc(id).update(updatedFields);
        } catch (e) {
          console.warn("Firestore announcement update error:", e);
        }
      }
      return data.announcements[idx];
    }
    return null;
  },

  async deleteAnnouncement(id) {
    const data = this.getAll();
    data.announcements = data.announcements.filter(a => a.id !== id);
    this.save(data);

    if (window.CampusConnectFirebase && window.CampusConnectFirebase.isReady) {
      try {
        await window.CampusConnectFirebase.db.collection('announcements').doc(id).delete();
      } catch (e) {
        console.warn("Firestore announcement delete error:", e);
      }
    }
    return true;
  },

  async addEvent(event) {
    const data = this.getAll();
    if (!event.id) event.id = 'ev-' + Date.now();
    if (!event.targetProgram) event.targetProgram = "All Programmes";
    data.events.push(event);
    this.save(data);

    if (window.CampusConnectFirebase && window.CampusConnectFirebase.isReady) {
      try {
        await window.CampusConnectFirebase.db.collection('events').doc(event.id).set(event);
      } catch (e) {
        console.warn("Firestore event add error:", e);
      }
    }
    return event;
  },

  async deleteEvent(id) {
    const data = this.getAll();
    data.events = data.events.filter(e => e.id !== id);
    this.save(data);

    if (window.CampusConnectFirebase && window.CampusConnectFirebase.isReady) {
      try {
        await window.CampusConnectFirebase.db.collection('events').doc(id).delete();
      } catch (e) {
        console.warn("Firestore event delete error:", e);
      }
    }
    return true;
  },

  async addSportTrial(trial) {
    const data = this.getAll();
    if (!trial.id) trial.id = 'tr-' + Date.now();
    if (!data.sports) data.sports = { trials: [], competitions: [], facilities: [], houses: [] };
    if (!data.sports.trials) data.sports.trials = [];
    data.sports.trials.unshift(trial);
    this.save(data);
    return trial;
  },

  async deleteSportTrial(trialId) {
    const data = this.getAll();
    if (data.sports && data.sports.trials) {
      data.sports.trials = data.sports.trials.filter(t => t.id !== trialId);
      this.save(data);
      return true;
    }
    return false;
  },

  // Resources API (Instant 0ms Local Return + Non-Blocking Background Sync)
  async getResources() {
    const resources = [...this.getAll().resources];
    if (window.CampusConnectFirebase && window.CampusConnectFirebase.isReady && !this._cache.resourcesSynced) {
      this._cache.resourcesSynced = true;
      window.CampusConnectFirebase.db.collection('resources').get().then(snapshot => {
        if (!snapshot.empty) {
          const remote = [];
          snapshot.forEach(doc => remote.push({ id: doc.id, ...doc.data() }));
          if (remote.length > 0) {
            const data = this.getAll();
            data.resources = remote;
            this.save(data);
          }
        }
      }).catch(() => {});
    }
    return resources;
  },

  // Lost & Found API (Instant 0ms Local Return + Non-Blocking Background Sync)
  async getLostFound() {
    const items = [...this.getAll().lostFound];
    if (window.CampusConnectFirebase && window.CampusConnectFirebase.isReady && !this._cache.lostFoundSynced) {
      this._cache.lostFoundSynced = true;
      window.CampusConnectFirebase.db.collection('lost_found').get().then(snapshot => {
        if (!snapshot.empty) {
          const remote = [];
          snapshot.forEach(doc => remote.push({ id: doc.id, ...doc.data() }));
          if (remote.length > 0) {
            const data = this.getAll();
            data.lostFound = remote;
            this.save(data);
          }
        }
      }).catch(() => {});
    }
    return items;
  },

  // Posts API
  async getPosts() {
    if (window.CampusConnectFirebase && window.CampusConnectFirebase.isReady) {
      try {
        const snapshot = await window.CampusConnectFirebase.db.collection('posts').orderBy('createdAt', 'desc').get();
        if (!snapshot.empty) {
          const posts = [];
          snapshot.forEach(doc => posts.push({ id: doc.id, ...doc.data() }));
          return posts;
        }
      } catch (e) {
        console.warn("Firestore fetch error:", e);
      }
    }
    return this.getAll().posts;
  },

  async addPost(postObj) {
    if (window.CampusConnectFirebase && window.CampusConnectFirebase.isReady) {
      try {
        const docRef = await window.CampusConnectFirebase.db.collection('posts').add({
          ...postObj,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        postObj.id = docRef.id;
      } catch (e) {
        console.error("Firestore post write error:", e);
      }
    }
    // Also save locally
    const data = this.getAll();
    if (!postObj.id) postObj.id = 'post-' + Date.now();
    data.posts.unshift(postObj);
    data.currentUser.stats.posts += 1;
    this.save(data);
    return postObj;
  },

  async addLostFound(itemObj) {
    if (window.CampusConnectFirebase && window.CampusConnectFirebase.isReady) {
      try {
        const docRef = await window.CampusConnectFirebase.db.collection('lost_found').add({
          ...itemObj,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        itemObj.id = docRef.id;
      } catch (e) {
        console.error("Firestore lost_found write error:", e);
      }
    }
    const data = this.getAll();
    if (!itemObj.id) itemObj.id = 'lf-' + Date.now();
    data.lostFound.unshift(itemObj);
    this.save(data);
    return itemObj;
  },

  async addResource(resObj) {
    if (window.CampusConnectFirebase && window.CampusConnectFirebase.isReady) {
      try {
        const docRef = await window.CampusConnectFirebase.db.collection('resources').add({
          ...resObj,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        resObj.id = docRef.id;
      } catch (e) {
        console.error("Firestore resource write error:", e);
      }
    }
    const data = this.getAll();
    if (!resObj.id) resObj.id = 'res-' + Date.now();
    data.resources.unshift(resObj);
    data.currentUser.stats.resourcesUploaded += 1;
    this.save(data);
    return resObj;
  }
};

CampusData.init();

// Toast Notification Manager
function showToast(message, type = 'info', duration = 3500) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const icons = {
    success: `<svg class="icon-svg" style="color:var(--success)" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
    danger: `<svg class="icon-svg" style="color:var(--danger)" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></polyline><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`,
    warning: `<svg class="icon-svg" style="color:var(--warning)" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
    info: `<svg class="icon-svg" style="color:var(--info)" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`
  };

  toast.innerHTML = `
    <div style="display:flex;align-items:center;gap:0.75rem;flex:1;">
      ${icons[type] || icons.info}
      <span style="font-size:0.9rem;font-weight:500;color:var(--text-primary);">${message}</span>
    </div>
    <button style="opacity:0.6;font-size:1.1rem;cursor:pointer;line-height:1;" onclick="this.parentElement.remove()">&times;</button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// Dark/Light Theme Handler
function initTheme() {
  const savedTheme = localStorage.getItem('campusconnect_theme') || localStorage.getItem('campus_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeToggleIcons(savedTheme);
}

function toggleTheme() {
  document.documentElement.classList.add('theme-transitioning');
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('campusconnect_theme', newTheme);
  localStorage.setItem('campus_theme', newTheme);
  updateThemeToggleIcons(newTheme);
  showToast(`Switched to ${newTheme} mode`, 'info', 2000);
  setTimeout(() => {
    document.documentElement.classList.remove('theme-transitioning');
  }, 300);
}

function updateThemeToggleIcons(theme) {
  const toggles = document.querySelectorAll('.theme-toggle-btn');
  toggles.forEach(btn => {
    btn.setAttribute('title', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    btn.innerHTML = theme === 'dark' 
      ? `<svg class="icon-svg" viewBox="0 0 24 24" style="color:#FBBF24 !important;stroke:#FBBF24 !important;"><circle cx="12" cy="12" r="5" fill="#FBBF24" fill-opacity="0.28"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
      : `<svg class="icon-svg" viewBox="0 0 24 24" style="color:#4B5563;stroke:#4B5563;"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="#4B5563" fill-opacity="0.15"></path></svg>`;
  });
}

// Global Search System
function initGlobalSearch() {
  const searchInput = document.getElementById('globalSearchInput');
  const searchDropdown = document.getElementById('searchDropdown');
  if (!searchInput || !searchDropdown) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    if (query.length < 2) {
      searchDropdown.classList.remove('show');
      return;
    }

    const data = CampusData.getAll();
    const results = [];

    // Search events
    data.events.forEach(ev => {
      if (ev.title.toLowerCase().includes(query) || ev.category.toLowerCase().includes(query)) {
        results.push({ title: ev.title, category: 'Event', link: `events.html` });
      }
    });

    // Search clubs
    data.clubs.forEach(cl => {
      if (cl.name.toLowerCase().includes(query) || cl.category.toLowerCase().includes(query)) {
        results.push({ title: cl.name, category: 'Club', link: `clubs.html` });
      }
    });

    // Search announcements
    data.announcements.forEach(an => {
      if (an.title.toLowerCase().includes(query) || an.category.toLowerCase().includes(query)) {
        results.push({ title: an.title, category: 'Announcement', link: `announcements.html` });
      }
    });

    // Search resources
    data.resources.forEach(res => {
      if (res.title.toLowerCase().includes(query) || res.subject.toLowerCase().includes(query)) {
        results.push({ title: res.title, category: 'Resource', link: `resources.html` });
      }
    });

    if (results.length === 0) {
      searchDropdown.innerHTML = `<div style="padding:1rem;text-align:center;color:var(--text-muted);font-size:0.9rem;">No results found for "${query}"</div>`;
    } else {
      searchDropdown.innerHTML = results.slice(0, 6).map(res => `
        <a href="${res.link}" class="search-result-item">
          <span class="search-result-badge">${res.category}</span>
          <span style="font-size:0.9rem;font-weight:500;color:var(--text-primary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${res.title}</span>
        </a>
      `).join('');
    }

    searchDropdown.classList.add('show');
  });

  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
      searchDropdown.classList.remove('show');
    }
  });
}

// Notifications Popup Management
function initNotifications() {
  const notifBtn = document.getElementById('notifBtn');
  const notifDropdown = document.getElementById('notifDropdown');
  const notifList = document.getElementById('notifList');
  const notifBadge = document.getElementById('notifBadge');

  if (!notifBtn || !notifDropdown) return;

  const data = CampusData.getAll();
  const unreadCount = data.notifications.filter(n => n.unread).length;
  if (notifBadge) {
    if (unreadCount > 0) {
      notifBadge.textContent = unreadCount;
      notifBadge.style.display = 'flex';
    } else {
      notifBadge.style.display = 'none';
    }
  }

  if (notifList) {
    notifList.innerHTML = data.notifications.map(n => `
      <a href="${n.link}" class="notification-item ${n.unread ? 'unread' : ''}">
        <div class="notification-icon">
          <svg class="icon-svg" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
        </div>
        <div style="flex:1;">
          <div style="font-size:0.88rem;font-weight:600;color:var(--text-primary);margin-bottom:0.15rem;">${n.title}</div>
          <div style="font-size:0.8rem;color:var(--text-secondary);">${n.message}</div>
          <div style="font-size:0.72rem;color:var(--text-muted);margin-top:0.35rem;">${n.time}</div>
        </div>
      </a>
    `).join('');
  }

  notifBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    notifDropdown.classList.toggle('show');
  });

  document.addEventListener('click', (e) => {
    if (!notifDropdown.contains(e.target) && !notifBtn.contains(e.target)) {
      notifDropdown.classList.remove('show');
    }
  });
}

// User Menu Popup
function initUserMenu() {
  const userMenuBtn = document.getElementById('userMenuBtn');
  const userMenuDropdown = document.getElementById('userMenuDropdown');
  if (!userMenuBtn || !userMenuDropdown) return;

  userMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    userMenuDropdown.classList.toggle('show');
  });

  document.addEventListener('click', (e) => {
    if (!userMenuDropdown.contains(e.target) && !userMenuBtn.contains(e.target)) {
      userMenuDropdown.classList.remove('show');
    }
  });
}

// Mobile Sidebar Drawer
function initMobileSidebar() {
  const toggleBtn = document.getElementById('sidebarToggleBtn');
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebarBackdrop');

  if (!toggleBtn || !sidebar) return;

  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('mobile-open');
    if (backdrop) backdrop.classList.toggle('active');
  });

  if (backdrop) {
    backdrop.addEventListener('click', () => {
      sidebar.classList.remove('mobile-open');
      backdrop.classList.remove('active');
    });
  }
}

// Populate User Details across Header and Sidebar
function syncUserUI() {
  const user = CampusData.getCurrentUser();
  const userNameEls = document.querySelectorAll('.sync-user-name');
  const userSubEls = document.querySelectorAll('.sync-user-sub');
  const userAvatarEls = document.querySelectorAll('.sync-user-avatar');

  userNameEls.forEach(el => el.textContent = user.name || "Student");
  userSubEls.forEach(el => el.textContent = `${user.course} (${user.branch || user.year})`);
  userAvatarEls.forEach(el => {
    if (user.photoURL) {
      el.innerHTML = `<img src="${user.photoURL}" alt="${user.name}">`;
    } else {
      const initial = (user.name || "S").charAt(0).toUpperCase();
      el.textContent = initial;
    }
  });
}

// Logout handler
function handleLogout() {
  if (window.CampusConnectFirebase && window.CampusConnectFirebase.auth) {
    window.CampusConnectFirebase.auth.signOut().then(() => {
      showToast("Logged out successfully", "info");
      setTimeout(() => window.location.href = "login.html", 600);
    }).catch(err => {
      console.error(err);
      window.location.href = "login.html";
    });
  } else {
    showToast("Logged out successfully", "info");
    setTimeout(() => window.location.href = "login.html", 600);
  }
}

// Modal Dialog Controller
function openModal(modalId) {
  const modal = typeof modalId === 'string' ? document.getElementById(modalId) : modalId;
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = typeof modalId === 'string' ? document.getElementById(modalId) : modalId;
  if (modal) {
    modal.classList.remove('active');
    // If no remaining active modals, restore normal scrolling
    if (!document.querySelector('.modal-overlay.active')) {
      document.body.style.overflow = '';
    }
  }
}

// Initialize Global Handlers when DOM is Ready
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initGlobalSearch();
  initNotifications();
  initUserMenu();
  initMobileSidebar();
  syncUserUI();

  // Attach global logout buttons
  document.querySelectorAll('.btn-logout-action').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      handleLogout();
    });
  });

  // Attach theme toggles
  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });

  // Global modal overlay click to dismiss
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      closeModal(e.target);
    }
  });

  // ESC key to close any active modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(m => closeModal(m));
    }
  });

  // Quiet background sync with Bennett live feed (Option 1)
  CampusData.syncWithLiveFeed(null, false);

  // Attach sync feed buttons
  document.querySelectorAll('.btn-sync-feed, #btnSyncFeed').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      btn.style.pointerEvents = 'none';
      const icon = btn.querySelector('svg, i');
      if (icon) {
        icon.style.transition = 'transform 0.8s ease';
        icon.style.transform = 'rotate(720deg)';
      }
      await CampusData.syncWithLiveFeed(null, true);
      setTimeout(() => {
        btn.style.pointerEvents = '';
        if (icon) {
          icon.style.transition = '';
          icon.style.transform = '';
        }
      }, 900);
    });
  });
});

window.CampusData = CampusData;
window.showToast = showToast;
window.toggleTheme = toggleTheme;
window.handleLogout = handleLogout;
window.openModal = openModal;
window.closeModal = closeModal;
