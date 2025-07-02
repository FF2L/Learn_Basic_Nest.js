import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbPostgresConfig } from './config/dbPostgres.config';
import { UserProfileModule } from './user-profile/user-profile.module';
import { ProductsModule } from './products/products.module';


@Module({
  imports: [UsersModule, TypeOrmModule.forRoot(dbPostgresConfig), UserProfileModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
