import { DefaultStoreAction, StoreAction } from '../../../../../rxjs/state/rx-state';
import { insertOrUpdateValuesUsingID, removeItemFromCache } from '../../../../../rxjs/helpers';
import { ControlOptionInterface } from '../../compact/types';
import { ControlOptionsState, Actions } from '../actions/control-options';
import { ControlOption } from '../models/form';

export const controlOptionsReducer = (state: ControlOptionsState, action: Partial<StoreAction>) => {
    const {
        updateResult,
        deleteResult,
        createResult,
        value
    } = action.payload || {};
    switch (action.type) {
        case DefaultStoreAction.INITIALIZE_STORE_STATE:
            return action.payload;
        case DefaultStoreAction.ASYNC_UI_ACTION:
            return {
                ...state,
                performingAction: true,
                error: null,
                updateResult,
                deleteResult,
                createResult,
            } as ControlOptionsState;
        case DefaultStoreAction.ERROR_ACTION:
            return {
                ...state,
                performingAction: false,
                error: action.payload,
                updateResult,
                deleteResult,
                createResult,
            } as ControlOptionsState;
        case Actions.SELECTED:
            return {
                ...state,
                selected: action.payload,
                performingAction: false,
                error: null,
                updateResult,
                deleteResult,
                createResult,
            } as ControlOptionsState;
        case Actions.CREATE_RESULT:
            return {
                ...state,
                collections: action.payload ? {
                    ...(state.collections || {}),
                    items: insertOrUpdateValuesUsingID(state.collections ? (state.collections.items || {}) : {}, value)
                } : { ...state.collections },
                createResult,
                updateResult,
                deleteResult,
                selected: null,
                performingAction: false,
                error: null
            } as ControlOptionsState;
        case Actions.UPDATE_RESULT:
            return {
                ...state,
                collections: action.payload ? {
                    ...(state.collections || {}),
                    items: insertOrUpdateValuesUsingID(state.collections ? (state.collections.items || {}) : {}, value)
                } : { ...state.collections },
                createResult,
                updateResult,
                deleteResult,
                selected: ControlOption.builder().build(ControlOption, { ...(state?.selected ? state?.selected : {}), ...value }),
                performingAction: false,
                error: null
            } as ControlOptionsState;
        case Actions.DELETE_RESULT:
            return {
                ...state,
                collections: value ? {
                    ...state.collections,
                    items: removeItemFromCache(
                        state.collections ? (state.collections.items || {}) : {}, { id: value } as ControlOptionInterface
                    )
                } : { ...state.collections },
                createResult,
                updateResult,
                deleteResult,
                selected: null,
                performingAction: false,
                error: null
            } as ControlOptionsState;
        default:
            return state;
    }
};

