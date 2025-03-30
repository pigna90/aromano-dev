import{j as i,f as n,c as o,e as r,g as s,h as c,i as m,k as d,F as l,d as a,m as p}from"./index-C4-EoLw1.js";import{S as x,a as g,T as h}from"./SharedStyles-ihG4KBdV.js";const f=a.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    gap: 0.8rem;
    padding: 0 0.8rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
    justify-items: center;

    /* Center the last element if it's alone */
    > *:last-child:nth-child(odd) {
      grid-column: 1 / -1;
      justify-self: center;
    }
  }
`,b=a(p.div)`
  background: white;
  padding: 1.2rem;
  border-radius: 50%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: all 0.3s ease;
  width: 160px;
  height: 160px;
  aspect-ratio: 1;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  }

  .icon {
    font-size: 2.5rem;
    color: #3498db;
    margin-bottom: 0.4rem;
  }

  h3 {
    color: #2c3e50;
    font-size: 1.1rem;
    margin: 0;
  }

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
    padding: 0.8rem;

    .icon {
      font-size: 1.8rem;
      margin-bottom: 0.2rem;
    }

    h3 {
      font-size: 0.85rem;
    }
  }
`,u=[{icon:n,title:"Skating"},{icon:o,title:"Music"},{icon:r,title:"Swimming"},{icon:s,title:"Home Automation"},{icon:c,title:"Baking"},{icon:m,title:"Skiing"},{icon:d,title:"Podcast Host"}],y=()=>i.jsx(x,{id:"hobbies",children:i.jsxs(g,{children:[i.jsx(h,{children:"Hobbies & Interests"}),i.jsx(f,{children:u.map((t,e)=>i.jsxs(b,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:e*.1},children:[i.jsx(l,{icon:t.icon,className:"icon"}),i.jsx("h3",{children:t.title})]},e))})]})});export{y as default};
