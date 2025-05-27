import cors from "cors";
import express from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import container from "./core/container.core";
import { responseWrapper } from "./middlewares/response-wrapper";

export const server = new InversifyExpressServer(container);
const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true); // Allow requests with no origin (like mobile apps or curl requests)

        const allowedOrigins = process.env.CORS_ORIGINS?.split(',') || [];
        if (allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development') {
            return callback(null, true);
        }

        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

server.setConfig((app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(responseWrapper);
    app.use(cors(corsOptions));
})