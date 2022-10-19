import AsyncStorage from '@react-native-async-storage/async-storage';
import Reactotron, {networking, openInEditor} from 'reactotron-react-native';

const reactotron = Reactotron.configure()
  .useReactNative()
  .setAsyncStorageHandler(AsyncStorage)
  .use(networking())
  .use(openInEditor())
  .connect();

export default reactotron;
