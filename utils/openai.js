import { useSettingsStore } from '@/store/settingsStore';

export async function chatWithOpenAI(messages) {
  const { apiKey, model, temperature } = useSettingsStore.getState();

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || 'Failed to fetch');
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? 'No response.';
}
