import type { DefineMethods } from 'aspida';
import type { HSVModel } from '../../commonTypesWithClient/models';

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
