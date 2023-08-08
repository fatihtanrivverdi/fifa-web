import { useState } from "react";

// Material UI
import { TextField, Stack, Container, Typography, Button, FormControlLabel, Switch } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

function product_Range(a, b) {
  var prd = a, i = a;

  while (i++ < b) {
    prd *= i;
  }
  return prd;
}


function combinations(n, r) {
  if (n == r || r == 0) {
    return 1;
  }
  else {
    r = (r < n - r) ? n - r : r;
    return product_Range(r + 1, n) / product_Range(1, n - r);
  }
}

const calculateFixtureInLeagueFormat = (playerList, tourCount) => {
  const fixture = [];

  // In every tour, every player should play against each other
  // So, we need to create a fixture for each tour
  for (let i = 0; i < tourCount; i++) {
    const tourFixture = [];

    // In every tour, every player should play against each other
    // So, we need to create a fixture for each player
    for (let j = 0; j < combinations(playerList.length, 2); j++) {
      const randomPlayer = playerList[Math.floor(Math.random() * playerList.length)];
      const opponentList = playerList.filter((player) => player !== randomPlayer);

      for (let k = 0; k < opponentList.length; k++) {
        const opponent = opponentList[Math.floor(Math.random() * opponentList.length)];

        if (tourFixture.some((match) => match.includes(randomPlayer) && match.includes(opponent))) {
          continue;
        }
        else {
          tourFixture.push([randomPlayer, opponent]);
          break;
        }
      }
    }

    fixture.push(tourFixture);
  }

  return fixture;
}


const Component = (props) => {
  const { playerCountSubmitted, playerCount, setPlayerCountSubmitted, setPlayerCount, tourCount, setTourCount, isAverage, setIsAverage } = props;

  const handleOnClick = () => {
    if (playerCount === null) return;

    setPlayerCountSubmitted(true);
  }

  const onPlayerCountChange = (e) => setPlayerCount(e.target.value);
  const onTourCountChange = (e) => setTourCount(e.target.value);
  const onChangeAverage = (e) => setIsAverage(e.target.checked);

  const [playerList, setPlayerList] = useState({});

  if (playerCountSubmitted)
    return (
      <Stack width='100%' spacing={1}>
        {
          Array.from(Array(parseInt(playerCount)).keys()).map((_, index) => (
            <TextField key={index} value={playerList[index]} label={`Katılımcı ${index + 1}`} variant='filled' onChange={(e) => {
              setPlayerList({ ...playerList, [index]: e.target.value })
            }} />
          ))
        }
        <Button fullWidth variant='contained' color='primary' onClick={() => console.log(calculateFixtureInLeagueFormat(Object.values(playerList), tourCount, isAverage))}>
          Kaydet
        </Button>
      </Stack>
    )
  else return (
    <>
      <TextField fullWidth label='Katılımcı Sayısı' variant='filled' value={playerCount || ''} onChange={onPlayerCountChange} />
      <TextField fullWidth label='Tur Sayısı' variant='filled' value={tourCount || ''} onChange={onTourCountChange} />
      <FormControlLabel control={<Switch defaultChecked />} value={isAverage} label="Averaj durumu" onChange={onChangeAverage} />
      <Button fullWidth variant='contained' color='primary' onClick={handleOnClick}>
        Başlat
      </Button>
    </>
  )
}

function App() {
  const [playerCount, setPlayerCount] = useState(null);
  const [tourCount, setTourCount] = useState(null);
  const [isAverage, setIsAverage] = useState(true);

  const [playerCountSubmitted, setPlayerCountSubmitted] = useState(false);

  const theme = createTheme({
  });

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth='sm' sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Stack width='100%' alignItems='center' spacing={2} justifyContent='center' bgcolor='#fafafa' p={2} boxSizing='border-box' borderRadius={4} boxShadow={10}>
          <Typography variant='h3' color='black'>
            Fifa - Turnuva
          </Typography>
          <Component
            playerCount={playerCount}
            playerCountSubmitted={playerCountSubmitted}
            tourCount={tourCount}
            setTourCount={setTourCount}
            isAverage={isAverage}
            setIsAverage={setIsAverage}
            setPlayerCount={setPlayerCount}
            setPlayerCountSubmitted={setPlayerCountSubmitted} />
        </Stack>
      </Container>
    </ThemeProvider>
  )
}

export default App
