import { Router } from 'express';
import {
  createTag,
  getAllTag,
  deleteTag,
  updateTagPut,
} from '../controllers/tagController.js';

const tagRouter = Router();

tagRouter.post('/create', createTag);
tagRouter.get('/', getAllTag);
tagRouter.get('/:id', getAllTag);
tagRouter.delete('/delete/:id', deleteTag);
tagRouter.put('/:id', updateTagPut);

export default tagRouter;
