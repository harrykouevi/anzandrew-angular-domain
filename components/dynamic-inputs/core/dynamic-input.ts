import { IHTMLFormControl, HTMLFormControlRequireIfConfig } from './contracts/dynamic-input';
import { IHTMLFormControlValidationRule } from './contracts/input-rules';

export abstract class AbstractHTMLFormControl implements IHTMLFormControl {
  label: string;
  type: string;
  formControlName: string;
  classes: string;
  requiredIf?: HTMLFormControlRequireIfConfig;
  rules: IHTMLFormControlValidationRule;
  placeholder?: string;
  items?: Array<any>;
  value?: any;
  descriptionText?: string;
  disabled?: boolean;
  readOnly?: boolean;
  formControlIndex?: number;
  formControlGroupKey?: string;
  hidden?: boolean;
  isRepeatable: boolean;
  uniqueCondition?: string;
  containerClass: string;

  /**
   * @description Instance initializer
   * @param param Required input configuration object
   */
  constructor(param: Partial<IHTMLFormControl>) {
    this.label = param.label;
    this.type = param.type;
    this.formControlName = param.formControlName;
    this.classes = param.classes;
    this.rules = param.rules ? param.rules : {} as IHTMLFormControlValidationRule;
    this.placeholder = param.placeholder;
    this.descriptionText = param.descriptionText;
    this.items = param.items;
    this.disabled = param.disabled ? param.disabled : false;
    this.readOnly = param.readOnly ? param.readOnly : false;
    this.value = param.value ? param.value : null;
    this.formControlIndex = param.formControlIndex ? param.formControlIndex : null;
    this.formControlGroupKey = param.formControlGroupKey ? param.formControlGroupKey : null;
    this.requiredIf = param.requiredIf ? param.requiredIf : null;
    this.hidden = false;
    this.isRepeatable = param.isRepeatable ? param.isRepeatable : false;
    this.uniqueCondition = param.uniqueCondition ? param.uniqueCondition : null;
    this.containerClass = param.containerClass ? param.containerClass : null;
  }
}
