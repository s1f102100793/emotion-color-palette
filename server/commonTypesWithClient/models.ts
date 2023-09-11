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
  color: RGBModel[];
  like: number;
};

export type RGBModel = {
  rStr: number;
  gStr: number;
  bStr: number;
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

export type ColorRanges = {
  [key in ColorRangeKeys]: RGBModel[];
};

export type ColorKey = '黒' | '青' | '緑' | '紫' | '灰色' | '赤' | 'オレンジ' | '黄色' | '白';
