import { useState } from 'react';

const properties = [
  { name: 'Lakeside Villa', location: 'Seattle', price: 550000, type: 'House', rent: 2800 },
  { name: 'Downtown Condo', location: 'Chicago', price: 420000, type: 'Condo', rent: 2300 },
  { name: 'Sunny Apartment', location: 'Miami', price: 350000, type: 'Apartment', rent: 2000 },
  { name: 'Suburban House', location: 'Austin', price: 480000, type: 'House', rent: 2500 }
];

export default function Home() {
  const [location, setLocation] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [type, setType] = useState('');
  const [results, setResults] = useState([]);
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState('');

  const search = (e) => {
    e.preventDefault();
    const min = parseInt(minPrice) || 0;
    const max = parseInt(maxPrice) || Infinity;
    const res = properties.filter(p =>
      (location === '' || p.location.toLowerCase().includes(location.toLowerCase())) &&
      (type === '' || p.type === type) &&
      p.price >= min && p.price <= max
    );
    setResults(res);
  };

  const respond = (text) => {
    const msg = text.toLowerCase();
    if (msg.includes('hello') || msg.includes('hi')) return 'Hello! How can I assist you with real estate today?';
    if (msg.includes('price')) return 'Prices depend on location and property type. Use the search above to explore.';
    if (msg.includes('invest')) return 'Look for properties with strong rental demand and positive ROI.';
    return "I'm here to help with any real estate questions. Please provide more details.";
  };

  const onChat = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const response = respond(input.trim());
    setChat([...chat, { user: input.trim(), bot: response }]);
    setInput('');
  };

  return (
    <div style={{fontFamily:'Arial',padding:'1rem'}}>\n      <h1 style={{color:'#c0c0c0',background:'#001f3f',padding:'1rem'}}>AI Real Estate Agent</h1>\n      <form onSubmit={search} style={{marginTop:'1rem'}}>\n        <input placeholder="Location" value={location} onChange={e=>setLocation(e.target.value)} />\n        <input type="number" placeholder="Min Price" value={minPrice} onChange={e=>setMinPrice(e.target.value)} />\n        <input type="number" placeholder="Max Price" value={maxPrice} onChange={e=>setMaxPrice(e.target.value)} />\n        <select value={type} onChange={e=>setType(e.target.value)}>\n          <option value="">Any Type</option>\n          <option value="House">House</option>\n          <option value="Apartment">Apartment</option>\n          <option value="Condo">Condo</option>\n        </select>\n        <button type="submit">Search</button>\n      </form>\n      <div style={{display:'flex',flexWrap:'wrap',gap:'1rem',marginTop:'1rem'}}>\n        {results.map((p,i)=>{const roi=((p.rent*12)/p.price*100).toFixed(1);return (<div key={i} style={{border:'1px solid #ccc',padding:'0.5rem',background:'#fff',color:'#001f3f'}}>\n            <strong>{p.name}</strong><br/>\n            Location: {p.location}<br/>\n            Price: ${p.price.toLocaleString()}<br/>\n            Type: {p.type}<br/>\n            Investment Potential: {roi}%\n          </div>);})}\n      </div>\n      <h2 style={{color:'#c0c0c0',marginTop:'2rem'}}>AI Chatbot</h2>\n      <div style={{maxHeight:'200px',overflowY:'auto',border:'1px solid #ccc',padding:'0.5rem'}}>\n        {chat.map((c,i)=>(<div key={i}><div style={{textAlign:'right'}}><span style={{background:'#eee',padding:'2px 4px'}}>{c.user}</span></div><div style={{textAlign:'left'}}><span style={{background:'#c0c0c0',color:'#001f3f',padding:'2px 4px'}}>{c.bot}</span></div></div>))}\n      </div>\n      <form onSubmit={onChat} style={{marginTop:'0.5rem'}}>\n        <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask a question..." />\n        <button type="submit">Send</button>\n      </form>\n    </div>
  );
}
