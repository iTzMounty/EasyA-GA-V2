export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      luma_events: {
        Row: {
          id: string
          name: string
          cover_url: string | null
          start_at: string
          location_name: string | null
          is_online: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          cover_url?: string | null
          start_at: string
          location_name?: string | null
          is_online?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          cover_url?: string | null
          start_at?: string
          location_name?: string | null
          is_online?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}