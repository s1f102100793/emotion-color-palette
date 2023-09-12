import type { HSVModel } from '../../commonTypesWithClient/models';
import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  get: {
    resBody: string;
  };
  post: {
    reqBody: {
      id: number;
      text: string;
      paletteSize: number;
      color: HSVModel[];
      like: number;
    };
  };
}>;
