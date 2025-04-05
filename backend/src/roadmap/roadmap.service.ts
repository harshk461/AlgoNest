import { InjectRepository } from '@nestjs/typeorm';
import { Roadmap } from './entities/roadmap.entity';
import { Repository } from 'typeorm';
import { Topics } from './entities/topic.entity';
import { CreateRoadmapDto } from './dto/create-roadmap.dto';
import { CreateTopicDTO } from './dto/create-topic.dto';
import { NotFoundException } from '@nestjs/common';

export class RoadmapService {
  constructor(
    @InjectRepository(Roadmap)
    private roadmapRepository: Repository<Roadmap>,
    @InjectRepository(Topics)
    private topicsRepository: Repository<Topics>,
  ) {}

  async getAllRoadmaps() {
    const roadmaps = await this.roadmapRepository.find({
      where: { deletedAt: null },
    });

    return roadmaps;
  }

  async getSingleRoadmap(id: string) {
    const roadmap = await this.roadmapRepository.findOne({ where: { id } });

    if (!roadmap) {
      throw new NotFoundException("Roadmap doesn't exist");
    }

    // assuming roadmap.topics is an array of topic IDs (strings)
    const topics = await this.topicsRepository.find({
      where: roadmap.topics.map((topicId) => ({ id: topicId })),
    });

    return {
      ...roadmap,
      topics,
    };
  }

  async createNewRoadMap(roadmapDTO: CreateRoadmapDto): Promise<Roadmap> {
    const newRoadmap = this.roadmapRepository.create(roadmapDTO);
    return await this.roadmapRepository.save(newRoadmap);
  }

  async getAllTopics() {
    const topics = this.topicsRepository.find({ where: { deletedAt: null } });
    return topics;
  }

  async createNewTopic(createTopicDto: CreateTopicDTO): Promise<Topics> {
    const newTopic = this.topicsRepository.create({
      name: createTopicDto.name,
      description: createTopicDto.description,
      displayOrder: createTopicDto.displayOrder,
      resources: createTopicDto.resources,
    });

    return this.topicsRepository.save(newTopic);
  }

  async getSingleResource(id: string) {
    const topic = await this.topicsRepository.findOne({
      where: { id: id, deletedAt: null },
    });

    if (!topic) {
      throw new NotFoundException('Topic not found');
    }

    return topic.resources;
  }
}
