import { 
  Controller, 
  Post, 
  UploadedFile, 
  UseInterceptors, 
  Param, 
  BadRequestException 
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageService } from './storage.service';
import { UseGuards } from '@nestjs/common';
import { SupabaseGuard } from '../auth/supabase.guard';

@Controller('storage')
@UseGuards(SupabaseGuard)
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('upload/:bucket')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Param('bucket') bucket: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const fileName = `${Date.now()}-${file.originalname}`;
    return this.storageService.uploadFile(bucket, fileName, file);
  }
}
