import { Injectable, OnDestroy, Injector, EventEmitter, Inject } from '@angular/core';
// import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { FormService } from '../components/dynamic-inputs/core/form-control/form.service';
import { isDefined } from '../utils/type-utils';
import { TranslationService } from '../translator';
import { DynamicFormHelpers, ComponentReactiveFormHelpers } from './component-reactive-form-helpers';
import { Subject, Subscription } from 'rxjs';
import { ICollection } from '../contracts/collection-interface';
import { filter } from 'rxjs/operators';
import { Collection } from '../utils/collection';
import { HandlersResultMsg, AbstractEntityProvider } from '../entity/abstract-entity';
import { AbstractAlertableComponent } from 'src/app/lib/domain/helpers/component-interfaces';
import { FormGroup } from '@angular/forms';
import { IEntity } from '../entity/contracts/entity';
import { TypeUtilHelper } from './type-utils-helper';
import { AppUIStoreManager, ActionResponseParams } from './app-ui-store-manager.service';
import { ArrayUtils } from '../utils/array-utils';
import { ISerializableBuilder } from '../built-value/contracts/serializers';
import { IDynamicForm } from '../components/dynamic-inputs/core/contracts/dynamic-form';
import { IResponseBody } from '../http/contracts/http-response-data';
import { TranslationParms } from '../translator/translator.service';

/**
 * @description Definition of form request configuration object
 */
