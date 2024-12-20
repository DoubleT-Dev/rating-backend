import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { createClient } from "@/utils/supabase/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculatePagination(page: number) {
  const pageSize = parseInt(process.env.PAGE_SIZE!);
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  return { from, to };
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export const uploadImage = async (folderName : string, file : File) => 
{
	const supabase = createClient();
  
	const { data, error } = await supabase.storage
			.from("rating-bucket") // Replace with your bucket name
			.upload(`${folderName}/${Date.now()}_${sanitizeFileName(file.name)}`, file);

	return { data, error };

};

export function sanitizeFileName(fileName : string) {
  return fileName
    .replace(/ /g, '_')       // Replace spaces with underscores
    .replace(/[^a-zA-Z0-9_.-]/g, ''); // Remove non-ASCII characters
}

export function getImageUrl (filename: string) {
  const supabase = createClient()
  const { data } = supabase.storage.from('rating-bucket').getPublicUrl(filename)

  return data.publicUrl;
};