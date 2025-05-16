import express from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import container from "./core/container.core";

export const server = new InversifyExpressServer(container);
server.setConfig((app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
})