import{j as e,s as n,F as t,d as o}from"./index-C4-EoLw1.js";const a=o.footer`
  background: #2d3436;
  color: white;
  padding: 2rem 0;
  text-align: center;
`,s=o.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`,i=o.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin: 1rem 0;

  a {
    color: white;
    font-size: 1.5rem;
    transition: all 0.3s ease;
    opacity: 0.9;
    
    &:hover {
      transform: translateY(-3px);
      opacity: 1;
    }
  }
`,l=o.span`
  font-family: var(--font-primary);
  font-weight: bold;
  font-size: 1.5rem;
  display: inline-block;
  line-height: 1;
  transform: translateY(-1px);
`,c=o.p`
  margin-top: 1rem;
  font-size: 0.9rem;
  opacity: 0.8;
`,d=()=>e.jsx(a,{children:e.jsxs(s,{children:[e.jsx(i,{children:n.map(r=>e.jsx("a",{href:r.url,target:"_blank",rel:"noopener noreferrer","aria-label":r.name,children:r.isMentorIcon?e.jsx(l,{children:"M"}):e.jsx(t,{icon:r.icon})},r.name))}),e.jsxs(c,{children:["© ",new Date().getFullYear()," Alessandro Romano. All rights reserved."]})]})});export{d as default};
