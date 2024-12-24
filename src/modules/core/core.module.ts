import { Module } from '@nestjs/common';
import { DemoModule } from './demo/demo.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [DemoModule, UserModule],
})
export class CoreModule {}
