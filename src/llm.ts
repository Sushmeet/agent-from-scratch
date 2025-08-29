import { openai } from './ai'
import type { AIMessage } from '../types'

// type UserMessage = {
//   userMessage: string
// }

type Messages = {
  messages: AIMessage[]
}

export const runLLM = async ({ messages }: Messages) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-5-nano',
    messages,
    // temperature: 0.1,
  })

  return response?.choices[0]?.message.content
}
