

export class CandidateApplicationDto {
    applicationId: number = 0;
    candidateId: number = 0;
    jobRequestId: number = 0;
    status: string = "";
    appliedAt: Date | null = null;
}

// Interface to represent the raw data from the server
export interface RawCandidateApplication {
    applicationId: number;
    candidateId: number;
    jobRequestId: number;
    status: string;
    appliedAt: string; // The API returns a string
}