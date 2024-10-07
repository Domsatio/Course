declare module 'openai' {
    export class Configuration {
      constructor(options: { apiKey: string });
    }
    
    export class OpenAIApi {
      constructor(configuration: Configuration);
      createChatCompletion(options: { model: string, messages: { role: string, content: string }[] }): Promise<any>;
    }
  }
  