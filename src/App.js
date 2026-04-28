import { useState, useEffect, useRef } from "react";
import loaderimg from "./loaderimg.png";


const skills = [
  { name: "MS Office Suite", level: 90 },
  { name: "System Hardware & Software", level: 88 },
  { name: "Windows OS (XP/7/8/10)", level: 92 },
  { name: "Autodesk MAYA", level: 75 },
  { name: "Telecom Hardware (Mobile)", level: 85 },
  { name: "Computer Assembling & Servicing", level: 87 },
];

const experiences = [
  {
    title: "Executive Manager",
    company: "Kritohub Technologies Private Limited",
    period: "May 2024 – May 2025",
    location: "No. 111, First Floor, V G P Nagar Main Road, Rajakilpakkam, Kanchipuram – 600073, Tamil Nadu",
    color: "#6366f1",
    points: [
      "Led executive operations and strategic management functions",
      "Managed client relations, business development, and team coordination",
      "Oversaw IT infrastructure and ensured smooth technological operations",
    ],
  },
  {
    title: "Office Manager",
    company: "Annai Teresa Engineering College",
    period: "2015 – 2018",
    location: "Tirunavalur, Tamil Nadu",
    color: "#06b6d4",
    points: [
      "Managed day-to-day administrative and operational functions",
      "Coordinated with faculty, students, and external stakeholders",
      "Maintained official records, correspondence, and documentation",
      "Supervised office staff and ensured adherence to institutional policies",
    ],
  },
];

const education = [
  { degree: "Ph.D. – Business Administration", institution: "Annamalai University, Chidambaram", year: "Awarded: March 2025", icon: "🎓" },
  { degree: "MBA – Information Systems", institution: "Annamalai University, Chidambaram", year: "68%", icon: "📚" },
  { degree: "B.A. – Human Rights", institution: "Annamalai University, Chidambaram", year: "65%", icon: "⚖️" },
  { degree: "H.S.C.", institution: "State Board (AU), Chidambaram", year: "73%", icon: "📝" },
  { degree: "S.S.L.C.", institution: "State Board, Pudhupet", year: "60%", icon: "📖" },
];

const navItems = ["About", "Skills", "Experience", "Education", "Contact"];

