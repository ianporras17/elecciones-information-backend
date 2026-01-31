"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: [
            'http://localhost:5173',
            'http://localhost:8081',
            'http://127.0.0.1:5173',
            'http://127.0.0.1:19006',
        ],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    });
    const configService = app.get(config_1.ConfigService);
    const port = Number(configService.get('PORT') ?? 3000);
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Elecciones API')
        .setDescription('Documentación de autenticación y salud')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(port, '0.0.0.0');
    console.log(`API running on http://localhost:${port}`);
    console.log(`Swagger docs available at http://localhost:${port}/api`);
}
bootstrap();
//# sourceMappingURL=main.js.map