import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { getModelToken } from '@nestjs/mongoose';
import { createBookDtos } from './Dtos/create-book.dto';
import { UpdateBookDto } from './Dtos/update-book.dto';
import { responseBookDtos } from './Dtos/reponse-create-book.dto';
import { Types } from 'mongoose';

describe('BookService', () => {
  let service: BookService;
  let mockBookModel: any;

  const mockBook = {
    save: jest.fn(),
    findOne: jest.fn(),
    findById: jest.fn(),
    findByIdAndDelete: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: getModelToken('Book'),
          useValue: mockBook,
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    mockBookModel = module.get(getModelToken('Book'));
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addNewBook', () => {
    it('should handle errors during book creation', async () => {
      const createBookDto: createBookDtos = {
        name: 'Test Book',
        description: 'A book for testing',
        author: 'Test Author',
        isReserved: false,
      };
      mockBookModel.findOne.mockResolvedValue(null);
      mockBookModel.save.mockRejectedValue(new Error('Database error'));
      const result = await service.addNewBook(createBookDto);
      expect(result).toBeUndefined();
    });
  });

  describe('showThisBook', () => {
    it('should return the book if it exists', async () => {
      const bookId = new Types.ObjectId().toString()
      const mockBookData = { id: bookId, name: 'Test Book', author: 'Test Author' };
      mockBookModel.findById.mockResolvedValue(mockBookData)

      const result = await service.showThisBook(bookId);
      expect(result).toEqual(mockBookData);
      expect(mockBookModel.findById).toHaveBeenCalledWith(bookId);
    });

    it('should return a message if the book does not exist', async () => {
      const bookId = new Types.ObjectId().toString();
      mockBookModel.findById.mockResolvedValue(null);
      const result = await service.showThisBook(bookId);
      expect(result).toBe('the book is not found');
    });
    it('should throw an HttpException if the bookId is invalid', async () => {
      const invalidBookId = 'invalid-id';
      await expect(service.showThisBook(invalidBookId)).rejects.toThrow();
    });
  });

  describe('DeleteBook', () => {
    it('should delete the book and return a success message', async () => {
      const bookId = new Types.ObjectId().toString();
      const expectedResponse = "the book was deleted successfully";
      mockBookModel.findByIdAndDelete.mockResolvedValue(expectedResponse);
      const result = await service.DeleteBook(bookId);
      expect(result).toEqual(expectedResponse);
      expect(mockBookModel.findByIdAndDelete).toHaveBeenCalledWith(bookId);
    });
    it('should return a message if the book is not found', async () => {
      const bookId = new Types.ObjectId().toString();
      const expectedResponse = "Book is not found"; 
      mockBookModel.findByIdAndDelete.mockResolvedValue(null);
      const result = await service.DeleteBook(bookId);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('updateBook', () => {
    it('should return a message if the book is not found', async () => {
      const bookId = new Types.ObjectId().toString();
      const updateBookDto: UpdateBookDto = {
        name: 'Updated Test Book',
        description: 'Updated description',
        author: 'Updated Author',
        isReserved: true,
      }; 
      const expectedResponse = "The book is not find please try again";
      mockBookModel.findById.mockResolvedValue(null);
      const result = await service.updateBook(bookId, updateBookDto);
      expect(result).toEqual(expectedResponse);
    });

    it('should return a message if the updated information is duplicated', async () => {
      const bookId = new Types.ObjectId().toString();
      const updateBookDto: UpdateBookDto = {
        name: 'Duplicate Test Book',
        description: 'Duplicate description',
        author: 'Duplicate Author',
        isReserved: true,
      };
      const expectedResponse = "The book with those info is already exist";
      mockBookModel.findById.mockResolvedValue({ id: bookId }); 
      mockBookModel.findOne.mockResolvedValue(updateBookDto);
      const result = await service.updateBook(bookId, updateBookDto);
      expect(result).toEqual(expectedResponse);
    });
  });
});