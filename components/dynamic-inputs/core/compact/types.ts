
export interface DynamicFormInterface {
  id: number;
  title: string;
  parentId?: string;
  description?: string;
  children?: Partial<DynamicFormInterface>[];
  formControls: Partial<DynamicFormControlInterface>[];
  url?: string;
  status?: number;
  appcontext?: string;
}
export interface DynamicFormControlInterface {
  id: number;
  label: string;
  placeholder?: string;
  type: string;
  classes?: string;
  requiredIf: string;
  required: number|boolean;
  disabled: number|boolean;
  readonly: number|boolean;
  unique: number|boolean;
  pattern: string;
  description: string;
  maxLength?: number;
  minLength?: number;
  min: number;
  max: number;
  minDate: string;
  maxDate: string;
  selectableValues: string;
  selectableModel: string;
  multiple: number|boolean;
  controlGroupKey: string;
  controlName: string;
  controlIndex: number;
  options: object[];
  rows: number;
  columns: number;
  value: string;
  uploadURL: string;
  isRepeatable?: number|boolean;
  children: Partial<DynamicFormControlInterface>[];
  uniqueOn: string;
  dynamicControlContainerClass: string;
  // Added properties
  valuefield: string;
  groupfield: string;
  keyfield: string;
  formId: number;
}


export interface ControlOptionInterface {
  id: number;
  table: string;
  keyfield: string;
  groupfield?: string;
  description: string;
  displayLabel: string;
}
