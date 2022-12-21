import instance from './instance';
import {UserProfileType} from './user';

const refresh = async () => await instance.get('auth/refresh');

export default {refresh};
