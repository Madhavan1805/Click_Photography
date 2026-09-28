import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Phone, MapPin, Instagram, Image as ImageIcon, MessageCircle, Heart, Video, User, KeyRound, Star, SlidersHorizontal, Calendar, Baby, Film, PlayCircle, ChevronDown, ChevronLeft, Sun, Moon, X, Sparkles, CheckSquare, Square, Volume2, VolumeX, Mic, Send, ShieldCheck, CheckCircle2, HeartCrack } from 'lucide-react';

const content = {
  en: {
    tagline: "Crafting Visual Legacies.",
    desc: "A premium photography studio capturing your fleeting moments and turning them into timeless art.",
    portfolio: "Filterable Gallery",
    book: "Book Shoot",
    aboutTitle: "The Art of Storytelling",
    aboutDesc: "CLICK Photography brings a fresh, modern, and highly creative perspective to visual storytelling. Founded by Guna, our passionate team has successfully captured a wide array of high-end events.",
    events: "Events", weddings: "Weddings", clients: "Happy Clients",
    colorGrading: "Signature Color Grading",
    focusTitle: "Customized Service Planner",
    focusSub: "Select requirements to tailor your creative coverage:",
    expertise: "Our Expertise",
    availability: "Check Availability",
    love: "Client Love",
    faqTitle: "Frequently Asked Questions",
    contactTitle: "Book Your Shoot",
    studio: "Studio HQ",
    send: "Book to WhatsApp",
    portal: "Client Portal",
    free: "Free", booked: "Booked"
  },
  ta: {
    tagline: "நினைவுகளைக் காவியமாய் மாற்றுவோம்.",
    desc: "உங்கள் அழகான தருணங்களை என்றென்றும் நிலைத்திருக்கும் கலையாக மாற்றும் பிரீமியம் ஸ்டுடியோ.",
    portfolio: "போர்ட்ஃபோலியோ கேலரி",
    book: "புக்கிங் செய்ய",
    aboutTitle: "கதை சொல்லும் கலை",
    aboutDesc: "குணா அவர்களால் தொடங்கப்பட்ட கிளிக் போட்டோகிராபி நவீன மற்றும் கலைநயமிக்க முறையில் உங்கள் நிகழ்வுகளைப் பதிவு செய்கிறது.",
    events: "நிகழ்வுகள்", weddings: "திருமணங்கள்", clients: "மகிழ்ச்சியான வாடிக்கையாளர்கள்",
    colorGrading: "கலர் கிரேடிங் மேஜிக்",
    focusTitle: "சேவை திட்டமிடல்",
    focusSub: "உங்கள் நிகழ்வுக்குத் தேவையான சிறப்புச் சேவைகளைத் தேர்ந்தெடுக்கவும்:",
    expertise: "எங்கள் சேவைகள்",
    availability: "தேதிகளைச் சரிபார்க்க",
    love: "வாடிக்கையாளர் மதிப்புரைகள்",
    faqTitle: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
    contactTitle: "உங்கள் ஷூட்டை முன்பதிவு செய்யுங்கள்",
    studio: "ஸ்டுடியோ முகவரி",
    send: "Book to WhatsApp",
    portal: "வாடிக்கையாளர் பகுதி",
    free: "காலியாக உள்ளது", booked: "புதிய முன்பதிவு"
  }
};

const services = [
  { name: "Wedding", desc: "Cinematic, emotional storytelling.", folder: "wedding", icon: <Camera size={38} color="#FFD60A"/> },
  { name: "Pre Wedding", desc: "Luxury couple lifestyle shoots.", folder: "prewedding", icon: <Heart size={38} color="#FFD60A"/> },
  { name: "Baby Shower", desc: "Cute newborn & expecting moments.", folder: "babyshower", icon: <Baby size={38} color="#FFD60A"/> },
  { name: "Kids Shoot", desc: "Fun & joyful kids portraits.", folder: "kidsshoot", icon: <Film size={38} color="#FFD60A"/> },
  { name: "Model Shoot", desc: "High-end contemporary campaigns.", folder: "dodelshoot", icon: <Video size={38} color="#FFD60A"/> },
  { name: "Photo Album", desc: "Italian crafted premium albums.", folder: "album", icon: <ImageIcon size={38} color="#FFD60A"/> },
  { name: "Custom Event", desc: "Share your own creative ideas & plan.", folder: "custom", icon: <Sparkles size={38} color="#FFD60A"/> }
];

const curatedImages = {
  wedding: ["/images/wed.jpeg", "/images/wed1.jpeg", "/images/wed2.jpeg", "/images/wed3.png", "/images/wed4.jpg", "/images/wed5.jpg"],
  prewedding: ["/images/prewed1.jpg", "/images/prewed2.jpg", "/images/prewed3.jpg", "/images/prewed4.jpg", "/images/prewed5.jpg"],
  babyshower: ["/images/baby1.jpg", "/images/baby2.jpeg", "/images/baby3.jpg", "/images/baby4.jpg", "/images/baby5.jpg", "/images/baby6.jpg"],
  kidsshoot: ["/images/kids1.jpeg", "/images/kids2.jpeg", "/images/kids3.jpeg", "/images/kids4.jpeg", "/images/kids5.jpeg", "/images/kids6.jpg"],
  modelshoot: ["/images/modern1.jpg", "/images/modern2.jpg", "/images/modern3.jpg", "/images/modern4.jpg", "/images/modern5.jpg", "/images/modern6.jpg"],
  album: ["/images/albam1.jpeg", "/images/albam2.jpeg", "/images/albam3.jpeg", "/images/albam4.jpeg", "/images/albam5.jpeg", "/images/albam6.jpeg", "/images/albam7.jpeg", "/images/albam8.jpeg"]
};

