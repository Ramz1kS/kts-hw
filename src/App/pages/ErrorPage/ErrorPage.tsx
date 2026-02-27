import React from 'react';
import { useParams, Link } from 'react-router';
import Text from 'components/Text';
import Button from 'components/Button';
import classes from './ErrorPage.module.scss';

export const ErrorPage = () => {
    const { code } = useParams();

    return (
        <div className={classes.errorPage}>
            <Text tag="h1" view="title" weight="bold" color='accent' className={classes.code}>
                {code ?? 404}
            </Text>
            <Text view="p-20" color="secondary">
                Something went wrong. Please try again later.
            </Text>
            <Link to="/" className={classes.goHome}>
                <Button>Go to Home</Button>
            </Link>
        </div>
    );
};

export default ErrorPage;
