import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(body: any): Promise<{
        user: import("@supabase/auth-js").User | null;
        session: import("@supabase/auth-js").Session | null;
    }>;
    login(body: any): Promise<{
        user: import("@supabase/auth-js").User;
        session: import("@supabase/auth-js").Session;
        weakPassword?: import("@supabase/auth-js").WeakPassword;
    }>;
    logout(): Promise<void>;
}
