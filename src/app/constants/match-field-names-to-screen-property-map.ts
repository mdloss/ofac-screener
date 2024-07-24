export enum ScreenPropertyName {
	fullName = 'fullName',
	dateOfBirth = 'dateOfBirth',
	country = 'country'
}

export const matchFieldNamesToScreenPropertyMap: {[key: string]: ScreenPropertyName} = {
	Name: ScreenPropertyName.fullName,
	DOB: ScreenPropertyName.dateOfBirth,
	Citizenship: ScreenPropertyName.country,
}
