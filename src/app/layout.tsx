import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './globals.css';
import { ReactQueryProvider } from "../utils/ReactQueryProvider";
import Header from '../ui/components/Header';
import NavBar from '../ui/components/NavBar';
import { SessionClientProvider } from '../utils/SessionProvider';
import Footer from '../ui/components/Footer';
import { ProductProvider } from '../context/ProductContext';
import ScrollToTop from '../utils/scrollToTop';
import { TiShoppingCart } from 'react-icons/ti';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <SessionClientProvider>
        <ProductProvider>
      <html lang="en">
        <head>
          <title>TakeShoes</title>
        </head>
        <body className='overflow-x-hidden'>
          <ScrollToTop />
          <Header />
          <NavBar />
          <Link href={'/carrinho'}>
            <TiShoppingCart className='fixed left-0' size={60} color='black'/>
            <div className='fixed left-12 top-36 bg-red-700 w-6 h-6 rounded-full items-center flex justify-center text-white text-lg p-4'>0</div>
          </Link>
          <main className='flex min-h-screen w-screen' >
          {children}
          </main>
          <Footer />
        </body>
      </html>
        </ProductProvider>
      </SessionClientProvider>
    </ReactQueryProvider>
  );
}
