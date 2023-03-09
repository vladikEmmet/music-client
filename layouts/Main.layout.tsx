import Navbar from '@/components/Navbar'
import Player from '@/components/Player'
import { Container } from '@mui/material'
import Head from 'next/head'
import React from 'react'
import styles from "../styles/Main.layout.module.scss"

interface MainLayoutProps {
  children: string | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactElement<any, string | React.JSXElementConstructor<any>>[]
  title?: string;
  description?: string;
  keywords?: string;
};

const MainLayout: React.FC<MainLayoutProps> = ({
      children, 
      title, 
      description, 
      keywords
    }) => {
  return (
    <>
      <Head>
        <title>{title || "Spotifoo"}</title>
        <meta name="description" content={"Сервис для поиска и прослушивания музыки. Слушайте треки и загружайте свои! " + description || ""} />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content={keywords || "Музыка, треки, песни, артисты, исполнители"} />
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>
      <Container className={styles.container}>
        {children}
      </Container>
      <Player />
      <Navbar />
    </>
  )
}

export default MainLayout