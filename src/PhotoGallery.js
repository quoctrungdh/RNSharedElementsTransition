import React from 'react';
import { FlatList, View, Dimensions } from 'react-native';

import DetailsView from './DetailsView';
import PhotoItem from './PhotoItem';

import { processImages, buildRows, normalizeRows } from './utils';

import { DEVICE_WIDTH, BORDER_OFFSET } from './constants';

import Images from './data';

export default class PhotoGallery extends React.Component {
	state = {
		photo: null
	}

	componentWillMount() {
		const processedImages = processImages(Images);
		const builtRows = buildRows(processedImages, DEVICE_WIDTH);
		// TODO: dynamic images data source
		this.rows = normalizeRows(builtRows, DEVICE_WIDTH);
	}

	_onPhotoOpen = (photo) => {
		this.setState({
			photo
		})
	}

	_onPhotoClose = () => {
		this.setState({
			photo: null
		})
	}

	_keyExtractor = (item, index) => index;

	_renderItem = ({item}) => <View
		style={{
			flexDirection: 'row',
			marginBottom: BORDER_OFFSET,
			justifyContent: 'space-between'
		}}
	>
		{
			item.map(image => <PhotoItem key={image.id} onPhotoOpen={this._onPhotoOpen} {...image}/>)
		}
	</View>

	_renderContent = () => {
		return <FlatList
			data={this.rows}
			renderItem={this._renderItem}
			keyExtractor={this._keyExtractor}
		/>
	}

	render() {
		const { photo } = this.state;

		return <View>
			{this._renderContent()}
			<DetailsView photo={photo} onPhotoClose={this._onPhotoClose} />
		</View>
	}
}