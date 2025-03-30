import{r as a,M as O,j as t,u as W,P as K,a as U,b as Y,L as V,d as s,m as A}from"./index-IPqkbR--.js";import{S as J,a as G,T as X}from"./SharedStyles-CraFrJyh.js";class Z extends a.Component{getSnapshotBeforeUpdate(r){const n=this.props.childRef.current;if(n&&r.isPresent&&!this.props.isPresent){const d=n.offsetParent,m=d instanceof HTMLElement&&d.offsetWidth||0,p=this.props.sizeRef.current;p.height=n.offsetHeight||0,p.width=n.offsetWidth||0,p.top=n.offsetTop,p.left=n.offsetLeft,p.right=m-p.width-p.left}return null}componentDidUpdate(){}render(){return this.props.children}}function q({children:i,isPresent:r,anchorX:n}){const d=a.useId(),m=a.useRef(null),p=a.useRef({width:0,height:0,top:0,left:0,right:0}),{nonce:f}=a.useContext(O);return a.useInsertionEffect(()=>{const{width:v,height:h,top:w,left:l,right:c}=p.current;if(r||!m.current||!v||!h)return;const x=n==="left"?`left: ${l}`:`right: ${c}`;m.current.dataset.motionPopId=d;const u=document.createElement("style");return f&&(u.nonce=f),document.head.appendChild(u),u.sheet&&u.sheet.insertRule(`
          [data-motion-pop-id="${d}"] {
            position: absolute !important;
            width: ${v}px !important;
            height: ${h}px !important;
            ${x}px !important;
            top: ${w}px !important;
          }
        `),()=>{document.head.removeChild(u)}},[r]),t.jsx(Z,{isPresent:r,childRef:m,sizeRef:p,children:a.cloneElement(i,{ref:m})})}const Q=({children:i,initial:r,isPresent:n,onExitComplete:d,custom:m,presenceAffectsLayout:p,mode:f,anchorX:v})=>{const h=W(ee),w=a.useId(),l=a.useCallback(x=>{h.set(x,!0);for(const u of h.values())if(!u)return;d&&d()},[h,d]),c=a.useMemo(()=>({id:w,initial:r,isPresent:n,custom:m,onExitComplete:l,register:x=>(h.set(x,!1),()=>h.delete(x))}),p?[Math.random(),l]:[n,l]);return a.useMemo(()=>{h.forEach((x,u)=>h.set(u,!1))},[n]),a.useEffect(()=>{!n&&!h.size&&d&&d()},[n]),f==="popLayout"&&(i=t.jsx(q,{isPresent:n,anchorX:v,children:i})),t.jsx(K.Provider,{value:c,children:i})};function ee(){return new Map}const S=i=>i.key||"";function M(i){const r=[];return a.Children.forEach(i,n=>{a.isValidElement(n)&&r.push(n)}),r}const z=({children:i,custom:r,initial:n=!0,onExitComplete:d,presenceAffectsLayout:m=!0,mode:p="sync",propagate:f=!1,anchorX:v="left"})=>{const[h,w]=U(f),l=a.useMemo(()=>M(i),[i]),c=f&&!h?[]:l.map(S),x=a.useRef(!0),u=a.useRef(l),k=W(()=>new Map),[D,I]=a.useState(l),[y,e]=a.useState(l);Y(()=>{x.current=!1,u.current=l;for(let b=0;b<y.length;b++){const g=S(y[b]);c.includes(g)?k.delete(g):k.get(g)!==!0&&k.set(g,!1)}},[y,c.length,c.join("-")]);const o=[];if(l!==D){let b=[...l];for(let g=0;g<y.length;g++){const P=y[g],j=S(P);c.includes(j)||(b.splice(g,0,P),o.push(P))}return p==="wait"&&o.length&&(b=o),e(M(b)),I(l),null}const{forceRender:C}=a.useContext(V);return t.jsx(t.Fragment,{children:y.map(b=>{const g=S(b),P=f&&!h?!1:l===y||c.includes(g),j=()=>{if(k.has(g))k.set(g,!0);else return;let _=!0;k.forEach(R=>{R||(_=!1)}),_&&(C==null||C(),e(u.current),f&&(w==null||w()),d&&d())};return t.jsx(Q,{isPresent:P,initial:!x.current||n?void 0:!1,custom:r,presenceAffectsLayout:m,mode:p,onExitComplete:P?void 0:j,anchorX:v,children:b},g)})})},N=[{title:"KNIME Lernathon",topic:"KNIME Learning Workshop",date:"April 4, 2025",description:"Hosting a KNIME learning workshop at Fedrigoni, Milan.",location:"Fedrigoni, Milan"},{title:"Data & AI Tech Summit",topic:"From LLM to Agentic AI: Implement your first Agent with CrewAI",date:"April 9, 2025",description:"Presenting on implementing AI agents using CrewAI at the Data & AI Tech Summit in Warsaw.",location:"Warsaw",info_link:"https://dataiwarsaw.tech"},{title:"PyCon De & PyData",topic:"Agentic AI: Build a Multi-Agent Application with CrewAI",date:"April 23, 2025",description:"Presenting on building multi-agent applications with CrewAI at PyCon De & PyData in Darmstadt.",location:"Darmstadt",info_link:"https://2025.pycon.de"},{title:"World Data Summit",topic:"Agentic AI in Practice: How to Implement AI Agents with CrewAI",date:"May 21, 2025",description:"Presenting on implementing AI agents with CrewAI at the World Data Summit in Amsterdam.",location:"Amsterdam",info_link:"https://worlddatasummit.com"},{title:"University of Zaragoza",topic:"Generative image creation and graphic design",date:"2025",description:"Presenting on generative image creation and graphic design at the University of Zaragoza.",location:"Zaragoza"},{title:"AI Heroes 2024",topic:"Orchestrating LLM AI Agents with CrewAI",date:"January 15, 2024",description:"Presented on orchestrating LLM AI agents with CrewAI at AI Heroes 2024 in Turin.",location:"Turin",video_link:"https://youtu.be/Z6iYie_Ry8k?si=A4ChBoynxCnmVrXU",info_link:"https://aiheroes.it"},{title:"DevFest Bari",topic:"Prototyping your Data Web Application with Streamlit",date:"February 20, 2024",description:"Presented on prototyping data web applications with Streamlit at DevFest Bari.",location:"Bari",info_link:"https://bari.devfest.it"},{title:"ai:NOW",topic:"Pandas, Polars, and DataFrames standardization",date:"March 10, 2024",description:"Presented on Pandas, Polars, and DataFrames standardization at ai:NOW in Munich.",location:"Munich",info_link:"https://cxoportals.com/event/ainow-conference-dach/"},{title:"ODSC Europe",topic:"Orchestrating LLM AI Agents with CrewAI",date:"April 5, 2024",description:"Presented on orchestrating LLM AI agents with CrewAI at ODSC Europe in London.",location:"London",info_link:"https://odsc.com/europe/"},{title:"Data & AI Conference",topic:"Building a High-Performing Data Team: Strategies for Success",date:"May 15, 2024",description:"Presented on building high-performing data teams at the Data & AI Conference in Athens.",location:"Athens",info_link:"https://dataconference.boussiasevents.gr"},{title:"PyCon Italia",topic:"Pandas, Polars and the DataFrame Consortium",date:"June 1, 2024",description:"Presented on Pandas, Polars and the DataFrame Consortium at PyCon Italia in Florence.",location:"Florence",info_link:"https://2024.pycon.it/en"},{title:"University of Salento",topic:"From AI to AI",date:"July 10, 2024",description:"Presented on AI at the University of Salento in Lecce.",location:"Lecce"},{title:"Data Innovation Summit",topic:"Pandas, Polars and the DataFrame Consortium",date:"August 20, 2024",description:"Presented on Pandas, Polars and the DataFrame Consortium at the Data Innovation Summit in Stockholm.",location:"Stockholm",video_link:"https://hyperight.com/pandas-polars-and-the-dataframe-consortium/",info_link:"https://datainnovationsummit.com"},{title:"Big Data Technology Warsaw Summit",topic:"Digital Experimentation: The role of A/B Testing in the AI Landscape",date:"September 5, 2024",description:"Presented on digital experimentation and A/B testing in AI at the Big Data Technology Warsaw Summit.",location:"Warsaw",info_link:"https://bigdatatechwarsaw.eu"},{title:"Data Festival",topic:"Pandas, Polars and the DataFrame Consortium",date:"October 15, 2024",description:"Presented on Pandas, Polars and the DataFrame Consortium at the Data Festival in Munich.",location:"Munich",info_link:"https://barc.com/de/events/data-festival/"},{title:"bit summit",topic:"Digital Experimentation: From Classical Testing to Causal Inference",date:"January 20, 2023",description:"Presented on digital experimentation and causal inference at bit summit in Hamburg.",location:"Hamburg",info_link:"https://www.bit-summit.com"},{title:"KNIME",topic:"AI Learnathon: Build a Chatbot without Coding",date:"February 10, 2023",description:"Presented on building chatbots without coding at KNIME in Hamburg.",location:"Hamburg",video_link:"https://www.youtube.com/watch?v=example2",info_link:"https://www.meetup.com/Hamburg-KNIME-Meetup/events/296653789?utm_medium=email&utm_source=braze_canvas&utm_campaign=mmrk_alleng_event_announcement_prod_v7_en&utm_term=promo&utm_content=lp_meetup"},{title:"Python Pizza",topic:"Streamlit: Making Data Shine in Minutes",date:"March 15, 2023",description:"Presented on Streamlit at Python Pizza in Hamburg.",location:"Hamburg",video_link:"https://www.youtube.com/watch?v=example3",info_link:"https://hamburg.python.pizza"},{title:"PyCon Ireland",topic:"Is Polars the new Pandas? When and how to use it",date:"April 5, 2023",description:"Presented on Polars vs Pandas at PyCon Ireland in Dublin.",location:"Dublin",info_link:"https://python.ie/pycon-2023/"},{title:"ODSC West",topic:"The Crucial Role of Digital Experimentation and A/B Testing in the AI Landscape",date:"May 20, 2023",description:"Presented on digital experimentation and A/B testing in AI at ODSC West.",location:"Virtual",info_link:"https://odsc.com/california/"},{title:"Apply Data Summit",topic:"Digital Experimentation: From A/B Testing to Causal Inference",date:"June 10, 2023",description:"Presented on digital experimentation and causal inference at the Apply Data Summit in Berlin.",location:"Berlin",video_link:"https://www.youtube.com/watch?v=example4",info_link:"https://applydata.io"},{title:"Big Data Technology Warsaw Summit",topic:"Digital Experimentation roundtable facilitation",date:"July 15, 2023",description:"Facilitated a roundtable on digital experimentation at the Big Data Technology Warsaw Summit.",location:"Warsaw",info_link:"https://bigdatatechsummit.com"},{title:"Connected Enterprise Forum | StreamSets",topic:"Building a High-Performing Data Team: Strategies for Success",date:"August 5, 2023",description:"Presented on building high-performing data teams at the Connected Enterprise Forum in Munich.",location:"Munich",info_link:"https://streamsets.com"},{title:"Connected Enterprise Forum | StreamSets",topic:"Building a High-Performing Data Team: Strategies for Success",date:"September 10, 2023",description:"Presented on building high-performing data teams at the Connected Enterprise Forum in London.",location:"London",info_link:"https://streamsets.com"},{title:"DataMass",topic:"Introduction to Causal Inference in the Ride-Hailing Business",date:"January 15, 2022",description:"Presented on causal inference in ride-hailing at DataMass in Gdansk.",location:"Gdansk",info_link:"https://summit.datamass.io"},{title:"Data Innovation Summit",topic:"Introduction to Causal Inference in the Ride-Hailing Business",date:"February 20, 2022",description:"Presented on causal inference in ride-hailing at the Data Innovation Summit in Stockholm.",location:"Stockholm",info_link:"https://datainnovationsummit.com"},{title:"Python Pizza Hamburg",topic:"How I made my Girlfriend happy with a Telegram Bot",date:"January 10, 2020",description:"Presented on building a Telegram bot at Python Pizza Hamburg.",location:"Virtual"},{title:"PyData Hamburg",topic:"AWS CDK: provision your cloud application using Python",date:"February 15, 2020",description:"Presented on AWS CDK at PyData Hamburg.",location:"Virtual"},{title:"meetup.ai Hamburg",topic:"Price prediction pipeline for incoming trucking tours",date:"March 20, 2019",description:"Presented on price prediction pipelines at meetup.ai Hamburg.",location:"Hamburg"},{title:"KNIME",topic:"Data Science and Machine Learning Engineering Workshop",date:"April 10, 2018",description:"Hosted a workshop on data science and machine learning engineering at KNIME in Hamburg.",location:"Hamburg"}],te=()=>{const i=new Date;return N.filter(r=>new Date(r.date)>i)},ie=()=>{const i=new Date;return N.filter(r=>new Date(r.date)<=i)},ne=()=>ie().reduce((r,n)=>{const d=new Date(n.date).getFullYear();return r[d]||(r[d]=[]),r[d].push({title:n.title,topic:n.topic,description:n.description,location:n.location,video_link:n.video_link,info_link:n.info_link,date:n.date,month:new Date(n.date).toLocaleString("en-US",{month:"long"})}),r},{}),oe=s.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  background: rgba(52, 152, 219, 0.1);
  padding: 0.5rem;
  border-radius: 12px;
  width: fit-content;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  @media (max-width: 768px) {
    position: relative;
    left: auto;
    transform: none;
    width: 100%;
    max-width: 300px;
  }
