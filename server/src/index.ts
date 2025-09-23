import dotenv from "dotenv";
import { Ollama } from "ollama";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

dotenv.config();

interface ClientQuery {
  query: string;
}

interface ClientResponse {
  content: string;
}

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
}

export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  if(!event.body) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "No query was provided." })
    }
  }

  const clientQuery = (JSON.stringify(event.body) as unknown as ClientQuery).query;
  const result: ClientResponse[] = [];
  
  const ollama = new Ollama({
    host: process.env.OLLAMA_API_URL,
    headers: {
      Authorization: `Bearer ${process.env.OLLAMA_API_KEY}`,
    },
  });

  const response = await ollama.chat({
    model: "gpt-oss:120b",
    messages: [{ role: "user", content: clientQuery }],
    stream: true,
  });

  for await (const part of response) {
    result.push({ content: part.message.content });
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ hello: "world" })
  }
}
