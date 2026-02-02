import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CandidatesService } from './candidates.service';

@UseGuards(AuthGuard('jwt'))
@Controller()
export class CandidatesController {
  constructor(private readonly service: CandidatesService) {}

  @Get('rooms/:roomId/candidates')
  list(@Param('roomId') roomId: string) {
    return this.service.list(roomId);
  }

  @Post('rooms/:roomId/candidates')
  create(
    @Param('roomId') roomId: string,
    @Body() body: { name: string },
    @Req() req: any
  ) {
    return this.service.create(roomId, req.user.id, body.name);
  }
}