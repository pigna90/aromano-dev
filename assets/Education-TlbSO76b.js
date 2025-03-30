import{j as e,d as r,m as n}from"./index-C4-EoLw1.js";import{S as o,a as d,T as m}from"./SharedStyles-ihG4KBdV.js";const c=r.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 0;
`,l=r(n.div)`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
  border-left: 4px solid #3498db;

  &:hover {
    transform: translateX(5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 0.8rem;
    }
  }

  .degree {
    color: #2c3e50;
    font-size: 1.1rem;
    font-weight: 600;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }

  .date {
    color: #3498db;
    font-weight: 500;
    padding: 0.2rem 0.8rem;
    background: rgba(52, 152, 219, 0.1);
    border-radius: 15px;
    font-size: 0.9rem;

    @media (max-width: 768px) {
      font-size: 0.8rem;
      padding: 0.15rem 0.6rem;
    }
  }

  .university {
    color: #7f8c8d;
    font-size: 0.95rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &::before {
      content: '🎓';
      font-size: 1rem;
    }

    @media (max-width: 768px) {
      font-size: 0.9rem;
      margin-bottom: 0.8rem;
    }
  }

  .details {
    color: #666;
    font-size: 0.9rem;
    line-height: 1.5;

    @media (max-width: 768px) {
      font-size: 0.85rem;
      line-height: 1.4;
    }

    .thesis {
      color: #3498db;
      font-weight: 500;
      padding: 0.5rem;
      background: rgba(52, 152, 219, 0.1);
      border-radius: 4px;
      margin-top: 0.5rem;
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;

      @media (max-width: 768px) {
        font-size: 0.85rem;
        padding: 0.4rem;
        margin-top: 0.4rem;
      }

      &::before {
        content: '📝';
        font-size: 1rem;
      }
    }

    .coursework {
      margin-top: 0.5rem;
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;

      @media (max-width: 768px) {
        gap: 0.4rem;
        margin-top: 0.4rem;
      }

      .course {
        background: rgba(44, 62, 80, 0.05);
        padding: 0.2rem 0.6rem;
        border-radius: 12px;
        font-size: 0.85rem;
        color: #2c3e50;

        @media (max-width: 768px) {
          font-size: 0.8rem;
          padding: 0.15rem 0.5rem;
        }
      }
    }
  }
`,p=[{date:"2015 - 2018",degree:"M.Sc. in Data Science and Business Informatics",university:"University of Pisa, Pisa, Italy",details:{thesis:"Anomaly Detection System based on LSTM",courses:["Machine Learning","Big Data Analytics","Statistical Methods for Data Science"],honors:"Graduated with honors (110/110)"}},{date:"2011 - 2015",degree:"B.Sc. in Computer Science",university:"University of Bari, Bari, Italy",details:{thesis:"Wind Forecasting System based on Multiregression Algorithms",courses:["Algorithms and Data Structures","Database Systems","Artificial Intelligence"]}}],h=()=>e.jsx(o,{id:"education",children:e.jsxs(d,{children:[e.jsx(m,{children:"Education"}),e.jsx(c,{children:p.map((i,a)=>e.jsxs(l,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.3,delay:a*.1},children:[e.jsxs("div",{className:"header",children:[e.jsx("div",{className:"degree",children:i.degree}),e.jsx("div",{className:"date",children:i.date})]}),e.jsx("div",{className:"university",children:i.university}),e.jsxs("div",{className:"details",children:[i.details.honors&&e.jsx("div",{children:i.details.honors}),e.jsx("div",{className:"thesis",children:i.details.thesis}),e.jsx("div",{className:"coursework",children:i.details.courses.map((t,s)=>e.jsx("span",{className:"course",children:t},s))})]})]},a))})]})});export{h as default};
