import type { IOllamaModel } from "../../common/types";

export interface ChatWindowState {
  ollamaModelNames: string[];
  query: string;
  selectedModelName: string;
  isAsking: boolean;
  responses: string[];
}

interface IOllamaModelsListAction {
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

interface IQueryResponseAction {
  type: "QUERY_RESPONSE";
  data: string[];
}

export type Action = 
  | IOllamaModelsListAction
  | ISelectModelAction
  | ITypeQueryAction
  | IQueryResponseAction
  | { type: "ASK" };
