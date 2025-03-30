import{r as n,j as e,d as r}from"./index-C4-EoLw1.js";const w=r.section`
  padding: 5rem 0;
  background-color: #f5f6fa;
`,y=r.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
`,k=r.h2`
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
`,E=r.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`,c=r.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`,u=r.label`
  font-size: var(--font-size-small);
  color: #333;
  font-weight: 500;
`,b=r.input`
  padding: 0.8rem;
  border: 1px solid #e1e1e1;
  border-radius: 6px;
  font-size: 1rem;
  color: #333;
  background-color: white;
  transition: border-color 0.2s, box-shadow 0.2s;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`,z=r.textarea`
  padding: 0.8rem;
  border: 1px solid #e1e1e1;
  border-radius: 6px;
  font-size: 1rem;
  color: #333;
  background-color: white;
  min-height: 150px;
  resize: vertical;
  transition: border-color 0.2s, box-shadow 0.2s;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`,F=r.button`
  padding: 1rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
  
  &:hover {
    background-color: #0056b3;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`,i=r.div`
  color: #dc3545;
  font-size: var(--font-size-small);
  margin-top: 0.25rem;
`,C=r.div`
  color: #28a745;
  font-size: 1rem;
  text-align: center;
  padding: 1rem;
  background-color: #d4edda;
  border-radius: 6px;
  margin-top: 1rem;
`,T=()=>{const[s,g]=n.useState({name:"",email:"",message:""}),[o,h]=n.useState({}),[f,p]=n.useState(!1),[x,l]=n.useState(null),j=()=>{const a={};return s.name.trim()||(a.name="Name is required"),s.email.trim()?/\S+@\S+\.\S+/.test(s.email)||(a.email="Email is invalid"):a.email="Email is required",s.message.trim()||(a.message="Message is required"),h(a),Object.keys(a).length===0},S=async a=>{if(a.preventDefault(),!!j()){p(!0),l(null);try{if((await fetch("https://formspree.io/f/mblgapjq",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)})).ok)l("success"),g({name:"",email:"",message:""});else throw new Error("Failed to submit form")}catch{l("error")}finally{p(!1)}}},m=a=>{const{name:t,value:v}=a.target;g(d=>({...d,[t]:v})),o[t]&&h(d=>({...d,[t]:""}))};return e.jsx(w,{children:e.jsxs(y,{children:[e.jsx(k,{children:"Get in Touch"}),e.jsxs(E,{onSubmit:S,children:[e.jsxs(c,{children:[e.jsx(u,{htmlFor:"name",children:"Name"}),e.jsx(b,{id:"name",type:"text",name:"name",placeholder:"Your Name",value:s.name,onChange:m,"aria-invalid":o.name?"true":"false"}),o.name&&e.jsx(i,{children:o.name})]}),e.jsxs(c,{children:[e.jsx(u,{htmlFor:"email",children:"Email"}),e.jsx(b,{id:"email",type:"email",name:"email",placeholder:"Your Email",value:s.email,onChange:m,"aria-invalid":o.email?"true":"false"}),o.email&&e.jsx(i,{children:o.email})]}),e.jsxs(c,{children:[e.jsx(u,{htmlFor:"message",children:"Message"}),e.jsx(z,{id:"message",name:"message",placeholder:"Your Message",value:s.message,onChange:m,"aria-invalid":o.message?"true":"false"}),o.message&&e.jsx(i,{children:o.message})]}),e.jsx(F,{type:"submit",disabled:f,children:f?"Sending...":"Send Message"}),x==="success"&&e.jsx(C,{children:"Thank you for your message! I'll get back to you soon."}),x==="error"&&e.jsx(i,{children:"Something went wrong. Please try again later."})]})]})})};export{T as default};
