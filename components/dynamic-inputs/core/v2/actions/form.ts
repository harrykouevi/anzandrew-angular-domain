import { FormV2 } from "../models/form";
import {
  createAction,
  DefaultStoreAction,
  DrewlabsFluxStore,
  onErrorAction,
  StoreAction,
} from "../../../../../rxjs/state/rx-state";
import { catchError, map } from "rxjs/operators";
import { getResponseDataFromHttpResponse } from "../../../../../http/helpers/response";
import { emptyObservable } from "../../../../../rxjs/helpers";
import { GenericUndecoratedSerializaleSerializer } from "../../../../../built-value/core/js/serializer";
import { HttpErrorResponse } from "@angular/common/http";
import { DynamicFormInterface } from "../../compact/types";
import { FormControlV2 } from "../models";
import { UIStateStatusCode } from "../../../../../contracts/ui-state";
import { IResourcesServerClient } from "src/app/lib/core/http";
import { Paginable } from "src/app/lib/core/pagination";
import { isObject } from "src/app/lib/core/utils";

export interface FormState {
  performingAction: boolean;
  collections: Paginable<DynamicFormInterface>;
  selectedFormId?: number;
  currentForm?: FormV2;
  createResult?: UIStateStatusCode;
  updateResult?: UIStateStatusCode;
  deleteResult?: UIStateStatusCode;
  createControlResult?: UIStateStatusCode;
  updateControlResult?: UIStateStatusCode;
  deleteControlResult?: UIStateStatusCode;
  error?: any;
}

export enum FormStoreActions {
  FORM_SELECTED_ACTION = "[FORM_SELECTED]",
  CREATE_ACTION = "[CREATE]",
  UPDATE_ACTION = "[UPDATE]",
  FORM_PAGINATION_DATA_ACTION = "[FORM_PAGINATION_DATA]",
  CREATE_RESULT_ACTION = "[CREATED_FORM]",
  NEW_VALUE_ACTION = "[ADD_TO_FORMS_STACK]",
  UPDATE_RESULT_ACTION = "[FORM_UPDATED]",
  DELETE_RESULT_ACTION = "[FORM_DELETED]",
  CREATE_CONTROL_ACTION = "[CREATE_CONTROL]",
  UPDATE_CONTROL_ACTION = "[UPDATE_CONTROL]",
  DELETE_CONTROL_ACTION = "[DELETE_CONTROL]",
  DELETE_FORM_CONTROL_ACTION = "[DELETE_FORM_CONTROL]",
  CONTROL_CREATE_RESULT_ACTION = "[FORM_CONTROL_CREATED]",
  CONTROL_UPDATE_RESULT_ACTION = "[FORM_CONTROL_UPDATED]",
  CONTROL_DELETE_RESULT_ACTION = "[FORM_CONTROL_REMOVED]",
}

export const onPaginateFormsAction = (
  store: DrewlabsFluxStore<FormState, Partial<StoreAction>>
) =>
  createAction(
    store,
    (
      client: IResourcesServerClient<any>,
      path: string,
      params: { [index: string]: any } = {}
    ) => {
      return {
        type: DefaultStoreAction.ASYNC_UI_ACTION,
        payload: client.get(`${path}`, { params }).pipe(
          map((state) => {
            const { data, total } =
              state.data && state.data?.data ? state.data : state;
            if (Array.isArray(data)) {
              onFormPaginationDataLoaded(store)({
                data: (data as any[]).map(
                  (current) =>
                    new GenericUndecoratedSerializaleSerializer().fromSerialized(
                      FormV2,
                      current
                    ) as FormV2
                ),
                total,
              });
            } else {
              onFormPaginationDataLoaded(store)({ data: [], total: 0 });
            }
          }),
          catchError((err) => {
            onErrorAction(store)(err);
            return emptyObservable();
          })
        ),
      };
    }
  );

export const onFormPaginationDataLoaded = (
  store: DrewlabsFluxStore<FormState, Partial<StoreAction>>
) =>
  createAction(store, (payload: Paginable<FormV2>) => {
    return {
      type: FormStoreActions.FORM_PAGINATION_DATA_ACTION,
      payload,
    };
  });

export const createFormAction = (
  store: DrewlabsFluxStore<FormState, Partial<StoreAction>>
) =>
  createAction(
    store,
    (
      client: IResourcesServerClient<any>,
      path: string,
      body: { [index: string]: any }
    ) => ({
      type: DefaultStoreAction.ASYNC_UI_ACTION,
      payload: client.create(path, body).pipe(
        map((state) => {
          // tslint:disable-next-line: one-variable-per-declaration
          const data = getResponseDataFromHttpResponse(state);
          if (data) {
            return formCreatedAction(store)({
              value:
                new GenericUndecoratedSerializaleSerializer().fromSerialized(
                  FormV2,
                  data
                ) as FormV2,
              createResult: UIStateStatusCode.OK,
            });
          }
          return emptyObservable();
        }),
        catchError((err) => {
          if (err instanceof HttpErrorResponse) {
            const errorResponse = client.handleErrorResponse(err);
            onErrorAction(store)(errorResponse);
          } else {
            onErrorAction(store)(err);
          }
          return emptyObservable();
        })
      ),
    })
  );

