'use server'
import { calculatePagination } from '@/app/lib/utils';
import  { createClient }  from '@/utils/supabase/server';
import { unstable_noStore as noStore, revalidatePath } from 'next/cache';

const PAGE_SIZE = parseInt(process.env.PAGE_SIZE!);

/** Biz Route **/
// =====================================

export const fetchAllBizs = async () => {
    noStore();
    const supabase = createClient()
    const { data, error } = await supabase
      .from('bizs')
      .select('id, name_en, name_mm, categories_id, categories (name_en)').range(0, 9);
  
    if (error) {
      throw new Error(error.message);
    }
  
    return data;
};

export const fetchBizCount = async (
  page : number, query : string
  ) => {
    noStore();
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const { from, to } = calculatePagination(page);
    const supabase = createClient()
    const { count } = await supabase.from('bizs')
            .select('*', { count: 'exact', head : true }).ilike('name_en', `%${query}%`);

    const totalPages = Math.ceil((count || 0) / PAGE_SIZE);

    return totalPages ;
};

export const fetchBizPagination = async (
  page : number, query : string
  ) => {
    noStore();
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const { from, to } = calculatePagination(page);
    const supabase = createClient()
    const { data, error, count } = await supabase.from('bizs')
            .select('id, name_en, name_mm, categories_id, is_active, categories (name_en)', { count: 'exact' }).ilike('name_en', `%${query}%`) // Ensure to get the exact count
            .range(from, to);

    if (error) { throw new Error(error.message); }

    return data;
};

// Create a new business
export const insertBiz = async (bizData: {
  name_en: string;
  name_mm: string;
  categories_id: string;
}) => {
  const supabase = createClient()
  const { data, error } = await supabase.from('bizs').insert([bizData]).select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Read a single business by ID
export const fetchBizById = async (id: string) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('bizs')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Update a business by ID
export const updateBiz = async (id: string, bizData: {
  name_en?: string;
  name_mm?: string;
  categories_id?: string;
}) => {
  const supabase = createClient()
  const { data, error } = await supabase.from('bizs').update(bizData).eq('id', id).select();
  
  if (error) {
    throw new Error(error.message);
  }
  revalidatePath('/biz','layout');
};

// Delete a business by ID
export const deleteBiz = async (id: string) => {
  const supabase = createClient()

  try {
    const { data, error } = await supabase.from('bizs').delete().eq('id', id).select();

    if (error) {
      throw new Error('Failed to delete Biz');
    }
    
    revalidatePath('/biz','layout');
  } catch (error) {
    console.error('Error deleting Biz:');
  }

};

// Generalized delete function
export const deleteEntity = async (entityType: string, id: string) => {
  const supabase = createClient()
  try {
    const { data, error } = await supabase
      .from(entityType)
      .delete()
      .eq('id', id)
      .select();

    if (error) {
      throw new Error(`Failed to delete ${entityType}`);
    }
    
    return data;
  } catch (error) {
    console.error(`Error deleting ${entityType}:`, error);
    throw error;
  }
};


// =====================================

  /** Category Route **/

// =====================================

export const fetchAllCategory = async () => {
  const supabase = createClient()
    const { data, error } = await supabase.from('categories').select('*'); 
    return data;
};

export const fetchCategoryPagination = async (
  page : number, query : string
  ) => {
    noStore();
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const { from, to } = calculatePagination(page);
    
    const supabase = createClient()
    const { data, error, count } = await supabase.from('categories')
            .select('*', { count: 'exact' }).ilike('name_en', `%${query}%`) // Ensure to get the exact count
            .range(from, to);;

    const totalPages = Math.ceil((count || 1) / PAGE_SIZE);

    if (error) { throw new Error(error.message); }

    return { data, totalPages };
};

export const insertCategory = async (categoryData: {
  name_en: string;
  name_mm: string;
}) => {
  const supabase = createClient()
  const { data, error } = await supabase.from('categories').insert([categoryData]).select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const updateCategory = async (id : string , categoryData: {
  name_en: string;
  name_mm: string;
}) => {
  const supabase = createClient();

  const { data } = await supabase.from('categories').update([categoryData]).eq('id', id).select();

  return data;
};

export const fetchCategoryById = async (id: string) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const deleteCategory = async (id: string) => {
  const supabase = createClient()
  console.log(id);
  try {
    const { data, error } = await supabase.from('categories').delete().eq('id', id).select();
    if (error) {
      throw new Error('Failed to delete Biz');
    }

    revalidatePath('/dashboard/categoreis');
    return { message: 'Deleted Categories.' };

  } catch (error) {
    console.error('Error deleting Biz:');
  }

};


// =====================================

  /** Rating Category Route **/

// =====================================

export const fetchRatingCategoryPagination = async (page : number, query : string) => {
  noStore();
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const { from, to } = calculatePagination(page);
    
    const supabase = createClient()
    const { data, error, count } = await supabase.from('rating_categories')
            .select('*', { count: 'exact' }).ilike('name_en', `%${query}%`) // Ensure to get the exact count
            .range(from, to);

    const totalPages = Math.ceil((count || 1) / PAGE_SIZE);

    if (error) { throw new Error(error.message); }

    return { data, totalPages };
};


export const insertRatingCategory = async (categoryData: {
  name_en: string;
  name_mm: string;
}) => {
  const supabase = createClient()
  const { data, error } = await supabase.from('rating_categories').insert([categoryData]).select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const updateRatingCategory = async (id : string , ratingCategoryData: {
  name_en: string;
  name_mm: string;
}) => {
  const supabase = createClient();

  const { data } = await supabase.from('rating_categories').update([ratingCategoryData]).eq('id', id).select();

  return data;
};

export const fetchRatingCategoryById = async (id: string) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('rating_categories')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const deleteRatingCategory = async (id: string) => {
  const supabase = createClient()
  try {
    const { data, error } = await supabase.from('rating_categories').delete().eq('id', id).select();

    if (error) {
      throw new Error('Failed to delete Biz');
    }

    revalidatePath('/dashboard/rating-categoreis');
    return { message: 'Deleted Rating Categories.' };

  } catch (error) {
    // console.error('Error deleting Biz:');
  }

};