import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import Paginator from './components/Paginator';
import { MultiPageScreenProps } from './interfaces/MultiPageScreenProps';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import SideNavigationItem from './components/SideNavigationItem';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import Icon from 'react-native-vector-icons/Ionicons';

interface ComponentProps {
  screensDetailsList: MultiPageScreenProps[];
  navigation?: NativeStackNavigationProp<RootStackParamList>;
  backToName?: string;
  interactionButtons?: {
    title: string;
    isActive: boolean;
    icon: string;
    color: string;
    shadowColor: string;
    onPress: () => void;
  }[];
  programmaticNavigationOnly?: boolean;
  currentProgrammaticIndex?: number;
}

const MultiPageContainer = ({
  screensDetailsList,
  backToName,
  navigation,
  interactionButtons,
  programmaticNavigationOnly,
  currentProgrammaticIndex,
}: ComponentProps) => {
  const width = useWindowDimensions().width - 250;
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideData = screensDetailsList.map((screen) => screen.name);

  const scrollX = useRef(new Animated.Value(0)).current;
  const slideRef = useRef<FlatList>(null);

  // Setts the current index when Flat-list changes
  const viewableItemChanged = useRef(
    ({ viewableItems }: { viewableItems: any }) => {
      setCurrentIndex(viewableItems[0].index);
    },
  ).current;

  // Defines threshold until screen switch
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const linearGradientColorLeft = [
    'rgba(255, 255, 255, 1)',
    'rgba(255, 255, 255, 1)',
    'rgba(255, 255, 255, 1)',
    'rgba(255, 255, 255, 0.8)',
    'rgba(255, 255, 255, 0.0)',
  ];
  const linearGradientColorRight = [
    'rgba(255, 255, 255, 0)',
    'rgba(255, 255, 255, 0.0)',
    'rgba(255, 255, 255, 0.0)',
    'rgba(255, 255, 255, 0.2)',
    'rgba(255, 255, 255, 1)',
  ];

  function getScreen(screenName: string): JSX.Element {
    return (
      <View
        style={{
          width,
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        {/* TODO: Replace with 404/Error page */}
        {screensDetailsList[
          screensDetailsList.findIndex((screen) => screen.name == screenName)
        ].page || <Text>Error</Text>}
      </View>
    );
  }

  useEffect(() => {
    if (programmaticNavigationOnly && currentProgrammaticIndex) {
      slideRef.current?.scrollToIndex({
        index: currentProgrammaticIndex,
        animated: true,
      });
    }
  }, [currentProgrammaticIndex]);

  return (
    <View style={styles.uploadContainer}>
      {/* Start Left Content */}
      <View
        style={{
          paddingHorizontal: 20,
          height: '100%',
          width: 250,
          flexDirection: 'column',
          justifyContent: 'space-between',
          paddingTop: 40,
          paddingBottom: 20,
        }}
      >
        {/* Back to page before */}
        {backToName && navigation ? (
          <TouchableOpacity
            onPress={() => navigation?.goBack()}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
          >
            <FontAwesome name={'chevron-left'} color={'#737373'} />
            <Text style={{ fontWeight: '600', color: '#3d3d3d' }}>
              Back to {backToName}
            </Text>
          </TouchableOpacity>
        ) : (
          <View></View>
        )}

        {/* Navigation items */}
        <View style={{ gap: 10 }}>
          {screensDetailsList.map((screenDetails, index) => (
            <SideNavigationItem
              key={index}
              title={screenDetails.title}
              icon={screenDetails.icon}
              isActive={currentIndex == index}
              setActive={() => {
                if (!programmaticNavigationOnly) {
                  slideRef.current?.scrollToIndex({
                    index: index,
                    animated: true,
                  });
                }
              }}
            />
          ))}
        </View>

        {/* Interaction Button */}
        <View style={{ gap: 10, flexDirection: 'row', flexWrap: 'wrap' }}>
          {interactionButtons &&
            interactionButtons.map((button, index) => (
              <TouchableOpacity
                disabled={!button.isActive}
                key={index}
                onPress={() => button.onPress()}
                style={{
                  opacity: button.isActive ? 1 : 0.3,
                  flexGrow: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 7,
                  paddingVertical: 8,
                  paddingHorizontal: 15,
                  borderRadius: 5,
                  backgroundColor: button.color,
                  shadowColor: button.shadowColor,
                  shadowOpacity: 1,
                  shadowRadius: 6,
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                }}
              >
                <Icon name={button.icon} size={18} color={'#000'} />
                <Text style={{ color: '#000', fontWeight: '600' }}>
                  {button.title}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
      </View>
      {/* End Left Content */}

      <LinearGradient
        style={{
          position: 'absolute',
          zIndex: 10000,
          left: 250,
          bottom: 0,
          width: 100,
          height: '100%',
        }}
        start={{ x: -1, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={linearGradientColorLeft}
        pointerEvents={'none'}
      />

      {/* Start Right Content */}
      <View style={styles.rightContainer}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={slideData}
            keyExtractor={(item, index) => String(index)}
            renderItem={(item) => getScreen(item.item)}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              {
                useNativeDriver: false,
              },
            )}
            scrollEventThrottle={0}
            scrollEnabled={false}
            onViewableItemsChanged={viewableItemChanged}
            viewabilityConfig={viewConfig}
            ref={slideRef}
          />
        </View>

        <Paginator data={slideData} scrollX={scrollX} />
      </View>
      {/* End Right content */}

      <LinearGradient
        style={{
          position: 'absolute',
          zIndex: 10000,
          right: 0,
          bottom: 0,
          width: 100,
          height: '100%',
        }}
        start={{ x: -1, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={linearGradientColorRight}
        pointerEvents={'none'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  uploadContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  leftContainer: {
    width: '35%',
    backgroundColor: 'white',
    height: '100%',
    justifyContent: 'space-between',
    paddingBottom: 30,
    paddingTop: 50,
    paddingHorizontal: 40,
    borderBottomRightRadius: 40,
    borderTopRightRadius: 40,
    shadowRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {
      width: 10,
      height: 0,
    },
  },
  headerContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  subBrandingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subBrandingText: {
    fontWeight: '500',
    fontSize: 12,
    color: '#363636',
  },
  subBrandEmailContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '65%',
  },
});

export default MultiPageContainer;
