import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const SubCategoryTabs = ({ data, currentCategory, currentSubCategory, progress, onChange }) => (
  <Tabs
    value={currentSubCategory}
    onChange={onChange}
    indicatorColor="primary"
    textColor="primary"
    variant="scrollable"
    scrollButtons="auto"
    aria-label="scrollable auto tabs example"
  >
    {Object.keys(data[currentCategory] || {}).map(subCategory => (
      <Tab
        key={subCategory}
        label={
          <Box display="flex" alignItems="center">
            {subCategory}
            {progress[`${currentCategory}-${subCategory}`] === 100 && (
              <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green', marginLeft: 8 }} />
            )}
          </Box>
        }
        value={subCategory}
      />
    ))}
  </Tabs>
);

export default SubCategoryTabs;
