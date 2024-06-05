import { Router } from 'express';
import {
  createOrganization,
  getAllOrganizations,
  deleteOrganization,
  updateOrganization,
  joinOrganization,
  leaveRoom,
} from '../controllers/organizationController.js';

const organizationRoute = Router();

organizationRoute.post('/create', createOrganization);
organizationRoute.get('/', getAllOrganizations);
organizationRoute.get('/:id', getAllOrganizations);
organizationRoute.put('/:id', updateOrganization);
organizationRoute.post('/join/:string', joinOrganization);
organizationRoute.delete('/delete/:id', deleteOrganization);

organizationRoute.delete('/leave/:id', leaveRoom);

export default organizationRoute;
