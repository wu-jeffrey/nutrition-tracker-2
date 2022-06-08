import { useState } from 'react';
import { Fab, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { FactCheck, Kitchen, Timeline, Settings, Add } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

const PATH_ENUM = {
  '/': 0,
  '/diary': 0,
  '/kitchen': 1,
  '/progress': 2,
  '/settings': 3,
}

export function BottomNavigationBar({ onFabClicked }) {
  const pathname = useLocation().pathname;
  const [value, setValue] = useState(PATH_ENUM[pathname]);

  return (
    <div style={{ position: 'fixed', bottom: 0, width: '100%' }}>
      <Fab color="primary" aria-label="add"
        style={{
          position: 'absolute',
          zIndex: 1,
          transform: 'translate(-50%, -75%)',
        }}
        onClick={onFabClicked}
      >
        <Add />
      </Fab>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          console.log(event, newValue)
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Diary" component={Link} to='/diary' icon={<FactCheck />} />
        <BottomNavigationAction label="Kitchen" component={Link} to='/kitchen' icon={<Kitchen />} />
        <BottomNavigationAction label="Progress" component={Link} to='/progress' icon={<Timeline />} />
        <BottomNavigationAction label="Settings" component={Link} to='/settings' icon={<Settings />} />
      </BottomNavigation>
    </div>
  );
}
