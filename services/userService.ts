
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Types
export interface UserData {
    id?: string;
    name: string;
    phone: string;
    last_login: string;
}

// Initialize Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey);
}

// Service Methods
export const userService = {
    // Save user (Login)
    async saveUser(name: string, phone: string): Promise<UserData> {
        const userData: UserData = {
            name,
            phone,
            last_login: new Date().toISOString()
        };

        if (supabase) {
            try {
                // Try to insert or update based on phone number (assuming phone is unique identifier)
                // Note: You need a 'users' table in Supabase with columns: id, name, phone, last_login
                // and phone as unique constraint or primary key.
                const { data, error } = await supabase
                    .from('users')
                    .upsert(userData, { onConflict: 'phone' })
                    .select()
                    .single();

                if (error) throw error;
                return data as UserData;
            } catch (e) {
                console.error("Supabase error:", e);
                // Fallback to local
            }
        }

        // LocalStorage Fallback
        const localUsers = JSON.parse(localStorage.getItem('vedaGuruUsers') || '[]');
        const existingIndex = localUsers.findIndex((u: UserData) => u.phone === phone);

        if (existingIndex >= 0) {
            localUsers[existingIndex] = { ...localUsers[existingIndex], ...userData };
        } else {
            localUsers.push(userData);
        }

        localStorage.setItem('vedaGuruUsers', JSON.stringify(localUsers));
        return userData;
    },

    // Get all users (Admin)
    async getUsers(): Promise<UserData[]> {
        if (supabase) {
            try {
                const { data, error } = await supabase
                    .from('users')
                    .select('*')
                    .order('last_login', { ascending: false });

                if (error) throw error;
                return data as UserData[];
            } catch (e) {
                console.error("Supabase admin error:", e);
            }
        }

        // LocalStorage Fallback
        return JSON.parse(localStorage.getItem('vedaGuruUsers') || '[]');
    },

    // Verify Admin Password
    async verifyAdmin(password: string): Promise<boolean> {
        // Simple verification for demo purposes
        // specific env var or default 'admin123'
        const adminPass = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';
        return password === adminPass;
    }
};
