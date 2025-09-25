import { useCallback, useEffect, useReducer } from "react";
import { ask, getOllamaModelsList } from "./api";
import { reducer, initialState } from "./reducer";
import { ErrorBoundary } from "react-error-boundary";
import GenericErrorView from "../ErrorView/GenericErrorView";

import "./ChatWindow.css";
import ToolButton from "../Button/ToolButton";
import Row from "../Row/Row";
import NotifcationBanner from "../NotifcationBanner/NotifcationBanner";

function ChatWindow() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const canSubmit = useCallback(() => {
    return state.selectedModel !== "" && state.query !== "";
  }, [state.selectedModel, state.query]);

  const handleRequest = useCallback(() => {
    dispatch({ type: "LOG_QUERY", data: state.query });
    dispatch({ type: "SET_NOTIFICATION", data: { message: "Thinking...", severity: "info" } });
    ask(dispatch, state.query, state.selectedModel);
  }, [state.selectedModel, state.query]);

  const handleCopyToClipboard = useCallback(() => {
    dispatch({ type: "COPY_TO_CLIPBOARD" });
    setTimeout(() => dispatch({ type: "CLEAR_CLIPBOARD_MESSAGE" }), 2000);
  }, [state.chatLog]);

  useEffect(() => {
    getOllamaModelsList(dispatch)
  }, []);

  return (
    <ErrorBoundary fallback=<GenericErrorView />>
      <main>
        <div className="fixed-top">
          <NotifcationBanner
            text={state.notification.message}
            severity={state.notification.severity}
            shouldShow={state.notification.message !== ""}
            onClose={() => dispatch({ type: "CLEAR_NOTIFICATION" })}
          />
        </div>
        <div className="console">
          {
            state.chatLog.length > 0 && 
            (<>
              <Row alignment="end">
                <span className="clipboard-message">{state.clipboardMessage}</span>
                <ToolButton
                  type="Clipboard"
                  label="Copy To Clipboard"
                  showLabel={false} onClick={() => {
                    dispatch({ type: "COPY_TO_CLIPBOARD" });
                    setTimeout(() => dispatch({ type: "CLEAR_CLIPBOARD_MESSAGE" }), 2000);
                  }}
                />
              </Row>
              <div className="response-box">
                {state.chatLog.map((r, i) => <span key={i} className={r.type}>{r.content}</span>)}
              </div>
              <Row alignment="end">
                <span className="clipboard-message">{state.clipboardMessage}</span>
                <ToolButton
                  type="Clipboard"
                  label="Copy To Clipboard"
                  showLabel={false} onClick={handleCopyToClipboard}
                />
              </Row>
            </>)
          }
          <div className="bg-white sticky-bottom">
            <textarea
              value={state.query}
              disabled={state.isAsking}
              onChange={e => dispatch({ type: "TYPE_QUERY", data: e.target.value })}
            />
            <Row alignment="end">
              <select onChange={e => dispatch({ type: "SELECT_MODEL", data: e.target.value })}>
                <option value="">Select a model</option>
                {state.ollamaModelNames.map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
              <ToolButton
                type="Go"
                label="Ask"
                showLabel={false}
                disabled={!canSubmit()}
                onClick={handleRequest}
              />
            </Row>
          </div>
        </div>
      </main>
    </ErrorBoundary>
  );
}

export default ChatWindow;
