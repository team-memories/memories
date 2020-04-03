import React from 'react';
import {ApolloProvider} from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client';
import UploadPage from "./pages/UploadPage";
import 'antd/dist/antd.css';
import {InMemoryCache} from "apollo-cache-inmemory";
import {createUploadLink} from "apollo-upload-client";

function App() {
    const client = new ApolloClient({
        link: createUploadLink({uri: 'http://localhost:9696/graphql'}),
        cache: new InMemoryCache(),
    });

    return (
        <div style={{paddingTop: '69px', minHeight: 'calc(100vh - 80px)'}}>
            <ApolloProvider client={client}>
                <UploadPage/>
            </ApolloProvider>
        </div>

    )
}

export default App;