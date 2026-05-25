import { supabase } from './supabaseClient';

export const adminLogout = async () => {
  await supabase.auth.signOut();
};

export const getBlogs = async () => {
  const { data, error } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
  return { data, error };
};

export const addBlog = async (blog) => {
  const { data, error } = await supabase.from('blogs').insert([blog]);
  return { data, error };
};

export const deleteBlog = async (id) => {
  const { error } = await supabase.from('blogs').delete().eq('id', id);
  return { error };
};

export const getGallery = async () => {
  const { data, error } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
  return { data, error };
};

export const addPhoto = async (photo) => {
  const { data, error } = await supabase.from('gallery').insert([photo]);
  return { data, error };
};

export const deletePhoto = async (id) => {
  const { error } = await supabase.from('gallery').delete().eq('id', id);
  return { error };
};

export const getDestinations = async () => {
  const { data, error } = await supabase.from('destinations').select('*').order('created_at', { ascending: false });
  return { data, error };
};

export const addDestination = async (dest) => {
  const { data, error } = await supabase.from('destinations').insert([dest]);
  return { data, error };
};

export const deleteDestination = async (id) => {
  const { error } = await supabase.from('destinations').delete().eq('id', id);
  return { error };
};