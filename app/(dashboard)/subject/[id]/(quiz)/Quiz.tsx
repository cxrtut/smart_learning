import {View,Text,TouchableOpacity,StyleSheet,ScrollView,ActivityIndicator,} from "react-native";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useOnboarding } from "@/context/onboardingContext";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "@/components/CustomHeader";
import colors from "@/constants/colors";
import OpenAI from "openai";
import { useUser } from "@clerk/clerk-expo";

const Quiz = () => {
  const { topic } = useLocalSearchParams<{ topic: string }>();
  const { activeSubject } = useOnboarding();
  const { user } = useUser();
  const router = useRouter();
  const [questions, setQuestions] = useState<
    { question: string; options: string[]; correctAnswer: string }[]
  >([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [error, setError] = useState<string | null>(null);
  const [showScore, setShowScore] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const openai = new OpenAI({
      apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
    });

    const generateQuiz = async () => {
      setLoading(true);
      try {
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are an assistant that generates quiz questions.",
            },
            {
              role: "user",
              content: `Create a multiple-choice quiz on the topic "${topic}". Provide exactly 4 questions, each with 4 answer options and a correct answer. Return the result in a JSON array format where each object has this structure: { "question": "string", "options": ["string", "string", "string", "string"], "correctAnswer": "string" }.`,
            },
          ],
          max_tokens: 500,
        });

        const content = response.choices[0]?.message?.content;
        if (!content) {
          throw new Error("No response content from OpenAI.");
        }

        // Parse the OpenAI response into JSON
        const parsedQuestions = JSON.parse(content);

        // Validate the parsed data
        if (
          Array.isArray(parsedQuestions) &&
          parsedQuestions.every(
            (q) =>
              q.question &&
              Array.isArray(q.options) &&
              q.options.length === 4 &&
              typeof q.correctAnswer === "string"
          )
        ) {
          setQuestions(parsedQuestions);
        } else {
          throw new Error("Invalid data format from OpenAI.");
        }
      } catch (err) {
        console.error("Error generating quiz:", err);
        setError("Failed to generate quiz. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    generateQuiz();
  }, [topic]);

  const handleOptionSelect = (questionIndex: number, option: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: option }));
  };

  const calculateScore = () => {
    const score = questions.reduce((total, question, index) => {
      return total + (selectedAnswers[index] === question.correctAnswer ? 1 : 0);
    }, 0);
    return score;
  };

  const handleFinishQuiz = () => {
    setShowScore(true);
  };

  if (loading) {
    return (
      <SafeAreaView style={{ backgroundColor: colors.PRIMARY }} className="flex h-full w-full">
        <CustomHeader
          title="Quiz"
          subtitle={activeSubject?.subjectName}
          showBackButton={true}
          headerStyles="pr-3"
        />
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ backgroundColor: colors.PRIMARY }} className="flex h-full w-full">
      <CustomHeader
        title="Quiz"
        subtitle={activeSubject?.subjectName}
        showBackButton={true}
        headerStyles="pr-3"
      />
      <ScrollView style={{ padding: 15 }}>
        {error ? (
          <Text style={{ color: "red" }}>{error}</Text>
        ) : showScore ? (
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold", color: colors.TEXT_WHITE }}>
              Quiz Completed!
            </Text>
            <Text style={{ fontSize: 20, marginTop: 10, color: colors.TEXT_WHITE }}>
              Your Score: {calculateScore()} / {questions.length}
            </Text>
            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => router.back()} // Navigate back
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {questions.map((questionData, index) => (
              <View key={index} style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
                  {questionData.question}
                </Text>
                {questionData.options.map((option, optionIndex) => (
                  <TouchableOpacity
                    key={optionIndex}
                    style={[
                      styles.optionButton,
                      selectedAnswers[index] === option && styles.selectedOption,
                    ]}
                    onPress={() => handleOptionSelect(index, option)}
                  >
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
                {selectedAnswers[index] && (
                  <Text
                    style={{
                      marginTop: 10,
                      color:
                        selectedAnswers[index] === questionData.correctAnswer ? "green" : "red",
                    }}
                  >
                    {selectedAnswers[index] === questionData.correctAnswer
                      ? "Correct!"
                      : `Correct Answer: ${questionData.correctAnswer}`}
                  </Text>
                )}
              </View>
            ))}
            <TouchableOpacity
              style={styles.finishButton}
              onPress={handleFinishQuiz}
              disabled={Object.keys(selectedAnswers).length !== questions.length}
            >
              <Text style={styles.finishButtonText}>
                {Object.keys(selectedAnswers).length === questions.length
                  ? "Finish Quiz"
                  : "Answer All Questions"}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  optionButton: {
    backgroundColor: colors.SECONDARY,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  selectedOption: {
    backgroundColor: colors.PRIMARY_DARK,
  },
  optionText: {
    color: colors.TEXT_WHITE,
    textAlign: "center",
    fontSize: 16,
  },
  finishButton: {
    backgroundColor: colors.PRIMARY_DARK,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  finishButtonText: {
    color: colors.TEXT_WHITE,
    fontSize: 18,
    fontWeight: "bold",
  },
  doneButton: {
    backgroundColor: colors.SECONDARY,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  doneButtonText: {
    color: colors.TEXT_WHITE,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Quiz;
