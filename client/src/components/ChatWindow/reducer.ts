import type { Action, IChatWindowState } from "./types";

export const initialState: IChatWindowState = {
  ollamaModelNames: [],
  query: "",
  isAsking: false,
  selectedModel: "",
  chatLog: [],
  notification: { message: "", severity: "info" },
  clipboardMessage: "",
}

export function reducer(state = initialState, action: Action): IChatWindowState {
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
        chatLog: [
          ...state.chatLog,
          { type: "query", content: action.data }
        ]
      };
    case "LOG_RESPONSE":
      return {
        ...state,
        query: "",
        isAsking: false,
        chatLog: [
          ...state.chatLog,
          { type: "response", content: action.data.content }
        ],
        notification: {
          message: "",
          severity: "info"
        }
      };
    case "ERROR":
      return {
        ...state,
        isAsking: false,
        notification: {
          message: "An error occured. Please try your request again.",
          severity: "error"
        }
      };
    case "SET_NOTIFICATION":
      return {
        ...state,
        notification: {
          message: action.data.message,
          severity: action.data.severity
        }
      };
    case "CLEAR_NOTIFICATION":
      return {
        ...state,
        notification: {
          message: "",
          severity: "info"
        }
      };
    case "COPY_TO_CLIPBOARD":
      if(navigator && navigator.clipboard) {
        navigator.clipboard.writeText(state.chatLog.map(l => l.content).join("\n=======>\n"));
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
