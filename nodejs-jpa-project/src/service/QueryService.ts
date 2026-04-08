import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { User } from '../entity/User';
import { Role } from '../entity/Role';
import { Category } from '../entity/Category';
import { Product } from '../entity/Product';

interface QueryResult<T> {
  data: T[];
  sql: string;
  count: number;
}

export class QueryService {
  private userRepo: Repository<User>;
  private roleRepo: Repository<Role>;
  private categoryRepo: Repository<Category>;
  private productRepo: Repository<Product>;

  constructor(private dataSource: DataSource) {
    this.userRepo = dataSource.getRepository(User);
    this.roleRepo = dataSource.getRepository(Role);
    this.categoryRepo = dataSource.getRepository(Category);
    this.productRepo = dataSource.getRepository(Product);
  }

  // ===== RELATIONSHIP QUERIES =====

  // Fetch users with roles (One-to-Many equivalent)
  async getUsersWithRoles(): Promise<QueryResult<User>> {
    const qb = this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles');
    
    const data = await qb.getMany();
    const sql = qb.getSql();
    return { data, sql, count: data.length };
  }

  // Fetch categories with products (One-to-Many)
  async getCategoriesWithProducts(): Promise<QueryResult<Category>> {
    const qb = this.categoryRepo
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.products', 'products');
    
    const data = await qb.getMany();
    const sql = qb.getSql();
    return { data, sql, count: data.length };
  }

  // ===== FILTERING QUERIES =====

  // Products by price range (BETWEEN)
  async getProductsByPriceRange(minPrice: number, maxPrice: number): Promise<QueryResult<Product>> {
    const qb = this.productRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where('product.price BETWEEN :min AND :max', { min: minPrice, max: maxPrice })
      .orderBy('product.price', 'ASC');
    
    const data = await qb.getMany();
    const sql = qb.getSql();
    return { data, sql, count: data.length };
  }

  // Products by category name (INNER JOIN with WHERE)
  async getProductsByCategory(categoryName: string): Promise<QueryResult<Product>> {
    const qb = this.productRepo
      .createQueryBuilder('product')
      .innerJoin('product.category', 'category')
      .where('category.name = :name', { name: categoryName })
      .orderBy('product.name', 'ASC');
    
    const data = await qb.getMany();
    const sql = qb.getSql();
    return { data, sql, count: data.length };
  }

  // ===== USERS & ROLES QUERIES =====

  // Users by specific role (INNER JOIN)
  async getUsersByRole(roleName: string): Promise<QueryResult<User>> {
    const qb = this.userRepo
      .createQueryBuilder('user')
      .innerJoin('user.roles', 'role')
      .where('role.name = :name', { name: roleName })
      .select(['user.id', 'user.name', 'user.email', 'role.name'])
      .orderBy('user.name', 'ASC');
    
    const data = await qb.getMany();
    const sql = qb.getSql();
    return { data, sql, count: data.length };
  }

  // Users with multiple role assignment (GROUP BY with HAVING)
  async getUsersWithMultipleRoles(): Promise<QueryResult<any>> {
    const qb = this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .groupBy('user.id')
      .having('COUNT(roles.id) > 1');
    
    const data = await qb.getMany();
    const sql = qb.getSql();
    return { data, sql, count: data.length };
  }

  // ===== PAGINATION & SORTING =====

  // Paginated products sorted by price
  async getProductsPaginated(
    page: number,
    limit: number,
    sortBy: 'name' | 'price' = 'price',
    sortOrder: 'ASC' | 'DESC' = 'ASC'
  ): Promise<QueryResult<Product>> {
    const qb = this.productRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .orderBy(`product.${sortBy}`, sortOrder)
      .skip((page - 1) * limit)
      .take(limit);
    
    const data = await qb.getMany();
    const sql = qb.getSql();
    const total = await qb.getManyAndCount().then(([, count]) => count);
    
    return { 
      data, 
      sql, 
      count: total 
    };
  }

  // Paginated users with role relationship
  async getUsersPaginated(
    page: number,
    limit: number,
    sortOrder: 'ASC' | 'DESC' = 'ASC'
  ): Promise<QueryResult<User>> {
    const qb = this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .orderBy('user.name', sortOrder)
      .skip((page - 1) * limit)
      .take(limit);
    
    const data = await qb.getMany();
    const sql = qb.getSql();
    const total = await this.userRepo.count();
    
    return { data, sql, count: total };
  }

  // ===== ADVANCED FILTERING WITH MULTIPLE CONDITIONS =====

  // Products: expensive items in specific category
  async getExpensiveProductsInCategory(
    categoryName: string,
    minPrice: number
  ): Promise<QueryResult<Product>> {
    const qb = this.productRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .where('category.name = :categoryName', { categoryName })
      .andWhere('product.price >= :minPrice', { minPrice })
      .orderBy('product.price', 'DESC');
    
    const data = await qb.getMany();
    const sql = qb.getSql();
    return { data, sql, count: data.length };
  }

  // ===== AGGREGATION QUERIES =====

  // Get average product price by category
  async getAveragePriceByCategory(): Promise<QueryResult<any>> {
    const qb = this.productRepo
      .createQueryBuilder('product')
      .select('product.category.name', 'categoryName')
      .addSelect('AVG(product.price)', 'avgPrice')
      .addSelect('COUNT(product.id)', 'productCount')
      .groupBy('product.categoryId');
    
    const data = await qb.getRawMany();
    const sql = qb.getSql();
    return { data, sql, count: data.length };
  }

  // ===== UTILITY METHODS =====

  // Print query analysis (SQL + parameters)
  async analyzeQuery(qb: SelectQueryBuilder<any>): Promise<void> {
    const sql = qb.getSql();
    const params = qb.getParameters();
    
    console.log('\n📊 QUERY ANALYSIS:');
    console.log('─'.repeat(80));
    console.log('Generated SQL:');
    console.log(sql);
    console.log('\nParameters:');
    console.log(JSON.stringify(params, null, 2));
    console.log('─'.repeat(80) + '\n');
  }

  // Get all data with relationships for testing
  async getAllData(): Promise<any> {
    const users = await this.userRepo.find({ relations: ['roles'] });
    const categories = await this.categoryRepo.find({ relations: ['products'] });
    const roles = await this.roleRepo.find({ relations: ['users'] });
    const products = await this.productRepo.find({ relations: ['category'] });

    return { users, categories, roles, products };
  }
}