import React, {useState} from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {height, width} from '../../Authentication/Siigninscreen';
import Backbutton from '../../Component/Backbutton';

const Faqscreen = ({navigation}) => {
  const faqData = [
    {
      //1
      question: 'Can I review patient medical records through the app?',
      answer:
        'Yes, the app provides access to patient medical records, allowing healthcare providers to review relevant information before and during consultations.',
    },
    {
      //2
      question:
        'How do I update my profile information on the doctor-side app?',
      answer:
        'You can update your profile information, including credentials and contact details, by accessing the profile settings within the app.',
    },
    {
      //3
      question: 'What type of support is available for doctors using the app?',
      answer:
        'Yes, the app provides access to patient medical records, allowing healthcare providers to review relevant information before and during consultations.',
    },
    {
      //4
      question: 'Can I review patient medical records through the app',
      answer:
        'We offer technical support and assistance. For any issues or questions, please contact our dedicated support team through the app.',
    },
    {
      //5
      question: 'How are prescriptions managed through the doctor-side app?',
      answer:
        'Healthcare providers can electronically send prescriptions to a patient through the app.',
    },
  ];
  const handleBackButtonPress = () => {
    navigation.goBack();
  };
  const [expandedItems, setExpandedItems] = useState({});

  const toggleItem = question => {
    setExpandedItems(prevState => ({
      ...prevState,
      [question]: !prevState[question],
    }));
  };

  const renderArrowIcon = question => (
    <Image
      resizeMode="contain"
      style={{height: height * 0.05, width: width * 0.05}}
      source={
        expandedItems[question]
          ? require('../../Assets/ArrowUp.png')
          : require('../../Assets/Arrow.png')
      }
    />
  );

  const renderFAQItem = ({item}) => (
    <View style={styles.faqItem}>
      <TouchableOpacity onPress={() => toggleItem(item.question)}>
        <View style={styles.questionContainer}>
          <Text style={styles.question}>{item.question}</Text>
          {renderArrowIcon(item.question)}
        </View>
      </TouchableOpacity>
      {expandedItems[item.question] && (
        <Text style={styles.answer}>{item.answer}</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
         <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#4e93e1',
          height: '7%',
        }}>
      <Backbutton/>
        <View
          style={{
            height: height * 0.08,
            width: width * 0.9,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              margin: 10,
              fontSize: 18,
              color: '#FFF',
              fontFamily: 'Domine-Bold',
              textAlign: 'center',
            }}>
            FAQ
          </Text>
        </View>
      </View>
      <FlatList
        data={faqData}
        renderItem={renderFAQItem}
        keyExtractor={item => item.question}
        style={{padding: 15}}
      />
    </View>
  );
};

export default Faqscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#49b2e9',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  title: {
    flex: 1,
    fontSize: 20,
    color: '#FFF',
    fontWeight: '500',
    textAlign: 'center',
    alignSelf: 'center',
  },
  textContainer: {
    margin: 10,
    padding: 10,
    alignItems: 'center',
  },
  faqItem: {
    marginBottom: 16,
  },
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  answer: {
    fontSize: 16,
    marginTop: 8,
    color: '#555',
  },
});
