'use server'
import { redirect } from 'next/navigation';
import { CategorySchema } from '@/schemas/CategorySchema';
import { revalidatePath } from 'next/cache';
import { insertCategory, insertSetting, updateCategory, updateSetting } from '@/routes/api';
import { SettingSchema } from '@/schemas/SettingSchema';

export type State = {
  errors?: {
    key?: string[];
    value?: string[];
  };
  message?: string | null | unknown;
};

export async function createSettingAction(prevState: State, formData: FormData) {
    const validatedFields = SettingSchema.safeParse({
        key: formData.get('key'),
        value: formData.get('value'),
    });

    if (!validatedFields.success) {

        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        const { data, error } = await insertSetting(validatedFields.data);

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
    revalidatePath('/dashboard/settings');
    redirect('/dashboard/settings');
    
}

export async function updateSettingAction(
    id : string, prevState: State, formData: FormData) {
    const validatedFields = SettingSchema.safeParse({
        key: formData.get('key'),
        value: formData.get('value'),
    });

    if (!validatedFields.success) {
        
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        console.log(validatedFields.data);
        const { data , error } = await updateSetting(id, validatedFields.data);


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

    revalidatePath('/dashboard/settings');
    redirect('/dashboard/settings');
    
}