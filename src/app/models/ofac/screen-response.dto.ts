import { ScreenResult } from "./screen-result.dto";

export interface ScreenResponse {
	error: boolean;
	errorMessage: string;
	results: ScreenResult[]
}
