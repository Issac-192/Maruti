import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Heart, Shield, AlertTriangle, MapPin, Camera, CheckCircle2, Clock, 
  User, Award, Phone, Send, Search, Bell, Filter, ChevronRight,
  TrendingUp, Users, Activity, FileText, Check, X, RefreshCw,
  Share2, ArrowRight, Upload, Info, Navigation, Star, DollarSign,
  PlusCircle, Stethoscope, Building, Compass, Sparkles, AlertCircle,
  Code, Copy, ExternalLink, HelpCircle, Layers, CheckCircle
} from 'lucide-react';

const INITIAL_USERS = {
  citizen: {
    id: "usr_01",
    name: "Aravind Sharma",
    role: "citizen",
    email: "aravind@srmuniv.edu.in",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
    pawPoints: 340,
    level: "Paw Guardian",
    phone: "+91 98401 23456",
    city: "Chennai, TN"
  },
  ngo: {
    id: "ngo_user_01",
    name: "Blue Cross Rescuer Desk",
    orgName: "Blue Cross of India (Chennai)",
    role: "ngo",
    email: "rescue@bluecrosstamilnadu.org",
    avatar: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=120&q=80",
    pawPoints: 1250,
    verified: true,
    phone: "+91 44 2235 4986"
  },
  vet: {
    id: "vet_01",
    name: "Dr. Meera Nambiar, MVSc",
    role: "vet",
    hospital: "Cattle & Small Animal Trauma Center",
    email: "dr.meera@chennaivetclinic.org",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=120&q=80",
    license: "VCI/TN/8849",
    phone: "+91 94441 98765"
  },
  admin: {
    id: "admin_01",
    name: "MARUTI Central Oversight",
    role: "admin",
    email: "admin@maruti-rescue.gov.in",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80",
    designation: "State Animal Welfare Board Coordinator"
  }
};

const INITIAL_NGOS = [
  {
    id: "ngo_1",
    name: "Blue Cross of India (Guindy)",
    distanceKm: 1.4,
    verified: true,
    rating: 4.9,
    reviewsCount: 312,
    animals: ["Dogs", "Cats", "Cows", "Birds", "Horses"],
    available: true,
    phone: "+91 44 2235 4986",
    address: "Velachery Main Rd, Guindy, Chennai",
    coords: { lat: 13.0067, lng: 80.2206 },
    activeRescues: 8
  },
  {
    id: "ngo_2",
    name: "PFA Chennai (People For Animals)",
    distanceKm: 2.8,
    verified: true,
    rating: 4.8,
    reviewsCount: 184,
    animals: ["Dogs", "Cats", "Wild Birds", "Monkeys"],
    available: true,
    phone: "+91 98402 76543",
    address: "East Coast Road, Thiruvanmiyur, Chennai",
    coords: { lat: 12.9863, lng: 80.2616 },
    activeRescues: 5
  },
  {
    id: "ngo_3",
    name: "Besant Memorial Animal Dispensary (BMAD)",
    distanceKm: 4.1,
    verified: true,
    rating: 4.9,
    reviewsCount: 220,
    animals: ["Dogs", "Cats", "Cattle"],
    available: true,
    phone: "+91 44 2491 2345",
    address: "Besant Avenue, Adyar, Chennai",
    coords: { lat: 13.0033, lng: 80.2581 },
    activeRescues: 6
  },
  {
    id: "ngo_4",
    name: "HOPE for Animals Kattankulathur",
    distanceKm: 0.9,
    verified: true,
    rating: 4.7,
    reviewsCount: 96,
    animals: ["Dogs", "Cats", "Puppies"],
    available: true,
    phone: "+91 91763 11223",
    address: "Near SRM University Gate 2, Potheri",
    coords: { lat: 12.8231, lng: 80.0442 },
    activeRescues: 3
  },
  {
    id: "ngo_5",
    name: "Avian & Bird Wildlife Rescue Cell",
    distanceKm: 5.5,
    verified: false,
    rating: 4.5,
    reviewsCount: 42,
    animals: ["Birds", "Kites", "Owls", "Pigeons"],
    available: false,
    phone: "+91 99620 54321",
    address: "Tambaram West, Chennai",
    coords: { lat: 12.9249, lng: 80.1000 },
    activeRescues: 1
  }
];

const INITIAL_RESCUE_CASES = [
  {
    id: "MRT-9041",
    animalType: "Dog",
    condition: "Injured",
    urgency: "HIGH",
    reportedAt: "25 mins ago",
    timestamp: Date.now() - 25 * 60 * 1000,
    locationName: "SRM Tech Park Road, Potheri, Chennai",
    coords: { lat: 12.8235, lng: 80.0450 },
    description: "Indie dog hit by a two-wheeler, bleeding from hind left leg, unable to stand. Sheltered under a tea stall bench.",
    imageUrl: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=600&q=80",
    reporterName: "Aravind Sharma",
    reporterPhone: "+91 98401 23456",
    status: "Rescuer Assigned",
    stepIndex: 3,
    assignedNgo: "HOPE for Animals Kattankulathur",
    assignedRescuer: "Karthik (Field Rescuer - Van #4)",
    vetDiagnosis: "Pending clinical triage upon arrival.",
    treatmentNotes: "Driver dispatched at 08:35 AM. First aid splint ready in vehicle.",
    recoveryPhotos: [],
    pawPointsAwarded: 20
  },
  {
    id: "MRT-8832",
    animalType: "Cow",
    condition: "Sick",
    urgency: "MEDIUM",
    reportedAt: "2 hours ago",
    timestamp: Date.now() - 120 * 60 * 1000,
    locationName: "GST Road near Tambaram flyover",
    coords: { lat: 12.9270, lng: 80.1150 },
    description: "Desi cow sitting lethargic on road divider, suspected severe plastic ingestion & dehydration.",
    imageUrl: "https://images.unsplash.com/photo-1570042225831-d98fa7577f13?auto=format&fit=crop&w=600&q=80",
    reporterName: "Pooja V.",
    reporterPhone: "+91 98410 99882",
    status: "Under Treatment",
    stepIndex: 5,
    assignedNgo: "Blue Cross of India (Guindy)",
    assignedRescuer: "Ramesh M.",
    vetDiagnosis: "Severe dehydration and ruminal impaction. IV electrolytes started.",
    treatmentNotes: "Administered Ringers Lactate 3L + Vitamin B-complex.",
    recoveryPhotos: [
      "https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=600&q=80"
    ],
    pawPointsAwarded: 20
  },
  {
    id: "MRT-7910",
    animalType: "Bird",
    condition: "Trapped",
    urgency: "HIGH",
    reportedAt: "5 hours ago",
    timestamp: Date.now() - 300 * 60 * 1000,
    locationName: "Adyar Eco Park Perimeter, Chennai",
    coords: { lat: 13.0160, lng: 80.2520 },
    description: "Black Kite entangled in glass coated Chinese manja in banyan tree branch, wing cut.",
    imageUrl: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=600&q=80",
    reporterName: "Kavitha Rajan",
    reporterPhone: "+91 99403 44556",
    status: "Recovering",
    stepIndex: 6,
    assignedNgo: "Besant Memorial Animal Dispensary (BMAD)",
    assignedRescuer: "Sundar Bird Specialist",
    vetDiagnosis: "Superficial patagial laceration. No wing bone fracture.",
    treatmentNotes: "Sutured under mild sedation. Kept in flight aviary.",
    recoveryPhotos: [
      "https://images.unsplash.com/photo-1618331835717-801e976710b2?auto=format&fit=crop&w=600&q=80"
    ],
    pawPointsAwarded: 100
  },
  {
    id: "MRT-6204",
    animalType: "Cat",
    condition: "Abandoned",
    urgency: "LOW",
    reportedAt: "1 day ago",
    timestamp: Date.now() - 86400 * 1000,
    locationName: "Besant Nagar 4th Avenue",
    coords: { lat: 12.9980, lng: 80.2660 },
    description: "Three 4-week-old kittens abandoned inside a cardboard box near beach promenade.",
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80",
    reporterName: "Divya N.",
    reporterPhone: "+91 97908 11229",
    status: "Case Closed",
    stepIndex: 7,
    assignedNgo: "PFA Chennai (People For Animals)",
    assignedRescuer: "Meenakshi Rescue volunteer",
    vetDiagnosis: "Healthy neonates, mild hypothermia resolved.",
    treatmentNotes: "Foster mother located. Foster home adoption finalized.",
    recoveryPhotos: [
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=600&q=80"
    ],
    pawPointsAwarded: 120
  }
];

