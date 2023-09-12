import { createColordb } from '$/useCase/colorUseCase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: () => ({ status: 200, body: 'Hello' }),
  post: async ({ body }) => ({
    status: 201,
    body: await createColordb(body.id, body.text, body.paletteSize, body.color, body.like),
  }),
}));
