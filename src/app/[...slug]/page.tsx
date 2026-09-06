import { adminDb } from '@/lib/firebase/admin';
import { Renderer } from '@/components/renderer/Renderer';
import { notFound } from 'next/navigation';

// Next.js ISR settings
export const revalidate = 60; // revalidate every 60 seconds at most, or on demand via API

export default async function PublicPage({ params }: { params: { slug: string[] } }) {
  const pathSlug = '/' + params.slug.join('/');

  try {
    // 1. Find the page metadata by slug
    const pagesSnapshot = await adminDb.collection('pages')
      .where('slug', '==', pathSlug)
      .limit(1)
      .get();

    if (pagesSnapshot.empty) {
      return notFound();
    }
    
    const pageId = pagesSnapshot.docs[0].id;

    // 2. Fetch the PUBLISHED version
    const publishedDoc = await adminDb.collection('page_versions')
      .doc(`${pageId}_published`)
      .get();

    if (!publishedDoc.exists) {
      return notFound(); // Maybe return a "Coming Soon" or 404
    }

    const pageData = publishedDoc.data();

    // 3. Render the public site
    return (
      <div className="w-full min-h-screen">
        {pageData?.nodes?.map((node: any) => (
          <Renderer key={node.id} node={node} />
        ))}
      </div>
    );
  } catch (error) {
    console.error('Public render error:', error);
    return <div className="p-8 text-red-500">Error loading page.</div>;
  }
}
