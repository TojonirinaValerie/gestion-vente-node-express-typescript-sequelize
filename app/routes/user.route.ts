import express, { Router } from 'express';
import {
  deleteUser,
  getAllUser,
  getUserData,
  getUsersFieldList,
  updateUser,
} from '../controllers/user.controller';

const router: Router = express.Router();

router.get('', getAllUser);
router.get('/:id', getUserData);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/list-field', getUsersFieldList);

export default router;
