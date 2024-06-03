import { Router } from 'express';
import {
  createCollection,
  getAllCollection,
} from '../controllers/collectionController.js ';

const collectionRouter = Router();

collectionRouter.post('/create', createCollection);
collectionRouter.get('/', getAllCollection);

export default collectionRouter;
