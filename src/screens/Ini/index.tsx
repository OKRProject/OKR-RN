import React, {useState} from 'react';
import {css} from '@emotion/native';
import {Image, TouchableOpacity, View} from 'react-native';
import {DefaultText as Text, Header, RoundSquareButton} from '../../components';
import {ScrollView} from 'react-native-gesture-handler';
import Feedbacks from './Feedbacks';
import {RootStackParamList} from '../../navigation/main';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import query from '../../query';
import {dateStringToViewText} from '../../utils/calendar';
import {SafeAreaView} from 'react-native-safe-area-context';
import useGetFeedbacks from '../../query/feedback/useGetFeedbacks';
import useCompleteIni from '../../query/project/useCompleteIni';
import {useQueryClient} from 'react-query';
import keys from '../../query/keys';
import Modal from 'react-native-modal';
import useDeleteIni from '../../query/project/useDeleteIni';
import {RoleTypeEnum} from '../../api/project';
interface Props extends NativeStackScreenProps<RootStackParamList, 'Ini'> {}
const Ini = ({route, navigation}: Props) => {
  const initiativeToken = route.params.initiativeToken;
  const queryClient = useQueryClient();
  const {mutateAsync: deleteIni} = useDeleteIni({initiativeToken});
  const [isModalOpen, setModal] = useState<boolean>(false);
  const {data: initiative} = query.project.useGetIniInfo({
    initiativeToken,
  });

  const {data: feedbacks} = useGetFeedbacks({
    initiativeToken,
  });

  const {mutateAsync: asyncComplete} = useCompleteIni();
  const handleBack = () => {
    //@ts-ignore
    if (route.params?.onGoBack) {
      //@ts-ignore
      route.params?.onGoBack();
    }
    navigation.goBack();
  };

  const handleComplete = async () => {
    if (initiative?.data.myInitiative && !initiative.data.done) {
      try {
        await asyncComplete(route.params.initiativeToken);

        queryClient.invalidateQueries([
          keys.GET_INITIATIVE_LIST,
          initiative.data.keyResultToken,
        ]);

        navigation.goBack();
      } catch (e) {}
    }
  };

  const handleFeedback = () => {
    if (
      initiative?.data.done &&
      !feedbacks?.data.wroteFeedback &&
      initiative.data.keyResultToken
    ) {
      navigation.navigate('WriteFeedback', {
        initiativeToken,
        keyResultToken: initiative.data.keyResultToken,
      });
    }
  };

  if (!initiative || !feedbacks) return <></>;
  return (
    <>
      <SafeAreaView
        edges={['right', 'top', 'left']}
        style={css`
          flex: 1;
          background-color: #202227;
        `}>
        <Header
          onBack={handleBack}
          onEdit={
            !initiative.data.done &&
            (initiative.data.myInitiative ||
              initiative.data.roleType === RoleTypeEnum.leader)
              ? () => {
                  setModal(true);
                }
              : undefined
          }
        />
        <View style={_container}>
          <View style={_tagWrap}>
            <Text style={_tag}>{initiative.data.done ? '완료' : '진행중'}</Text>
          </View>
          <Text style={_title}>{initiative.data.initiativeName}</Text>
          <View style={_row}>
            <View style={_userProfile}>
              {initiative.data.user.profileImage && (
                <Image
                  source={{uri: initiative.data.user.profileImage}}
                  style={{width: '100%', height: '100%'}}
                />
              )}
            </View>
            <Text style={_infoText}>{initiative.data.user.userName}</Text>
          </View>
          <View style={_row}>
            <View style={_userProfile}>
              <Image
                source={require('../../img/icn-calendar.png')}
                style={{width: 20, height: 20}}
              />
            </View>
            <Text style={_infoText}>
              {dateStringToViewText(initiative.data.startDate)}-
              {dateStringToViewText(initiative.data.endDate)}
            </Text>
          </View>
          <View style={_desc}>
            <Text>{initiative.data.initiativeDetail}</Text>
          </View>
          {initiative.data.myInitiative &&
          initiative.data.roleType === RoleTypeEnum.leader ? (
            <RoundSquareButton
              size="xs"
              type={initiative.data.done ? 'disable' : 'primary'}
              style={_button}
              onPress={handleComplete}>
              {initiative.data.done ? '완료됨' : '완료하기'}
            </RoundSquareButton>
          ) : (
            initiative.data.done && (
              <RoundSquareButton
                size="xs"
                type={feedbacks.data.wroteFeedback ? 'disable' : 'primary'}
                style={_button}
                onPress={handleFeedback}>
                {feedbacks.data.wroteFeedback
                  ? '피드백 작성 완료'
                  : '피드백 작성하기'}
              </RoundSquareButton>
            )
          )}
        </View>
        <ScrollView
          style={css`
            flex: 1;
            background-color: #18181b;
            padding: 30px 24px;
          `}>
          {feedbacks.data.feedback.length > 0 ? (
            <Feedbacks
              initiativeToken={route.params.initiativeToken}
              feedbackList={feedbacks.data.feedback}
            />
          ) : (
            initiative.data.myInitiative && (
              <View style={_empty}>
                <Text style={_emptyTitle}>아직 피드백이 없어요.</Text>
                <Text style={_emptyDesc}>
                  행동전략을 완료하고 피드백을 받아보세요.
                </Text>
              </View>
            )
          )}
        </ScrollView>
      </SafeAreaView>
      <Modal
        isVisible={isModalOpen}
        style={background}
        onBackdropPress={() => setModal(false)}>
        <View style={_buttonWrap}>
          <TouchableOpacity
            style={_modalButton}
            onPress={() => {
              const {keyResultName, keyResultToken} = initiative.data;
              setModal(false);
              navigation.navigate('AddIni', {
                initiativeToken,
                keyResultName,
                keyResultToken,
              });
            }}>
            <Text>수정하기</Text>
          </TouchableOpacity>
          <View style={_line} />
          <TouchableOpacity
            style={_modalButton}
            onPress={async () => {
              await deleteIni(initiativeToken);
              setModal(false);
              navigation.goBack();
            }}>
            <Text>삭제하기</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

const _container = css`
  padding: 15px 24px;
  align-items: flex-start;
`;

const _tagWrap = css`
  padding: 4px 8px;
  border-radius: 4px;
  background-color: #616166;
`;

const _tag = css`
  font-size: 14px;
  line-height: 17px;
  font-weight: 500;
`;

const _title = css`
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  max-width: 100%;
  margin: 20px 0;
`;

const _row = css`
  flex-direction: row;
  align-items: center;
  margin-bottom: 7px;
`;

const _userProfile = css`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  overflow: hidden;
`;

const _infoText = css`
  margin-left: 6px;
`;

const _desc = css`
  border: 0px solid #35353a;
  border-top-width: 1px;
  border-bottom-width: 1px;
  width: 100%;
  padding: 18px 0;
  margin: 16px 0;
`;

const _button = css`
  width: auto;
  margin-left: auto;
  padding: 10px 20px;
`;

const _empty = css`
  padding: 100px 0;
  align-items: center;
  justify-content: center;
`;

const _emptyTitle = css`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
`;
const _emptyDesc = css`
  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
  color: #a9a9a9;
`;

const background = css`
  margin: -24px 0;
  justify-content: flex-end;
`;

const _buttonWrap = css`
  width: 81px;
  height: 83px;
  background: #27272a;
  border-radius: 6px;
  position: absolute;
  top: 100px;
  right: 50px;
  padding: 4px 8px;
`;

const _modalButton = css`
  width: 100%;
  height: 34px;
  align-items: center;
  justify-content: center;
`;

const _line = css`
  border: 0px solid #35353a;
  border-top-width: 1px;
  width: 100%;
  margin: 4px 0;
`;
export default Ini;
