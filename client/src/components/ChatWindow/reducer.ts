import type { Action, ChatWindowState, IChatLog } from "./types";

export const initialState: ChatWindowState = {
  ollamaModelNames: [],
  query: "",
  isAsking: false,
  selectedModel: "",
  chatLog: [],
  clipboardMessage: "",
}

export function reducer(state = initialState, action: Action): ChatWindowState {
  switch(action.type) {
    case "OLLAMA_MODELS":
      return {
        ...state,
        ollamaModelNames: action.data.map(el => el.name),
        isAsking: false
      };
    case "SELECT_MODEL":
      return {
        ...state,
        selectedModel: action.data,
        isAsking: false
      };
    case "TYPE_QUERY":
      return {
        ...state,
        query: action.data
      };
    case "ASK":
      return {
        ...state,
        isAsking: true
      };
    case "LOG_QUERY":
      return {
        ...state,
        chatLog: [ ...state.chatLog, { type: "query", content: action.data } ]
      };
    case "LOG_RESPONSE":
      return {
        ...state,
        query: "",
        isAsking: false,
        chatLog: [ ...state.chatLog, ...action.data.map(d => ({ type: "response", content: d.content } as IChatLog)) ]
      };
    case "ERROR":
      return {
        ...state,
        isAsking: false
      };
    case "COPY_TO_CLIPBOARD":
      if(navigator && navigator.clipboard) {
        navigator.clipboard.writeText(state.chatLog.map(l => l.content).join("\n---\n"));
      }
      return {
        ...state,
        clipboardMessage: "Copied to clipboard!"
      };
    case "CLEAR_CLIPBOARD_MESSAGE":
      return {
        ...state,
        clipboardMessage: ""
      };
    default:
      return state;
  }
}
