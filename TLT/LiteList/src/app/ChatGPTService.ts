import axios from 'axios';

const GPT3_API_KEY = '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';
const GPT3_ENGINE = 'davinci'; // Or 'davinci-codex' if you prefer Codex

export async function generateChatResponse(prompt: string): Promise<string> {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${GPT3_API_KEY}`,
  };

  const data = {
    prompt: prompt,
    max_tokens: 1, // Adjust as needed
  };

  try {
    const response = await axios.post(
      `https://api.openai.com/v1/engines/${GPT3_ENGINE}/completions`,
      data,
      {headers},
    );
    return response.data.choices[0].text;
  } catch (error) {
    console.error('Error generating chat response:', error);
    throw error;
  }
}
