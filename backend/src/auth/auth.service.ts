import { Injectable, BadRequestException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class AuthService {
  constructor(private supabaseService: SupabaseService) {}

  async signUp(email: string, password: string, metadata: any) {
    const { data, error } = await this.supabaseService.getClient().auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });

    if (error) {
      throw new BadRequestException(error.message);
    }

    return data;
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabaseService.getClient().auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new BadRequestException(error.message);
    }

    return data;
  }

  async signOut() {
    const { error } = await this.supabaseService.getClient().auth.signOut();
    if (error) {
      throw new BadRequestException(error.message);
    }
  }
}
