import { useState } from 'react';
import { Fab, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { FactCheck, Kitchen, Timeline, Settings, Add } from '@mui/icons-material';

export function BottomNavigationBar({ onFabClicked }) {
  const [value, setValue] = useState(1);

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
          console.log(event, newValue);
        }}
      >
        <BottomNavigationAction label="Diary" icon={<FactCheck />} />
        <BottomNavigationAction label="Kitchen" icon={<Kitchen />} />
        <BottomNavigationAction label="Progress" icon={<Timeline />} />
        <BottomNavigationAction label="Settings" icon={<Settings />} />
      </BottomNavigation>
    </div>
  );
}
