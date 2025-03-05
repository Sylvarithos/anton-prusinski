import { useState, useEffect, FormEvent } from 'react'
import { DiagnosticTest } from '../types'

interface DiagnosticTestFormProps {
  onSave: (test: Omit<DiagnosticTest, 'id'>) => void
  existingTest: DiagnosticTest | null
}

const DiagnosticTestForm: React.FC<DiagnosticTestFormProps> = ({ onSave, existingTest }) => {
  const [patient_name, setPatient_name] = useState(existingTest?.patient_name || '')
  const [test_type, setTest_type] = useState(existingTest?.test_type || '')
  const [result, setResult] = useState(existingTest?.result || '')
  const [test_date, setTest_date] = useState(existingTest?.test_date || '')
  const [notes, setNotes] = useState(existingTest?.notes || '')

  useEffect(() => {
    if (existingTest) {
      setPatient_name(existingTest.patient_name)
      setTest_type(existingTest.test_type)
      setResult(existingTest.result)
      setTest_date(existingTest.test_date)
      setNotes(existingTest.notes || '')
    }
  }, [existingTest])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSave({ patient_name, test_type, result, test_date, notes })
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg mt-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        {existingTest ? 'Update Diagnostic Test' : 'Add New Diagnostic Test'}
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Form inputs */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="patient_name">Patient Name</label>
          <input
            type="text"
            id="patient_name"
            value={patient_name}
            onChange={(e) => setPatient_name(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="test_type">Test Type</label>
          <input
            type="text"
            id="test_type"
            value={test_type}
            onChange={(e) => setTest_type(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="result">Result</label>
          <input
            type="text"
            id="result"
            value={result}
            onChange={(e) => setResult(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="test_date">Test Date</label>
          <input
            type="datetime-local"
            id="test_date"
            value={test_date ? new Date(test_date).toISOString().slice(0, 16) : ''}
            onChange={(e) => setTest_date(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {existingTest ? 'Update Test' : 'Add Test'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default DiagnosticTestForm
