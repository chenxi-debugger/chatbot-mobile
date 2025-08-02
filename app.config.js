// app.config.js

import 'dotenv/config';
export default {
    expo: {
      name: 'Chatbot UI Mobile',
      slug: 'chatbot-ui-mobile',
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
        eas: {
            projectId: 'a66c4ff3-7f8e-4df9-ab97-d58c3f353e69',
          },
      },
    },
  };

  