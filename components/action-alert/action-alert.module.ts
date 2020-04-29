import { AppAlertComponent, AlertService } from './app-alert/app-alert.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { CommonModule } from '@angular/common';
import { ActionAlertComponent } from './action-alert/action-alert.component';
import { PipesModule } from '../../pipes';

@NgModule({
  declarations: [AppAlertComponent, ActionAlertComponent],
  imports: [ClarityModule, CommonModule, PipesModule],
  exports: [AppAlertComponent, ActionAlertComponent]
})
export class ActionAlertModule {
  static forRoot(): ModuleWithProviders<ActionAlertModule> {
    return {
      ngModule: ActionAlertModule,
      providers: [AlertService]
    };
  }
}
