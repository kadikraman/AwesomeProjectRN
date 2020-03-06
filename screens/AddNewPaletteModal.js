import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Switch,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';

const COLORS = [
  { colorName: 'AliceBlue', hexCode: '#F0F8FF' },
  { colorName: 'AntiqueWhite', hexCode: '#FAEBD7' },
  { colorName: 'Aqua', hexCode: '#00FFFF' },
  { colorName: 'Aquamarine', hexCode: '#7FFFD4' },
  { colorName: 'Azure', hexCode: '#F0FFFF' },
  { colorName: 'Beige', hexCode: '#F5F5DC' },
  { colorName: 'Bisque', hexCode: '#FFE4C4' },
  { colorName: 'Black', hexCode: '#000000' },
  { colorName: 'BlanchedAlmond', hexCode: '#FFEBCD' },
  { colorName: 'Blue', hexCode: '#0000FF' },
  { colorName: 'BlueViolet', hexCode: '#8A2BE2' },
  { colorName: 'Brown', hexCode: '#A52A2A' },
  { colorName: 'BurlyWood', hexCode: '#DEB887' },
  { colorName: 'CadetBlue', hexCode: '#5F9EA0' },
  { colorName: 'Chartreuse', hexCode: '#7FFF00' },
  { colorName: 'Chocolate', hexCode: '#D2691E' },
  { colorName: 'Coral', hexCode: '#FF7F50' },
  { colorName: 'CornflowerBlue', hexCode: '#6495ED' },
  { colorName: 'Cornsilk', hexCode: '#FFF8DC' },
  { colorName: 'Crimson', hexCode: '#DC143C' },
  { colorName: 'Cyan', hexCode: '#00FFFF' },
  { colorName: 'DarkBlue', hexCode: '#00008B' },
  { colorName: 'DarkCyan', hexCode: '#008B8B' },
  { colorName: 'DarkGoldenRod', hexCode: '#B8860B' },
  { colorName: 'DarkGray', hexCode: '#A9A9A9' },
  { colorName: 'DarkGrey', hexCode: '#A9A9A9' },
  { colorName: 'DarkGreen', hexCode: '#006400' },
  { colorName: 'DarkKhaki', hexCode: '#BDB76B' },
  { colorName: 'DarkMagenta', hexCode: '#8B008B' },
  { colorName: 'DarkOliveGreen', hexCode: '#556B2F' },
  { colorName: 'Darkorange', hexCode: '#FF8C00' },
  { colorName: 'DarkOrchid', hexCode: '#9932CC' },
  { colorName: 'DarkRed', hexCode: '#8B0000' },
  { colorName: 'DarkSalmon', hexCode: '#E9967A' },
  { colorName: 'DarkSeaGreen', hexCode: '#8FBC8F' },
  { colorName: 'DarkSlateBlue', hexCode: '#483D8B' },
  { colorName: 'DarkSlateGray', hexCode: '#2F4F4F' },
  { colorName: 'DarkSlateGrey', hexCode: '#2F4F4F' },
  { colorName: 'DarkTurquoise', hexCode: '#00CED1' },
  { colorName: 'DarkViolet', hexCode: '#9400D3' },
  { colorName: 'DeepPink', hexCode: '#FF1493' },
  { colorName: 'DeepSkyBlue', hexCode: '#00BFFF' },
  { colorName: 'DimGray', hexCode: '#696969' },
  { colorName: 'DimGrey', hexCode: '#696969' },
  { colorName: 'DodgerBlue', hexCode: '#1E90FF' },
  { colorName: 'FireBrick', hexCode: '#B22222' },
  { colorName: 'FloralWhite', hexCode: '#FFFAF0' },
  { colorName: 'ForestGreen', hexCode: '#228B22' },
  { colorName: 'Fuchsia', hexCode: '#FF00FF' },
  { colorName: 'Gainsboro', hexCode: '#DCDCDC' },
  { colorName: 'GhostWhite', hexCode: '#F8F8FF' },
  { colorName: 'Gold', hexCode: '#FFD700' },
  { colorName: 'GoldenRod', hexCode: '#DAA520' },
  { colorName: 'Gray', hexCode: '#808080' },
  { colorName: 'Grey', hexCode: '#808080' },
  { colorName: 'Green', hexCode: '#008000' },
  { colorName: 'GreenYellow', hexCode: '#ADFF2F' },
  { colorName: 'HoneyDew', hexCode: '#F0FFF0' },
  { colorName: 'HotPink', hexCode: '#FF69B4' },
  { colorName: 'IndianRed', hexCode: '#CD5C5C' },
  { colorName: 'Indigo', hexCode: '#4B0082' },
  { colorName: 'Ivory', hexCode: '#FFFFF0' },
  { colorName: 'Khaki', hexCode: '#F0E68C' },
  { colorName: 'Lavender', hexCode: '#E6E6FA' },
  { colorName: 'LavenderBlush', hexCode: '#FFF0F5' },
  { colorName: 'LawnGreen', hexCode: '#7CFC00' },
  { colorName: 'LemonChiffon', hexCode: '#FFFACD' },
  { colorName: 'LightBlue', hexCode: '#ADD8E6' },
  { colorName: 'LightCoral', hexCode: '#F08080' },
  { colorName: 'LightCyan', hexCode: '#E0FFFF' },
  { colorName: 'LightGoldenRodYellow', hexCode: '#FAFAD2' },
  { colorName: 'LightGray', hexCode: '#D3D3D3' },
  { colorName: 'LightGrey', hexCode: '#D3D3D3' },
  { colorName: 'LightGreen', hexCode: '#90EE90' },
  { colorName: 'LightPink', hexCode: '#FFB6C1' },
  { colorName: 'LightSalmon', hexCode: '#FFA07A' },
  { colorName: 'LightSeaGreen', hexCode: '#20B2AA' },
  { colorName: 'LightSkyBlue', hexCode: '#87CEFA' },
  { colorName: 'LightSlateGray', hexCode: '#778899' },
  { colorName: 'LightSlateGrey', hexCode: '#778899' },
  { colorName: 'LightSteelBlue', hexCode: '#B0C4DE' },
  { colorName: 'LightYellow', hexCode: '#FFFFE0' },
  { colorName: 'Lime', hexCode: '#00FF00' },
  { colorName: 'LimeGreen', hexCode: '#32CD32' },
  { colorName: 'Linen', hexCode: '#FAF0E6' },
  { colorName: 'Magenta', hexCode: '#FF00FF' },
  { colorName: 'Maroon', hexCode: '#800000' },
  { colorName: 'MediumAquaMarine', hexCode: '#66CDAA' },
  { colorName: 'MediumBlue', hexCode: '#0000CD' },
  { colorName: 'MediumOrchid', hexCode: '#BA55D3' },
  { colorName: 'MediumPurple', hexCode: '#9370D8' },
  { colorName: 'MediumSeaGreen', hexCode: '#3CB371' },
  { colorName: 'MediumSlateBlue', hexCode: '#7B68EE' },
  { colorName: 'MediumSpringGreen', hexCode: '#00FA9A' },
  { colorName: 'MediumTurquoise', hexCode: '#48D1CC' },
  { colorName: 'MediumVioletRed', hexCode: '#C71585' },
  { colorName: 'MidnightBlue', hexCode: '#191970' },
  { colorName: 'MintCream', hexCode: '#F5FFFA' },
  { colorName: 'MistyRose', hexCode: '#FFE4E1' },
  { colorName: 'Moccasin', hexCode: '#FFE4B5' },
  { colorName: 'NavajoWhite', hexCode: '#FFDEAD' },
  { colorName: 'Navy', hexCode: '#000080' },
  { colorName: 'OldLace', hexCode: '#FDF5E6' },
  { colorName: 'Olive', hexCode: '#808000' },
  { colorName: 'OliveDrab', hexCode: '#6B8E23' },
  { colorName: 'Orange', hexCode: '#FFA500' },
  { colorName: 'OrangeRed', hexCode: '#FF4500' },
  { colorName: 'Orchid', hexCode: '#DA70D6' },
  { colorName: 'PaleGoldenRod', hexCode: '#EEE8AA' },
  { colorName: 'PaleGreen', hexCode: '#98FB98' },
  { colorName: 'PaleTurquoise', hexCode: '#AFEEEE' },
  { colorName: 'PaleVioletRed', hexCode: '#D87093' },
  { colorName: 'PapayaWhip', hexCode: '#FFEFD5' },
  { colorName: 'PeachPuff', hexCode: '#FFDAB9' },
  { colorName: 'Peru', hexCode: '#CD853F' },
  { colorName: 'Pink', hexCode: '#FFC0CB' },
  { colorName: 'Plum', hexCode: '#DDA0DD' },
  { colorName: 'PowderBlue', hexCode: '#B0E0E6' },
  { colorName: 'Purple', hexCode: '#800080' },
  { colorName: 'Red', hexCode: '#FF0000' },
  { colorName: 'RosyBrown', hexCode: '#BC8F8F' },
  { colorName: 'RoyalBlue', hexCode: '#4169E1' },
  { colorName: 'SaddleBrown', hexCode: '#8B4513' },
  { colorName: 'Salmon', hexCode: '#FA8072' },
  { colorName: 'SandyBrown', hexCode: '#F4A460' },
  { colorName: 'SeaGreen', hexCode: '#2E8B57' },
  { colorName: 'SeaShell', hexCode: '#FFF5EE' },
  { colorName: 'Sienna', hexCode: '#A0522D' },
  { colorName: 'Silver', hexCode: '#C0C0C0' },
  { colorName: 'SkyBlue', hexCode: '#87CEEB' },
  { colorName: 'SlateBlue', hexCode: '#6A5ACD' },
  { colorName: 'SlateGray', hexCode: '#708090' },
  { colorName: 'SlateGrey', hexCode: '#708090' },
  { colorName: 'Snow', hexCode: '#FFFAFA' },
  { colorName: 'SpringGreen', hexCode: '#00FF7F' },
  { colorName: 'SteelBlue', hexCode: '#4682B4' },
  { colorName: 'Tan', hexCode: '#D2B48C' },
  { colorName: 'Teal', hexCode: '#008080' },
  { colorName: 'Thistle', hexCode: '#D8BFD8' },
  { colorName: 'Tomato', hexCode: '#FF6347' },
  { colorName: 'Turquoise', hexCode: '#40E0D0' },
  { colorName: 'Violet', hexCode: '#EE82EE' },
  { colorName: 'Wheat', hexCode: '#F5DEB3' },
  { colorName: 'White', hexCode: '#FFFFFF' },
  { colorName: 'WhiteSmoke', hexCode: '#F5F5F5' },
  { colorName: 'Yellow', hexCode: '#FFFF00' },
  { colorName: 'YellowGreen', hexCode: '#9ACD' },
];

const AddNewPaletteModal = ({ navigation }) => {
  const [name, setName] = useState('');
  const [selectedColors, setSelectedColors] = useState([]);

  const handleUpdate = useCallback(
    (color, newValue) => {
      if (newValue === true) {
        setSelectedColors(current => [...current, color]);
      } else {
        setSelectedColors(current =>
          current.filter(c => c.colorName !== color.colorName),
        );
      }
    },
    [selectedColors, setSelectedColors],
  );

  const handleSubmit = useCallback(() => {
    if (!name) {
      Alert.alert('Please add a name to your color palette');
    } else if (selectedColors.length < 3) {
      Alert.alert('Please choose at least 3 colors');
    } else {
      navigation.navigate('Home', {
        newPalette: { paletteName: name, colors: selectedColors },
      });
    }
  }, [name, selectedColors]);

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text>Name of your color palette</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
      </View>
      <FlatList
        style={styles.list}
        data={COLORS}
        keyExtractor={item => item.colorName}
        renderItem={({ item }) => (
          <View style={styles.switch}>
            <Text>{item.colorName}</Text>
            <Switch
              value={
                !!selectedColors.find(
                  color => color.colorName === item.colorName,
                )
              }
              onValueChange={newValue => handleUpdate(item, newValue)}
            />
          </View>
        )}
      />
      <TouchableOpacity style={styles.buttonWrapper} onPress={handleSubmit}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Submit!</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    fontSize: 18,
  },
  switch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  list: {
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  heading: {
    padding: 10,
  },
  buttonWrapper: {
    height: 100,
    marginHorizontal: 10,
  },
  button: {
    height: 40,
    backgroundColor: 'teal',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AddNewPaletteModal;
