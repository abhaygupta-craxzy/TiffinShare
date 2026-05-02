import React from "react";

export default function Modal({ children, onClose }) {
  return (
    <div style={{
      position:"fixed", inset:0, background:"rgba(0,0,0,0.7)",
      display:"flex", justifyContent:"center", alignItems:"center", zIndex:1000
    }}>
      <div style={{ background:"#020617", padding:20, borderRadius:12 }}>
        {children}
        <button onClick={onClose} style={{ marginTop:10 }}>Cancel</button>
      </div>
    </div>
  );
}