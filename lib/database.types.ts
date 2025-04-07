export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      order_items: {
        Row: {
          id: number
          order_id: number
          price_at_purchase: number
          product_id: number
          product_name: string | null
          quantity: number
        }
        Insert: {
          id?: never
          order_id: number
          price_at_purchase: number
          product_id: number
          product_name?: string | null
          quantity: number
        }
        Update: {
          id?: never
          order_id?: number
          price_at_purchase?: number
          product_id?: number
          product_name?: string | null
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          billing_city: string | null
          billing_country: string | null
          billing_street: string | null
          billing_zip_code: string | null
          city: string | null
          country: string | null
          created_at: string | null
          delivery_method: string | null
          email: string | null
          first_name: string | null
          id: number
          last_name: string | null
          payment_method: string | null
          phone: string | null
          shipping_cost: number | null
          status: string | null
          street: string | null
          stripe_session_id: string | null
          total_price: number
          updated_at: string | null
          user_id: string | null
          zip_code: string | null
        }
        Insert: {
          billing_city?: string | null
          billing_country?: string | null
          billing_street?: string | null
          billing_zip_code?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          delivery_method?: string | null
          email?: string | null
          first_name?: string | null
          id?: never
          last_name?: string | null
          payment_method?: string | null
          phone?: string | null
          shipping_cost?: number | null
          status?: string | null
          street?: string | null
          stripe_session_id?: string | null
          total_price: number
          updated_at?: string | null
          user_id?: string | null
          zip_code?: string | null
        }
        Update: {
          billing_city?: string | null
          billing_country?: string | null
          billing_street?: string | null
          billing_zip_code?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          delivery_method?: string | null
          email?: string | null
          first_name?: string | null
          id?: never
          last_name?: string | null
          payment_method?: string | null
          phone?: string | null
          shipping_cost?: number | null
          status?: string | null
          street?: string | null
          stripe_session_id?: string | null
          total_price?: number
          updated_at?: string | null
          user_id?: string | null
          zip_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          alcohol_content: string | null
          allergens: string | null
          aroma_detail: string | null
          batch_number: string | null
          bottler: string | null
          category: string | null
          color_detail: string | null
          country_of_origin: string | null
          created_at: string | null
          description: string | null
          ean_link: string | null
          id: number
          image_url: string | null
          name: string
          price: number
          producer: string | null
          residual_sugar: string | null
          serving_temp: string | null
          stock: number
          storage_temp: string | null
          sugar_content_nm: string | null
          taste_detail: string | null
          volume: string | null
          wine_region: string | null
          wine_type: string | null
        }
        Insert: {
          alcohol_content?: string | null
          allergens?: string | null
          aroma_detail?: string | null
          batch_number?: string | null
          bottler?: string | null
          category?: string | null
          color_detail?: string | null
          country_of_origin?: string | null
          created_at?: string | null
          description?: string | null
          ean_link?: string | null
          id?: number
          image_url?: string | null
          name: string
          price: number
          producer?: string | null
          residual_sugar?: string | null
          serving_temp?: string | null
          stock?: number
          storage_temp?: string | null
          sugar_content_nm?: string | null
          taste_detail?: string | null
          volume?: string | null
          wine_region?: string | null
          wine_type?: string | null
        }
        Update: {
          alcohol_content?: string | null
          allergens?: string | null
          aroma_detail?: string | null
          batch_number?: string | null
          bottler?: string | null
          category?: string | null
          color_detail?: string | null
          country_of_origin?: string | null
          created_at?: string | null
          description?: string | null
          ean_link?: string | null
          id?: number
          image_url?: string | null
          name?: string
          price?: number
          producer?: string | null
          residual_sugar?: string | null
          serving_temp?: string | null
          stock?: number
          storage_temp?: string | null
          sugar_content_nm?: string | null
          taste_detail?: string | null
          volume?: string | null
          wine_region?: string | null
          wine_type?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          role: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
