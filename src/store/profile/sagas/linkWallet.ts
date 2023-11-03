import { call, put } from 'redux-saga/effects';

import { sagaExceptionHandler } from 'utils';
import { AccountInfo, RequestStatus } from 'types';
import { ApiEndpoint } from 'appConstants';
import { callApi, signPersonalEvm } from 'api';
import { profileLinkWallet, profileSetStatus, profileSetState } from 'store/profile/actionCreators';

const message = 'Connect Archon!';

export function* profileLinkWalletSaga({
  type,
}: ReturnType<typeof profileLinkWallet>) {
  try{
    yield put(profileSetStatus({ type, status: RequestStatus.REQUEST }));

    const signature: string = yield call(signPersonalEvm, message);

    const {
      data,
    }: { data: AccountInfo } = yield call(callApi, {
      method: 'POST',
      endpoint: ApiEndpoint.ProfileAddWallet,
      payload: {
        message,
        signature,
      },
    });

    yield put(profileSetState({
      accountInfo: {
        ...data,
      },
    }));

    yield put(profileSetStatus({ type, status: RequestStatus.SUCCESS }));
  } catch (e) {
    sagaExceptionHandler(e);
    yield put(profileSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
