import { z } from 'zod'
import type { ToolFn } from '../../types'
import { openai } from '../ai'

export const generateImageToolDefinition = {
  name: 'generate_image',
  parameters: z
    .object({
      prompt: z
        .string()
        .describe(
          'The prompt used to generate the image with a diffusion model generator like Dall-E'
        ),
    })
    .describe('generate an image and return the URL of the image'),
}

type Args = z.infer<typeof generateImageToolDefinition.parameters>

export const generateImage: ToolFn<Args, string> = async ({
  toolArgs,
  userMessage,
}) => {
  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt: toolArgs.prompt,
    n: 1,
    size: '1024x1024',
  })

  const imageUrl = response.data[0].url
  if (!imageUrl) {
    throw new Error('Failed to generate Image URl')
  }
  return imageUrl
}
