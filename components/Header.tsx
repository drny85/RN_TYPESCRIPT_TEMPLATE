import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import React, { FC } from 'react';
import styled from 'styled-components/native';
import FloatingButton from './FloatingButton';
import Row from './Row';
import { SIZES } from '../constants';

interface Props {
	onPressBack: () => void;
	onPress: () => void;
}

const Header: FC<Props> = ({ onPressBack, children, onPress }) => {
	return (
		<HeaderView style={{ paddingHorizontal: SIZES.padding * 0.5 }}>
			<Row horizontalAlign='space-between' verticalAlign='center'>
				<FloatingButton iconName='arrow-left' onPress={onPressBack} />
				{children}
				<FloatingButton iconName='list' onPress={onPress} />
			</Row>
		</HeaderView>
	);
};

export default Header;

interface HeaderProps {
	alignment?: ViewStyle['justifyContent'];
}

const HeaderView = styled.View``;

const styles = StyleSheet.create({});
