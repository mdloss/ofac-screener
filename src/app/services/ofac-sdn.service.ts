import { Case } from '../models/ofac/case.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ScreenRequest } from '../models/ofac/screen-request.dto';
import { ScreenRequestFormData } from '../models/ofac/screen-request-form-data';
import { ScreenResultApiResponseDto } from '../models/ofac/screen-result-api-response.dto';
import { ofacApiConstants } from '../constants/ofac-api-constant';
import { ofacApiKey } from '../../../secrets/ofac-api-key';

export const serviceUrl = 'https://api.ofac-api.com/v4/screen';

@Injectable()
export class OfacSdnService {
	constructor(
		private readonly http: HttpClient
	) {}

	public screenUserData(screenRequestFormData: ScreenRequestFormData): Observable<ScreenResultApiResponseDto> {
		const requestBody = this.generateScreenBodyParameters(screenRequestFormData);

		return this.http.post<ScreenResultApiResponseDto>(`${serviceUrl}`, requestBody);
	}

	private generateScreenBodyParameters(screenRequestFormData: ScreenRequestFormData): ScreenRequest{
		const caseData: Case = {
			type: 'individual',
			dob: screenRequestFormData.dateOfBirth,
			name: screenRequestFormData.fullName,
			nationality: screenRequestFormData.country,
			citizenship: screenRequestFormData.country,
			identification: [{
				country: screenRequestFormData.country
			}],
			address: {
				country: screenRequestFormData.country
			}
		};

		const screenRequest: ScreenRequest = {
			apiKey: ofacApiKey,
			cases: [caseData],
			minScore: ofacApiConstants.minScore,
			sources: ['SDN'],
			types: ['person']
		}

		return screenRequest;
	}
}
