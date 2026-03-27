import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class SupabaseGuard implements CanActivate {
  constructor(private supabaseService: SupabaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('No authorization header found');
    }

    const token = authHeader.split(' ')[1];
    const { data: { user }, error } = await this.supabaseService.getClient().auth.getUser(token);

    if (error || !user) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    // Attach user to request
    request.user = user;
    return true;
  }
}
