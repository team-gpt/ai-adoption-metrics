import { defaultTemperature } from "./const";

export const getModelTemperature = () => {
  try {
    if (process.env.MODEL_TEMPERATURE) {
      return Number(process.env.MODEL_TEMPERATURE);
    }
    return defaultTemperature;
  } catch (err) {
    return defaultTemperature;
  }
};

export const getZapierUrl = () => {
  if (!process.env.ZAPIER_URL) return;
  return process.env.ZAPIER_URL.replace(/\/$/, "");
};
