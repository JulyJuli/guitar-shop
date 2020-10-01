import { createFeatureSelector } from '@ngrx/store';
import { RouterReducerState, getSelectors  } from '@ngrx/router-store';

import { RouterStateUrl } from './router.state';

export const selectRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');

export const {
  selectQueryParams,
  selectRouteParams,
  selectRouteData,
  selectUrl
} = getSelectors(selectRouterState);
