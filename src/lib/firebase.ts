// Mock authentication for demo purposes
interface MockUser {
  email: string;
  uid: string;
}

// Fixed demo credentials for testing
const DEMO_CREDENTIALS = {
  email: 'admin@healthcare.com',
  password: 'admin123',
  name: 'Admin User'
};

// In-memory user database with localStorage persistence
const STORAGE_KEY = 'healthcare_app_auth';
let registeredUsers: MockUser[] = [];
let mockUser: MockUser | null = null;
let authChangeListeners: ((user: MockUser | null) => void)[] = [];

// Initialize auth state from localStorage
const initializeAuth = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      mockUser = parsed.user;
      registeredUsers = parsed.registeredUsers || [];
    }
  } catch (error) {
    console.warn('Failed to load auth state from localStorage:', error);
  }
};

// Save auth state to localStorage
const saveAuthState = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      user: mockUser,
      registeredUsers: registeredUsers
    }));
  } catch (error) {
    console.warn('Failed to save auth state to localStorage:', error);
  }
};

// Initialize on module load
initializeAuth();

const createMockUser = (email: string): MockUser => ({
  email,
  uid: 'demo-user-' + Math.random().toString(36).substr(2, 9),
});

export const signIn = async (email: string, password: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Check demo credentials first
  if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
    mockUser = createMockUser(email);
    saveAuthState();
    authChangeListeners.forEach(listener => listener(mockUser));
    return mockUser;
  }
  
  // Check registered users
  const registeredUser = registeredUsers.find(user => user.email === email);
  if (registeredUser && password.length >= 6) {
    mockUser = registeredUser;
    saveAuthState();
    authChangeListeners.forEach(listener => listener(mockUser));
    return mockUser;
  }
  
  throw new Error('Invalid email or password. Use admin@healthcare.com / admin123 or sign up first.');
};

export const signUp = async (email: string, password: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Check if user already exists
  if (registeredUsers.find(user => user.email === email)) {
    throw new Error('User already exists. Please use a different email or login.');
  }
  
  // Validate password
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters long.');
  }
  
  // Create new user
  const newUser = createMockUser(email);
  registeredUsers.push(newUser);
  mockUser = newUser;
  saveAuthState();
  authChangeListeners.forEach(listener => listener(mockUser));
  
  return newUser;
};

export const logout = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  mockUser = null;
  saveAuthState();
  authChangeListeners.forEach(listener => listener(null));
};

export const onAuthChange = (callback: (user: MockUser | null) => void) => {
  authChangeListeners.push(callback);
  
  // Immediately call with current user state
  callback(mockUser);
  
  // Return unsubscribe function
  return () => {
    authChangeListeners = authChangeListeners.filter(listener => listener !== callback);
  };
};

// Export demo credentials for UI display
export const getDemoCredentials = () => DEMO_CREDENTIALS;

// Export mock auth object for compatibility
export const auth = {
  currentUser: mockUser,
};
