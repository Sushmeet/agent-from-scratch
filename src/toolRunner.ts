import type OpenAI from 'openai'
import type Open from 'openai'
import { dadJoke } from './tools/dadJoke'
import { reddit } from './tools/reddit'
import { generateImage } from './tools/generateImage'

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
    case 'dad_joke':
      return dadJoke(input)
    case 'generate_image':
      return generateImage(input)
    case 'reddit':
      return reddit(input)
    default:
      throw new Error(`Unknown tool ${toolCall.function.name}`)
  }
}
