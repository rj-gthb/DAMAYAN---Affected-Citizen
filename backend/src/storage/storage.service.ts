import { Injectable, BadRequestException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class StorageService {
  constructor(private supabaseService: SupabaseService) {}

  async uploadFile(bucket: string, path: string, file: Express.Multer.File) {
    const { data, error } = await this.supabaseService.getClient()
      .storage
      .from(bucket)
      .upload(path, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) {
      throw new BadRequestException(error.message);
    }

    // Get public URL
    const { data: publicUrlData } = this.supabaseService.getClient()
      .storage
      .from(bucket)
      .getPublicUrl(path);

    return {
      path: data.path,
      publicUrl: publicUrlData.publicUrl,
    };
  }
}
