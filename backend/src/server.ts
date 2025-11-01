import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { initializeDatabase } from './config/init-db'; // Keep the import
import experienceRoutes from './routes/experienceRoutes';
import bookingRoutes from './routes/bookingRoutes';
import promoRoutes from './routes/promoRoutes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Health check
app.get('/health', (req: Request, res: Response) => {
    res.json({
        status: 'OK',
        message: 'BookIt API is running',
        timestamp: new Date().toISOString(),
    });
});

// API Routes
app.use('/api/experiences', experienceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/promo', promoRoutes);

// 404 Handler
app.use('*', (req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        error: 'Route not found'
    });
});

// Error Handler
app.use(errorHandler);

// Initialize database and start server
const startServer = async () => {
    try {
        console.log('🔄 Initializing database...');
        // ❌ CRITICAL FIX: Comment out this line to stop re-creating the schema.
        // The schema is already created and seeded!
        // await initializeDatabase();

        app.listen(PORT, () => {
            console.log('');
            console.log('='.repeat(50));
            console.log(`🚀 Server running on http://localhost:${PORT}`);
            console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`🌐 API Base: http://localhost:${PORT}/api`);
            console.log('='.repeat(50));
            console.log('');
            console.log('📡 Available Endpoints:');
            console.log(`   GET    /api/experiences`);
            console.log(`   GET    /api/experiences/:id`);
            console.log(`   GET    /api/experiences/:id/slots`);
            console.log(`   POST   /api/bookings`);
            console.log(`   GET    /api/bookings/:id`);
            console.log(`   POST   /api/promo/validate`);
            console.log('');
            console.log('='.repeat(50));
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

// Handle unhandled rejections
process.on('unhandledRejection', (err: Error) => {
    console.error('❌ Unhandled Rejection:', err);
    process.exit(1);
});

startServer();

export default app;