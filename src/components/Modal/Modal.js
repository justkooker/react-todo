import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
const modalRoot = document.querySelector('#modal-root');

const Modal = ({ children }) => {
  return createPortal(
    <div className={styles.layout}>
      <div className={styles.modal}>{children}</div>
    </div>,
    modalRoot
  );
};
export default Modal;
