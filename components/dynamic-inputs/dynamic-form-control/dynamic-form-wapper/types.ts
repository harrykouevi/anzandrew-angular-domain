import { AbstractControl, AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { IDynamicForm } from '../../core/contracts/dynamic-form';
import { HTMLFormControlRequireIfConfig, IHTMLFormControl } from '../../core/contracts/dynamic-input';

export interface IConditionalControlBinding {
  key: string;
  binding: HTMLFormControlRequireIfConfig;
  validators: ValidatorFn | ValidatorFn[];
  asyncValidators: AsyncValidatorFn | AsyncValidatorFn[];
}


export type ApplyAttributeChangesToControlsFn =
  (form: IDynamicForm, c: IConditionalControlBinding, s: string | number) =>
    (formgroup: AbstractControl) => { control: AbstractControl, form: IDynamicForm };


export interface MultiSelectItemRemoveEvent {
  event: any;
  control: IHTMLFormControl;
}