export const formCreatedAction = (
  store: DrewlabsFluxStore<FormState, Partial<StoreAction>>
) =>
  createAction(store, (payload: FormV2) => ({
    type: FormStoreActions.CREATE_RESULT_ACTION,
    payload,
  }));

export const loadFormUsingIDAction = (
  store: DrewlabsFluxStore<FormState, Partial<StoreAction>>
) =>
  createAction(
    store,
    (
      client: IResourcesServerClient<any>,
      path: string,
      id: string | number,
      params: { [prop: string]: any } = { load_bindings: true }
    ) => ({
      type: DefaultStoreAction.ASYNC_UI_ACTION,
      payload: client
        .getUsingID(path, id, { params: params || { load_bindings: true } })
        .pipe(
          map((state) => {
            // tslint:disable-next-line: one-variable-per-declaration
            const data = getResponseDataFromHttpResponse(state);
            if (data) {
              return onNewFormAction(store)(
                new GenericUndecoratedSerializaleSerializer().fromSerialized(
                  FormV2,
                  data
                ) as FormV2
              );
            }
            return emptyObservable();
          }),
          catchError((err) => {
            if (err instanceof HttpErrorResponse) {
              const errorResponse = client.handleErrorResponse(err);
              onErrorAction(store)(errorResponse);
            } else {
              onErrorAction(store)(err);
            }
            return emptyObservable();
          })
        ),
    })
  );

export const onNewFormAction = (
  store: DrewlabsFluxStore<FormState, Partial<StoreAction>>
) => {
  return createAction(store, (payload: FormV2[] | FormV2) => ({
    type: FormStoreActions.NEW_VALUE_ACTION,
    payload,
  }));
};

export const updateFormAction = (
  store: DrewlabsFluxStore<FormState, Partial<StoreAction>>
) =>
  createAction(
    store,
    (
      client: IResourcesServerClient<any>,
      path: string,
      body: { [index: string]: any }
    ) => ({
      type: DefaultStoreAction.ASYNC_UI_ACTION,
      payload: client.update(path, body).pipe(
        map((state) => {
          // tslint:disable-next-line: one-variable-per-declaration
          const data = getResponseDataFromHttpResponse(state);
          if (data && typeof data === "object" && !Array.isArray(data)) {
            return formUpdatedAction(store)({
              value:
                new GenericUndecoratedSerializaleSerializer().fromSerialized(
                  FormV2,
                  data
                ) as FormV2,
              updateResult: UIStateStatusCode.OK,
            });
          } else {
            return formUpdatedAction(store)({
              updateResult: UIStateStatusCode.OK,
            });
          }
        }),
        catchError((err) => {
          if (err instanceof HttpErrorResponse) {
            const errorResponse = client.handleErrorResponse(err);
            onErrorAction(store)(errorResponse);
          } else {
            onErrorAction(store)(err);
          }
          return emptyObservable();
        })
      ),
    })
  );

export const formUpdatedAction = (
  store: DrewlabsFluxStore<FormState, Partial<StoreAction>>
) =>
  createAction(store, (payload: { [index: string]: any }) => ({
    type: FormStoreActions.UPDATE_RESULT_ACTION,
    payload,
  }));

export const deleteFormAction = (
  store: DrewlabsFluxStore<FormState, Partial<StoreAction>>
) =>
  createAction(
    store,
    (
      client: IResourcesServerClient<any>,
      path: string,
      id: number | string
    ) => ({
      type: DefaultStoreAction.ASYNC_UI_ACTION,
      payload: client.deleteUsingID(path, id).pipe(
        map((state) => {
          // tslint:disable-next-line: one-variable-per-declaration
          const data = getResponseDataFromHttpResponse(state);
          return formDeletedAction(store)({
            item: isObject(data) ? data : { id },
            deleteResult: UIStateStatusCode.OK,
          });
        }),
        catchError((err) => {
          if (err instanceof HttpErrorResponse) {
            const errorResponse = client.handleErrorResponse(err);
            onErrorAction(store)(errorResponse);
          } else {
            onErrorAction(store)(err);
          }
          return emptyObservable();
        })
      ),
    })
  );

