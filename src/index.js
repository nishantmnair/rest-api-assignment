const express = require('express');
const { randomUUID } = require('crypto');

const app = express();
app.use(express.json());

const users = [];

app.post('/users', (req, res) => {
  const { name, email } = req.body || {};
  if (!name || !email) return res.status(400).json({ error: 'name & email required' });
  const user = { id: randomUUID(), name, email };
  users.push(user);
  res.status(201).json(user);
});

app.delete('/users/:id', (req, res) => {
  const idx = users.findIndex(u => u.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'user not found' });
  users.splice(idx, 1);
  res.status(204).send();
});

app.put('/users/:id', (req, res) => {
  const { name, email } = req.body || {};
  if (!name || !email) return res.status(400).json({ error: 'name & email required' });
  const idx = users.findIndex(u => u.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'user not found' });
  users[idx] = { id: req.params.id, name, email };
  res.json(users[idx]);
});
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'user not found' });
  res.json(user);
});




const PORT = process.env.PORT || 3000;
if (require.main === module) app.listen(PORT, () => console.log(`server on ${PORT}`));

module.exports = app;
