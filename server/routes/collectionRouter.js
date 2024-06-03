import { Router } from 'express';
import {
  createCollection,
  getAllCollection,
  deleteCollection,
  updateCollectionPatch,
} from '../controllers/collectionController.js ';

const collectionRouter = Router();

collectionRouter.post('/create', createCollection);
collectionRouter.get('/', getAllCollection);
collectionRouter.delete('/delete/:id', deleteCollection);
collectionRouter.get('/:id', getAllCollection);
collectionRouter.patch('/:id', updateCollectionPatch);

export default collectionRouter;
