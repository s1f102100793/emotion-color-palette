import type { DefineMethods } from 'aspida';
import type { ColorModel } from '../../commonTypesWithClient/models';

export type Methods = DefineMethods<{
  get: {
    resBody: string;
  };
  post: {
    reqBody: { type: string; list: number[][] | number };
    resBody: ColorModel[] | undefined;
  };
}>;
