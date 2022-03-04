import { ClrDatagridStateInterface } from '@clr/angular';
import { isArray } from '../utils/types/type-utils';

export const mapPaginatorStateWith = (params: { [index: string]: any }[] | { [index: string]: any } = []) =>
  (state: ClrDatagridStateInterface) => {
    const filters: { [prop: string]: any[] } = {};
    if (state.filters) {
      for (const filter of state.filters) {
        const { property, value } = filter as { property: string, value: string };
        filters[property] = [value];
      }
    }
    let currenState = Object.assign(filters, { page: state?.page?.current || 1, per_page: state?.page?.size || 20 });
    if (isArray(params)) {
      params.map((p: object) => {
        currenState = { ...currenState, ...p };
      });
    }
    return { ...filters, ...currenState } as any;
  };
