import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Issue } from './entities/issue.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IssueService {
  constructor(
    @InjectRepository(Issue)
    private issueRepository: Repository<Issue>,
  ) {}
  async create(createIssueDto: CreateIssueDto) {
    try {
      return await this.issueRepository.save(
        createIssueDto,
      );
    } catch (error) {
      throw new InternalServerErrorException('Algo salio terriblemente mal');
    }
  }

  async findAll() {
    return await this.issueRepository.find({
      relations: ['issueCode', 'datedCode', 'pay'], 
    });
  }

  async findOne(issueCode: string) {
    return await this.issueRepository.findOne({
      relations: ['issueCode', 'datedCode', 'pay'], 
      where:{
        issueCode:issueCode
      }
    });
  }

  update(issueCode: string, updateIssueDto: UpdateIssueDto) {
    return `This action updates a #${issueCode} tituloPropiedad`;
  }

  remove(issueCode: string) {
    return `This action removes a #${issueCode} tituloPropiedad`;
  }
  async guardar(issue:Issue){
    try{
      return await this.issueRepository.save(issue)
    }catch(error){
      throw new InternalServerErrorException()
    }
  }
}
