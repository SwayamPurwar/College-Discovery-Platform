import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [savedColleges, setSavedColleges] = useState([]);

  // Check for existing session on load
  useEffect(() => {
    const storedUser = localStorage.getItem('mock_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      const storedSaves = localStorage.getItem(`saves_${JSON.parse(storedUser).email}`);
      if (storedSaves) setSavedColleges(JSON.parse(storedSaves));
    }
  }, []);

  const login = (email) => {
    const newUser = { email, name: email.split('@')[0] };
    setUser(newUser);
    localStorage.setItem('mock_user', JSON.stringify(newUser));
    
    // Load this specific user's saved colleges
    const storedSaves = localStorage.getItem(`saves_${email}`);
    setSavedColleges(storedSaves ? JSON.parse(storedSaves) : []);
  };

  const logout = () => {
    setUser(null);
    setSavedColleges([]);
    localStorage.removeItem('mock_user');
  };

  const toggleSave = (college) => {
    if (!user) {
      alert("Please login to save colleges!");
      return;
    }
    
    let updatedSaves;
    if (savedColleges.find(c => c.id === college.id)) {
      updatedSaves = savedColleges.filter(c => c.id !== college.id);
    } else {
      updatedSaves = [...savedColleges, college];
    }
    
    setSavedColleges(updatedSaves);
    localStorage.setItem(`saves_${user.email}`, JSON.stringify(updatedSaves));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, savedColleges, toggleSave }}>
      {children}
    </AuthContext.Provider>
  );
};