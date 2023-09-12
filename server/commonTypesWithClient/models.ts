import type { TaskId, UserId } from './branded';

export type UserModel = {
  id: UserId;
  email: string;
  displayName: string | undefined;
  photoURL: string | undefined;
};

export type TaskModel = {
  id: TaskId;
  label: string;
  done: boolean;
  created: number;
};

export type ColorModel = {
  id: number;
  createdAt: Date;
  text: string;
  paletteSize: number;
  color: HSVModel[];
  like: number;
};

export type RGBModel = {
  rStr: number;
  gStr: number;
  bStr: number;
};

export type HSVModel = {
  h: number;
  s: number;
  v: number;
};

export type ReturnColorModel = {
  id: number;
  createdAt: Date;
  text: string;
  paletteSize: number;
  color: string[];
  like: number;
};

export type ColorRangeKeys =
  | 'R1G1B1'
  | 'R1G1B2'
  | 'R1G1B3'
  | 'R1G2B1'
  | 'R1G2B2'
  | 'R1G2B3'
  | 'R1G3B1'
  | 'R1G3B2'
  | 'R1G3B3'
  | 'R2G1B1'
  | 'R2G1B2'
  | 'R2G1B3'
  | 'R2G2B1'
  | 'R2G2B2'
  | 'R2G2B3'
  | 'R2G3B1'
  | 'R2G3B2'
  | 'R2G3B3'
  | 'R3G1B1'
  | 'R3G1B2'
  | 'R3G1B3'
  | 'R3G2B1'
  | 'R3G2B2'
  | 'R3G2B3'
  | 'R3G3B1'
  | 'R3G3B2'
  | 'R3G3B3';

// export type ColorRanges = {
//   [key in ColorRangeKeys]: RGBModel[];
// };

// export type ColorKey = '黒' | '青' | '緑' | '紫' | '灰色' | '赤' | 'オレンジ' | '黄色' | '白';

export type ColorGroups = {
  黒: ColorRangeKeys[];
  青: ColorRangeKeys[];
  緑: ColorRangeKeys[];
  紫: ColorRangeKeys[];
  灰色: ColorRangeKeys[];
  赤: ColorRangeKeys[];
  オレンジ: ColorRangeKeys[];
  黄色: ColorRangeKeys[];
  白: ColorRangeKeys[];
};

export type ColorKey =
  | '赤'
  | '紅'
  | '橙'
  | '黄'
  | '黄緑'
  | '緑'
  | '青緑'
  | '青'
  | '紫'
  | 'ピンク'
  | '茶'
  | '白'
  | '黒';

export type HSVRange = {
  hue: [number, number];
  saturation: [number, number];
  value: [number, number];
};

export type ColorRanges = {
  [key in ColorKey]: HSVRange;
};
