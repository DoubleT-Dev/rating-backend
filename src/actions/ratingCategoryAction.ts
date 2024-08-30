'use server'
import { redirect } from 'next/navigation';
import { CategorySchema } from '@/schemas/CategorySchema';
import { revalidatePath } from 'next/cache';
import { insertRatingCategory, updateRatingCategory } from '@/routes/api';
import { RatingCategorySchema } from '@/schemas/RatingCategorySchema';

export type State = {
  errors?: {
    name_en?: string[];
    name_mm?: string[];
  };
  message?: string | null | unknown;
};

export async function createRatingCategoryAction(prevState: State, formData: FormData) {
    const validatedFields = RatingCategorySchema.safeParse({
        name_en: formData.get('name_en'),
        name_mm: formData.get('name_mm'),
        is_active: formData.get('is_active'),
    });

    if (!validatedFields.success) {

        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    // const { name_en, name_mm } = validatedFields.data;

    try {
        const {data , error } = await insertRatingCategory(validatedFields.data);

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

    revalidatePath('/dashboard/rating-categories');
    redirect('/dashboard/rating-categories');
    
}

export async function updateRatingCategoryAction(
    id : string, prevState: State, formData: FormData
) {
    const validatedFields = RatingCategorySchema.safeParse({
        name_en: formData.get('name_en'),
        name_mm: formData.get('name_mm'),
        is_active : formData.get('is_active')
    });

    if (!validatedFields.success) {
        
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        const {data , error} = await updateRatingCategory(id, validatedFields.data);

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

    revalidatePath('/dashboard/rating-categories');
    redirect('/dashboard/rating-categories');
    
}