import { Router } from 'express';
import {
  createTab,
  getAllTab,
  deleteTab,
  updateTabPut,
} from '../controllers/tabController.js';

const tabRouter = Router();

tabRouter.post('/create', createTab);
tabRouter.get('/', getAllTab);
tabRouter.get('/:id', getAllTab);
tabRouter.delete('/delete/:id', deleteTab);
tabRouter.put('/:id', updateTabPut);

export default tabRouter;
