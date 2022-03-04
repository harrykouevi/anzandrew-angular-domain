import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormControlComponent } from './dynamic-form-control.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { IntlTelInputModule } from '../../../components/intl-tel-input';
import { ClarityModule } from '@clr/angular';
import { DynamicFormWapperComponent } from './dynamic-form-wapper/dynamic-form-wapper.component';
import { DropzoneModule } from '../../dropzone/dropzone.module';
import { DynamicRepetableGroupComponent } from './dynamic-repetable-group/dynamic-repetable-group.component';
import { RepeatableGroupChildComponent } from './dynamic-repetable-group/repeatable-group-child/repeatable-group-child.component';
import { CustomPipesModule } from '../../pipes';
import { DynamicFileInputComponent } from './dynamic-file-input/dynamic-file-input.component';
import { DynamicSelectInputComponent } from './dynamic-select-input/dynamic-select-input.component';
import { DynamicPhoneInputComponent } from './dynamic-phone-input/dynamic-phone-input.component';
import { DynamicDateInputComponent } from './dynamic-date-input/dynamic-date-input.component';
import { DynamicTextAreaInputComponent } from './dynamic-text-area-input/dynamic-text-area-input.component';
import { DynamicNumberInputComponent } from './dynamic-number-input/dynamic-number-input.component';
import { DynamicTextInputComponent } from './dynamic-text-input/dynamic-text-input.component';
import { DynamicPasswordInputComponent } from './dynamic-password-input/dynamic-password-input.component';
import { DynamicCheckoxInputComponent } from './dynamic-checkox-input/dynamic-checkox-input.component';
import { DynamicRadioInputComponent } from './dynamic-radio-input/dynamic-radio-input.component';


type ModuleConfigs = {
  serverConfigs: {
    host?: string;
    controlOptionsPath?: string;
    controlsPath?: string;
    formsPath?: string;
    controlBindingsPath?: string
  }
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    IntlTelInputModule.forRoot(),
    TranslateModule,
    ClarityModule,
    DropzoneModule,
    CustomPipesModule
  ],
  declarations: [
    DynamicFormControlComponent,
    DynamicFormWapperComponent,
    DynamicRepetableGroupComponent,
    RepeatableGroupChildComponent,
    DynamicFileInputComponent,
    DynamicSelectInputComponent,
    DynamicPhoneInputComponent,
    DynamicDateInputComponent,
    DynamicTextAreaInputComponent,
    DynamicNumberInputComponent,
    DynamicTextInputComponent,
    DynamicPasswordInputComponent,
    DynamicCheckoxInputComponent,
    DynamicRadioInputComponent
  ],
  exports: [
    DynamicFormControlComponent,
    DynamicFormWapperComponent,
    DynamicRepetableGroupComponent,
    DynamicFileInputComponent,
    DynamicSelectInputComponent,
    DynamicPhoneInputComponent,
    DynamicDateInputComponent,
    DynamicTextAreaInputComponent,
    DynamicNumberInputComponent,
    DynamicTextInputComponent,
    DynamicPasswordInputComponent,
    DynamicCheckoxInputComponent,
    DynamicRadioInputComponent
  ],
  providers: []
})
export class DynamicFormControlModule {
  static forRoot(configs: ModuleConfigs = {} as ModuleConfigs): ModuleWithProviders<DynamicFormControlModule> {
    return {
      ngModule: DynamicFormControlModule,
      providers: [
        {
          provide: 'FORM_SERVER_HOST',
          useValue: configs?.serverConfigs?.host || null
        },
        {
          provide: 'FORM_RESOURCES_PATH',
          useValue: configs?.serverConfigs?.formsPath || 'forms'
        },
        {
          provide: 'FORM_CONTROL_RESOURCES_PATH',
          useValue: configs?.serverConfigs?.controlsPath || 'form-controls'
        },
        {
          provide: 'FORM_FORM_CONTROL_RESOURCES_PATH',
          useValue: configs?.serverConfigs?.controlsPath || 'form-form-controls'
        },
        {
          provide: 'CONTROL_OPTION_RESOURCES_PATH',
          useValue: configs?.serverConfigs?.controlOptionsPath || 'form-control-options'
        },
        {
          provide: 'CONTROL_BINDINGS_RESOURCES_PATH',
          useValue: configs?.serverConfigs?.controlBindingsPath || 'control-bindings'
        }
      ]
    };
  }
}
