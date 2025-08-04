// app.config.js

import 'dotenv/config';

export default {
  expo: {
    name: 'Chatbot UI Mobile',
    slug: 'chatbot-ui-mobile-slug',
    scheme: 'Chatbotapp',
    version: '1.0.0',
    privacy: "public",
    runtimeVersion: {
      policy: 'appVersion', // ✅ 添加 runtimeVersion
    },
    updates: {
      url: 'https://u.expo.dev/a66c4ff3-7f8e-4df9-ab97-d58c3f353e69', // ✅ 添加 updates.url
    },
    extra: {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
      eas: {
        projectId: 'a66c4ff3-7f8e-4df9-ab97-d58c3f353e69',
      },
    },
  },
};
