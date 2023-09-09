import { makeColor } from '$/useCase/colorUseCase';
import { getItems } from '../../repository/colorRepository';
import { defineController } from './$relay';

export default defineController(() => ({
  // get: async ({ body }) => ({ status: 200, body: await getItems(body.type, body.list) }),
  post: async ({ body }) => ({
    status: 201,
    body: await makeColor(body.text, body.number, undefined),
  }),
}));
