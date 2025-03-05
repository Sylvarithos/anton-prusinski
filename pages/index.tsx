import { useState, useEffect } from 'react'
import DiagnosticTestForm from '../components/DiagnosticTestForm'
import DiagnosticTestList from '../components/DiagnosticTestList'
import { DiagnosticTest } from "../types"

const HomePage = () => {
  const [tests, setTests] = useState<DiagnosticTest[]>([]) 
  const [editingTest, setEditingTest] = useState<DiagnosticTest | null>(null)

  // Fetch all diagnostic tests from the API
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await fetch('/api/diagnostic-tests')
        if (!res.ok) {
          throw new Error('Failed to fetch diagnostic tests')
        }
        const data: DiagnosticTest[] = await res.json()
        setTests(data)
      } catch (error) {
        console.error('Error fetching tests:', error)
      }
    }

    fetchTests()
  }, [])

  // Handle saving (creating or updating) a diagnostic test
  const handleSaveTest = async (test: Omit<DiagnosticTest, 'id'>) => {
    const method = editingTest ? 'PUT' : 'POST'
    const url = '/api/diagnostic-tests'

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: editingTest?.id, // If editing, pass the id
          ...test,
        }),
      })

      if (!res.ok) {
        throw new Error('Failed to save diagnostic test')
      }

      const newTest = await res.json()

      setTests(prevTests => {
        if (editingTest) {
          return prevTests.map(t => (t.id === editingTest.id ? newTest : t))
        }
        return [...prevTests, newTest]
      })

      setEditingTest(null) // Reset the editing test
    } catch (error) {
      console.error('Error saving test:', error)
    }
  }

  // Handle deleting a diagnostic test
  const handleDeleteTest = async (id: number) => {
    try {
      const res = await fetch('/api/diagnostic-tests', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })

      if (!res.ok) {
        throw new Error('Failed to delete diagnostic test')
      }

      setTests(tests.filter(test => test.id !== id)) // Remove the deleted test from the list
    } catch (error) {
      console.error('Error deleting test:', error)
    }
  }

  // Handle editing a diagnostic test
  const handleEditTest = (test: DiagnosticTest) => {
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