export interface IFormRequestConfig {
  id: number;
  label?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FormHelperService implements OnDestroy {

  /**
   * @description Load dynamic form subject instance
   * @var [[BehaviorSubject]]
   */
  public readonly loadForms = new Subject<{ configs: IFormRequestConfig[], result: HandlersResultMsg }>();

  /**
   * @description Form successfully loaded subject instance
   */
  // tslint:disable-next-line: variable-name
  protected _formLoaded = new Subject<ICollection<IDynamicForm>>();
  get formLoaded$() {
    return this._formLoaded.asObservable();
  }

  private subscriptions: Subscription[] = [];
  // tslint:disable-next-line: variable-name
  private _publishers: Subject<any>[];

  /**
   * @description Instance constructor
   */
  constructor(public readonly form: FormService, private translate: TranslationService) {
    this._publishers = [
      this.loadForms, this._formLoaded
    ];
  }

  public getFormById(id: number | string) {
    return new Promise<IDynamicForm>((resolve, _) => {
      this.form.getForm(id).then(async (f) => {
        if (isDefined(f)) {
          resolve(await DynamicFormHelpers.buildDynamicForm(f, this.translate));
        }
        resolve(null);
      })
        .catch((err) => { _(err); });
    });
  }

  suscribe() {
    this.subscriptions.push(
      // Dynamic form loader publisher
      this.loadForms.asObservable().pipe(
        filter((source) => isDefined(source))
      ).subscribe(async (source) => {
        try {
          const values = await Promise.all(source.configs.map((i) => this.getFormById(i.id)));
          const collection: ICollection<IDynamicForm> = new Collection();
          source.configs.forEach((item) => { collection.add(item.label, values[source.configs.indexOf(item)]); });
          this._formLoaded.next(collection);
          if (isDefined(source.result.success)) {
            source.result.success();
          }
        } catch (error) {
          if (isDefined(source.result.error)) {
            throw source.result.error(error);
          }
        }
      }),
    );
  }

  /**
   * @description Unsubscribe from publishers events
   */
  unsubscribe() {
    this.subscriptions.forEach((s) => s.unsubscribe());
    return this;
  }

  /**
   * @description Handles sujects completers
   * @param actions [[Subjeect]]
   */
  onCompleActionListeners(actions: Subject<any>[]) {
    actions.forEach((a) => a.observers.forEach((ob) => ob.complete()));
  }

  public ngOnDestroy() {
    this._publishers.forEach((s) => s.complete());
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}

/**
 * @classdesc Implementation provider for form component views. The current class provides with basic functionnalities of
 * functionnalities a simple form view component will handle through the use of dynamic form implementions,
 */
export abstract class FormsViewComponent<T extends IEntity> extends AbstractAlertableComponent {

  form: IDynamicForm;
  componentFormGroup: FormGroup;
  public selected: T;
  public publishers: Subject<any>[] = [];
  public readonly typeHelper: TypeUtilHelper;
  private formHelper: FormHelperService;

  constructor(
    injector: Injector,
    private entityProvider: AbstractEntityProvider<T>,
    private builder: ISerializableBuilder<T>
  ) {
    super(injector.get(AppUIStoreManager));
    this.typeHelper = injector.get(TypeUtilHelper);
    this.formHelper = injector.get(FormHelperService);
  }

  async initState() {
    this.subscribeToUIActions();
    this.appUIStoreManager.initializeUIStoreAction();
    // Call service subscription method to subscribe to event
    this.formHelper.suscribe();
    this.publishers.push(
      ...[
        this.formHelper.loadForms,
        this.entityProvider.createRequest,
        this.entityProvider.updateRequest,
      ]
    );
    // Triggers form loading event
    this.formHelper.loadForms.next({
      configs: this.getFormConfigs(),
      result: {
        error: (error: any) => {
          console.log(error);
        },
        success: () => {
          this.appUIStoreManager.completeUIStoreAction();
        },
        warnings: (errors: any) => {
          console.log(errors);
        }
      }
    }
    );
    this.uiStoreSubscriptions.push(
      ...[
        // Register to form loading event response
        this.formHelper.formLoaded$.pipe(
          filter((form) => {
            return this.typeHelper.isDefined(form) && (
              ArrayUtils.containsAll(form.keys(), this.getFormConfigs().map(i => i.label))
            );
          })
        )
          .subscribe((forms) => {
            if (forms) {
              this.onFormCollectionLoaded(forms);
              this.suscribeToFormControlChanges();
            }
          }, (err) => {
            console.log(err);
          }),
      ]);
  }

  async onFormSubmit() {
    ComponentReactiveFormHelpers.validateFormGroupFields(
      this.componentFormGroup
    );
    if (this.componentFormGroup.valid) {
      const obj = this.onFormGroupRawValue(this.componentFormGroup.getRawValue());
      this.appUIStoreManager.initializeUIStoreAction();
      if (!this.typeHelper.isDefined(this.selected)) {
        this.entityProvider.createRequest.next({
          builder: this.builder, req: { path: this.form.endpointURL, body: obj }
        });
      } else {
        this.entityProvider.updateRequest.next({
          // tslint:disable-next-line: max-line-length
          builder: this.builder, req: { path: this.form.endpointURL, body: obj, id: this.selected.id }
        });
      }
    }
  }

  dispose() {
    this.entityProvider.unsubscribe().onCompleActionListeners(this.publishers);
    this.formHelper.unsubscribe().onCompleActionListeners(this.publishers);
    this.clearUIActionSubscriptions();
    this.resetUIStore();
  }

  /**
   * @description Returns the configuration of form groups to be loaded from the server
   */
  protected abstract getFormConfigs(): IFormRequestConfig[];

  /**
   * @description provides implementation for building loaded form into formgroup | abstract control
   */
  protected abstract onFormCollectionLoaded(forms: ICollection<IDynamicForm>): void;

  /**
   * @description This method should be use to provide form group values parsing when the form gets submitted by the user
   * Any parsing implementation should be defined in the current method for them to be applied to the form control value
   * during form submission
   * @overridable
   * @param value [[object|any]]
   */
  protected onFormGroupRawValue(value: object | any) {
    return value;
  }

  /**
   * @description Should be override to provide handler for form control value changes
   * @overridable
   */
  protected suscribeToFormControlChanges() {
    // Provide method implementation in subclasse if needed
  }
}

/**
 * @description Provides basic implementation for form view component containers, handling create,
 * update, and delete operation at the lower level
 */
export abstract class FormViewContainerComponent<T> extends AbstractAlertableComponent {

  // // tslint:disable-next-line: no-inferrable-types
  // public selected: T;
  private publishers: Subject<any>[] = [];
  public typeHelper: TypeUtilHelper;
  // tslint:disable-next-line: variable-name
  private _translate: TranslationService;

  constructor(
    injector: Injector,
    // tslint:disable-next-line: variable-name
    private _entityProvider: AbstractEntityProvider<T>,
    // tslint:disable-next-line: variable-name
    private _tranlationConfigs: TranslationParms
  ) {
    super(injector.get(AppUIStoreManager));
    this.typeHelper = injector.get(TypeUtilHelper);
    this._translate = injector.get(TranslationService);
  }

  async initState() {
    this.publishers.push(
      ...[
        this._entityProvider.deleteRequest,
      ]
    );
    this._entityProvider.subscribe();
    const translations = await this._translate.loadTranslations(this._tranlationConfigs.keys, this._tranlationConfigs.translateParams);
    this.uiStoreSubscriptions.push(
      ...[
        this._entityProvider.deleteResult$.pipe(
          filter((source) => this.typeHelper.isDefined(source))
        ).subscribe((res) => {
          this.onDeleteActionResult(res);
        }, _ => this.appUIStoreManager.completeActionWithError(`${translations.serverRequestFailed}`)),

        this._entityProvider.createResult$.pipe(
          filter((form) => this.typeHelper.isDefined(form))
        ).subscribe((res) => {
          this.onCreateActionResult(res);
        }, _ => this.appUIStoreManager.completeActionWithError(`${translations.serverRequestFailed}`)),
        this._entityProvider.updateResult$.pipe(
          filter((source) => this.typeHelper.isDefined(source))
        ).subscribe((res) => {
          this.onUpdateActionResult(res);
        }, _ => this.appUIStoreManager.completeActionWithError(`${translations.serverRequestFailed}`)),
      ]);
  }

  /**
   * @description [[_entityProvider]] property getter
   */
  get entityProvider() {
    return this._entityProvider;
  }

  /**
   * @description [[_translate]] property getter
   */
  get translate() {
    return this._translate;
  }

  /**
   * @description [[_tranlationConfigs]] property getter
   */
  get tranlationConfigs() {
    return this._tranlationConfigs;
  }

  /**
   * @description Provides action to be executed when a delete action get completed successfully.
   * By default it only show result message to UI
   * @evrridable
   * @param result [[IResponseBody]]
   */
  async onDeleteActionResult(result: IResponseBody) {
    const translations = await this._translate.loadTranslations(this._tranlationConfigs.keys, this._tranlationConfigs.translateParams);
    this.appUIStoreManager.onActionResponse({
      res: result,
      okMsg: translations.successfulRequest,
      badReqMsg: `${translations.invalidRequestParams}`,
    } as ActionResponseParams);
  }

  /**
   * @description Provides implentations of update result handler that gets call when update request get completed
   * @param result [[IResponseBody]]
   */
  abstract async onUpdateActionResult(result: IResponseBody): Promise<void>;

  /**
   * @description Provides implentations of create result handler that gets call when create request get completed
   * @param result [[IResponseBody]]
   */
  abstract async onCreateActionResult(result: IResponseBody | T | boolean): Promise<void>;

  dispose() {
    this._entityProvider.unsubscribe().onCompleActionListeners(this.publishers);
    this.clearUIActionSubscriptions();
    this.resetUIStore();
  }
}
