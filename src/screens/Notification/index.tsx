import {View, TouchableOpacity, ScrollView} from 'react-native';
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
  const handleClickNotification = (
    token: string,
    notiType: NotificationEnum,
  ) => {
    //noti type별로 다른 행동?
    api.user.confirmNotification(token);
  };

  const getNotiList = async () => {
    const {data} = await api.user.getNotificationList();
    setNotiList(data);
  };

  const handleClickDeleteNoti = async (token: string) => {
    try {
      await api.user.deleteNotification(token);
      getNotiList();
    } catch (e) {}
  };
  useEffect(() => {
    getNotiList();
  }, []);

  return (
    <Background>
      <Header title="알림" onBack={handleClickBack} />
      <ScrollView style={_scrollWrap}>
        {notiList.map(({notiToekn, notiType, msg, checked}, idx) => (
          <TouchableOpacity
            onPress={() => handleClickNotification(notiToekn, notiType)}
            key={`notification_${notiToekn}_${idx}`}
            style={[
              notiContainer,
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
                  handleClickDeleteNoti(notiToekn);
                }}>
                <Icons.Close color={'#fff'} />
              </TouchableOpacity>
            </View>
            <Text style={message}>{msg}</Text>
            <Text style={date}>2022.09.11 (일)</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Background>
  );
};

const _scrollWrap = css`
  flex: 1;
`;
const notiContainer = css`
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
