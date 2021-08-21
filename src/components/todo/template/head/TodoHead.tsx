import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

const TodoHeadBlock = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 52px;
  padding-bottom: 24px;
  border-bottom: 3px solid #33bb77;
`;

const DateText = styled.div`
  font-size: 26px;
  color: #119955;
  padding-left: 10px;
`;

const DayText = styled.div`
  font-size: 24px;
  color: #119955;
  padding-top: 3px;
`;

const TimeText = styled.div`
  font-size: 26px;
  color: #119955;
  padding-right: 50px;
`;

const TodoHead = () => {
  //@TODO 현재 시간을 표시해야합니다.
  const [curDate, setCurDate] = useState({
    date: '',
    time: '',
    dayOfWeek: '',
  });

  useEffect(() => {
    setDateTime();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDateTime();
    }, 1000);
    return () => clearTimeout(timer);
  }, [curDate]);

  const getDate = (date: Date) => {
    const monthEng = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [monthNum, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];

    const dateString = monthEng[monthNum] + ' ' + day + ', ' + year;
    return dateString;
  };

  const getDayOfWeek = (date: Date) => {
    const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = date.getDay();

    return week[dayOfWeek];
  };

  const getTime = useCallback((date: Date) => {
    const [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];
    const [hourFixed, AMPM] = hour > 12 ? [hour - 12, 'PM'] : [hour, 'AM'];
    const [hourFin, minutesFin, secondsFin] = [fillZero(2, hourFixed), fillZero(2, minutes), fillZero(2, seconds)];
    const dateString = hourFin + ':' + minutesFin + ':' + secondsFin + ' ' + AMPM;
    return dateString;
  }, []);

  const fillZero = (width: number, num: number) => {
    const str = num.toString();
    return str.length >= width ? str : '0'.repeat(width - str.length) + str; // 남는 길이만큼 0으로 채움
  };

  const setDateTime = useCallback(() => {
    const newDate = new Date();
    const [date, dayOfWeek, time] = [getDate(newDate), getDayOfWeek(newDate), getTime(newDate)];

    setCurDate({
      time,
      date,
      dayOfWeek,
    });
  }, [curDate]);

  return (
    <TodoHeadBlock>
      <TimeText>{curDate.time}</TimeText>
      <DayText>{curDate.dayOfWeek}</DayText>
      <DateText>{curDate.date}</DateText>
    </TodoHeadBlock>
  );
};

export default React.memo(TodoHead);
