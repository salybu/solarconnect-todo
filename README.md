# SolarConnect Todo List 과제

## 데모 링크
https://brave-blackwell-2c753d.netlify.app

## 실행 방법
패키지 매니저 Yarn 사용

```
# install 
$ yarn

# serve with hot reload at localhost:3000
$ yarn start
```

## 구현 사항

베이스 코드(https://codesandbox.io/s/long-haze-9v8jt?file=/src/components/todo/TodoService.tsx) 를 기반으로 수정

- 현재시간 표시, Todo 완료 처리
- 완료 목표일 입력 및 출력 (antd Datepicker 사용)
- 예외 상황에 Modal 사용 (antd Modal 사용)
- [버그 수정] Todo 삭제, 추가 로직
- 날짜 및 미완료 순으로 정렬
- 할 일 없을 때, No data 출력

## 적용기술

React, Hook, antd

