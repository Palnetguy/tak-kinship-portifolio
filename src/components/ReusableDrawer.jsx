import React, { useEffect } from "react";
import "../css/ReusableDrawer.css";

const Drawer = ({ isOpen, onClose, children }) => {
  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  // Prevent scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} aria-hidden="true" />
      <aside
        role="dialog"
        aria-modal="true"
        className={`drawer ${isOpen ? "open" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close drawer"
          className="drawer-close-button"
        >
          &times;
        </button>
        <div className="drawer-content">{children}</div>
      </aside>
    </>
  );
};

export default Drawer;
