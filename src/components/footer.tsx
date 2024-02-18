import Link from 'next/link';

const col1 = {
  title: 'Libre Chain',
  items: [
    {
      label: 'Libre Chain Homepage',
      url: 'https://chain.libre.org/',
    },
    {
      label: 'Libre DEX',
      url: 'https://www.libredex.org/',
    },
    {
      label: 'Wallets',
      url: 'https://chain.libre.org/wallets',
    },
    {
      label: 'Docs',
      url: 'https://docs.libre.org/libre-docs/',
    },
    {
      label: 'Blog',
      url: 'https://blog.libre.org/',
    },
  ],
};

const col2 = {
  title: 'Libre Block Resources',
  items: [
  
    {
      label: 'Roadmap',
      url: 'https://github.com/orgs/LibreBlocksio/projects/1',
    },
    {
      label: 'GitHub Repository',
      url: 'https://github.com/LibreBlocksio/Libre-Blocks-Explorer',
    },
  ],
};

const col4 = {
  title: 'Other Links',
  items: [
    {
      label: 'Follow on X',
      url: 'https://twitter.com/libreblocks',
    },
    
  ],
};

const col3 = {
  title: 'Support',
  items: [
    {
      label: 'Libre Chain Support',
      url: 'mailto:support@libre.org',
    },
    {
      label: 'Contact LibreBlocks Team',
      url: 'mailto:libreblocks@gmail.com',
    },
  ],
};

export default function Footer() {
  return (
    <footer className='sticky top-[100vh] mt-16 rounded-t-[36px] bg-[#eee]'>
      <div className='container py-10'>
        <div className='grid gap-x-6 gap-y-10 min-[480px]:grid-cols-2 md:grid-cols-4 md:gap-10'>
          <div>
            <div className='text-xl font-semibold'>{col1.title}</div>
            <ul className='mt-5 space-y-4'>
              {col1.items.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.url}
                    className='text-base text-shade-700 transition hover:text-shade-500'
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className='text-xl font-semibold'>{col2.title}</div>
            <ul className='mt-5 space-y-4'>
              {col2.items.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.url}
                    className='text-base text-shade-700 transition hover:text-shade-500'
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className='mt-4 flex items-center'>
              <span className='mr-2 block h-2 w-2 rounded-full bg-green-500'></span>
              <span className='text-xs text-shade-700'>
              Latest update on Feb 18 2024
              </span>
            </div>
          </div>
          <div>
            <div className='text-xl font-semibold'>{col3.title}</div>
            <ul className='mt-5 space-y-4'>
              {col3.items.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.url}
                    className='text-base text-shade-700 transition hover:text-shade-500'
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className='text-xl font-semibold'>{col4.title}</div>
            <ul className='mt-5 space-y-4'>
              {col4.items.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.url}
                    className='text-base text-shade-700 transition hover:text-shade-500'
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='mt-12'>
          <Link href='/' className='lg:shrink-0'>
            <img
              src='/images/logo.svg'
              alt='Logo'
              width={260}
              height={42}
              className='h-8 w-auto object-contain object-left lg:h-auto'
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
