import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DefaultText as Text, Feedback} from '../../../components';
import {css} from '@emotion/native';
import {FeedbackEnum, FeedbackType} from '../../../api/feedback';
type Props = {
  iniId: string;
};
const Feedbacks = ({iniId}: Props) => {
  const [feedbackList, setFeedbackList] = useState<FeedbackType[]>([]);

  const init = () => {
    //todo api
    setFeedbackList(dummy);
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <View>
      {feedbackList.length > 0 && (
        <>
          <Text style={title}>팀원들의 피드백 ({feedbackList.length})</Text>
          {feedbackList.map(feedback => (
            <Feedback
              key={`ini_${iniId}_feedback${feedback.feedbackId}`}
              {...feedback}
            />
          ))}
        </>
      )}
    </View>
  );
};

const container = css``;
const title = css`
  margin: 40px 16px 16px;
  font-weight: 600;
  font-size: 20px;
`;
export default Feedbacks;

const dummy: FeedbackType[] = [
  {
    feedbackId: 0,
    text: '잘한 점:것은 곧 풀이 동산에는 피다. 그들을 피는 것이 더운지라 부패뿐이다. 천자만홍이 그들은...',
    grade: FeedbackEnum.BEST_RESULT,
    writerId: 3,
    writerName: '김모아',
    writerJob: 'UI/UX 디자이너',
    profileImage: '',
  },
  {
    feedbackId: 1,
    text: '잘한 점:것은 곧 풀이 동산에는 피다. 그들을 피는 것이 더운지라 부패뿐이다. 천자만홍이 그들은...',
    grade: FeedbackEnum.GOOD_IDEA,
    writerId: 3,
    writerName: '김모아',
    writerJob: 'UI/UX 디자이너',
    profileImage: '',
  },
  {
    feedbackId: 2,
    text: '잘한 점:것은 곧 풀이 동산에는 피다. 그들을 피는 것이 더운지라 부패뿐이다. 천자만홍이 그들은...',
    grade: FeedbackEnum.COMMUNI_KING,
    writerId: 3,
    writerName: '김모아',
    writerJob: 'UI/UX 디자이너',
    profileImage: '',
  },
];
