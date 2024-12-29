import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService } from './reservation.service';
import { getModelToken } from '@nestjs/mongoose';
import { addReservationDtos } from './DTOs/create-reservation.dto';
import { Types } from 'mongoose';

describe('ReservationService', () => {
  let service: ReservationService;
  let mockReservationModel: any;
  let mockBookModel: any;

  const mockReservation = {
    save: jest.fn(),
    findOne: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  };

  const mockBook = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationService,
        {
          provide: getModelToken('Reservation'),
          useValue: mockReservation,
        },
        {
          provide: getModelToken('Book'),
          useValue: mockBook
        },
      ],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
    mockReservationModel = module.get(getModelToken('Reservation'));
    mockBookModel = module.get(getModelToken('Book'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('barrowBook', () => {
    it('should return an error if the book is already reserved', async () => {
      const bookId = 'someBookId';
      const userId = 'someUserId';
      const addReservation: addReservationDtos = {
        borrowedAt: new Date(),
        returnedAt: new Date(),
        isreturned: false,
      };

      mockBookModel.findOne.mockResolvedValue({ isReserved: true }); 

      const result = await service.barrowBook(bookId, userId, addReservation);
      expect(result).toBe('The Book is already reserved')
    });
  });

});