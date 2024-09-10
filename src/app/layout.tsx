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
import CartIcon from '../ui/components/CartIcon';
import { ToastifyProvider } from '../utils/ToastifyProvider';
import 'react-toastify/dist/ReactToastify.css'

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
                <ToastifyProvider/>
                <ScrollToTop />
                <Header />
                <NavBar />
                <CartIcon />
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
