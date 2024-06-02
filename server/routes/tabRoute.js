import { Router } from 'express';
import { createTab } from '../controllers/tabController.js';

const tabRouter = Router();

tabRouter.post('/create', createTab);

export default tabRouter;
