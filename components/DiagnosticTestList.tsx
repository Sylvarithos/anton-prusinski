import { DiagnosticTest } from '@prisma/client'

interface DiagnosticTestListProps {
  tests: DiagnosticTest[]
  onDelete: (id: number) => void
  onEdit: (test: DiagnosticTest) => void
}

const DiagnosticTestList: React.FC<DiagnosticTestListProps> = ({ tests, onDelete, onEdit }) => {
  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Diagnostic Test Lists</h2>
      <ul className="space-y-6">
        {tests.map(test => (
          <li
            key={test.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">{test.patientName} - {test.testType}</h3>
            </div>
            <div className="text-gray-700 mb-2">
              <p><strong className="font-semibold">Result:</strong> {test.result}</p>
              <p><strong className="font-semibold">Test Date:</strong> {new Date(test.testDate).toLocaleString()}</p>
              <p><strong className="font-semibold">Notes:</strong> {test.notes || 'No notes'}</p>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => onEdit(test)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(test.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DiagnosticTestList
