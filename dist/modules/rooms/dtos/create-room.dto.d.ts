export declare enum RoomStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
}
export declare class CreateRoomDto {
    name: string;
    description?: string;
    status: RoomStatus;
}
