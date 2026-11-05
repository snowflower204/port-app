import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ahnros-pages.css";

const EMAIL = "ahnros.connect@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/hannah-hontiveros-82a755258/";
const BASE = "/images/projects/";

const PROJECTS = [
  {
    title: "ReceiptoChain", kind: "Event technology", icon: "✉",
    images: ["recieptochain.png"],
    text: "A digital receipt and transaction-management platform for events and organizations. QR-based records help track payments, reduce manual encoding, and keep finances organized beyond paper receipts and scattered spreadsheets."
  },
  {
    title: "Tropical Sagip", kind: "AI & climate learning", icon: "☀",
    images: ["tropicalsagip.png"],
    text: "An AI-driven, gamified learning platform that teaches typhoon preparedness and climate resilience through interactive activities on disaster risks, emergency procedures, and responsible community action."
  },
  {
    title: "CLENS Alpha", kind: "Community innovation", icon: "✿",
    images: ["clens-1.png","clens-1.jpg","clens-1.jpeg","clens-1.webp","clens-1"],
    text: "A smart waste-management platform designed to improve garbage collection and pickup coordination, monitor collection activities, and organize sanitation information for communities."
  },
  {
    title: "Bantay Baha", kind: "Early-warning systems", icon: "☂",
    images: ["bantaybaha.png"],
    text: "A bridge-based flood early-warning system for communities near flood-prone areas. Environmental monitoring supports timely alerts and preparation for rising water levels."
  },
  {
    title: "MyNaga Health Application", kind: "Health & community", icon: "♡",
    images: ["mynaga.png"],
    text: "A health-focused application developed during the MyNaga Hackathon. User interviews and beta testing helped identify community needs and shape an accessible digital health solution."
  },
  {
    title: "FIFA 20 Machine-Learning Project", kind: "Data & machine learning", icon: "✧",
    images: ["fifa-1.png","fifa-2.png","fifa-3.png"],
    text: "An analysis of the FIFA 20 player dataset comparing Linear Regression, Decision Tree, and Random Forest models using MAE, RMSE, and R²."
  },
  {
    title: "KNN Cardiovascular-Risk Classification", kind: "Data & machine learning", icon: "♡",
    images: ["knn.png","knn-1.png","knn-2.png"],
    text: "A K-Nearest Neighbors classification project exploring cardiovascular-risk categories using data preparation, training, predictions, and model evaluation."
  },
  {
    title: "EchoGlobe", kind: "Inclusive educational hardware", icon: "✦",
    images: ["echoglobe.png"],
    text: "An accessible educational globe combining touch-to-learn controls, narration, vibrations, lights, and braille to make geography, culture, history, and environmental education more inclusive.",
    award: "3rd Place · Hardware Education Ideathon"
  }
];

const PROGRAMS = [
  ["StellarPH PH100 Fellow","2026"],
  ["ASEAN AI Pioneers Week Delegate","August 12–15, 2026"],
  ["UNLEASH Philippines Talent Alumni","2025"],
  ["PyTorch Campus Labs Philippines First-Batch Ambassador","2026"],
  ["Young Innovator, MSU-IIT MYISAP","2024"],
  ["Young Startup Innovation Summer Workshop Participant","2024"]
];

const AWARDS = [
  ["Overall Second Place and Gold Award","Malaysia Virtual Innovation Competition"],
  ["Top 5 Young Scientist","Malaysia Virtual Innovation Competition"],
  ["Best Booth","Malaysia Virtual Innovation Competition"],
  ["Third Place","SIYENSIKULA Cryptography Competition"],
  ["Second Place","We.ek Hack Coding Competition — 2024"],
  ["First Runner-Up","CCS Project Pitching — 2024"],
  ["Second Runner-Up","QCSP Iligan Hackathon — 2025"],
  ["Top 15","MyNaga Hackathon Innovation — 2026"]
];

