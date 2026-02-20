import React from 'react';
import classes from './NotFound.module.scss';
import Text from 'components/Text';
import Button from 'components/Button';
import { useNavigate } from 'react-router';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={classes.notFoundPage}>
      <div className={classes.content}>
        <Text view="title" weight="bold" className={classes.errorCode}>
          404
        </Text>
        <Text view="p-22" weight="medium" className={classes.message}>
          Page Not Found
        </Text>
        <Text view="p-16" color="secondary" className={classes.description}>
          The page you are looking for doesn't exist or has been moved.
        </Text>
        <Button onClick={() => navigate('/')}>Go to Home</Button>
      </div>
    </div>
  );
};

export default NotFound;
