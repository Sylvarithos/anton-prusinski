// models/diagnosticTest.ts
import supabase from '../lib/supabase'  // Import Supabase client

// Function to get all diagnostic tests
export const getAllDiagnosticTests = async () => {
  const { data, error } = await supabase
    .from('diagnostic_tests') // Table name in Supabase
    .select('*') // Get all columns

  if (error) {
    throw error  // Error handling, you could log this as needed
  }

  return data
}

// Function to create a new diagnostic test
export const createDiagnosticTest = async (test: { patient_name: string, test_type: string, result: string, test_date: Date, notes?: string }) => {
  const { data, error } = await supabase
    .from('diagnostic_tests')  // Table name
    .insert([
      {
        patient_name: test.patient_name,
        test_type: test.test_type,
        result: test.result,
        test_date: test.test_date,
        notes: test.notes,
      }
    ])
    .select()

  if (error) {
    throw error  // Error handling
  }

  return data[0]// Return the inserted record
}

// Function to update an existing diagnostic test
export const updateDiagnosticTest = async (id: number, test: { patient_name: string, test_type: string, result: string, test_date: Date, notes?: string }) => {
  const { data, error } = await supabase
    .from('diagnostic_tests')  // Table name
    .update({
        patient_name: test.patient_name,
        test_type: test.test_type,
        result: test.result,
        test_date: test.test_date,
        notes: test.notes,
    })
    .eq('id', id)  // Match the test by ID
    .select()

  if (error) {
    throw error  // Error handling
  }

  return data[0]// Return the updated test
}

// Function to delete a diagnostic test by ID
export const deleteDiagnosticTest = async (id: number) => {
  const { error } = await supabase
    .from('diagnostic_tests')  // Table name
    .delete()
    .eq('id', id)  // Match the test by ID

  if (error) {
    throw error  // Error handling
  }
}
