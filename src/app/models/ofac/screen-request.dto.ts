import { Case } from "./case.dto";

export interface ScreenRequest {
	apiKey: string;
    minScore: number // 95,
	sources: ['SDN'],
	types: ['person'],
	cases: Case[]
}
