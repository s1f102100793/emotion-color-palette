import { z } from 'zod';

export const makeColor = (text: string) => {
  console.log(text);
  z.object({
    title: z.string().describe('ニュース記事のタイトル'),
    subtitle: z.string().describe('記事のサブタイトルまたは追加情報'),
    body: z.string().describe('ニュース記事の主要な内容'),
  });
};
