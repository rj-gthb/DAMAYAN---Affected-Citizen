import { SupabaseService } from '../supabase/supabase.service';
export declare class StorageService {
    private supabaseService;
    constructor(supabaseService: SupabaseService);
    uploadFile(bucket: string, path: string, file: Express.Multer.File): Promise<{
        path: string;
        publicUrl: string;
    }>;
}
