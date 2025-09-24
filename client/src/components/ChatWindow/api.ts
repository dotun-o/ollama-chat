import type { Action } from "./types";

// Ollama online does not (yet?) allow AJAX query
// for its list of online models via https://ollama.com/api/tags
import ollamaModels from "../../database/ollamaModels";

export async function getOllamaModelsList(dispatch: React.Dispatch<Action>) {
  // const ollamaModels = await (await fetch(import.meta.env.VITE_OLLAMA_MODELS_URL)).json();

  dispatch({ type: "OLLAMA_MODELS", data: ollamaModels.models });
}

export async function ask(dispatch: React.Dispatch<Action>, query: string) {
  dispatch({ type: "ASK" });

  try {
    const result = await (await fetch(import.meta.env.VITE_QUERY_API_URL)).json();
    dispatch({ type: "QUERY_RESPONSE", data: result });
  }
  catch(e) {

  }
  
}
