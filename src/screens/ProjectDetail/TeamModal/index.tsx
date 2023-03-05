import {TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal, {ModalProps} from 'react-native-modal';
import {css} from '@emotion/native';
import {
  DefaultText as Text,
  Icons,
  Progress,
  RoundSquareButton,
} from '../../../components';
import Member from './Member';
import {SafeAreaView} from 'react-native-safe-area-context';
import {GetTeamInfoResType, TeamMemberType} from '../../../api/project';
import api from '../../../api';

type Props = Partial<ModalProps> & {
  onClickClose: () => void;
  onClickAddMember: () => void;
  projectToken: string;
};
const TeamModal = ({
  onClickClose,
  onClickAddMember,
  projectToken,

  ...rest
}: Props) => {
  const [teamData, setTeamData] = useState<GetTeamInfoResType>();
  const getData = async () => {
    try {
      const {data} = await api.project.getProjectTeamInfo(projectToken);
      setTeamData(data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Modal
      {...rest}
      style={background}
      animationIn="fadeInRight"
      animationOut="fadeOutRight"
      onBackdropPress={onClickClose}>
      <SafeAreaView style={container}>
        <TouchableOpacity style={menuButton} onPress={onClickClose}>
          <Icons.Menu />
        </TouchableOpacity>
        {teamData && (
          <>
            <View style={progressWrap}>
              <Text style={label}>진척도</Text>
              <Progress percent={Math.floor(teamData.progress)} />
            </View>
            <View style={teamListWrap}>
              <Text style={label}>팀원</Text>
              <View>
                {teamData.teamMembers.map(member => (
                  <Member key={`team_member_${member.userName}`} {...member} />
                ))}
              </View>
            </View>
            <RoundSquareButton
              style={addButton}
              size="m"
              type="primary"
              onPress={onClickAddMember}>
              + 팀원 추가하기
            </RoundSquareButton>
          </>
        )}
      </SafeAreaView>
    </Modal>
  );
};

export default TeamModal;
const background = css`
  margin: -24px 0;
`;

const container = css`
  height: 100%;
  padding: 82px 26px 40px 30px;
  background-color: #363639;
  margin-left: auto;
`;

const menuButton = css`
  width: 24px;
  height: 24px;
  margin-bottom: 47px;
  margin-left: auto;
`;

const label = css`
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  margin-bottom: 13px;
`;

const progressWrap = css`
  margin-bottom: 46px;
`;

const teamListWrap = css``;

const addButton = css`
  margin-top: 18px;
  width: 244px;
`;
