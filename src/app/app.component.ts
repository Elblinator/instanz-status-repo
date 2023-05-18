import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Observable, delay, map, shareReplay } from 'rxjs';

import { FilterService } from './filter.service';
import { UserService } from './user.service';
import { DataService } from './data.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
	////// not yet functional //////////////////
	protected userName: string = this.userService.user;
	protected password: string = this.userService.password;
	//////////////////////////////////////

	protected inputName = new FormControl('');
	protected inputPassword = new FormControl('');

	/////
	protected titleObs:Observable<string> = this.dataService.getTitleObs();
	/////

	constructor(
		private userService: UserService,
		private filterService: FilterService,
		private breakpointObserver: BreakpointObserver,
		private formBuilder: UntypedFormBuilder,
		private dataService: DataService,
		private translate: TranslateService,
		private ngZone: NgZone,
		private cd:ChangeDetectorRef
	) {
		translate.addLangs(['en', 'de']);
		translate.setDefaultLang('de');
		translate.use('de');
		this.initiateFilterData();
		this.loginForm = this.createForm();
		this.getTitleObs();
		this.titleObs.pipe(delay(100)).subscribe(() => {
			this.cd.markForCheck();
		})
	}

	ngOnInit() {
		//setInterval(() => {
		// this.dataService.updateData();
		// 	console.log('I would update Data every 5 minutes')
		// }, 300000)
		'dummy text'
	}

	private getTitleObs(): void {
		this.titleObs = this.dataService.getTitleObs();
	}

	protected isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Small)
		.pipe(
			map(result => result.matches),
			shareReplay()
		);
	protected isHandset2$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.XSmall)
		.pipe(
			map(result => result.matches),
			shareReplay()
		); 
	protected isHandset3$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
		.pipe(
			map(result => result.matches),
			shareReplay()
		);

	/**
	 * Form group for the login form
	 */
	public loginForm: UntypedFormGroup;

	protected isLoggedIn(): boolean {
		return this.userService.isLoggedIn();
	}
	protected logout(): void {
		this.userService.logout();
	}
	/**
	 * activate all filter
	 * and save which is a possibilitiy for filtering (saved in FilterService)
	 */
	private initiateFilterData(): void {
		this.filterService.getAndSetPossibleFilter();
		this.dataService.getData();
	}
	/**
	 * @returns true if inputName and inputPassword match an existing user
	 */
	protected checkLogin(): boolean {
		return this.userService.checkLogin(this.inputName.value, this.inputPassword.value);
	}
	/**
	 * Create the login Form
	 */
	private createForm(): UntypedFormGroup {
		return this.formBuilder.group({
			username: [``, [Validators.required, Validators.maxLength(128)]],
			password: [``, [Validators.required, Validators.maxLength(128)]]
		});
	}
}