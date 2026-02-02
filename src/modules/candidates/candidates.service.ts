import { ForbiddenException, Injectable } from '@nestjs/common';
import { CandidatesDao } from './dao/candidates.dao';

@Injectable()
export class CandidatesService {
  constructor(private readonly dao: CandidatesDao) {}

  list(roomId: string) {
    return this.dao.list(roomId);
  }

  async create(roomId: string, userId: string, name: string) {
    const member = await this.dao.getMembership(roomId, userId);
    if (!member || member.role !== 'ADMIN') {
      throw new ForbiddenException('Solo admin puede crear candidatos');
    }

    return this.dao.create(roomId, name.trim());
  }
}
