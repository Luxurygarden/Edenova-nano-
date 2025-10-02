import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';

type Plan = 'FREE' | 'PRO';

interface User {
  name: string;
  email: string;
  avatar: string;
  plan: Plan;
}

interface AuthContextType {
  user: User | null;
  login: () => void;
  logout: () => void;
  upgrade: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USER: User = {
    name: 'Alex Innovate',
    email: 'alex.innovate@example.com',
    avatar: 'https://i.pravatar.cc/150?u=alexinnovate',
    plan: 'FREE',
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Attempt to load user from localStorage on initial load
    try {
        const storedUser = localStorage.getItem('edenovaUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem('edenovaUser');
    }
  }, []);

  const login = useCallback(() => {
    // In a real app, this would involve an OAuth flow.
    // Here, we'll just set a mock user.
    const loggedInUser = { ...MOCK_USER, plan: user?.plan || 'FREE' };
    localStorage.setItem('edenovaUser', JSON.stringify(loggedInUser));
    setUser(loggedInUser);
  }, [user]);

  const logout = useCallback(() => {
    localStorage.removeItem('edenovaUser');
    setUser(null);
  }, []);

  const upgrade = useCallback(() => {
    setUser(currentUser => {
        if (!currentUser) return null;
        const proUser = { ...currentUser, plan: 'PRO' as Plan };
        localStorage.setItem('edenovaUser', JSON.stringify(proUser));
        return proUser;
    });
  }, []);


  return (
    <AuthContext.Provider value={{ user, login, logout, upgrade }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};