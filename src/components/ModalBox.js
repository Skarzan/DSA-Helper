import React from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../actions";

import "../styles/modalBox.scss";
/**
 * Shows a modalbox with a given header and content. Can be triggered with Redux action
 */
export default function ModalBox() {
  /**
   * modalInformation {
   *  show: bool that indicates if modal should shown or not
   *  heading: heading of the modal
   *  text: body of the modal
   * }
   */
  const modalInformation = useSelector(state => state.modal);
  const dispatch = useDispatch();

  /**
   * Closes the modal
   */
  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <div className="ModalBox">
      <Modal size="lg" show={modalInformation.show} onHide={handleClose}>
        <Modal.Header className="modalHeader" closeButton>
          <Modal.Title>{modalInformation.heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalBody">{modalInformation.text}</Modal.Body>
      </Modal>
    </div>
  );
}
