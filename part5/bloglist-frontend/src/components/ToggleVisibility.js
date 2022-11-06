import { useState } from "react";

const ToggleVisibility=(props) => {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };
  const toggleVisibility = () => {
    setVisible(!visible);
  };
  return(
    <div>
      <div style={showWhenVisible}>
        <button onClick={toggleVisibility}>new note</button>
      </div>
      <div style={hideWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
};
export default ToggleVisibility;