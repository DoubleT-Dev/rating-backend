'use server'
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { insertTag, updateTag } from '@/routes/api';
import { TagSchema } from '@/schemas/TagSchema';
import toast from 'react-hot-toast';

export type State = {
  errors?: {
    name_en?: string[];
    name_mm?: string[];
  };
  message?: string | null | unknown;
};

export async function createTagAction(prevState: State, formData: FormData) {
    const validatedFields = TagSchema.safeParse({
        name_en: formData.get('name_en'),
        name_mm: formData.get('name_mm'),
    });

    if (!validatedFields.success) {

        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        const {data , error } = await insertTag(validatedFields.data);

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

    revalidatePath('/dashboard/tags');
    redirect('/dashboard/tags');
    
}

export async function updateTagAction(
    id : string, prevState: State, formData: FormData) {
    const validatedFields = TagSchema.safeParse({
        name_en: formData.get('name_en'),
        name_mm: formData.get('name_mm'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        const {data , error } = await updateTag(id, validatedFields.data);
        
        if(error) {
            return {
                message : error.message,
            }
        }
    } catch (error) {
        return {
            message: error ?? null,
        };
    }

    revalidatePath('/dashboard/tags');
    redirect('/dashboard/tags');
    
}