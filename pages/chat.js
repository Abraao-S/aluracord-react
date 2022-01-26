import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import appConfig from '../config.json'
import { Router, useRouter } from 'next/router'

export default function ChatPage() {
    return (
        <div>

        <img src=''></img>


            {/* <Box
                
                    type='submit'
                    label='Entrar'
                    as="form"
                   
                    //   fullWidth
                    //   buttonColors={{
                    //     contrastColor: appConfig.theme.colors.neutrals["000"],
                    //     mainColor: appConfig.theme.colors.primary[500],
                    //     mainColorLight: appConfig.theme.colors.primary[400],
                    //     mainColorStrong: appConfig.theme.colors.primary[600],
                    //   }}
                    
                    onSubmit={function (eventInfos) {
                        eventInfos.preventDefault();  // this prevents the page from reloading
                        console.log('form submitted');
                        // alert('funfou');

                        // routing.push('/test');
                        // window.location.href = '/chat';
                    }}
            /> */}
            
        </div>

    )
}