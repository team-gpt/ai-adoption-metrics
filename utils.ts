import { ChatAnthropic } from "langchain/chat_models/anthropic";
import { BaseMessage, HumanMessage } from "langchain/schema";
import { decode, encode } from "gpt-tokenizer";
import {
  basePrompt,
  summaryDelimiter,
  chunkedPrompt,
  promptMaxTokens,
  summarizePrompt,
} from "./const";
import { getModelTemperature } from "./env";
BaseMessage;

type Chat = {
  model: string;
  messages: {
    role: "assistant" | "user" | "system";
    name: string;
    content: string;
  }[];
};

export const createChatInstance = () => {
  const chat = new ChatAnthropic({
    temperature: getModelTemperature(),
    anthropicApiKey: process.env.ANTHROPIC_API_KEY,
  });
  return chat;
};

export const generateSummary = async (chatData: Chat[]) => {
  const chat = createChatInstance();
  const stringifiedChats = JSON.stringify(chatData);
  const encodedBasePrompts = encode(basePrompt);
  const encodedChats = encode(stringifiedChats);

  if (encodedBasePrompts.length + encodedChats.length >= promptMaxTokens) {
    const chunks = chunkArray(encodedChats);
    const responses: BaseMessage[] = [];
    for (const chunk of chunks) {
      const message = new HumanMessage(basePrompt + decode(chunk));
      const response = await chat.call([message]);
      responses.push(response);
    }

    const summarizedContent = responses
      .map((response) => response.content)
      .join(summaryDelimiter);

    const finalContent = await summarizeContent(summarizedContent);
    const message = new HumanMessage(chunkedPrompt + finalContent);
    const finalSummary = await chat.call([message]);
    return finalSummary.content;
  } else {
    const message = new HumanMessage(basePrompt + stringifiedChats);
    const response = await chat.call([message]);
    return response.content;
  }
};

export function chunkArray(array: number[]) {
  const chunks = [];

  for (let i = 0; i < array.length; i += promptMaxTokens) {
    chunks.push(array.slice(i, i + promptMaxTokens));
  }

  return chunks;
}

export const summarizeContent = async (
  content: string,
  summaryRound = 0
): Promise<string> => {
  if (summaryRound >= 3) {
    throw new Error("Too much data");
  }
  const encodedContent = encode(content);
  // Base case: if content is short enough, return it as is
  if (encodedContent.length + encode(chunkedPrompt).length < promptMaxTokens) {
    return content;
  }

  // Recursive case: split content and summarize each chunk
  const chunks = chunkArray(encode(content));
  const summaries: string[] = [];

  for (const chunk of chunks) {
    const chat = createChatInstance();
    const message = new HumanMessage(summarizePrompt + decode(chunk));
    const response = await chat.call([message]);
    summaries.push(response.content);
  }

  const combinedSummaries = summaries.join(summaryDelimiter);

  // Recursively summarize the combined summaries if still too long
  return await summarizeContent(combinedSummaries, summaryRound + 1);
};
