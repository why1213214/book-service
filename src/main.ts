import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
// 异常拦截
import { AllExceptionsFilter } from './common/exceptions/base.exception.filter';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';
// 全局拦截
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { generateDocument } from './doc';

declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({logger: true}));

    // 接口版本化管理 ==> 预留，看情况决定后续用不用
    app.enableVersioning({
      type: VersioningType.URI,
    });
    // 统一响应格式
    app.useGlobalInterceptors(new TransformInterceptor());
    app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());

    // 接口文档 swagger
    generateDocument(app)
    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
    }
    await app.listen(8080);

}
bootstrap();
