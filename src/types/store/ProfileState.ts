import { ProfileActionTypes } from 'store/profile/actionTypes';
import {
  PartialRecord,
  RequestStatus,
} from 'types';

export interface ProfileState {
  ui: PartialRecord<ProfileActionTypes, RequestStatus>;
}
