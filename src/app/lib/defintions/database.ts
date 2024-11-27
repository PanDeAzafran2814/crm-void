export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      clients: {
        Row: {
          association_date: string | null
          client_logo: string | null
          contact_address: string | null
          contact_city: string | null
          contact_email: string
          contact_phone: string | null
          contact_state: string | null
          contact_zip: string | null
          contacts: Json | null
          created_at: string
          enable: boolean
          id: string
          last_update: string | null
          name: string
          notes: Json[] | null
          visible: boolean
        }
        Insert: {
          association_date?: string | null
          client_logo?: string | null
          contact_address?: string | null
          contact_city?: string | null
          contact_email: string
          contact_phone?: string | null
          contact_state?: string | null
          contact_zip?: string | null
          contacts?: Json | null
          created_at?: string
          enable?: boolean
          id?: string
          last_update?: string | null
          name: string
          notes?: Json[] | null
          visible?: boolean
        }
        Update: {
          association_date?: string | null
          client_logo?: string | null
          contact_address?: string | null
          contact_city?: string | null
          contact_email?: string
          contact_phone?: string | null
          contact_state?: string | null
          contact_zip?: string | null
          contacts?: Json | null
          created_at?: string
          enable?: boolean
          id?: string
          last_update?: string | null
          name?: string
          notes?: Json[] | null
          visible?: boolean
        }
        Relationships: []
      }
      leads: {
        Row: {
          company_name: string
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          contact_position: string | null
          created_at: string
          date_of_first_contact: string | null
          date_of_last_interaction: string | null
          id: string
          last_action: string | null
          last_update: string | null
          lead_id: number | null
          notes: Json | null
          reason_to_close: string | null
          source: string | null
          status: string | null
        }
        Insert: {
          company_name: string
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          contact_position?: string | null
          created_at?: string
          date_of_first_contact?: string | null
          date_of_last_interaction?: string | null
          id?: string
          last_action?: string | null
          last_update?: string | null
          lead_id?: number | null
          notes?: Json | null
          reason_to_close?: string | null
          source?: string | null
          status?: string | null
        }
        Update: {
          company_name?: string
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          contact_position?: string | null
          created_at?: string
          date_of_first_contact?: string | null
          date_of_last_interaction?: string | null
          id?: string
          last_action?: string | null
          last_update?: string | null
          lead_id?: number | null
          notes?: Json | null
          reason_to_close?: string | null
          source?: string | null
          status?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          amount: number | null
          badge: string | null
          client: string
          concept: string | null
          contact: number
          created_at: string
          discount: number | null
          discount_type: string | null
          finish_date: string
          id: string
          last_update: string | null
          notes: Json | null
          service: string
          service_id: number | null
          start_date: string
          status: string
          subtotal: number | null
          tasks: Json | null
          tax: number | null
          tax_calc: number | null
          total: number | null
        }
        Insert: {
          amount?: number | null
          badge?: string | null
          client: string
          concept?: string | null
          contact: number
          created_at?: string
          discount?: number | null
          discount_type?: string | null
          finish_date: string
          id?: string
          last_update?: string | null
          notes?: Json | null
          service: string
          service_id?: number | null
          start_date: string
          status: string
          subtotal?: number | null
          tasks?: Json | null
          tax?: number | null
          tax_calc?: number | null
          total?: number | null
        }
        Update: {
          amount?: number | null
          badge?: string | null
          client?: string
          concept?: string | null
          contact?: number
          created_at?: string
          discount?: number | null
          discount_type?: string | null
          finish_date?: string
          id?: string
          last_update?: string | null
          notes?: Json | null
          service?: string
          service_id?: number | null
          start_date?: string
          status?: string
          subtotal?: number | null
          tasks?: Json | null
          tax?: number | null
          tax_calc?: number | null
          total?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "services_client_fkey"
            columns: ["client"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      suscriptions: {
        Row: {
          amount: number | null
          badge: string | null
          balance: number | null
          client: string
          concept: string | null
          contact: number
          created_at: string
          discount: number | null
          discount_type: string | null
          each: number | null
          each_type: string | null
          form_date: string
          id: string
          last_update: string | null
          notes: Json | null
          renewal_date: string | null
          renewed_from: string | null
          renewed_from_date: string | null
          service: string
          subtotal: number | null
          suscription_id: number | null
          tax: number | null
          tax_calc: number | null
          total: number | null
        }
        Insert: {
          amount?: number | null
          badge?: string | null
          balance?: number | null
          client: string
          concept?: string | null
          contact: number
          created_at?: string
          discount?: number | null
          discount_type?: string | null
          each?: number | null
          each_type?: string | null
          form_date: string
          id?: string
          last_update?: string | null
          notes?: Json | null
          renewal_date?: string | null
          renewed_from?: string | null
          renewed_from_date?: string | null
          service: string
          subtotal?: number | null
          suscription_id?: number | null
          tax?: number | null
          tax_calc?: number | null
          total?: number | null
        }
        Update: {
          amount?: number | null
          badge?: string | null
          balance?: number | null
          client?: string
          concept?: string | null
          contact?: number
          created_at?: string
          discount?: number | null
          discount_type?: string | null
          each?: number | null
          each_type?: string | null
          form_date?: string
          id?: string
          last_update?: string | null
          notes?: Json | null
          renewal_date?: string | null
          renewed_from?: string | null
          renewed_from_date?: string | null
          service?: string
          subtotal?: number | null
          suscription_id?: number | null
          tax?: number | null
          tax_calc?: number | null
          total?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "suscriptions_client_fkey"
            columns: ["client"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "suscriptions_renewed_from_fkey"
            columns: ["renewed_from"]
            isOneToOne: false
            referencedRelation: "suscriptions"
            referencedColumns: ["id"]
          },
        ]
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