// ─── LOADER ───────────────────────────────────────────────────────────────────
function Loader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("loading"); // loading | reveal

  useEffect(() => {
    let val = 0;
    const id = setInterval(() => {
      val += Math.random() * 3.5 + 0.5;
      if (val >= 100) {
        val = 100;
        clearInterval(id);
        setProgress(100);
        setTimeout(() => setPhase("reveal"), 400);
        setTimeout(() => onDone(), 1200);
      } else {
        setProgress(Math.floor(val));
      }
    }, 40);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "#060914",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: "2rem",
      transition: phase === "reveal" ? "opacity 0.8s ease, transform 0.8s ease" : "none",
      opacity: phase === "reveal" ? 0 : 1,
      transform: phase === "reveal" ? "scale(1.05)" : "scale(1)",
      pointerEvents: phase === "reveal" ? "none" : "all",
    }}>
      {/* Animated rings behind photo */}
      <div style={{ position: "relative", width: 160, height: 160, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            position: "absolute",
            width: 160 + i * 30,
            height: 160 + i * 30,
            borderRadius: "50%",
            border: `2px solid rgba(99,102,241,${0.5 - i * 0.15})`,
            animation: `loaderPulse ${1.5 + i * 0.4}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
          }} />
        ))}
        {/* Photo */}
        <div style={{
          width: 140, height: 140, borderRadius: "50%",
          background: "linear-gradient(135deg, #6366f1, #06b6d4)",
          padding: 3, flexShrink: 0,
          boxShadow: "0 0 40px rgba(99,102,241,0.6)",
          
        }}>
          <div style={{
            width: "100%", height: "100%", borderRadius: "50%",
            overflow: "hidden", background: "#060914",
          }}>
            <img src={`${loaderimg}`} alt="Gabriel"
              style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
      </div>

      {/* Name */}
      <div style={{ textAlign: "center" }}>
        <div style={{
          fontSize: "1.5rem", fontWeight: 800, letterSpacing: 2,
          background: "linear-gradient(135deg, #e2e8f0, #6366f1)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>J. Gabriel Prabakaran</div>
        <div style={{ fontSize: "0.8rem", color: "#475569", letterSpacing: 3, textTransform: "uppercase", marginTop: 4 }}>
          Ph.D. · Executive Manager
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ width: "min(280px, 80vw)" }}>
        <div style={{
          height: 4, borderRadius: 2,
          background: "rgba(255,255,255,0.08)",
          overflow: "hidden",
        }}>
          <div style={{
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(90deg, #6366f1, #06b6d4)",
            borderRadius: 2,
            transition: "width 0.1s linear",
            boxShadow: "0 0 12px rgba(99,102,241,0.8)",
          }} />
        </div>
        <div style={{
          display: "flex", justifyContent: "space-between",
          marginTop: 8, fontSize: "0.75rem",
          color: "#475569",
        }}>
          <span>Loading portfolio...</span>
          <span style={{ color: "#6366f1", fontWeight: 700 }}>{progress}%</span>
        </div>
      </div>

      <style>{`
        @keyframes loaderPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.04); }
        }
      `}</style>
    </div>
  );
}

// ─── MAIN PORTFOLIO ───────────────────────────────────────────────────────────
export default function Portfolio() {
  const [loaded, setLoaded] = useState(false);
  const [dark, setDark] = useState(true);
  const [active, setActive] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState({});
  const sectionRefs = useRef({});

  useEffect(() => {
    if (!loaded) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) setVisible((v) => ({ ...v, [e.target.id]: true }));
      }),
      { threshold: 0.1 }
    );
    Object.values(sectionRefs.current).forEach((r) => r && obs.observe(r));
    return () => obs.disconnect();
  }, [loaded]);

  const scrollTo = (id) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id);
    setMenuOpen(false);
  };

  const d = dark;

  if (!loaded) return <Loader onDone={() => setLoaded(true)} />;

  return (
    <div style={{
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      background: d ? "#0a0f1e" : "#f0f4ff",
      color: d ? "#e2e8f0" : "#1e293b",
      minHeight: "100vh",
      transition: "all 0.3s ease",
    }}>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; padding: 0; }
        img { display: block; }

        /* ── Mobile nav ── */
        .hamburger { display: none; }
        .nav-links-desktop { display: flex; }
        .mobile-menu { display: none; }

        @media (max-width: 768px) {
          .hamburger { display: flex !important; }
          .nav-links-desktop { display: none !important; }
          .mobile-menu.open { display: flex !important; }
          .hero-inner { flex-direction: column-reverse !important; align-items: center !important; text-align: center !important; gap: 2rem !important; }
          .hero-text { min-width: unset !important; }
          .hero-btn-row { justify-content: center !important; }
          .hero-stats { justify-content: center !important; }
          .hero-desc { margin-left: auto !important; margin-right: auto !important; }
          .photo-ring { width: 200px !important; height: 200px !important; }
          .section-inner { padding: 3rem 1.25rem !important; }
          .section-title { font-size: 1.8rem !important; }
          .edu-grid { grid-template-columns: 1fr !important; }
          .skills-grid { grid-template-columns: 1fr !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          .exp-card { flex-direction: column !important; }
        }

        @media (max-width: 480px) {
          .hero-name { font-size: 2.2rem !important; }
          .photo-ring { width: 170px !important; height: 170px !important; }
          .nav-logo { font-size: 1.1rem !important; }
        }

        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(99,102,241,0.55) !important; }
        .btn-outline:hover { background: rgba(99,102,241,0.12) !important; }
        .exp-card-inner:hover { transform: translateY(-3px); border-color: rgba(99,102,241,0.5) !important; }
        .edu-card:hover { transform: translateY(-4px); border-color: rgba(99,102,241,0.5) !important; }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: d ? "rgba(10,15,30,0.94)" : "rgba(240,244,255,0.94)",
        backdropFilter: "blur(14px)",
        borderBottom: d ? "1px solid rgba(99,102,241,0.25)" : "1px solid rgba(99,102,241,0.2)",
        padding: "0 1.25rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 60,
      }}>
        <span className="nav-logo" style={{
          fontSize: "1.25rem", fontWeight: 800,
          background: "linear-gradient(135deg,#6366f1,#06b6d4)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>JGP.</span>

        {/* Desktop links */}
        <ul className="nav-links-desktop" style={{ display: "flex", gap: "0.2rem", listStyle: "none", margin: 0, padding: 0 }}>
          {navItems.map((item) => (
            <li key={item}>
              <button onClick={() => scrollTo(item)} style={{
                padding: "0.35rem 0.9rem", borderRadius: 20, cursor: "pointer",
                fontSize: "0.85rem", fontWeight: 500, transition: "all 0.2s",
                background: active === item ? "linear-gradient(135deg,#6366f1,#06b6d4)" : "transparent",
                color: active === item ? "#fff" : d ? "#94a3b8" : "#64748b",
                border: "none",
              }}>{item}</button>
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button onClick={() => setDark(!d)} style={{
            background: d ? "rgba(99,102,241,0.2)" : "rgba(99,102,241,0.12)",
            border: "1px solid rgba(99,102,241,0.35)", borderRadius: 20,
            padding: "0.3rem 0.7rem", cursor: "pointer", fontSize: "1rem",
            display: "flex", alignItems: "center", gap: 5,
          }}>{d ? "☀️" : "🌙"}</button>

          {/* Hamburger */}
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{
            background: "none", border: "none", cursor: "pointer", padding: "0.3rem",
            display: "none", flexDirection: "column", gap: 5,
          }}>
            {[0,1,2].map(i => (
              <div key={i} style={{
                width: 24, height: 2, borderRadius: 2,
                background: d ? "#94a3b8" : "#64748b",
                transition: "all 0.3s",
                transform: menuOpen
                  ? i === 0 ? "rotate(45deg) translate(5px,5px)"
                  : i === 1 ? "scaleX(0)"
                  : "rotate(-45deg) translate(5px,-5px)"
                  : "none",
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`} style={{
        display: "none",
        flexDirection: "column",
        background: d ? "rgba(10,15,30,0.97)" : "rgba(240,244,255,0.97)",
        backdropFilter: "blur(14px)",
        borderBottom: d ? "1px solid rgba(99,102,241,0.2)" : "1px solid rgba(99,102,241,0.15)",
        padding: "0.75rem 1.25rem 1rem",
        position: "sticky", top: 60, zIndex: 99,
      }}>
        {navItems.map((item) => (
          <button key={item} onClick={() => scrollTo(item)} style={{
            padding: "0.65rem 1rem", borderRadius: 10, cursor: "pointer",
            fontSize: "0.95rem", fontWeight: 500, transition: "all 0.2s",
            background: active === item ? "linear-gradient(135deg,#6366f1,#06b6d4)" : "transparent",
            color: active === item ? "#fff" : d ? "#94a3b8" : "#64748b",
            border: "none", textAlign: "left", marginBottom: 2,
          }}>{item}</button>
        ))}
      </div>

      {/* ── HERO ── */}
      <section id="About" ref={(r) => { sectionRefs.current["About"] = r; }} style={{
        minHeight: "88vh", display: "flex", alignItems: "center", justifyContent: "center",
        padding: "4rem 1.25rem", position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none",
          width: 500, height: 500, background: "rgba(99,102,241,0.1)", top: -100, left: -120,
        }} />
        <div style={{
          position: "absolute", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none",
          width: 400, height: 400, background: "rgba(6,182,212,0.08)", bottom: -80, right: -80,
        }} />

        <div className="hero-inner" style={{
          maxWidth: 1100, width: "100%",
          display: "flex", gap: "3rem", alignItems: "center", flexWrap: "wrap",
        }}>
          <div className="hero-text" style={{ flex: 1, minWidth: 280 }}>
            <p style={{ fontSize: "0.85rem", letterSpacing: 3, textTransform: "uppercase", color: "#6366f1", fontWeight: 700, marginBottom: "0.75rem" }}>
              Welcome to my portfolio
            </p>
            <h1 className="hero-name" style={{
              fontSize: "clamp(2.4rem,5vw,4rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: "0.5rem",
              background: d ? "linear-gradient(135deg,#e2e8f0 30%,#6366f1)" : "linear-gradient(135deg,#1e293b 30%,#6366f1)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>J. Gabriel<br />Prabakaran</h1>
            <p style={{ fontSize: "1.1rem", color: "#06b6d4", fontWeight: 600, marginBottom: "1.25rem" }}>
              Ph.D. | Executive Manager & IT Professional
            </p>
            <p className="hero-desc" style={{ fontSize: "0.95rem", lineHeight: 1.75, color: d ? "#94a3b8" : "#64748b", maxWidth: 480, marginBottom: "2rem" }}>
              Accomplished professional with a Ph.D. in Business Administration and a strong track record in executive management and IT operations. Passionate about bridging technology and organisational excellence.
            </p>
            <div className="hero-btn-row" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <button className="btn-primary" onClick={() => scrollTo("Contact")} style={{
                padding: "0.7rem 1.7rem", background: "linear-gradient(135deg,#6366f1,#06b6d4)",
                color: "#fff", border: "none", borderRadius: 30, fontSize: "0.92rem", fontWeight: 600,
                cursor: "pointer", transition: "all 0.2s", boxShadow: "0 4px 20px rgba(99,102,241,0.4)",
              }}>Get In Touch</button>
              <button className="btn-outline" onClick={() => scrollTo("Experience")} style={{
                padding: "0.7rem 1.7rem", background: "transparent",
                color: d ? "#e2e8f0" : "#1e293b",
                border: d ? "1.5px solid rgba(99,102,241,0.45)" : "1.5px solid rgba(99,102,241,0.4)",
                borderRadius: 30, fontSize: "0.92rem", fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
              }}>View Experience</button>
            </div>
            <div className="hero-stats" style={{ display: "flex", gap: "2rem", marginTop: "2.5rem", flexWrap: "wrap" }}>
              {[["2+","Years Experience"],["Ph.D.","Business Admin"],["2","Companies"]].map(([val,lbl]) => (
                <div key={lbl}>
                  <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#6366f1" }}>{val}</div>
                  <div style={{ fontSize: "0.72rem", color: d ? "#64748b" : "#94a3b8" }}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ flexShrink: 0, position: "relative" }}>
            <div className="photo-ring" style={{
              width: 260, height: 260, borderRadius: "50%",
              background: "linear-gradient(135deg,#6366f1,#06b6d4)",
              padding: 4, boxShadow: "0 0 60px rgba(99,102,241,0.4)",
            }}>
              <div style={{
                width: "100%", height: "100%", borderRadius: "50%",
                background: d ? "#0a0f1e" : "#f0f4ff", overflow: "hidden",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <img src={`${loaderimg}`} alt="Gabriel Prabakaran"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </div>
            <div style={{
              position: "absolute", bottom: 10, right: -10,
              background: "linear-gradient(135deg,#6366f1,#06b6d4)",
              borderRadius: 12, padding: "0.5rem 0.85rem",
              fontSize: "0.72rem", fontWeight: 700, color: "#fff",
              boxShadow: "0 8px 24px rgba(99,102,241,0.5)",
              whiteSpace: "nowrap",
            }}>Ph.D. Awarded 2025</div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section ref={(r) => { sectionRefs.current["Skills"] = r; }} id="Skills" style={{
        background: d ? "rgba(255,255,255,0.02)" : "rgba(99,102,241,0.03)",
        borderTop: d ? "1px solid rgba(99,102,241,0.15)" : "1px solid rgba(99,102,241,0.1)",
      }}>
        <div className="section-inner" style={{
          maxWidth: 1100, margin: "0 auto", padding: "5rem 1.25rem",
          opacity: visible["Skills"] ? 1 : 0,
          transform: visible["Skills"] ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}>
          <p style={sLabel}>What I Know</p>
          <h2 className="section-title" style={sTitle(d)}>Technical Skills</h2>
          <div className="skills-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.25rem" }}>
            {skills.map((s) => (
              <div key={s.name} style={card(d)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 600, fontSize: "0.92rem" }}>{s.name}</span>
                  <span style={{ color: "#6366f1", fontWeight: 700, fontSize: "0.88rem" }}>{s.level}%</span>
                </div>
                <div style={{ height: 8, borderRadius: 4, background: d ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)", overflow: "hidden", marginTop: 8 }}>
                  <div style={{
                    height: "100%",
                    width: visible["Skills"] ? `${s.level}%` : "0%",
                    background: "linear-gradient(90deg,#6366f1,#06b6d4)",
                    borderRadius: 4,
                    transition: "width 1.3s cubic-bezier(0.4,0,0.2,1)",
                  }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "3rem" }}>
            <p style={{ ...sLabel, marginBottom: "1rem" }}>Languages</p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              {["Tamil (Native)", "English (Professional)"].map((l) => (
                <span key={l} style={{
                  ...tagStyle,
                  padding: "0.45rem 1.1rem", fontSize: "0.88rem",
                  background: "linear-gradient(135deg,rgba(99,102,241,0.15),rgba(6,182,212,0.15))",
                  border: "1px solid rgba(99,102,241,0.4)",
                }}>{l}</span>
              ))}
            </div>
          </div>

          <div style={{ marginTop: "2.5rem" }}>
            <p style={{ ...sLabel, marginBottom: "1rem" }}>Industrial Visits</p>
            <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
              {["MCD Cellular Service – Cuddalore","Reliance Communications – Panruti","Airtel Mobiles – Panruti","JGP Techcomm – Pudhupet"].map((v) => (
                <span key={v} style={tagStyle}>{v}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section ref={(r) => { sectionRefs.current["Experience"] = r; }} id="Experience">
        <div className="section-inner" style={{
          maxWidth: 1100, margin: "0 auto", padding: "5rem 1.25rem",
          opacity: visible["Experience"] ? 1 : 0,
          transform: visible["Experience"] ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}>
          <p style={sLabel}>Where I've Worked</p>
          <h2 className="section-title" style={sTitle(d)}>Work Experience</h2>
          {experiences.map((exp, i) => (
            <div key={i} className="exp-card" style={{ display: "flex", gap: "1.25rem", marginBottom: "2.25rem" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 14, flexShrink: 0 }}>
                <div style={{ width: 14, height: 14, borderRadius: "50%", background: exp.color, flexShrink: 0, boxShadow: `0 0 12px ${exp.color}80`, marginTop: 6 }} />
                {i < experiences.length - 1 && <div style={{ width: 2, background: d ? "rgba(99,102,241,0.3)" : "rgba(99,102,241,0.2)", flex: 1, marginLeft: 6 }} />}
              </div>
              <div className="exp-card-inner" style={{
                ...card(d), flex: 1,
                borderLeft: `3px solid ${exp.color}`,
                transition: "transform 0.2s, border-color 0.2s",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.75rem" }}>
                  <div>
                    <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: d ? "#e2e8f0" : "#1e293b", margin: 0 }}>{exp.title}</h3>
                    <p style={{ color: exp.color, fontWeight: 600, margin: "0.2rem 0 0", fontSize: "0.9rem" }}>{exp.company}</p>
                  </div>
                  <span style={{ ...tagStyle, alignSelf: "flex-start", background: `${exp.color}20`, color: exp.color, border: `1px solid ${exp.color}50` }}>{exp.period}</span>
                </div>
                <p style={{ fontSize: "0.8rem", color: d ? "#64748b" : "#94a3b8", marginBottom: "0.75rem" }}>📍 {exp.location}</p>
                <ul style={{ paddingLeft: "1.1rem", margin: 0 }}>
                  {exp.points.map((pt, j) => (
                    <li key={j} style={{ color: d ? "#94a3b8" : "#64748b", fontSize: "0.88rem", marginBottom: "0.35rem", lineHeight: 1.65 }}>{pt}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section ref={(r) => { sectionRefs.current["Education"] = r; }} id="Education" style={{
        background: d ? "rgba(255,255,255,0.02)" : "rgba(99,102,241,0.03)",
        borderTop: d ? "1px solid rgba(99,102,241,0.15)" : "1px solid rgba(99,102,241,0.1)",
      }}>
        <div className="section-inner" style={{
          maxWidth: 1100, margin: "0 auto", padding: "5rem 1.25rem",
          opacity: visible["Education"] ? 1 : 0,
          transform: visible["Education"] ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}>
          <p style={sLabel}>Academic Background</p>
          <h2 className="section-title" style={sTitle(d)}>Education</h2>
          <div className="edu-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.1rem" }}>
            {education.map((edu, i) => (
              <div key={i} className="edu-card" style={{ ...card(d), display: "flex", gap: "1rem", alignItems: "flex-start", transition: "transform 0.2s, border-color 0.2s" }}>
                <div style={{
                  width: 46, height: 46, borderRadius: 12, flexShrink: 0,
                  background: "linear-gradient(135deg,rgba(99,102,241,0.2),rgba(6,182,212,0.2))",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem",
                  border: "1px solid rgba(99,102,241,0.3)",
                }}>{edu.icon}</div>
                <div>
                  <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: d ? "#e2e8f0" : "#1e293b", margin: "0 0 0.25rem" }}>{edu.degree}</h4>
                  <p style={{ fontSize: "0.8rem", color: "#6366f1", margin: "0 0 0.3rem", fontWeight: 500 }}>{edu.institution}</p>
                  <span style={{ ...tagStyle, fontSize: "0.72rem" }}>{edu.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section ref={(r) => { sectionRefs.current["Contact"] = r; }} id="Contact">
        <div className="section-inner" style={{
          maxWidth: 1100, margin: "0 auto", padding: "5rem 1.25rem",
          opacity: visible["Contact"] ? 1 : 0,
          transform: visible["Contact"] ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}>
          <p style={sLabel}>Let's Connect</p>
          <h2 className="section-title" style={sTitle(d)}>Contact Me</h2>
          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "2rem", alignItems: "start" }}>
            <div>
              {[
                { icon: "✉️", label: "Email", value: "gabrieldhinesh99@gmail.com", href: "mailto:gabrieldhinesh99@gmail.com" },
                { icon: "📞", label: "Phone", value: "+91 9843601843", href: "tel:+919843601843" },
                { icon: "📍", label: "Address", value: "No. 49, V.M. Koil Street, Pudhupet PO, Panruti TK., Cuddalore – 607108, Tamil Nadu", href: null },
              ].map((c) => (
                <div key={c.label} style={{
                  display: "flex", alignItems: "flex-start", gap: "1rem",
                  background: d ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.8)",
                  border: d ? "1px solid rgba(99,102,241,0.2)" : "1px solid rgba(99,102,241,0.15)",
                  borderRadius: 12, padding: "1rem 1.1rem", marginBottom: "1rem",
                  backdropFilter: "blur(8px)",
                }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: "50%", flexShrink: 0,
                    background: "linear-gradient(135deg,#6366f1,#06b6d4)",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem",
                  }}>{c.icon}</div>
                  <div style={{ overflow: "hidden" }}>
                    <p style={{ fontSize: "0.7rem", color: d ? "#64748b" : "#94a3b8", margin: 0, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>{c.label}</p>
                    {c.href ? (
                      <a href={c.href} style={{ color: d ? "#e2e8f0" : "#1e293b", textDecoration: "none", fontSize: "0.88rem", fontWeight: 500, wordBreak: "break-all" }}>{c.value}</a>
                    ) : (
                      <p style={{ color: d ? "#e2e8f0" : "#1e293b", margin: 0, fontSize: "0.88rem", fontWeight: 500, lineHeight: 1.5 }}>{c.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              ...card(d),
              background: d ? "rgba(99,102,241,0.08)" : "rgba(99,102,241,0.05)",
              border: "1px solid rgba(99,102,241,0.3)",
            }}>
              <h3 style={{ color: d ? "#e2e8f0" : "#1e293b", marginTop: 0, marginBottom: "1rem", fontSize: "1rem" }}>Personal Profile</h3>
              {[
                ["Father's Name","Mr. V.J. Jayakumar"],
                ["Date of Birth","09 June 1988"],
                ["Nationality","Indian"],
                ["Religion","Christian"],
                ["Marital Status","Married"],
              ].map(([k,v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.25rem", padding: "0.5rem 0", borderBottom: d ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)" }}>
                  <span style={{ color: d ? "#64748b" : "#94a3b8", fontSize: "0.84rem" }}>{k}</span>
                  <span style={{ fontWeight: 600, fontSize: "0.84rem", color: d ? "#e2e8f0" : "#1e293b" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        textAlign: "center", padding: "2rem 1rem",
        borderTop: d ? "1px solid rgba(99,102,241,0.2)" : "1px solid rgba(99,102,241,0.15)",
        color: d ? "#475569" : "#94a3b8", fontSize: "0.84rem",
      }}>
        <p style={{ margin: 0 }}>
          Designed & crafted with ❤️ &nbsp;·&nbsp;
          <span style={{ color: "#6366f1", fontWeight: 600 }}>J. Gabriel Prabakaran</span>
          &nbsp;·&nbsp; © 2025 All Rights Reserved
        </p>
      </footer>
    </div>
  );
}

// ── Shared style helpers ──────────────────────────────────────────────────────
const sLabel = {
  fontSize: "0.78rem", letterSpacing: 4, textTransform: "uppercase",
  color: "#6366f1", fontWeight: 700, marginBottom: "0.5rem",
};

const sTitle = (d) => ({
  fontSize: "clamp(1.8rem,4vw,2.5rem)", fontWeight: 800, marginBottom: "2.5rem",
  color: d ? "#e2e8f0" : "#1e293b",
});

const card = (d) => ({
  background: d ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.8)",
  border: d ? "1px solid rgba(99,102,241,0.2)" : "1px solid rgba(99,102,241,0.15)",
  borderRadius: 16, padding: "1.4rem",
  backdropFilter: "blur(8px)",
});

const tagStyle = {
  display: "inline-block", padding: "0.22rem 0.7rem", borderRadius: 20,
  fontSize: "0.76rem", fontWeight: 600,
  background: "rgba(99,102,241,0.14)", color: "#818cf8",
  border: "1px solid rgba(99,102,241,0.3)",
  marginRight: 6, marginBottom: 6,
};