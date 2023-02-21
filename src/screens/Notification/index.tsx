import {View, TouchableOpacity, ScrollView, Image} from 'react-native';
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
      {notiList.length > 0 ? (
        <ScrollView style={_scrollWrap}>
          {notiList.map(({notiToekn, notiType, msg, status}, idx) => (
            <TouchableOpacity
              onPress={() => handleClickNotification(notiToekn, notiType)}
              key={`notification_${notiToekn}_${idx}`}
              style={[
                notiContainer,
                status === 'CHECKED' &&
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
                    : '진행 상황'}
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
      ) : (
        <View style={_emptyWrap}>
          <Image
            style={{width: 100, height: 100}}
            source={require('../../img/icn-empty-noti.png')}
          />
          <Text style={_emptyText}>새로운 알림이 없어요</Text>
        </View>
      )}
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
  color: #1f92f2;
`;
const closeIcon = css`
  width: 16px;
  height: 16px;
`;

const message = css`
  margin: 16px 16px 16px 0;
`;

const date = css`
  color: #a9a9a9;
  font-size: 14px;
`;

const _emptyWrap = css`
  width: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const _emptyText = css`
  color: #a9a9a9;
  margin-top: 16px;
  margin-bottom: 150px;
  font-weight: 500;
`;
export default Notification;
