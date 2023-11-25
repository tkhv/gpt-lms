"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { ScrollArea } from "@/components/ui/scroll-area";

import { Dispatch, SetStateAction, useState } from "react";
import { Quiz, QuizQuestion } from "@/lib/types";

interface quizQuestionsProps {
  questions: QuizQuestion[];
  setQuestions: Dispatch<SetStateAction<QuizQuestion[]>>;
}

const QuizEditor: React.FC<quizQuestionsProps> = ({
  questions,
  setQuestions,
}) => {
  //   const [questions, setQuestions] = useState<QuizQuestion[]>(questions);

  const defaultMCQQuestion: QuizQuestion = {
    questionNum: questions.length + 1,
    questionType: "MCQ",
    question: "",
    options: ["", "", "", ""], // Assuming a default of 4 options
    answer: 1, // Assuming no answer selected by default
    points: 10, // Default points value
  };

  const defaultFRQQuestion: QuizQuestion = {
    questionNum: questions.length + 1,
    questionType: "FRQ",
    question: "",
    options: [],
    answer: "",
    points: 80, // Default points value for FRQ
  };

  // Function to add a new MCQ question
  const addMCQQuestion = () => {
    setQuestions(
      questions.concat({
        ...defaultMCQQuestion,
        questionNum: questions.length + 1,
      })
    );
  };

  // Function to add a new FRQ question
  const addFRQQuestion = () => {
    setQuestions(
      questions.concat({
        ...defaultFRQQuestion,
        questionNum: questions.length + 1,
      })
    );
  };

  const deleteQuestion = (questionNum: number) => {
    setQuestions(questions.filter((q) => q.questionNum !== questionNum));
  };

  // Function to handle reordering the question numbers after deletion
  const reorderQuestions = (questions: QuizQuestion[]) => {
    return questions.map((q, index) => ({
      ...q,
      questionNum: index + 1, // Reset question numbers to be in order
    }));
  };

  // Adjusted delete function that also reorders question numbers after deletion
  const handleDeleteQuestion = (questionNum: number) => {
    const updatedQuestions = questions.filter(
      (q) => q.questionNum !== questionNum
    );
    setQuestions(reorderQuestions(updatedQuestions));
  };

  const handleQuestionChange = (index: number, newText: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = newText;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (
    questionIndex: number,
    optionIndex: number,
    newOptionText: string
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = newOptionText;
    setQuestions(updatedQuestions);
  };

  const addOption = (questionIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push("");
    setQuestions(updatedQuestions);
  };

  const deleteOption = (questionIndex: number, optionIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(updatedQuestions);
  };

  const handleSubmit = () => {
    /*
    1. Need a popup to make sure the Ta finished editing.
    2. update the quesitons
    3. back to the previous page
    */
  };

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <ScrollArea className="h-[600px] w-[800px] rounded-md border p-4">
        <div>
          {questions.map((q, qIndex) => (
            <div
              className="flex flex-col rounded-md border m-5 p-4 "
              key={q.questionNum}
            >
              {q.questionNum}.
              <Input
                value={q.question}
                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                placeholder="Type your question here."
              />
              {q.questionType == "MCQ" && (
                <>
                  {q.options.map((option, oIndex) => (
                    <div
                      className="flex items-center space-x-2 p-2"
                      key={`option-${q.questionNum}-${oIndex}`}
                    >
                      <Input
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(qIndex, oIndex, e.target.value)
                        }
                      />
                      <Button
                        className="w-8 h-8 p-2"
                        onClick={() => deleteOption(qIndex, oIndex)}
                      >
                        -
                      </Button>
                    </div>
                  ))}
                  <div className="flex justify-center">
                    <Button
                      className="w-8 h-8"
                      onClick={() => addOption(qIndex)}
                    >
                      +
                    </Button>
                  </div>
                </>
              )}
              <Button
                className="w-30 h-8 p-2"
                onClick={() => handleDeleteQuestion(q.questionNum)}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
        <Button onClick={addMCQQuestion}>ADD MCQ</Button>
        <Button onClick={addFRQQuestion}>ADD FRQ</Button>
      </ScrollArea>
      <Button onClick={handleSubmit}>submit</Button>
    </div>
  );
};

export default QuizEditor;
