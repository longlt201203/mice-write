import { GenerateImageParams, TextSuggestionStreamParams, TextToSpeechParams, TranslateTextParams } from "../etc/dto";
import langs from "../etc/langs";
import OpenAI from "openai";

export default class AIService {
    private static TEXT_SUGGESTION_SYSTEM_MESSAGE = "You are a writing expert AI assistant. You will be given an unfinished text by user. Your job is to complete for the user. Your output must only be the continuation of the text.";
    private static TRANSLATE_TEXT_SYSTEM_MESSAGE = "You are an expert AI translator. Your job is to detect and translate the given text to the requiring language. The output must contain only the translated text.";

    private static instance: AIService;
    static getInstance() {
        if (!this.instance) this.instance = new AIService();
        return this.instance;
    }

    private readonly openai: OpenAI;
    private constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPEN_AI_API_KEY
        });
    }

    async createTextSuggestionStream(params: TextSuggestionStreamParams, onChunk: (chunk: string) => void, onEnd: () => void) {
        const stream = await this.openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: AIService.TEXT_SUGGESTION_SYSTEM_MESSAGE },
                { role: "user", content: params.text }
            ],
            stream: true
        });

        for await (const chunk of stream) {
            if (chunk.choices[0].delta.content) {
                onChunk(chunk.choices[0].delta.content);
            }
        }

        onEnd();
    }

    async createTranslateTextStream(params: TranslateTextParams, onChunk: (chunk: string) => void, onEnd: () => void) {
        const lang = langs.find((item) => item.id == params.langCode) || langs[0];
        
        const stream = await this.openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: AIService.TRANSLATE_TEXT_SYSTEM_MESSAGE },
                {
                    role: "user", content: [
                        { type: "text", text: `<language>${lang.name}</language>` },
                        { type: "text", text: `<text>${params.text}</text>` }
                    ]
                }
            ],
            stream: true
        });

        for await (const chunk of stream) {
            if (chunk.choices[0].delta.content) {
                onChunk(chunk.choices[0].delta.content);
            }
        }
        
        onEnd();
    }

    async createTextToSpeech(params: TextToSpeechParams) {
        const response = await this.openai.audio.speech.create({
            input: params.text,
            model: "tts-1",
            voice: "nova",
            response_format: "mp3",
        });
        // const mp3Buffer = Buffer.from(await response.arrayBuffer());
        return await response.arrayBuffer();
    }

    async createImage(params: GenerateImageParams) {
        const response = await this.openai.images.generate({
            model: "dall-e-3",
            prompt: params.prompt,
            n: 1,
            size: "1024x1024",
        });
        return response.data[0].url;
    }
}