import { Router } from 'express';
import {
  createTab,
  grtAllTab,
  deleteTab,
} from '../controllers/tabController.js';

const tabRouter = Router();

tabRouter.post('/create', createTab);
tabRouter.get('/', grtAllTab);
tabRouter.delete('/delete/:id', deleteTab);

export default tabRouter;