`,$=s.button`
  background: ${i=>i.$active?"#fff":"transparent"};
  color: ${i=>i.$active?"#2c3e50":"#7f8c8d"};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: ${i=>i.$active?"600":"500"};
  box-shadow: ${i=>i.$active?"0 2px 8px rgba(0, 0, 0, 0.1)":"none"};

  &:hover {
    color: ${i=>i.$active?"#2c3e50":"#3498db"};
    background: ${i=>i.$active?"#fff":"rgba(255, 255, 255, 0.5)"};
  }
`,ae=s.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  max-width: 800px;
  margin: 2rem auto;
  position: relative;
  padding: 0 1rem;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`,re=s.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-left: auto;

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
    justify-content: center;
  }
`,se=s.span`
  font-size: 0.9rem;
  color: #7f8c8d;
`,le=s.div`
  position: relative;
  width: 36px;
  height: 18px;
  background: ${i=>i.$active?"#3498db":"#bdc3c7"};
  border-radius: 18px;
  cursor: pointer;
  transition: all 0.2s ease;

  &::after {
    content: '';
    position: absolute;
    width: 14px;
    height: 14px;
    background: white;
    border-radius: 50%;
    top: 2px;
    left: ${i=>i.$active?"20px":"2px"};
    transition: all 0.2s ease;
  }
