'use server'
import { calculatePagination } from '@/app/lib/utils';
import  { createClient }  from '@/utils/supabase/server';
import { unstable_noStore as noStore, revalidatePath } from 'next/cache';

const PAGE_SIZE = parseInt(process.env.PAGE_SIZE!);

// export const getImageUrl = (filename : string) => {
//   const supabase = createClient()
//   const { data } = supabase.storage.from('rating-bucket').getPublicUrl(filename)

//   return data.publicUrl;
// };



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
            .select('id, name_en, name_mm, logo, categories_id, is_active, categories (name_en)', { count: 'exact' }).ilike('name_en', `%${query}%`) // Ensure to get the exact count
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
  const { data, error } = await supabase.from('bizs').insert([bizData]).select('id').single();

  return { data, error };
};

// Read a single business by ID
export const fetchBizById = async (id: string) => {
    const supabase = createClient()
    const { data, error } = await supabase
        .from('bizs')
        .select('*, categories(*), addresses(*)')
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
  logo?: string | File;
}) => {
  const supabase = createClient()
  const { data, error } = await supabase.from('bizs').update(bizData).eq('id', id).select('id').single();
  
  return { data, error };
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

  /** Biz Image Route **/

// =====================================

export const fetchBizImages = async (id : any) => {
    noStore();

    const supabase = createClient()
    console.log(id);
    const { data, error } = await supabase.from('bizs').select('*, biz_images(*)').eq('id', id).single()

    if (error) { return error.message }

    return data;
};

export const insertBizImage = async (bizImageData: {
  biz_id: string;
  image_id: string;
  image_path: string;
  full_path: string;
}) => {
  const supabase = createClient()
  const { data, error } = await supabase.from('biz_images').insert([bizImageData]).select();

  return { data, error };
};

export const fetchBizImageId = async (id :string ) => {
  const supabase = createClient()
    const { data, error } = await supabase
        .from('biz_images')
        .select('*')
        .eq('id', id)
        .single();
console.log(data);
    if (error) {
        // console.log(error)
    }

    return data;
};

export const updateBizImage = async (id: string, bizImageData: {
  biz_id: string;
  image_id: string;
  image_path: string;
  full_path: string;
}) => {
  const supabase = createClient()
  const { data, error } = await supabase.from('biz_images').update(bizImageData).eq('id', id).single();
  
  return { data, error };
};

export const deleteBizImage = async (id: string) => {
  const supabase = createClient()

  try {
    const { data, error } = await supabase.from('biz_images').delete().eq('id', id).select();

    if (error) {
      throw new Error('Failed to delete Biz');
    }
    
    revalidatePath('/biz','layout');
  } catch (error) {
    console.error('Error deleting Biz:');
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
  return {data,error};
};

export const updateCategory = async (id : string , categoryData: {
  name_en: string;
  name_mm: string;
}) => {
  const supabase = createClient();

  const { data, error } = await supabase.from('categories').update([categoryData]).eq('id', id).select();

  return {data, error};
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

  return {data, error};
};

export const updateRatingCategory = async (id : string , ratingCategoryData: {
  name_en: string;
  name_mm: string;
}) => {
  const supabase = createClient();

  const { data, error } = await supabase.from('rating_categories').update([ratingCategoryData]).eq('id', id).select();

  return {data , error};
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


// =====================================

  /** Tag Route **/

// =====================================

export const fetchAllTag = async () => {
  const supabase = createClient()
    const { data, error } = await supabase.from('tags').select('*'); 
    return data;
};

export const fetchTagCount = async (
  page : number, query : string
  ) => {
    noStore();
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const { from, to } = calculatePagination(page);
    const supabase = createClient()
    const { count } = await supabase.from('tags')
            .select('*', { count: 'exact', head : true }).ilike('name_en', `%${query}%`);

    const totalPages = Math.ceil((count || 0) / PAGE_SIZE);

    return totalPages ;
};

export const fetchTagPagination = async (
  page : number, query : string
  ) => {
    noStore();
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const { from, to } = calculatePagination(page);
    
    const supabase = createClient()
    const { data, error, count } = await supabase.from('tags')
            .select('*', { count: 'exact' }).ilike('name_en', `%${query}%`) // Ensure to get the exact count
            .range(from, to);;

    if (error) { throw new Error(error.message); }

    return data ;
};

export const insertTag = async (tagData: {
  name_en: string;
  name_mm: string;
}) => {
  const supabase = createClient()
  const { data, error } = await supabase.from('tags').insert([tagData]).select();
  return {data , error };
};

export const updateTag = async (id : string , tagData: {
  name_en: string;
  name_mm: string;
}) => {

  const supabase = createClient();
  
  try {
    const { data, error } = await supabase.from('tags').update([tagData]).eq('id', id).select();
    return { data, error };
  } catch (error) {
    console.log(error);
    return { message : error };
  }
  
};

export const fetchTagById = async (id: string) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const deleteTag = async (id: string) => {
  const supabase = createClient()

  try {
    const { data, error } = await supabase.from('tags').delete().eq('id', id).select();

    if (error) {
      throw new Error('Failed to delete Tag');
    }

    revalidatePath('/dashboard/tags');
    return { message: 'Deleted Tags.' };

  } catch (error) {
    console.error('Error deleting Tag:');
  }

};


// =====================================

  /** Editor Route **/

// =====================================

export const fetchEditorCount = async (
  page : number, query : string
  ) => {
    noStore();
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const { from, to } = calculatePagination(page);
    const supabase = createClient()
    const { count } = await supabase.from('editor_picks')
            .select('*', { count: 'exact', head : true }).ilike('title', `%${query}%`);

    const totalPages = Math.ceil((count || 0) / PAGE_SIZE);

    return totalPages ;
};

export const fetchEditorPagination = async (
  page : number, query : string
  ) => {
    noStore();
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const { from, to } = calculatePagination(page);
    
    const supabase = createClient()
    const { data, error } = await supabase.from('editor_picks')
            .select('*, bizs(name_en)', { count: 'exact' }).ilike('title', `%${query}%`) // Ensure to get the exact count
            .range(from, to);

    if (error) { console.log(error.message); throw new Error(error.message);  }

    return data ?? [];
};

export const fetchEditorById = async (id: string) => {
    const supabase = createClient()
    const { data, error } = await supabase
        .from('editor_picks')
        .select('*, bizs(*)')
        .eq('id', id)
        .single();

    if (error) {
      console.log(error);

    }

    return data;
};

export const insertEditor = async (editorData: {
    biz_id: string | null;
    slide_image: string | null;
    title: string;
    description: string;

}) => {
  const supabase = createClient()
  const { data, error } = await supabase.from('editor_picks').insert([editorData]).select();
  return {data , error };
};


export const updateEditor = async (id : string , editorData : {
  biz_id: string | null;
  slide_image: string | File;
  title: string;
  description: string;
}) => {
const supabase = createClient()
const { data, error } = await supabase.from('editor_picks').update([editorData]).eq('id', id).select();
return {data , error };
};

export const deleteEditor = async (id: string) => {
  const supabase = createClient()

  try {
    const { data, error } = await supabase.from('addresses').delete().eq('id', id).select();

    if (error) {
      throw new Error('Failed to delete Address');
    }

    revalidatePath(`/dashboard/bizs/${data[0].biz_id}/detail`);
    return { message: 'Deleted Address.' };

  } catch (error) {
    console.error('Error deleting Address:');
  }

};


// =====================================

  /** Address Route **/

// =====================================

export const fetchAddressById = async (id: string) => {
    const supabase = createClient()
    const { data, error } = await supabase
        .from('addresses')
        .select('*, bizs(*)')
        .eq('id', id)
        .single();

    if (error) {
      console.log(error);

    }

    return data;
};

export const insertAddress = async (addressData: {
    biz_id: string | null;
    contact: string;
    address_1: string;
    address_2: string | null;
    city: string | null;
    township: string | null;
    region: string | null;
}) => {
  const supabase = createClient()
  const { data, error } = await supabase.from('addresses').insert([addressData]).select();
  return {data , error };
};


export const updateAddress = async (id : string , addressData : {
  biz_id: string | null;
  contact: string;
  address_1 : string;
  address_2 : string | null;
  city : string | null;
  township : string| null;
  region : string| null;
}) => {
const supabase = createClient()
const { data, error } = await supabase.from('addresses').update([addressData]).eq('id', id).select();
return {data , error };
};

export const deleteAddress = async (id: string) => {
  const supabase = createClient()

  try {
    const { data, error } = await supabase.from('addresses').delete().eq('id', id).select();

    if (error) {
      throw new Error('Failed to delete Address');
    }

    revalidatePath(`/dashboard/bizs/${data[0].biz_id}/detail`);
    return { message: 'Deleted Address.' };

  } catch (error) {
    console.error('Error deleting Address:');
  }

};

