import React, {useMemo, useEffect} from 'react';
import {createPortal} from "react-dom";
import styles from "./ModalWindow.module.scss";
const body: HTMLBodyElement | null = document.querySelector("body");

type ModalWindowProps = {
  children: React.ReactNode;
  visibility: boolean
};

const ModalWindow:React.FC<ModalWindowProps> = ({children, visibility}) => {
  const modal:HTMLDivElement|null = useMemo(() => visibility ? document.createElement("div") : null, [visibility])
  useEffect(() => {
    if(modal) {
      modal.classList.add(styles.ModalWindow)
      body?.classList.add("fixed")
      body?.appendChild(modal)
      return () => {
        body?.removeChild(modal);
        body?.classList.remove("fixed");
      }
    }
  }, [modal])

  const wrapperForChildren = (
    <div className={styles.wrapperChildren}>
      {children}
    </div>
  );

  return  modal ? createPortal(wrapperForChildren, modal) : <></>
};

export default ModalWindow;