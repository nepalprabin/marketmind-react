// Authentication service for handling user authentication
import { jwtDecode } from "jwt-decode";

// Define user interface
export interface User {
  id?: string;
  name?: string;
  email?: string;
  picture?: string;
  isAuthenticated: boolean;
}

// JWT token interface
interface JwtPayload {
  email: string;
  sub: string;
  iat: number;
  exp: number;
  name?: string;
  picture?: string;
}

// Authentication service
export const AuthService = {
  // Initialize user state
  initUser: (): User => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        // Ensure user has a picture, generate one if missing
        if (!user.picture && user.name) {
          user.picture = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            user.name
          )}&background=random&color=fff`;
        }
        return user;
      } catch (error) {
        console.error("Error parsing stored user:", error);
      }
    }
    return { isAuthenticated: false };
  },

  // Save user to local storage
  saveUser: (user: User): void => {
    console.log("Saving user to localStorage:", user);
    localStorage.setItem("user", JSON.stringify(user));
  },

  // Clear user from local storage
  clearUser: (): void => {
    localStorage.removeItem("user");
  },

  // Google authentication
  googleAuth: (): void => {
    // Redirect to Google auth endpoint
    window.location.href = "http://localhost:3000/api/auth/google";
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        return user.isAuthenticated === true;
      } catch (error) {
        console.error("Error checking authentication status:", error);
      }
    }
    return false;
  },

  // Logout user
  logout: (): void => {
    localStorage.removeItem("user");
    // Reload page to reset application state
    window.location.href = "/";
  },

  // Handle authentication callback with JWT token
  handleAuthCallback: async (params: URLSearchParams): Promise<User | null> => {
    // Check for JWT token in URL params
    const token = params.get("token");
    const error = params.get("error");

    if (error) {
      console.error("Authentication error:", error);
      return null;
    }

    if (token) {
      try {
        console.log("Processing authentication with JWT token");

        // Decode JWT token to extract user information
        const decodedToken = jwtDecode<JwtPayload>(token);
        console.log("Decoded JWT token:", decodedToken);

        // Create user object from decoded token
        const userName = decodedToken.name || decodedToken.email.split("@")[0]; // Use email username if name not provided
        const user: User = {
          id: decodedToken.sub,
          email: decodedToken.email,
          name: userName,
          picture:
            decodedToken.picture ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              userName
            )}&background=random&color=fff`,
          isAuthenticated: true,
        };

        console.log("Created user object from JWT:", user);

        // Save token for future API requests
        localStorage.setItem("auth_token", token);

        // Save user to local storage
        AuthService.saveUser(user);

        // Verify the user was saved correctly
        const savedUser = localStorage.getItem("user");
        console.log("Verified localStorage after save:", savedUser);

        return user;
      } catch (error) {
        console.error("Error handling JWT authentication callback:", error);
      }
    }

    return null;
  },
};

export default AuthService;
