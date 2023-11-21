import {
  call, delay, fork, put, select, 
} from 'redux-saga/effects';

import { sagaExceptionHandler } from 'utils';
import {
  AccountInfo, MetamaskStatus, RequestStatus, 
} from 'types';
import { ApiEndpoint } from 'appConstants';
import { callApi, signPersonalEvm } from 'api';
import { profileLinkWallet, profileSetStatus, profileSetState } from 'store/profile/actionCreators';
import { metamaskConnect } from 'store/metamask/actionCreators';
import { connectMetamaskSaga } from 'store/metamask/sagas/connectMetamaskSaga';
import { metamaskSelectors } from 'store/metamask/selectors';
import { profileSelectors } from '../selectors';

const message = 'Connect Archon!';

export function* profileLinkWalletSaga({
  type,
}: ReturnType<typeof profileLinkWallet>) {
  try{
    yield put(profileSetStatus({ type, status: RequestStatus.REQUEST }));
    
    yield fork(connectMetamaskSaga, metamaskConnect({}));
    yield delay(1000);
    
    const status: MetamaskStatus = yield select(metamaskSelectors.getProp('status'));

    if (status === MetamaskStatus.CONNECTED) {
      const signature: string = yield call(signPersonalEvm, message);
  
      yield call(callApi, {
        method: 'POST',
        endpoint: ApiEndpoint.ProfileAddWallet,
        payload: {
          message,
          signature,
        },
      });
      const address: string = yield select(metamaskSelectors.getProp('address'));
      const accountInfo: AccountInfo = yield select(
        profileSelectors.getProp('accountInfo'),
      );
      
      yield put(
        profileSetState({
          accountInfo: {
            ...accountInfo,
            walletAddress: address,
          },
        }),
      );
    }
    
    yield put(profileSetStatus({ type, status: RequestStatus.SUCCESS }));
  } catch (e) {
    sagaExceptionHandler(e);
    yield put(profileSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
