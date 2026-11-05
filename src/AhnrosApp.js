import React, { useEffect, useRef, useState } from "react";
import "./homepage.css";
import "./scrapbook.css";
import "./ahnros-finish.css";

const PROFILE = {
  url: "https://hontiveros-hannah-portfolio.vercel.app/",
  email: "ahnros.connect@gmail.com",
  linkedin: "https://www.linkedin.com/in/hannah-hontiveros-82a755258/",
  github: "https://github.com/snowflower204",
};
const FOLDERS = [
  ["01","Innovator","innovate","IDEAS & INNOVATION","I imagine possibilities and build solutions."],
  ["02","Creator","create","DESIGN & CREATIVITY","I turn ideas into meaningful experiences."],
  ["03","Leader","lead","COMMUNITY & IMPACT","I bring people together and empower them."],
  ["04","Explorer","explore","LEARNING & DISCOVERY","I learn, discover, and grow beyond boundaries."],
];
const INTERESTS = ["Web Dev","Machine Learning","Data Analysis","Cloud","Quantum","Robotics","Research","Startups","Community","Mentoring","Design","Innovation"];
const COLLAB = [
  ["Build with Me","IDEAS INTO REALITY","Have an idea worth building? Let's turn curiosity into something meaningful.", "/build"],
  ["Lead with Me","PEOPLE & PURPOSE","Great things happen when people come together. Let's lead with purpose.", "/lead"],
  ["Connect with Me","MEANINGFUL CONVERSATIONS","Every meaningful connection starts with a conversation.", PROFILE.linkedin],
];
const qrSource = "https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=16&data=" + encodeURIComponent(PROFILE.url);

function Photo({name,index,category}) {
  return <img src={`/images/highlights/${name}.jpg`} alt={`${category} photograph ${index}`} loading="lazy" />;
}

async function copyValue(value) {
  if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
  await navigator.clipboard.writeText(value);
}

function ShareDialog({close}) {
  const box = useRef(null);
  const [status,setStatus] = useState("");
  useEffect(()=>{
    const previous=document.activeElement;
    box.current?.focus();
    const onKey=e=>{
      if(e.key==="Escape") close();
      if(e.key==="Tab" && box.current) {
        const controls=[...box.current.querySelectorAll("button,a,input")].filter(x=>!x.disabled);
        if(!controls.length)return;
        if(e.shiftKey && document.activeElement===controls[0]){e.preventDefault();controls[controls.length-1].focus();}
        else if(!e.shiftKey && document.activeElement===controls[controls.length-1]){e.preventDefault();controls[0].focus();}
      }
    };
    document.addEventListener("keydown",onKey);
    return ()=>{document.removeEventListener("keydown",onKey);previous?.focus?.();};
  },[close]);
  async function share(){
    if(navigator.share){
      try{await navigator.share({title:"Ahnros — Hannah Hontiveros",url:PROFILE.url});setStatus("Shared.");}
      catch(error){if(error?.name!=="AbortError")setStatus("Sharing unavailable. Try Copy Link.");}
    }else{
      try{await copyValue(PROFILE.url);setStatus("Link copied for sharing.");}
      catch{setStatus("Copy unavailable. Select the URL above.");}
    }
  }
  return <div className="ahn-overlay" onMouseDown={e=>{if(e.target===e.currentTarget)close();}}>
    <section className="ahn-dialog" role="dialog" aria-modal="true" aria-labelledby="ahn-dialog-title" tabIndex={-1} ref={box}>
      <button className="ahn-x" aria-label="Close" type="button" onClick={close}>×</button>
      <span className="eyebrow">PASS IT ALONG ✳</span>
      <h2 id="ahn-dialog-title">Share My <em>Portfolio.</em></h2>
      <img className="ahn-qr" src={qrSource} alt={"QR code linking to "+PROFILE.url} width="260" height="260" />
      <p>Scan to explore my little corner of the internet.</p>
      <input value={PROFILE.url} readOnly onFocus={e=>e.target.select()} aria-label="Portfolio link" />
      <div className="ahn-dialog-buttons">
        <button type="button" onClick={async()=>{try{await copyValue(PROFILE.url);setStatus("Link copied!");}catch{setStatus("Copy unavailable. Select the link above.");}}}>Copy Link</button>
        <button type="button" onClick={share}>Share</button>
        <a href={qrSource} target="_blank" rel="noopener noreferrer">Open QR Image ↗</a>
      </div>
      <p role="status" aria-live="polite" className="ahn-feedback">{status}</p>
    </section>
  </div>;
}

