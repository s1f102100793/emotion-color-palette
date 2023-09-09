import type { ColorModel } from '../../commonTypesWithClient/models';
import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  get: {
    resBody: string;
  };
  post: {
    reqBody: { type: string; list: string[] | number };
    resBody: ColorModel[] | undefined;
  };
}>;
