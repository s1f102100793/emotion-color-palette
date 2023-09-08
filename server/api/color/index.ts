import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  get: {
    resBody: string;
  };
  post: {
    reqBody: { text: string; number: number };
    resBody: { [x: `color${number}`]: any } | undefined;
  };
}>;
