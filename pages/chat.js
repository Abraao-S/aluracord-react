import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React, { useState } from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js'

// SUPABASE
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzUwMDEyOSwiZXhwIjoxOTU5MDc2MTI5fQ.s73XeVFId_AgL46oqn4at9otP4AZKzJCzKPaUXj0SVY';
const URL = 'https://hjaivdpoxgzvcevmrkrs.supabase.co';
const supabaseClient = createClient(URL, SUPABASE_ANON_KEY);




export default function ChatPage() {
    /** REQUISITES:
     * 
     * USER:
     * [X] user types text into the text field
     * [X] user press "enter" to send messages
     * 
     * DEV:
     * [X] text field created  
     * [X] application saves messages in a list
     * [X] use onChange to detect when user press "enter" and setState to change the value displayed to show the new message typed
     */
    // _________________________________________________________________________________________________________

    // traditional way of declaring a variable:
    // const mensagem = '';

    // React way of declaring a variable: the first one "message" is the variable we are gonna use to display the message on the screen. The second one "setMessage" is a method that we call to change the value for the message, we don't change it on the message itself, and that's the famous HOOKS! To call it "set...Something" is a React convention!
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

    // calls the supabase back-end, encapsulated inside a useEffect() method to prevent from making a request every time any change on the page happens.
    React.useEffect( () => {    // by default, the useEffect() function runs only when the page first loads. But we can change that using the array at the end of the function.
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', {ascending: false})
            .then( ( {data} ) => {
                console.log("Query result: ", data);    
                setListaDeMensagens(data);
        } );
    }, []); // here, inside this array at the end, we can pass a component to watch, meaning that every time any change happens to that component we run the useEffect() function. If we would pass "listaDeMensagens" here inside this array every time some change happened it would make another request to the server. The problem with that is when the server responds that counts as a change so it makes an eternal loop of requests and responses that would take down our server!


    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            // id: listaDeMensagens.length + 1,
            de: 'abraao-s',
            texto: novaMensagem,
        };

        supabaseClient
            .from('mensagens')
            .insert([
                // Tem que ser um objeto com os MESMOS CAMPOS que estão no supabase
                mensagem
            ])
            .then( ( {data} ) => {
                console.log(`Criando mensagem: ${data}`);
                
                setListaDeMensagens([
                    data[0],
                    ...listaDeMensagens,
                ]);

            });

        

        setMensagem('');
    }

    // ./Sua lógica vai aqui
    return (
        <Box    // box containing all the page content, here goes the background
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box    //main content box, here goes all other the page elements
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />  {/** calling the Header function (which is an element) */}
                <Box    //chat messages will appear here
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    <MessageList mensagens={listaDeMensagens} />

                    {/* {listaDeMensagens.map( (mensagemAtual) => {
                        return (
                            
                            // styles for the li
                            // style={ {border: '1px solid red'} }
                            // style={ {height: '1.5em'} }
                            
                            <li key={mensagemAtual.id}  > 
                                {mensagemAtual.de}:  {mensagemAtual.texto}
                            </li>
                        )

                    } )} */}


                    {/* ??? */}
                    {/* <MessageList mensagens={[]} /> */}

                    <Box    //box to type the messages
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}

                            onChange={(event) => {
                                // console.log(event);
                                const valor = event.target.value;
                                setMensagem(valor);
                            }}



                            onKeyPress={(event) => {
                                // console.log(event.key);

                                if (event.key === 'Enter') {
                                    // console.log('PRESSED ENTER');

                                    // prevents the line wrap on text box
                                    event.preventDefault();

                                    handleNovaMensagem(mensagem);
                                }

                            }}

                            placeholder="Insira sua mensagem aqui..."

                            type="textarea"
                            // type="text"
                            // type="password"


                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    // console.log('MessageList', props);
    console.log(props);

    let mensagem = ''

    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
                overflow: 'auto',   // descobri como concertar tirando dúvida no discord
            }}
        >

            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />
                            <Text tag="strong">
                                {mensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {mensagem.texto}
                    </Text>
                )
            })}


        </Box>
    )
}