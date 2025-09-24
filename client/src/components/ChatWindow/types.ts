import type { IOllamaModel } from "../../common/types";

export interface ChatWindowState {
  ollamaModelNames: string[];
  query: string;
  selectedModel: string;
  isAsking: boolean;
  chatLog: IChatLog[];
  clipboardMessage: string;
}

export interface IChatLog {
  type: "query" | "response";
  content: string
}

interface IOllamaModelListAction {
  type: "OLLAMA_MODELS";
  data: IOllamaModel[];
}

interface ISelectModelAction {
  type: "SELECT_MODEL";
  data: string;
}

interface ITypeQueryAction {
  type: "TYPE_QUERY";
  data: string;
}

interface ILogQueryAction {
  type: "LOG_QUERY";
  data: string;
}

interface ILogResponseAction {
  type: "LOG_RESPONSE";
  data: IChatLog[];
}

interface IErrorAction {
  type: "ERROR";
  data: Error;
}

export type Action = 
  | IOllamaModelListAction
  | ISelectModelAction
  | ITypeQueryAction
  | ILogQueryAction
  | ILogResponseAction
  | IErrorAction
  | { type: "ASK" }
  | { type: "COPY_TO_CLIPBOARD" }
  | { type: "CLEAR_CLIPBOARD_MESSAGE" };
