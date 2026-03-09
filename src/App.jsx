import { useState } from "react";

const AFFIRMATIONS = [
  "You are my undying witch, and I am your curly-haired nerd ✨",
  "One day, I'll come to Bhandup on my scooty, and then we'll roam around so much! 🛵",
  "You are such a pretty princess 👑",
  "Meow Meow 🐾",
  "You make everything more beautiful 🌸",
  "You're stronger than you know 🌿",
  "Everything you touch blooms 🌺",
  "The world is lucky to have you 🌍",
];

// Each flower has a fixed absolute position (vw/vh) and a fixed bubble anchor
// Carefully laid out so nothing overlaps
const FLOWERS = [
  { id: 0, name: "Tulip",         vx: 7,  vy: 68, scale: 1.0, zBase: 3,
    bubble: { x: 12, y: 42 } },
  { id: 1, name: "Sunflower",     vx: 19, vy: 75, scale: 0.65, zBase: 1,
    bubble: { x: 24, y: 30 } },
  { id: 2, name: "Cherry Blossom",vx: 32, vy: 71, scale: 0.80, zBase: 2,
    bubble: { x: 22, y: 52 } },
  { id: 3, name: "Lavender",      vx: 48, vy: 65, scale: 0.55, zBase: 1,
    bubble: { x: 50, y: 22 } },
  { id: 4, name: "Lotus",         vx: 55, vy: 78, scale: 1.0,  zBase: 3,
    bubble: { x: 38, y: 60 } },
  { id: 5, name: "Daisy",         vx: 67, vy: 76, scale: 1.0,  zBase: 3,
    bubble: { x: 57, y: 42 } },
  { id: 6, name: "Rose",          vx: 78, vy: 70, scale: 0.75, zBase: 2,
    bubble: { x: 72, y: 30 } },
  { id: 7, name: "Poppy",         vx: 90, vy: 67, scale: 0.55, zBase: 1,
    bubble: { x: 80, y: 15 } },
];

// ── Flower SVGs (all drawn in a -40..40 x -90..0 box, stem from 0,0 up) ──

function Tulip({ bloomed }) {
  return (
    <g>
      <line x1="0" y1="0" x2="0" y2="90" stroke="#388e3c" strokeWidth="4" strokeLinecap="round"/>
      <ellipse cx="10" cy="58" rx="11" ry="5" fill="#4caf50" transform="rotate(30,10,58)"/>
      <ellipse cx="-10" cy="70" rx="11" ry="5" fill="#4caf50" transform="rotate(-30,-10,70)"/>
      {bloomed ? (
        <g style={{animation:"pop .6s ease both"}}>
          <path d="M0,-5 Q-22,-38 -13,-68 Q-4,-52 0,-36 Z" fill="#e53935" opacity=".9"/>
          <path d="M0,-5 Q22,-38 13,-68 Q4,-52 0,-36 Z" fill="#ef5350" opacity=".9"/>
          <path d="M-7,-12 Q0,-62 7,-12 Z" fill="#ff8a80" opacity=".7"/>
          <line x1="0" y1="-5" x2="0" y2="-58" stroke="#ffd54f" strokeWidth="1.5"/>
        </g>
      ) : <Bud color="#e53935"/>}
    </g>
  );
}

function Sunflower({ bloomed }) {
  const petals = Array.from({length:16},(_,i)=>i*(360/16));
  return (
    <g>
      <line x1="0" y1="0" x2="0" y2="90" stroke="#558b2f" strokeWidth="5" strokeLinecap="round"/>
      <ellipse cx="-9" cy="52" rx="10" ry="5" fill="#66bb6a" transform="rotate(-35,-9,52)"/>
      {bloomed ? <>
        {petals.map((a,i)=>{
          const r=a*Math.PI/180;
          return <ellipse key={i} cx={Math.cos(r)*22} cy={Math.sin(r)*22-8}
            rx="7" ry="14" fill="#FFD600" opacity=".9"
            transform={`rotate(${a},${Math.cos(r)*22},${Math.sin(r)*22-8})`}
            style={{animation:`pop .4s ease ${i*.025}s both`}}/>;
        })}
        <circle cy="-8" r="16" fill="#5D4037"/>
        <circle cy="-8" r="11" fill="#6D4C41"/>
        <circle cy="-8" r="6"  fill="#4E342E"/>
      </> : <Bud color="#FFD600"/>}
    </g>
  );
}

