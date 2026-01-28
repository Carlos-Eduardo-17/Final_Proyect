import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
//import session from "express-session";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { connectDb } from "./config/db.js";
import { runSeeds } from "./seeds/index.js";

import paymentRoutes from "./routes/payment.routes.js";
import authRoutes from "./routes/auth.routes.js";
import tagRoutes from "./routes/tag.routes.js";
import authorRoutes from "./routes/author.routes.js";
import bookRoutes from "./routes/book.routes.js";
import orderRoutes from "./routes/order.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderDetailRoutes from "./routes/orderDetail.routes.js";
import couponRoutes from "./routes/coupon.routes.js";


const limiter = rateLimit({ windowMs: 60_000, max: 20 });

export class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.database();
        this.middlewares();
        this.routes();
        this.seeds();
    }

    async database() {
        await connectDb();
    }

    async seeds() {
        await runSeeds();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(cookieParser()); // Usado para JWT
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static('public')); // sirve archivos estáticos desde la carpeta public sin necesidad de definir rutas manuales (pe: /public/logo.png  →  https://tuservidor.com/logo.png) // Carga index.html automáticamente
        /*this.app.use(session({
            secret: process.env.SESSION_SECRET,
            resave: false, // no guardar sesión si no ha habido modificaciones
            saveUninitialized: false, // no guardar sesiones vacías
            cookie: {
                secure: process.env.NODE_ENV === "production" // usar cookies seguras en producción
            }
        }));*/
    }

    routes() {
        this.app.use("/api/health", limiter, (req, res) => {
            res.json({ status: "OK" });
        });
        this.app.use("/auth", authRoutes)
        this.app.use("/tags", tagRoutes);
        this.app.use("/authors", authorRoutes);
        this.app.use("/books", bookRoutes);
        this.app.use("/cart", cartRoutes);
        this.app.use("/orders", orderRoutes);
        this.app.use("/orderDetails", orderDetailRoutes);
        this.app.use("/coupons", couponRoutes);
        this.app.use("/payments", paymentRoutes);

        this.app.use((err, req, res, next) => {
            const statusCode = err.statusCode || 500;
            res.status(statusCode).json({
                status: "error",
                message: err.message || "Error interno del servidor",
                // Solo mostrar el stack si estás en desarrollo
                stack: process.env.NODE_ENV === 'development' ? err.stack : {}
            });
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`✅ Server running on port ${this.port}`);
        });
    }
}