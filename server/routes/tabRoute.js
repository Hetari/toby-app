import { Router } from 'express';
import { createTab, grtAllTab } from '../controllers/tabController.js';

const tabRouter = Router();

tabRouter.post('/create', createTab);
tabRouter.get('/', grtAllTab);

export default tabRouter;
