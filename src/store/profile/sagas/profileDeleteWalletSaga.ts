import { call, put, select } from 'redux-saga/effects';

import { sagaExceptionHandler } from 'utils';
import { AccountInfo, RequestStatus } from 'types';
import { ApiEndpoint } from 'appConstants';
import { callApi } from 'api';
import { profileDeleteWallet, profileSetStatus, profileSetState } from 'store/profile/actionCreators';
import { profileSelectors } from '../selectors';

export function* profileDeleteWalletSaga({
  type,
}: ReturnType<typeof profileDeleteWallet>) {
  try {
    yield put(profileSetStatus({ type, status: RequestStatus.REQUEST }));

    yield call(callApi, {
      method: 'DELETE',
      endpoint: ApiEndpoint.ProfileDeleteWallet,
    });
    const accountInfo: AccountInfo = yield select(
      profileSelectors.getProp('accountInfo'),
    );
    
    yield put(
      profileSetState({
        accountInfo: {
          ...accountInfo,
          walletAddress: null,
        },
      }),
    );

    yield put(profileSetStatus({ type, status: RequestStatus.SUCCESS }));
  } catch (e) {
    sagaExceptionHandler(e);
    yield put(profileSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
