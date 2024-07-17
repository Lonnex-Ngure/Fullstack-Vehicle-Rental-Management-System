// types.ts
export interface User {
    id?: number;
    fullName: string;
    email: string;
    contactPhone: string;
    address: string;
    password: string;
  }
  
  export interface AuthResponse {
    token: string;
    user: User;
  }

  export interface VehicleSpecification {
    vehicleSpecId: number;
    manufacturer: string;
    model: string;
    year: number;
    fuelType: string;
    engineCapacity: number;
    transmission: string;
    seatingCapacity: number;
    color: string;
    features?: string;
  }
  
  export interface Vehicle {
    vehicleId: string | number;
    vehicleSpecId: number;
    rentalRate: number;
    availability: boolean;
    createdAt: string;
    updatedAt: string;
    imageUrl: string; // Assuming you have an imageUrl field
    specifications: VehicleSpecification; // Assuming you join the specs with the vehicle
  }

// src/types.ts
export interface User {
  Id: string;
  token: string;
  // Add other user properties as needed
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}


export interface BookingData {
  userId: number;
  vehicleId: number;
  locationId: number;
  bookingDate: string;
  returnDate: string;
  totalAmount: number;
  bookingStatus: string;
  gps: boolean;
  insurance: boolean;
  additionalDriver: boolean;
  rentalRate: number;
}

export interface UserProfile {
  fullName: string;
  email: string;
  contactPhone: string;
  address: string;
}