const LEADERBOARD_USERS = [
  { rank: 1, name: "Sneha Krishnan", points: 1420, rescues: 18, level: "Paw Champion", badge: "🏆" },
  { rank: 2, name: "Aravind Sharma (You)", points: 340, rescues: 4, level: "Paw Guardian", badge: "🛡️" },
  { rank: 3, name: "Dr. Vikram Seth", points: 290, rescues: 3, level: "Paw Helper", badge: "🐾" },
  { rank: 4, name: "Rohan Varma", points: 210, rescues: 2, level: "Paw Helper", badge: "🐾" },
  { rank: 5, name: "Priya Sridhar", points: 180, rescues: 2, level: "Paw Beginner", badge: "🌱" }
];

const STATUS_STEPS = [
  "Reported",
  "NGO Notified",
  "Rescue Accepted",
  "Rescuer Assigned",
  "Animal Rescued",
  "Under Treatment",
  "Recovering",
  "Case Closed"
];

export default function App() {
  const [currentUser, setCurrentUser] = useState(INITIAL_USERS.citizen);
  const [activeTab, setActiveTab] = useState('home');
  const [rescueCases, setRescueCases] = useState(INITIAL_RESCUE_CASES);
  const [selectedCaseId, setSelectedCaseId] = useState("MRT-9041");
  const [ngosList, setNgosList] = useState(INITIAL_NGOS);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Rescue request MRT-9041 accepted by HOPE for Animals", time: "18m ago", unread: true, type: "rescue" },
    { id: 2, text: "Rescuer Karthik has been assigned to MRT-9041 with Ambulance #4", time: "12m ago", unread: true, type: "rescuer" },
    { id: 3, text: "You earned +20 PawPoints for reporting an injured animal!", time: "25m ago", unread: false, type: "pawpoints" },
    { id: 4, text: "Case MRT-7910 status updated: Kite is now Recovering in Adyar aviary.", time: "4h ago", unread: false, type: "vet" }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const addNotification = (text, type = "info") => {
    const newNotif = {
      id: Date.now(),
      text,
      time: "Just now",
      unread: true,
      type
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const switchRole = (roleKey) => {
    const user = INITIAL_USERS[roleKey];
    setCurrentUser(user);
    if (roleKey === 'citizen') setActiveTab('home');
    if (roleKey === 'ngo') setActiveTab('ngo_dash');
    if (roleKey === 'vet') setActiveTab('vet_dash');
    if (roleKey === 'admin') setActiveTab('admin_dash');
    showToast(`Switched to ${user.name} (${user.role.toUpperCase()})`);
  };

  const selectedCase = useMemo(() => {
    return rescueCases.find(c => c.id === selectedCaseId) || rescueCases[0];
  }, [rescueCases, selectedCaseId]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col antialiased">
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-emerald-500/30 animate-bounce">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}


      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm px-4 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-700 to-emerald-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 fill-white" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 flex items-center gap-1.5">
                MARUTI <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold border border-amber-300">RESCUE</span>
              </span>
              <p className="text-[10px] text-slate-700 font-bold tracking-wider uppercase hidden sm:block">
                Animal Welfare & Rapid Rescue Platform
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1 text-sm font-medium">
            <button 
              onClick={() => setActiveTab('home')}
              className={`px-3.5 py-2 rounded-lg transition-colors ${activeTab === 'home' ? 'text-emerald-700 bg-emerald-50 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('report')}
              className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${activeTab === 'report' ? 'text-orange-700 bg-orange-50 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
            >
              <AlertTriangle className="w-4 h-4 text-orange-500" /> Report Animal
            </button>
            <button 
              onClick={() => setActiveTab('track')}
              className={`px-3.5 py-2 rounded-lg transition-colors ${activeTab === 'track' ? 'text-emerald-700 bg-emerald-50 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
            >
              Track Rescue ({rescueCases.length})
            </button>
            <button 
              onClick={() => setActiveTab('ngos')}
              className={`px-3.5 py-2 rounded-lg transition-colors ${activeTab === 'ngos' ? 'text-emerald-700 bg-emerald-50 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
            >
              Nearby NGOs
            </button>
            <button 
              onClick={() => setActiveTab('pawpoints')}
              className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1 ${activeTab === 'pawpoints' ? 'text-amber-700 bg-amber-50 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
            >
              PawPoints 🐾
            </button>
            <button 
              onClick={() => setActiveTab('donate')}
              className={`px-3.5 py-2 rounded-lg transition-colors ${activeTab === 'donate' ? 'text-emerald-700 bg-emerald-50 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
            >
              Donate
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('docs')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300"
            title="View Backend FastAPI & PostgreSQL schema code"
          >
            <Code className="w-3.5 h-3.5" /> Architecture & APIs
          </button>

          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors relative"
              aria-label="View notifications"
            >
              <Bell className="w-5 h-5" />
              {notifications.some(n => n.unread) && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-white ring-2 ring-orange-200"></span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-sm text-slate-800">Notifications</span>
                  </div>
                  <button 
                    onClick={() => setNotifications(notifications.map(n => ({...n, unread: false})))}
                    className="text-xs text-emerald-700 hover:underline font-medium"
                  >
                    Mark all read
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {notifications.map(item => (
                    <div key={item.id} className={`px-4 py-3 hover:bg-slate-50 transition-colors ${item.unread ? 'bg-emerald-50/40' : ''}`}>
                      <p className="text-xs font-medium text-slate-800 leading-snug">{item.text}</p>
                      <div className="flex items-center justify-between mt-1 text-[11px] text-slate-600 font-medium">
                        <span>{item.time}</span>
                        {item.unread && <span className="text-[10px] bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded font-semibold">New</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              className="w-9 h-9 rounded-full object-cover ring-2 ring-emerald-500/30"
            />
            <div className="hidden lg:block text-left">
              <p className="text-xs font-bold text-slate-800 leading-tight">{currentUser.name}</p>
              <div className="flex items-center gap-1">
                <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-wide">{currentUser.role}</span>
                {currentUser.pawPoints !== undefined && (
                  <span className="text-[10px] bg-amber-100 text-amber-800 font-semibold px-1 rounded">🐾 {currentUser.pawPoints}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 pb-16">
        {activeTab === 'home' && (
          <HomeScreen 
            setActiveTab={setActiveTab} 
            rescueCases={rescueCases} 
            setSelectedCaseId={setSelectedCaseId}
            currentUser={currentUser}
            ngosList={ngosList}
          />
        )}

        {activeTab === 'report' && (
          <ReportAnimalWizard 
            currentUser={currentUser}
            ngosList={ngosList}
            onRescueCreated={(newCase) => {
              setRescueCases([newCase, ...rescueCases]);
              setSelectedCaseId(newCase.id);
              setActiveTab('track');
              showToast(`Rescue report ${newCase.id} created! AI prioritized as ${newCase.urgency} Urgency.`);
              addNotification(`Emergency report ${newCase.id} logged. Searching nearby NGOs.`, "alert");
            }}
          />
        )}

        {activeTab === 'track' && (
          <RescueTrackingView 
            cases={rescueCases}
            selectedCase={selectedCase}
            setSelectedCaseId={setSelectedCaseId}
            onAdvanceStatus={(caseId) => {
              setRescueCases(prev => prev.map(c => {
                if (c.id === caseId) {
                  const nextStep = Math.min(c.stepIndex + 1, STATUS_STEPS.length - 1);
                  const updated = {
                    ...c,
                    stepIndex: nextStep,
                    status: STATUS_STEPS[nextStep]
                  };
                  addNotification(`Case ${caseId} advanced to status: "${STATUS_STEPS[nextStep]}"`, "progress");
                  showToast(`Case ${caseId} updated to: ${STATUS_STEPS[nextStep]}`);
                  return updated;
                }
                return c;
              }));
            }}
          />
        )}

        {activeTab === 'ngos' && (
          <NearbyNGOsDirectory 
            ngosList={ngosList} 
            onRequestRescue={(ngo) => {
              showToast(`Rescue request dispatched directly to ${ngo.name}!`);
              addNotification(`Dispatch ping sent to ${ngo.name}`, "ngo");
            }}
          />
        )}

        {activeTab === 'pawpoints' && (
          <PawPointsSection 
            currentUser={currentUser} 
            leaderboard={LEADERBOARD_USERS} 
          />
        )}

        {activeTab === 'donate' && (
          <DonationPortal 
            rescueCases={rescueCases} 
            ngosList={ngosList}
            onSuccess={(amount, recipient) => {
              showToast(`Thank you! ₹${amount} donated successfully to ${recipient}.`);
              addNotification(`Donation receipt generated: ₹${amount} for ${recipient}. +25 PawPoints added!`, "pawpoints");
            }}
          />
        )}

        {activeTab === 'ngo_dash' && (
          <NGODashboard 
            rescueCases={rescueCases}
            setRescueCases={setRescueCases}
            showToast={showToast}
            addNotification={addNotification}
            setSelectedCaseId={setSelectedCaseId}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'vet_dash' && (
          <VeterinarianPortal 
            rescueCases={rescueCases}
            setRescueCases={setRescueCases}
            showToast={showToast}
            addNotification={addNotification}
          />
        )}

        {activeTab === 'admin_dash' && (
          <AdminDashboard 
            rescueCases={rescueCases}
            ngosList={ngosList}
            setNgosList={setNgosList}
            showToast={showToast}
          />
        )}

        {activeTab === 'docs' && (
          <ArchitectureAndDocsView />
        )}
      </main>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-3 py-2 flex justify-around items-center z-50 shadow-lg">
        <button 
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-emerald-700' : 'text-slate-500'}`}
        >
          <Activity className="w-5 h-5" />
          <span className="text-[10px] font-medium">Home</span>
        </button>
        <button 
          onClick={() => setActiveTab('report')}
          className="flex flex-col items-center -mt-5 bg-gradient-to-tr from-orange-600 to-amber-500 text-white p-3 rounded-full shadow-lg border-4 border-white"
        >
          <AlertTriangle className="w-5 h-5" />
          <span className="sr-only">Report</span>
        </button>
        <button 
          onClick={() => setActiveTab('track')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'track' ? 'text-emerald-700' : 'text-slate-500'}`}
        >
          <Navigation className="w-5 h-5" />
          <span className="text-[10px] font-medium">Track</span>
        </button>
        <button 
          onClick={() => setActiveTab('ngos')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'ngos' ? 'text-emerald-700' : 'text-slate-500'}`}
        >
          <Building className="w-5 h-5" />
          <span className="text-[10px] font-medium">NGOs</span>
        </button>
      </div>

      <footer className="bg-slate-900 text-slate-400 text-xs py-8 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-emerald-600 flex items-center justify-center text-white font-bold">M</div>
            <span className="text-white font-bold tracking-tight">MARUTI Platform</span>
            <span>– Built for Animal Care, Protection & Citizen-NGO Rapid Coordination</span>
          </div>
          <p className="text-slate-500">Hackathon Prototype MVP • Emergency Helpline: 1962 (Govt Animal Helpline)</p>
        </div>
      </footer>
    </div>
  );
}

function HomeScreen({ setActiveTab, rescueCases, setSelectedCaseId, currentUser, ngosList }) {
  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-950 to-slate-900 text-white py-16 px-4 lg:px-8">
        <div className="absolute top-0 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            AI-Assisted Immediate Wildlife & Domestic Animal Rescue
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-3xl leading-tight">
            &quot;Every Life Deserves a <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-300">Second Chance.</span>&quot;
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mt-4 font-normal leading-relaxed">
            Report animals in distress. Connect with verified NGOs. Track rescues from street emergency to complete recovery.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-8">
            <button
              onClick={() => setActiveTab('report')}
              className="px-6 py-3.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold rounded-xl shadow-lg hover:shadow-orange-600/30 transition-all flex items-center gap-2.5 transform hover:-translate-y-0.5"
            >
              <AlertTriangle className="w-5 h-5 fill-white/20" />
              Report an Animal in Distress
            </button>
            <button
              onClick={() => setActiveTab('ngos')}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl backdrop-blur-sm border border-white/20 transition-all flex items-center gap-2"
            >
              <Building className="w-4 h-4 text-emerald-400" />
              Find Nearby Verified NGOs
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-white/10">
            <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
              <span className="text-3xl font-extrabold text-emerald-400">1,248+</span>
              <p className="text-xs text-slate-300 font-medium mt-1">Animals Rescued</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
              <span className="text-3xl font-extrabold text-amber-400">14</span>
              <p className="text-xs text-slate-300 font-medium mt-1">Active Rescues Today</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
              <span className="text-3xl font-extrabold text-emerald-300">28</span>
              <p className="text-xs text-slate-300 font-medium mt-1">Verified NGOs & Shelters</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
              <span className="text-3xl font-extrabold text-teal-300">450+</span>
              <p className="text-xs text-slate-300 font-medium mt-1">Active Citizen Rescuers</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">How MARUTI Works</h2>
          <p className="text-slate-600 text-sm mt-2">
            A seamless bridge uniting compassionate citizens, AI triage, ground rescuers, and veterinary hospitals.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { step: "1. Report", desc: "Citizen uploads photo & location", icon: Camera, color: "text-amber-600 bg-amber-50" },
            { step: "2. Detect", desc: "AI assesses urgency & injuries", icon: Sparkles, color: "text-indigo-600 bg-indigo-50" },
            { step: "3. Connect", desc: "Nearest verified NGOs notified", icon: Compass, color: "text-blue-600 bg-blue-50" },
            { step: "4. Rescue", desc: "Field van dispatched with cage", icon: Activity, color: "text-orange-600 bg-orange-50" },
            { step: "5. Track", desc: "Live updates & status timeline", icon: Clock, color: "text-emerald-600 bg-emerald-50" },
            { step: "6. Recover", desc: "Veterinary cure & release/adoption", icon: Heart, color: "text-rose-600 bg-rose-50" },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${item.color}`}>
                <item.icon className="w-6 h-6" />
              </div>
              <span className="font-bold text-sm text-slate-800">{item.step}</span>
              <p className="text-xs text-slate-600 mt-1 leading-snug">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Quick Citizen Actions</h3>
            <p className="text-xs text-slate-600">Logged in as {currentUser.name} ({currentUser.level})</p>
          </div>
          <button 
            onClick={() => setActiveTab('pawpoints')}
            className="text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 flex items-center gap-1.5"
          >
            <span>🐾 Your PawPoints:</span>
            <span className="font-extrabold text-amber-800">{currentUser.pawPoints}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div 
            onClick={() => setActiveTab('report')}
            className="group cursor-pointer bg-gradient-to-br from-orange-500 to-amber-600 text-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all"
          >
            <AlertTriangle className="w-8 h-8 mb-4 opacity-90 group-hover:scale-110 transition-transform" />
            <h4 className="text-lg font-bold">Report Animal</h4>
            <p className="text-xs text-white/80 mt-1">Upload an image and trigger AI urgency detection</p>
            <div className="mt-4 flex items-center text-xs font-bold gap-1">Start Form <ArrowRight className="w-3.5 h-3.5" /></div>
          </div>

          <div 
            onClick={() => setActiveTab('ngos')}
            className="group cursor-pointer bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all hover:border-emerald-400"
          >
            <Building className="w-8 h-8 mb-4 text-emerald-600 group-hover:scale-110 transition-transform" />
            <h4 className="text-lg font-bold text-slate-900">Nearby NGOs</h4>
            <p className="text-xs text-slate-600 mt-1">Find shelters within 5km of your location</p>
            <div className="mt-4 flex items-center text-xs font-bold text-emerald-700 gap-1">View Directory <ArrowRight className="w-3.5 h-3.5" /></div>
          </div>

          <div 
            onClick={() => {
              setSelectedCaseId("MRT-9041");
              setActiveTab('track');
            }}
            className="group cursor-pointer bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all hover:border-blue-400"
          >
            <Activity className="w-8 h-8 mb-4 text-blue-600 group-hover:scale-110 transition-transform" />
            <h4 className="text-lg font-bold text-slate-900">Active Rescue</h4>
            <p className="text-xs text-slate-600 mt-1">Track case MRT-9041 (Injured Dog)</p>
            <div className="mt-4 flex items-center text-xs font-bold text-blue-700 gap-1">Live Timeline <ArrowRight className="w-3.5 h-3.5" /></div>
          </div>

          <div 
            onClick={() => setActiveTab('pawpoints')}
            className="group cursor-pointer bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all hover:border-amber-400"
          >
            <Award className="w-8 h-8 mb-4 text-amber-500 group-hover:scale-110 transition-transform" />
            <h4 className="text-lg font-bold text-slate-900">PawPoints 🐾</h4>
            <p className="text-xs text-slate-600 mt-1">You are ranked #2 on Chennai leaderboard</p>
            <div className="mt-4 flex items-center text-xs font-bold text-amber-700 gap-1">View Rewards <ArrowRight className="w-3.5 h-3.5" /></div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-slate-900">Recent Animal Rescue Reports</h3>
          <button 
            onClick={() => setActiveTab('track')} 
            className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
          >
            View all ({rescueCases.length}) <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rescueCases.slice(0, 3).map((item) => (
            <div 
              key={item.id} 
              onClick={() => {
                setSelectedCaseId(item.id);
                setActiveTab('track');
              }}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col"
            >
              <div className="relative h-48 bg-slate-100">
                <img 
                  src={item.imageUrl} 
                  alt={item.animalType} 
                  className="w-full h-full object-cover"
                />
                <span className={`absolute top-3 left-3 text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md ${
                  item.urgency === 'HIGH' ? 'bg-red-600 text-white' : item.urgency === 'MEDIUM' ? 'bg-amber-500 text-white' : 'bg-emerald-600 text-white'
                }`}>
                  🚨 {item.urgency} Urgency
                </span>
                <span className="absolute bottom-3 right-3 text-[11px] font-semibold bg-slate-900/80 backdrop-blur-md text-white px-2 py-0.5 rounded-md">
                  {item.animalType}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-600 mb-1 font-medium">
                    <span className="font-mono font-bold text-slate-800">{item.id}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {item.reportedAt}</span>
                  </div>
                  <h4 className="font-bold text-base text-slate-900 mt-1 line-clamp-1">
                    {item.condition} {item.animalType}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 flex items-start gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{item.locationName}</span>
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                    ● {item.status}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 flex items-center gap-0.5">
                    Track <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ReportAnimalWizard({ currentUser, ngosList, onRescueCreated }) {
  const [step, setStep] = useState(1);
  const [animalType, setAnimalType] = useState('Dog');
  const [condition, setCondition] = useState('Injured');
  const [description, setDescription] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState(
    "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=600&q=80"
  );
  const [locationName, setLocationName] = useState('SRM University Tech Park Road, Potheri');
  const [coords, setCoords] = useState({ lat: 12.8235, lng: 80.0450 });
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiReport, setAiReport] = useState(null);

  const PRESET_PHOTOS = [
    { label: "Injured Stray Dog", type: "Dog", cond: "Injured", url: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=600&q=80" },
    { label: "Trapped Kitten", type: "Cat", cond: "Trapped", url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80" },
    { label: "Wounded Kite (Bird)", type: "Bird", cond: "Injured", url: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=600&q=80" },
    { label: "Dehydrated Cattle", type: "Cow", cond: "Sick", url: "https://images.unsplash.com/photo-1570042225831-d98fa7577f13?auto=format&fit=crop&w=600&q=80" }
  ];

  const runAiEmergencyAssessment = () => {
    setIsAnalyzing(true);

    setTimeout(() => {
      let urgency = "HIGH";
      let diagnosis = "Suspected severe extremity fracture / bleeding laceration.";
      let recommendation = "Keep animal stationary and warm. Do NOT offer food or water if animal is shock-prone. Keep a 3-meter safety radius.";

      if (condition === 'Sick') {
        urgency = "MEDIUM";
        diagnosis = "Dehydration, lethargy or gastrointestinal distress.";
        recommendation = "Provide shade, clean drinking water in shallow dish, avoid loud sudden noises.";
      } else if (condition === 'Abandoned') {
        urgency = "LOW";
        diagnosis = "Unattended infant animal without maternal support.";
        recommendation = "Check for nearby mother for 30 minutes before moving. Keep in a dry, ventilated box.";
      } else if (condition === 'Trapped') {
        urgency = "HIGH";
        diagnosis = "Ensnared in fence/wire or trapped in open pit.";
        recommendation = "Do not pull forcibly. Rescuer net and heavy cutter required.";
      }

      setAiReport({
        detectedSpecies: animalType,
        confidence: "96.4%",
        detectedCondition: condition,
        urgency: urgency,
        clinicalSummary: diagnosis,
        firstAidTips: recommendation,
        duplicateCheck: "Passed (No duplicate reports within 500m in past 3 hours)",
        nearbyNgoMatches: 3
      });

      setIsAnalyzing(false);
      setStep(4);
    }, 1500);
  };

  const handleFinalSubmit = () => {
    const newCaseId = `MRT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRescue = {
      id: newCaseId,
      animalType,
      condition,
      urgency: aiReport?.urgency || "HIGH",
      reportedAt: "Just now",
      timestamp: Date.now(),
      locationName,
      coords,
      description: description || "Urgent rescue requested via citizen mobile app.",
      imageUrl: selectedPhoto,
      reporterName: currentUser.name,
      reporterPhone: currentUser.phone || "+91 98400 11223",
      status: "Reported",
      stepIndex: 0,
      assignedNgo: "HOPE for Animals Kattankulathur",
      assignedRescuer: "Assigning nearest field vehicle...",
      vetDiagnosis: aiReport?.clinicalSummary || "Awaiting triage",
      treatmentNotes: "Citizen reported. AI assessment broadcasted to emergency responders.",
      recoveryPhotos: [],
      pawPointsAwarded: 20
    };

    onRescueCreated(newRescue);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Report an Animal in Distress</h2>
        <p className="text-slate-600 text-sm mt-1">Our AI triage analyzes severity and notifies the closest animal rescue unit.</p>
        
        <div className="flex items-center justify-center gap-2 mt-6">
          {["Details", "Photo", "Location", "AI Triage"].map((label, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                step > idx + 1 ? 'bg-emerald-600 text-white' : step === idx + 1 ? 'bg-orange-600 text-white shadow-md' : 'bg-slate-200 text-slate-600'
              }`}>
                {step > idx + 1 ? <Check className="w-4 h-4" /> : idx + 1}
              </div>
              <span className={`text-xs font-semibold hidden sm:inline ${step === idx + 1 ? 'text-slate-900' : 'text-slate-600'}`}>
                {label}
              </span>
              {idx < 3 && <div className="w-8 h-0.5 bg-slate-200"></div>}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8">
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2">Animal Species / Type</label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                {["Dog", "Cat", "Bird", "Cow", "Other"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setAnimalType(t)}
                    className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all ${
                      animalType === t 
                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm' 
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2">Primary Condition Observed</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { key: "Injured", label: "Injured / Bleeding 🚨" },
                  { key: "Accident", label: "Hit & Run / Accident 🚗" },
                  { key: "Sick", label: "Sick / Dehydrated 💧" },
                  { key: "Trapped", label: "Trapped / Ensnared 🪢" },
                  { key: "Abandoned", label: "Abandoned Puppy/Kitten 🐾" },
                  { key: "Other", label: "Other Emergency ⚠️" }
                ].map((c) => (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => setCondition(c.key)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border text-left transition-all ${
                      condition === c.key 
                        ? 'bg-orange-600 text-white border-orange-600 shadow-sm' 
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-800 mb-1.5">Description & Specific Landmarks</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="E.g., Indie street dog lying on the sidewalk near SRM Arch gate. Hind leg injured, whimpering, cannot walk..."
                rows={3}
                className="w-full text-sm p-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-800"
              />
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl flex items-center gap-2"
              >
                Next: Add Photo <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Upload or Select Emergency Photo</h3>
              <p className="text-xs text-slate-600">A clear photo helps the AI determine trauma severity and dispatch appropriate gear.</p>
            </div>

            <div className="relative rounded-2xl overflow-hidden border-2 border-dashed border-slate-300 bg-slate-50 aspect-video flex items-center justify-center">
              {selectedPhoto ? (
                <img src={selectedPhoto} alt="Animal preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-6 text-slate-400">
                  <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No photo chosen yet</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Quick Test Samples (Instant Demo):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PRESET_PHOTOS.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSelectedPhoto(p.url);
                      setAnimalType(p.type);
                      setCondition(p.cond);
                    }}
                    className={`p-2 rounded-xl border text-left text-xs transition-all flex flex-col gap-1 ${
                      selectedPhoto === p.url ? 'border-emerald-600 bg-emerald-50 font-bold text-emerald-800' : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="truncate">{p.label}</span>
                    <span className="text-[10px] text-slate-600">({p.type})</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-100"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl flex items-center gap-2"
              >
                Next: Set Location <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Pin Rescue Location</h3>
              <p className="text-xs text-slate-600">Rescuers rely on accurate coordinates to navigate rapidly.</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  setLocationName("SRM Tech Park Road, Potheri, Kattankulathur");
                  setCoords({ lat: 12.8235, lng: 80.0450 });
                }}
                className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Use Current GPS (SRM Campus)
              </button>

              <button
                type="button"
                onClick={() => {
                  setLocationName("Guindy Race Course Road, Chennai");
                  setCoords({ lat: 13.0067, lng: 80.2206 });
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold"
              >
                Guindy, Chennai
              </button>

              <button
                type="button"
                onClick={() => {
                  setLocationName("Besant Nagar Beach Road, Chennai");
                  setCoords({ lat: 12.9980, lng: 80.2660 });
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold"
              >
                Adyar / Besant Nagar
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Street Address or Landmark</label>
              <input
                type="text"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                className="w-full text-sm p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-800"
              />
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-slate-300 bg-slate-100 h-48 flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-60"></div>
              
              <div className="z-10 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-md border border-slate-200 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center animate-bounce">
                  <MapPin className="w-5 h-5 fill-red-600 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">{locationName}</p>
                  <p className="text-[11px] text-slate-600 font-mono">Lat: {coords.lat.toFixed(4)}, Lng: {coords.coords?.lng?.toFixed(4) || coords.lng.toFixed(4)}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-100"
              >
                Back
              </button>
              <button
                type="button"
                onClick={runAiEmergencyAssessment}
                className="px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold rounded-xl flex items-center gap-2 shadow-lg"
              >
                Run AI Urgency Assessment <Sparkles className="w-4 h-4 text-amber-300" />
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            {isAnalyzing ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <h4 className="text-lg font-bold text-slate-800">MARUTI AI Triage Engine Analyzing...</h4>
                <div className="text-xs text-slate-500 space-y-1">
                  <p className="text-emerald-700">✓ Image processed via Vision Classifier</p>
                  <p className="text-emerald-700">✓ Species anatomy & injury severity assessed</p>
                  <p className="text-emerald-700">✓ Cross-referencing nearby active rescue vans</p>
                </div>
              </div>
            ) : aiReport ? (
              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-amber-300" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">AI Emergency Analysis Ready</h4>
                      <p className="text-xs text-slate-400">Model Confidence: {aiReport.confidence}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${
                    aiReport.urgency === 'HIGH' ? 'bg-red-600 text-white' : 'bg-amber-500 text-white'
                  }`}>
                    {aiReport.urgency} Urgency
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <span className="text-[11px] font-bold text-slate-600 uppercase">Identified Condition</span>
                    <p className="text-sm font-bold text-slate-800 mt-1">{aiReport.clinicalSummary}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <span className="text-[11px] font-bold text-slate-600 uppercase">Duplicate Moderation</span>
                    <p className="text-xs font-semibold text-emerald-800 mt-1">{aiReport.duplicateCheck}</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                  <div className="flex items-center gap-2 text-amber-800 font-bold text-xs mb-1">
                    <Info className="w-4 h-4" /> Immediate Citizen First-Aid Protocol:
                  </div>
                  <p className="text-xs text-amber-900 leading-relaxed font-medium">
                    {aiReport.firstAidTips}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-emerald-900">Nearby Verified Rescuers Alerted:</span>
                    <p className="text-xs text-emerald-700">3 NGOs within 4.5km ready to accept dispatch</p>
                  </div>
                  <span className="text-xs font-extrabold bg-emerald-700 text-white px-2.5 py-1 rounded-md">
                    +20 PawPoints on verify
                  </span>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-100"
                  >
                    Edit Details
                  </button>
                  <button
                    type="button"
                    onClick={handleFinalSubmit}
                    className="px-8 py-3.5 bg-gradient-to-r from-emerald-700 to-emerald-600 hover:from-emerald-800 hover:to-emerald-700 text-white font-extrabold rounded-xl shadow-xl flex items-center gap-2"
                  >
                    Confirm & Dispatch Rescue Now <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

function RescueTrackingView({ cases, selectedCase, setSelectedCaseId, onAdvanceStatus }) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Live Rescue Tracking</h2>
          <p className="text-slate-600 text-sm">Real-time status updates from the field, vet clinic, and release coordinator.</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600 uppercase">Select Case:</span>
          <select 
            value={selectedCase.id} 
            onChange={(e) => setSelectedCaseId(e.target.value)}
            aria-label="Select rescue case to track"
            className="text-sm font-bold bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {cases.map(c => (
              <option key={c.id} value={c.id}>
                {c.id} - {c.animalType} ({c.status})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 space-y-6">
          <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-100">
            <img 
              src={selectedCase.imageUrl} 
              alt={selectedCase.animalType} 
              className="w-full h-full object-cover"
            />
            <span className={`absolute top-3 left-3 text-xs font-extrabold px-3 py-1 rounded-full text-white shadow-md ${
              selectedCase.urgency === 'HIGH' ? 'bg-red-600' : 'bg-amber-500'
            }`}>
              🚨 {selectedCase.urgency} PRIORITY
            </span>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
              <span className="font-mono font-bold text-slate-900 text-sm">{selectedCase.id}</span>
              <span>Reported: {selectedCase.reportedAt}</span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mt-1">
              {selectedCase.condition} {selectedCase.animalType}
            </h3>
            <p className="text-xs text-slate-600 mt-2 flex items-start gap-1.5">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>{selectedCase.locationName}</span>
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-100 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-600 font-medium">Assigned NGO:</span>
              <span className="font-bold text-slate-800">{selectedCase.assignedNgo}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 font-medium">Field Rescuer:</span>
              <span className="font-bold text-emerald-700">{selectedCase.assignedRescuer}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 font-medium">Citizen Reporter:</span>
              <span className="font-bold text-slate-800">{selectedCase.reporterName}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={() => onAdvanceStatus(selectedCase.id)}
              disabled={selectedCase.stepIndex >= STATUS_STEPS.length - 1}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" /> 
              {selectedCase.stepIndex >= STATUS_STEPS.length - 1 ? 'Case Completed & Closed' : 'Simulate Next Stage (Demo Action)'}
            </button>
            <p className="text-[10px] text-slate-600 text-center mt-2">
              Advance through the 8 stages of the rescue workflow.
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-600" /> Rescue Lifecycle Timeline
            </h3>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
              Current: {selectedCase.status}
            </span>
          </div>

          <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {STATUS_STEPS.map((stepName, idx) => {
              const isDone = idx < selectedCase.stepIndex;
              const isCurrent = idx === selectedCase.stepIndex;
              const isPending = idx > selectedCase.stepIndex;

              return (
                <div key={idx} className="relative flex items-start gap-4">
                  <div className={`absolute -left-6 sm:-left-8 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-transform ${
                    isDone 
                      ? 'bg-emerald-600 text-white ring-4 ring-emerald-100' 
                      : isCurrent 
                      ? 'bg-orange-600 text-white ring-4 ring-orange-100 scale-110' 
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {isDone ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : idx + 1}
                  </div>

                  <div className={`flex-1 p-4 rounded-2xl border transition-all ${
                    isCurrent 
                      ? 'bg-orange-50/60 border-orange-200 shadow-sm' 
                      : isDone 
                      ? 'bg-slate-50 border-slate-200' 
                      : 'bg-transparent border-dashed border-slate-200 opacity-60'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-bold ${isCurrent ? 'text-orange-950' : 'text-slate-800'}`}>
                        {stepName}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] font-extrabold uppercase tracking-wide bg-orange-600 text-white px-2 py-0.5 rounded">
                          In Progress
                        </span>
                      )}
                    </div>

                    {idx === 0 && (
                      <p className="text-xs text-slate-600 mt-1">
                        Report generated by {selectedCase.reporterName}. AI Vision urgency analysis logged.
                      </p>
                    )}
                    {idx === 2 && (
                      <p className="text-xs text-slate-600 mt-1">
                        {selectedCase.assignedNgo} confirmed case intake.
                      </p>
                    )}
                    {idx === 3 && (
                      <p className="text-xs text-slate-600 mt-1">
                        Rescuer {selectedCase.assignedRescuer} en route with first aid kit and ambulance.
                      </p>
                    )}
                    {idx === 5 && (
                      <div className="mt-2 p-2.5 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
                        <span className="font-bold text-teal-800">Veterinary Clinical Triage:</span>
                        <p className="text-slate-700">{selectedCase.vetDiagnosis}</p>
                        <p className="text-slate-600 font-mono text-[11px]">{selectedCase.treatmentNotes}</p>
                      </div>
                    )}
                    {idx === 6 && selectedCase.recoveryPhotos.length > 0 && (
                      <div className="mt-2 flex items-center gap-2">
                        {selectedCase.recoveryPhotos.map((url, i) => (
                          <img key={i} src={url} alt="Recovery" className="w-16 h-16 rounded-xl object-cover border border-slate-300" />
                        ))}
                        <span className="text-[11px] text-emerald-800 font-semibold">Post-treatment recovery photo uploaded</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function NearbyNGOsDirectory({ ngosList, onRequestRescue }) {
  const [filterType, setFilterType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNgos = useMemo(() => {
    return ngosList.filter(ngo => {
      const matchSearch = ngo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ngo.address.toLowerCase().includes(searchQuery.toLowerCase());
      const matchType = filterType === 'All' || ngo.animals.includes(filterType);
      return matchSearch && matchType;
    });
  }, [ngosList, searchQuery, filterType]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Verified NGO Rescuers & Shelters</h2>
        <p className="text-slate-600 text-sm">Nearby animal welfare organizations equipped with ambulance vans and emergency shelters.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input 
            type="text"
            placeholder="Search by shelter name or locality..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
          {["All", "Dogs", "Cats", "Birds", "Cows"].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                filterType === type ? 'bg-emerald-700 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-4">
          {filteredNgos.map(ngo => (
            <div 
              key={ngo.id} 
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900 text-base">{ngo.name}</h3>
                  {ngo.verified && (
                    <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{ngo.address} • <strong className="text-slate-800 font-semibold">{ngo.distanceKm} km away</strong></span>
                </p>

                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {ngo.animals.map((a, i) => (
                    <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                      {a}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-600 pt-1 font-medium">
                  <span className="flex items-center gap-1 text-amber-600 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {ngo.rating}
                  </span>
                  <span>({ngo.reviewsCount} rescues)</span>
                  <span className={ngo.available ? "text-emerald-700 font-semibold" : "text-slate-600"}>
                    ● {ngo.available ? "Ready for Dispatch" : "Busy"}
                  </span>
                </div>
              </div>

              <div className="flex sm:flex-col gap-2 shrink-0">
                <button
                  onClick={() => onRequestRescue(ngo)}
                  className="flex-1 px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" /> Request Rescue
                </button>
                <a
                  href={`tel:${ngo.phone}`}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" /> Call Hotline
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-4 shadow-sm h-[500px] flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-slate-800">Chennai & SRM Corridor Map</span>
            </div>
            <span className="text-[11px] text-slate-600 font-medium">5 Verified Centers</span>
          </div>

          <div className="flex-1 relative mt-3 rounded-2xl bg-slate-100 overflow-hidden border border-slate-200 flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:20px_20px] opacity-40"></div>
            
            <div className="absolute top-1/4 left-1/3 group cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg border-2 border-white ring-2 ring-emerald-300">
                <Building className="w-4 h-4" />
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 bottom-9 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md whitespace-nowrap">
                Blue Cross Guindy (1.4 km)
              </div>
            </div>

            <div className="absolute bottom-1/3 left-1/2 group cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center shadow-lg border-2 border-white ring-2 ring-orange-300">
                <Building className="w-4 h-4" />
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 bottom-9 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md whitespace-nowrap">
                HOPE SRM Campus (0.9 km)
              </div>
            </div>

            <div className="absolute top-1/2 right-1/4 group cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg border-2 border-white ring-2 ring-blue-300">
                <Building className="w-4 h-4" />
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 bottom-9 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md whitespace-nowrap">
                BMAD Adyar (4.1 km)
              </div>
            </div>

            <div className="absolute bottom-10 left-10 bg-white/90 backdrop-blur-sm p-2 rounded-xl border border-slate-300 flex items-center gap-2 shadow-md">
              <span className="w-3 h-3 rounded-full bg-blue-500 animate-ping"></span>
              <span className="text-[11px] font-bold text-slate-800">Your Current Location</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PawPointsSection({ currentUser, leaderboard }) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">PawPoints™ Rewards & Community</h2>
        <p className="text-slate-600 text-sm">Earn verified points for rescue reports, fostering, volunteering, and donor support.</p>
      </div>

      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-orange-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner">
              🐾
            </div>
            <div>
              <span className="text-xs font-extrabold tracking-wider uppercase text-amber-200">Current Tier Level</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold">{currentUser.level || "Paw Guardian"}</h3>
              <p className="text-xs text-white/80 mt-0.5">340 points accrued • 160 points to reach Paw Champion 🏆</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 min-w-[220px]">
            <div className="flex justify-between text-xs font-bold mb-1.5">
              <span>Next Milestone</span>
              <span>68%</span>
            </div>
            <div className="w-full h-3 bg-black/20 rounded-full overflow-hidden p-0.5">
              <div className="h-full bg-white rounded-full w-2/3 transition-all"></div>
            </div>
            <p className="text-[11px] text-amber-100 mt-2 text-center font-medium">Ranked #2 in Chennai SRM District</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { points: "+20", title: "Report Animal", desc: "For verified distress submission", icon: "📸" },
          { points: "+50", title: "Field Volunteer", desc: "Assist rescuer on the ground", icon: "🤝" },
          { points: "+100", title: "Successful Rescue", desc: "When animal reaches clinic", icon: "🚑" },
          { points: "+10", title: "Every ₹100 Donated", desc: "To medicine & animal food pool", icon: "❤️" }
        ].map((rule, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
            <span className="text-2xl">{rule.icon}</span>
            <div className="text-xl font-extrabold text-amber-700 mt-2">{rule.points}</div>
            <h4 className="font-bold text-slate-900 text-sm mt-0.5">{rule.title}</h4>
            <p className="text-xs text-slate-600 mt-1 leading-snug">{rule.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-base text-slate-900">Tamil Nadu Community Leaderboard</h3>
          </div>
          <span className="text-xs font-medium text-slate-600">Updated every 15 mins</span>
        </div>

        <div className="divide-y divide-slate-100">
          {leaderboard.map(user => (
            <div key={user.rank} className={`p-4 sm:px-6 flex items-center justify-between hover:bg-slate-50 transition-colors ${
              user.name.includes("You") ? "bg-amber-50/50" : ""
            }`}>
              <div className="flex items-center gap-4">
                <span className="w-6 text-center font-extrabold text-sm text-slate-600">{user.rank}</span>
                <span className="text-lg">{user.badge}</span>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{user.name}</h4>
                  <p className="text-xs text-slate-600">{user.level} • {user.rescues} verified rescues</p>
                </div>
              </div>

              <div className="text-right">
                <span className="font-extrabold text-base text-amber-700">{user.points}</span>
                <span className="text-xs text-slate-600 block">PawPoints</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DonationPortal({ rescueCases, ngosList, onSuccess }) {
  const [selectedAmount, setSelectedAmount] = useState(250);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState('HOPE for Animals Kattankulathur');
  const [donorName, setDonorName] = useState('Aravind Sharma');
  const [donorEmail, setDonorEmail] = useState('aravind@srmuniv.edu.in');
  const [isProcessing, setIsProcessing] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const effectiveAmount = customAmount ? parseFloat(customAmount) : selectedAmount;

  const handleDonate = () => {
    if (!effectiveAmount || effectiveAmount < 10) return;
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const newReceipt = {
        txId: `RZP-TEST-${Math.floor(100000 + Math.random() * 900000)}`,
        amount: effectiveAmount,
        recipient: selectedRecipient,
        date: new Date().toLocaleDateString(),
        taxExemption: "80G Certified Animal Welfare Trust"
      };
      setReceipt(newReceipt);
      onSuccess(effectiveAmount, selectedRecipient);
    }, 1200);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center max-w-xl mx-auto">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Direct Rescue & Medical Aid Fund</h2>
        <p className="text-slate-600 text-sm mt-1">100% of your tax-deductible contribution goes towards emergency animal surgery, food, and rescue fuel.</p>
      </div>

      {receipt ? (
        <div className="bg-white rounded-3xl border border-emerald-200 shadow-xl p-8 text-center space-y-6 animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700">Payment Successful (Test Sandbox)</span>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">₹{receipt.amount} Contributed</h3>
            <p className="text-xs text-slate-500 mt-1">Receipt Ref: <span className="font-mono font-bold text-slate-800">{receipt.txId}</span></p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl text-left text-xs space-y-2 border border-slate-200">
            <div className="flex justify-between">
              <span className="text-slate-500">Dedicated To:</span>
              <span className="font-bold text-slate-800">{receipt.recipient}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Date:</span>
              <span className="font-semibold text-slate-800">{receipt.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Tax Benefit:</span>
              <span className="font-bold text-emerald-700">{receipt.taxExemption}</span>
            </div>
          </div>

          <button
            onClick={() => setReceipt(null)}
            className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800"
          >
            Make Another Donation
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Select Donation Amount (INR)</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[100, 250, 500, 1000].map(amt => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => { setSelectedAmount(amt); setCustomAmount(''); }}
                  className={`py-3 rounded-xl font-extrabold text-sm border transition-all ${
                    selectedAmount === amt && !customAmount
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>

            <div className="mt-3">
              <input
                type="number"
                placeholder="Or enter custom amount in ₹"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="w-full text-sm p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Dedicate Contribution To:</label>
            <select
              value={selectedRecipient}
              onChange={(e) => setSelectedRecipient(e.target.value)}
              aria-label="Select NGO or rescue case for donation"
              className="w-full text-sm p-3 rounded-xl border border-slate-300 bg-white font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <optgroup label="Nearby NGOs">
                {ngosList.map(n => (
                  <option key={n.id} value={n.name}>{n.name}</option>
                ))}
              </optgroup>
              <optgroup label="Critical Active Cases">
                {rescueCases.map(c => (
                  <option key={c.id} value={`Case ${c.id} (${c.animalType} - ${c.condition})`}>
                    Case {c.id} ({c.animalType} - {c.condition})
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Donor Full Name</label>
              <input
                type="text"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                className="w-full text-sm p-3 rounded-xl border border-slate-300 text-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email (For 80G Receipt)</label>
              <input
                type="email"
                value={donorEmail}
                onChange={(e) => setDonorEmail(e.target.value)}
                className="w-full text-sm p-3 rounded-xl border border-slate-300 text-slate-800"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-3">
            <Shield className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Secure 256-bit test payment simulation. No actual credit card charge in demo mode.</span>
          </div>

          <button
            type="button"
            disabled={isProcessing}
            onClick={handleDonate}
            className="w-full py-4 bg-gradient-to-r from-emerald-700 to-emerald-600 hover:from-emerald-800 hover:to-emerald-700 text-white font-extrabold rounded-2xl shadow-lg flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <>Donate ₹{effectiveAmount || 0} via Razorpay Test Flow</>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

function NGODashboard({ rescueCases, setRescueCases, showToast, addNotification, setSelectedCaseId, setActiveTab }) {
  const [filter, setFilter] = useState('All');
  const [activeModalCase, setActiveModalCase] = useState(null);
  const [fieldRescuerName, setFieldRescuerName] = useState('Karthik (Ambulance #4)');
  const [statusNote, setStatusNote] = useState('');

  const filtered = useMemo(() => {
    if (filter === 'High Priority') return rescueCases.filter(c => c.urgency === 'HIGH');
    if (filter === 'Pending') return rescueCases.filter(c => c.status === 'Reported' || c.status === 'NGO Notified');
    if (filter === 'Accepted') return rescueCases.filter(c => c.status === 'Rescue Accepted' || c.status === 'Rescuer Assigned');
    if (filter === 'Completed') return rescueCases.filter(c => c.status === 'Case Closed');
    return rescueCases;
  }, [rescueCases, filter]);

  const acceptRescue = (caseItem) => {
    setRescueCases(prev => prev.map(c => {
      if (c.id === caseItem.id) {
        return { ...c, status: "Rescue Accepted", stepIndex: 2 };
      }
      return c;
    }));
    showToast(`Rescue accepted for ${caseItem.id}!`);
    addNotification(`NGO accepted rescue case ${caseItem.id}`, "rescue");
  };

  const assignRescuerAction = (caseItem) => {
    setRescueCases(prev => prev.map(c => {
      if (c.id === caseItem.id) {
        return { 
          ...c, 
          status: "Rescuer Assigned", 
          stepIndex: 3, 
          assignedRescuer: fieldRescuerName,
          treatmentNotes: statusNote || c.treatmentNotes
        };
      }
      return c;
    }));
    setActiveModalCase(null);
    showToast(`Assigned ${fieldRescuerName} to ${caseItem.id}`);
    addNotification(`Rescuer ${fieldRescuerName} assigned to ${caseItem.id}`, "rescuer");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">Field Operations Console</span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">NGO Rescuer Dashboard</h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm text-center">
            <span className="text-xs text-slate-500 font-medium">Pending Requests</span>
            <p className="text-lg font-extrabold text-orange-600">
              {rescueCases.filter(c => c.stepIndex < 2).length}
            </p>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm text-center">
            <span className="text-xs text-slate-500 font-medium">Active Field Vans</span>
            <p className="text-lg font-extrabold text-emerald-600">4</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {["All", "High Priority", "Pending", "Accepted", "Completed"].map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === tab ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map(item => (
          <div key={item.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <img src={item.imageUrl} alt="Animal" className="w-16 h-16 rounded-xl object-cover border border-slate-200" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-slate-900">{item.id}</span>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                      item.urgency === 'HIGH' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {item.urgency}
                    </span>
                  </div>
                  <h4 className="font-bold text-base text-slate-900 mt-0.5">{item.condition} {item.animalType}</h4>
                  <p className="text-xs text-slate-500">{item.reportedAt}</p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                {item.status}
              </span>
            </div>

            <p className="text-xs text-slate-700 line-clamp-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              {item.description}
            </p>

            <div className="text-xs text-slate-600 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="truncate">{item.locationName}</span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => {
                  setSelectedCaseId(item.id);
                  setActiveTab('track');
                }}
                className="text-xs font-bold text-slate-700 hover:underline flex items-center gap-1"
              >
                Track Journey <ChevronRight className="w-3 h-3" />
              </button>

              <div className="flex items-center gap-2">
                {item.stepIndex < 2 && (
                  <button
                    onClick={() => acceptRescue(item)}
                    className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold"
                  >
                    Accept Case
                  </button>
                )}

                <button
                  onClick={() => setActiveModalCase(item)}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold"
                >
                  Manage / Assign
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {activeModalCase && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-lg text-slate-900">Manage Case: {activeModalCase.id}</h3>
              <button onClick={() => setActiveModalCase(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Assign Field Van / Driver</label>
                <input 
                  type="text"
                  value={fieldRescuerName}
                  onChange={(e) => setFieldRescuerName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Field Update Notes</label>
                <textarea
                  rows={2}
                  placeholder="E.g., Ambulance dispatched, ETA 10 minutes..."
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button 
                onClick={() => setActiveModalCase(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button 
                onClick={() => assignRescuerAction(activeModalCase)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-700 text-white hover:bg-emerald-800"
              >
                Save & Update Case
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function VeterinarianPortal({ rescueCases, setRescueCases, showToast, addNotification }) {
  const [selectedCase, setSelectedCase] = useState(rescueCases[1] || rescueCases[0]);
  const [diagnosis, setDiagnosis] = useState(selectedCase?.vetDiagnosis || '');
  const [treatment, setTreatment] = useState(selectedCase?.treatmentNotes || '');

  const saveMedicalRecord = () => {
    setRescueCases(prev => prev.map(c => {
      if (c.id === selectedCase.id) {
        return {
          ...c,
          vetDiagnosis: diagnosis,
          treatmentNotes: treatment,
          status: "Under Treatment",
          stepIndex: Math.max(c.stepIndex, 5)
        };
      }
      return c;
    }));
    showToast(`Medical chart saved for ${selectedCase.id}`);
    addNotification(`Vet updated diagnosis on case ${selectedCase.id}`, "vet");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div>
        <span className="text-xs font-bold text-teal-700 uppercase tracking-wide">Clinical Trauma Desk</span>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Veterinary Medical Portal</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-4 shadow-sm space-y-3">
          <h3 className="font-bold text-sm text-slate-800 px-2">Assigned Clinic Patients</h3>
          <div className="space-y-2">
            {rescueCases.map(c => (
              <div 
                key={c.id} 
                onClick={() => {
                  setSelectedCase(c);
                  setDiagnosis(c.vetDiagnosis);
                  setTreatment(c.treatmentNotes);
                }}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  selectedCase.id === c.id ? 'bg-teal-50 border-teal-500 shadow-sm' : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex justify-between text-xs font-bold">
                  <span>{c.id} - {c.animalType}</span>
                  <span className="text-teal-700">{c.status}</span>
                </div>
                <p className="text-xs text-slate-500 truncate mt-1">{c.condition}: {c.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-teal-700">{selectedCase.id}</span>
              <h3 className="text-xl font-bold text-slate-900">{selectedCase.condition} {selectedCase.animalType}</h3>
            </div>
            <img src={selectedCase.imageUrl} alt="Animal" className="w-14 h-14 rounded-xl object-cover border border-slate-200" />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Clinical Diagnosis & Trauma Findings</label>
              <textarea
                rows={3}
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                placeholder="E.g., Closed transverse fracture of left tibia. Mild shock and dehydration."
                className="w-full text-sm p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Administered Medications & Treatment Plan</label>
              <textarea
                rows={3}
                value={treatment}
                onChange={(e) => setTreatment(e.target.value)}
                placeholder="E.g., Meloxicam 0.2mg/kg SQ, Ceftriaxone IV, fiberglass splint applied."
                className="w-full text-sm p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 text-slate-800"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <span className="text-xs text-slate-500">Updates sync immediately with Citizen Tracking Timeline</span>
            <button
              onClick={saveMedicalRecord}
              className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm"
            >
              <Check className="w-4 h-4" /> Save Clinical Record
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard({ rescueCases, ngosList, setNgosList, showToast }) {
  const toggleNgoVerification = (id) => {
    setNgosList(prev => prev.map(n => {
      if (n.id === id) {
        const nextState = !n.verified;
        showToast(`${n.name} verification status: ${nextState ? 'VERIFIED' : 'PENDING'}`);
        return { ...n, verified: nextState };
      }
      return n;
    }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div>
        <span className="text-xs font-bold text-indigo-700 uppercase tracking-wide">State Animal Welfare Board Oversight</span>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Admin Operations & Analytics</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Total Registered Users</span>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">1,842</p>
          <span className="text-[11px] text-emerald-600 font-semibold">↑ 12% this month</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Rescue Success Rate</span>
          <p className="text-2xl font-extrabold text-emerald-600 mt-1">94.2%</p>
          <span className="text-[11px] text-slate-400">1,248 resolved</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Total Donations (Q3)</span>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">₹4,25,800</p>
          <span className="text-[11px] text-emerald-600 font-semibold">Audited 80G pool</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Duplicate Moderation</span>
          <p className="text-2xl font-extrabold text-indigo-600 mt-1">99.1%</p>
          <span className="text-[11px] text-slate-400">AI spam filter</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" /> Rescues by Animal Species (Current Month)
          </h3>
          <div className="space-y-3 pt-2">
            {[
              { species: "Dogs (Indie & Abandoned)", count: 74, pct: "65%", color: "bg-emerald-600" },
              { species: "Cats & Kittens", count: 28, pct: "25%", color: "bg-amber-500" },
              { species: "Cattle / Cows", count: 18, pct: "16%", color: "bg-blue-600" },
              { species: "Birds / Avian Kites", count: 12, pct: "10%", color: "bg-rose-500" }
            ].map(row => (
              <div key={row.species} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>{row.species}</span>
                  <span>{row.count} ({row.pct})</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${row.color}`} style={{ width: row.pct }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <Shield className="w-4 h-4 text-indigo-600" /> NGO Verification Queue
          </h3>
          <div className="space-y-3">
            {ngosList.map(ngo => (
              <div key={ngo.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                <div>
                  <h4 className="font-bold text-xs text-slate-900">{ngo.name}</h4>
                  <p className="text-[11px] text-slate-500">{ngo.address}</p>
                </div>
                <button
                  onClick={() => toggleNgoVerification(ngo.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                    ngo.verified 
                      ? 'bg-emerald-100 text-emerald-800 hover:bg-red-100 hover:text-red-800' 
                      : 'bg-amber-500 text-white hover:bg-amber-600'
                  }`}
                >
                  {ngo.verified ? '✓ Verified' : 'Review & Approve'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ArchitectureAndDocsView() {
  const [activeCodeTab, setActiveCodeTab] = useState('fastapi');
  const [copied, setCopied] = useState(false);

  const CODE_SNIPPETS = {
    fastapi: `# ==========================================================
# MARUTI PLATFORM - BACKEND REST API (FastAPI + JWT + AI Service)
# File: backend/app/main.py
# ==========================================================
from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import uuid, os

from app.database import get_db, engine, Base
from app.models import User, RescueCase, NGO, Notification, PawPoints
from app.schemas import RescueCreate, RescueResponse, UrgencyAssessment
from app.services.ai_service import AIService
from app.auth.jwt_handler import get_current_user

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="MARUTI Animal Rescue & Welfare Platform API",
    version="1.0.0",
    docs_url="/docs"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# AI Urgency Detection Route
@app.post("/api/v1/ai/assess-urgency", response_model=UrgencyAssessment)
async def assess_animal_urgency(
    file: UploadFile = File(...),
    animal_type: str = "Dog",
    condition: str = "Injured",
    db: Session = Depends(get_db)
):
    """
    Analyzes animal trauma photo using Computer Vision / LLM Vision
    and returns urgency score, medical triage recommendation, and duplicate check.
    """
    contents = await file.read()
    ai_result = AIService.analyze_emergency(
        image_bytes=contents, 
        species=animal_type, 
        condition=condition
    )
    return ai_result

# Create Rescue Case
@app.post("/api/v1/rescues", response_model=RescueResponse)
def create_rescue_case(
    payload: RescueCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    new_case = RescueCase(
        id=f"MRT-{uuid.uuid4().hex[:4].upper()}",
        animal_type=payload.animal_type,
        condition=payload.condition,
        urgency=payload.urgency,
        description=payload.description,
        latitude=payload.latitude,
        longitude=payload.longitude,
        location_name=payload.location_name,
        reporter_id=current_user.id,
        status="Reported"
    )
    db.add(new_case)
    
    # Award +20 PawPoints to citizen reporter
    current_user.paw_points += 20
    db.commit()
    db.refresh(new_case)
    return new_case
`,
    postgres: `-- ==========================================================
-- MARUTI PLATFORM - POSTGRESQL DATABASE SCHEMA (DDL)
-- ==========================================================

CREATE TABLE users (
    id VARCHAR(50) PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('citizen', 'ngo', 'vet', 'admin')),
    phone VARCHAR(20),
    paw_points INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ngos (
    id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) REFERENCES users(id),
    name VARCHAR(150) NOT NULL,
    address TEXT NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    rating NUMERIC(2,1) DEFAULT 5.0,
    phone VARCHAR(30) NOT NULL
);

CREATE TABLE rescue_cases (
    id VARCHAR(50) PRIMARY KEY,
    animal_type VARCHAR(50) NOT NULL,
    condition VARCHAR(50) NOT NULL,
    urgency VARCHAR(20) NOT NULL CHECK (urgency IN ('LOW', 'MEDIUM', 'HIGH')),
    description TEXT,
    image_url TEXT,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    location_name VARCHAR(255),
    reporter_id VARCHAR(50) REFERENCES users(id),
    assigned_ngo_id VARCHAR(50) REFERENCES ngos(id),
    assigned_rescuer VARCHAR(100),
    vet_diagnosis TEXT,
    treatment_notes TEXT,
    status VARCHAR(50) DEFAULT 'Reported' 
      CHECK (status IN (
        'Reported', 'NGO Notified', 'Rescue Accepted', 
        'Rescuer Assigned', 'Animal Rescued', 
        'Under Treatment', 'Recovering', 'Case Closed'
      )),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE donations (
    id VARCHAR(50) PRIMARY KEY,
    donor_id VARCHAR(50) REFERENCES users(id),
    amount NUMERIC(10, 2) NOT NULL,
    ngo_id VARCHAR(50) REFERENCES ngos(id),
    rescue_case_id VARCHAR(50) REFERENCES rescue_cases(id),
    razorpay_payment_id VARCHAR(100),
    status VARCHAR(30) DEFAULT 'success',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
`,
    env: `# ==========================================================
# MARUTI PLATFORM - .env.example
# ==========================================================

# Application Settings
PROJECT_NAME="MARUTI Animal Welfare & Rescue Platform"
ENVIRONMENT="production"
PORT=8000

# PostgreSQL Database Connection
DATABASE_URL="postgresql://postgres:maruti_secure_pw@localhost:5432/maruti_db"

# JWT Authentication
SECRET_KEY="generate-random-secret-key-here-minimum-32-chars"
ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=1440

# AI Service (Optional - falls back to built-in triage rule engine if blank)
OPENAI_API_KEY=""
GOOGLE_GEMINI_API_KEY=""

# Razorpay Test / Sandbox Keys
RAZORPAY_KEY_ID="rzp_test_YourSandboxKeyHere"
RAZORPAY_KEY_SECRET="YourSandboxSecretKeyHere"

# OpenStreetMap / Leaflet Tile CDN
MAPS_TILE_PROVIDER="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(CODE_SNIPPETS[activeCodeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">System Architecture & Backend Code</h2>
          <p className="text-slate-600 text-sm">Full production-ready backend specification for FastAPI, PostgreSQL, and Environment config.</p>
        </div>

        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Copied to Clipboard!" : "Copy Code Snippet"}
        </button>
      </div>

      <div className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
        <div className="flex items-center gap-2 p-3 bg-slate-950 border-b border-slate-800">
          <button
            onClick={() => setActiveCodeTab('fastapi')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeCodeTab === 'fastapi' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            main.py (FastAPI)
          </button>
          <button
            onClick={() => setActiveCodeTab('postgres')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeCodeTab === 'postgres' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            schema.sql (PostgreSQL)
          </button>
          <button
            onClick={() => setActiveCodeTab('env')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeCodeTab === 'env' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            .env.example
          </button>
        </div>

        <pre className="p-6 text-xs text-emerald-300 font-mono overflow-x-auto max-h-[500px]">
          <code>{CODE_SNIPPETS[activeCodeTab]}</code>
        </pre>
      </div>
    </div>
  );
}
