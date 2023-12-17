import {Image, Text, View} from 'react-native';

const SharedWithIcon = (props: {uri: string, moreHidden?: boolean}) => {
  return (
    <View style={{
      borderRadius: 9999,
      backgroundColor: '#fff',
      height: 30,
      width: 30,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Image
        source={{uri: props.uri}}
        style={{
          height: 25,
          width: 25,
          borderRadius: 9999,
        }}/>
      {props.moreHidden && (
        <View style={{
          position: 'absolute',
          top: 2,
          left: 2,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
          height: 26,
          width: 26,
          borderRadius: 9999,
          backgroundColor: 'rgba(9,9,9,0.7)'
        }}>
          <Text style={{marginBottom: 10, fontWeight: '900', fontSize: 16, color: '#fff'}}>...</Text>
        </View>
      )}
    </View>
  )
}

export default SharedWithIcon
