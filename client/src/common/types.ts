export interface IOllamaModel {
  name: string;
  model: string;
  modified_at: string;
  size: number,
  digest: string;
  details: {
    parent_model: string;
    format: string;
    family: string;
    families: any;
    parameter_size: string;
    quantization_level: string;
  }
}

export type Severity = "info" | "success" | "warning" | "error";
