import React, { useEffect, useState } from 'react';
import { supabase } from '../admin/supabaseClient';

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });
      setBlogs(data || []);
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '4rem' }}>Loading blogs...</div>
  );

  if (blogs.length === 0) return (
    <div style={{ textAlign: 'center', padding: '4rem' }}>
      <h2>Blogs Coming Soon 🚀</h2>
    </div>
  );

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>Our Blogs</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {blogs.map(blog => (
          <div key={blog.id} style={{
            border: '1px solid #eee', borderRadius: '12px',
            overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}>
            {blog.image_url && (
              <img src={blog.image_url} alt={blog.title}
                style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
            )}
            <div style={{ padding: '1.5rem' }}>
              <h2 style={{ marginTop: 0 }}>{blog.title}</h2>
              <p style={{ color: '#555', lineHeight: '1.7' }}>{blog.content}</p>
              <small style={{ color: '#999' }}>
                {new Date(blog.created_at).toLocaleDateString('en-IN', {
                  day: 'numeric', month: 'long', year: 'numeric'
                })}
              </small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}