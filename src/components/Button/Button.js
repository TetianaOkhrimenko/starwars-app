import "./Button.css";

export default function Button({ handleClick, children }) {
  return (
    <button className="Button" type="button" onClick={handleClick}>
      {children}
    </button>
  );
}
