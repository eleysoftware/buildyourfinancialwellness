export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type AppRole = "admin" | "moderator" | "user";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          display_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          display_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      user_roles: {
        Row: { id: string; user_id: string; role: AppRole };
        Insert: { id?: string; user_id: string; role: AppRole };
        Update: { id?: string; user_id?: string; role?: AppRole };
        Relationships: [];
      };
      newsletters: {
        Row: {
          id: string;
          slug: string;
          title: string;
          excerpt: string;
          issue_year: number;
          issue_month: number;
          thumbnail_url: string | null;
          pdf_url: string | null;
          author_name: string;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          excerpt?: string;
          issue_year: number;
          issue_month: number;
          thumbnail_url?: string | null;
          pdf_url?: string | null;
          author_name?: string;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          excerpt?: string;
          issue_year?: number;
          issue_month?: number;
          thumbnail_url?: string | null;
          pdf_url?: string | null;
          author_name?: string;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      financial_tools: {
        Row: {
          id: string;
          slug: string;
          title: string;
          pdf_url: string | null;
          published: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          pdf_url?: string | null;
          published?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          pdf_url?: string | null;
          published?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      savings_reset_kit: {
        Row: {
          id: string;
          title: string;
          pdf_url: string | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title?: string;
          pdf_url?: string | null;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          pdf_url?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      has_role: {
        Args: { _user_id: string; _role: AppRole };
        Returns: boolean;
      };
    };
    Enums: { app_role: AppRole };
    CompositeTypes: Record<string, never>;
  };
}