function CherryBlossom({ bloomed }) {
  const angles=[0,72,144,216,288];
  return (
    <g>
      <line x1="0" y1="0" x2="0" y2="85" stroke="#795548" strokeWidth="4" strokeLinecap="round"/>
      <path d="M0,38 Q16,24 20,8" stroke="#795548" strokeWidth="3" fill="none" strokeLinecap="round"/>
      {bloomed ? <>
        {angles.map((a,i)=>{
          const r=a*Math.PI/180;
          return <ellipse key={i} cx={Math.cos(r)*16} cy={Math.sin(r)*16-10}
            rx="9" ry="13" fill="#f8bbd0" stroke="#f48fb1" strokeWidth=".5"
            transform={`rotate(${a+90},${Math.cos(r)*16},${Math.sin(r)*16-10})`}
            style={{animation:`pop .5s ease ${i*.07}s both`}}/>;
        })}
        <circle cy="-10" r="5" fill="#f06292"/>
        {angles.map((_,i)=>(
          <line key={i} x1="0" y1="-10"
            x2={Math.cos(i*72*Math.PI/180)*10} y2={Math.sin(i*72*Math.PI/180)*10-10}
            stroke="#ffd54f" strokeWidth="1"/>
        ))}
      </> : <Bud color="#f8bbd0"/>}
    </g>
  );
}

function Lavender({ bloomed }) {
  return (
    <g>
      <line x1="0" y1="0" x2="0" y2="90" stroke="#558b2f" strokeWidth="3" strokeLinecap="round"/>
      <line x1="0" y1="30" x2="-12" y2="48" stroke="#558b2f" strokeWidth="2" strokeLinecap="round"/>
      <line x1="0" y1="40" x2="12" y2="54" stroke="#558b2f" strokeWidth="2" strokeLinecap="round"/>
      {bloomed
        ? Array.from({length:10}).map((_,i)=>(
            <ellipse key={i} cx={i%2===0?-5:5} cy={-4-i*8}
              rx="5" ry="7" fill={`hsl(${265+i*3},60%,${65+i*2}%)`}
              style={{animation:`pop .3s ease ${i*.05}s both`}}/>
          ))
        : <Bud color="#ce93d8"/>}
    </g>
  );
}

function Lotus({ bloomed }) {
  return (
    <g>
      <line x1="0" y1="0" x2="0" y2="80" stroke="#388e3c" strokeWidth="5" strokeLinecap="round"/>
      {bloomed ? <>
        {[-60,-30,0,30,60].map((a,i)=>(
          <ellipse key={i} cx={Math.sin(a*Math.PI/180)*20} cy={-15-Math.cos(a*Math.PI/180)*10}
            rx="10" ry="22" fill="#f48fb1" opacity=".7"
            transform={`rotate(${a},${Math.sin(a*Math.PI/180)*20},${-15-Math.cos(a*Math.PI/180)*10})`}
            style={{animation:`pop .5s ease ${i*.07}s both`}}/>
        ))}
        {[-35,0,35].map((a,i)=>(
          <ellipse key={i} cx={Math.sin(a*Math.PI/180)*10} cy={-20-Math.cos(a*Math.PI/180)*8}
            rx="8" ry="18" fill="#f06292" opacity=".9"
            transform={`rotate(${a},${Math.sin(a*Math.PI/180)*10},${-20-Math.cos(a*Math.PI/180)*8})`}
            style={{animation:`pop .5s ease ${i*.09}s both`}}/>
        ))}
        <circle cy="-22" r="6" fill="#fff176"/>
        <circle cy="-22" r="3" fill="#ffd54f"/>
      </> : <Bud color="#f48fb1"/>}
    </g>
  );
}

function Daisy({ bloomed }) {
  const petals=Array.from({length:12},(_,i)=>i*30);
  return (
    <g>
      <line x1="0" y1="0" x2="0" y2="90" stroke="#558b2f" strokeWidth="4" strokeLinecap="round"/>
      <ellipse cx="11" cy="56" rx="11" ry="4" fill="#7cb342" transform="rotate(25,11,56)"/>
      {bloomed ? <>
        {petals.map((a,i)=>{
          const r=a*Math.PI/180;
          return <ellipse key={i} cx={Math.cos(r)*18} cy={Math.sin(r)*18-5}
            rx="5" ry="12" fill="white" stroke="#e0e0e0" strokeWidth=".5"
            transform={`rotate(${a},${Math.cos(r)*18},${Math.sin(r)*18-5})`}
            style={{animation:`pop .4s ease ${i*.04}s both`}}/>;
        })}
        <circle cy="-5" r="10" fill="#FDD835"/>
        <circle cy="-5" r="6"  fill="#F9A825"/>
      </> : <Bud color="#FDD835"/>}
    </g>
  );
}

