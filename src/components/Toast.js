import React, { useState, useEffect } from "react";
import ReactToast from "react-bootstrap/Toast";
import { useSelector, useDispatch } from "react-redux";
import { deleteToast } from "../actions";

import "../styles/Toast.scss";

export default function Toast(props) {
  const dispatch = useDispatch();

  const toasts = useSelector(state => state.toast);

  const showToasts = () => {
    return toasts.map((toast, index) => {
      return (
        <div className="singleToast">
          <ReactToast
            show={toast.active}
            onClose={() => dispatch(deleteToast(index))}
            delay={3000}
            autohide
          >
            <ReactToast.Header>
              <div>{toast.header}</div>
            </ReactToast.Header>
            <ReactToast.Body>{toast.body}</ReactToast.Body>
          </ReactToast>
        </div>
      );
    });
  };

  return <div className="Toast">{showToasts()}</div>;
}
