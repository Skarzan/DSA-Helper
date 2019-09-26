import React from "react";
import ReactToast from "react-bootstrap/Toast";
import { useSelector, useDispatch } from "react-redux";
import { deleteToast } from "../actions";

import "../styles/Toast.scss";

/**
 * Displays a section with little status messages.
 * The header and body text is provided by redux store
 */
export default function Toast() {
  const dispatch = useDispatch();

  // the toasts - array
  const toasts = useSelector(state => state.toast);

  /**
   * creates a list of <ReactToast> elements with their corresponding titles and messages
   */
  const showToasts = () => {
    return toasts.map((toast, index) => {
      return (
        <div className="singleToast" key={`${index} ${toast.head}`}>
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
