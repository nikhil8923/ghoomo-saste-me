import React, { useState, useEffect, createContext, useContext } from 'react';
import { Routes, Route, Navigate, useNavigate, Link, useLocation } from 'react-router-dom';
import { supabase } from './supabaseClient';
import LoginPage from './pages/LoginPage';
import OverviewPage from './pages/OverviewPage';
import BlogsPage from './pages/BlogsPage';
import GalleryPage from './pages/GalleryPage';
import DestinationsPage from './pages/DestinationsPage';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      console.log('Session loaded:', data.session);
      setSession(data.session);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      console.log('Auth changed:', s);
      setSession(s);
    });

    document.body.setAttribute('data-admin', 'true');
    document.body.style.paddingBottom = '0';
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.removeAttribute('data-admin');
      document.body.style.paddingBottom = '';
      document.body.style.overflow = '';
      subscription.unsubscribe();
    };
  }, []);

  if (session === undefined) return (
    <div data-admin="true" style={{
      position: 'fixed', top: 0, left: 0,
      width: '100vw', height: '100vh',
      background: '#0f3460', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      color: 'white', fontSize: '1.5rem',
      fontFamily: 'sans-serif', zIndex: 9999
    }}>
      ⏳ Loading...
    </div>
  );

  return (
    <AuthContext.Provider value={{ session }}>
      {children}
    </AuthContext.Provider>
  );
}

function ProtectedRoute({ children }) {
  const { session } = useAuth();
  return session ? children : <Navigate to="/admin/login" replace />;
}

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { path: '/admin', label: '📊 Overview' },
    { path: '/admin/blogs', label: '📝 Blogs' },
    { path: '/admin/gallery', label: '🖼️ Gallery' },
    { path: '/admin/destinations', label: '📍 Destinations' },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  return (
    <div style={{
      width: '220px', background: '#1a1a2e',
      minHeight: '100vh', padding: '1.5rem 1rem',
      display: 'flex', flexDirection: 'column',
      boxSizing: 'border-box', flexShrink: 0
    }}>
      <h2 style={{
        color: '#e94560', marginBottom: '2rem',
        fontSize: '1.2rem', marginTop: 0, fontFamily: 'sans-serif'
      }}>
        ⚡ Admin Panel
      </h2>
      {links.map(l => (
        <Link key={l.path} to={l.path} style={{
          color: location.pathname === l.path ? '#e94560' : '#ccc',
          textDecoration: 'none', padding: '0.6rem 0.8rem',
          borderRadius: '6px', marginBottom: '0.4rem',
          background: location.pathname === l.path ? '#16213e' : 'transparent',
          display: 'block', fontFamily: 'sans-serif'
        }}>
          {l.label}
        </Link>
      ))}
      <button onClick={handleLogout} style={{
        marginTop: 'auto', background: '#e94560',
        color: 'white', border: 'none', padding: '0.6rem',
        borderRadius: '6px', cursor: 'pointer', fontFamily: 'sans-serif'
      }}>
        Logout
      </button>
    </div>
  );
}

function AdminLayout({ children }) {
  return (
    <div data-admin="true" style={{
      display: 'flex', background: '#0f3460',
      fontFamily: 'sans-serif', position: 'fixed',
      top: 0, left: 0, width: '100vw', height: '100vh',
      overflowY: 'auto', zIndex: 9999
    }}>
      <Sidebar />
      <main style={{
        flex: 1, padding: '2rem',
        color: 'white', overflowY: 'auto'
      }}>
        {children}
      </main>
    </div>
  );
}

export default function AdminApp() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout><OverviewPage /></AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/blogs" element={
          <ProtectedRoute>
            <AdminLayout><BlogsPage /></AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/gallery" element={
          <ProtectedRoute>
            <AdminLayout><GalleryPage /></AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/destinations" element={
          <ProtectedRoute>
            <AdminLayout><DestinationsPage /></AdminLayout>
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AuthProvider>
  );
}