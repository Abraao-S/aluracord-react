import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json'
import { Router, useRouter } from 'next/router'



// This is a React component!
function Titulo(props) {
  // console.log(props);
  
  const Tag = props.tag || 'h1';
  // console.log(Tag)


  return (
    // this empty tag is a support from JSX to group multiple elements together without cluttering our HTML with tags to contain each one
    <>
      <Tag>{props.children}</Tag>
      <style jsx> {
        `
                    ${Tag} {
                        color: ${appConfig.theme.colors.neutrals['900']};
                        font-size: 24px;
                        font-weight: 600;
                    }
                    `
      }
      </style>
    </>
  );
}

// testing
function Main(props) {
  const Tag = props.tag;
  console.log(Tag);

  return (
    <>
      <Tag>
        {props.children}
      </Tag>
      <style jsx> {
        `
                ${Tag} {
                    border: 1px solid red;
                    background: yellow;
                }
               `
      }
      </style>
    </>
  );
}

// This is a React component!
// function HomePage() {
//     // JSX
//     return (
//         <>

//             {/* Reseting styles for ALL elements */}
//             <GlobalStyle>

//             </GlobalStyle>

//             {/* main title */}
//             <div>
//                 <Titulo tag="h2">Boas vindas de volta!</Titulo>  {/* here the value inside the Title tag is the children! */}
//                 <h2>Aluracord - Alura Matrix</h2>
//             </div>

//             {/* testing */}
//             <div>
//                 <Main tag="main">
//                     MAIN CONTENT HERE
//                 </Main>
//             </div>
//         </>
//     ) 
// } 

// export default HomePage

// --------------------------------------------------

export default function PaginaInicial() {
  // const username = 'Abraao-S';
  
  const [username, setUsername] = React.useState('Abraao-S'); // here we are not creating any array but using the one that already exists! Only that with this syntax before the equal sign (=) we are specifynig which items from the array that we want!

  const routing = useRouter();
  // console.log(routing);

  
  // console.log('stateDoReact', stateDoReact);
  // console.log(username);
  
  // 
  // const stateDoReact = React.useState('Abraao-S');


  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Form */}
          <Box
            as="form"
            onSubmit={ function (eventInfos) {
              eventInfos.preventDefault();  // this prevents the page from reloading
              console.log('form submitted');
              // alert('funfou');
              
              routing.push('/chat');
              // window.location.href = '/chat';
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Titulo tag="h2">Boas vindas de volta!</Titulo>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              {appConfig.name}
            </Text>

            {/* <input 
              type="text"
              value={username}
              onChange = {function handler(event) {
                console.log('user typed: ' + event.target.value);
                
                // where's the value?  
                const valor = event.target.value;

                // change the value for the variable using React!
                setUsername(valor);

                }
              }
            /> */}
            
            <TextField
              value={username}

              onChange = {function handler(event) {
                console.log('user typed: ' + event.target.value);
                
                // where's the value?  
                const valor = event.target.value;

                // change the value for the variable using React!
                setUsername(valor);

                }
              }

              fullWidth  
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />


            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* /Form */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={`https://github.com/${username}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              {username}
            </Text>
          </Box>
          {/* /Photo Area */}
        </Box>
      </Box>
    </>
  );
}
