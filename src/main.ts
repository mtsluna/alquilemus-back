import 'reflect-metadata';
import express from 'express';
import router from './routes';
import { config } from 'dotenv';
import { getDatasource } from "./configs/orm.ts";

// Load env variables
config();

const app = express();

app.use(router);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);

    // Load datasource
    getDatasource().initialize()
        .then((data) => {
            console.log("Datasource successfully connected");
        })
        .catch((e) => {
            console.error("Something went wrong when try to connect to datasource", e);
        })
})