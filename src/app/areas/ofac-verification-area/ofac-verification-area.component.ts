import { Component, OnInit, ViewChild } from "@angular/core";
import { DxButtonModule, DxDateBoxModule, DxFormComponent, DxFormModule, DxLoadPanelModule, DxTextBoxModule } from "devextreme-angular";
import { ScreenPropertyName, matchFieldNamesToScreenPropertyMap } from "../../constants/match-field-names-to-screen-property-map";

import { CommonModule } from "@angular/common";
import { CountryService } from "../../services/country.service";
import { DataSourceItem } from "../../models/data-source-item";
import { OfacSdnService } from "../../services/ofac-sdn.service";
import { ScreenRequestFormData } from "../../models/ofac/screen-request-form-data";
import { ScreenResult } from "../../models/ofac/screen-result.dto";
import { ScreenResultApiResponseDto } from "../../models/ofac/screen-result-api-response.dto";
import { ScreenResultMatch } from "../../models/ofac/screen-result-match.dto";
import { ScreenResultMatchField } from "../../models/ofac/screen-result-match-field.dto";

@Component({
	standalone: true,
	selector: 'ofac-verification-area',
	templateUrl: './ofac-verification-area.component.html',
	styleUrls: ['./ofac-verification-area.component.css'],
	imports: [
		DxFormModule,
		DxDateBoxModule,
		DxButtonModule,
		DxTextBoxModule,
		DxLoadPanelModule,
		CommonModule
	],
	providers: [
		OfacSdnService
	]
  })
  export class OfacVerificationAreaComponent implements OnInit {
	@ViewChild('formComponent')
		form: DxFormComponent | undefined;

	formData: ScreenRequestFormData;
	countryDataSource: DataSourceItem[] = [];

	columnCount = 1;
	dataLoading = false;

	screenPropertyNameMapMatchMap = {
		[ScreenPropertyName.country]: false,
		[ScreenPropertyName.dateOfBirth]: false,
		[ScreenPropertyName.fullName]: false,
	}

	constructor(
		private readonly ofacSdnService: OfacSdnService,
	) {
		this.formData = {} as ScreenRequestFormData;
		this.screenUserData = this.screenUserData.bind(this);
	}

	ngOnInit() {
		this.initializeCountryDataSource();
	}


	screenUserData() {
		this.dataLoading = true;

		const isValid = this.getFormIsValid();

		if (!isValid) {
			this.dataLoading = false;
			return;
		}

		this.resetScreenPropertyNameMapMatchMap();
		this.processScreenData();
	}

	private processScreenData() {
		this.ofacSdnService.screenUserData(this.formData)
			.subscribe((screenResult: ScreenResultApiResponseDto) => {
				if (screenResult.results.length === 0) {
					this.dataLoading = false;
					return;
				}

				screenResult.results.forEach((result: ScreenResult) => {
					if (result.matchCount === 0) {
						this.dataLoading = false;
						return;
					}

					result.matches.forEach((match: ScreenResultMatch) => {
						match.matchSummary.matchFields.forEach((matchField: ScreenResultMatchField) => {
							const matchingField = matchFieldNamesToScreenPropertyMap[matchField.fieldName];

							if (!matchingField) {
								return;
							}

							if (this.screenPropertyNameMapMatchMap[matchingField]) {
								return;
							}

							this.screenPropertyNameMapMatchMap[matchingField] = true;
						});
					});
					this.dataLoading = false;
				});
			});
	}

	private resetScreenPropertyNameMapMatchMap() {
		this.screenPropertyNameMapMatchMap = {
			[ScreenPropertyName.country]: false,
			[ScreenPropertyName.dateOfBirth]: false,
			[ScreenPropertyName.fullName]: false,
		}
	}

	private getFormIsValid() {
		return this.form!.instance.validate().isValid;
	}

	private initializeCountryDataSource() {
		const countryService = new CountryService();
		this.countryDataSource = countryService.getCountryDataSource();
	}
}
