import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageEnum } from 'src/modules/shared/enums';
import { Repository, getConnection } from 'typeorm';
import { CategoryDto } from '../controllers/category/dto/category.dto';
import { CategoryReqDto } from '../controllers/category/dto/category.req.dto';
import { UpdateCategoryDto } from '../controllers/category/dto/update.category.dto';
import { CategoryListVo, CategoryVo } from '../controllers/category/vo/category.vo';
import { CategoryEntity } from '../entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) { }
  //CRUD
  //Create
  async createCategory(createCategoryDto: CategoryDto): Promise<string> {
    const { categoryName } = createCategoryDto;
    if (categoryName) {
      const result: Pick<CategoryEntity, 'id'> | undefined = await this.categoryRepository.findOne({
        where: { categoryName },
        select: ['id'],
      });
      if (result) {
        throw new HttpException(`${categoryName} already exsist`, HttpStatus.OK);
      }
    }
    const category: CategoryEntity = this.categoryRepository.create(createCategoryDto);
    await this.categoryRepository.save(category);
    return 'Successfully created';
  }
  //Read
  async getCategoryById(id: number): Promise<CategoryVo> {
    return await this.categoryRepository.findOne({
      where: { id },
      select: [
        'id',
        'categoryName',
        'description'
      ]
    });
  }
  async createCategoryFromList(createCategoryDtoList: CategoryDto[]): Promise<any> {
    return await Promise.all(createCategoryDtoList.map(category => {
      return this.createCategory(category);
    }));
  }
  //Read
  async categoryList(): Promise<CategoryVo[]> {
    return await this.categoryRepository.find({
      select: [
        'id',
        'categoryName',
        'description'
      ],
      relations: ['products']
    });
  }
  //Read
  async categoryListPage(categoryReqDto: CategoryReqDto): Promise<CategoryListVo> {
    const {
      pageSize = PageEnum.PAGE_SIZE,
      pageNumber = PageEnum.PAGE_NUMBER
    } = categoryReqDto;
    const [data, total] = await getConnection()
      .createQueryBuilder(CategoryEntity, 'category')
      .skip((pageNumber - 1) * pageSize)
      .take(pageSize)
      .orderBy({ 'category.categoryName': 'ASC', 'category.createdAt': 'DESC' })
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
  async modifyCategoryById(id: number, updateCategoryDto: UpdateCategoryDto): Promise<string> {
    const {
      raw: { affectedRows },
    } = await this.categoryRepository.update(id, updateCategoryDto);
    if (affectedRows) {
      return 'Category updated successfully';
    } else {
      return 'Category updatation failed';
    }
  }
  //Destroy
  async destroyCategoryById(id: number): Promise<string> {
    const {
      raw: { affectedRows },
    } = await this.categoryRepository.softDelete(id);
    if (affectedRows) {
      return 'Successfully Deleted';
    } else {
      return 'Deletion failed';
    }
  }

  async count(): Promise<number> {
    return await this.categoryRepository.count();
  }
}
