import type { DefineMethods } from 'aspida';
import type { ColorModel } from '../../commonTypesWithClient/models';

export type Methods = DefineMethods<{
  // get: {
  //   reqBody: { type: string; list: number[] | number };
  //   resBody: ColorModel[] | undefined;
  // };
  post: {
    reqBody: { text: string; number: number };
    resBody: { [x: `color${number}`]: any } | undefined;
  };
}>;
