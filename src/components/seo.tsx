import Head from 'next/head';

const defaultMeta = {
  title: 'Libre Blockchain Explorer',
  siteName: 'Libre Blockchain Explorer',
  description: 'Explore transactions, blocks, account for the Libre Blockchain.',
  /** Without additional '/' on the end, e.g. https://theodorusclarence.com */
  url: 'https://libreblocks.io',
  type: 'website',
  robots: 'follow, index',
  /**
   * No need to be filled, will be populated with openGraph function
   * If you wish to use a normal image, just specify the path below
   */
  image: 'https://libreblocksio.vercel.app/images/ogimage.png',
};

type SeoProps = {
  date?: string;
  templateTitle?: string;
} & Partial<typeof defaultMeta>;

export default function Seo(props: SeoProps) {
  const meta = {
    ...defaultMeta,
    ...props,
  };
  meta['title'] = props.templateTitle ? `${props.templateTitle} | ${meta.siteName}` : meta.title;

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name='robots' content={meta.robots} />
        <meta content={meta.description} name='description' />
        <link rel='icon' href='../images/icon.png' type='image/x-icon' />
        <meta property='og:url' content='https://libreblocksio.vercel.app/' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='Libre Blockchain Explorer' />
        <meta
          property='og:description'
          content='Explore transactions, blocks, account for Libre Blockchain.'
        />
        <meta property='og:image' content='https://libreblocksio.vercel.app/images/ogimage.png' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta property='twitter:domain' content='libreblocksio.vercel.app' />
        <meta property='twitter:url' content='https://libreblocksio.vercel.app/' />
        <meta name='twitter:title' content='Libre Blockchain Explorer' />
        <meta
          name='twitter:description'
          content='Explore transactions, blocks, account for Libre Blockchain.'
        />
        <meta name='twitter:image' content='https://libreblocksio.vercel.app/images/ogimage.png' />

        {meta.date && (
          <>
            <meta property='article:published_time' content={meta.date} />
            <meta name='publish_date' property='og:publish_date' content={meta.date} />
            <meta name='author' property='article:author' content='Libre Blockchain Explorer' />
          </>
        )}

        <meta name='msapplication-TileColor' content='#FF6200' />
        <meta name='theme-color' content='#FF6200' />
      </Head>
    </>
  );
}
