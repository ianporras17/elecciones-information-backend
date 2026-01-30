export declare class PasswordUtil {
    static hash(password: string): Promise<string>;
    static compare(password: string, passwordHash: string): Promise<boolean>;
}
