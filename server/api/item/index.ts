import type { DefineMethods } from 'aspida';
import type { ColorModel, RGBModel } from '../../commonTypesWithClient/models';

export type Methods = DefineMethods<{
  get: {
    resBody: string;
  };
  post: {
    reqBody: { type: string; numberlist: number[]; colorlist: RGBModel[][] };
    resBody: ColorModel[] | undefined;
  };
}>;
