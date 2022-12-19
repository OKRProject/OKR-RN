import {View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Background, DefaultText as Text, Header, Icons} from '../../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/main';
import {NotificationEnum, NotificationType} from '../../api/user';
import {css} from '@emotion/native';
import api from '../../api';
interface Props
  extends NativeStackScreenProps<RootStackParamList, 'Notification'> {}

const Notification = ({navigation}: Props) => {
  const [notiList, setNotiList] = useState<NotificationType[]>([]);
  const handleClickBack = () => navigation.goBack();
  const handleClickNotification = (id: number, notiType: NotificationEnum) => {
    //noti type별로 다른 행동?
    api.user.confirmNotification(id);
  };

  const handleClickDeleteNoti = async (id: number) => {
    await api.user.deleteNotification(id);
  };

  const getNotiList = async () => {
    const {data} = await api.user.getNotificationList();
    setNotiList(data);
  };
  useEffect(() => {
    getNotiList();
  }, []);

  return (
    <Background>
      <Header title="알림" onBack={handleClickBack} />
      <View>
        {notiList.map(({id, notiType, msg, checked}) => (
          <TouchableOpacity
            onPress={() => handleClickNotification(id, notiType)}
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
              <TouchableOpacity
                style={closeIcon}
                onPress={e => {
                  e.stopPropagation();
                  handleClickDeleteNoti(id);
                }}>
                <Icons.Close color={'#fff'} />
              </TouchableOpacity>
            </View>
            <Text style={message}>{msg}</Text>
            <Text style={date}>2022.09.11 (일)</Text>
          </TouchableOpacity>
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
