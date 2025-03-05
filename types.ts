
// types.ts
export interface DiagnosticTest {
    id: number;
    patient_name: string;
    test_type: string;
    result: string;
    test_date: string;
    notes: string | null;
}
