import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const questions = [
        {
            question: 'What is the capital of France?',
            options: ['Paris', 'London', 'Berlin', 'Rome'],
            correctAnswer: 'Paris',
        },
        {
            question: 'What is the largest planet in our solar system?',
            options: ['Earth', 'Saturn', 'Jupiter', 'Uranus'],
            correctAnswer: 'Jupiter',
        },
        {
            question: 'Who painted the Mona Lisa?',
            options: ['Leonardo da Vinci', 'Michelangelo', 'Raphael', 'Caravaggio'],
            correctAnswer: 'Leonardo da Vinci',
        },
    ];

    const handleAnswer = (answer: string) => {
        if (answer === questions[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResult(true);
        }
    };

    const handleRestart = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowResult(false);
    };

    return (
        <View style={styles.container}>
            {showResult ? (
                <View>
                    <Text style={styles.resultText}>Quiz Result:</Text>
                    <Text style={styles.resultText}>You scored {score} out of {questions.length}</Text>
                    <Button title="Restart Quiz" onPress={handleRestart} />
                </View>
            ) : (
                <View>
                    <Text style={styles.questionText}>{questions[currentQuestion].question}</Text>
                    {questions[currentQuestion].options.map((option, index) => (
                        <Button key={index} title={option} onPress={() => handleAnswer(option)} />
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    questionText: {
        fontSize: 24,
        marginBottom: 20,
    },
    resultText: {
        fontSize: 24,
        marginBottom: 10,
    },
});

export default Quiz;