import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dtos/create-topic.dto';
import { UpdateTopicDto } from './dtos/update-topic.dto';
import { ExternalResourceDto } from './dtos/external-resource.dto';
import { UpsertTopicContentDto } from './dtos/upsert-topic-content.dto';
import { UpsertProposalDto } from './dtos/upsert-proposal.dto';
export declare class TopicsController {
    private readonly topicsService;
    constructor(topicsService: TopicsService);
    listByRoom(roomId: string): import("@prisma/client").Prisma.PrismaPromise<({
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
        proposals: ({
            candidate: {
                name: string;
                id: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            topicId: string;
            candidateId: string;
        })[];
    } & {
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        roomId: string;
        topicType: import("@prisma/client").$Enums.TopicType;
        content: string | null;
        order: number;
    })[]>;
    create(roomId: string, dto: CreateTopicDto): Promise<({
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
        proposals: ({
            candidate: {
                name: string;
                id: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            topicId: string;
            candidateId: string;
        })[];
    } & {
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        roomId: string;
        topicType: import("@prisma/client").$Enums.TopicType;
        content: string | null;
        order: number;
    }) | null>;
    get(id: string): Promise<{
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
        proposals: ({
            candidate: {
                name: string;
                id: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            topicId: string;
            candidateId: string;
        })[];
    } & {
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        roomId: string;
        topicType: import("@prisma/client").$Enums.TopicType;
        content: string | null;
        order: number;
    }>;
    update(id: string, dto: UpdateTopicDto): import("@prisma/client").Prisma.Prisma__TopicClient<{
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
        proposals: ({
            candidate: {
                name: string;
                id: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            topicId: string;
            candidateId: string;
        })[];
    } & {
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        roomId: string;
        topicType: import("@prisma/client").$Enums.TopicType;
        content: string | null;
        order: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    delete(id: string): import("@prisma/client").Prisma.Prisma__TopicClient<{
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        roomId: string;
        topicType: import("@prisma/client").$Enums.TopicType;
        content: string | null;
        order: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    addResource(topicId: string, dto: ExternalResourceDto): import("@prisma/client").Prisma.Prisma__ExternalResourceClient<{
        description: string | null;
        type: import("@prisma/client").$Enums.ResourceType;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        topicId: string;
        url: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    updateResource(id: string, dto: Partial<ExternalResourceDto>): import("@prisma/client").Prisma.Prisma__ExternalResourceClient<{
        description: string | null;
        type: import("@prisma/client").$Enums.ResourceType;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        topicId: string;
        url: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    upsertProposal(topicId: string, dto: UpsertProposalDto): import("@prisma/client").Prisma.Prisma__CandidateProposalClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        topicId: string;
        candidateId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    deleteResource(id: string): import("@prisma/client").Prisma.Prisma__ExternalResourceClient<{
        description: string | null;
        type: import("@prisma/client").$Enums.ResourceType;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        topicId: string;
        url: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    upsertContent(topicId: string, dto: UpsertTopicContentDto): import("@prisma/client").Prisma.Prisma__TopicContentClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        topicId: string;
        participantId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
