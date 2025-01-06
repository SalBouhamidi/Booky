import { BookService } from './book.service';
import { Post, Body, Param, Get, Put, Controller, Delete, Query } from '@nestjs/common';
import { createBookDtos } from './Dtos/create-book.dto';
import { UpdateBookDto } from './Dtos/update-book.dto';



@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) { }
    @Get('search')
    async searchBooks(@Query('name') name?: string, @Query('author') author?: string) {
        // console.log('heeeeeeeeeeeeeeeeeeeeeeeeere',name);
        return await this.bookService.searchBooks(name, author);
    }
    @Post()
    async AddNewBook(@Body() createBookdtos: createBookDtos){
        try{
            let result  = await this.bookService.addNewBook(createBookdtos);
            return result
        }catch(e){
            return `"ops smth went wrong", ${e}`
        }
    }
    @Delete(':bookId')
    async DeleteyourBook(@Param('bookId') bookId:string){
        return await this.bookService.DeleteBook(bookId)
    }
    @Get(':bookId')
    async showThisBook(@Param('bookId') bookId:string){
        return await this.bookService.showThisBook(bookId);
    }
    @Put(':bookId')
    async updateBook(@Param('bookId') bookId:string,@Body() udatebookDto:UpdateBookDto){
        return await this.bookService.updateBook(bookId,udatebookDto)
    }



}
