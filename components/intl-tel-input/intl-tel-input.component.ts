import {
  Component,
  Output,
  Input,
  OnInit,
  EventEmitter,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Country } from './country.model';
import { IntlTelInputService } from './intl-tel-input.service';
import {
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl
} from '@angular/forms';
import { Subscription } from 'rxjs';
import * as _ from 'google-libphonenumber';
import { PhoneNumberUtils } from './phone-number-utils';

export class PhoneNumberValidator {
  static ValidatePhoneNumber(control: AbstractControl) {
    if (control.validator) {
      const validator = control.validator({} as AbstractControl);
      if (validator && !validator.required) {
        return null;
      }
    }
    const googlePhonelibInstance = _.PhoneNumberUtil.getInstance();
    try {
      let threatedInput: string;
      threatedInput = PhoneNumberUtils.sanitize(control.value as string);
      const phoneNumber = googlePhonelibInstance.parseAndKeepRawInput(
        threatedInput
      );
      if (!googlePhonelibInstance.isValidNumber(phoneNumber)) {
        return { invalidPhoneNumber: true };
      }
      return null;
    } catch (e) {
      return { invalidPhoneNumber: true };
    }
  }
}
@Component({
  selector: 'app-intl-tel-input',
  templateUrl: './intl-tel-input.component.html',
  styleUrls: ['./intl-tel-input.component.css'],
  providers: []
})
export class IntlTelInputComponent implements OnInit, OnDestroy {
  public phoneControl: FormControl = new FormControl();
  @Input() control: FormControl;
  @Output() controlChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() required = false;
  @Input() disabled = false;
  @Input() allowDropdown = true;
  @Input() initialCountry: string;
  @Input() controlClass: string;
  @Input() preferredCountries: Array<string> = [];
  @ViewChild('phoneControlElement', { static: true })
  phoneControlElement: ElementRef;
  @ViewChild('clrDropdown', { static: true }) clrDropdown: ElementRef;

  phoneControlSubscription: Subscription;
  allCountries: Array<Country> = [];
  preferredCountriesInDropDown: Array<Country> = [];
  selectedCountry: Country = new Country();
  constructor(private intelInputService: IntlTelInputService) {
    this.allCountries = this.intelInputService.fetchCountries()
      ? this.intelInputService.fetchCountries()
      : [];
  }

  ngOnInit() {
    this._initializePhoneNumberControl();
    // Set the preferred countries
    if (this.preferredCountries.length > 0) {
      this.preferredCountries.forEach(iso2 => {
        const preferredCountry = this.allCountries.filter(c => {
          return c.iso2 === iso2;
        });
        // tslint:disable-next-line:no-unused-expression
        preferredCountry[0]
          ? this.preferredCountriesInDropDown.push(preferredCountry[0])
          : // tslint:disable-next-line:no-unused-expression
            null;
      });
    }
    // Set the initial country to show
    if (this.control.value) {
      const controlState = this.control.value;
      const tmpCountryCode: number = this.intelInputService.getCountryCode(
        controlState
      );
      if (tmpCountryCode) {
        this.selectedCountry = this.allCountries.filter((c: Country) => {
          return (
            c.dialCode ===
            this.intelInputService.getCountryCode(controlState).toString()
          );
        })[0];
        this.phoneControl.setValue(
          (controlState as string).substring(
            this.selectedCountry.dialCode.length
          )
        );
      }
    } else if (this.initialCountry) {
      const initCountry = this.allCountries.filter((c: Country) => {
        return c.iso2 === this.initialCountry;
      });
      this.selectedCountry = initCountry[0];
    } else {
      if (this.preferredCountriesInDropDown.length > 0) {
        this.selectedCountry = this.preferredCountriesInDropDown[0];
      } else {
        this.selectedCountry = this.allCountries[0];
      }
    }
    this.phoneControlSubscription = this.phoneControl.valueChanges.subscribe(
      state => {
        if (state) {
          this.setControlValue(this.selectedCountry.dialCode, state);
        }
      }
    );
  }

  public onCountrySelect(country: Country): void {
    if (this.disabled) {
      return;
    }
    this.selectedCountry = country;
    this.setControlValue(
      country.dialCode,
      this.phoneControl.value ? this.phoneControl.value : ''
    );
    this.phoneControlElement.nativeElement.focus();
  }

  public onInputKeyPress(event: any): void {
    const pattern = /[0-9\+\-\ ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  private _initializePhoneNumberControl() {
    // Setting validators on a control
    const validators: Array<ValidatorFn> = [
      PhoneNumberValidator.ValidatePhoneNumber
    ];
    if (this.required) {
      validators.push(Validators.required);
    }
    this.control.setValidators(validators);
  }

  private setControlValue(dialCode: string, phoneNumber: string) {
    this.control.setValue(`${dialCode}${phoneNumber}`);
  }

  ngOnDestroy() {
    this.phoneControlSubscription.unsubscribe();
    this.allCountries = [];
  }
}
