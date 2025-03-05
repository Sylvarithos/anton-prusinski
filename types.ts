// types.ts
export interface DiagnosticTest {
    id: number;
    patientName: string;
    testType: string;
    result: string;
    testDate: string;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
}