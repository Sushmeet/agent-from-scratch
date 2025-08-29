import 'dotenv/config'
import { runLLM } from './src/llm'
import { getMessages, addMessages } from './src/memory'

const userMessage = process.argv[2]

if (!userMessage) {
  console.error('Please provide a message')
  process.exit(1)
}

// const response = await runLLM({ userMessage })

await addMessages([{ role: 'user', content: userMessage }]) // add most recent usr message.
const messages = await getMessages()

// const response = await runLLM({
//   messages: [...messages, { role: 'user', content: userMessage }],
// })

const response = await runLLM({
  messages,
})

await addMessages([{ role: 'assistant', content: response }])
console.log('Response-------', response)
