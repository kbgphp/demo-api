import { ILooseObject } from '@/common/interfaces/ILooseObject';
import { Book, IBook } from '@/models/Boook';

import InvalidBuildDataError from '@common/errors/InvalidBuildDataError';
import BaseFactory from './BaseFactory';

export default class DemoFactory extends BaseFactory {
    static checkKeysInModel(keys: string | string[]): { result: boolean; message?: string } {
        return super._checkKeysInModel(keys, Book);
    }

    static generateBook(data: any): IBook {
        if (this.checkValidBuildData(data)) {
            return new Book(data);
        } else {
            throw new InvalidBuildDataError('Book');
        }
    }

    static checkValidBuildData(data: ILooseObject): boolean {
        return !!data && data.name && data.author && data.ISBN && data.genre && data.publisher && data.year;
    }
}
