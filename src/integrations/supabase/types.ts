export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      accommodation_offers: {
        Row: {
          created_at: string
          currency: string
          gallery_images: string[] | null
          hotel_id: string | null
          hotel_name: string | null
          id: string
          inclusions: string[] | null
          is_active: boolean
          offer_details: string | null
          starting_fee: number | null
          title: string
          updated_at: string
          valid_until: string | null
        }
        Insert: {
          created_at?: string
          currency?: string
          gallery_images?: string[] | null
          hotel_id?: string | null
          hotel_name?: string | null
          id?: string
          inclusions?: string[] | null
          is_active?: boolean
          offer_details?: string | null
          starting_fee?: number | null
          title: string
          updated_at?: string
          valid_until?: string | null
        }
        Update: {
          created_at?: string
          currency?: string
          gallery_images?: string[] | null
          hotel_id?: string | null
          hotel_name?: string | null
          id?: string
          inclusions?: string[] | null
          is_active?: boolean
          offer_details?: string | null
          starting_fee?: number | null
          title?: string
          updated_at?: string
          valid_until?: string | null
        }
        Relationships: []
      }
      ai_knowledge: {
        Row: {
          content: string | null
          created_at: string
          id: string
          keywords: string | null
          topic: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          keywords?: string | null
          topic?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          keywords?: string | null
          topic?: string | null
        }
        Relationships: []
      }
      airlines: {
        Row: {
          code: string | null
          country: string | null
          created_at: string
          id: string
          logo_url: string | null
          name: string | null
          website: string | null
        }
        Insert: {
          code?: string | null
          country?: string | null
          created_at?: string
          id?: string
          logo_url?: string | null
          name?: string | null
          website?: string | null
        }
        Update: {
          code?: string | null
          country?: string | null
          created_at?: string
          id?: string
          logo_url?: string | null
          name?: string | null
          website?: string | null
        }
        Relationships: []
      }
      availability: {
        Row: {
          available_date: string | null
          available_quantity: number | null
          created_at: string
          id: string
          service_id: string | null
          service_type: string | null
        }
        Insert: {
          available_date?: string | null
          available_quantity?: number | null
          created_at?: string
          id?: string
          service_id?: string | null
          service_type?: string | null
        }
        Update: {
          available_date?: string | null
          available_quantity?: number | null
          created_at?: string
          id?: string
          service_id?: string | null
          service_type?: string | null
        }
        Relationships: []
      }
      booking_audit: {
        Row: {
          booking_id: string
          change_time: string
          changed_by: string | null
          id: string
          new_status: string | null
          old_status: string | null
          table_name: string | null
        }
        Insert: {
          booking_id: string
          change_time?: string
          changed_by?: string | null
          id?: string
          new_status?: string | null
          old_status?: string | null
          table_name?: string | null
        }
        Update: {
          booking_id?: string
          change_time?: string
          changed_by?: string | null
          id?: string
          new_status?: string | null
          old_status?: string | null
          table_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "booking_audit_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      booking_items: {
        Row: {
          booking_id: string
          created_at: string
          end_date: string | null
          id: string
          quantity: number | null
          service_id: string
          service_type: string
          start_date: string | null
          unit_price: number
        }
        Insert: {
          booking_id: string
          created_at?: string
          end_date?: string | null
          id?: string
          quantity?: number | null
          service_id: string
          service_type: string
          start_date?: string | null
          unit_price: number
        }
        Update: {
          booking_id?: string
          created_at?: string
          end_date?: string | null
          id?: string
          quantity?: number | null
          service_id?: string
          service_type?: string
          start_date?: string | null
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "booking_items_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          created_at: string
          email: string
          full_name: string
          guests: number | null
          id: string
          package_id: string | null
          phone: string | null
          special_requests: string | null
          status: string | null
          travel_date: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          guests?: number | null
          id?: string
          package_id?: string | null
          phone?: string | null
          special_requests?: string | null
          status?: string | null
          travel_date?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          guests?: number | null
          id?: string
          package_id?: string | null
          phone?: string | null
          special_requests?: string | null
          status?: string | null
          travel_date?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "tour_packages"
            referencedColumns: ["id"]
          },
        ]
      }
      business_directory: {
        Row: {
          address: string | null
          city: string | null
          country: string | null
          cover_image_url: string | null
          created_at: string
          description: string | null
          email: string | null
          gallery_images: string[] | null
          id: string
          is_active: boolean
          is_featured: boolean
          is_verified: boolean
          logo_url: string | null
          name: string
          phone: string | null
          products: string | null
          sector: string | null
          services: string | null
          slug: string
          updated_at: string
          website: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          country?: string | null
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          gallery_images?: string[] | null
          id?: string
          is_active?: boolean
          is_featured?: boolean
          is_verified?: boolean
          logo_url?: string | null
          name: string
          phone?: string | null
          products?: string | null
          sector?: string | null
          services?: string | null
          slug: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          country?: string | null
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          gallery_images?: string[] | null
          id?: string
          is_active?: boolean
          is_featured?: boolean
          is_verified?: boolean
          logo_url?: string | null
          name?: string
          phone?: string | null
          products?: string | null
          sector?: string | null
          services?: string | null
          slug?: string
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      business_news: {
        Row: {
          country: string | null
          created_at: string
          full_article: string | null
          id: string
          image_url: string | null
          is_active: boolean
          published_at: string
          sector: string | null
          slug: string
          source_url: string | null
          summary: string | null
          title: string
          updated_at: string
        }
        Insert: {
          country?: string | null
          created_at?: string
          full_article?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          published_at?: string
          sector?: string | null
          slug: string
          source_url?: string | null
          summary?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          country?: string | null
          created_at?: string
          full_article?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          published_at?: string
          sector?: string | null
          slug?: string
          source_url?: string | null
          summary?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      business_spotlights: {
        Row: {
          country: string | null
          created_at: string
          deposits_locations: string | null
          fraud_warnings: string | null
          full_article: string | null
          government_policies: string | null
          id: string
          image_url: string | null
          is_active: boolean
          key_stats: Json | null
          market_trends: string | null
          prices: string | null
          requirements: string | null
          sector: string
          slug: string
          summary: string | null
          title: string
          updated_at: string
        }
        Insert: {
          country?: string | null
          created_at?: string
          deposits_locations?: string | null
          fraud_warnings?: string | null
          full_article?: string | null
          government_policies?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          key_stats?: Json | null
          market_trends?: string | null
          prices?: string | null
          requirements?: string | null
          sector: string
          slug: string
          summary?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          country?: string | null
          created_at?: string
          deposits_locations?: string | null
          fraud_warnings?: string | null
          full_article?: string | null
          government_policies?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          key_stats?: Json | null
          market_trends?: string | null
          prices?: string | null
          requirements?: string | null
          sector?: string
          slug?: string
          summary?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      car_bookings: {
        Row: {
          car_id: string
          created_at: string
          currency: string | null
          driver_id: string | null
          end_date: string
          id: string
          pricing_type: string
          start_date: string
          status: string | null
          total_amount: number
          user_id: string | null
        }
        Insert: {
          car_id: string
          created_at?: string
          currency?: string | null
          driver_id?: string | null
          end_date: string
          id?: string
          pricing_type?: string
          start_date: string
          status?: string | null
          total_amount: number
          user_id?: string | null
        }
        Update: {
          car_id?: string
          created_at?: string
          currency?: string | null
          driver_id?: string | null
          end_date?: string
          id?: string
          pricing_type?: string
          start_date?: string
          status?: string | null
          total_amount?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "car_bookings_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "car_bookings_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["id"]
          },
        ]
      }
      car_hire_options: {
        Row: {
          created_at: string
          extra_cost: number | null
          id: string
          includes_driver: boolean
          includes_fuel: boolean
          name: string
        }
        Insert: {
          created_at?: string
          extra_cost?: number | null
          id?: string
          includes_driver?: boolean
          includes_fuel?: boolean
          name: string
        }
        Update: {
          created_at?: string
          extra_cost?: number | null
          id?: string
          includes_driver?: boolean
          includes_fuel?: boolean
          name?: string
        }
        Relationships: []
      }
      car_hire_rates: {
        Row: {
          available_quantity: number | null
          base_rate_per_day: number
          car_id: string
          created_at: string
          currency: string
          id: string
        }
        Insert: {
          available_quantity?: number | null
          base_rate_per_day: number
          car_id: string
          created_at?: string
          currency?: string
          id?: string
        }
        Update: {
          available_quantity?: number | null
          base_rate_per_day?: number
          car_id?: string
          created_at?: string
          currency?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "car_hire_rates_car_id_fkey"
            columns: ["car_id"]
            isOneToOne: false
            referencedRelation: "cars"
            referencedColumns: ["id"]
          },
        ]
      }
      cars: {
        Row: {
          available_quantity: number | null
          category: string | null
          created_at: string
          daily_rate_with_driver: number | null
          description: string | null
          destination_id: string
          driver_included: boolean | null
          engine_capacity: string | null
          features: string | null
          fuel_type: string | null
          id: string
          image_url: string | null
          is_available: boolean | null
          make: string | null
          model: string | null
          plate_number: string | null
          provider_id: string | null
          seating_capacity: number | null
          transmission: string | null
          year: number | null
        }
        Insert: {
          available_quantity?: number | null
          category?: string | null
          created_at?: string
          daily_rate_with_driver?: number | null
          description?: string | null
          destination_id: string
          driver_included?: boolean | null
          engine_capacity?: string | null
          features?: string | null
          fuel_type?: string | null
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          make?: string | null
          model?: string | null
          plate_number?: string | null
          provider_id?: string | null
          seating_capacity?: number | null
          transmission?: string | null
          year?: number | null
        }
        Update: {
          available_quantity?: number | null
          category?: string | null
          created_at?: string
          daily_rate_with_driver?: number | null
          description?: string | null
          destination_id?: string
          driver_included?: boolean | null
          engine_capacity?: string | null
          features?: string | null
          fuel_type?: string | null
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          make?: string | null
          model?: string | null
          plate_number?: string | null
          provider_id?: string | null
          seating_capacity?: number | null
          transmission?: string | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cars_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cars_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      chatbot_conversations: {
        Row: {
          id: string
          started_at: string
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          started_at?: string
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          started_at?: string
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      chatbot_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          role: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          role: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "chatbot_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chatbot_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          message: string
          phone: string | null
          subject: string | null
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          id?: string
          message: string
          phone?: string | null
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          message?: string
          phone?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      countries: {
        Row: {
          capital: string | null
          climate: string | null
          created_at: string
          culture: string | null
          currency: string | null
          economy: string | null
          health_info: string | null
          id: string
          language: string | null
          name: string | null
          political_status: string | null
          security_info: string | null
          tourism_board: string | null
          travel_tips: string | null
          visa_information: string | null
        }
        Insert: {
          capital?: string | null
          climate?: string | null
          created_at?: string
          culture?: string | null
          currency?: string | null
          economy?: string | null
          health_info?: string | null
          id?: string
          language?: string | null
          name?: string | null
          political_status?: string | null
          security_info?: string | null
          tourism_board?: string | null
          travel_tips?: string | null
          visa_information?: string | null
        }
        Update: {
          capital?: string | null
          climate?: string | null
          created_at?: string
          culture?: string | null
          currency?: string | null
          economy?: string | null
          health_info?: string | null
          id?: string
          language?: string | null
          name?: string | null
          political_status?: string | null
          security_info?: string | null
          tourism_board?: string | null
          travel_tips?: string | null
          visa_information?: string | null
        }
        Relationships: []
      }
      courier_bookings: {
        Row: {
          created_at: string
          current_location: string | null
          customer_id: string
          delivery_status: string | null
          driver_id: string | null
          dropoff_address: string
          dropoff_coords: string | null
          estimated_delivery_time: string | null
          estimated_distance_km: number | null
          id: string
          is_surprise: boolean | null
          parcel_items: string | null
          payment_method: string | null
          payment_status: string | null
          pickup_address: string
          pickup_coords: string | null
          receiver_name: string | null
          receiver_phone: string | null
          special_instructions: string | null
          total_price: number
          tracking_id: string
          vehicle_id: string
        }
        Insert: {
          created_at?: string
          current_location?: string | null
          customer_id: string
          delivery_status?: string | null
          driver_id?: string | null
          dropoff_address: string
          dropoff_coords?: string | null
          estimated_delivery_time?: string | null
          estimated_distance_km?: number | null
          id?: string
          is_surprise?: boolean | null
          parcel_items?: string | null
          payment_method?: string | null
          payment_status?: string | null
          pickup_address: string
          pickup_coords?: string | null
          receiver_name?: string | null
          receiver_phone?: string | null
          special_instructions?: string | null
          total_price: number
          tracking_id: string
          vehicle_id: string
        }
        Update: {
          created_at?: string
          current_location?: string | null
          customer_id?: string
          delivery_status?: string | null
          driver_id?: string | null
          dropoff_address?: string
          dropoff_coords?: string | null
          estimated_delivery_time?: string | null
          estimated_distance_km?: number | null
          id?: string
          is_surprise?: boolean | null
          parcel_items?: string | null
          payment_method?: string | null
          payment_status?: string | null
          pickup_address?: string
          pickup_coords?: string | null
          receiver_name?: string | null
          receiver_phone?: string | null
          special_instructions?: string | null
          total_price?: number
          tracking_id?: string
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "courier_bookings_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "courier_fleet"
            referencedColumns: ["id"]
          },
        ]
      }
      courier_fleet: {
        Row: {
          base_fare: number
          created_at: string
          id: string
          image_url: string | null
          is_available: boolean | null
          max_weight_kg: number | null
          price_per_km: number
          vehicle_category: string
          vehicle_name: string
        }
        Insert: {
          base_fare: number
          created_at?: string
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          max_weight_kg?: number | null
          price_per_km: number
          vehicle_category: string
          vehicle_name: string
        }
        Update: {
          base_fare?: number
          created_at?: string
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          max_weight_kg?: number | null
          price_per_km?: number
          vehicle_category?: string
          vehicle_name?: string
        }
        Relationships: []
      }
      courier_tracking: {
        Row: {
          booking_id: string
          current_location: string | null
          id: string
          status_update: string
          update_time: string
        }
        Insert: {
          booking_id: string
          current_location?: string | null
          id?: string
          status_update: string
          update_time?: string
        }
        Update: {
          booking_id?: string
          current_location?: string | null
          id?: string
          status_update?: string
          update_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "courier_tracking_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "courier_bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      destination_distances: {
        Row: {
          created_at: string
          destination_id: string
          distance_km: number | null
          id: string
          place_id: number | null
          place_type: string | null
          travel_time_minutes: number | null
        }
        Insert: {
          created_at?: string
          destination_id: string
          distance_km?: number | null
          id?: string
          place_id?: number | null
          place_type?: string | null
          travel_time_minutes?: number | null
        }
        Update: {
          created_at?: string
          destination_id?: string
          distance_km?: number | null
          id?: string
          place_id?: number | null
          place_type?: string | null
          travel_time_minutes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "destination_distances_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
        ]
      }
      destination_info: {
        Row: {
          block_type: string | null
          content: string | null
          created_at: string
          destination_id: string
          id: string
        }
        Insert: {
          block_type?: string | null
          content?: string | null
          created_at?: string
          destination_id: string
          id?: string
        }
        Update: {
          block_type?: string | null
          content?: string | null
          created_at?: string
          destination_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "destination_info_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
        ]
      }
      destinations: {
        Row: {
          city: string
          country: string
          country_id: string | null
          created_at: string
          culture: string | null
          description: string | null
          economy: string | null
          hero_video_url: string | null
          history: string | null
          id: string
          latitude: number | null
          longitude: number | null
          population: number | null
          security_info: string | null
          seo_description: string | null
          seo_keywords: string | null
          seo_title: string | null
          slug: string | null
        }
        Insert: {
          city: string
          country: string
          country_id?: string | null
          created_at?: string
          culture?: string | null
          description?: string | null
          economy?: string | null
          hero_video_url?: string | null
          history?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          population?: number | null
          security_info?: string | null
          seo_description?: string | null
          seo_keywords?: string | null
          seo_title?: string | null
          slug?: string | null
        }
        Update: {
          city?: string
          country?: string
          country_id?: string | null
          created_at?: string
          culture?: string | null
          description?: string | null
          economy?: string | null
          hero_video_url?: string | null
          history?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          population?: number | null
          security_info?: string | null
          seo_description?: string | null
          seo_keywords?: string | null
          seo_title?: string | null
          slug?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "destinations_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      drivers: {
        Row: {
          created_at: string
          daily_rate: number
          experience_years: number | null
          full_name: string
          id: string
          is_active: boolean | null
          is_available: boolean | null
          languages: string | null
          license_number: string | null
          phone: string | null
          rating: number | null
        }
        Insert: {
          created_at?: string
          daily_rate: number
          experience_years?: number | null
          full_name: string
          id?: string
          is_active?: boolean | null
          is_available?: boolean | null
          languages?: string | null
          license_number?: string | null
          phone?: string | null
          rating?: number | null
        }
        Update: {
          created_at?: string
          daily_rate?: number
          experience_years?: number | null
          full_name?: string
          id?: string
          is_active?: boolean | null
          is_available?: boolean | null
          languages?: string | null
          license_number?: string | null
          phone?: string | null
          rating?: number | null
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string
          description: string | null
          destination_id: string | null
          end_date: string | null
          id: string
          name: string | null
          start_date: string | null
          venue: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          destination_id?: string | null
          end_date?: string | null
          id?: string
          name?: string | null
          start_date?: string | null
          venue?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          destination_id?: string | null
          end_date?: string | null
          id?: string
          name?: string | null
          start_date?: string | null
          venue?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
        ]
      }
      external_links: {
        Row: {
          affiliate_code: string | null
          created_at: string
          entity_id: string | null
          entity_type: string | null
          id: string
          provider_name: string | null
          url: string | null
        }
        Insert: {
          affiliate_code?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          provider_name?: string | null
          url?: string | null
        }
        Update: {
          affiliate_code?: string | null
          created_at?: string
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          provider_name?: string | null
          url?: string | null
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          created_at: string
          display_order: number | null
          entity_id: string | null
          entity_type: string
          id: string
          is_active: boolean | null
          question: string
        }
        Insert: {
          answer: string
          created_at?: string
          display_order?: number | null
          entity_id?: string | null
          entity_type: string
          id?: string
          is_active?: boolean | null
          question: string
        }
        Update: {
          answer?: string
          created_at?: string
          display_order?: number | null
          entity_id?: string | null
          entity_type?: string
          id?: string
          is_active?: boolean | null
          question?: string
        }
        Relationships: []
      }
      flight_price_history: {
        Row: {
          flight_id: string | null
          id: string
          price: number | null
          recorded_at: string
        }
        Insert: {
          flight_id?: string | null
          id?: string
          price?: number | null
          recorded_at?: string
        }
        Update: {
          flight_id?: string | null
          id?: string
          price?: number | null
          recorded_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "flight_price_history_flight_id_fkey"
            columns: ["flight_id"]
            isOneToOne: false
            referencedRelation: "flights"
            referencedColumns: ["id"]
          },
        ]
      }
      flights: {
        Row: {
          aircraft_type: string | null
          airline: string | null
          airline_id: string | null
          arrival_time: string
          created_at: string
          currency: string
          departure_time: string
          destination_id: string | null
          duration_minutes: number | null
          flight_number: string | null
          flight_type: string
          id: string
          last_updated: string
          origin_id: string | null
          price: number
          seats_available: number
          seats_total: number
          status: string | null
        }
        Insert: {
          aircraft_type?: string | null
          airline?: string | null
          airline_id?: string | null
          arrival_time: string
          created_at?: string
          currency?: string
          departure_time: string
          destination_id?: string | null
          duration_minutes?: number | null
          flight_number?: string | null
          flight_type?: string
          id?: string
          last_updated?: string
          origin_id?: string | null
          price: number
          seats_available?: number
          seats_total?: number
          status?: string | null
        }
        Update: {
          aircraft_type?: string | null
          airline?: string | null
          airline_id?: string | null
          arrival_time?: string
          created_at?: string
          currency?: string
          departure_time?: string
          destination_id?: string | null
          duration_minutes?: number | null
          flight_number?: string | null
          flight_type?: string
          id?: string
          last_updated?: string
          origin_id?: string | null
          price?: number
          seats_available?: number
          seats_total?: number
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "flights_airline_id_fkey"
            columns: ["airline_id"]
            isOneToOne: false
            referencedRelation: "airlines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flights_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "flights_origin_id_fkey"
            columns: ["origin_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
        ]
      }
      homepage_hero_slides: {
        Row: {
          created_at: string
          cta_label: string | null
          cta_link: string | null
          display_order: number | null
          headline: string
          id: string
          image_url: string | null
          is_active: boolean
          subheadline: string | null
          updated_at: string
          video_url: string | null
        }
        Insert: {
          created_at?: string
          cta_label?: string | null
          cta_link?: string | null
          display_order?: number | null
          headline: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          subheadline?: string | null
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          created_at?: string
          cta_label?: string | null
          cta_link?: string | null
          display_order?: number | null
          headline?: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          subheadline?: string | null
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
      hotel_rooms: {
        Row: {
          available_quantity: number | null
          capacity: number
          created_at: string
          currency: string
          description: string | null
          hotel_id: string
          id: string
          price_per_night: number
          room_type: string
        }
        Insert: {
          available_quantity?: number | null
          capacity: number
          created_at?: string
          currency?: string
          description?: string | null
          hotel_id: string
          id?: string
          price_per_night: number
          room_type: string
        }
        Update: {
          available_quantity?: number | null
          capacity?: number
          created_at?: string
          currency?: string
          description?: string | null
          hotel_id?: string
          id?: string
          price_per_night?: number
          room_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "hotel_rooms_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "hotels"
            referencedColumns: ["id"]
          },
        ]
      }
      hotels: {
        Row: {
          address: string | null
          created_at: string
          description: string | null
          destination_id: string
          id: string
          name: string
          provider_id: string | null
          rating: number | null
          vendor_id: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string
          description?: string | null
          destination_id: string
          id?: string
          name: string
          provider_id?: string | null
          rating?: number | null
          vendor_id?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string
          description?: string | null
          destination_id?: string
          id?: string
          name?: string
          provider_id?: string | null
          rating?: number | null
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hotels_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hotels_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hotels_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      investment_opportunities: {
        Row: {
          country: string | null
          created_at: string
          currency: string
          id: string
          image_url: string | null
          incentives: string | null
          industry: string
          is_active: boolean
          is_featured: boolean
          market_overview: string | null
          min_investment: number | null
          opportunities: string | null
          risks: string | null
          slug: string
          statistics: Json | null
          summary: string | null
          title: string
          updated_at: string
        }
        Insert: {
          country?: string | null
          created_at?: string
          currency?: string
          id?: string
          image_url?: string | null
          incentives?: string | null
          industry: string
          is_active?: boolean
          is_featured?: boolean
          market_overview?: string | null
          min_investment?: number | null
          opportunities?: string | null
          risks?: string | null
          slug: string
          statistics?: Json | null
          summary?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          country?: string | null
          created_at?: string
          currency?: string
          id?: string
          image_url?: string | null
          incentives?: string | null
          industry?: string
          is_active?: boolean
          is_featured?: boolean
          market_overview?: string | null
          min_investment?: number | null
          opportunities?: string | null
          risks?: string | null
          slug?: string
          statistics?: Json | null
          summary?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      magazine_issues: {
        Row: {
          category: string | null
          content: string | null
          cover_image_url: string | null
          created_at: string
          id: string
          is_published: boolean
          issue_number: string | null
          pdf_url: string | null
          published_at: string
          slug: string
          summary: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          content?: string | null
          cover_image_url?: string | null
          created_at?: string
          id?: string
          is_published?: boolean
          issue_number?: string | null
          pdf_url?: string | null
          published_at?: string
          slug: string
          summary?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          content?: string | null
          cover_image_url?: string | null
          created_at?: string
          id?: string
          is_published?: boolean
          issue_number?: string | null
          pdf_url?: string | null
          published_at?: string
          slug?: string
          summary?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      media: {
        Row: {
          caption: string | null
          created_at: string
          entity_id: string
          entity_type: string | null
          id: string
          is_featured: boolean | null
          media_type: string
          url: string
        }
        Insert: {
          caption?: string | null
          created_at?: string
          entity_id: string
          entity_type?: string | null
          id?: string
          is_featured?: boolean | null
          media_type: string
          url: string
        }
        Update: {
          caption?: string | null
          created_at?: string
          entity_id?: string
          entity_type?: string | null
          id?: string
          is_featured?: boolean | null
          media_type?: string
          url?: string
        }
        Relationships: []
      }
      national_parks: {
        Row: {
          country_id: string | null
          created_at: string
          description: string | null
          destination_id: string | null
          entry_fee: number | null
          id: string
          latitude: number | null
          longitude: number | null
          name: string | null
          wildlife: string | null
        }
        Insert: {
          country_id?: string | null
          created_at?: string
          description?: string | null
          destination_id?: string | null
          entry_fee?: number | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name?: string | null
          wildlife?: string | null
        }
        Update: {
          country_id?: string | null
          created_at?: string
          description?: string | null
          destination_id?: string | null
          entry_fee?: number | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name?: string | null
          wildlife?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "national_parks_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "national_parks_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
        ]
      }
      nearby_airports: {
        Row: {
          airport_name: string | null
          booking_links: string | null
          created_at: string
          destination_id: string | null
          distance_km: number | null
          iata_code: string | null
          id: string
          transport_options: string | null
        }
        Insert: {
          airport_name?: string | null
          booking_links?: string | null
          created_at?: string
          destination_id?: string | null
          distance_km?: number | null
          iata_code?: string | null
          id?: string
          transport_options?: string | null
        }
        Update: {
          airport_name?: string | null
          booking_links?: string | null
          created_at?: string
          destination_id?: string | null
          distance_km?: number | null
          iata_code?: string | null
          id?: string
          transport_options?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nearby_airports_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_subscriptions: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          created_at: string
          delivery_address: string
          delivery_instructions: string | null
          delivery_name: string
          delivery_phone: string
          id: string
          items: Json
          payment_method: string | null
          restaurant_slug: string
          status: string
          total_amount: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          delivery_address: string
          delivery_instructions?: string | null
          delivery_name: string
          delivery_phone: string
          id?: string
          items?: Json
          payment_method?: string | null
          restaurant_slug: string
          status?: string
          total_amount?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          delivery_address?: string
          delivery_instructions?: string | null
          delivery_name?: string
          delivery_phone?: string
          id?: string
          items?: Json
          payment_method?: string | null
          restaurant_slug?: string
          status?: string
          total_amount?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      package_offers: {
        Row: {
          created_at: string
          currency: string
          gallery_images: string[] | null
          id: string
          inclusions: string[] | null
          is_active: boolean
          offer_details: string | null
          package_slug: string | null
          starting_fee: number | null
          title: string
          tour_package_id: string | null
          updated_at: string
          valid_until: string | null
        }
        Insert: {
          created_at?: string
          currency?: string
          gallery_images?: string[] | null
          id?: string
          inclusions?: string[] | null
          is_active?: boolean
          offer_details?: string | null
          package_slug?: string | null
          starting_fee?: number | null
          title: string
          tour_package_id?: string | null
          updated_at?: string
          valid_until?: string | null
        }
        Update: {
          created_at?: string
          currency?: string
          gallery_images?: string[] | null
          id?: string
          inclusions?: string[] | null
          is_active?: boolean
          offer_details?: string | null
          package_slug?: string | null
          starting_fee?: number | null
          title?: string
          tour_package_id?: string | null
          updated_at?: string
          valid_until?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          booking_id: string
          created_at: string
          currency: string
          id: string
          method: string | null
          payment_date: string | null
          provider: string | null
          reference: string | null
          status: string
          transaction_id: string | null
        }
        Insert: {
          amount: number
          booking_id: string
          created_at?: string
          currency?: string
          id?: string
          method?: string | null
          payment_date?: string | null
          provider?: string | null
          reference?: string | null
          status?: string
          transaction_id?: string | null
        }
        Update: {
          amount?: number
          booking_id?: string
          created_at?: string
          currency?: string
          id?: string
          method?: string | null
          payment_date?: string | null
          provider?: string | null
          reference?: string | null
          status?: string
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      places_of_interest: {
        Row: {
          created_at: string
          description: string | null
          destination_id: string
          id: string
          is_featured: boolean | null
          latitude: number | null
          longitude: number | null
          name: string | null
          opening_hours: string | null
          type: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          destination_id: string
          id?: string
          is_featured?: boolean | null
          latitude?: number | null
          longitude?: number | null
          name?: string | null
          opening_hours?: string | null
          type?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          destination_id?: string
          id?: string
          is_featured?: boolean | null
          latitude?: number | null
          longitude?: number | null
          name?: string | null
          opening_hours?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "places_of_interest_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
        ]
      }
      pricing_rules: {
        Row: {
          created_at: string
          end_date: string | null
          id: string
          is_active: boolean | null
          rule_type: string | null
          service_id: string | null
          service_type: string | null
          start_date: string | null
          value: number | null
          value_type: string | null
        }
        Insert: {
          created_at?: string
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          rule_type?: string | null
          service_id?: string | null
          service_type?: string | null
          start_date?: string | null
          value?: number | null
          value_type?: string | null
        }
        Update: {
          created_at?: string
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          rule_type?: string | null
          service_id?: string | null
          service_type?: string | null
          start_date?: string | null
          value?: number | null
          value_type?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      promo_codes: {
        Row: {
          code: string | null
          created_at: string
          discount_percent: number | null
          id: string
          max_usage: number | null
          valid_from: string | null
          valid_to: string | null
        }
        Insert: {
          code?: string | null
          created_at?: string
          discount_percent?: number | null
          id?: string
          max_usage?: number | null
          valid_from?: string | null
          valid_to?: string | null
        }
        Update: {
          code?: string | null
          created_at?: string
          discount_percent?: number | null
          id?: string
          max_usage?: number | null
          valid_from?: string | null
          valid_to?: string | null
        }
        Relationships: []
      }
      provider_ai_settings: {
        Row: {
          auto_pricing: boolean | null
          auto_response: boolean | null
          created_at: string
          id: string
          provider_id: string | null
          smart_recommendation: boolean | null
        }
        Insert: {
          auto_pricing?: boolean | null
          auto_response?: boolean | null
          created_at?: string
          id?: string
          provider_id?: string | null
          smart_recommendation?: boolean | null
        }
        Update: {
          auto_pricing?: boolean | null
          auto_response?: boolean | null
          created_at?: string
          id?: string
          provider_id?: string | null
          smart_recommendation?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "provider_ai_settings_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      providers: {
        Row: {
          address: string | null
          business_type: string
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          description: string | null
          id: string
          is_verified: boolean | null
          name: string
        }
        Insert: {
          address?: string | null
          business_type: string
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_verified?: boolean | null
          name: string
        }
        Update: {
          address?: string | null
          business_type?: string
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_verified?: boolean | null
          name?: string
        }
        Relationships: []
      }
      restaurants_extended: {
        Row: {
          created_at: string
          cuisine_type: string | null
          description: string | null
          destination_id: string | null
          id: string
          name: string | null
          price_range: string | null
          provider_id: string | null
          rating: number | null
        }
        Insert: {
          created_at?: string
          cuisine_type?: string | null
          description?: string | null
          destination_id?: string | null
          id?: string
          name?: string | null
          price_range?: string | null
          provider_id?: string | null
          rating?: number | null
        }
        Update: {
          created_at?: string
          cuisine_type?: string | null
          description?: string | null
          destination_id?: string | null
          id?: string
          name?: string | null
          price_range?: string | null
          provider_id?: string | null
          rating?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "restaurants_extended_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "restaurants_extended_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          item_name: string
          item_type: string
          rating: number
          user_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          item_name: string
          item_type: string
          rating: number
          user_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          item_name?: string
          item_type?: string
          rating?: number
          user_id?: string
        }
        Relationships: []
      }
      search_logs: {
        Row: {
          entity_id: string | null
          entity_type: string | null
          id: string
          keyword: string
          results_count: number | null
          searched_at: string
          user_id: string | null
          user_ip: string | null
        }
        Insert: {
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          keyword: string
          results_count?: number | null
          searched_at?: string
          user_id?: string | null
          user_ip?: string | null
        }
        Update: {
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          keyword?: string
          results_count?: number | null
          searched_at?: string
          user_id?: string | null
          user_ip?: string | null
        }
        Relationships: []
      }
      surprise_packages: {
        Row: {
          created_at: string
          description: string | null
          id: string
          includes: Json | null
          name: string | null
          price: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          includes?: Json | null
          name?: string | null
          price?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          includes?: Json | null
          name?: string | null
          price?: number | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          author_name: string
          avatar_url: string | null
          country: string | null
          created_at: string
          display_order: number | null
          id: string
          is_active: boolean
          quote: string
          rating: number | null
          role: string | null
          updated_at: string
        }
        Insert: {
          author_name: string
          avatar_url?: string | null
          country?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          is_active?: boolean
          quote: string
          rating?: number | null
          role?: string | null
          updated_at?: string
        }
        Update: {
          author_name?: string
          avatar_url?: string | null
          country?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          is_active?: boolean
          quote?: string
          rating?: number | null
          role?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      tour_itinerary_days: {
        Row: {
          accommodation: string | null
          activities: string | null
          created_at: string
          day_number: number
          description: string | null
          id: string
          meals_included: string | null
          title: string | null
          tour_package_id: string
        }
        Insert: {
          accommodation?: string | null
          activities?: string | null
          created_at?: string
          day_number: number
          description?: string | null
          id?: string
          meals_included?: string | null
          title?: string | null
          tour_package_id: string
        }
        Update: {
          accommodation?: string | null
          activities?: string | null
          created_at?: string
          day_number?: number
          description?: string | null
          id?: string
          meals_included?: string | null
          title?: string | null
          tour_package_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tour_itinerary_days_tour_package_id_fkey"
            columns: ["tour_package_id"]
            isOneToOne: false
            referencedRelation: "tour_packages"
            referencedColumns: ["id"]
          },
        ]
      }
      tour_package_destinations: {
        Row: {
          day_number: number | null
          destination_id: string
          tour_package_id: string
        }
        Insert: {
          day_number?: number | null
          destination_id: string
          tour_package_id: string
        }
        Update: {
          day_number?: number | null
          destination_id?: string
          tour_package_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tour_package_destinations_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tour_package_destinations_tour_package_id_fkey"
            columns: ["tour_package_id"]
            isOneToOne: false
            referencedRelation: "tour_packages"
            referencedColumns: ["id"]
          },
        ]
      }
      tour_packages: {
        Row: {
          country: string | null
          created_at: string
          currency: string | null
          description: string | null
          duration: string | null
          group_size: string | null
          highlights: string[] | null
          id: string
          image_url: string | null
          is_featured: boolean | null
          location: string | null
          price_from: number | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          country?: string | null
          created_at?: string
          currency?: string | null
          description?: string | null
          duration?: string | null
          group_size?: string | null
          highlights?: string[] | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          location?: string | null
          price_from?: number | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          country?: string | null
          created_at?: string
          currency?: string | null
          description?: string | null
          duration?: string | null
          group_size?: string | null
          highlights?: string[] | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          location?: string | null
          price_from?: number | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      tourism_news_feed: {
        Row: {
          category: string
          content: string | null
          created_at: string
          id: string
          image_url: string | null
          is_published: boolean
          published_at: string
          relevance_score: number
          rewritten_by_ai: boolean
          slug: string
          source_url: string | null
          summary: string | null
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          category?: string
          content?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          is_published?: boolean
          published_at?: string
          relevance_score?: number
          rewritten_by_ai?: boolean
          slug: string
          source_url?: string | null
          summary?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          content?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          is_published?: boolean
          published_at?: string
          relevance_score?: number
          rewritten_by_ai?: boolean
          slug?: string
          source_url?: string | null
          summary?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      tours: {
        Row: {
          created_at: string
          duration_days: number | null
          full_description: string | null
          hero_image: string | null
          id: string
          location: string | null
          short_description: string | null
          slug: string | null
          title: string | null
        }
        Insert: {
          created_at?: string
          duration_days?: number | null
          full_description?: string | null
          hero_image?: string | null
          id?: string
          location?: string | null
          short_description?: string | null
          slug?: string | null
          title?: string | null
        }
        Update: {
          created_at?: string
          duration_days?: number | null
          full_description?: string | null
          hero_image?: string | null
          id?: string
          location?: string | null
          short_description?: string | null
          slug?: string | null
          title?: string | null
        }
        Relationships: []
      }
      travel_alerts: {
        Row: {
          booking_id: string | null
          created_at: string
          id: string
          message: string | null
          sent_at: string | null
          user_id: string | null
        }
        Insert: {
          booking_id?: string | null
          created_at?: string
          id?: string
          message?: string | null
          sent_at?: string | null
          user_id?: string | null
        }
        Update: {
          booking_id?: string | null
          created_at?: string
          id?: string
          message?: string | null
          sent_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "travel_alerts_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      vendors: {
        Row: {
          company_name: string | null
          created_at: string
          email: string | null
          id: string
          name: string
          phone: string | null
        }
        Insert: {
          company_name?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name: string
          phone?: string | null
        }
        Update: {
          company_name?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
        }
        Relationships: []
      }
      venues: {
        Row: {
          capacity: number | null
          created_at: string
          currency: string | null
          description: string | null
          destination_id: string
          id: string
          name: string
          price_per_day: number | null
          provider_id: string | null
          venue_type: string | null
        }
        Insert: {
          capacity?: number | null
          created_at?: string
          currency?: string | null
          description?: string | null
          destination_id: string
          id?: string
          name: string
          price_per_day?: number | null
          provider_id?: string | null
          venue_type?: string | null
        }
        Update: {
          capacity?: number | null
          created_at?: string
          currency?: string | null
          description?: string | null
          destination_id?: string
          id?: string
          name?: string
          price_per_day?: number | null
          provider_id?: string | null
          venue_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "venues_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "venues_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      volunteer_programs: {
        Row: {
          created_at: string
          currency: string | null
          description: string | null
          destination_id: string | null
          duration_days: number | null
          id: string
          name: string | null
          organization: string | null
          price: number | null
        }
        Insert: {
          created_at?: string
          currency?: string | null
          description?: string | null
          destination_id?: string | null
          duration_days?: number | null
          id?: string
          name?: string | null
          organization?: string | null
          price?: number | null
        }
        Update: {
          created_at?: string
          currency?: string | null
          description?: string | null
          destination_id?: string | null
          duration_days?: number | null
          id?: string
          name?: string | null
          organization?: string | null
          price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "volunteer_programs_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
        ]
      }
      wildlife: {
        Row: {
          created_at: string
          description: string | null
          diet: string | null
          habitat: string | null
          id: string
          lifespan: string | null
          name: string | null
          scientific_name: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          diet?: string | null
          habitat?: string | null
          id?: string
          lifespan?: string | null
          name?: string | null
          scientific_name?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          diet?: string | null
          habitat?: string | null
          id?: string
          lifespan?: string | null
          name?: string | null
          scientific_name?: string | null
        }
        Relationships: []
      }
      wildlife_spotlight: {
        Row: {
          animal_name: string
          best_time_to_visit: string | null
          booking_package_id: string | null
          conservation_status: string | null
          created_at: string
          description: string | null
          featured_date: string | null
          fun_facts: string | null
          habitat: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          location: string | null
        }
        Insert: {
          animal_name: string
          best_time_to_visit?: string | null
          booking_package_id?: string | null
          conservation_status?: string | null
          created_at?: string
          description?: string | null
          featured_date?: string | null
          fun_facts?: string | null
          habitat?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          location?: string | null
        }
        Update: {
          animal_name?: string
          best_time_to_visit?: string | null
          booking_package_id?: string | null
          conservation_status?: string | null
          created_at?: string
          description?: string | null
          featured_date?: string | null
          fun_facts?: string | null
          habitat?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          location?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wildlife_spotlight_booking_package_id_fkey"
            columns: ["booking_package_id"]
            isOneToOne: false
            referencedRelation: "tour_packages"
            referencedColumns: ["id"]
          },
        ]
      }
      zula_tv_videos: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          duration: string | null
          guest_name: string | null
          id: string
          is_active: boolean
          is_featured: boolean
          organisation: string | null
          published_at: string
          slug: string
          thumbnail_url: string | null
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          duration?: string | null
          guest_name?: string | null
          id?: string
          is_active?: boolean
          is_featured?: boolean
          organisation?: string | null
          published_at?: string
          slug: string
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          duration?: string | null
          guest_name?: string | null
          id?: string
          is_active?: boolean
          is_featured?: boolean
          organisation?: string | null
          published_at?: string
          slug?: string
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
