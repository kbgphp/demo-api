import UserAuthenticator from '@common/middlewares/UserAuthenticator';
import BookController from '@controllers/BookController';
import { Router } from 'express';

const path = '/book';
const BookRouter = Router({ mergeParams: true });



BookRouter.post(`${path}`, UserAuthenticator.isAdminAuthenticated(), BookController.create);

BookRouter.get(`${path}`, UserAuthenticator.isAdminAuthenticated(), BookController.getAll);

BookRouter.get(`${path}/:bookId`, UserAuthenticator.isAdminAuthenticated(), BookController.getOne);

BookRouter.patch(`${path}/:bookId`, UserAuthenticator.isAdminAuthenticated(), BookController.update);

BookRouter.delete(`${path}/:bookId`, UserAuthenticator.isAdminAuthenticated(), BookController.delete);


export default BookRouter;
