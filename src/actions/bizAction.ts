'use server'
import { redirect } from 'next/navigation';
import { BizSchema } from '@/schemas/BizSchema';
import { revalidatePath } from 'next/cache';
import { insertAddress, insertBiz, updateAddress, updateBiz } from '@/routes/api';
import { AddressSchema } from '@/schemas/AddressSchema';
import { BizAddressSchema } from '@/schemas/BizAddressSchema';
import { getImageUrl, uploadImage } from '@/app/lib/utils';

export type State = {
    errors?: {
        logo?: string[];
        cover_photo?: string[];
        name_en?: string[];
        name_mm?: string[];
        categories_id?: string[];
        contact?: string[];
        address_1?: string[];
        // address_2?: string[];
        // city?: string[];
        // township?: string[];
        // region?: string[];
        // is_active? : boolean[];
        // description? : string[];
    };
    message?: string | null | unknown;
};

export type AddressState = {
    errors?: {
        biz_id?: string[];
        contact?: string[];
        address_1?: string[];
        address_2?: string[] | null;
        city?: string[] | null;
        township?: string[] | null;
        region?: string[] | null;
    };
    message?: string | null | unknown;
};
  
export async function createBizAction(prevState: State, formData: FormData) 
{

    const validatedFields = BizAddressSchema.safeParse({
        name_en: formData.get('name_en'),
        name_mm: formData.get('name_mm'),
        categories_id: formData.get('categories_id'),
        is_active: formData.get('is_active'),
        description: formData.get('description'),
        contact: formData.get('contact'),
        address_1: formData.get('address_1'),
        address_2: formData.get('address_2'),
        city: formData.get('city'),
        township: formData.get('township'),
        region: formData.get('region'),
        logo: formData.get('logo'),
        cover_photo: formData.get('cover_photo'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }
    
    try {
        var logo_link: string | null = null;
        var cover_link: string | null = null;
        
        if (typeof validatedFields.data.logo === 'string') {
            logo_link = validatedFields.data.logo;
        } else {

            const {data : imgResp , error : imgErr } = await uploadImage('biz-logos', validatedFields.data.logo);        

            if(imgErr || !imgResp) {
                return {
                    message : "Biz Image Upload Error.",
                }
            }
    
            logo_link = getImageUrl(imgResp.path);
            console.log(logo_link);
        }

        if (typeof validatedFields.data.cover_photo === 'string') {
                cover_link = validatedFields.data.cover_photo;
        } else {

        const {data : coverImgResp , error : coverImgErr } = await uploadImage('biz-cover-images', validatedFields.data.cover_photo);        

            if(coverImgErr || !coverImgResp) {
                return {
                    message : "Biz Cover Image Upload Error.",
                }
            }
            cover_link = getImageUrl(coverImgResp.path);
        }

        const bizData = {
            logo: logo_link,
            cover_photo: cover_link,
            name_en: validatedFields.data.name_en,
            name_mm: validatedFields.data.name_mm,
            description: validatedFields.data.description,
            categories_id: validatedFields.data.categories_id,
        };
        
        const {data , error } = await insertBiz(bizData);        
        
        if(error) {
            return {
                message : error.message,
            }
        }

        const biz_id = data?.id;

        const addressData = {
            biz_id: biz_id,
            contact: validatedFields.data.contact,
            address_1: validatedFields.data.address_1,
            address_2: validatedFields.data.address_2,
            city: validatedFields.data.city,
            township: validatedFields.data.township,
            region: validatedFields.data.region,
        };

        const {data : addressResp , error : addressErr } = await insertAddress(addressData);        

        if(addressErr) {
            return {
                message : addressErr.message,
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
        logo: formData.get('logo'),
    });

    if (!validatedFields.success) {
        
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    let image_link: string | File = "/no-image.png";

    try {

        if (typeof validatedFields.data.logo === 'string') {
            image_link = validatedFields.data.logo == 'null' ? "/no-image.png" : validatedFields.data.logo;
        } else if (validatedFields.data.logo instanceof File) {
            if (validatedFields.data.logo.size > 0) {
                const {data : imgResp , error : imgErr } = await uploadImage('biz-images', validatedFields.data.logo);        

                if (imgErr || !imgResp) {
                    return {
                        message: "Image Upload Error.",
                    };
                }
                image_link = getImageUrl(imgResp.path);
            } else {
                image_link = validatedFields.data.logo;
            }
        }

        const bizData = {
            logo: image_link,
            name_en: validatedFields.data.name_en,
            name_mm: validatedFields.data.name_mm,
            description: validatedFields.data.description,
            categories_id: validatedFields.data.categories_id,
        };

        const {data, error} = await updateBiz(id, bizData);

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

export async function updateBizAddressAction(
    id : string, prevState: AddressState, formData: FormData
) {
    const validatedFields = AddressSchema.safeParse({
        biz_id: formData.get('biz_id'),
        contact: formData.get('contact'),
        address_1: formData.get('address_1'),
        address_2: formData.get('address_2'),
        city: formData.get('city'),
        township: formData.get('township'),
        region: formData.get('region'),
    });

    
    if (!validatedFields.success) {
        
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }
    
    try {
        const {data, error} = await updateAddress(id, validatedFields.data);
        
        console.log(data);
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
    let bizID = validatedFields.data.biz_id;
    
    revalidatePath(`/dashboard/bizs/${bizID}/detail`);
    redirect(`/dashboard/bizs/${bizID}/detail`);
    
}


export async function createBizAddressAction(prevState: AddressState, formData: FormData) {
    const validatedFields = AddressSchema.safeParse({
        biz_id: formData.get('biz_id'),
        contact: formData.get('contact'),
        address_1: formData.get('address_1'),
        address_2: formData.get('address_2'),
        city: formData.get('city'),
        township: formData.get('township'),
        region: formData.get('region'),
    });

    if (!validatedFields.success) {
        
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }
    
    try {
        const {data, error} = await insertAddress(validatedFields.data);
        
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
    let bizID = validatedFields.data.biz_id;
    
    revalidatePath(`/dashboard/bizs/${bizID}/detail`);
    redirect(`/dashboard/bizs/${bizID}/detail`);
    
}