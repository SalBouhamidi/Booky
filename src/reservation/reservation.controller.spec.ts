import { Test, TestingModule } from '@nestjs/testing';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { addReservationDtos } from './DTOs/create-reservation.dto';

describe('ReservationController', () => {
  let controller: ReservationController;
  let service: ReservationService;

  const mockReservationService = {
    barrowBook: jest.fn(),
    returnBook: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationController],
      providers: [
        {
          provide: ReservationService,
          useValue: mockReservationService,
        },
      ],
    }).compile();

    controller = module.get<ReservationController>(ReservationController);
    service = module.get<ReservationService>(ReservationService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('borowBook', () => {
    it('should borrow a book successfully', async () => {
      const bookId = 'someBookId';
      const userId = 'someUserId';
      const addReservation: addReservationDtos = {
        borrowedAt: new Date(),
        returnedAt: new Date(),
        isreturned: false,
      };

      mockReservationService.barrowBook.mockResolvedValue('Reservation created successfully');

      const result = await controller.borowBook(bookId, userId, addReservation);
      expect(result).toBe('Reservation created successfully');
      expect(mockReservationService.barrowBook).toHaveBeenCalledWith(bookId, userId, addReservation);
    });

    it('should handle errors when borrowing a book', async () => {
      const bookId = 'someBookId';
      const userId = 'someUserId';
      const addReservation: addReservationDtos = {
        borrowedAt: new Date(),
        returnedAt: new Date(),
        isreturned: false,
      };

      mockReservationService.barrowBook.mockRejectedValue(new Error('Some error'));

      const result = await controller.borowBook(bookId, userId, addReservation);
      expect(result).toContain("Ops there's an error");
      expect(mockReservationService.barrowBook).toHaveBeenCalledWith(bookId, userId, addReservation);
    });
  });

  describe('returnBook', () => {
    it('should return a book successfully', async () => {
      const bookId = 'someBookId';
      const userId = 'someUserId';

      mockReservationService.returnBook.mockResolvedValue('Book returned successfully');

      const result = await controller.returnBook(bookId, userId);
      expect(result).toBe('Book returned successfully');
      expect(mockReservationService.returnBook).toHaveBeenCalledWith(bookId, userId);
    });

    it('should handle errors when returning a book', async () => {
      const bookId = 'someBookId';
      const userId = 'someUserId';

      mockReservationService.returnBook.mockRejectedValue(new Error('Some error'));

      const result = await controller.returnBook(bookId, userId);
      expect(result).toContain("Ops there's an error");
      expect(mockReservationService.returnBook).toHaveBeenCalledWith(bookId, userId);
    });
  });
});