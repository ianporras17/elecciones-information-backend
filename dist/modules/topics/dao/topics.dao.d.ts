import { PrismaService } from '../../../database/prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class TopicsDao {
    private readonly prisma;
    constructor(prisma: PrismaService);
    listByRoom(roomId: string): Prisma.PrismaPromise<({
        resources: {
            description: string | null;
            type: import("@prisma/client").$Enums.ResourceType;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            topicId: string;
            url: string;
        }[];
        contents: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            topicId: string;
            participantId: string;
        }[];
    } & {
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        roomId: string;
        content: string | null;
        order: number;
    })[]>;
    findById(id: string): Prisma.Prisma__TopicClient<({
        resources: {
            description: string | null;
            type: import("@prisma/client").$Enums.ResourceType;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            topicId: string;
            url: string;
        }[];
        contents: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            topicId: string;
            participantId: string;
        }[];
    } & {
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        roomId: string;
        content: string | null;
        order: number;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    nextOrder(roomId: string): Promise<number>;
    create(data: Prisma.TopicCreateInput): Prisma.Prisma__TopicClient<{
        resources: {
            description: string | null;
            type: import("@prisma/client").$Enums.ResourceType;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            topicId: string;
            url: string;
        }[];
        contents: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            topicId: string;
            participantId: string;
        }[];
    } & {
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        roomId: string;
        content: string | null;
        order: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    update(id: string, data: Prisma.TopicUpdateInput): Prisma.Prisma__TopicClient<{
        resources: {
            description: string | null;
            type: import("@prisma/client").$Enums.ResourceType;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            topicId: string;
            url: string;
        }[];
        contents: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            topicId: string;
            participantId: string;
        }[];
    } & {
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        roomId: string;
        content: string | null;
        order: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    delete(id: string): Prisma.Prisma__TopicClient<{
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        roomId: string;
        content: string | null;
        order: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    createResource(data: Prisma.ExternalResourceCreateInput): Prisma.Prisma__ExternalResourceClient<{
        description: string | null;
        type: import("@prisma/client").$Enums.ResourceType;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        topicId: string;
        url: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    updateResource(id: string, data: Prisma.ExternalResourceUpdateInput): Prisma.Prisma__ExternalResourceClient<{
        description: string | null;
        type: import("@prisma/client").$Enums.ResourceType;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        topicId: string;
        url: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    deleteResource(id: string): Prisma.Prisma__ExternalResourceClient<{
        description: string | null;
        type: import("@prisma/client").$Enums.ResourceType;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        topicId: string;
        url: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    upsertTopicContent(topicId: string, participantId: string, content: string): Prisma.Prisma__TopicContentClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        topicId: string;
        participantId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
}
