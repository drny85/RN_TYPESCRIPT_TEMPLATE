import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Screen } from '.';
import { useAppSelector } from '../redux/store';

const Loader = () => {
    const theme = useAppSelector((state) => state.theme);
    return (
        <Screen center>
            <ActivityIndicator
                color={theme.PRIMARY_BUTTON_COLOR}
                size="large"
            />
        </Screen>
    );
};

export default Loader;
