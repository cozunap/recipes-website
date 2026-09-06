import { db } from '@/lib/firebase/client';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { Renderer } from '@/components/renderer/Renderer';
import { notFound } from 'next/navigation';

export const runtime = 'edge';
export const revalidate = 60;

export default async function PublicPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params;
  const pathSlug = '/' + resolvedParams.slug.join('/');

  try {
    const q = query(collection(db, 'pages'), where('slug', '==', pathSlug));
    const pagesSnapshot = await getDocs(q);

    if (pagesSnapshot.empty) {
      return notFound();
    }
    
    const pageId = pagesSnapshot.docs[0].id;

    const publishedDoc = await getDoc(doc(db, 'page_versions', `${pageId}_published`));

    if (!publishedDoc.exists()) {
      return notFound();
    }

    const pageData = publishedDoc.data();

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
