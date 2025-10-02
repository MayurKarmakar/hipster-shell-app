/// <reference types="vite/client" />

declare module "virtual:__federation__" {
  interface IRemoteConfig {
    url: (() => Promise<string>) | string;
    format: "esm" | "systemjs" | "var";
    from: "vite" | "webpack";
  }

  export function __federation_method_setRemote(
    name: string,
    config: IRemoteConfig,
  ): void;

  export function __federation_method_getRemote(
    name: string,
    exposedPath: string,
  ): Promise<unknown>;

  export function __federation_method_unwrapDefault(
    unwrappedModule: unknown,
  ): Promise<unknown>;
  
  export function __federation_method_ensure(
    remoteName: string,
  ): Promise<unknown>;
  
  export function __federation_method_wrapDefault(
    module: unknown,
    need: boolean,
  ): Promise<unknown>;
}

declare module "authApp/Login" {
  const Login: React.ComponentType;
  export default Login;
}

declare module "authApp/UserProfile" {
  const UserProfile: React.ComponentType;
  export default UserProfile;
}

declare module "bookingApp/BookingApp" {
  const BookingApp: React.ComponentType;
  export default BookingApp;
}

declare module "bookingApp/BookingForm" {
  const BookingForm: React.ComponentType;
  export default BookingForm;
}

declare module "bookingApp/BookingList" {
  const BookingList: React.ComponentType;
  export default BookingList;
}

declare module "reportingApp/ReportingApp" {
  const ReportingApp: React.ComponentType;
  export default ReportingApp;
}

declare module "storeApp/store" {
  import { create } from "zustand";

  export interface User {
    username: string;
    isAuthenticated: boolean;
  }

  export interface Booking {
    id: string;
    service: string;
    date: string;
    time: string;
  }

  export interface AppState {
    user: User;
    login: (username: string) => void;
    logout: () => void;
    bookings: Booking[];
    addBooking: (booking: Omit<Booking, "id">) => void;
    removeBooking: (id: string) => void;
    clearBookings: () => void;
    notifications: string[];
    addNotification: (message: string) => void;
    clearNotifications: () => void;
  }

  export const useAppStore: ReturnType<typeof create<AppState>>;
  export default useAppStore;
}

declare module "storeApp/StoreApp" {
  const StoreApp: React.ComponentType;
  export default StoreApp;
}
