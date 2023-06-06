import ViewHome from '@/views/home';

import Seo from '@/components/seo';

export default function PageIndex() {
  return (
    <>
      <Seo title='Libre Blockchain Explorer' />
      <ViewHome />
    </>
  );
}
