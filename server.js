const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

const DATA_FILE = 'data.json';

function readData() {
  if (!fs.existsSync(DATA_FILE)) {
    return { entries: [], addExpenses: [], addIncome: [] };
  }
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch (e) {
    return { entries: [], addExpenses: [], addIncome: [] };
  }
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

const path = require('path');
const htmlPath = path.join(__dirname, 'public', 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');

app.get('/', (req, res) => {
  res.send(html);
});

app.get('/api/data', (req, res) => {
  res.json(readData());
});

app.post('/api/data', (req, res) => {
  try {
    writeData(req.body);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ success: false });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
