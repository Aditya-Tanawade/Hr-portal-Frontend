export class CandidateFilterRequestDTO {
    skills: string[] = [];
    minExperience: number | null = null;
    maxExperience: number | null = null;
    minExpectedCtc: number | null = null;
    maxExpectedCtc: number | null = null;
    noticePeriod: number | null = null;
    page: number = 0;
    size: number = 20;
}