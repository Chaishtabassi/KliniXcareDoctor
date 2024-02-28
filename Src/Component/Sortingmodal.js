import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const Sortingmodal = ({ visible, onClose }) => {
  const options = ['Price:Low to High', 'Price :High to Low', 'Customer Rating', 'Most Popular'];
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelection = (option) => {
    setSelectedOption(option === selectedOption ? null : option);
  };

  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sorting By</Text>
            {options.map((option, index) => (
              <TouchableOpacity key={index} onPress={() => handleOptionSelection(option)}>
                <View style={styles.optionContainer}>
                  <Text style={styles.optionText}>{option}</Text>
                  <View style={styles.circle}>
                    {selectedOption === option && <View style={styles.checkmark} />}
                  </View>
                </View>
                {index !== options.length - 1 && <View style={styles.separator} />}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default Sortingmodal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Domine-Bold',
    color: 'black',
    marginBottom: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding:5
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#49b2e9',
  },
  optionText: {
    fontSize: 16,
    color: 'black',
    marginVertical: 10,
    fontFamily:'Domine-Medium'
  },
  separator: {
    height: 1,
    backgroundColor: 'lightgray',
  },
});
