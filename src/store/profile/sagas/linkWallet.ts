import { call, put, select } from 'redux-saga/effects';

import { sagaExceptionHandler } from 'utils';
import {
  AccountInfo, MetamaskProvider, MetamaskRequestMethod, RequestStatus, 
} from 'types';
import { ApiEndpoint } from 'appConstants';
import { callApi, signPersonalEvm } from 'api';
import { profileLinkWallet, profileSetStatus, profileSetState } from 'store/profile/actionCreators';
import detectEthereumProvider from '@metamask/detect-provider';
import { profileSelectors } from '../selectors';

const message = 'Connect Archon!';

export function* profileLinkWalletSaga({
  type,
}: ReturnType<typeof profileLinkWallet>) {
  try{
    yield put(profileSetStatus({ type, status: RequestStatus.REQUEST }));

    const signature: string = yield call(signPersonalEvm, message);

    yield call(callApi, {
      method: 'POST',
      endpoint: ApiEndpoint.ProfileAddWallet,
      payload: {
        message,
        signature,
      },
    });
    const metamaskProvider: MetamaskProvider = yield detectEthereumProvider();
    let address = '';
    if (metamaskProvider) {
      const addresses: string[] = yield metamaskProvider.request({
        method: MetamaskRequestMethod.eth_requestAccounts,
      });
      [address] = addresses;
    }
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

    yield put(profileSetStatus({ type, status: RequestStatus.SUCCESS }));
  } catch (e) {
    sagaExceptionHandler(e);
    yield put(profileSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
