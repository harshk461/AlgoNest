import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RoadmapService } from './roadmap.service';
import { CreateRoadmapDto } from './dto/create-roadmap.dto';
import { CreateTopicDTO } from './dto/create-topic.dto';

@Controller('roadmaps')
export class RoadmapController {
  constructor(private roadmapService: RoadmapService) {}

  @Get('all-roadmaps')
  getAllRoadmaps() {
    return this.roadmapService.getAllRoadmaps();
  }

  @Get('get-roadmap')
  getSingleRoadmap(@Query('id') id: string) {
    return this.roadmapService.getSingleRoadmap(id);
  }

  @Post('create-roadmap')
  createNewRoadmap(@Body() roadmapDTO: CreateRoadmapDto) {
    return this.roadmapService.createNewRoadMap(roadmapDTO);
  }

  @Get('all-topics')
  getAllTopics() {
    return this.roadmapService.getAllTopics();
  }

  @Post('add-topic')
  addNewTopic(@Body() createTopic: CreateTopicDTO) {
    return this.roadmapService.createNewTopic(createTopic);
  }

  @Get('get-resource')
  getSingleResource(@Query('id') id: string) {
    return this.roadmapService.getSingleResource(id);
  }
}
