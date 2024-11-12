'use server'
import { redirect } from 'next/navigation';
import { BizSchema } from '@/schemas/BizSchema';
import { revalidatePath } from 'next/cache';
import { insertEditor, updateAddress, updateBiz, updateEditor } from '@/routes/api';
import { AddressSchema } from '@/schemas/AddressSchema';
import { uploadImage } from '@/app/lib/utils';
import { EditorSchema } from '@/schemas/EditorSchema';
import { exit } from 'process';
import { createClient } from '@/utils/supabase/server';


const getImageUrl = (filename: string) => {
    const supabase = createClient()
    const { data } = supabase.storage.from('rating-bucket').getPublicUrl(filename)

    return data.publicUrl;
};

export type State = {
    errors?: {
        slide_image?: string[];
        title?: string[];
        biz_id?: string[];
        is_active? : string[];
        // description? : string[];
    };
    message?: string | null | unknown;
};
  
export async function createEditorAction(prevState: State, formData: FormData) {

        const validatedFields = EditorSchema.safeParse({
            biz_id: formData.get('biz_id'),
            slide_image: formData.get('slide_image'),
            title: formData.get('title'),
            description: formData.get('description'),
            is_active: formData.get('is_active'),
        });

        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
            };
        }

        try {
                let image_link: string | null = null;
            
            if (typeof validatedFields.data.slide_image === 'string') {
                const image_link = validatedFields.data.slide_image;
            } else {

                const {data : imgResp , error : imgErr } = await uploadImage('slide-images', validatedFields.data.slide_image);        
        
                if(imgErr || !imgResp) {
                    return {
                        message : "Image Upload Error.",
                    }
                }
        
                const image_link = getImageUrl(imgResp.path);
            }

            const bizData = {
                slide_image: image_link,
                title: validatedFields.data.title,
                description: validatedFields.data.description,
                biz_id: validatedFields.data.biz_id,
                is_active: validatedFields.data.is_active,
            };

            
            const {data , error } = await insertEditor(bizData);        
            
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

        revalidatePath('/dashboard/editors');
        redirect('/dashboard/editors');
}


export async function updateEditorAction(
    id : string, prevState: State, formData: FormData
) {
    const validatedFields = EditorSchema.safeParse({
        biz_id: formData.get('biz_id'),
        slide_image: formData.get('slide_image'),
        title: formData.get('title'),
        description: formData.get('description'),
        is_active: formData.get('is_active'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }
    
    let image_link: string | File = "/no-image.png";
    
    try {

        if (typeof validatedFields.data.slide_image === 'string') {
            image_link = validatedFields.data.slide_image == 'null' ? "/no-image.png" : validatedFields.data.slide_image;
        } else if (validatedFields.data.slide_image instanceof File) {
            if (validatedFields.data.slide_image.size > 0) { // Ensure size check is greater than 0
                const { data: imgResp, error: imgErr } = await uploadImage('slide-images', validatedFields.data.slide_image);

                if (imgErr || !imgResp) {
                    return {
                        message: "Image Upload Error.",
                    };
                }
                image_link = getImageUrl(imgResp.path); // Assign the URL to image_link
            } else {
                image_link = validatedFields.data.slide_image;
            }
        }
        
        const bizData = {
            slide_image: image_link,
            title: validatedFields.data.title,
            description: validatedFields.data.description,
            biz_id: validatedFields.data.biz_id,
            is_active: validatedFields.data.is_active,
        };

        console.log(bizData);

        const {data , error } = await updateEditor(id, bizData);        
        
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

    revalidatePath('/dashboard/editors');
    redirect('/dashboard/editors');
}