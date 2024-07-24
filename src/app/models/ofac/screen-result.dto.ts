import { ScreenResultMatch } from "./screen-result-match.dto";

export interface ScreenResult {
	id: string;
	name: string;
	matchCount: number;
	matches: ScreenResultMatch[]
}