export const formDeletedAction = (
  store: DrewlabsFluxStore<FormState, Partial<StoreAction>>
) =>
  createAction(store, (payload: { [index: string]: any }) => ({
    type: FormStoreActions.DELETE_RESULT_ACTION,
    payload,
  }));

export const selectFormAction = (
  store: DrewlabsFluxStore<FormState, Partial<StoreAction>>
) =>
  createAction(store, (payload: number | string) => ({
    type: FormStoreActions.FORM_SELECTED_ACTION,
    payload,
  }));

export const createFormControlAction = (
  store: DrewlabsFluxStore<FormState, Partial<StoreAction>>
) =>
  createAction(
    store,
    (
      client: IResourcesServerClient<any>,
      path: string,
      body: { [index: string]: any }
    ) => ({
      type: DefaultStoreAction.ASYNC_UI_ACTION,
      payload: client.create(path, body).pipe(
        map((state) => {
          // tslint:disable-next-line: one-variable-per-declaration
          const data = getResponseDataFromHttpResponse(state);
          if (data) {
            return formControlCreatedAction(store)({
              control:
                new GenericUndecoratedSerializaleSerializer().fromSerialized(
                  FormControlV2,
                  data
                ) as FormControlV2,
              createControlResult: UIStateStatusCode.OK,
            });
          }
          return emptyObservable();
        }),
        catchError((err) => {
          if (err instanceof HttpErrorResponse) {
            const errorResponse = client.handleErrorResponse(err);
            onErrorAction(store)(errorResponse);
          } else {
            onErrorAction(store)(err);
          }
          return emptyObservable();
        })
      ),
    })
  );

export const formControlCreatedAction = (
  store: DrewlabsFluxStore<FormState, Partial<StoreAction>>
) =>
  createAction(store, (payload: FormControlV2) => ({
    type: FormStoreActions.CONTROL_CREATE_RESULT_ACTION,
    payload,
  }));

export const updateFormControlAction = (
  store: DrewlabsFluxStore<FormState, Partial<StoreAction>>
) =>
  createAction(
    store,
    (
      client: IResourcesServerClient<any>,
      path: string,
      body: { [index: string]: any }
    ) => ({
      type: DefaultStoreAction.ASYNC_UI_ACTION,
      payload: client.update(path, body).pipe(
        map((state) => {
          // tslint:disable-next-line: one-variable-per-declaration
          const data = getResponseDataFromHttpResponse(state);
          if (data && typeof data === "object" && !Array.isArray(data)) {
            return formControlUpdatedAction(store)({
              control:
                new GenericUndecoratedSerializaleSerializer().fromSerialized(
                  FormControlV2,
                  data
                ) as FormControlV2,
              updateControlResult: UIStateStatusCode.OK,
            });
          } else {
            return formControlUpdatedAction(store)({
              updateControlResult: UIStateStatusCode.OK,
            });
          }
        }),
        catchError((err) => {
          if (err instanceof HttpErrorResponse) {
            const errorResponse = client.handleErrorResponse(err);
            onErrorAction(store)(errorResponse);
          } else {
            onErrorAction(store)(err);
          }
          return emptyObservable();
        })
      ),
    })
  );

export const formControlUpdatedAction = (
  store: DrewlabsFluxStore<FormState, Partial<StoreAction>>
) =>
  createAction(store, (payload: { [index: string]: any }) => ({
    type: FormStoreActions.CONTROL_UPDATE_RESULT_ACTION,
    payload,
  }));

export const deleteFormFormControl = (
  store: DrewlabsFluxStore<FormState, Partial<StoreAction>>
) =>
  createAction(
    store,
    (
      client: IResourcesServerClient<any>,
      path: string,
      params: { [prop: string]: any } = {},
      controlID?: number
    ) => ({
      type: DefaultStoreAction.ASYNC_UI_ACTION,
      payload: client.delete(path, { params: params || {} }).pipe(
        map((state) => {
          // tslint:disable-next-line: one-variable-per-declaration
          if (controlID) {
            formControlRemovedAction(store)({
              deleteControlResult: UIStateStatusCode.OK,
              control: { id: controlID },
            });
          }
        }),
        catchError((err) => {
          if (err instanceof HttpErrorResponse) {
            const errorResponse = client.handleErrorResponse(err);
            onErrorAction(store)(errorResponse);
          } else {
            onErrorAction(store)(err);
          }
          return emptyObservable();
        })
      ),
    })
  );

export const formControlRemovedAction = (
  store: DrewlabsFluxStore<FormState, Partial<StoreAction>>
) =>
  createAction(store, (payload: { [index: string]: any }) => ({
    type: FormStoreActions.CONTROL_DELETE_RESULT_ACTION,
    payload,
  }));
