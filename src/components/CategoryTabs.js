import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const CategoryTabs = ({ data, currentCategory, progress, onChange }) => (
  <Tabs
    value={currentCategory}
    onChange={onChange}
    indicatorColor="primary"
    textColor="primary"
    variant="scrollable"
    scrollButtons="auto"
    aria-label="scrollable auto tabs example"
  >
    {Object.keys(data).map(category => (
      <Tab
        key={category}
        label={
          <Box display="flex" alignItems="center">
            {category}
            {Object.keys(data[category]).every(subCategory => progress[`${category}-${subCategory}`] === 100) && (
              <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green', marginLeft: 8 }} />
            )}
          </Box>
        }
        value={category}
      />
    ))}
  </Tabs>
);

export default CategoryTabs;
