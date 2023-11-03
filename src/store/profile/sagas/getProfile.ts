import { call, put } from 'redux-saga/effects';
import { ApiEndpoint } from 'appConstants';
import { callApi } from 'api';
import { AccountInfo, RequestStatus } from 'types';
import { sagaExceptionHandler } from 'utils';
// import { accountSetState } from 'store/account/actionCreators';
import { profileGetProfile, profileSetStatus, profileSetState } from 'store/profile/actionCreators';

// function extractDirAndImage(url: string): { dir: string, image: string } | null {
//   const parts = url.split('/');
//   if (parts.length >= 3) {
//     const dir = parts[parts.length - 2];
//     const image = parts[parts.length - 1];
//     return { dir, image };
//   } 
//   return null;
// }

// function* downloadAndSetAvatar(avatarUrl: string) {
//   if (imageRegexp.test(avatarUrl)) {
//     const dirAndImage = extractDirAndImage(avatarUrl);
//     if (dirAndImage) {
//       const endpoint = `${ApiEndpoint.ProfileGetAvatar}/${dirAndImage.dir}/${dirAndImage.image}`;
//       const img: Blob = yield call(callApi, {
//         method: 'GET',
//         endpoint,
//         isBlob: true,
//       });
//       return URL.createObjectURL(img);
//     }
//   }
//   return null;
// }

// function generateUsername(accountData: AccountState): AccountState {
//   const updatedAccountData = { ...accountData };

//   if (!updatedAccountData.fullName && !updatedAccountData.username) {
//     updatedAccountData.username = `Archonaut #${updatedAccountData.id}`;
//   }

//   return updatedAccountData;
// }

export function* profileGetProfileSaga({
  type,
}: ReturnType<typeof profileGetProfile>) {
  try {
    yield put(profileSetStatus({ type, status: RequestStatus.REQUEST }));

    const { data }: { data: AccountInfo } = yield call(callApi, {
      method: 'GET',
      endpoint: ApiEndpoint.ProfileGet,
    });

    if (data) {
      // if (data.avatarUrl) {
      //   const avatar = yield* downloadAndSetAvatar(data.avatarUrl);
      //   if (avatar) {
      //     data.avatar = avatar;
      //   }
      // }
  
      yield put(profileSetState({
        accountInfo: {
          ...data, 
        }, 
      }));
    }

    yield put(profileSetStatus({ type, status: RequestStatus.SUCCESS }));
  } catch (e) {
    sagaExceptionHandler(e);
    yield put(profileSetStatus({ type, status: RequestStatus.ERROR }));
  }
}
