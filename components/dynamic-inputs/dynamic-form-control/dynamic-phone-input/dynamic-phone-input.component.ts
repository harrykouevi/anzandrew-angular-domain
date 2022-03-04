import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { IHTMLFormControl } from '../../core/contracts/dynamic-input';
import { DynamicInputTypeHelper } from '../input-type.service';

@Component({
  selector: 'app-dynamic-phone-input',
  templateUrl: './dynamic-phone-input.component.html',
  styles: [
    `
    .required-text,
    .field-has-error {
      color: rgb(241, 50, 50);
    }

    .clr-input-wrapper .clr-input:disabled {
      background: rgba(244, 244, 244, .3);
    }
    /* .clr-subtext {
        margin-top: 1rem !important;
    } */
    `
  ]
})
export class DynamicPhoneInputComponent {

  @Input() controlDivContainerClass: string = 'clr-form-control';
  @Input() control: AbstractControl;
  @Input() showLabelAndDescription = true;
  // Configuration parameters of the input
  @Input() inputConfig: IHTMLFormControl;

  constructor(public readonly inputTypeHelper: DynamicInputTypeHelper) { }

}
