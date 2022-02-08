import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Button, Text, TextField, Image } from '@skynexui/components'
import appConfig from '../config.json'

function Title(props) {
  const { tag, children } = props
  const Tag = tag || 'h1'

  return (
    <>
      <Tag>{children}</Tag>

      <style jsx>{`
        ${Tag} {
            color: ${appConfig.theme.colors.neutrals['000']};
            font-size: 1.9rem;
            font-weight: bold;
            position: absolute;
            top: 10px;
            right: 10px
        }    
      `}</style>
    </>
  )
}

/* function HomePage() {
  return (
    <div>
      <GlobalStyle />
      <Title tag='h2'>Boas vindas de volta!</Title>
      <h2>Discord - Alura Matrix</h2>
    </div>
  )
}
export default HomePage */

export default function PaginaInicial() {
  const [username, setUsername] = useState('')
  const [wallpaper, setWallpaper] = useState(appConfig.wallpaperTheme || appConfig.theme.colors.themes.grayTheme.wallpaper)
  const [buttonColor, setButtonColor] = useState(appConfig.theme.colors.themes.grayTheme.buttonColor)
  const router = useRouter()

  return (
    <>
      <Title tag="h2">Aluracord</Title>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundImage: `url(${wallpaper})`,
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'column-reverse',
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            /* boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)', */
            backgroundColor: 'transparent'/* appConfig.theme.colors.neutrals[700] */,
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={(event) => {
              event.preventDefault()
              // Maneira convencional
              //window.location.href = './chat'
              // Maneira usada com o next.js
              router.push(`./chat?username=${username}`)
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            {/* <Title tag="h2">Aluracord - Matrix</Title> */}
            {/* <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              {username}
            </Text> */}

            {/* <input 
              type='text'
              value={username}
              onChange={(event) => {
                //onde o valor está mantido
                const newUsername = event.target.value
                //atribuindo o novo valor
                setUsername(newUsername)
              }}
            /> */}
            <TextField
              value={username}
              onChange={(event) => {
                //onde o valor está mantido
                const newUsername = event.target.value
                //atribuindo o novo valor
                setUsername(newUsername)
              }}
              placeholder='Digite seu usuário do github...'
              fullWidth
              required
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: `${buttonColor}` /* appConfig.theme.colors.primary[500] */,
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            <Button
              type='submit'
              label='Entrar'
              fullWidth
              styleSheet={{ boxShadow: '0 5px 10px 0 rgb(0 0 0 / 40%)' }}
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: `${buttonColor}` /* appConfig.theme.colors.primary[600] */,
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[500],
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              /* backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: '10px', */
              flex: 1,
              minHeight: '240px',
              position: 'relative'
            }}
          >
            <Box 
              styleSheet={{
                width: '166px',
                height: '166px',
                backgroundColor: 'rgba(225, 222, 222, 0.13)',
                boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                borderRadius: '7px',
                border: '1px solid #fff',
                position: 'absolute',
                top: '15px'
              }}
            />

            <Image
              styleSheet={{
                height: '164px',
                borderRadius: '7px',
                marginBottom: '20px',
                boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                zIndex: '1'
              }}
              src={`https://github.com/${username}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                fontSize: '1rem',
                fontWeight: 'bold',
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 12px',
                borderRadius: '1000px'
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>

      <Themes wallpaper={setWallpaper} buttonColor={setButtonColor} />
    </>
  );
}

function Themes(props) {
  const { wallpaper, buttonColor } = props

  return (
    <>
      <Box
        styleSheet={{
          width: '268px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '10px 0',
          position: 'absolute',
          bottom: '0',
          left: '50%',
          transform: 'translate(-50%)'
        }}>

        <Text
          variant="body2"
          styleSheet={{
            fontWeight: 'bold',
            marginBottom: '10px',
            color: appConfig.theme.colors.neutrals['000'],
            display: {
              xs: 'none',
              sm: 'inline-block'
            }
          }}>
          Temas:
        </Text>

        <Box>
          <Button
            onClick={() => {
              wallpaper(appConfig.theme.colors.themes.grayTheme.wallpaper)
              buttonColor(appConfig.theme.colors.themes.grayTheme.buttonColor)
              appConfig.wallpaperTheme = appConfig.theme.colors.themes.grayTheme.wallpaper
            }}
            styleSheet={{
              width: '45px',
              height: '45px',
              borderRadius: '7px',
              margin: '0 10px',
              border: '1px solid #fff',
              backgroundImage: `url(${appConfig.theme.colors.themes.grayTheme.wallpaper})`,
              backgroundSize: 'cover',
            }}
          />

          <Button
            onClick={() => {
              wallpaper(appConfig.theme.colors.themes.blueTheme.wallpaper)
              buttonColor(appConfig.theme.colors.themes.blueTheme.buttonColor)
              appConfig.wallpaperTheme = appConfig.theme.colors.themes.blueTheme.wallpaper
            }}
            styleSheet={{
              width: '45px',
              height: '45px',
              borderRadius: '7px',
              margin: '0 10px',
              border: '1px solid #fff',
              backgroundImage: `url(${appConfig.theme.colors.themes.blueTheme.wallpaper})`,
              backgroundSize: 'cover',
            }}
          />

          <Button
            onClick={() => {
              wallpaper(appConfig.theme.colors.themes.purpleTheme.wallpaper)
              buttonColor(appConfig.theme.colors.themes.purpleTheme.buttonColor)
              appConfig.wallpaperTheme = appConfig.theme.colors.themes.purpleTheme.wallpaper
            }}
            styleSheet={{
              width: '45px',
              height: '45px',
              borderRadius: '7px',
              margin: '0 10px',
              border: '1px solid #fff',
              backgroundImage: `url(${appConfig.theme.colors.themes.purpleTheme.wallpaper})`,
              backgroundSize: 'cover',
            }}
          />

          <Button
            onClick={() => {
              wallpaper(appConfig.theme.colors.themes.redTheme.wallpaper)
              buttonColor(appConfig.theme.colors.themes.redTheme.buttonColor)
              appConfig.wallpaperTheme = appConfig.theme.colors.themes.redTheme.wallpaper
            }}
            styleSheet={{
              width: '45px',
              height: '45px',
              borderRadius: '7px',
              margin: '0 10px',
              border: '1px solid #fff',
              backgroundImage: `url(${appConfig.theme.colors.themes.redTheme.wallpaper})`,
              backgroundSize: 'cover',
            }}
          />
        </Box>
      </Box>
    </>
  )
}