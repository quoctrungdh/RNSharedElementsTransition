import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';

import { DEVICE_WIDTH } from './constants';

export default class DetailsView extends React.Component {
  state = {
    localPhoto: null
  }

  componentWillReceiveProps(nextProps) {
    const { photo } = nextProps;

    if (photo) {
      this.setState({
        localPhoto: photo
      })
    }
  }

  render() {
    const { localPhoto } = this.state;
    const { onPhotoClose } = this.props;

    if(localPhoto) {
      const { source, postedBy } = localPhoto;
      return <View style={StyleSheet.absoluteFill}>
        <Image
          source={{
            url: source.uri
          }}
          style={{
            width: DEVICE_WIDTH,
            height: 300
          }}
        />
        <View
          style={styles.body}
        >
          <Text style={styles.title}>
            {postedBy}
          </Text>
          <Text style={styles.description}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was
            popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of
            Lorem Ipsum.
          </Text>
        </View>
        <View
          style={{
            position: 'absolute',
            top: 20,
            left: 20
          }}
        >
          <TouchableOpacity
            onPress={() => {onPhotoClose(localPhoto)}}
            style={styles.closeBtn}
          >
            <Text style={styles.closeBtnText} >Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    }

    return <View />
  }
}

const styles = StyleSheet.create({
  title: {
    color: '#000',
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 50
  },
  description: {
    color: '#333',
    fontSize: 14
  },
  body: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff'
  },
  closeBtn: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#fff',
    borderRadius: 5,
    padding: 10
  },
  closeBtnText: {
    color: '#fff'
  }
})