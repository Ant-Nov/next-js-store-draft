import { createClient } from '@supabase/supabase-js';

const bucket = 'main-bucket';
const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

export const uploadImage = async (image: File) => {
  const name = `${Date.now()}-${image.name}`;

  const { data } = await supabase.storage
    .from(bucket)
    .upload(name, image, { cacheControl: '3600' })

  if (!data) throw new Error('Image upload failed');

  return supabase.storage.from(bucket).getPublicUrl(name).data.publicUrl;
}

export const deleteImage = async (fullPath: string) => {
  const name = fullPath.split('/').pop();

  if (!name) throw new Error('Invalid image URL');

  await supabase.storage
    .from(bucket)
    .remove([name])
}
