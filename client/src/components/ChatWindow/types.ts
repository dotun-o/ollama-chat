import type { IOllamaModel, Severity } from "../../common/types";

export interface ChatWindowState {
  ollamaModelNames: string[];
  query: string;
  selectedModel: string;
  isAsking: boolean;
  chatLog: IChatLog[];
  notification: { message: string; severity: Severity; };
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
  data: { content: string };
}

interface IErrorAction {
  type: "ERROR";
  data: Error;
}

interface ISetNotificationAction {
  type: "SET_NOTIFICATION",
  data: { message: string; severity: Severity }
}

export type Action = 
  | IOllamaModelListAction
  | ISelectModelAction
  | ITypeQueryAction
  | ILogQueryAction
  | ILogResponseAction
  | IErrorAction
  | ISetNotificationAction
  | { type: "ASK" }
  | { type: "COPY_TO_CLIPBOARD" }
  | { type: "CLEAR_NOTIFICATION" }
  | { type: "CLEAR_CLIPBOARD_MESSAGE" };
