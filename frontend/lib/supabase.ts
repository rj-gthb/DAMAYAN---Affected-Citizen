import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';

const supabaseUrl = 'https://pzkwdzozejwqsbenwpms.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6a3dkem96ZWp3cXNiZW53cG1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxOTIxMDcsImV4cCI6MjA4Nzc2ODEwN30.VU5vCj46t1s1toNBG4Ks_5xlXudXhaTwezTWImvkOpk';

const isWeb = Platform.OS === 'web';

// Safe storage for SSR/Web
const customStorage = {
  getItem: async (key: string) => {
    if (isWeb) {
      if (typeof window !== 'undefined') {
        return localStorage.getItem(key);
      }
      return null;
    }
    return AsyncStorage.getItem(key);
  },
  setItem: async (key: string, value: string) => {
    if (isWeb) {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, value);
      }
    } else {
      await AsyncStorage.setItem(key, value);
    }
  },
  removeItem: async (key: string) => {
    if (isWeb) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
      }
    } else {
      await AsyncStorage.removeItem(key);
    }
  },
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: customStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: isWeb,
  },
});
