import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { Paper } from '@mui/material';
import { useRouter } from 'next/router';

const navbarItems = [
    {text: "Треки", href: "/tracks", icon: <MusicNoteIcon />},
    {text: "Избранное", href: "/favorites", icon: <FavoriteIcon />},
    {text: "Личный кабинет", href: "/account", icon: <PersonIcon />}
]

export default function Navbar() {
  const [value, setValue] = React.useState('music');
  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Paper sx={{height: 60, position: "fixed", bottom: 0, left: 0, right: 0, display: "flex", justifyContent: "space-around"}} elevation={3}>
        <BottomNavigation sx={{ width: 500 }} value={value} onChange={handleChange}>
            {navbarItems.map(({text, href, icon}) => 
                <BottomNavigationAction
                    onClick={() => router.push(href)}
                    key={href}
                    label={text}
                    value={text}
                    icon={icon}
                />
            )}
        </BottomNavigation>
    </Paper>
  );
}