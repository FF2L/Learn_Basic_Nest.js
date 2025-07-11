import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import  dbPostgresConfig  from './config/dbPostgres.config';
import { UserProfileModule } from './user-profile/user-profile.module';
import { ProductsModule } from './products/products.module';
import { OrderModule } from './order/order.module';
import { OrderDetailModule } from './order_detail/order_detail.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true, // Để biến môi trường có thể sử dụng toàn cục trong ứng dụng
  expandVariables: true, // Để có thể sử dụng biến môi trường trong biến moi trường khác trong file .env 
  load: [dbPostgresConfig] // Để có thể sử dụng biến môi trường trong file dbPostgres.config.ts
  }),
    UsersModule,
     //TypeOrmModule.forRoot(dbPostgresConfig) // sử dụng khi dbPosrgressCOnfig file trả về một instance của PostgresConnectionOptions
     TypeOrmModule.forRootAsync({
      useFactory: dbPostgresConfig, // sử dụng khi dbPostgressCOnfig file trả về một hàm trả về instance của PostgresConnectionOptions
     })
    , UserProfileModule, ProductsModule, OrderModule, OrderDetailModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
