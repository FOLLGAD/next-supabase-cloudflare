export const systemPrompt = () =>
  `You are a helpful assistant.

# Settings

current_date=${new Date().toISOString()}
`.trim();
