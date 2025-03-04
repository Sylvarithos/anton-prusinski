// pages/api/diagnostic-tests.ts
import { NextApiRequest, NextApiResponse } from 'next'
import {
  getAllDiagnosticTests,
  createDiagnosticTest,
  updateDiagnosticTest,
  deleteDiagnosticTest
} from '../../models/diagnosticTest'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const tests = await getAllDiagnosticTests()
        res.status(200).json(tests)
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch diagnostic tests' })
      }
      break

    case 'POST':
      const { patientName, testType, result, testDate, notes } = req.body
      try {
        const _testDate = new Date(testDate);
        const newTest = await createDiagnosticTest({ patientName, testType, result, testDate: _testDate, notes })
        res.status(201).json(newTest)
      } catch (error) {
        res.status(500).json({ error: 'Failed to create diagnostic test' })
      }
      break

    case 'PUT':
      const { id, patientName: updatedPatientName, testType: updatedTestType, result: updatedResult, testDate: updatedTestDate, notes: updatedNotes } = req.body
      try {
        const _testDate = new Date(updatedTestDate);
        const updatedTest = await updateDiagnosticTest(id, { patientName: updatedPatientName, testType: updatedTestType, result: updatedResult, testDate: _testDate, notes: updatedNotes })
        res.status(200).json(updatedTest)
      } catch (error) {
        res.status(500).json({ error: 'Failed to update diagnostic test' })
      }
      break

    case 'DELETE':
      const { id: deleteId } = req.body
      try {
        await deleteDiagnosticTest(deleteId)
        res.status(204).end()
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete diagnostic test' })
      }
      break

    default:
      res.status(405).end() // Method Not Allowed
      break
  }
}