export default function AhnrosApp() {
  const [menu,setMenu]=useState(false);
  const [dialog,setDialog]=useState(false);
  const [emailStatus,setEmailStatus]=useState("");
  const hero=useRef(null);
  useEffect(()=>{
    const elements=document.querySelectorAll(".reveal");
    if(!("IntersectionObserver" in window)||window.matchMedia("(prefers-reduced-motion: reduce)").matches){
      elements.forEach(el=>el.classList.add("is-visible"));return;
    }
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target);}
    }),{threshold:.1});
    elements.forEach(el=>observer.observe(el));
    return()=>observer.disconnect();
  },[]);
  function moveInterests(event){
    if(event.pointerType==="touch"||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
    hero.current?.querySelectorAll(".floating-interest").forEach(el=>{
      const r=el.getBoundingClientRect(),dx=r.left+r.width/2-event.clientX,dy=r.top+r.height/2-event.clientY;
      const distance=Math.hypot(dx,dy),power=distance<180?(1-distance/180)*48:0;
      el.style.setProperty("--push-x",`${dx/Math.max(distance,1)*power}px`);
      el.style.setProperty("--push-y",`${dy/Math.max(distance,1)*power}px`);
    });
  }
  function resetInterests(){
    hero.current?.querySelectorAll(".floating-interest").forEach(el=>{
      el.style.setProperty("--push-x","0px");el.style.setProperty("--push-y","0px");
    });
  }
  const closeMenu=()=>setMenu(false);
  return <div className="portfolio-site ahnros-site">
    <header className="site-header">
      <a className="site-brand" href="#home" onClick={closeMenu}>Ahnros<span>.</span></a>
      <button type="button" className="mobile-menu-button" aria-controls="ahn-nav" aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?"Close":"Menu"}</button>
      <nav id="ahn-nav" aria-label="Main navigation" className={`site-nav ${menu?"open":""}`}>
        <a href="#home" onClick={closeMenu}>Home</a>
        <a href="#about" onClick={closeMenu}>About</a>
        <a href="#highlights" onClick={closeMenu}>Highlights</a>
        <a href="#collaborate" onClick={closeMenu}>Build · Lead · Connect</a>
        <button className="ahn-nav-share" type="button" onClick={()=>{closeMenu();setDialog(true);}}>Share Portfolio ↗</button>
      </nav>
    </header>
    <main>
      <section id="home" className="scrapbook-hero" ref={hero} onPointerMove={moveInterests} onPointerLeave={resetInterests}>
        <div className="scrapbook-paper">
          <div className="notebook-lines" aria-hidden="true" />
          <div className="interest-field" aria-hidden="true">{INTERESTS.map((word,i)=><span className={`floating-interest interest-${i+1}`} key={word}>{word}</span>)}</div>
          <div className="identity-field">
            <span className="identity-bubble bubble-innovator">✳ Innovator</span>
            <span className="identity-bubble bubble-creator">✦ Creator</span>
            <span className="identity-bubble bubble-leader">✳ Leader</span>
            <span className="identity-bubble bubble-explorer">✦ Explorer</span>
          </div>
          <div className="scrapbook-hero-content">
            <span className="scrapbook-intro">my name is</span>
            <h1>HANNAH</h1>
            <div className="hero-center-logo"><img className="hero-center-logo-image" src="/logo.png" alt="Hannah's rotating portfolio logo" /></div>
            <p className="scrapbook-subtitle">just a girl who loves learning</p>
            <a className="scrapbook-cta" href="#about">Explore my world <span aria-hidden="true">↗</span></a>
          </div>
          <div className="scrapbook-hero-footer"><span>HANNAH A. HONTIVEROS</span><span>SCROLL TO EXPLORE ↓</span></div>
        </div>
      </section>
      <section id="about" className="about-section section-spacing">
        <div className="section-heading reveal"><span className="eyebrow">01 / THE PERSON</span><h2>A Little <em>About Me.</em></h2></div>
        <div className="about-layout">
          <div className="about-photo-frame reveal">
            <img src="/images/hannah-portrait.png" alt="Hannah Hontiveros" className="portrait-image" />
            <img src="/logo.png" alt="" aria-hidden="true" className="about-floating-logo"/>
          </div>
          <div className="about-story glass-panel reveal">
            <span className="eyebrow">HELLO, WORLD!</span>
            <h3>Genius? No.<br/><span>Curious? Always.</span></h3>
            <p>Hi! I'm Hannah A. Hontiveros, but you can call me Hann.</p>
            <p>I'm an Information Technology student, researcher, and startup builder who loves turning ideas into solutions. My interests lie in software development, data, networks, and emerging technologies.</p>
            <p>Beyond projects, I love bringing people together through mentoring, organizing events, and leading student communities. I want my work to create something meaningful.</p>
            <p>I'm still learning, experimenting, and figuring things out along the way.</p>
            <a className="text-link" href="#highlights">Explore my highlights ↗</a>
          </div>
        </div>
      </section>
      <section id="highlights" className="featured-highlights">
        <div className="featured-heading reveal"><span className="eyebrow">02 / THE COLLECTION</span><h2>Featured <em>Highlights.</em></h2><p>Four little folders filled with ideas, people, and adventures. Scroll through my collection.</p></div>
        <div className="folder-grid">
          {FOLDERS.map(([id,title,stem,category,description],index)=><article className={`feature-folder folder-${title.toLowerCase()}`} key={id} style={{"--folder-index":index}}>
            <div className="folder-tab"><span>✳ {title}</span></div>
            <div className="folder-body">
              <div className="folder-meta"><span>FILE {id} / 04</span><span>HANNAH'S ARCHIVE ✳</span></div>
              <div className="folder-text"><span className="folder-category">{category}</span><h3>{title}</h3><p>{description}</p><span className="ahn-folder-sticker">A little piece of my world ✦</span></div>
              <div className="ahn-photo-collage">{[1,2,3].map(n=><div className={`ahn-polaroid ahn-polaroid-${n}`} key={n}><Photo name={`${stem}-${n}`} index={n} category={title}/></div>)}</div>
              <div className="folder-bottom"><span>COLLECTION NO. {id}</span><span aria-hidden="true">✳</span></div>
            </div>
          </article>)}
        </div>
      </section>
      <section id="collaborate" className="ahn-collaborate">
        <div className="ahn-intro reveal"><span className="eyebrow">03 / LET'S MAKE SOMETHING MATTER</span><h2>Build, Lead <em>& Connect.</em></h2><p>Build, Lead and Connect with BLC Ahnros</p></div>
        <div className="ahn-collab-grid">{COLLAB.map(([name,category,description,url],i)=><article className="ahn-collab-card" key={name}><small>0{i+1} / {category}</small><span className="ahn-spark" aria-hidden="true">✳</span><h3>{name}</h3><p>{description}</p><a href={url} {...(url.startsWith("https")?{target:"_blank",rel:"noopener noreferrer"}:{})}>{name} ↗</a></article>)}</div>
      </section>
      <section id="contact" className="ahn-contact">
        <div className="ahn-calling-card reveal">
          <div className="ahn-card-top"><strong>Ahnros<span>.</span></strong><small>LET'S CONNECT ✳</small></div>
          <div className="ahn-card-main"><div><span className="eyebrow">A LITTLE CARD FROM ME TO YOU</span><h2>Hannah A.<br/><em>Hontiveros.</em></h2><p>Build, Lead and Connect</p></div>
            <div className="ahn-details"><a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a><a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a><button type="button" onClick={async()=>{try{await copyValue(PROFILE.email);setEmailStatus("Email copied!");}catch{setEmailStatus("Copy unavailable. Select the email above.");}}}>Copy Email</button><span className="ahn-feedback" role="status">{emailStatus}</span></div>
          </div>
          <div className="ahn-card-bottom"><a href={COLLAB[0][3]}>Build with Me ↗</a><a href={COLLAB[1][3]}>Lead with Me ↗</a><a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">Connect with Me ↗</a><button type="button" onClick={()=>setDialog(true)}>Share Portfolio + QR ↗</button></div>
        </div>
      </section>
    </main>
    <footer className="site-footer"><span>© {new Date().getFullYear()} Hannah A. Hontiveros</span><span>Made with curiosity & creativity.</span><a href="#home">Back to top ↑</a></footer>
    {dialog&&<ShareDialog close={()=>setDialog(false)}/>}
  </div>;
}
