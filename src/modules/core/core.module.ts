import { Module } from '@nestjs/common';
import { DemoModule } from './demo/demo.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DemoModule, UserModule, AuthModule],
})
export class CoreModule {}
