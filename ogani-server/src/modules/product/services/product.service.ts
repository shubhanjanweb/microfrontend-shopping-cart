import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageEnum } from 'src/modules/shared/enums';
import { Repository, getConnection } from 'typeorm';
import { ProductDto } from '../controllers/product/dto/product.dto';
import { ProductReqDto } from '../controllers/product/dto/product.req.dto';
import { UpdateProductDto } from '../controllers/product/dto/update.product.dto';
import { ProductListVo, ProductVo } from '../controllers/product/vo/product.vo';
import { CategoryEntity } from '../entities/category.entity';
import { ProductEntity } from '../entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) { }
  //CRUD
  //Create
  async createProduct(createProductDto: ProductDto): Promise<string> {
    const { productName, categoryId } = createProductDto;
    if (productName) {
      const result: Pick<ProductEntity, 'id'> | undefined = await this.productRepository.findOne({
        where: { productName },
        select: ['id'],
      });
      if (result) {
        throw new HttpException(`${productName} already exsist`, HttpStatus.OK);
      }
    }
    const category: Promise<CategoryEntity> = this.categoryRepository.findOneOrFail({
      where: { id: categoryId },
      relations: ['products']
    });
    const newProduct: ProductEntity = this.productRepository.create(createProductDto);
    const product: ProductEntity = await this.productRepository.save(newProduct);
    (await category).products = [...(await category).products, product];
    (await category).save();
    return 'Successfully created';
  }
  async createProductFromList(createProductDtoList: ProductDto[]): Promise<any> {
    return await Promise.all(createProductDtoList.map(category => {
      return this.createProduct(category);
    }));
  }
  //Read
  async getProductById(id: number): Promise<ProductVo> {
    return await this.productRepository.findOne({
      where: { id },
      select: [
        'id',
        'productName',
        'price',
        'imageUrl',
        'description',
        'discountPercentage'
      ]
    });
  }
  //Read
  async productList(): Promise<ProductVo[]> {
    return await this.productRepository.find({
      select: [
        'id',
        'productName',
        'price',
        'imageUrl',
        'description',
        'discountPercentage'
      ],
      relations: ['category']
    });
  }
  //Read
  async productListPage(productReqDto: ProductReqDto): Promise<ProductListVo> {
    const {
      pageSize = PageEnum.PAGE_SIZE,
      pageNumber = PageEnum.PAGE_NUMBER
    } = productReqDto;
    const [data, total] = await getConnection()
      .createQueryBuilder(ProductEntity, 'product')
      .skip((pageNumber - 1) * pageSize)
      .take(pageSize)
      .orderBy({ 'product.productName': 'ASC', 'product.createdAt': 'DESC' })
      .printSql()
      .getManyAndCount();
    return {
      data,
      total,
      pageNumber,
      pageSize,
    };
  }
  //Update
  async modifyProductById(id: number, updateProductDto: UpdateProductDto): Promise<string> {
    const {
      raw: { affectedRows },
    } = await this.productRepository.update(id, updateProductDto);
    if (affectedRows) {
      return 'Product updated successfully';
    } else {
      return 'Product updatation failed';
    }
  }
  //Destroy
  async destroyProductById(id: number): Promise<string> {
    const {
      raw: { affectedRows },
    } = await this.productRepository.softDelete(id);
    if (affectedRows) {
      return 'Successfully Deleted';
    } else {
      return 'Deletion failed';
    }
  }
  //Destroy
  async count(): Promise<number> {
    return await this.productRepository.count();
  }
}
