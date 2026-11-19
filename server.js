const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/ai-brain', async (req, res) => {
  const { message, cash, wanted } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are "VIPER", an underworld AI syndicate boss in a realistic GTA-style open-world game. Player has $${cash} and ${wanted} wanted stars. Reply strictly in ENGLISH in 1-2 short, gritty sentences giving heist intel, casino odds, or police evasion tactics. Player says: "${message}"`
              }]
            }]
          })
        }
      );
      const data = await response.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (reply) return res.json({ reply });
    } catch (err) {
      console.error(err);
    }
  }

  const msg = (message || '').toLowerCase();
  let reply = "Head to the Flamingo Casino & Nightclub in the North-East district. High stakes tables are open.";
  if (msg.includes('rob') || msg.includes('heist') || msg.includes('vault') || msg.includes('money')) {
    reply = "City Plaza Vault in the South-West holds $2,500 in unmarked bills. Grab the loot and lose the cops fast.";
  } else if (msg.includes('police') || msg.includes('cop') || msg.includes('star')) {
    reply = wanted > 0
      ? `You have ${wanted} wanted stars! Hit the main avenue at full throttle to outrun patrol units.`
      : "Heat level is zero. Stay sharp and pick your next target.";
  }
  res.json({ reply });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
