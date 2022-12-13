import {View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Background, DefaultText as Text, Header, Icons} from '../../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/main';
import {NotificationEnum, NotificationType} from '../../api/user';
import {css} from '@emotion/native';
interface Props
  extends NativeStackScreenProps<RootStackParamList, 'Notification'> {}
const Notification = ({navigation}: Props) => {
  const [notiList, setNotiList] = useState<NotificationType[]>([
    {
      id: 0,
      notiType: NotificationEnum.INITIATIVE_ACHIEVED,
      msg: 'adadasdasdasdasd',
      checked: false,
    },
    {
      id: 1,
      notiType: NotificationEnum.INITIATIVE_ACHIEVED,
      msg: 'adadasdasdasdasd',
      checked: true,
    },
  ]);
  const handleClickBack = () => navigation.goBack();
  return (
    <Background>
      <Header title="알림" onBack={handleClickBack} />
      <View>
        {notiList.map(({id, notiType, msg, checked}) => (
          <View
            key={`notification_${id}`}
            style={[
              notiConatainer,
              checked &&
                css`
                  opacity: 0.5;
                `,
            ]}>
            <View style={header}>
              <Text style={notiTypeHighlight}>
                {notiType === NotificationEnum.NEW_TEAM_MATE
                  ? '팀원 합류'
                  : notiType === NotificationEnum.NEW_FEEDBACK
                  ? '동료 피드백'
                  : '프로젝트'}
              </Text>
              <TouchableOpacity style={closeIcon}>
                <Icons.Close color={'#fff'} />
              </TouchableOpacity>
            </View>
            <Text style={message}>{msg}</Text>
            <Text style={date}>2022.09.11 (일)</Text>
          </View>
        ))}
      </View>
    </Background>
  );
};

const notiConatainer = css`
  width: 100%;
  padding: 16px 24px;
  border: 1px solid transparent;
  border-bottom-color: #000;
`;
const header = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const notiTypeHighlight = css`
  font-weight: 600;
  font-size: 14px;
  color: #1f92f2;
`;
const closeIcon = css`
  width: 16px;
  height: 16px;
`;

const message = css`
  margin: 16px 0;
`;

const date = css`
  color: #a9a9a9;
  font-size: 12px;
`;
export default Notification;
