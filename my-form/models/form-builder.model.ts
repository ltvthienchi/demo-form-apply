export interface FormBuilderModel {
  name: string;
  value: string[];
}

export interface QuestionModel {
  allowSpecify: boolean;
  formAnswers: string[];
  formName: string;
  formType: number;
  id: number;
  requiredQuestion: boolean;
}
