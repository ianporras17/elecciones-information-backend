import { ResourceType } from '@prisma/client';
export declare class ExternalResourceDto {
    type: ResourceType;
    title: string;
    url: string;
    description?: string;
    order?: number;
}
