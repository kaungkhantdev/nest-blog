import { Module } from '@nestjs/common';
import { DemoService } from './demo.service';
import { DemoResolver } from './demo.resolver';

@Module({
  providers: [DemoResolver, DemoService],
})
export class DemoModule {}
