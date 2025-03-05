import { NextApiRequest, NextApiResponse } from 'next'
import { getAllDiagnosticTests, createDiagnosticTest, updateDiagnosticTest, deleteDiagnosticTest } from '../../models/diagnosticTest'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        // Fetch all diagnostic tests
        const tests = await getAllDiagnosticTests()
        res.status(200).json(tests)
      } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to fetch diagnostic tests' })
      }
      break

    case 'POST':
      // Add new diagnostic test
      const { patient_name, test_type, result, test_date, notes } = req.body

      // Validate required fields
      if (!patient_name || !test_type || !result || !test_date) {
        return res.status(400).json({ error: 'Missing required fields' })
      }

      try {
        // Call model function to create a new diagnostic test
        const newTest = await createDiagnosticTest({ 
          patient_name, 
          test_type, 
          result, 
          test_date: new Date(test_date),  // Convert string to Date object
          notes 
        })
        res.status(201).json(newTest)  // Respond with the newly created test
      } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to create diagnostic test' })
      }
      break

    case 'PUT':
      // Update an existing diagnostic test
      const { id, patient_name: updatedPatientName, test_type: updatedTestType, result: updatedResult, test_date: updatedTestDate, notes: updatedNotes } = req.body

      // Validate required fields
      if (!id || !updatedPatientName || !updatedTestType || !updatedResult || !updatedTestDate) {
        return res.status(400).json({ error: 'Missing required fields' })
      }

      try {
        // Convert updatedTestDate to Date object
        const updatedTest = await updateDiagnosticTest(id, {
          patient_name: updatedPatientName,
          test_type: updatedTestType,
          result: updatedResult,
          test_date: new Date(updatedTestDate),
          notes: updatedNotes
        })
        res.status(200).json(updatedTest)  // Respond with the updated test
      } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to update diagnostic test' })
      }
      break

    case 'DELETE':
      // Delete a diagnostic test by ID
      const { id: deleteId } = req.body

      const parsedDeleteId = parseInt(deleteId as string, 10)  // Parse the delete ID to an integer

      if (isNaN(parsedDeleteId)) {
        return res.status(400).json({ error: 'Invalid diagnostic test ID' })  // Validate ID
      }

      try {
        await deleteDiagnosticTest(parsedDeleteId)  // Call model function to delete the test
        res.status(204).end()  // No content response for successful deletion
      } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to delete diagnostic test' })
      }
      break

    default:
      res.status(405).end()  // Method Not Allowed if the method is not supported
      break
  }
}
