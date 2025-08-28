import { openai } from './ai'
import type { AIMessage } from '../types'

type UserMessage = {
  userMessage: string
}

export const runLLM = async ({ userMessage }: UserMessage) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-5-nano',
    messages: [{ role: 'user', content: userMessage }],
    // temperature: 0.1,
  })

  return response?.choices[0]?.message.content
}
