// import { AIMessage } from '../types'
import { runLLM } from './llm'
import { getMessages, addMessages } from './memory'
import { logMessage, showLoader } from './ui'

export const runAgent = async ({
  userMessage,
  tools,
}: {
  userMessage: string
  tools: any[]
}) => {
  await addMessages([{ role: 'user', content: userMessage }])
  const loader = showLoader('🤔')

  const messages = await getMessages()

  const response = await runLLM({
    messages,
    tools,
  })

  if (response.tool_calls) {
    console.log(response.tool_calls)
  }

  await addMessages([response])
  //   logMessage(response)
  loader.stop()
  return getMessages()
}
