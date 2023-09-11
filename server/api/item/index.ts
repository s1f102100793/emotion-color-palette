import type { DefineMethods } from 'aspida';
import type { RGBModel, ReturnColorModel } from '../../commonTypesWithClient/models';

export type Methods = DefineMethods<{
  get: {
    resBody: string;
  };
  post: {
    reqBody: { type: string; numberlist: number[]; colorlist: RGBModel[][] };
    resBody: ReturnColorModel[] | undefined;
  };
}>;
