import React, {useEffect, useMemo, useState} from 'react';
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

type Props = ProjectIniType;
const Detail = (data: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {dday, endDate, iniSeq, iniName} = useMemo(() => data, [data]);
  const [feedbackList, setFeedbackList] = useState<FeedbackType[]>([]);
  const [feedbackEnded, setFeedbackEnded] = useState<boolean>(false);
  const handleBack = () => navigation.goBack();

  const init = async () => {
    //todo api
    const {data} = await api.feedback.getIniFeedbacks(iniSeq);
    setFeedbackEnded(data.wroteFeedback);
    setFeedbackList(data.feedback);
    // setFeedbackList(dummy);
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <Background>
      <Header onBack={handleBack} title={`Ini ${iniSeq}`} />
      <ScrollView>
        <View style={summeryWrap}>
          <Text style={project}>{`Ini ${iniSeq}`}</Text>
          <Text style={iniTitle}>{iniName}</Text>
          <Text style={endDt}>
            마감일: {endDate} {dday}
          </Text>
        </View>
        <Description {...data} wroteFeedback={feedbackEnded} />
        <Feedbacks iniId={iniSeq} feedbackList={feedbackList} />
      </ScrollView>
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
