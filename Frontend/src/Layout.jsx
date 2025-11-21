import React from 'react'
import { useState } from 'react';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
const [content, setContent] = useState('');
    const onUpload = (text) => {
        setContent(text);
    }

  return (
    <div>
                <Header/>
                <Outlet context={{content,onUpload}}/>
                <Footer/>
    </div>
  )
}
