import { ReactElement } from 'react';
import { Modal as ModalComponent } from 'antd';

export interface IModalProps {
  isShown: boolean;
  title: string;
  message: string;
  hide: () => void;
}

export const Modal = (props: IModalProps): ReactElement => {
  return (
    <ModalComponent title={props.title} visible={props.isShown} onOk={props.hide} onCancel={props.hide}>
      {props.message}
    </ModalComponent>
  );
};
