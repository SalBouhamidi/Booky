import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Book, BookDocument } from './book.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { createBookDtos } from './Dtos/create-book.dto';
import { UpdateBookDto } from './Dtos/update-book.dto';
import { Types } from 'mongoose';
import { responseBookDtos } from './Dtos/reponse-create-book.dto';
import { plainToInstance } from 'class-transformer';
import mongoose from 'mongoose';
import { S3Service } from '../common/services/s3/s3.service';


@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name) private Bookmodel: Model<BookDocument>,
        private readonly s3Service: S3Service,
    ) { }
    async addNewBook(createnewbook: createBookDtos): Promise<string | responseBookDtos> {
        try {
            // createBookdtos.administrator = new Types.ObjectId(userId);
            let newBook = new this.Bookmodel(createnewbook);
            let checkIfExist = await this.Bookmodel.findOne({
                name: createnewbook.name,
                author: createnewbook.author,
                description: createnewbook.description
            });
            if (checkIfExist) {
                return "The Book is already exist"
            }
            let createNewBook = newBook.save();
            if (!createNewBook) {
                return 'ops smth bad happend'
            }
            let result = plainToInstance(responseBookDtos, createnewbook)
            return result;
        } catch (e) {
            console.log('Ops error:', e);
        }
    }

    async DeleteBook(bookId: string): Promise<string> {
        try {
            // console.log('*************',bookId);
            let deleteBook = await this.Bookmodel.findByIdAndDelete(bookId);
            console.log('the boook issssss ', deleteBook)
            if (!deleteBook) {
                return "Book is not found"
            }
            return "the book was deleted successfully"
        } catch (e) {
            console.log('the book was not deleted', e)
        }
    }

    async showThisBook(bookId: string) {
        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            throw new HttpException('The book id is not valid', HttpStatus.BAD_REQUEST);
        }
        try {
            let showBook = await this.Bookmodel.findById(bookId);
            if (!showBook) {
                return 'the book is not found';
            }
            return showBook
        } catch (e) {
            console.log('the book is', e)
            if (e.message === 'Invalid book ID format') {
                throw new HttpException('Invalid book ID format', HttpStatus.BAD_REQUEST);
            } else if (e.message === 'The book is not found') {
                throw new HttpException('The book is not found', HttpStatus.NOT_FOUND);
            } else {
                throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async updateBook(bookId: string, updatebookDtos: UpdateBookDto): Promise<string | responseBookDtos> {
        try {
            let isExist = await this.Bookmodel.findById(bookId);
            if (!isExist) {
                return "The book is not find please try again"
            }
            let CheckDuplicatedInfo = await this.Bookmodel.findOne({
                name: updatebookDtos.name,
                description: updatebookDtos.description,
                author: updatebookDtos.author,
            });
            if (CheckDuplicatedInfo) {
                return "The book with those info is already exist"
            }
            let updateBook = await this.Bookmodel.findByIdAndUpdate(
                bookId,
                { $set: updatebookDtos },
                { new: true }
            )
            if (!updateBook) {
                return "Ops something went wrong please try again"
            }
            return plainToInstance(responseBookDtos, updatebookDtos);
        } catch (e) {
            return `Error smth bad happend,${e}`
        }
    }
}
