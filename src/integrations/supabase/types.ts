export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      agent_knowledge_bases: {
        Row: {
          agent_id: string
          created_at: string | null
          id: string
          knowledge_base_id: string
        }
        Insert: {
          agent_id: string
          created_at?: string | null
          id?: string
          knowledge_base_id: string
        }
        Update: {
          agent_id?: string
          created_at?: string | null
          id?: string
          knowledge_base_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_knowledge_bases_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "ai_agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_knowledge_bases_knowledge_base_id_fkey"
            columns: ["knowledge_base_id"]
            isOneToOne: false
            referencedRelation: "knowledge_bases"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_agents: {
        Row: {
          created_at: string | null
          custom_icon_url: string | null
          deployment_url: string | null
          description: string | null
          fallback_message: string | null
          font_family: string | null
          goals: string | null
          guidelines: string | null
          has_calendar: boolean | null
          has_lead_capture: boolean | null
          has_vision: boolean | null
          has_voice_ai: boolean | null
          id: string
          is_deployed: boolean | null
          name: string
          primary_color: string | null
          tools: Json | null
          ui_theme: Json | null
          updated_at: string | null
          user_id: string
          workflow_config: Json | null
        }
        Insert: {
          created_at?: string | null
          custom_icon_url?: string | null
          deployment_url?: string | null
          description?: string | null
          fallback_message?: string | null
          font_family?: string | null
          goals?: string | null
          guidelines?: string | null
          has_calendar?: boolean | null
          has_lead_capture?: boolean | null
          has_vision?: boolean | null
          has_voice_ai?: boolean | null
          id?: string
          is_deployed?: boolean | null
          name: string
          primary_color?: string | null
          tools?: Json | null
          ui_theme?: Json | null
          updated_at?: string | null
          user_id: string
          workflow_config?: Json | null
        }
        Update: {
          created_at?: string | null
          custom_icon_url?: string | null
          deployment_url?: string | null
          description?: string | null
          fallback_message?: string | null
          font_family?: string | null
          goals?: string | null
          guidelines?: string | null
          has_calendar?: boolean | null
          has_lead_capture?: boolean | null
          has_vision?: boolean | null
          has_voice_ai?: boolean | null
          id?: string
          is_deployed?: boolean | null
          name?: string
          primary_color?: string | null
          tools?: Json | null
          ui_theme?: Json | null
          updated_at?: string | null
          user_id?: string
          workflow_config?: Json | null
        }
        Relationships: []
      }
      knowledge_bases: {
        Row: {
          content: string | null
          created_at: string | null
          id: string
          is_editable: boolean | null
          name: string
          source_type: string | null
          source_url: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          id?: string
          is_editable?: boolean | null
          name: string
          source_type?: string | null
          source_url?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string | null
          created_at?: string | null
          id?: string
          is_editable?: boolean | null
          name?: string
          source_type?: string | null
          source_url?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          agreed_to_privacy: boolean | null
          created_at: string | null
          full_name: string | null
          id: string
          referral_source: string | null
          role: string | null
          updated_at: string | null
          user_id: string
          username: string | null
        }
        Insert: {
          agreed_to_privacy?: boolean | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          referral_source?: string | null
          role?: string | null
          updated_at?: string | null
          user_id: string
          username?: string | null
        }
        Update: {
          agreed_to_privacy?: boolean | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          referral_source?: string | null
          role?: string | null
          updated_at?: string | null
          user_id?: string
          username?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
