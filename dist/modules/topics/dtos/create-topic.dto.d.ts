import { ExternalResourceDto } from './external-resource.dto';
export declare enum TopicType {
    HEALTH = "HEALTH",
    WORK = "WORK",
    SECURITY = "SECURITY",
    EDUCATION = "EDUCATION",
    ECONOMY = "ECONOMY",
    ENVIRONMENT = "ENVIRONMENT",
    OTHER = "OTHER"
}
export declare class CreateTopicDto {
    title: string;
    topicType: TopicType;
    content?: string;
    order?: number;
    resources?: ExternalResourceDto[];
    candidateId?: string;
    proposalContent?: string;
}