`,E=s.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto;
`,L=s(A.div)`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  display: grid;
  grid-template-columns: 140px 1fr;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`,T=s.div`
  background: ${i=>i.$type==="upcoming"?"rgba(52, 152, 219, 0.1)":"rgba(44, 62, 80, 0.1)"};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #e0e0e0;

  .month {
    color: ${i=>i.$type==="upcoming"?"#3498db":"#2c3e50"};
    font-weight: 600;
    font-size: 1rem;
    line-height: 1;
  }

  .day {
    font-size: 1.5rem;
    font-weight: bold;
    color: #2c3e50;
    line-height: 1;
    margin: 0.3rem 0;
  }

  .status {
    font-size: 0.75rem;
    color: ${i=>i.$type==="upcoming"?"#3498db":"#7f8c8d"};
    padding: 0.15rem 0.6rem;
    background: white;
    border-radius: 12px;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    padding: 0.75rem;
    flex-direction: row;
    gap: 0.75rem;
    justify-content: flex-start;
    border-bottom: 1px solid #e0e0e0;
    
    .month, .day {
      font-size: 0.9rem;
      margin: 0;
    }
  }
`,F=s.a`
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: #3498db;
  font-size: 1.4rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(52, 152, 219, 0.1);
  padding: 0.7rem;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  justify-content: center;
  z-index: 2;

  &:hover {
    transform: scale(1.1);
    background: rgba(52, 152, 219, 0.2);
  }

  &::before {
    content: "▶";
    font-size: 1rem;
  }
`,H=s.div`
  padding: 1rem;
  position: relative;

  h3 {
    color: #2c3e50;
    margin-bottom: 0.25rem;
    font-size: 1rem;
    font-weight: 600;

    a {
      color: inherit;
      text-decoration: none;
      transition: color 0.2s ease;
      font-weight: 600;

      &:hover {
        color: #3498db;
      }
    }
  }

  .topic {
    color: #3498db;
    font-weight: 500;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }

  p {
    color: #666;
    font-size: 0.85rem;
    line-height: 1.4;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`,ce=s.div`
  margin: 3rem auto;
  max-width: 800px;
  position: relative;
`,de=s.div`
  position: relative;
  aspect-ratio: 16/9;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`,pe=s(A.div)`
  position: absolute;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,me=s(A.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;

  h4 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.9rem;
    opacity: 0.9;
  }
`,B=s.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 1.5rem;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  z-index: 2;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  &.prev {
    left: 1rem;
  }

  &.next {
    right: 1rem;
  }

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
    font-size: 1.2rem;
  }
