import React from "react";
import ReactDOM from "react-dom";
const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  backgroundColor: "rgb(34,34,34)",
  transform: "translate(-50%, -50%)",
  zIndex: 1000,
  height: "90%",
  width: "90%",
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: 1000,
};

function CartModal({ children, onClose }) {
  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY_STYLES}>
        <div style={MODAL_STYLES}>
          <button onClick={onClose}>
            <div className="bg-red-500 ml-[90%] w-[30px] h-[30px] absolute right-2 top-2 flex items-center justify-center">
              X
            </div>
          </button>
          {children}
        </div>
      </div>
    </>,
    document.getElementById("cart-modal")
  );
}

export default CartModal;
