import { supabase } from './supabase';
import type { Case, CreateCaseInput, UpdateCaseInput, CaseImage } from './types';

// Case Management
export async function createCase(data: CreateCaseInput): Promise<Case> {
  if (!supabase) throw new Error('Supabase is not configured');
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  const { data: newCase, error } = await supabase
    .from('cases')
    .insert([{
      ...data,
      user_id: user.id,
      status: 'open'
    }])
    .select()
    .single();

  if (error) throw error;
  return newCase;
}

export async function getCases(): Promise<Case[]> {
  if (!supabase) throw new Error('Supabase is not configured');

  const { data, error } = await supabase
    .from('cases')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getCase(id: string): Promise<Case> {
  if (!supabase) throw new Error('Supabase is not configured');

  const { data, error } = await supabase
    .from('cases')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function updateCase(id: string, data: UpdateCaseInput): Promise<Case> {
  if (!supabase) throw new Error('Supabase is not configured');

  const { data: updatedCase, error } = await supabase
    .from('cases')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return updatedCase;
}

// Image Management
export async function uploadImage(file: File) {
  if (!supabase) throw new Error('Supabase is not configured');

  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `case-images/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('case-images')
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data: { publicUrl } } = supabase.storage
    .from('case-images')
    .getPublicUrl(filePath);

  return { url: publicUrl };
}

export async function addCaseImage(caseId: string, url: string) {
  if (!supabase) throw new Error('Supabase is not configured');

  const { error } = await supabase
    .from('case_images')
    .insert([{ case_id: caseId, url }]);

  if (error) throw error;
}

export async function getCaseImages(caseId: string): Promise<CaseImage[]> {
  if (!supabase) throw new Error('Supabase is not configured');

  const { data, error } = await supabase
    .from('case_images')
    .select('*')
    .eq('case_id', caseId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function deleteCaseImage(imageId: string) {
  if (!supabase) throw new Error('Supabase is not configured');

  const { error } = await supabase
    .from('case_images')
    .delete()
    .eq('id', imageId);

  if (error) throw error;
}