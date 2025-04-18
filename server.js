const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');
const app = express();
const port = 3000;

require('dotenv').config();

app.use(bodyParser.json());
app.use(express.static('.'));

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo", // or "gpt-4" if you have access
      messages: [{ role: "user", content: userMessage }],
    });

    const reply = completion.data.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong.");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
