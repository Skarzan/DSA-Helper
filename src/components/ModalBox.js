import React from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { showModal, closeModal } from "../actions";

export default function ModalBox() {
  const modalInformation = useSelector(state => state.modal);
  const dispatch = useDispatch();

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
