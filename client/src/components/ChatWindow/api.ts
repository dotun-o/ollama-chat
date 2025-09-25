import type { Action } from "./types";

// Ollama online does not (yet?) allow AJAX query
// for its list of online models via https://ollama.com/api/tags
import ollamaModels from "../../database/ollamaModels";

export async function getOllamaModelsList(dispatch: React.Dispatch<Action>) {
  // const ollamaModels = await (await fetch(import.meta.env.VITE_OLLAMA_MODELS_URL)).json();

  dispatch({ type: "OLLAMA_MODELS", data: ollamaModels.models });
}

export async function ask(dispatch: React.Dispatch<Action>, query: string, model: string) {
  dispatch({ type: "ASK" });

  const fetchParams = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, model })
  };

  try {
    const response = await fetch(import.meta.env.VITE_QUERY_API_URL, fetchParams);
    
    if(!response.ok) {
      throw new Error(response.statusText);
    }

    const result = await response.json();
    
    dispatch({ type: "LOG_RESPONSE", data: result });
  }
  catch(e) {
    dispatch({ type: "ERROR", data: e as Error });
  }
}
