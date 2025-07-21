const properties = [
  {name: 'Lakeside Villa', location: 'Seattle', price: 550000, type: 'House', rent: 2800},
  {name: 'Downtown Condo', location: 'Chicago', price: 420000, type: 'Condo', rent: 2300},
  {name: 'Sunny Apartment', location: 'Miami', price: 350000, type: 'Apartment', rent: 2000},
  {name: 'Suburban House', location: 'Austin', price: 480000, type: 'House', rent: 2500}
];

function searchProperties(e) {
  e.preventDefault();
  const location = document.getElementById('location').value.toLowerCase();
  const minPrice = parseInt(document.getElementById('minPrice').value) || 0;
  const maxPrice = parseInt(document.getElementById('maxPrice').value) || Infinity;
  const type = document.getElementById('type').value;

  const results = properties.filter(p =>
    (location === '' || p.location.toLowerCase().includes(location)) &&
    (type === '' || p.type === type) &&
    p.price >= minPrice && p.price <= maxPrice
  );

  const container = document.getElementById('results');
  container.innerHTML = '';
  results.forEach(p => {
    const roi = ((p.rent * 12) / p.price * 100).toFixed(1);
    const card = document.createElement('div');
    card.className = 'col-md-4';
    card.innerHTML = `
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">${p.name}</h5>
          <p class="card-text">Location: ${p.location}<br>Price: $${p.price.toLocaleString()}<br>Type: ${p.type}</p>
          <p class="card-text"><strong>Investment Potential:</strong> ${roi}%</p>
        </div>
      </div>`;
    container.appendChild(card);
  });
}

document.getElementById('searchForm').addEventListener('submit', searchProperties);

const trendData = [400000,420000,430000,425000,440000,455000,460000,470000,475000,480000,490000,500000];

function drawTrends() {
  const canvas = document.getElementById('trendChart');
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = '#c0c0c0';
  ctx.lineWidth = 2;
  const max = Math.max(...trendData);
  const min = Math.min(...trendData);
  const stepX = width / (trendData.length - 1);
  ctx.beginPath();
  trendData.forEach((val, i) => {
    const x = i * stepX;
    const y = height - (val - min) / (max - min) * height;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
}

drawTrends();

function chatbotRespond(message) {
  const msg = message.toLowerCase();
  if (msg.includes('hello') || msg.includes('hi')) return 'Hello! How can I assist you with real estate today?';
  if (msg.includes('price')) return 'Prices depend on location and property type. Use the search above to explore.';
  if (msg.includes('invest')) return 'Look for properties with strong rental demand and positive ROI.';
  return "I'm here to help with any real estate questions. Please provide more details.";
}

document.getElementById('chatForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  const chatbox = document.getElementById('chatbox');
  const userEntry = document.createElement('div');
  userEntry.className = 'mb-2 text-end';
  userEntry.innerHTML = `<span class="badge bg-light text-dark">${text}</span>`;
  chatbox.appendChild(userEntry);
  const response = chatbotRespond(text);
  const botEntry = document.createElement('div');
  botEntry.className = 'mb-2 text-start';
  botEntry.innerHTML = `<span class="badge bg-secondary">${response}</span>`;
  chatbox.appendChild(botEntry);
  chatbox.scrollTop = chatbox.scrollHeight;
  input.value = '';
});
