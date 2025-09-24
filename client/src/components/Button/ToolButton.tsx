import "./ToolButton.css";

export type ToolButtonType = "Clipboard" | "Go" | "Search";

interface Props {
  type: ToolButtonType;
  label: string;
  showLabel: boolean;
  disabled?: boolean;
  onClick: () => void
}

function ToolButton({ type, label, showLabel, disabled = false, onClick }: Props) {
  return (
    <div className="tool-button">
      <button
        type="button"
        title={label}
        onClick={onClick}
        disabled={disabled}
      >
        { getToolButtonIcon(type) }
      </button>
      {showLabel && <span className="label">{label}</span>}
    </div>
  );
}

function getToolButtonIcon(type: ToolButtonType) {
  switch(type) {
    case "Clipboard":
      return <span className="icon clipboard"></span>;
    case "Go":
      return <span className="icon go"></span>;
    case "Search":
      return <span className="icon search"></span>;
    default:
      throw new Error("No tool type was specified.")
  }
}

export default ToolButton;