// Flattened Array for Filterable Gallery
const allGalleryImages = [
  ...curatedImages.wedding.map(src => ({ src, category: "Wedding" })),
  ...curatedImages.prewedding.map(src => ({ src, category: "Pre Wedding" })),
  ...curatedImages.kidsshoot.map(src => ({ src, category: "Kids" })),
  ...curatedImages.babyshower.map(src => ({ src, category: "Events" })),
  ...curatedImages.modelshoot.map(src => ({ src, category: "Model" }))
];

const galleryFilters = ["All", "Wedding", "Pre Wedding", "Kids", "Events", "Model"];

const reviews = [
  { name: "Karthik & Priya", text: "Guna and his team made our wedding look like a movie! The drone shots were unbelievable." },
  { name: "Sarah John", text: "Professional, creative and friendly. Best photography team in Chennai!" },
  { name: "Vikram Raj", text: "The premium album quality is surreal. Every emotion was captured perfectly." },
  { name: "Arun & Deepa", text: "Editing is top-notch. Highly recommended for luxury weddings." }
];

const faqs = [
  { q: "How early should we book our wedding shoot?", a: "We recommend booking at least 3 to 6 months in advance to secure your dates." },
  { q: "Do you provide Drone and 4K video coverage?", a: "Yes! All our premium coverages include cinematic video and drone support." },
  { q: "How long does it take to get the final albums?", a: "Digital photos within 2 weeks. Printed albums within 45 days." }
];

const instaFeeds = [
  { id: 1, type: "image", url: "https://www.instagram.com/p/Dc2f9gAE2uk/?stkn=czhqYTAwbDFrbGZh" },
  { id: 2, type: "video", url: "https://www.instagram.com/reel/Da6E_LJTFs8/?stkn=MXA0MzR2emtrcWZ4Mg==" },
  { id: 3, type: "video", url: "https://www.instagram.com/reel/DdcN6zwzr0a/?stkn=MTdwMnRrdDNoYjg1Yg==" },
  { id: 4, type: "video", url: "https://www.instagram.com/reel/DdEL2FOzT2U/?stkn=ZnZ5c29wbGpuNXlq" }
];

const fadeInUp = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };
const GUNA_WA_NUMBER = "919791179472";

