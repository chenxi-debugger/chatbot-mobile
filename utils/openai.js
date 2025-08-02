import Constants from 'expo-constants';

const OPENAI_API_KEY = Constants.expoConfig.extra.OPENAI_API_KEY;

export async function chatWithOpenAI(messages) {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // ✅ 改为兼容模型
        messages: messages,
        temperature: 0.7,
      }),
    });
  
    if (!res.ok) {
      const error = await res.text();
      throw new Error(error || 'Failed to fetch');
    }
  
    const data = await res.json();
    return data.choices[0].message.content;
  }
  
