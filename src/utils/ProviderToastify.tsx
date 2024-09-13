"use client";

import { ToastContainer} from 'react-toastify';
import { cssTransition } from 'react-toastify';
import '../../src/app/globals.css'
import 'animate.css';

const Slide = cssTransition({
    collapse: false,
    enter: 'slide-in',  
    exit: 'slide-out',     
  });
  

export const ToastifyProvider = () => {
    return (
        <ToastContainer
            position="top-left"
            autoClose={2000}
            pauseOnFocusLoss={false}
            pauseOnHover={false}
            limit={4}
            newestOnTop={true}
            theme="dark"
            draggable={true}
            transition={Slide}
        />
    )
}