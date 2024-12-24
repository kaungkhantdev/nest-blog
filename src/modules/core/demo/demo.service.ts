import { Injectable } from '@nestjs/common';
import { CreateDemoInput } from './dto/create_demo';
import { UpdateDemoInput } from './dto/update_demo';

@Injectable()
export class DemoService {
  create(createDemoInput: CreateDemoInput) {
    return 'This action adds a new demo';
  }

  findAll() {
    return [{ exampleField: 1 }];
  }

  findOne(id: number) {
    return { exampleField: id };
  }

  update(id: number, updateDemoInput: UpdateDemoInput) {
    return `This action updates a #${id} demo`;
  }

  remove(id: number) {
    return `This action removes a #${id} demo`;
  }
}