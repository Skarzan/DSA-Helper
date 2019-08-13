import React from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../actions";

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
    <Modal size="lg" show={modalInformation.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalInformation.heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalInformation.text}</Modal.Body>
    </Modal>
  );
}
