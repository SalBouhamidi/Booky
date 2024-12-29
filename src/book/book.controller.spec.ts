import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { createBookDtos } from './Dtos/create-book.dto';
import { HttpException } from '@nestjs/common';
import { Types } from 'mongoose';


describe('BookController', () => {
  let controller: BookController;
  let service: BookService;

  const mockBookService = {
    addNewBook: jest.fn(),
    showThisBook: jest.fn(),
    DeleteBook: jest.fn(),
    updateBook:jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: BookService,
          useValue: mockBookService,
        },
      ],
    }).compile();

    controller = module.get<BookController>(BookController);
    service = module.get<BookService>(BookService);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('AddNewBook', () => {
    it('should add a new book and return the result', async () => {
      const createBookDto: createBookDtos = {
        name: 'Test Book',
        description: 'A book for testing',
        author: 'Test Author',
        isReserved: false,
      };
      const result = {
        name: 'Test Book',
        description: 'A book for testing',
        author: 'Test Author',
        isReserved: false
      };

      mockBookService.addNewBook.mockResolvedValue(result);
      expect(await controller.AddNewBook(createBookDto)).toEqual(result);
      expect(mockBookService.addNewBook).toHaveBeenCalledWith(createBookDto);
    });
    it('should return that the book is duplicated if it\'s already exists in database', async () => {
      const createBookDto: createBookDtos = {
        name: "duo duo duo ",
        description: "How to survive",
        author: "Hugo",
        isReserved: false

      };
      const result = "The Book is already exist"
      mockBookService.addNewBook.mockResolvedValue(result);
      expect(await controller.AddNewBook(createBookDto)).toEqual(result);
      expect(mockBookService.addNewBook).toHaveBeenCalledWith(createBookDto);
    })
  });
  describe('showThisBook', () => {
    it('should return the book if it exists', async () => {
      const bookId = new Types.ObjectId().toString();
      const mockBookData = {
        _id: "67642ea3c8e491a845e2dcbf",
        name: "nenenen nnnnn",
        author: "Gio Lang",
        description: "nenenenene nenenne nenenenenenne",
        isReserved: true,
        createdAt: "2024-12-19T14:33:07.029Z",
        updatedAt: "2024-12-20T06:30:51.033Z",
        __v: 0

      };

      mockBookService.showThisBook.mockResolvedValue(mockBookData);
      const result = await controller.showThisBook(bookId);
      expect(result).toEqual(mockBookData);
      expect(mockBookService.showThisBook).toHaveBeenCalledWith(bookId);
    });
    it('should throw an exception if the book does not exist', async () => {
      const bookId = new Types.ObjectId().toString();
      mockBookService.showThisBook.mockResolvedValue({
        statusCode: 404,
        message: "The book is not found"
      });
      const result = await controller.showThisBook(bookId);
      expect(result).toEqual({
        statusCode: 404,
        message: "The book is not found"
      });
    });
    it('should return a 400 response if the bookId is invalid', async () => {
      const invalidBookId = 'invalid-id';
      mockBookService.showThisBook.mockResolvedValue({
        statusCode: 400,
        message: "The book id is not valid"
      });
      const result = await controller.showThisBook(invalidBookId);
      expect(result).toEqual({
        statusCode: 400,
        message: "The book id is not valid"
      });
    });
  })
  describe('DeleteyourBook',()=>{
    it('should delete the book', async () => {
      const bookId = new Types.ObjectId().toString(); 
      const expectedResponse = "the book was deleted successfully"; 
      mockBookService.DeleteBook.mockResolvedValue(expectedResponse); 
      const result = await controller.DeleteyourBook(bookId); 
      expect(result).toEqual(expectedResponse);
      expect(mockBookService.DeleteBook).toHaveBeenCalledWith(bookId);
    });

    
    it('should return a message if the book is not found', async () => {
      const bookId = new Types.ObjectId().toString(); 
      const expectedResponse = "Book is not found";
      mockBookService.DeleteBook.mockResolvedValue(expectedResponse);
      const result = await controller.DeleteyourBook(bookId);
      expect(result).toEqual(expectedResponse);
      expect(mockBookService.DeleteBook).toHaveBeenCalledWith(bookId);
    });
  })
  describe('updateBook', () => {
    it('should update the book and return the updated book data', async () => {
        const bookId = new Types.ObjectId().toString();
        const updateBookDto = {
            name: 'Updated Test Book',
            description: 'Updated description',
            author: 'Updated Author',
            isReserved: true,
        };
        const expectedResponse = { id: bookId, ...updateBookDto };
        mockBookService.updateBook = jest.fn().mockResolvedValue(expectedResponse);
        const result = await controller.updateBook(bookId, updateBookDto); 
        expect(result).toEqual(expectedResponse); 
        expect(mockBookService.updateBook).toHaveBeenCalledWith(bookId, updateBookDto);
    });
    it('should return a message if the book is not found', async () => {
        const bookId = new Types.ObjectId().toString();
        const updateBookDto = {
            name: 'Updated Test Book',
            description: 'Updated description',
            author: 'Updated Author',
            isReserved: true,
        };
        const expectedResponse = "The book is not find please try again";

        mockBookService.updateBook = jest.fn().mockResolvedValue(expectedResponse);
        const result = await controller.updateBook(bookId, updateBookDto);
        expect(result).toEqual(expectedResponse);
        expect(mockBookService.updateBook).toHaveBeenCalledWith(bookId, updateBookDto);
    });

    it('should return a message if the updated information is duplicated', async () => {
        const bookId = new Types.ObjectId().toString();
        const updateBookDto = {
            name: 'Duplicate Test Book',
            description: 'Duplicate description',
            author: 'Duplicate Author',
            isReserved: true,
        };
        const expectedResponse = "The book with those info is already exist";
        mockBookService.updateBook = jest.fn().mockResolvedValue(expectedResponse);
        const result = await controller.updateBook(bookId, updateBookDto);
        expect(result).toEqual(expectedResponse);
        expect(mockBookService.updateBook).toHaveBeenCalledWith(bookId, updateBookDto);
    });
});

});
