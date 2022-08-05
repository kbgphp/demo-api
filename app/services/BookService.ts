import { ILooseObject } from '@/common/interfaces/ILooseObject';
import { Book, IBook } from '@/models/Boook';
import { ObjectId, QueryOptions, UpdateQuery } from 'mongoose';

export default class BookService {

    // create book record
    static async create(resource: IBook): Promise<IBook> {
        return await resource.save();
    }

    // get all books record
    static async list(findOptions: QueryOptions = {}, sortOptions: ILooseObject = {}, page?: number, limit?: number): Promise<IBook[]> {
        const books = Book.find({}, findOptions);
        (sortOptions) ? books.sort(sortOptions) : null;
        (page != undefined && limit) ? books.skip(Math.max(page - 1, 0) * limit).limit(limit) : null;
        return books;
    }
    // find book by object id
    static async readById(id: string): Promise<IBook | null> {
        return Book.findById(id);
    }

    // find book by isbn id
    static async readByISBN(isbnId: string): Promise<IBook | null> {
        return Book.findOne({ ISBN: isbnId });
    }


    // update book record by id
    static async updateById(bookId: string, bookData: UpdateQuery<IBook>): Promise<IBook> {
        try {
            const existingBook = await Book.findByIdAndUpdate(bookId, bookData, { upsert: true, new: true }).exec();
            return existingBook;
        } catch (error) {
            console.log('error: ', error);
        }
    }

    // delete book record by id
    static async deleteById(id: string | ObjectId): Promise<IBook | null> {
        return Book.findByIdAndDelete(id);
    }
}
