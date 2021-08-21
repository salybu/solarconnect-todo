import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { PlusCircleOutlined } from '@ant-design/icons';
import { DatePicker } from 'antd';
import { Itodo } from 'components/todo/TodoService';
import { Moment } from 'moment';
import { Modal } from 'components/common/Modal';

const CircleButton = styled.button<{ open: boolean }>`
  background: #33bb77;
  width: 35px;
  height: 35px;
  font-size: 40px;
  left: 50%;
  transform: translate(50%, 0%);
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  border-bottom: 1px solid #eeeeee;
`;

const InsertFormBackGround = styled.div`
  background: #eeeeee;
  padding-left: 40px;
  padding-top: 36px;
  padding-right: 60px;
  padding-bottom: 36px;
`;

const InsertForm = styled.form`
  position: relative;
  background-color: #fff;
  border-radius: 30px;
  padding: 15px;
  & div {
    display: flex;
    & label {
      width: 23%;
      font-size: 21px;
      text-align: center;
      padding: 12px 0;
    }
  }
`;

const InsertFormTitle = styled.div`
  justify-content: center;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #dddddd;
  width: 75%;
  outline: none;
  font-size: 21px;
  box-sizing: border-box;
  color: #119955;
  &::placeholder {
    color: #dddddd;
    font-size: 16px;
  }
`;

const DatePickerLabel = styled.label<{ isAlert: boolean }>`
  color: #000000;
  ${(props) =>
    props.isAlert
      ? css`
          color: red;
          font-weight: bold;
        `
      : css`
          color: #000000;
        `}
`;

interface TodoCreateProps {
  nextId: number;
  createTodo: (todo: Itodo) => void;
  incrementNextId: () => void;
}

const TodoCreate = ({ nextId, createTodo, incrementNextId }: TodoCreateProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [targetDate, setTargetDate] = useState({
    isAlert: false,
    targetDate: '',
  });
  const [modal, setModal] = useState({
    isShown: false,
    title: 'Fill All Your Todo Form',
    message: '',
  });

  const handleToggle = () => setOpen(!open);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 새로고침 방지

    const valid = validation();

    if (valid) {
      createTodo({
        id: nextId,
        text: value,
        done: false,
        targetDate: targetDate.targetDate,
      });
      incrementNextId(); // nextId 하나 증가

      setValue(''); // input 초기화
      setOpen(false); // open 닫기
      setTargetDate({
        isAlert: false,
        targetDate: '',
      });
    }
  };

  const onChange = (date: Moment | null, dateString: string) => {
    const isValid = isValidDate(dateString);

    if (isValid) {
      setTargetDate({
        isAlert: false,
        targetDate: dateString,
      });
    }
  };

  function isValidDate(dateString: string) {
    let yesterday = new Date();
    yesterday = new Date(yesterday.setDate(yesterday.getDate() - 1));
    const selected = new Date(dateString);

    if (yesterday > selected) {
      showAlert('오늘 이후 날짜를 선택하세요');
      setTargetDate({
        ...targetDate,
        isAlert: true,
      });
      return;
    }
    return true;
  }

  const validation = () => {
    if (value === '') {
      showAlert('할 일을 입력하세요');
      return;
    }
    if (targetDate.targetDate === '') {
      showAlert('목표 날짜를 입력하거나, 오늘 이후 날짜를 선택하세요');
      return;
    }
    return true;
  };

  const showAlert = (message: string) => {
    setModal({ ...modal, message, isShown: true });
  };

  const hideModal = () => {
    setModal({ ...modal, isShown: false });
  };

  return (
    <>
      <InsertFormPositioner>
        <InsertFormBackGround>
          <InsertForm onSubmit={handleSubmit}>
            <InsertFormTitle>
              <h2>"Add Your Todo"</h2>
              <CircleButton onClick={handleToggle} open={open}>
                <PlusCircleOutlined />
              </CircleButton>
            </InsertFormTitle>
            <div>
              <label>Todo</label>
              <Input autoFocus placeholder="What's need to be done?" onChange={handleChange} value={value} />
            </div>
            <div>
              <DatePickerLabel isAlert={targetDate.isAlert}>Target Date</DatePickerLabel>
              <DatePicker onChange={onChange} style={{ width: '75%' }} />
            </div>
          </InsertForm>
          {modal.isShown && <Modal title={modal.title} message={modal.message} hide={hideModal} isShown={modal.isShown} />}
        </InsertFormBackGround>
      </InsertFormPositioner>
    </>
  );
};

export default React.memo(TodoCreate);
