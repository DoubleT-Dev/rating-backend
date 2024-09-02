'use server'
import { redirect } from 'next/navigation';
import { CategorySchema } from '@/schemas/CategorySchema';
import { revalidatePath, revalidateTag } from 'next/cache';
import { deleteCategory, deleteEntity, insertCategory, updateCategory } from '@/routes/api';

export type State = {
  errors?: {
    name_en?: string[];
    name_mm?: string[];
  };
  message?: string | null | unknown;
};

export async function createCategoryAction(prevState: State, formData: FormData) {
    const validatedFields = CategorySchema.safeParse({
        name_en: formData.get('name_en'),
        name_mm: formData.get('name_mm'),
        is_active: formData.get('is_active'),
    });

    if (!validatedFields.success) {

        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        const { data, error } = await insertCategory(validatedFields.data);

        if(error) {
            return {
                message : error.message,
            }
        }
    } catch (error) {
        return {
            message: "Database Error.",
        };
    }
    // revalidateTag('/dashboard/categories')
    revalidatePath('/dashboard/categories');
    redirect('/dashboard/categories');
    
}

export async function updateCategoryAction(
    id : string, prevState: State, formData: FormData) {
    const validatedFields = CategorySchema.safeParse({
        name_en: formData.get('name_en'),
        name_mm: formData.get('name_mm'),
        is_active : formData.get('is_active')
    });

    if (!validatedFields.success) {
        
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    // const { name_en, name_mm } = validatedFields.data;

    try {
        const { data , error } = await updateCategory(id, validatedFields.data);


        if(error) {
            return {
                message : error.message,
            }
        }
    } catch (error) {
        return {
            message: "Database Error.",
        };
    }

    revalidatePath('/dashboard/categories');
    redirect('/dashboard/categories');
    
}