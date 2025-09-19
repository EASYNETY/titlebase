import { promises as fs } from "fs"
import path from "path"
import crypto from "crypto"

const DATA_DIR = path.join(process.cwd(), "data")

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR)
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true })
  }
}

// JSON file storage implementation
export async function executeQuery(query: string, params: any[] = []) {
  await ensureDataDir()

  // Simple query parsing for basic operations
  const lowerQuery = query.toLowerCase().trim()

  if (lowerQuery.startsWith("select")) {
    return await handleSelect(query, params)
  } else if (lowerQuery.startsWith("insert")) {
    return await handleInsert(query, params)
  } else if (lowerQuery.startsWith("update")) {
    return await handleUpdate(query, params)
  } else if (lowerQuery.startsWith("delete")) {
    return await handleDelete(query, params)
  }

  return []
}

async function handleSelect(query: string, params: any[]) {
  // Extract table name from query
  const tableMatch = query.match(/from\s+(\w+)/i)
  if (!tableMatch) return []

  const tableName = tableMatch[1]
  const filePath = path.join(DATA_DIR, `${tableName}.json`)

  try {
    const data = await fs.readFile(filePath, "utf8")
    return JSON.parse(data)
  } catch {
    return []
  }
}

async function handleInsert(query: string, params: any[]) {
  const tableMatch = query.match(/into\s+(\w+)/i)
  if (!tableMatch) return []

  const tableName = tableMatch[1]
  const filePath = path.join(DATA_DIR, `${tableName}.json`)

  // Create mock record with params
  const record = {
    id: crypto.randomUUID(),
    ...Object.fromEntries(params.map((param, index) => [`field_${index}`, param])),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  let records = []
  try {
    const data = await fs.readFile(filePath, "utf8")
    records = JSON.parse(data)
  } catch {
    // File doesn't exist, start with empty array
  }

  records.push(record)
  await fs.writeFile(filePath, JSON.stringify(records, null, 2))

  return [record]
}

async function handleUpdate(query: string, params: any[]) {
  const tableMatch = query.match(/update\s+(\w+)/i)
  if (!tableMatch) return []

  const tableName = tableMatch[1]
  const filePath = path.join(DATA_DIR, `${tableName}.json`)

  try {
    const data = await fs.readFile(filePath, "utf8")
    const records = JSON.parse(data)

    // Simple update - update all records for demo
    const updatedRecords = records.map((record: any) => ({
      ...record,
      updated_at: new Date().toISOString(),
    }))

    await fs.writeFile(filePath, JSON.stringify(updatedRecords, null, 2))
    return updatedRecords
  } catch {
    return []
  }
}

async function handleDelete(query: string, params: any[]) {
  const tableMatch = query.match(/from\s+(\w+)/i)
  if (!tableMatch) return []

  const tableName = tableMatch[1]
  const filePath = path.join(DATA_DIR, `${tableName}.json`)

  try {
    await fs.writeFile(filePath, JSON.stringify([], null, 2))
    return []
  } catch {
    return []
  }
}

export async function executeTransaction(queries: Array<{ query: string; params: any[] }>) {
  try {
    const results = []
    for (const { query, params } of queries) {
      const result = await executeQuery(query, params)
      results.push(result)
    }
    return results
  } catch (error) {
    console.error("Transaction error:", error)
    throw error
  }
}

// Helper function for direct file access
export async function getTableData(tableName: string) {
  await ensureDataDir()
  const filePath = path.join(DATA_DIR, `${tableName}.json`)

  try {
    const data = await fs.readFile(filePath, "utf8")
    return JSON.parse(data)
  } catch {
    return []
  }
}

export const db = {
  query: executeQuery,
  transaction: executeTransaction,
  getTable: getTableData,

  // Convenience methods for common operations
  async select(tableName: string, conditions?: any) {
    return await executeQuery(`SELECT * FROM ${tableName}`, [])
  },

  async insert(tableName: string, data: Record<string, any>) {
    const fields = Object.keys(data).join(", ")
    const placeholders = Object.keys(data)
      .map(() => "?")
      .join(", ")
    const values = Object.values(data)
    return await executeQuery(`INSERT INTO ${tableName} (${fields}) VALUES (${placeholders})`, values)
  },

  async update(tableName: string, data: Record<string, any>, conditions?: any) {
    const setClause = Object.keys(data)
      .map((key) => `${key} = ?`)
      .join(", ")
    const values = Object.values(data)
    return await executeQuery(`UPDATE ${tableName} SET ${setClause}`, values)
  },

  async delete(tableName: string, conditions?: any) {
    return await executeQuery(`DELETE FROM ${tableName}`, [])
  },
}
