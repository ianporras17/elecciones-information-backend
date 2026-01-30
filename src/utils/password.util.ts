import * as bcrypt from 'bcrypt';

/**
 * Utilidades para manejo seguro de contraseñas
 */
export class PasswordUtil {
  static async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  static async compare(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
  }
}
