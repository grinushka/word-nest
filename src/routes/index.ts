import { Router } from 'express';
import categoryRoutes from './category.routes';
import wordRoutes from './word.routes';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ message: 'Vocabulary Learning API' });
});

router.use('/words', wordRoutes);
router.use('/categories', categoryRoutes);

export default router;
