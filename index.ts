import { ChatAnthropic } from "langchain/chat_models/anthropic";
import { HumanMessage } from "langchain/schema";
import { Handler } from "aws-lambda";
import { test } from "./test-data";

const chat = new ChatAnthropic({
  temperature: 0.9,
  anthropicApiKey:
});

const helper = async () => {
  console.log(JSON.stringify(test));
  const message = new HumanMessage(
    `These are some chats (from the last 7 days) from a collaborative AI software. Your task is to create a report that wrap ups what has happened during the last week. Use these chats. Include stuff like who has uses the platform, the most, most used models and who worked on what ---- ${JSON.stringify(
      test
    )} `
  );
  console.log(message);
  const response = await chat.call([message]);
  console.log(response);
};

helper();

// export const handler: Handler = async (event, context) => {
//   console.log("EVENT: \n" + JSON.stringify(event, null, 2));
//   return context.logStreamName;
// };
