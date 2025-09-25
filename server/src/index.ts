import dotenv from "dotenv";
import { Ollama } from "ollama";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

dotenv.config();

interface ClientQuery {
  query: string;
  model: string;
}

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": process.env.CLIENT_HOST_PROD as string,
  "Access-Control-Allow-Methods": "POST, OPTIONS"
}

export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  try {
    if(!event.body) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "No data was provided." })
      }
    }

    console.log("[OLLAMA_CHAT_API::INFO]", event.body);

    // Allow dev testing
    if(event.headers.Origin === process.env.CLIENT_HOST_DEV) {
      headers["Access-Control-Allow-Origin"] = process.env.CLIENT_HOST_DEV as string;
    }

    const requestPayload = JSON.parse(event.body) as ClientQuery;
    let result = "";
    
    const ollama = new Ollama({
      host: process.env.OLLAMA_API_HOST,
      headers: {
        Authorization: `Bearer ${process.env.OLLAMA_API_KEY}`,
      },
    });

    const ollamaResponse = await ollama.chat({
      model: requestPayload.model,
      messages: [{ role: "user", content: requestPayload.query }],
      stream: true,
    });

    for await (const part of ollamaResponse) {
      result += part.message.content;
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ content: result })
    }
  }
  catch(e) {
    console.log("[OLLAMA_CHAT_API::ERROR]", e);

    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({ error: "There was an error." })
    }
  }
}
