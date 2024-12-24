import { CreateDemoInput } from './create_demo';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateDemoInput extends PartialType(CreateDemoInput) {
  id: number;
}