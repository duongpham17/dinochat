import express, {IRouter} from 'express';
import { protect } from '../controllers/authentication';
import { free, search, room, chats, update, create, remove, verify_private, verify_public } from '../controllers/rooms';

const router: IRouter = express.Router();

router.get('/free/messages', free);

router.use(protect);
router.get('/', chats);
router.post('/', create);
router.patch('/', update);
router.delete('/:id', remove);
router.get('/:id', room);
router.get('/search/:name', search);
router.post('/verify/private', verify_private);
router.post('/verify/public', verify_public);

export default router;