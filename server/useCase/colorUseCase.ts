import { OPENAIAPI } from '$/service/envValues';
import { OpenAI, PromptTemplate } from 'langchain';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { z } from 'zod';

type ColorProperties = {
  [key: `color${number}`]: z.ZodType<any, any>;
};

export const makeColor = async (text: string, number: number) => {
  try {
    console.log(text);
    const properties: ColorProperties = {};

    for (let i = 0; i < number; i++) {
      properties[`color${i + 1}`] = z.string().describe(`color${i + 1}`);
    }

    const parser = StructuredOutputParser.fromZodSchema(z.object(properties));

    const formatInstructions = parser.getFormatInstructions();

    const prompt = new PromptTemplate({
      template: 'ユーザーの質問に答えてください。\n{format_instructions}\n{question}',
      inputVariables: ['question'],
      partialVariables: { format_instructions: formatInstructions },
    });

    const input = await prompt.format({
      question: `${text}から連想される${number}色のカラーパレットを16進数のカラーコードで答えてください。ex.#0A0A0A`,
    });

    const llm = new OpenAI({
      openAIApiKey: OPENAIAPI,
      temperature: 0.9,
    });

    const res = await llm.call(input);

    return await parser.parse(res);
  } catch (e) {
    console.log(e);
  }
};
