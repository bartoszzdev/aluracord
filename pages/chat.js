import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, Text, TextField, Image, Button } from '@skynexui/components'
import appConfig from '../config.json'
import { createClient } from '@supabase/supabase-js'
import { ButtonSendSticker } from '../src/components/ButtonSendSticker'

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzQ3Mjc2NSwiZXhwIjoxOTU5MDQ4NzY1fQ.xBXAfO6trt3rT-NVvSJvqxZ_yooT6hlrmnFHrBxD6DY'
const SUPABASE_URL = 'https://pfmwndnqbdjosrwidsxj.supabase.co'
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

function listenMessagesRealtime() {
    return supabaseClient
        .from('Message List')
        .on('INSERT', (resposta) => {
            //console.log(resposta.new)
            console.log('Houve uma nova mensagem', resposta)
            //addNewMessage(resposta.new)
        })
        .subscribe()
}

export default function ChatPage() {
    const [message, setMessage] = useState('')
    const [messageList, setMessageList] = useState([])
    const router = useRouter()
    const loggedUser = router.query.username

    useEffect(() => {
        supabaseClient
            .from('Message List')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                //console.log(data)
                setMessageList(data)
            })

            listenMessagesRealtime()

        /* listenMessagesRealtime((newMessage) => {
            setMessageList((newList) => {
                return [
                    newMessage,
                    ...newList
                ]
            })
        }) */
    }, [])

    /*
    User:
        -User digita a mensagem no campo textarea
        -Aperta enter para enviar

    Dev:
        -Cria o campo de texto(textarea)
        -Usar o onChange para realizar o useState( usar o if caso aperte o Enter...)
        -Mostrar a lista de mensagens
    */

    const handleNewMessage = (newMessage) => {
        const currentMessage = {
            //id: messageList.length + 1,
            from: loggedUser,
            text: newMessage
        }

        if (currentMessage.text.length > 0) {
            supabaseClient
                .from('Message List')
                .insert([
                    currentMessage
                ])
                .then(({ data }) => {
                    //console.log(data)
                    setMessageList([
                        data[0],
                        ...messageList
                    ])
                })

            setMessage('')
        }
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundImage: `url(${appConfig.wallpaperTheme || appConfig.theme.colors.themes.grayTheme.wallpaper})`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    /* boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)', */
                    borderRadius: '5px',
                    backgroundColor: 'tranparent' /* appConfig.theme.colors.neutrals[700] */,
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: 'rgba(0,0,0, 0.545)'/* appConfig.theme.colors.neutrals[600] */,
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    <MessageList messages={messageList} setMessageList={setMessageList} />
                    {/* {messageList.map(message => {
                        return (
                            <li key={message.id}>
                                {message.from}: {message.text}
                            </li>
                        )
                    })} */}

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={message}
                            onChange={(event) => {
                                //Onde o valor está
                                const newMessage = event.target.value
                                //Atribuindo ele em uma variavel
                                setMessage(newMessage)
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault()
                                    handleNewMessage(message)
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
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

                        <ButtonSendSticker 
                            onStickerClick={(sticker) => {
                                //console.log('[USANDO O COMPONENTE] Salvando o sticker no banco:', sticker)
                                handleNewMessage(':sticker: ' + sticker)
                            }}
                        />

                        <Button
                            onClick={() => {
                                handleNewMessage(message)
                            }}
                            variant='tertiary'
                            colorVariant='positive'
                            label='Enviar'
                            styleSheet={{
                                padding: '12px 10px',
                                marginBottom: '10px',
                                color: appConfig.theme.colors.neutrals['000'],
                                border: `1px solid #fff`,
                                /* backgroundColor: appConfig.theme.colors.themes.blueTheme.buttonColor */
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
    //console.log('MessageList', props)

    return (
        <Box
            tag="ul"
            styleSheet={{
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.messages.map(message => {
                const { id, from, text } = message

                return (
                    <Text
                        key={id}
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
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Box>
                                <Image
                                    styleSheet={{
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        display: 'inline-block',
                                        marginRight: '8px',
                                    }}
                                    src={`https://github.com/${from}.png`}
                                />
                                <Text tag="strong">
                                    {from}
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

                            <Button
                                id={id}
                                onClick={(event) => {
                                    const deletedMessage = event.currentTarget.id

                                    supabaseClient
                                        .from('Message List')
                                        .delete()
                                        .match({ id: deletedMessage })
                                        .then(({ data }) => {
                                            const newData = props.messages.filter((message) => message.id !== data[0].id)
                                            props.setMessageList(newData)
                                        })
                                }}
                                variant='tertiary'
                                colorVariant='negative'
                                label='X'
                                styleSheet={{
                                    fontWeight: 'bold',
                                    color: appConfig.theme.colors.neutrals['000'],
                                }}
                            />
                        </Box>
                        {/* Condicional ternária/declarativa */}
                        {text.startsWith(':sticker:')
                            ? (
                                <Image 
                                    src={text.replace(':sticker:', '')} 
                                    styleSheet={{maxWidth: '25%', height: 'auto'}}
                                />
                            ) 
                            : (
                                text
                            )
                        }
                    </Text>
                )
            })}
        </Box>
    )
}