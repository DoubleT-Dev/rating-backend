'use server'
import { redirect } from 'next/navigation';
import { BizSchema } from '@/schemas/BizSchema';
import { revalidatePath } from 'next/cache';
import { insertBiz, updateBiz } from '@/routes/api';

export type State = {
    errors?: {
        name_en?: string[];
        name_mm?: string[];
        categories?: string[];
        // is_active? : boolean[];
        // description? : string[];
    };
    message?: string | null | unknown;
};
  
export async function createBizAction(prevState: State, formData: FormData) {

        const validatedFields = BizSchema.safeParse({
            name_en: formData.get('name_en'),
            name_mm: formData.get('name_mm'),
            categories_id: formData.get('categories_id'),
            is_active: formData.get('is_active'),
            description: formData.get('description'),
        });

        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
            };
        }

        // const { name_en, name_mm, categories_id } = validatedFields.data;

        try {
            const {data , error } = await insertBiz(validatedFields.data);
    
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

        revalidatePath('/dashboard/bizs');
        redirect('/dashboard/bizs');
}


export async function updateBizAction(
    id : string, prevState: State, formData: FormData
) {
    const validatedFields = BizSchema.safeParse({
        name_en: formData.get('name_en'),
        name_mm: formData.get('name_mm'),
        categories_id: formData.get('categories_id'),
        is_active: formData.get('is_active'),
        description: formData.get('description'),
    });

    if (!validatedFields.success) {
        
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        const {data, error} = await updateBiz(id, validatedFields.data);

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
    
    revalidatePath('/dashboard/bizs');
    redirect('/dashboard/bizs');
    
}