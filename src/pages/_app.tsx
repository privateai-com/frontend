import App from 'next/app';

import React from 'react';
import cx from 'classnames';
import { ToastContainer } from 'react-toastify';
import { ReactReduxContext } from 'react-redux';

import { ModalProvider } from 'react-modal-hook';
import { PersistGate } from 'redux-persist/integration/react';

import { SagaStore, wrapper } from 'store/configureStore';

import { Montserrat } from 'next/font/google';

import 'assets/styles/styles.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'react-slidedown/lib/slidedown.css';

const inter = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export default wrapper.withRedux(
  class MyApp extends App {
    render() {
      const { Component, pageProps } = this.props;
      return (
        <ReactReduxContext.Consumer>
          {({ store }) => (
            <div className={cx(
              inter.className,
            )}
            >
              <PersistGate 
                persistor={(store as SagaStore).__persistor} 
                loading={<div>Loading</div>}
              >
                <ModalProvider>
                  <Component {...pageProps} />
                </ModalProvider>
            
                <ToastContainer
                  limit={10}
                  newestOnTop
                  theme="dark"
                />
              </PersistGate>
            </div>
          )}
        </ReactReduxContext.Consumer>
      );
    }
  },
);
