import express, {IRouter} from 'express';
import { protect } from '../controllers/authentication';
import { destroy, update } from '../controllers/users';

const router: IRouter = express.Router();

router.use(protect);
router.patch('/', update);
router.delete('/', destroy)


export default router;