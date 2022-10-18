import create from 'zustand';
import {SessionType, UserProfileType} from '../../api/user';

interface UserState {
  setAuthSession: (session?: SessionType) => void;
  setUserProfile: (profile?: UserProfileType) => void;
  session?: SessionType;
  user?: UserProfileType;
}

const userStore = create<UserState>(set => ({
  setAuthSession: session => set(() => ({session})),
  setUserProfile: profile => set(() => ({user: profile})),
}));

export default userStore;
