import { CallHandler, ExecutionContext, HttpCode, HttpException, Injectable, NestInterceptor } from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map(data => ({
                content: data,
                message: context.switchToHttp().getResponse().statusCode <= 400 ? "SUCCESS" : "ERROR",
                date: new Date(),
                statusCode: ExceptionsHandler
                // statusCode: context.switchToHttp().getResponse().statusCode,
                
            })),
        );
    }
}