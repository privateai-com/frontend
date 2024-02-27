import {
  call, put, select, 
} from 'redux-saga/effects';

import { sagaExceptionHandler } from 'utils';
import {
  AccountInfo, MetamaskStatus, RequestStatus, 
} from 'types';
import { ApiEndpoint } from 'appConstants';
import { callApi, signPersonalEvm } from 'api';
import { profileLinkWallet, profileSetStatus, profileSetState } from 'store/profile/actionCreators';
import { metamaskSelectors } from 'store/metamask/selectors';
import { profileSelectors } from '../selectors';

const message = 'Your wallet will be connected to private AI';

export function* profileLinkWalletSaga({
  type,
}: ReturnType<typeof profileLinkWallet>) {
  try{
    yield put(profileSetStatus({ type, status: RequestStatus.REQUEST }));
    
    const status: MetamaskStatus = yield select(metamaskSelectors.getProp('status'));

    if (status === MetamaskStatus.CONNECTED) {
      let signature = '';
      try {
        signature = yield call(signPersonalEvm, message);
      } catch (error) {
        throw new Error('User rejected the request');
      }
  
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
