import { StorageService } from './storage.service';
export declare class StorageController {
    private readonly storageService;
    constructor(storageService: StorageService);
    uploadFile(bucket: string, file: Express.Multer.File): Promise<{
        path: string;
        publicUrl: string;
    }>;
}
