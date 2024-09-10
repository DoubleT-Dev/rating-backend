'use server'
import { redirect } from 'next/navigation';
import { BizSchema } from '@/schemas/BizSchema';
import { revalidatePath } from 'next/cache';
import { insertAddress, insertBiz, updateAddress, updateBiz, uploadImage } from '@/routes/api';
import { AddressSchema } from '@/schemas/AddressSchema';
import { BizAddressSchema } from '@/schemas/BizAddressSchema';

export type State = {
    errors?: {
        logo?: string[];
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
  
export async function createBizAction(prevState: State, formData: FormData) {

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
        });

        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
            };
        }

        try {
            const {data : imgResp , error : imgErr } = await uploadImage('biz-images', validatedFields.data.logo);        

            if(imgErr) {
                return {
                    message : "Image Upload Error.",
                }
            }

            const bizData = {
                logo: imgResp.path,
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