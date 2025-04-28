// Simple user state management
let currentUser: { id: string; email: string } | null = null;

export const signInAsGuest = (email: string) => {
  currentUser = {
    id: Math.random().toString(36).substr(2, 9),
    email
  };
  return currentUser;
};

export const getCurrentUser = () => {
  return currentUser;
};

export const signOut = () => {
  currentUser = null;
};