const LEADERSHIP = [
  { name:"Tesseract MSU-IIT", roles:[["President","2026–2027"]] },
  { name:"CCS Student Council", roles:[["Tabulation Head","August 2024–June 2025"],["Community Extension Affairs Chairperson","August 2025–2026"]] },
  { name:"Junior Information Technology Society", roles:[["Internal Affairs Officer","August 2023–January 2024"],["Budget and Finance Chairperson","February–August 2024"]] },
  { name:"DEVCON Philippines – Iligan Chapter", roles:[["Campus DEVCON Iligan Director","March 2025–Present"],["DEVCON Kids Iligan Lead",""],["DEVCON Kids Volunteer and Mentor",""],["Campus DEVCON Training Host",""]] },
  { name:"Learning Assistance Volunteers", roles:[["Public Information Officer","May 2025–March 2026"],["Java, Python, OOP, and DSA Tutor",""],["LAV Crash Tutorial Facilitator","November 2025"]] },
  { name:"Other Leadership Roles", roles:[["Vice President for External Affairs, ElectroBotz Robotics Club","September 2022–March 2023"],["Lead Data Scientist Ambassador, PyTorch Campus Labs Philippines","May 2026–Present"],["Team Leader, Publications Committee, IEEE × QCSP",""]] }
];

const QUANTUM = [
  ["Quantum Research Volunteer","November 2025–January 2026"],
  ["QCSP Volunteer","October 2025–Present"],
  ["Creatives Team Member and Facilitator, my.Quantum","February 2026–Present"],
  ["Host, QCSP Lecture Series","March 2026"],
  ["Technical Team Member and Facilitator, QCSP Davao Hackathon","June 27, 2026"],
  ["Organizer and Publications Contributor, QISTCon.PH","November 2026"]
];

const SPEAKING = [
  ["Speaker, EmpowHER","2025"],
  ["Host, EmpowHER","2026"],
  ["Panel of Judges, EmpowHER","2026"],
  ["Panelist, ISY128","December 2025"],
  ["Organizer and Mentor, Arduino Bootcamp ICNHS","2025"],
  ["DEVCON Kids Mentor",""],
  ["micro:bit Lead Learner",""]
];

function ImageWithFallback({files,title}) {
  const [index,setIndex] = useState(0);
  const [failed,setFailed] = useState(false);
  if(failed) return <div className="ahn-project-no-photo" aria-label={"Photo coming soon for "+title}><span>✿</span><small>PHOTO COMING SOON</small></div>;
  return <img src={BASE+files[index]} alt={title+" project documentation"} loading="lazy"
    onError={()=>{if(index<files.length-1)setIndex(v=>v+1);else setFailed(true);}} />;
}

function ProjectPhoto({project}) {
  const isMulti=project.title.startsWith("FIFA")||project.title.startsWith("KNN");
  return <div className={isMulti?"ahn-build-gallery multiple":"ahn-build-gallery single"}>{isMulti
    ? project.images.map((name,i)=><div className="ahn-build-photo" key={name}><ImageWithFallback files={[name]} title={project.title+" image "+(i+1)}/></div>)
    : <div className="ahn-build-photo"><ImageWithFallback files={project.images} title={project.title}/></div>}
  </div>;
}

function EntryList({entries}) {
  return <div className="ahn-journal-list">{entries.map(([name,date],i)=><div className="ahn-journal-row" key={name+i}><strong>{name}</strong><span>{date}</span></div>)}</div>;
}

function ChapterHeader({chapter,title,emphasis,description}) {
  return <div className="ahn-chapter-heading">
    <div className="ahn-chapter-decoration" aria-hidden="true">✳ ✦ ✿</div>
    <div className="ahn-chapter-heading-content">
      <span className="eyebrow">AHNROS / {chapter.toUpperCase()} DIARY</span>
      <h1>{title} <em>{emphasis}</em></h1>
      <p>{description}</p>
      <Link to="/" className="ahn-home-back">← Back to my portfolio</Link>
    </div>
    <div className="ahn-chapter-footer"><span>HANNAH A. HONTIVEROS</span><span>TURN THE PAGE ↘</span></div>
  </div>;
}

function ChapterSection({index,title,children,description}) {
  return <section className="ahn-chapter-section">
    <div className="ahn-chapter-section-title"><span className="eyebrow">{index} / SCRAPBOOK NOTES</span><h2>{title}</h2>{description&&<p>{description}</p>}</div>
    {children}
  </section>;
}

function ChapterFooter({type}) {
  const build=type==="build";
  return <section className="ahn-chapter-cta">
    <span>✿ ONE MORE THING...</span>
    <h2>{build?"Have an idea?":"Let's make an impact."}<br/><em>{build?"Let's create together.":"Lead with purpose."}</em></h2>
    <div className="ahn-chapter-actions">
      <a href={"mailto:"+EMAIL+"?subject="+encodeURIComponent(build?"Build Collaboration Inquiry":"Leadership Collaboration Inquiry")}>{build?"Build with Me":"Lead with Me"} ↗</a>
      <Link to={build?"/lead":"/build"}>{build?"Explore my leadership journal":"Explore my projects"} ↗</Link>
      <Link to="/">Back to homepage ↗</Link>
    </div>
  </section>;
}

