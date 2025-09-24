import type { Action, ChatWindowState } from "./types";

export const initialState: ChatWindowState = {
  ollamaModelNames: [],
  query: "",
  isAsking: false,
  selectedModelName: "",
  responses: []
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
        selectedModelName: action.data,
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
    case "QUERY_RESPONSE":
      return {
        ...state,
        responses: [ ...state.responses, ...action.data ]
      };
    default:
      return state;
  }
}
