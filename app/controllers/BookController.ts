import { RESPONSE_CODE, RESPONSE_FAILURE, RESPONSE_SUCCESS } from '@/common/Constants';
import { locale } from '@/config/locales';
import BookFactory from '@/factories/BookFactory';
import BookService from '@/services/BookService';
import { sendResponse } from '@/utils/common';
import { logger } from '@/utils/logger';
import { isEmpty, isObjectId } from '@utils/util';
import { NextFunction, Request, Response } from 'express';

class BookController {
    static async create(req: Request, res: Response) {
        if (isEmpty(req.body)) return sendResponse(res, {}, locale('BOOK_INVALID_DATA'), RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST);
        try {
            const bookISBN: string = req.body.ISBN;
            const existingBookData = await BookService.readByISBN(bookISBN);
            if (!!existingBookData) {
                return sendResponse(res, {}, locale('BOOK_ALREADY_EXIST'), RESPONSE_FAILURE, RESPONSE_CODE.SUCCESS);

            } else {
                const bookData = BookFactory.generateBook(req.body);
                const book = await BookService.create(bookData);
                return sendResponse(res, book, locale('BOOK_CREATE_SUCCESS'), RESPONSE_SUCCESS, RESPONSE_CODE.CREATED);
            }

        } catch (error) {
            logger.error('BookController Create() Error: ', error);
            return sendResponse(res, {}, locale('BOOK_INVALID_DATA'), RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST);
        }
    }


    static getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const books = await BookService.list();
            return sendResponse(res, books, locale('BOOK_GET_ALL_SUCCESS'), RESPONSE_SUCCESS, RESPONSE_CODE.SUCCESS);
        } catch (error) {
            logger.error('BookController.getAll() Error: ', error);
            next(error);
        }
    };

    static getOne = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!isObjectId(req.params.bookId)) return sendResponse(res, {}, locale('BOOK_ID_NOT_FOUND'), RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST);
            const bookId: string = req.params.bookId;
            const bookData = await BookService.readById(bookId);
            return sendResponse(res, bookData, locale('BOOK_GET_ONE_SUCCESS'), RESPONSE_SUCCESS, RESPONSE_CODE.SUCCESS);
        } catch (error) {
            logger.error('BookController.getOne() Error: ', error);
            next(error);
        }
    };

    static update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!isObjectId(req.params.bookId)) return sendResponse(res, {}, locale('BOOK_ID_NOT_FOUND'), RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST);
            if (isEmpty(req.body)) return sendResponse(res, {}, locale('BOOK_INVALID_DATA'), RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST);
            const bookId: string = req.params.bookId;
            const bookData = req.body;
            const updateBookData = await BookService.updateById(bookId, { $set: bookData });
            return sendResponse(res, updateBookData, locale('BOOK_UPDATE_SUCCESS'), RESPONSE_SUCCESS, RESPONSE_CODE.SUCCESS);
        } catch (error) {
            logger.error('BookController.update() Error: ', error);
            next(error);
        }
    };

    static delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!isObjectId(req.params.bookId)) return sendResponse(res, {}, locale('BOOK_ID_NOT_FOUND'), RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST);
            const bookId: string = req.params.bookId;
            const doc = await BookService.deleteById(bookId);
            if (!!doc) {
                return sendResponse(res, null, locale('BOOK_DELETE_SUCCESS'), RESPONSE_SUCCESS, RESPONSE_CODE.SUCCESS);
            } else {
                return sendResponse(res, {}, locale('BOOK_ID_NOT_FOUND'), RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST);
            }

        } catch (error) {
            logger.error('BookController.delete() Error: ', error);
            next(error);
        }
    };
}

export default BookController;
