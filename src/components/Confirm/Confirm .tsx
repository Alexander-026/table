import React, {FC} from 'react';
import styles from './Confirm.module.scss'
import Button from '../UI/Button/Button';

type ConfirmProps = {
  text: string;
  ok: () => void;
  cancel: () => void
}

const Confirm:FC<ConfirmProps>  = ({cancel,ok,text}) => {
  return (
    <div className={styles.confirm}>
      <h2 className={styles.confirmText}>{text}</h2>
      <div className={styles.confirmBtns}>
        <Button onClick={cancel} variant='secondary' uppercase>Cancel</Button>
        <Button onClick={ok} variant='primary' uppercase>Agree</Button>
      </div>
    </div>
  );
};

export default Confirm ;