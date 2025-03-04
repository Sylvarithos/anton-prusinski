// pages/index.tsx
import '../sytles/globals.css'
import { useState, useEffect } from 'react'
import DiagnosticTestForm from '../components/DiagnosticTestForm'
import DiagnosticTestList from '../components/DiagnosticTestList'

const HomePage = () => {
  const [tests, setTests] = useState<any[]>([]) // Use `any[]` for flexibility, type this more specifically if needed
  const [editingTest, setEditingTest] = useState<any | null>(null)

  // Fetch all diagnostic tests from the API
  useEffect(() => {
    const fetchTests = async () => {
      const res = await fetch('/api/diagnostic-tests')
      const data = await res.json()
      setTests(data)
    }

    fetchTests()
  }, [])

  // Handle saving (creating or updating) a diagnostic test
  const handleSaveTest = async (test: {
    patientName: string
    testType: string
    result: string
    testDate: string
    notes?: string
  }) => {
    const method = editingTest ? 'PUT' : 'POST'
    const url = '/api/diagnostic-tests'
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: editingTest?.id,
        ...test,
      }),
    })

    const newTest = await res.json()
    setTests(prevTests => {
      if (editingTest) {
        return prevTests.map(t => (t.id === editingTest.id ? newTest : t))
      }
      return [...prevTests, newTest]
    })
    setEditingTest(null) // Reset the editing test
  }

  // Handle deleting a diagnostic test
  const handleDeleteTest = async (id: number) => {
    await fetch('/api/diagnostic-tests', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })

    setTests(tests.filter(test => test.id !== id)) // Remove the deleted test from the list
  }

  // Handle editing a diagnostic test
  const handleEditTest = (test: any) => {
    setEditingTest(test) // Set the test to edit
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 flex justify-center">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <DiagnosticTestForm onSave={handleSaveTest} existingTest={editingTest} />
        </div>

        {/* Test List Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg overflow-auto max-h-[calc(100vh-65px)]">
          <DiagnosticTestList tests={tests} onDelete={handleDeleteTest} onEdit={handleEditTest} />
        </div>
      </div>
    </div>
  )
}

export default HomePage
