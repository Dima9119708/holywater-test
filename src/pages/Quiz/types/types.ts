type QuizType = 'single-select' | 'single-select-image' | 'multiple-select' | 'bubble' | 'email';

export interface MainProps {
    question: QuizResponse;
}

export type Answers = { id: string; translateKey: string; img?: string }[];

export interface QuizResponse {
    id: string;
    type: QuizType;
    title: string;
    subtitle: string | null;
    answers: Answers;
}

export interface TemplateProps {
    question: QuizResponse;
}
