import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { dataSource } from './config';
import { QueryService } from './service/QueryService';
import { User } from './entity/User';
import { Role } from './entity/Role';
import { Category } from './entity/Category';
import { Product } from './entity/Product';

const app = express();
app.use(express.json());

let queryService: QueryService;

// Middleware to log requests
app.use((req: Request, res: Response, next: express.NextFunction) => {
  console.log(`\n📌 ${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Initialize database and seed data
app.post('/api/init', async (req: Request, res: Response) => {
  try {
    console.log('🔄 Initializing database...');
    await dataSource.dropDatabase().catch(() => {});
    await dataSource.synchronize();

    const roleRepo = dataSource.getRepository(Role);
    const userRepo = dataSource.getRepository(User);
    const categoryRepo = dataSource.getRepository(Category);
    const productRepo = dataSource.getRepository(Product);

    // Seed roles
    const adminRole = await roleRepo.save({ name: 'Admin' });
    const userRole = await roleRepo.save({ name: 'User' });
    const moderatorRole = await roleRepo.save({ name: 'Moderator' });

    // Seed users
    const user1 = await userRepo.save({
      name: 'John Doe',
      email: 'john@example.com',
      roles: [adminRole, userRole],
    });

    const user2 = await userRepo.save({
      name: 'Jane Smith',
      email: 'jane@example.com',
      roles: [userRole],
    });

    const user3 = await userRepo.save({
      name: 'Bob Johnson',
      email: 'bob@example.com',
      roles: [moderatorRole, userRole],
    });

    // Seed categories
    const electronicsCategory = await categoryRepo.save({ name: 'Electronics' });
    const booksCategory = await categoryRepo.save({ name: 'Books' });
    const clothingCategory = await categoryRepo.save({ name: 'Clothing' });

    // Seed products
    await productRepo.save([
      { name: 'Laptop', price: 1200.00, category: electronicsCategory },
      { name: 'Smartphone', price: 800.00, category: electronicsCategory },
      { name: 'Tablet', price: 500.00, category: electronicsCategory },
      { name: 'TypeScript Guide', price: 45.99, category: booksCategory },
      { name: 'Database Design', price: 55.99, category: booksCategory },
      { name: 'JavaScript Fundamentals', price: 39.99, category: booksCategory },
      { name: 'T-Shirt', price: 25.00, category: clothingCategory },
      { name: 'Jeans', price: 60.00, category: clothingCategory },
    ]);

    res.json({ message: '✅ Database initialized and seeded successfully!' });
  } catch (error) {
    console.error('❌ Initialization failed:', error);
    res.status(500).json({ error: String(error) });
  }
});

// ===== RELATIONSHIP QUERIES =====

// Get users with their roles
app.get('/api/users/with-roles', async (req: Request, res: Response) => {
  try {
    const result = await queryService.getUsersWithRoles();
    res.json({
      data: result.data,
      count: result.count,
      sql: result.sql,
    });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

// Get categories with products
app.get('/api/categories/with-products', async (req: Request, res: Response) => {
  try {
    const result = await queryService.getCategoriesWithProducts();
    res.json({
      data: result.data,
      count: result.count,
      sql: result.sql,
    });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

// ===== FILTERING QUERIES =====

// Get products by price range
app.get('/api/products/price-range', async (req: Request, res: Response) => {
  try {
    const min = parseFloat(req.query.min as string) || 0;
    const max = parseFloat(req.query.max as string) || 10000;
    const result = await queryService.getProductsByPriceRange(min, max);
    res.json({
      data: result.data,
      count: result.count,
      filter: { minPrice: min, maxPrice: max },
      sql: result.sql,
    });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

// Get products by category
app.get('/api/products/by-category', async (req: Request, res: Response) => {
  try {
    const categoryName = req.query.name as string || 'Electronics';
    const result = await queryService.getProductsByCategory(categoryName);
    res.json({
      data: result.data,
      count: result.count,
      filter: { category: categoryName },
      sql: result.sql,
    });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

// Get users by role
app.get('/api/users/by-role', async (req: Request, res: Response) => {
  try {
    const roleName = req.query.name as string || 'Admin';
    const result = await queryService.getUsersByRole(roleName);
    res.json({
      data: result.data,
      count: result.count,
      filter: { role: roleName },
      sql: result.sql,
    });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

// Get expensive products in category
app.get('/api/products/expensive-in-category', async (req: Request, res: Response) => {
  try {
    const categoryName = req.query.category as string || 'Electronics';
    const minPrice = parseFloat(req.query.minPrice as string) || 500;
    const result = await queryService.getExpensiveProductsInCategory(categoryName, minPrice);
    res.json({
      data: result.data,
      count: result.count,
      filter: { category: categoryName, minPrice },
      sql: result.sql,
    });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

// ===== PAGINATION & SORTING =====

// Get paginated products
app.get('/api/products/paginated', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 3;
    const sortBy = (req.query.sortBy as 'name' | 'price') || 'price';
    const sortOrder = (req.query.sortOrder as 'ASC' | 'DESC') || 'ASC';

    const result = await queryService.getProductsPaginated(page, limit, sortBy, sortOrder);
    res.json({
      data: result.data,
      pagination: { page, limit, total: result.count },
      sortBy,
      sortOrder,
      sql: result.sql,
    });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

// Get paginated users
app.get('/api/users/paginated', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 2;
    const sortOrder = (req.query.sortOrder as 'ASC' | 'DESC') || 'ASC';

    const result = await queryService.getUsersPaginated(page, limit, sortOrder);
    res.json({
      data: result.data,
      pagination: { page, limit, total: result.count },
      sortOrder,
      sql: result.sql,
    });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

// ===== ADVANCED QUERIES =====

// Get users with multiple roles
app.get('/api/users/multiple-roles', async (req: Request, res: Response) => {
  try {
    const result = await queryService.getUsersWithMultipleRoles();
    res.json({
      data: result.data,
      count: result.count,
      description: 'Users assigned to multiple roles',
      sql: result.sql,
    });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

// Get average price by category
app.get('/api/products/avg-price-by-category', async (req: Request, res: Response) => {
  try {
    const result = await queryService.getAveragePriceByCategory();
    res.json({
      data: result.data,
      statistics: {
        totalCategories: result.count,
      },
      sql: result.sql,
    });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

// ===== DATA RETRIEVAL =====

// Get all data
app.get('/api/all', async (req: Request, res: Response) => {
  try {
    const allData = await queryService.getAllData();
    res.json(allData);
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

// Initialize server
export async function startServer() {
  try {
    console.log('\n🔗 Initializing database connection...');
    await dataSource.initialize();
    console.log('✅ Database connected successfully!');

    queryService = new QueryService(dataSource);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`\n🚀 Server running on http://localhost:${PORT}`);
      console.log('\n📚 Available Endpoints:');
      console.log('─'.repeat(80));
      console.log('POST   /api/init                          - Initialize and seed database');
      console.log('GET    /api/all                           - Get all data');
      console.log('');
      console.log('RELATIONSHIP QUERIES:');
      console.log('GET    /api/users/with-roles              - Users with roles (LEFT JOIN)');
      console.log('GET    /api/categories/with-products      - Categories with products (LEFT JOIN)');
      console.log('');
      console.log('FILTERING QUERIES:');
      console.log('GET    /api/products/price-range?min=500&max=1000');
      console.log('GET    /api/products/by-category?name=Electronics');
      console.log('GET    /api/users/by-role?name=Admin');
      console.log('GET    /api/products/expensive-in-category?category=Electronics&minPrice=500');
      console.log('');
      console.log('PAGINATION & SORTING:');
      console.log('GET    /api/products/paginated?page=1&limit=3&sortBy=price&sortOrder=ASC');
      console.log('GET    /api/users/paginated?page=1&limit=2&sortOrder=ASC');
      console.log('');
      console.log('ADVANCED QUERIES:');
      console.log('GET    /api/users/multiple-roles           - Users with 2+ roles');
      console.log('GET    /api/products/avg-price-by-category - Aggregation (AVG, COUNT)');
      console.log('─'.repeat(80) + '\n');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}
