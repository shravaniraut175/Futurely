import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "pragatiiq", // Unique app ID
  name: "PragatiIQ",
  credentials: {
    gemini: {
      apiKey: process.env.GEMINI_API_KEY,
    },
  },
});
