import { JSONFilePreset } from 'lowdb/node'
import type { AIMessage } from '../types'
import { v4 as uuidv4 } from 'uuid'

export type MessageWithMetaData = AIMessage & {
  id: string
  createdAt: string
}

// add metadata
const addMetadata = (message: AIMessage): MessageWithMetaData => {
  return {
    ...message,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  }
}

// remove metadata
const removeMetadata = (message: MessageWithMetaData): AIMessage => {
  const { id, createdAt, ...messageWithoutMetadata } = message
  return messageWithoutMetadata
}

type Data = {
  messages: MessageWithMetaData[]
}

const defaultData: Data = { messages: [] }

const getDb = async () => {
  const db = await JSONFilePreset('db.json', defaultData)
  return db
}

export const addMessages = async (messages: AIMessage[]) => {
  const db = await getDb()
  db.data.messages.push(...messages.map(addMetadata))
  await db.write()
}

export const getMessages = async () => {
  const db = await getDb()
  return db.data.messages.map(removeMetadata)
}
