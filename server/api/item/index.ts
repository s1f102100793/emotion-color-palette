import type { DefineMethods } from 'aspida';
import type { HSVRange, ReturnColorModel } from '../../commonTypesWithClient/models';

export type Methods = DefineMethods<{
  get: {
    resBody: string;
  };
  post: {
    reqBody: { type: string; numberlist: number[]; colorlist: HSVRange[] };
    resBody: ReturnColorModel[] | undefined;
  };
}>;
