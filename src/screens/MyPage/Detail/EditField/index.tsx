import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  DefaultModal as Modal,
  DefaultText as Text,
  RoundSquareButton,
  Icons,
} from '../../../../components';
import {css} from '@emotion/native';
import api from '../../../../api';
import userStore from '../../../../store/userStore';

type Props = {
  _field: string;
  onClose: () => void;
  isVisible: boolean;
};
const EditField = ({_field, onClose, ...rest}: Props) => {
  const [open, setOpen] = useState<'category' | 'field' | undefined>();
  const [categoryList, setCategoryList] = useState<{[key in string]: string}>();
  const [fieldList, setFieldList] = useState<{[key in string]: string}>();
  const {user, setUserProfile} = userStore();
  const [{field, category}, setPersonalInfo] = useState<{
    field: string;
    category: string;
  }>({field: _field, category: '프론트엔드 개발'});

  const getFields = async (category: string, _code?: string) => {
    const code = _code
      ? _code
      : categoryList
      ? categoryList[category]
      : undefined;
    if (!code) return;
    const {data} = await api.user.getFields(code);

    let first: string | undefined;
    const list = data.reduce((prev, cur, idx) => {
      if (idx === 0) first = cur.title;
      return {...prev, [cur.title]: cur.code};
    }, {});

    setFieldList(list);
    return first;
  };

  const handleSelectCategory = async (category: string) => {
    const firstField = await getFields(category);

    if (firstField) {
      setPersonalInfo(prev => ({...prev, field: firstField}));
      setOpen('field');
    }
  };

  const init = async () => {
    const {data} = await api.user.getCategory();
    const list: {[key in string]: string} = data.reduce(
      (prev, cur) => ({...prev, [cur.title]: cur.code}),
      {},
    );

    setCategoryList(list);

    const code = list[category];
    getFields(category, code);
  };

  useEffect(() => {
    init();
  }, []);

  const handleClickSave = async () => {
    if (!fieldList || !user) return;
    try {
      await api.user.updateUserInfo({
        jobField: fieldList[field],
      });
      setUserProfile({...user, jobFieldDetail: field});
      onClose();
    } catch (e) {}
  };
  return (
    <Modal {...rest} close onClose={onClose}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
          <Text style={_title}>대표 분야를 선택해 주세요</Text>
          <View
            style={css`
              height: 54px;
              z-index: 999;
              position: relative;
              margin-bottom: 12px;
            `}>
            <View style={_fieldButton}>
              <TouchableOpacity
                style={_fieldItem}
                onPress={() =>
                  setOpen(open === 'category' ? undefined : 'category')
                }>
                <Text style={_text}>{category}</Text>
                <View style={_icon}>
                  <Icons.Back />
                </View>
              </TouchableOpacity>
              {open === 'category' &&
                categoryList &&
                Object.entries(categoryList)
                  .filter(([_category]) => category !== _category)
                  .map(([category, code]) => (
                    <TouchableOpacity
                      onPress={() => {
                        setPersonalInfo(prev => ({...prev, category}));
                        handleSelectCategory(category);
                      }}
                      key={`category_${category}_${code}`}
                      style={[
                        _fieldItem,
                        css`
                          border: 0px solid #35353a;
                          border-top-width: 1px;
                        `,
                      ]}>
                      <Text style={_text}>{category}</Text>
                    </TouchableOpacity>
                  ))}
            </View>
          </View>
          <View
            style={css`
              height: 54px;
              position: relative;
              z-index: 9;
            `}>
            <View style={_fieldButton}>
              <TouchableOpacity
                style={_fieldItem}
                onPress={() => setOpen(open === 'field' ? undefined : 'field')}>
                <Text style={_text}>{field}</Text>
                <View style={_icon}>
                  <Icons.Back />
                </View>
              </TouchableOpacity>
              {open === 'field' &&
                fieldList &&
                Object.entries(fieldList)
                  .filter(([_field]) => field !== _field)
                  .map(([field, code]) => (
                    <TouchableOpacity
                      key={`field${field}_${code}`}
                      style={[
                        _fieldItem,
                        css`
                          border: 0px solid #35353a;
                          border-top-width: 1px;
                        `,
                      ]}
                      onPress={() => {
                        setPersonalInfo(prev => ({...prev, field}));
                        setOpen(undefined);
                      }}>
                      <Text style={_text}>{field}</Text>
                    </TouchableOpacity>
                  ))}
            </View>
          </View>
          <RoundSquareButton
            size="m"
            type="primary"
            style={_button}
            onPress={handleClickSave}>
            변경사항 저장
          </RoundSquareButton>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
const _title = css`
  font-weight: 600;
  font-size: 24px;
  text-align: center;
  color: #fff;
  margin-bottom: 40px;
`;

const _button = css`
  margin-top: 320px;
`;

const _fieldButton = css`
  margin-bottom: 16px;
  background: #27272a;
  border-radius: 12px;
  position: absolute;
  width: 100%;
  z-index: 999;
`;

const _fieldItem = css`
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
  height: 54px;
  width: 100%;
`;
const _icon = css`
  width: 16px;
  height: 16px;
  transform: rotate(270deg);
`;

const _text = css`
  font-size: 18px;
`;
export default EditField;
