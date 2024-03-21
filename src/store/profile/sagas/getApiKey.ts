import { call, put } from 'redux-saga/effects';
import { RequestStatus } from 'types';
// import { sagaExceptionHandler } from 'utils';
import { profileGetApiKey, profileSetState, profileSetStatus } from 'store/profile/actionCreators';
import { callApi } from 'api';
import { ApiEndpoint } from 'appConstants';

export function* profileGetApiKeySaga({
  type,
}: ReturnType<typeof profileGetApiKey>) {
  try {
    yield put(profileSetStatus({ type, status: RequestStatus.REQUEST }));

    const { data }: { data: { apiKey: string } } = yield call(callApi, {
      method: 'GET',
      endpoint: ApiEndpoint.ProfileGetApiKey,
    });


    console.log("API DATA: ", data)

    if (data && data?.apiKey) {
      yield put(profileSetState({
        apiKey: data.apiKey, 
      }));
    }

    yield put(profileSetStatus({ type, status: RequestStatus.SUCCESS }));
  } catch (e) {
    console.log("API DATA: 2", e)
    // sagaExceptionHandler(e);
    yield put(profileSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
