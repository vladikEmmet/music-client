import MainLayout from '@/layouts/Main.layout';
import React from 'react';

const Index = () => {
  return (
    <>
        <MainLayout>
            <div className="main">
                <h1>Spotifoo</h1>
                <h3>Ваши любимые треки здесь</h3>   
            </div>
        </MainLayout>

        <style jsx>
            {`
                .main {
                    margin-top: 150px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
            `}
        </style>
    </>
  )
}

export default Index;