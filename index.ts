import { Handler } from "aws-lambda";
import { generateSummary } from "./utils";

export const handler: Handler = async (event) => {
  try {
    const summary = await generateSummary(event.data);
    return summary;
  } catch (err) {
    // Log the error for debugging purposes
    console.error("Error occurred:", err);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal server error",
      }),
    };
  }
  return await generateSummary(event.chats);
};
