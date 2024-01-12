import {  ReactNode } from "react";
import "./Modal.css";
import { IoCloseOutline } from "react-icons/io5";

interface ModalProps {
  children: ReactNode;
}

const Modal = ({ children }: ModalProps) => {
  return (
    <div className="overlay">
      <div className="closeBtnSection">
        <div></div>
        <IoCloseOutline onClick={() => {}} size="40px" />
      </div>
      <div className="modalContainer">{children}</div>
    </div>
  );
};

export default Modal;
