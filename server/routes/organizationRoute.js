import { Router } from 'express';
import {
  createOrganization,
  getAllOrganizations,
  deleteOrganization,
  updateOrganization,
} from '../controllers/organizationController.js';

const organizationRoute = Router();

organizationRoute.post('/create', createOrganization);
organizationRoute.get('/', getAllOrganizations);
organizationRoute.get('/:id', getAllOrganizations);
organizationRoute.delete('/delete/:id', deleteOrganization);
organizationRoute.put('/:id', updateOrganization);

export default organizationRoute;