function Rose({ bloomed }) {
  return (
    <g>
      <line x1="0" y1="0" x2="0" y2="88" stroke="#388e3c" strokeWidth="4" strokeLinecap="round"/>
      <line x1="0" y1="50" x2="15" y2="60" stroke="#388e3c" strokeWidth="2"/>
      <ellipse cx="20" cy="57" rx="9" ry="5" fill="#66bb6a" transform="rotate(20,20,57)"/>
      {bloomed ? <>
        {[0,60,120,180,240,300].map((a,i)=>{
          const r=a*Math.PI/180;
          return <ellipse key={i} cx={Math.cos(r)*18} cy={Math.sin(r)*18-8}
            rx="12" ry="16" fill="#e53935" opacity=".75"
            transform={`rotate(${a+90},${Math.cos(r)*18},${Math.sin(r)*18-8})`}
            style={{animation:`pop .5s ease ${i*.05}s both`}}/>;
        })}
        {[30,90,150,210,270,330].map((a,i)=>{
          const r=a*Math.PI/180;
          return <ellipse key={i} cx={Math.cos(r)*10} cy={Math.sin(r)*10-8}
            rx="9" ry="13" fill="#ef5350" opacity=".85"
            transform={`rotate(${a+90},${Math.cos(r)*10},${Math.sin(r)*10-8})`}/>;
        })}
        <circle cy="-8" r="7" fill="#c62828"/>
        <path d="M-3,-12 Q3,-16 4,-8 Q5,-2 0,-4 Q-5,-6 -3,-12" fill="#b71c1c"/>
      </> : <Bud color="#e53935"/>}
    </g>
  );
}

function Poppy({ bloomed }) {
  return (
    <g>
      <path d="M0,0 Q5,-30 0,-60 Q-5,-30 0,0" stroke="#558b2f" strokeWidth="3" fill="none"/>
      <line x1="0" y1="0" x2="0" y2="85" stroke="#558b2f" strokeWidth="3" strokeLinecap="round"/>
      {bloomed ? <>
        <ellipse cx="-16" cy="-62" rx="14" ry="18" fill="#ff5722" opacity=".9" transform="rotate(-20,-16,-62)" style={{animation:"pop .5s ease both"}}/>
        <ellipse cx="16"  cy="-62" rx="14" ry="18" fill="#ff7043" opacity=".9" transform="rotate(20,16,-62)"   style={{animation:"pop .5s ease .05s both"}}/>
        <ellipse cx="-8"  cy="-78" rx="13" ry="17" fill="#ff5722" opacity=".85" transform="rotate(-10,-8,-78)" style={{animation:"pop .5s ease .1s both"}}/>
        <ellipse cx="8"   cy="-78" rx="13" ry="17" fill="#ff7043" opacity=".85" transform="rotate(10,8,-78)"   style={{animation:"pop .5s ease .15s both"}}/>
        <circle cy="-68" r="8" fill="#212121"/>
        <circle cy="-68" r="5" fill="#37474f"/>
        {Array.from({length:8}).map((_,i)=>(
          <line key={i}
            x1={Math.cos(i*45*Math.PI/180)*5}  y1={Math.sin(i*45*Math.PI/180)*5-68}
            x2={Math.cos(i*45*Math.PI/180)*10} y2={Math.sin(i*45*Math.PI/180)*10-68}
            stroke="#ffcc02" strokeWidth="1.5"/>
        ))}
      </> : <Bud color="#ff5722"/>}
    </g>
  );
}

function Bud({ color }) {
  return (
    <ellipse cy="-12" rx="6" ry="10" fill={color} opacity=".55">
      <animate attributeName="ry" values="8;13;8" dur="2s" repeatCount="indefinite"/>
    </ellipse>
  );
}

const FLOWER_COMPONENTS = {
  Tulip: Tulip, Sunflower: Sunflower, "Cherry Blossom": CherryBlossom,
  Lavender: Lavender, Lotus: Lotus, Daisy: Daisy, Rose: Rose, Poppy: Poppy,
};

