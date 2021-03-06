import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
    BoilingPoint,
    BoilingPointTopic,
    BoilingPointReport,
} from '../entity/boilingpoint.entity';
import { UserModule } from '../user/user.module';
import { BoilingPointController } from './boilingpoint.controller';
import { BoilingPointService } from './boilingpoint.service';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';
import { CommonModule } from '../common/common.module';
import { TopicAdminController } from './topic.admin.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            BoilingPoint,
            BoilingPointTopic,
            BoilingPointReport,
        ]),
        UserModule,
        CommonModule,
    ],
    controllers: [
        BoilingPointController,
        TopicController,
        TopicAdminController,
    ],
    providers: [
        BoilingPointService,
        TopicService,
    ],
    exports: [BoilingPointService],
})
export class BoilingPointModule {}