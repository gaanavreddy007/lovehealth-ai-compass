// Authentication Service for LoveHealth AI
// Handles user authentication, session management, and user preferences

import { useToast } from "@/hooks/use-toast";

// User interface
export interface User {
  id: string;
  email: string;
  name: string;
  language: "en" | "te" | "kn";
}

// Authentication response interface
interface AuthResponse {
  success: boolean;
  user?: User;
  message?: string;
}

// Mock user database for demo purposes
// In a real application, this would be stored in a backend database
const MOCK_USERS = [
  {
    id: "user-1",
    email: "user@example.com",
    password: "password123",
    name: "Demo User",
    language: "en" as const
  },
  {
    id: "user-2",
    email: "telugu@example.com",
    password: "password123",
    name: "Telugu User",
    language: "te" as const
  },
  {
    id: "user-3",
    email: "kannada@example.com",
    password: "password123",
    name: "Kannada User",
    language: "kn" as const
  }
];

// Local storage keys
const USER_STORAGE_KEY = "lovehealth_user";
const TOKEN_STORAGE_KEY = "lovehealth_token";

/**
 * Login with email and password
 */
export async function login(email: string, password: string): Promise<AuthResponse> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  try {
    // Find user in mock database
    const user = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      return {
        success: false,
        message: "User not found. Please check your email."
      };
    }
    
    // Check password
    if (user.password !== password) {
      return {
        success: false,
        message: "Incorrect password. Please try again."
      };
    }
    
    // Create user object without password
    const authenticatedUser: User = {
      id: user.id,
      email: user.email,
      name: user.name,
      language: user.language
    };
    
    // Save user to local storage
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(authenticatedUser));
    localStorage.setItem(TOKEN_STORAGE_KEY, `mock-token-${user.id}-${Date.now()}`);
    
    return {
      success: true,
      user: authenticatedUser
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: "An error occurred during login. Please try again."
    };
  }
}

/**
 * Logout the current user
 */
export function logout(): void {
  localStorage.removeItem(USER_STORAGE_KEY);
  localStorage.removeItem(TOKEN_STORAGE_KEY);
}

/**
 * Check if user is currently logged in
 */
export function isAuthenticated(): boolean {
  return !!localStorage.getItem(TOKEN_STORAGE_KEY);
}

/**
 * Get the current user from local storage
 */
export function getCurrentUser(): User | null {
  const userJson = localStorage.getItem(USER_STORAGE_KEY);
  if (!userJson) return null;
  
  try {
    return JSON.parse(userJson) as User;
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
}

/**
 * Update user preferences
 */
export function updateUserPreferences(preferences: Partial<User>): void {
  const currentUser = getCurrentUser();
  if (!currentUser) return;
  
  const updatedUser = {
    ...currentUser,
    ...preferences
  };
  
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
}
