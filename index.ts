import { Handler } from "aws-lambda";
import { generateSummary } from "./utils";
import axios from "axios";
import { getZapierUrl } from "./env";

export const handler: Handler = async (event) => {
  try {
    const summary = await generateSummary(event.chats);
    const zapierUrl = getZapierUrl();
    if (zapierUrl) {
      await axios.get(`${zapierUrl}?email=${event.email}&content=${summary}`);
    }

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
};
