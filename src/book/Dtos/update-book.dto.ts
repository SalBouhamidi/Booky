import { PartialType } from '@nestjs/mapped-types';
import { createBookDtos } from './create-book.dto';

export class UpdateBookDto extends PartialType(createBookDtos) {}