import { useState } from 'react'

// Define types for the props
interface DiagnosticTestFormProps {
  onSave: (testData: {
    patientName: string
    testType: string
    result: string
    testDate: string
    notes: string
  }) => void
  existingTest?: {
    patientName: string
    testType: string
    result: string
    testDate: string
    notes: string
  }
}

const DiagnosticTestForm: React.FC<DiagnosticTestFormProps> = ({ onSave, existingTest }) => {
  const [patientName, setPatientName] = useState(existingTest?.patientName || '')
  const [testType, setTestType] = useState(existingTest?.testType || '')
  const [result, setResult] = useState(existingTest?.result || '')
  const [testDate, setTestDate] = useState(existingTest?.testDate || '')
  const [notes, setNotes] = useState(existingTest?.notes || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ patientName, testType, result, testDate, notes })
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg mt-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        {existingTest ? 'Update Diagnostic Test' : 'Add New Diagnostic Test'}
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Patient Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="patientName">
            Patient Name
          </label>
          <input
            type="text"
            id="patientName"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Test Type */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="testType">
            Test Type
          </label>
          <input
            type="text"
            id="testType"
            value={testType}
            onChange={(e) => setTestType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Result */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="result">
            Result
          </label>
          <input
            type="text"
            id="result"
            value={result}
            onChange={(e) => setResult(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Test Date */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="testDate">
            Test Date
          </label>
          <input
            type="datetime-local"
            id="testDate"
            value={testDate}
            onChange={(e) => setTestDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Notes */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="notes">
            Notes
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {existingTest ? 'Update Test' : 'Add Test'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default DiagnosticTestForm
