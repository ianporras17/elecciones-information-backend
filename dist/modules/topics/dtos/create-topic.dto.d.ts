import { ExternalResourceDto } from './external-resource.dto';
export declare class CreateTopicDto {
    title: string;
    content?: string;
    order?: number;
    resources?: ExternalResourceDto[];
}