function ChapterNav() {
  const [open,setOpen]=useState(false);
  return <header className="ahn-chapter-nav">
    <Link to="/" className="ahn-chapter-brand" onClick={()=>setOpen(false)}>Ahnros<span>.</span></Link>
    <button className="ahn-chapter-menu" type="button" aria-expanded={open} onClick={()=>setOpen(!open)}>Menu {open?"−":"+"}</button>
    <nav className={open?"open":""} aria-label="Chapter navigation">
      <Link to="/" onClick={()=>setOpen(false)}>Home</Link>
      <Link to="/build" onClick={()=>setOpen(false)}>Build</Link>
      <Link to="/lead" onClick={()=>setOpen(false)}>Lead</Link>
      <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">Connect ↗</a>
    </nav>
  </header>;
}

function ChapterLayout({children,type}) {
  useEffect(()=>{window.scrollTo(0,0);document.title=(type==="build"?"Build":"Lead")+" | Ahnros — Hannah A. Hontiveros";return()=>{document.title="Ahnros | Hannah A. Hontiveros";};},[type]);
  return <div className={"ahn-chapter-page ahn-"+type+"-page"}>
    <ChapterNav/>
    <main>{children}</main>
    <footer className="ahn-chapter-site-footer"><span>MADE WITH CURIOSITY & A LITTLE MAGIC ✳</span><span>© {new Date().getFullYear()} Hannah A. Hontiveros</span><Link to="/">BACK HOME ↑</Link></footer>
  </div>;
}

export function BuildPage() {
  return <ChapterLayout type="build">
    <ChapterHeader chapter="build" title="Ideas worth" emphasis="building." description="A little gallery of inventions, experiments, research, and ideas that found their way into the world."/>
    <ChapterSection index="01" title="Technology & Innovation Projects" description="Each project started with a curious question. Here are some of the stories I'm building.">
      <div className="ahn-build-projects">{PROJECTS.map((p,i)=><article className="ahn-build-project" key={p.title}>
        <div className="ahn-build-project-copy">
          <div className="ahn-build-project-top"><span>PROJECT FILE {String(i+1).padStart(2,"0")}</span><span aria-hidden="true">{p.icon}</span></div>
          <small>{p.kind}</small><h3>{p.title}</h3><p>{p.text}</p>
          {p.award&&<strong className="ahn-award-sticker">✦ {p.award}</strong>}
        </div>
        <ProjectPhoto project={p}/>
      </article>)}</div>
    </ChapterSection>
    <ChapterSection index="02" title="Fellowships, Delegations & Programs">
      <div className="ahn-journal-panel"><EntryList entries={PROGRAMS}/></div>
    </ChapterSection>
    <ChapterSection index="03" title="Awards & Academic Achievements" description="These recognitions are listed separately from projects when the award-project connection hasn't been established.">
      <div className="ahn-journal-panel"><EntryList entries={AWARDS}/></div>
    </ChapterSection>
    <ChapterFooter type="build"/>
  </ChapterLayout>;
}

export function LeadPage() {
  return <ChapterLayout type="lead">
    <ChapterHeader chapter="lead" title="People, purpose" emphasis="& progress." description="My leadership journal: communities, lessons, events, and the people who have helped me grow along the way."/>
    <ChapterSection index="01" title="Leadership & Organizational Experience" description="The roles that have shaped how I listen, create space for others, and lead with purpose.">
      <div className="ahn-lead-timeline">{LEADERSHIP.map((org,i)=><article className="ahn-timeline-entry" key={org.name}>
        <div className="ahn-timeline-marker" aria-hidden="true">{i%2===0?"✳":"✦"}</div>
        <div className="ahn-timeline-card"><span>CHAPTER {String(i+1).padStart(2,"0")}</span><h3>{org.name}</h3><EntryList entries={org.roles}/></div>
      </article>)}</div>
    </ChapterSection>
    <ChapterSection index="02" title="Quantum Computing Experience">
      <div className="ahn-journal-panel"><EntryList entries={QUANTUM}/></div>
    </ChapterSection>
    <ChapterSection index="03" title="Speaking, Hosting, Judging & Mentoring">
      <div className="ahn-journal-panel"><EntryList entries={SPEAKING}/></div>
    </ChapterSection>
    <ChapterFooter type="lead"/>
  </ChapterLayout>;
}
