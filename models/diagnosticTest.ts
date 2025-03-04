// models/diagnosticTest.ts
import { PrismaClient, DiagnosticTest } from '@prisma/client'

const prisma = new PrismaClient()

// Function to fetch all diagnostic tests
export const getAllDiagnosticTests = async (): Promise<DiagnosticTest[]> => {
  return await prisma.diagnosticTest.findMany()
}

// Function to create a new diagnostic test
export const createDiagnosticTest = async (data: {
  patientName: string
  testType: string
  result: string
  testDate: Date
  notes?: string
}): Promise<DiagnosticTest> => {
  return await prisma.diagnosticTest.create({
    data
  })
}

// Function to update a diagnostic test
export const updateDiagnosticTest = async (id: number, data: {
  patientName?: string
  testType?: string
  result?: string
  testDate?: Date
  notes?: string
}): Promise<DiagnosticTest> => {
  return await prisma.diagnosticTest.update({
    where: { id },
    data
  })
}

// Function to delete a diagnostic test
export const deleteDiagnosticTest = async (id: number): Promise<void> => {
  await prisma.diagnosticTest.delete({
    where: { id }
  })
}
