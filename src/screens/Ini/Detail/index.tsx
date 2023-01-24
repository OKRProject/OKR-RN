import React, {useEffect, useState} from 'react';
import {ProjectIniType} from '../../../api/project';
import {css} from '@emotion/native';
import {View} from 'react-native';
import {Background, DefaultText as Text, Header} from '../../../components';

import Description from '../Description';
import Feedbacks from '../Feedbacks';
import {ScrollView} from 'react-native-gesture-handler';
import {RootStackParamList} from '../../../navigation/main';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {FeedbackType} from '../../../api/feedback';
import api from '../../../api';

type Props = {
  initiativeToken: string;
};
const Detail = ({initiativeToken: iniToken}: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [iniInfo, setIniInfo] = useState<ProjectIniType>();
  const [feedbackList, setFeedbackList] = useState<FeedbackType[]>([]);
  const [feedbackEnded, setFeedbackEnded] = useState<boolean>(false);
  const handleBack = () => navigation.goBack();

  const getIniInfo = async () => {
    try {
      const {data} = await api.project.getProjectIni(iniToken);
      setIniInfo(data);
    } catch (e) {}
  };
  const init = async () => {
    //todo api 정리
    getIniInfo();
    const {data} = await api.feedback.getIniFeedbacks(iniToken);
    setFeedbackEnded(data.wroteFeedback);
    setFeedbackList(data.feedback);
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <Background>
      <Header
        onBack={handleBack}
        title={`Ini ${iniInfo?.initiativeIndex ?? ''}`}
      />
      {iniInfo ? (
        <ScrollView>
          <View style={summeryWrap}>
            <Text style={project}>{`Ini ${iniInfo.initiativeToken}`}</Text>
            <Text style={iniTitle}>{iniInfo.initiativeName}</Text>
            <Text style={endDt}>
              마감일: {iniInfo.endDate} {iniInfo.dDay}
            </Text>
          </View>
          <Description {...iniInfo} wroteFeedback={feedbackEnded} />
          <Feedbacks
            initiativeToken={iniInfo.initiativeToken}
            feedbackList={feedbackList}
          />
        </ScrollView>
      ) : (
        <></>
      )}
    </Background>
  );
};

const summeryWrap = css`
  padding: 22px 30px 27px;
`;
const project = css`
  font-weight: 600;
  font-size: 16px;
  color: #636363;
`;

const iniTitle = css`
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #fdbd40;
  margin: 8px 0 14px;
`;

const endDt = css`
  font-weight: 500;
`;

export default Detail;
