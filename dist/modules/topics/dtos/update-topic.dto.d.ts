import { TopicType } from '@prisma/client';
export declare class UpdateTopicDto {
    title?: string;
    topicType?: TopicType;
    content?: string;
    order?: number;
}
