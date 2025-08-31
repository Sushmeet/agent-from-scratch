import type OpenAI from 'openai'
import type Open from 'openai'

const getWeather = () => 'The weather is 30 degree celcius. Super duper hot.'

export const runTool = async (
  toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
  userMessage: string
) => {
  const input = {
    userMessage,
    toolArgs: JSON.parse(toolCall.function.arguments),
  }

  switch (toolCall.function.name) {
    case 'get_weather_tool':
      return getWeather(input)
    default:
      throw new Error(`Unknown tool ${toolCall.function.name}`)
  }
}