`,he=s.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 2;
`,ue=s.button`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: ${i=>i.active?"white":"rgba(255, 255, 255, 0.5)"};
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;

  &:hover {
    background: white;
  }
`,ge=s.div`
  margin: 2rem 0;
`,fe=s.h3`
  color: #2c3e50;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`,xe=s.button`
  background: transparent;
  border: none;
  color: #3498db;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;s.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;s.button`
  background: ${i=>i.active?"rgba(52, 152, 219, 0.2)":"transparent"};
  border: none;
  color: ${i=>i.active?"#3498db":"#7f8c8d"};
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  position: relative;

  &:hover {
    background: rgba(52, 152, 219, 0.1);
    color: #3498db;
  }

  &::before {
    content: "🎥";
    font-size: 1.2rem;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 4px;
    background: #3498db;
    border-radius: 50%;
    opacity: ${i=>i.active?1:0};
    transition: opacity 0.2s ease;
  }
`;const ye=()=>{const[i,r]=a.useState("upcoming"),[n,d]=a.useState(!1),[m,p]=a.useState(0),[f,v]=a.useState({}),h=5e3,w=te().filter(e=>!n||e.video_link).map(e=>({...e,month:new Date(e.date).toLocaleString("en-US",{month:"long"}),day:new Date(e.date).getDate().toString(),type:"upcoming"})),l=ne();n&&Object.keys(l).forEach(e=>{l[e]=l[e].filter(o=>o.video_link)});const c=[...w.filter(e=>e.image).map(e=>({src:e.image,alt:`Speaking at ${e.title}`,title:e.title,description:e.description})),...Object.values(l).flat().filter(e=>e.image).slice(0,3).map(e=>({src:e.image,alt:`Speaking at ${e.title}`,title:e.title,description:e.description}))],x=c.length>0,u=Object.keys(l).sort((e,o)=>o-e),k=e=>{v(o=>({...o,[e]:!o[e]}))};a.useEffect(()=>{const e=setInterval(()=>{p(o=>(o+1)%c.length)},h);return()=>clearInterval(e)},[c.length]);const D=()=>{p(e=>(e+1)%c.length)},I=()=>{p(e=>(e-1+c.length)%c.length)},y=()=>i==="upcoming"?t.jsx(E,{children:w.map((e,o)=>t.jsxs(L,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3,delay:o*.1},onClick:()=>e.info_link&&window.open(e.info_link,"_blank","noopener,noreferrer"),children:[t.jsxs(T,{$type:e.type,children:[t.jsx("span",{className:"month",children:e.month}),t.jsx("span",{className:"day",children:e.day}),t.jsx("span",{className:"status",children:e.type})]}),t.jsxs(H,{children:[t.jsx("h3",{children:e.title}),t.jsx("div",{className:"topic",children:e.topic}),t.jsx("p",{children:e.description}),e.video_link&&t.jsx(F,{href:e.video_link,target:"_blank",rel:"noopener noreferrer",onClick:C=>{C.stopPropagation(),window.open(e.video_link,"_blank","width=800,height=600")},title:"Watch video"})]})]},e.title))}):t.jsx(z,{mode:"wait",children:u.map(e=>t.jsxs(ge,{children:[t.jsxs(fe,{children:[t.jsx("span",{children:e}),t.jsx(xe,{onClick:()=>k(e),children:f[e]?"Show Less":"Show All"})]}),t.jsx(E,{children:l[e].slice(0,f[e]?void 0:3).map((o,C)=>t.jsxs(L,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},transition:{duration:.3,delay:C*.1},onClick:()=>o.info_link&&window.open(o.info_link,"_blank","noopener,noreferrer"),children:[t.jsxs(T,{$type:"past",children:[t.jsx("span",{className:"month",children:o.month}),t.jsx("span",{className:"day",children:new Date(o.date).getDate().toString()}),t.jsx("span",{className:"status",children:"past"})]}),t.jsxs(H,{children:[t.jsx("h3",{children:o.title}),t.jsx("div",{className:"topic",children:o.topic}),t.jsx("p",{children:o.description}),o.video_link&&t.jsx(F,{href:o.video_link,target:"_blank",rel:"noopener noreferrer",onClick:b=>{b.stopPropagation(),window.open(o.video_link,"_blank","width=800,height=600")},title:"Watch video"})]})]},o.title))})]},e))});return t.jsx(J,{id:"conferences",children:t.jsxs(G,{children:[t.jsx(X,{children:"Conferences"}),x&&t.jsx(ce,{children:t.jsxs(de,{children:[t.jsx(z,{mode:"wait",children:t.jsxs(pe,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.5},children:[t.jsx("img",{src:c[m].src,alt:c[m].alt}),t.jsxs(me,{initial:{y:20,opacity:0},animate:{y:0,opacity:1},transition:{delay:.2},children:[t.jsx("h4",{children:c[m].title}),t.jsx("p",{children:c[m].description})]})]},m)}),t.jsx(B,{className:"prev",onClick:I,children:"‹"}),t.jsx(B,{className:"next",onClick:D,children:"›"}),t.jsx(he,{children:c.map((e,o)=>t.jsx(ue,{active:m===o,onClick:()=>p(o)},o))})]})}),t.jsxs(ae,{children:[t.jsxs(oe,{children:[t.jsx($,{$active:i==="upcoming",onClick:()=>r("upcoming"),children:"Upcoming"}),t.jsx($,{$active:i==="past",onClick:()=>r("past"),children:"Past"})]}),t.jsxs(re,{children:[t.jsx(se,{children:"Videos Only"}),t.jsx(le,{$active:n,onClick:()=>d(!n),title:n?"Show all conferences":"Show only conferences with videos"})]})]}),y()]})})};export{ye as default};
