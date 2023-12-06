"use client";
import { QuizQuestion, Quiz } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

export function EditQuizDialog({
  propQuestions,
  propQuizName,
}: {
  propQuestions: QuizQuestion[];
  propQuizName: string;
}) {
  const [questions, setQuestions] = useState<QuizQuestion[]>(propQuestions);
  const [quizName, setQuizName] = useState(propQuizName);
  const [isQuizNew, setIsQuizNew] = useState(true);
  const router = useRouter();
  const { courseName } = router.query;

  useEffect(() => {
    setQuestions(propQuestions);
    setIsQuizNew(false);
  }, [propQuestions]);

  const handleSubmit = async () => {
    const quiz: Quiz = {
      name: quizName,
      questions: questions,
      totalPoints: questions.reduce((acc, q) => acc + q.points, 0),
      submissions: {},
    };
    try {
      const res = fetch(`/api/${courseName}/saveQuiz`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quiz),
      });
      console.log(await res);
    } catch (err) {
      console.error(err);
    }
    if (propQuizName.length == 0) {
      // If creating a new quiz, reset the questions and
      // name fields whenever the dialog is closed.
      setQuestions([]);
      setQuizName("");
    }
  };

  const defaultMCQQuestion: QuizQuestion = {
    questionNum: questions.length + 1,
    questionType: "MCQ",
    question: "",
    options: ["", "", "", ""], // Assuming a default of 4 options
    answer: 0, // Assuming no answer selected by default
    points: 0, // Default points value
  };

  const defaultFRQQuestion: QuizQuestion = {
    questionNum: questions.length + 1,
    questionType: "FRQ",
    question: "",
    options: [],
    answer: "",
    points: 0, // Default points value for FRQ
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

  const handlePointsChange = (index: number, newPoints: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].points = parseInt(newPoints, 10) || 0;
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (
    index: number,
    newAnswer: string,
    isMCQ: boolean
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].answer = isMCQ
      ? updatedQuestions[index].options.indexOf(newAnswer) + 1
      : newAnswer;
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

  return (
    <DialogContent className="sm:max-w-[60%]">
      <DialogHeader>
        <DialogTitle>Create new Quiz</DialogTitle>
        <DialogDescription>
          Add details and create when you&apos;re done.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-row p-2 items-center gap-2">
        Name
        <Input
          value={quizName}
          onChange={(e) => setQuizName(e.target.value)}
          placeholder="Type your quiz name here."
        />
      </div>
      <ScrollArea className="h-[600px] w-[800px] rounded-md border p-4">
        <div>
          {questions.map((q, qIndex) => (
            <div
              className="flex flex-col rounded-md border m-5 p-4 "
              key={q.questionNum}
            >
              <div className="flex flex-row p-2 items-center gap-2">
                {q.questionNum}.
                <Input
                  value={q.question}
                  onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                  placeholder="Type your question here."
                />
              </div>
              <div className="flex flex-row p-2 items-center gap-2">
                points:
                <Input
                  className="w-16 h-8 p-2"
                  type="number"
                  value={q.points}
                  onChange={(e) => handlePointsChange(qIndex, e.target.value)}
                  placeholder="0"
                />
              </div>

              {q.questionType == "MCQ" && typeof q.answer === "number" ? (
                <RadioGroup
                  defaultValue={q.options[q.answer]}
                  onValueChange={(e) => handleAnswerChange(qIndex, e, true)}
                >
                  {q.options.map((option, oIndex) => (
                    <div
                      className="flex items-center space-x-2 p-2"
                      key={`option-${q.questionNum}-${oIndex}`}
                    >
                      <RadioGroupItem value={option} />
                      {/* <Label htmlFor="option">{option}</Label> */}
                      <Input
                        value={option}
                        placeholder={`Option ${oIndex + 1}`}
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
                </RadioGroup>
              ) : (
                <Textarea
                  value={q.answer}
                  onChange={(e) =>
                    handleAnswerChange(qIndex, e.target.value, false)
                  }
                  placeholder="Type the FRQ answer here."
                />
              )}

              <Button
                className="w-20 h-8 p-2 m-2"
                onClick={() => handleDeleteQuestion(q.questionNum)}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
        <Button className="w-20 h-8 p-2 m-2" onClick={addMCQQuestion}>
          ADD MCQ
        </Button>
        <Button className="w-20 h-8 p-2 m-2" onClick={addFRQQuestion}>
          ADD FRQ
        </Button>
      </ScrollArea>
      <DialogClose asChild>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            {propQuizName ? `Save Quiz` : `Create Quiz`}
          </Button>
        </DialogFooter>
      </DialogClose>
    </DialogContent>
  );
}
