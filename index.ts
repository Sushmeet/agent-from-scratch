import 'dotenv/config'
import { runAgent } from './src/agent'
import { z } from 'zod'
// import { runLLM } from './src/llm'
// import { getMessages, addMessages } from './src/memory'

const userMessage = process.argv[2]

if (!userMessage) {
  console.error('Please provide a message')
  process.exit(1)
}

// const response = await runLLM({ userMessage })

//DIRECT CALL TO LLM CODE HERE
// await addMessages([{ role: 'user', content: userMessage }]) // add most recent usr message.
// const messages = await getMessages()

//DON"T UNCOMMENT USE NEXT RESPONSE.
// const response = await runLLM({
//   messages: [...messages, { role: 'user', content: userMessage }],
// })

// const response = await runLLM({
//   messages,
// })

// await addMessages([{ role: 'assistant', content: response }])

// AGENT CODE HERE

const weatherTool = {
  name: 'get_weather_tool',
  description: 'use this to get the weather',
  parameters: z.object({
    reasoning: z.string().describe('why did you pick this tool?'),
  }),
}

const response = await runAgent({ userMessage, tools: [weatherTool] })
