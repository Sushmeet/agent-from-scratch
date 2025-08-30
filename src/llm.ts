import { openai } from './ai'
import type { AIMessage } from '../types'
import { zodFunction } from 'openai/helpers/zod'

// type UserMessage = {
//   userMessage: string
// }

type Messages = {
  messages: AIMessage[]
}

export const runLLM = async ({
  messages,
  tools,
}: Messages & { tools: any[] }) => {
  const formattedTools = tools.map(zodFunction)

  const response = await openai.chat.completions.create({
    model: 'gpt-5-nano',
    messages,
    tools: formattedTools,
    tool_choice: 'auto',
    parallel_tool_calls: false,
    // temperature: 0.1,
  })

  // return response?.choices[0]?.message.content
  //agent changes below, since no content is returned
  return response?.choices[0]?.message
}
