import type { DefineMethods } from 'aspida';
import type { ColorModel } from '../../commonTypesWithClient/models';

export type Methods = DefineMethods<{
  get: {
    resBody: string;
  };
  post: {
    reqBody: { type: string; numberlist: number[]; colorlist: number[][] };
    resBody: ColorModel[] | undefined;
  };
}>;
