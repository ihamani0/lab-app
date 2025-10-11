 

import './bootstrap';
import "../css/app.css";

import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import MainLayout from './Layouts/MainLayout';


createInertiaApp({
  resolve: (name) => {
    const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true }) 
    let page = pages[`./Pages/${name}.tsx`]
    page.default.layout = page.default.layout || ( (page: React.ReactNode) => <MainLayout children={page} /> );

    return page;
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
    progress: {
        color: '#4B5563',
    },
})
