import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const Toast = ({ message, visible, duration = 3000, backgroundColor = '#333', position = 'bottom' }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        { backgroundColor, opacity: fadeAnim },
        position === 'bottom' ? styles.bottomPosition : styles.topPosition,
      ]}
    >
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 20,
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 9999,
  },
  toastText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  bottomPosition: {
    bottom: 50,
  },
  topPosition: {
    top: 50,
  },
});
export default Toast
