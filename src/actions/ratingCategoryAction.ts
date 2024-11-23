'use server'
import { redirect } from 'next/navigation';
import { CategorySchema } from '@/schemas/CategorySchema';
import { revalidatePath } from 'next/cache';
import { insertRatingCategory, updateRatingCategory } from '@/routes/api';
import { RatingCategorySchema } from '@/schemas/RatingCategorySchema';
import { createClient } from '@/utils/supabase/server';
import { getImageUrl, uploadImage } from '@/app/lib/utils';

// const getImageUrl = (filename: string) => {
//     const supabase = createClient()
//     const { data } = supabase.storage.from('rating-bucket').getPublicUrl(filename)

//     return data.publicUrl;
// };

export type State = {
  errors?: {
    name_en?: string[];
    name_mm?: string[];
    icon_link?: string[];
  };
  message?: string | null | unknown;
};

export async function createRatingCategoryAction(prevState: State, formData: FormData) {
    console.log(formData);
    const validatedFields = RatingCategorySchema.safeParse({
        name_en: formData.get('name_en'),
        name_mm: formData.get('name_mm'),
        icon_link: formData.get('icon_link'),
        is_active: formData.get('is_active'),
    });

    if (!validatedFields.success) {

        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    try {
        var image_link: string | null = null;
            
        if (typeof validatedFields.data.icon_link === 'string') {
            image_link = validatedFields.data.icon_link;
        } else {

            const {data : imgResp , error : imgErr } = await uploadImage('rating-categories', validatedFields.data.icon_link);        
    
            if(imgErr || !imgResp) {
                return {
                    message : "Image Upload Error.",
                }
            }
    
            image_link = getImageUrl(imgResp.path);
        }

        const ratingCategoryData = {
            icon_link: image_link,
            name_en: validatedFields.data.name_en,
            name_mm: validatedFields.data.name_mm,
        };

        const {data , error } = await insertRatingCategory(ratingCategoryData);

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
        icon_link: formData.get('icon_link'),
        is_active : formData.get('is_active')
    });

    if (!validatedFields.success) {
        
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    var image_link: string | File = "/no-image.png";

    try {
        console.log(validatedFields.data.icon_link instanceof File);
        if (typeof validatedFields.data.icon_link === 'string') {

            image_link = validatedFields.data.icon_link == 'null' ? "/no-image.png" : validatedFields.data.icon_link;
        } else if (validatedFields.data.icon_link instanceof File) {

            if (validatedFields.data.icon_link.size > 0) { // Ensure size check is greater than 0
                const { data: imgResp, error: imgErr } = await uploadImage('rating-categories', validatedFields.data.icon_link);
                if (imgErr || !imgResp) {
                    return {
                        message: "Image Upload Error.",
                    };
                }
                image_link = getImageUrl(imgResp.path); // Assign the URL to image_link
            } else {
                image_link = validatedFields.data.icon_link;
            }
        }

        const ratingCategoryData = {
            icon_link: image_link,
            name_en: validatedFields.data.name_en,
            name_mm: validatedFields.data.name_mm,
        };

        const {data , error} = await updateRatingCategory(id, ratingCategoryData);

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