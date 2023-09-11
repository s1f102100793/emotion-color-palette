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
