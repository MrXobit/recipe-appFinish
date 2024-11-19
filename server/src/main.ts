import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import * as dotenv from 'dotenv';
dotenv.config();

const start = async () => {
    try {
        const PORT = process.env.PORT || 5000;
        const app = await NestFactory.create(AppModule);
        app.enableCors({
            origin: 'http://localhost:3000', 
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
            allowedHeaders: 'Content-Type, Accept', 
          });
        app.enableCors()
        await app.listen(PORT, () => console.log(`server started on PORT ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()