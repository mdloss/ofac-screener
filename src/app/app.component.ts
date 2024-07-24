import { Component } from '@angular/core';
import { OfacVerificationAreaComponent } from './areas/ofac-verification-area/ofac-verification-area.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [
		OfacVerificationAreaComponent
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent {
	title = 'ofac-verification';
}