const LogoWithText = ({ imgHeight = '45px', titleSize = '18px', subSize = '9px' }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
    <img 
      src="images/logo.png" 
      alt="Click Photography" 
      style={{ height: imgHeight, width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0px 2px 8px rgba(255,214,10,0.3))' }} 
    />
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'left', whiteSpace: 'nowrap' }}>
      <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: titleSize, fontWeight: '900', color: '#ffffff', letterSpacing: '1px', lineHeight: '1' }}>CLICK</span>
      <span style={{ fontFamily: "'Montserrat', system-ui, sans-serif", fontSize: subSize, fontWeight: '700', color: '#FFD60A', letterSpacing: '3px', textTransform: 'uppercase', marginTop: '3px' }}>Photography</span>
    </div>
  </div>
);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("dark");
  const [lang, setLang] = useState("en");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  
  const [isMuted, setIsMuted] = useState(true);
  const [showWaChat, setShowWaChat] = useState(false);
  const [waInput, setWaInput] = useState("");

  const [activeFilter, setActiveFilter] = useState("All");
  const filteredGallery = activeFilter === "All" ? allGalleryImages : allGalleryImages.filter(img => img.category === activeFilter);

  const [selectedGallery, setSelectedGallery] = useState(null);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [sliderVal, setSliderVal] = useState(50);
  const [openFaq, setOpenFaq] = useState(null);
  
  const [serviceFocus, setServiceFocus] = useState({ drone: false, album: false, teaser: false });
  const [timeLeft, setTimeLeft] = useState({ days: 6, hours: 14, minutes: 35, seconds: 40 });

  const [showBookingSuccess, setShowBookingSuccess] = useState(false);
  const [showAlreadyBooked, setShowAlreadyBooked] = useState(false);
  const [bookedDateDetails, setBookedDateDetails] = useState("");

  const [showClientPortal, setShowClientPortal] = useState(false);
  const [loginId, setLoginId] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loginError, setLoginError] = useState("");

  const [newClientId, setNewClientId] = useState("");
  const [newClientPass, setNewClientPass] = useState("");
  const [newClientImgUrl, setNewClientImgUrl] = useState("");
  
  const [clientsDb, setClientsDb] = useState(() => {
    const saved = localStorage.getItem("guna_clients_db");
    return saved ? JSON.parse(saved) : [ { id: "arun", pass: "1234", images: ["https://picsum.photos/id/1015/600/800"] } ];
  });

  const [bookedDates, setBookedDates] = useState(() => {
    const savedDates = localStorage.getItem("guna_booked_dates");
    return savedDates ? JSON.parse(savedDates) : [13, 14, 21, 22];
  });
  
  const [bookName, setBookName] = useState("");
  const [bookPhone, setBookPhone] = useState("");
  const [bookEventType, setBookEventType] = useState(""); 
  const [bookDate, setBookDate] = useState("");
  const [bookDetails, setBookDetails] = useState("");
  const [customName, setCustomName] = useState("");
  const [customDate, setCustomDate] = useState("");
  const [customIdea, setCustomIdea] = useState("");

  const t = content[lang];

  const playClickSound = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {}
  };

  useEffect(() => { setTimeout(() => setLoading(false), 2800); }, []);
  useEffect(() => { localStorage.setItem("guna_clients_db", JSON.stringify(clientsDb)); }, [clientsDb]);
  useEffect(() => { localStorage.setItem("guna_booked_dates", JSON.stringify(bookedDates)); }, [bookedDates]);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { days: Math.max(0, prev.days - 1), hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timerInterval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress((window.scrollY / totalScroll) * 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const moveCursor = (e) => { setCursorPos({ x: e.clientX, y: e.clientY }); };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  useEffect(() => { document.documentElement.setAttribute("data-theme", theme); }, [theme]);
  const toggleTheme = () => { playClickSound(); setTheme(theme === "dark" ? "light" : "dark"); };

  const handleDateClick = (day) => {
    playClickSound();
    if (bookedDates.includes(day)) {
      setBookedDateDetails(`${day} October 2026`);
      setShowAlreadyBooked(true); 
      return;
    }
    setBookedDates([...bookedDates, day]);
    setBookedDateDetails(`${day} October 2026`);
    setShowBookingSuccess(true);
    const message = `Hello Guna! I want to block the date for a shoot on ${day} October on Click Photography website!`;
    const waUrl = `https://wa.me/${GUNA_WA_NUMBER}?text=${encodeURIComponent(message)}`;
    setTimeout(() => { window.open(waUrl, '_blank'); }, 1500);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    playClickSound();
    const d = new Date(bookDate);
    const day = d.getDate(); 
    if (bookedDates.includes(day)) {
      setBookedDateDetails(bookDate);
      setShowAlreadyBooked(true); 
      return;
    }
    setBookedDates([...bookedDates, day]);
    setBookedDateDetails(bookDate);
    setShowBookingSuccess(true); 
    const message = `Hello Guna! I want to book a shoot.\n*Name:* ${bookName}\n*Phone:* ${bookPhone}\n*Event Type:* ${bookEventType}\n*Date:* ${bookDate}\n*Location/Details:* ${bookDetails}`;
    setTimeout(() => { window.open(`https://wa.me/${GUNA_WA_NUMBER}?text=${encodeURIComponent(message)}`, '_blank'); }, 1500);
    setBookName(""); setBookPhone(""); setBookEventType(""); setBookDate(""); setBookDetails("");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    playClickSound();
    const cleanId = loginId.trim().toLowerCase();
    const cleanPass = loginPass.trim();
    if (cleanId === "guna" && cleanPass === "1234") { setLoggedInUser({ role: "admin", id: "Guna" }); setLoginError(""); return; }
    const foundClient = clientsDb.find(c => c.id.trim().toLowerCase() === cleanId && c.pass.trim() === cleanPass);
    if (foundClient) { setLoggedInUser({ role: "client", ...foundClient }); setLoginError(""); } 
    else { setLoginError("Invalid ID or Password. Try ID: guna, PIN: 1234"); }
  };

  const handleAddClientData = (e) => {
    e.preventDefault();
    playClickSound();
    if (!newClientId || !newClientPass || !newClientImgUrl) return;
    const trimmedId = newClientId.trim().toLowerCase();
    const existingIndex = clientsDb.findIndex(c => c.id.toLowerCase() === trimmedId);
    if (existingIndex >= 0) {
      const updated = [...clientsDb]; updated[existingIndex].images.push(newClientImgUrl.trim());
      setClientsDb(updated); alert(`Photo added successfully to client: ${trimmedId}`);
    } else {
      setClientsDb([...clientsDb, { id: trimmedId, pass: newClientPass.trim(), images: [newClientImgUrl.trim()] }]);
      alert(`New client account created for ${trimmedId}!`);
    }
    setNewClientId(""); setNewClientPass(""); setNewClientImgUrl("");
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    playClickSound();
    alert(`Thank you ${customName}! Your creative concept has been sent to Guna.`);
    setShowCustomModal(false); setCustomName(""); setCustomDate(""); setCustomIdea("");
  };

  const toggleServiceFocus = (key) => { playClickSound(); setServiceFocus(prev => ({ ...prev, [key]: !prev[key] })); };
  const daysInMonth = 31; const emptyDaysAtStart = 4; 

  return (
    <div onClick={playClickSound}>
      <AnimatePresence>
        {loading && (
          <div style={{ position:'fixed', inset:0, zIndex:9999, display:'flex', justifyContent:'center', alignItems:'center', background:'transparent', pointerEvents: 'none' }}>
            
            <motion.div 
              initial={{ y: 0 }} exit={{ y: '-100%' }} transition={{ duration: 0.8, ease: "easeInOut", delay: 0.4 }} 
              style={{ position:'absolute', top:0, left:0, width:'100%', height:'50%', background:'#000', borderBottom:'1px solid rgba(255, 214, 10, 0.4)' }} 
            />
            <motion.div 
              initial={{ y: 0 }} exit={{ y: '100%' }} transition={{ duration: 0.8, ease: "easeInOut", delay: 0.4 }} 
              style={{ position:'absolute', bottom:0, left:0, width:'100%', height:'50%', background:'#000', borderTop:'1px solid rgba(255, 214, 10, 0.4)' }} 
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.3, opacity: 0 }} transition={{ duration: 0.4 }} 
              style={{ zIndex:10000, textAlign:'center' }}
            >
              <LogoWithText imgHeight="80px" titleSize="34px" subSize="14px" />
              <p style={{color: '#888', fontSize: '11px', letterSpacing: '4px', marginTop: '30px', textTransform: 'uppercase'}}>Luxury Experience</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>
      <div className="custom-cursor" style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}></div>
      <div className="cursor-dot" style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}></div>

      <nav className="nav" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '15px' }}>
        <div className="logo luxury-logo" style={{ textDecoration: 'none' }}>
          <LogoWithText imgHeight="40px" titleSize="18px" subSize="8px" />
        </div>
        <div className="nav-buttons" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
          <button className="icon-btn" onClick={() => setIsMuted(!isMuted)} title="Toggle BGM">
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} color="#FFD60A" />}
          </button>
          <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>EN</button>
          <button className={`lang-btn ${lang === 'ta' ? 'active' : ''}`} onClick={() => setLang('ta')}>தமிழ்</button>
          <button className="icon-btn" onClick={toggleTheme} title="Toggle Theme">
            {theme === 'dark' ? <Sun size={18} color="#FFD60A" /> : <Moon size={18} />}
          </button>
          <button className="btn btn-outline" onClick={() => setShowClientPortal(true)}>
            <User size={16} style={{marginRight: '5px', verticalAlign: 'middle'}}/> {t.portal}
          </button>
          <a className="btn" href="#contact">{t.book}</a>
        </div>
      </nav>

      {!isMuted && <audio autoPlay loop src="https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3"></audio>}

      <section className="hero">
        <video className="hero-video" autoPlay loop muted playsInline>
          <source src="https://cdn.coverr.co/videos/coverr-a-beautiful-wedding-5182/1080p.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
        <motion.div className="hero-content" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }}>
          <h1 className="title">Crafting Visual <br/> <span>Legacies.</span></h1>
          <p style={{ margin: '20px 0', fontSize: '18px', opacity: 0.9 }}>{t.desc}</p>
          
          <div className="countdown-banner">
            <div className="countdown-item"><span>{timeLeft.days}</span><p>Days</p></div>
            <span style={{color: '#FFD60A', fontSize: '18px'}}>:</span>
            <div className="countdown-item"><span>{timeLeft.hours}</span><p>Hours</p></div>
            <span style={{color: '#FFD60A', fontSize: '18px'}}>:</span>
            <div className="countdown-item"><span>{timeLeft.minutes}</span><p>Mins</p></div>
            <span style={{color: '#FFD60A', fontSize: '18px'}}>:</span>
            <div className="countdown-item"><span>{timeLeft.seconds}</span><p>Secs</p></div>
          </div>
          
          <div style={{marginTop: '30px'}}>
            <a className="btn" href="#portfolio">{t.portfolio}</a>
          </div>
        </motion.div>
      </section>

      <section className="section" id="about">
        <motion.div className="about-grid" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          <div>
            <h2 className="section-title" style={{ textAlign: 'left', margin: '0 0 20px 0' }}>{t.aboutTitle}</h2>
            <p style={{ lineHeight: '1.8', fontSize: '15px', opacity: 0.8 }}>{t.aboutDesc}</p>
            <div className="stats-container">
              <div className="stat-box"><h3>150+</h3><p>{t.events}</p></div>
              <div className="stat-box"><h3>50+</h3><p>{t.weddings}</p></div>
              <div className="stat-box"><h3>100%</h3><p>{t.clients}</p></div>
            </div>
          </div>
          <img src="/images/guna.png" alt="Studio Setup" style={{ width: '100%', height: 'auto', aspectRatio: '4/4.5', borderRadius: '24px', border: '1px solid var(--border-color)', objectFit: 'cover', objectPosition: 'top center' }}/>
        </motion.div>
      </section>

      <section className="section" style={{ background: 'var(--box-bg)' }}>
        <motion.h2 className="section-title" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          {t.colorGrading}
        </motion.h2>
        <motion.div className="ba-container" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80&sat=-100" className="ba-img" alt="Raw" />
          <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80" className="ba-img" alt="Edited" style={{ clipPath: `inset(0 ${100 - sliderVal}% 0 0)` }} />
          <div className="ba-line" style={{ left: `${sliderVal}%` }}>
            <div className="ba-btn"><SlidersHorizontal size={20}/></div>
          </div>
          <input type="range" min="0" max="100" value={sliderVal} onChange={(e) => setSliderVal(e.target.value)} className="ba-slider" />
        </motion.div>
      </section>

      <section className="section" id="portfolio">
        <motion.h2 className="section-title" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          {t.portfolio}
        </motion.h2>
        
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '30px' }}>
          {galleryFilters.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveFilter(cat)}
              style={{
                padding: '8px 20px', borderRadius: '30px', 
                border: `1px solid ${activeFilter === cat ? '#FFD60A' : 'var(--border-color)'}`,
                background: activeFilter === cat ? '#FFD60A' : 'transparent',
                color: activeFilter === cat ? '#000' : 'var(--text-color)',
                cursor: 'pointer', fontWeight: '600', fontSize: '12px', transition: '0.3s'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '15px', padding: '0 10px' }}>
          <AnimatePresence>
            {filteredGallery.map((img, i) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.3 }}
                key={img.src} 
                style={{ aspectRatio: '1/1', overflow: 'hidden', borderRadius: '12px', cursor: 'pointer', border: '1px solid var(--border-color)' }}
                onClick={() => setLightboxImg(img.src)}
              >
                <img src={img.src} alt={img.category} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <section className="section" style={{ background: 'var(--box-bg)' }}>
        <motion.h2 className="section-title" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          {t.expertise}
        </motion.h2>
        <motion.div className="cardgrid" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          {services.map((service) => (
            <div key={service.name} className="card" onClick={() => { if (service.folder === 'custom') setShowCustomModal(true); else setSelectedGallery(service.folder); }}>
              <div style={{ marginBottom: '20px' }}>{service.icon}</div>
              <h3 style={{ fontSize: '22px', marginBottom: '10px' }}>{service.name}</h3>
              <p style={{ fontSize: '14px', marginBottom: '25px', opacity: 0.7 }}>{service.desc}</p>
              <p style={{ color: '#FFD60A', fontSize: '12px', textTransform: 'uppercase', fontWeight: '700' }}>
                {service.folder === 'custom' ? 'Create Idea →' : 'Explore →'}
              </p>
            </div>
          ))}
        </motion.div>
      </section>

      <section className="section">
        <motion.h2 className="section-title" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          {t.focusTitle}
        </motion.h2>
        <motion.div className="estimator-box" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          <p style={{textAlign: 'center', opacity: 0.8, fontSize: '14px'}}>{t.focusSub}</p>
          <div className="estimator-options">
            <div className={`estimator-opt ${serviceFocus.drone ? 'selected' : ''}`} onClick={() => toggleServiceFocus('drone')}>
              <span>Drone Aerial Coverage</span>
              {serviceFocus.drone ? <CheckSquare color="#FFD60A"/> : <Square color="#666"/>}
            </div>
            <div className={`estimator-opt ${serviceFocus.album ? 'selected' : ''}`} onClick={() => toggleServiceFocus('album')}>
              <span>Italian Luxury Album Design</span>
              {serviceFocus.album ? <CheckSquare color="#FFD60A"/> : <Square color="#666"/>}
            </div>
            <div className={`estimator-opt ${serviceFocus.teaser ? 'selected' : ''}`} onClick={() => toggleServiceFocus('teaser')}>
              <span>Cinematic Video Teaser</span>
              {serviceFocus.teaser ? <CheckSquare color="#FFD60A"/> : <Square color="#666"/>}
            </div>
          </div>
        </motion.div>
      </section>

      <section className="section" style={{ background: 'var(--box-bg)' }}>
        <motion.h2 className="section-title" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          {t.availability}
        </motion.h2>
        <motion.div className="calendar-wrapper" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <h3 style={{fontSize: '18px'}}><Calendar size={18} style={{verticalAlign: 'sub', marginRight: '5px'}} color="#FFD60A"/> October 2026</h3>
            <div style={{display: 'flex', gap: '10px', fontSize: '11px'}}>
              <span style={{color: '#25D366'}}>● {t.free}</span>
              <span style={{color: '#FF3B30'}}>● {t.booked}</span>
            </div>
          </div>
          <div className="calendar-grid">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <div key={i} className="cal-day-header">{d}</div>)}
            {[...Array(emptyDaysAtStart)].map((_, i) => <div key={`empty-${i}`} className="cal-day empty"></div>)}
            {[...Array(daysInMonth)].map((_, i) => {
              const day = i + 1;
              const isBooked = bookedDates.includes(day);
              return (
                <div key={day} className={`cal-day ${isBooked ? 'booked' : 'available'}`} onClick={() => handleDateClick(day)} title={isBooked ? "Date already booked" : "Click to book"}>
                  {day}
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>

      <section className="section">
        <motion.h2 className="section-title" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          VIP Audio <span>Testimonial</span>
        </motion.h2>
        <motion.div style={{maxWidth: '600px', margin: '0 auto', background: 'var(--card-bg)', padding: '30px', borderRadius: '20px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '20px'}} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          <div style={{background: '#FFD60A', color: '#000', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: '0'}}>
            <Mic size={24}/>
          </div>
          <div style={{flexGrow: 1}}>
            <h4 style={{fontSize: '16px', marginBottom: '5px'}}>Karthik & Priya (Wedding Client)</h4>
            <p style={{fontSize: '12px', opacity: 0.7, marginBottom: '10px'}}>Listen to what they say about our cinematic coverage</p>
            <audio controls style={{width: '100%', height: '35px'}}>
              <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
            </audio>
          </div>
        </motion.div>
      </section>

      <section className="section" style={{ background: 'var(--box-bg)' }}>
        <motion.h2 className="section-title" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          {t.love}
        </motion.h2>
        <div className="testimonial-wrapper">
          <div className="testimonial-track">
            {[...reviews, ...reviews].map((rev, i) => (
              <div key={i} className="review-card">
                <div style={{display: 'flex', color: '#FFD60A', marginBottom: '15px'}}>
                  <Star size={16} fill="#FFD60A"/><Star size={16} fill="#FFD60A"/><Star size={16} fill="#FFD60A"/><Star size={16} fill="#FFD60A"/><Star size={16} fill="#FFD60A"/>
                </div>
                <p style={{fontSize: '14px', fontStyle: 'italic', marginBottom: '20px', opacity: 0.8}}>"{rev.text}"</p>
                <h4>- {rev.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <motion.h2 className="section-title" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          {t.faqTitle}
        </motion.h2>
        <motion.div className="faq-section" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <div className="faq-q" onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                {faq.q}
                <ChevronDown style={{ transform: openFaq === index ? 'rotate(180deg)' : 'rotate(0)', transition: '0.3s' }} />
              </div>
              {openFaq === index && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="faq-a">
                  {faq.a}
                </motion.div>
              )}
            </div>
          ))}
        </motion.div>
      </section>

      <section className="section" id="contact" style={{ background: 'var(--box-bg)' }}>
        <motion.div className="contact-grid" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          <div className="box">
            <h2 style={{ fontSize: '32px', marginBottom: '25px' }}>{t.contactTitle}</h2>
            <form className="contact-form" onSubmit={handleBookingSubmit}>
              <input type="text" placeholder="Full Name" value={bookName} onChange={e => setBookName(e.target.value)} required />
              <input type="tel" placeholder="Phone Number" value={bookPhone} onChange={e => setBookPhone(e.target.value)} required />
              
              <select value={bookEventType} onChange={e => setBookEventType(e.target.value)} required>
                <option value="" disabled>Select Event Type</option>
                {services.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
              </select>

              <div style={{position: 'relative'}}>
                <span style={{position: 'absolute', top: '-10px', left: '15px', background: 'var(--box-bg)', padding: '0 5px', fontSize: '11px', color: '#FFD60A', zIndex: 1}}>Select Shoot Date</span>
                <input type="date" value={bookDate} onChange={e => setBookDate(e.target.value)} required />
              </div>
              
              <textarea rows="3" placeholder="Location & Additional Details..." value={bookDetails} onChange={e => setBookDetails(e.target.value)} required></textarea>
              <button type="submit" className="btn" style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px'}}>
                <MessageCircle size={18} /> {t.send}
              </button>
            </form>
          </div>
          <div className="box" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '30px' }}>{t.studio}</h2>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', alignItems: 'center' }}>
              <div style={{ background: 'var(--card-bg)', padding: '15px', borderRadius: '50%' }}><Phone color="#FFD60A"/></div>
              <div><p style={{ fontSize: '12px', opacity: 0.6 }}>Call / WhatsApp</p><h4 style={{ fontSize: '18px' }}>+91 {GUNA_WA_NUMBER}</h4></div>
            </div>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div style={{ background: 'var(--card-bg)', padding: '15px', borderRadius: '50%' }}><MapPin color="#FFD60A"/></div>
              <div><p style={{ fontSize: '12px', opacity: 0.6 }}>Location</p><h4 style={{ fontSize: '18px' }}>Veerapandi, Tamil Nadu</h4></div>
            </div>
            <div className="map-container">
              <iframe src="https://maps.google.com/maps?q=12.0468605,79.2162124&t=&z=14&ie=UTF8&iwloc=&output=embed" allowFullScreen="" loading="lazy" title="Studio Location"></iframe>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="section" style={{paddingTop: '20px'}}>
        <h3 style={{textAlign: 'center', marginBottom: '30px'}}>
          <a href="https://www.instagram.com/click_photography_offl/" target="_blank" rel="noreferrer" style={{color: '#FFD60A', textDecoration: 'none'}}>
            <Instagram color="#FFD60A" style={{verticalAlign: 'sub', marginRight: '10px'}}/> 
            Follow @𝗖𝗹𝗶𝗰𝗸_𝗣𝗵𝗼𝘁𝗼𝗴𝗿𝗮𝗽𝗵𝘆_𝗼𝗳𝗳𝗶𝗰𝗶𝗮𝗹
          </a>
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', justifyContent: 'center', padding: '10px' }}>
          {instaFeeds.map((feed) => {
            const embedUrl = feed.url.split("?")[0] + "embed/";
            return (
              <div key={feed.id} style={{ width: '100%', aspectRatio: '4/5', borderRadius: '12px', overflow: 'hidden', background: '#000', boxShadow: '0 8px 20px rgba(0,0,0,0.4)', position: 'relative' }}>
                <iframe src={embedUrl} width="100%" height="100%" frameBorder="0" scrolling="no" allowTransparency="true" allow="encrypted-media" style={{ border: 'none', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}></iframe>
              </div>
            );
          })}
        </div>
      </section>

      <footer>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
           <LogoWithText imgHeight="70px" titleSize="28px" subSize="12px" />
        </div>
        <p style={{ letterSpacing: '2px', textTransform: 'uppercase', fontSize: '10px', marginTop: '10px' }}>© 2026 Click Studios. All Rights Reserved.</p>
      </footer>

      {/* POPUPS & MODALS */}
      <AnimatePresence>
        {showAlreadyBooked && (
          <motion.div className="gpay-success-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {[...Array(12)].map((_, i) => <HeartCrack key={i} size={20 + Math.random() * 25} className="falling-heart" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 1.5}s`, animationDuration: `${2 + Math.random() * 2}s` }} color="#FF3B30" />)}
            <motion.div className="gpay-card" style={{ borderColor: '#FF3B30', boxShadow: '0 0 50px rgba(255, 59, 48, 0.3)' }} initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
              <div style={{ width: '70px', height: '70px', background: 'rgba(255, 59, 48, 0.15)', border: '2px solid #FF3B30', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 0 30px rgba(255, 59, 48, 0.4)' }}><HeartCrack size={35} color="#FF3B30" /></div>
              <h2 style={{ color: '#fff', fontSize: '24px', marginBottom: '8px' }}>Oh no! Date Unavailable</h2>
              <p style={{ color: '#FF3B30', fontSize: '15px', fontWeight: '600', marginBottom: '15px' }}>Date: {bookedDateDetails}</p>
              <p style={{ color: '#aaa', fontSize: '13px', lineHeight: '1.5', marginBottom: '25px' }}>We are so sorry, but this date is already fully booked. Please don't be sad, kindly choose another available date and let's create magic together!</p>
              <button onClick={() => setShowAlreadyBooked(false)} className="btn" style={{ width: '100%', background: '#FF3B30', color: '#fff', boxShadow: '0 0 15px rgba(255, 59, 48, 0.4)' }}>Pick Another Date</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showBookingSuccess && (
          <motion.div className="gpay-success-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {[...Array(10)].map((_, i) => <Heart key={i} size={20 + Math.random() * 25} className="floating-heart" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 2}s`, animationDuration: `${2 + Math.random() * 2}s` }} fill="#ff3366" />)}
            <motion.div className="gpay-card" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
              <div style={{ width: '70px', height: '70px', background: 'rgba(37, 211, 102, 0.15)', border: '2px solid #25D366', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 0 30px rgba(37, 211, 102, 0.6)' }}><CheckCircle2 size={40} color="#25D366" /></div>
              <h2 style={{ color: '#fff', fontSize: '24px', marginBottom: '8px' }}>Booking Successfully!</h2>
              <p style={{ color: '#25D366', fontSize: '15px', fontWeight: '600', marginBottom: '15px' }}>Date: {bookedDateDetails}</p>
              <p style={{ color: '#aaa', fontSize: '13px', lineHeight: '1.5', marginBottom: '25px' }}>Your date is locked! You are being redirected to Guna's WhatsApp to confirm details...</p>
              <button onClick={() => setShowBookingSuccess(false)} className="btn" style={{ width: '100%', background: '#25D366', color: '#fff' }}>Okay</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showWaChat && (
          <motion.div className="wa-chat-popup" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
            <div className="wa-chat-header">
              <span>Click Photography Support</span>
              <button onClick={() => setShowWaChat(false)} style={{background: 'none', border: 'none', color: '#fff', cursor: 'pointer'}}><X size={18}/></button>
            </div>
            <div className="wa-chat-body">
              <div className="wa-chat-msg">Hello! Welcome to Click Photography. How can we help you plan your event?</div>
              <div style={{display: 'flex', gap: '5px', marginTop: '10px'}}>
                <input type="text" placeholder="Type a message..." value={waInput} onChange={e => setWaInput(e.target.value)} style={{flexGrow: 1, padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-color)', fontSize: '12px'}} />
                <a href={`https://wa.me/${GUNA_WA_NUMBER}?text=${encodeURIComponent(waInput)}`} target="_blank" rel="noreferrer" style={{background: '#25D366', color: '#fff', padding: '8px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Send size={14}/></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="floating-wa" 
        onClick={() => setShowWaChat(!showWaChat)}
        animate={{ boxShadow: ["0 0 0 0px rgba(37,211,102,0.8)", "0 0 0 20px rgba(37,211,102,0)"] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        style={{ position: 'fixed', bottom: '20px', right: '20px', background: '#25D366', color: '#fff', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', zIndex: 1000 }}
      >
        <MessageCircle size={32} />
      </motion.div>

      <AnimatePresence>
        {lightboxImg && (
          <motion.div className="lightbox-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightboxImg(null)}>
            <div className="lightbox-content" onClick={e => e.stopPropagation()}>
              <button onClick={() => setLightboxImg(null)} style={{position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#fff', fontSize: '32px', cursor: 'pointer', zIndex: 6000}}><X size={32}/></button>
              <img src={lightboxImg} alt="Fullscreen View" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCustomModal && (
          <motion.div className="gallery-popup" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{zIndex: 3000}}>
            <div className="popup-top"><h2>CUSTOM <span style={{color: '#fff'}}>EVENT CREATIVITY</span></h2><button onClick={() => setShowCustomModal(false)}>✕</button></div>
            <motion.div className="login-box" initial={{ scale: 0.9 }} animate={{ scale: 1 }} style={{maxWidth: '500px'}}>
              <Sparkles size={40} color="#FFD60A" style={{marginBottom: '15px'}}/>
              <h3 style={{marginBottom: '10px'}}>Plan Your Unique Vision</h3>
              <p style={{fontSize: '13px', opacity: 0.7, marginBottom: '20px'}}>Tell us your creative idea, theme, or concept for your special event!</p>
              <form className="contact-form" onSubmit={handleCustomSubmit}>
                <input type="text" placeholder="Your Name" value={customName} onChange={e => setCustomName(e.target.value)} required />
                <input type="date" value={customDate} onChange={e => setCustomDate(e.target.value)} required />
                <textarea rows="4" placeholder="Describe your creative vision..." value={customIdea} onChange={e => setCustomIdea(e.target.value)} required></textarea>
                <button type="submit" className="btn" style={{width: '100%'}}>Submit Idea & Book</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedGallery && (
          <motion.div className="gallery-popup" initial={{ opacity: 0 }} animate={{ opacity: 1, exit: { opacity: 0 } }}>
            <div className="popup-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 25px' }}>
              <button onClick={() => setSelectedGallery(null)} style={{ background: 'transparent', border: '1px solid #FFD60A', color: '#FFD60A', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', fontWeight: 'bold' }}>
                <ChevronLeft size={16} /> Back to Services
              </button>
              <h2 style={{ textTransform: 'uppercase', margin: 0, fontSize: '20px' }}>{selectedGallery}</h2>
            </div>
            <div className="popup-grid">
              {curatedImages[selectedGallery].map((img, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="popup-img-wrapper" onClick={() => setLightboxImg(img)}>
                  <img src={img} alt={`Shot ${index + 1}`} loading="lazy" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showClientPortal && (
          <motion.div className="glass-portal-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="glass-card" initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}><ShieldCheck color="#FFD60A" size={28}/><h2 style={{fontSize: '24px', letterSpacing: '2px'}}>GUNA STUDIOS PORTAL</h2></div>
                <button onClick={() => {setShowClientPortal(false); setLoggedInUser(null); setLoginError("");}} style={{background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><X size={20}/></button>
              </div>
              
              {!loggedInUser ? (
                <div>
                  <form className="contact-form" onSubmit={handleLogin}>
                    <div style={{position: 'relative'}}><User size={18} style={{position: 'absolute', top: '15px', left: '15px', color: '#888'}}/><input type="text" placeholder="Client ID or 'guna'" value={loginId} onChange={e => setLoginId(e.target.value)} style={{paddingLeft: '45px'}} required /></div>
                    <div style={{position: 'relative'}}><KeyRound size={18} style={{position: 'absolute', top: '15px', left: '15px', color: '#888'}}/><input type="password" placeholder="Password (e.g. 1234)" value={loginPass} onChange={e => setLoginPass(e.target.value)} style={{paddingLeft: '45px'}} required /></div>
                    {loginError && <p style={{color: '#FF3B30', fontSize: '12px', marginBottom: '15px', textAlign: 'center'}}>{loginError}</p>}
                    <button type="submit" className="btn" style={{width: '100%', padding: '14px', background: 'linear-gradient(135deg, #FFD60A, #FFA500)'}}>Sign In</button>
                  </form>
                </div>
              ) : loggedInUser.role === "admin" ? (
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px'}}>
                    <h3 style={{color: '#FFD60A', fontSize: '20px'}}>🛠️ Dashboard</h3><button onClick={() => setLoggedInUser(null)} style={{background: 'transparent', border: '1px solid #FF3B30', color: '#FF3B30', padding: '5px 12px', borderRadius: '8px', cursor: 'pointer'}}>Logout</button>
                  </div>
                  <form className="contact-form" onSubmit={handleAddClientData}>
                    <input type="text" placeholder="Client ID" value={newClientId} onChange={e => setNewClientId(e.target.value)} required />
                    <input type="text" placeholder="Password" value={newClientPass} onChange={e => setNewClientPass(e.target.value)} required />
                    <input type="url" placeholder="Image URL" value={newClientImgUrl} onChange={e => setNewClientImgUrl(e.target.value)} required />
                    <button type="submit" className="btn" style={{width: '100%', background: '#25D366', color: '#fff'}}>+ Add Photo</button>
                  </form>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
                    <h3 style={{color: '#25D366', fontSize: '18px'}}>Welcome, {loggedInUser.id.toUpperCase()}!</h3><button onClick={() => setLoggedInUser(null)} style={{background: 'transparent', border: '1px solid #FF3B30', color: '#FF3B30', padding: '5px 12px', borderRadius: '8px', cursor: 'pointer'}}>Logout</button>
                  </div>
                  <div className="popup-grid" style={{maxHeight: '50vh', overflowY: 'auto', paddingRight: '5px'}}>
                    {loggedInUser.images.map((imgUrl, index) => <div key={index} className="popup-img-wrapper" onClick={() => setLightboxImg(imgUrl)}><img src={imgUrl} alt="Private Shot" loading="lazy" /></div>)}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}