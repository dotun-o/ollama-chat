import { useEffect, useReducer } from "react";
import { ask, getOllamaModelsList } from "./api";
import ollamaChatLogo from "/ollama-chat-logo.svg";
import { reducer, initialState } from "./reducer";
import { ErrorBoundary } from "react-error-boundary";
import GenericErrorView from "../ErrorView/GenericErrorView";

import "./ChatWindow.css";
import ToolButton from "../Button/ToolButton";
import Row from "../Row/Row";

function ChatWindow() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function canSubmit() {
    return state.selectedModelName !== "" && state.query !== "";
  }

  useEffect(() => {
    getOllamaModelsList(dispatch)
  }, []);

  // TODO
  ollamaChatLogo;

  return (
    <ErrorBoundary fallback=<GenericErrorView />>
      <main>
        <div className="console">
          {
            state.responses.length > 0 && 
            (<>
              <div>{state.responses.toString()}</div>
              <Row alignment="end">
                <ToolButton
                  type="Clipboard"
                  label="Copy To Clipboard"
                  showLabel={false} onClick={() => {}}
                />
              </Row>
            </>)
          }
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
              onClick={() => ask(dispatch, state.query)}
            />
          </Row>
        </div>
      </main>
    </ErrorBoundary>
  );
}

export default ChatWindow;
