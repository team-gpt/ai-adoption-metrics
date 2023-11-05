export const promptMaxTokens = 90000;
export const summaryDelimiter = `\n--------\n`;
export const defaultTemperature = 0.9;
export const basePrompt = `We have chats with AI (different Large Language Models. The goal is to
    create an adoption report that wrap ups the following things:
    1. Who worked on what?
    2. Who is the most active person?
    3. Which are the most used model in the chats (model info is within JSON)
    4. Other interesting patterns and insights you notice. Here are the chats:
    `;
export const summarizePrompt = `Summarize - make it twice shorter`;

export const chunkedPrompt =
  basePrompt +
  `Since there were a lot of chats,
      we couldn't process all of them at once. Here are multiple summaries. Use them to create a 
      finalized adoption report summary. Here are the summaries:`;
