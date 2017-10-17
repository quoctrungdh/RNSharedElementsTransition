import React from 'react';
import { View, Image, TouchableWithoutFeedback } from 'react-native';

export default function PhotoItem(props) {
	const { source, width, height } = props;
	return <TouchableWithoutFeedback
		onPress={() => {props.onPhotoOpen(props)}}
	>
		<View>
			<Image
				source={{ url: source.uri }}
				style={{
					width,
					height
				}}
			/>
		</View>
	</TouchableWithoutFeedback>
}