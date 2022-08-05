import { Document, model, Schema } from 'mongoose';

interface IBook extends Document {
    name: string;
    author: string;
    ISBN: string;
    genre: string;
    publisher: string;
    year: string;
}

const bookSchema = new Schema({
    name: { type: String, required: true },
    author: { type: String, required: true },
    ISBN: { type: String, required: true },
    genre: { type: String, required: true },
    publisher: { type: String, required: true },
    year: { type: Number, required: true }
});

const Book = model<IBook>('Book', bookSchema, 'books');

export { Book, IBook };
