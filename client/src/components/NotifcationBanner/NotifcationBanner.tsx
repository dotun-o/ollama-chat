import type { Severity } from "../../common/types";
import "./NotifcationBanner.css";

interface Props {
  text: string;
  severity: Severity;
  shouldShow: boolean;
  onClose: () => void; // This should typically reset the condition that drives shouldShow
}

function NotifcationBanner({ text, severity, shouldShow, onClose }: Props) {
  if(!shouldShow) {
    return null;
  }

  return (
    <div className={`notification-banner ${severity}`}>
      <div className="container">
        <span className="text">{text}</span>
        <span className="close-button" onClick={onClose}>X</span>
      </div>
    </div>
  );
}

export default NotifcationBanner;
