import MultipleImageUpload from '@/components/ui/multiple-image';
import Pagination from '@/components/ui/pagination';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customers | Rating Dashboard',
};

export default async function Page() {

  return (
    <div>
      <h1 className="mb-2 block">Upload Multiple Images</h1>
      <MultipleImageUpload filePath="test" />
    </div>
  );
}