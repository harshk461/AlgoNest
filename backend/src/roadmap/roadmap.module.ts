import { Module } from '@nestjs/common';
import { RoadmapController } from './roadmap.controller';
import { RoadmapService } from './roadmap.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roadmap } from './entities/roadmap.entity';
import { Resources } from './entities/resource.entity';
import { Topics } from './entities/topic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Roadmap, Resources, Topics])],
  controllers: [RoadmapController],
  providers: [RoadmapService],
})
export class RoadmapModule {}
