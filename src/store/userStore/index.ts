import create from 'zustand';
import {SessionType, UserProfileType} from '../../api/user';

interface UserState {
  setAuthSession: (session?: SessionType) => void;
  setUserProfile: (profile?: UserProfileType) => void;
  setJobFields: (jobFields: {code: string; title: string}[]) => void;
  session?: SessionType;
  user?: UserProfileType;
  jobFields?: {code: string; title: string}[];
}

const userStore = create<UserState>(set => ({
  setAuthSession: session => set(() => ({session})),
  setUserProfile: profile => set(() => ({user: profile})),
  setJobFields: jobFields => set(() => ({jobFields})),
}));

export default userStore;
