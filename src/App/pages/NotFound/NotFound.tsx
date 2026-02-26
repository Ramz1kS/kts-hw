import React from 'react';
import classes from './NotFound.module.scss';
import Text from 'components/Text';
import Button from 'components/Button';
import { Link } from 'react-router';

export const NotFound = () => {
  return (
    <div className={classes.notFoundPage}>
      <div className={classes.content}>
        <h1 className={classes.errorCode}>
          404
        </h1>
        <Text view="p-22" weight="medium" className={classes.message}>
          Page Not Found
        </Text>
        <Text view="p-16" color="secondary" className={classes.description}>
          The page you are looking for doesn't exist or has been moved.
        </Text>
        <Link to={'/'}>
            <Button>Go to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
