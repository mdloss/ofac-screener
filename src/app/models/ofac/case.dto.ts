import { CaseAddressDto } from "./case-address.dto";
import { CaseIdentificationDto } from "./case-identification.dto";

export interface Case {
	id?: string;
	name: string;
	type: string // individual;
	dob: string// YYYY-MM-DD;
	gender?: string;
	citizenship: string;
	nationality: string;
	phoneNumber?: string;
	emailAddress?: string;
	cryptoId?: string;
	address?: CaseAddressDto;
	identification: CaseIdentificationDto[];
}
