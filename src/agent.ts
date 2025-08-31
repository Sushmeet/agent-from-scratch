// import { AIMessage } from '../types'
import { runLLM } from './llm'
import { getMessages, addMessages, saveToolResponse } from './memory'
import { runTool } from './toolRunner'
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
  await addMessages([response])

  if (response.tool_calls) {
    const toolCall = response.tool_calls[0]
    loader.update(`executing: ${toolCall.function.name}`)

    const toolResponse = await runTool(toolCall, userMessage)
    saveToolResponse(toolCall.id, toolResponse)

    loader.update(`executed: ${toolCall.function.name}`)
  }

  logMessage(response)
  loader.stop()
  return getMessages()
}
