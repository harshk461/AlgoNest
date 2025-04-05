import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/admin-user.entity';
import { ProblemsModule } from './problems/problems.module';
import { UserModule } from './user/user.module';
<<<<<<< HEAD
=======
import { RoleModule } from './roles/role.module';
import { ContestsModule } from './contests/contests.module';
import { NewsletterModule } from './newsletter/newsletter.module';
import { RoadmapModule } from './roadmap/roadmap.module';
>>>>>>> 2973b12 (new adds)

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [User],
        synchronize: configService.get('NODE_ENV') !== 'production',
        autoLoadEntities: true,
      }),
    }),
    AuthModule,
    ProblemsModule,
    UserModule,
<<<<<<< HEAD
=======
    RoleModule,
    ContestsModule,
    NewsletterModule,
    RoadmapModule,
>>>>>>> 2973b12 (new adds)
  ],
})
export class AppModule {}