// ── Main ──
export default function Garden() {
  const [bloomed, setBloomed] = useState({});
  const [allDone, setAllDone] = useState(false);

  const bloom = (id) => {
    if (bloomed[id]) return;
    const next = { ...bloomed, [id]: true };
    setBloomed(next);
    if (Object.keys(next).length === FLOWERS.length) setTimeout(() => setAllDone(true), 900);
  };

  return (
    <div style={{
      width:"100vw", height:"100vh", overflow:"hidden", position:"relative",
      background:"linear-gradient(180deg,#fce4ec 0%,#fdf6f9 35%,#e8f5e9 75%,#c8e6c9 100%)",
      fontFamily:"'Dancing Script',Georgia,serif",
      colorScheme:"light",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500;700&family=Lora:ital@0;1&display=swap');
        @keyframes pop { from{transform:scale(0) rotate(-15deg);opacity:0} to{transform:scale(1) rotate(0deg);opacity:1} }
        @keyframes floatUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes sway { 0%,100%{transform:rotate(-1.5deg)} 50%{transform:rotate(1.5deg)} }
        @keyframes fall { 0%{transform:translateY(-10px) rotate(0deg);opacity:.65} 100%{transform:translateY(110vh) rotate(540deg);opacity:0} }
        @keyframes pulse { 0%,100%{text-shadow:0 2px 20px rgba(192,98,122,.3)} 50%{text-shadow:0 2px 40px rgba(192,98,122,.6)} }
        
        .flower-container {
          position: relative;
        }
        .flower-tooltip {
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(90, 48, 88, 0.85);
          color: white;
          padding: 4px 10px;
          border-radius: 8px;
          font-size: 12px;
          font-family: 'Lora', serif;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease, transform 0.3s ease;
          white-space: nowrap;
          z-index: 100;
        }
        .flower-container:hover .flower-tooltip {
          opacity: 1;
          transform: translateX(-50%) translateY(-10px);
        }
      `}</style>

      {/* Falling petals */}
      {Array.from({length:14}).map((_,i)=>(
        <div key={i} style={{
          position:"absolute", borderRadius:"50% 0 50% 0", pointerEvents:"none",
          width:`${8+(i%4)*3}px`, height:`${11+(i%3)*4}px`,
          background:`hsl(${340+(i*17)%40},75%,${72+(i%3)*5}%)`,
          left:`${(i*7.3)%100}%`, top:"-20px", opacity:.55,
          animation:`fall ${5+(i%4)}s linear ${i*.7}s infinite`,
        }}/>
      ))}

      {/* Title */}
      <div style={{position:"absolute",top:"3%",left:0,right:0,textAlign:"center",zIndex:10,animation:"pulse 3s ease-in-out infinite"}}>
        <div style={{fontFamily:"'Dancing Script',cursive",fontSize:"clamp(24px,5vw,50px)",color:"#c0627a",fontWeight:700}}>
          A Garden Just For You 🌸
        </div>
        <div style={{fontFamily:"'Lora',serif",fontSize:"clamp(11px,2vw,14px)",color:"#a07880",marginTop:"4px",fontStyle:"italic"}}>
          Tap each flower to make it bloom ✨
        </div>
        <div style={{display:"flex",gap:"7px",justifyContent:"center",marginTop:"8px"}}>
          {FLOWERS.map(f=>(
            <div key={f.id} style={{
              width:"9px",height:"9px",borderRadius:"50%",transition:"all .4s",
              background:bloomed[f.id]?"#e57fa0":"rgba(229,127,160,.25)",
              boxShadow:bloomed[f.id]?"0 0 8px #e57fa0":"none",
            }}/>
          ))}
        </div>
      </div>

      {/* ── Affirmation bubbles — absolutely positioned in viewport coords, completely independent ── */}
      {FLOWERS.map(flower => bloomed[flower.id] ? (
        <div key={`b${flower.id}`} style={{
          position:"absolute",
          left:`${flower.bubble.x}vw`,
          top:`${flower.bubble.y}vh`,
          transform:"translateX(-50%)",
          background:"rgba(255,255,255,0.95)",
          borderRadius:"16px",
          padding:"8px 16px",
          whiteSpace:"nowrap",
          fontSize:"clamp(14px, 2vw, 18px)",
          fontFamily:"'Lora',serif",
          color:"#5a3058",
          boxShadow:"0 6px 25px rgba(200,100,150,.25)",
          border:"1.5px solid rgba(255,180,200,.5)",
          zIndex:20,
          pointerEvents:"none",
          animation:"floatUp .5s ease both",
        }}>
          {AFFIRMATIONS[flower.id]}
        </div>
      ) : null)}

      {/* ── Flowers ── */}
      {FLOWERS.map(flower => {
        const FlowerComp = FLOWER_COMPONENTS[flower.name];
        const isBloomed = !!bloomed[flower.id];
        return (
          <div key={flower.id}
            className="flower-container"
            onClick={() => bloom(flower.id)}
            style={{
              position:"absolute",
              left:`${flower.vx}vw`,
              top:`${flower.vy}vh`,
              transform:"translateX(-50%)",
              zIndex: flower.zBase + (isBloomed ? 5 : 0),
              cursor: isBloomed ? "default" : "pointer",
            }}
          >
            {!isBloomed && <div className="flower-tooltip">{flower.name}</div>}
            <svg
              width={90*flower.scale} height={150*flower.scale}
              viewBox="-40 -90 80 100"
              overflow="visible"
              style={{
                display:"block",
                animation:`sway ${2.5+flower.id*.3}s ease-in-out ${flower.id*.2}s infinite`,
                filter:!isBloomed?"drop-shadow(0 0 6px rgba(255,150,180,.5))":"none",
                opacity: flower.scale < 0.65 ? 0.75 : flower.scale < 0.85 ? 0.88 : 1,
              }}
            >
              <FlowerComp bloomed={isBloomed}/>
            </svg>
          </div>
        );
      })}

      {/* Grass */}
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:"70px",pointerEvents:"none"}}>
        <svg width="100%" height="70" viewBox="0 0 1200 70" preserveAspectRatio="xMidYMax slice">
          <rect x="0" y="42" width="1200" height="28" fill="#a5d6a7"/>
          <path d="M0,44 Q30,30 60,40 Q90,26 120,36 Q155,22 185,34 Q215,20 250,32 Q285,18 315,30 Q350,22 380,34 Q415,18 445,30 Q480,24 510,36 Q545,20 575,32 Q610,26 640,38 Q675,22 705,34 Q740,20 770,32 Q805,26 835,38 Q865,22 900,34 Q935,28 965,40 Q995,24 1030,36 Q1065,22 1095,34 Q1130,26 1160,38 Q1185,30 1200,42 L1200,70 L0,70 Z"
            fill="#81c784" opacity=".65"/>
          <path d="M0,50 Q25,36 52,46 Q78,32 105,42 Q135,28 162,40 Q192,30 220,42 Q252,26 280,38 Q310,30 340,42 Q372,28 400,40 Q430,32 460,44 Q492,29 520,41 Q550,33 580,45 Q612,30 640,42 Q670,34 700,46 Q732,31 760,43 Q790,29 820,41 Q852,33 880,45 Q910,31 940,43 Q970,35 1000,47 Q1032,32 1060,44 Q1090,30 1120,42 Q1152,34 1200,46 L1200,70 L0,70 Z"
            fill="#66bb6a" opacity=".75"/>
          {Array.from({length:38}).map((_,i)=>{
            const x=(i/38)*1200+8+(i%3)*3;
            const h=14+(i%5)*5; const lean=(i%7-3)*5;
            return <path key={i}
              d={`M${x},65 Q${x+lean*.5},${65-h*.6} ${x+lean},${65-h}`}
              stroke={`hsl(${122+(i%6)*4},${52+(i%3)*7}%,${36+(i%4)*4}%)`}
              strokeWidth="2" fill="none" strokeLinecap="round"
              style={{animation:`sway ${2.2+(i%4)*.5}s ease-in-out ${i*.06}s infinite`}}/>;
          })}
        </svg>
      </div>

      {/* All bloomed overlay */}
      {allDone && (
        <div style={{
          position:"fixed",inset:0,display:"flex",alignItems:"center",justifyContent:"center",
          background:"rgba(255,240,245,.65)",backdropFilter:"blur(6px)",zIndex:100,
          animation:"floatUp .8s ease both",
        }}>
          <div style={{
            background:"white",borderRadius:"28px",padding:"36px 48px",textAlign:"center",
            boxShadow:"0 20px 60px rgba(200,100,140,.2)",border:"2px solid rgba(255,180,200,.4)",
          }}>
            <div style={{fontSize:"40px",marginBottom:"10px"}}>🌺</div>
            <div style={{fontFamily:"'Dancing Script',cursive",fontSize:"32px",color:"#c0627a",fontWeight:700}}>
              The whole garden bloomed!
            </div>
            <div style={{fontFamily:"'Lora',serif",fontSize:"14px",color:"#9a6070",fontStyle:"italic",margin:"10px 0 22px"}}>
              Every single one of these is true about you 💛
            </div>
            <button onClick={()=>{setBloomed({});setAllDone(false);}} style={{
              background:"linear-gradient(135deg,#f48fb1,#ce93d8)",border:"none",
              borderRadius:"22px",padding:"10px 28px",color:"white",fontSize:"14px",
              fontFamily:"'Lora',serif",cursor:"pointer",
              boxShadow:"0 4px 18px rgba(200,100,150,.3)",
            }}>
              Bloom again 🌸
            </button>
          </div>
        </div>
      )}
    </div>
  );
}