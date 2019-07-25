import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Param } from '@nestjs/common/decorators/http/route-params.decorator';
import { ProductService } from '../services/product.service';
import { ApiBearerAuth, ApiImplicitParam, ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Product } from '../schemas/product.schema';

@ApiUseTags('products')
@Controller('products')
export class ProductController {
    public constructor(private readonly _productService: ProductService) {}

    @Get('')
    @ApiBearerAuth()
    @ApiOperation({ title: 'Get all products' })
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
    public async getProducts(@Req() req: Request, @Res() res: Response): Promise<Response> {
        try {
            const products: Product[] = await this._productService.getAllProducts();
            return res.status(HttpStatus.OK).json({ data: products });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ data: null, error: null });
        }
    }
    @Get(':id')
    @ApiBearerAuth()
    @ApiImplicitParam({ name: 'id', required: true, type: 'string' })
    @ApiOperation({ title: 'Get product by id' })
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
    public async getProductById(
        @Req() req: Request,
        @Res() res: Response,
        @Param() param: { id: string }
    ): Promise<Response> {
        try {
            const { id } = param;
            const product: Product | null = await this._productService.getProductById(id);
            return res.status(HttpStatus.OK).json({ data: product, error: null });
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({ data: null, error });
        }
    }
}
