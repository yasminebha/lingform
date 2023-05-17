import { DateElementComponent } from '@/app/components/date-element/date-element.component';
import { EmailElementComponent } from '@/app/components/email-element/email-element.component';
import { MultipleChoiceElementComponent } from '@/app/components/multiple-choice-element/multiple-choice-element.component';
import { OneChoiceComponent } from '@/app/components/one-choice/one-choice.component';
import { ShortAnswerComponent } from '@/app/components/short-answer/short-answer.component';
import { QuestionElement } from '@/shared/models/questionElement.model';
import { createReducer, on } from '@ngrx/store';
import * as BuilderActions from '../actions/builder.actions';
export interface BuilderState {
  headerFontFamily: string;
  headerFontSize: number;
  backgroundColor: string;
  ThemeColor:string;
  blocks: Record<string, QuestionElement>;
}

const initialState: BuilderState = {
  headerFontFamily: 'roboto',
  headerFontSize: 16,
  backgroundColor: '#f8f6ff',
  ThemeColor:'#7339ed',
  blocks: {
    '1': {
      form_id: '1',
      kind: MultipleChoiceElementComponent.name,
      questLabel:'what is your name',
      quest_id: '1',
      required: true,
      quest_meta: { options: [] },
    },
    '2': {
      form_id: '1',
      kind: OneChoiceComponent.name,
      quest_id: '2',
      required: false,
      quest_meta: { options: [] },
    },
    '3': {
      form_id: '1',
      kind: EmailElementComponent.name,
      quest_id: '3',
      required: false,
    },
    '4': {
      form_id: '1',
      kind: DateElementComponent.name,
      quest_id: '4',
      required: false,
    },
    '5': {
      form_id: '1',
      kind: ShortAnswerComponent.name,
      quest_id: '5',
      required: false,
    },
  },
};

export const builderReducer = createReducer(
  initialState,
  on(BuilderActions.changeBgColor, (currentState, { bgColor }) => ({
    ...currentState,
    backgroundColor: bgColor,
  })),

  on(BuilderActions.changeColor,(currentState,{ color })=>
  ({
    ...currentState,
      ThemeColor:color,
  })),

  on(BuilderActions.updateBlock, (currentState, { blockId, ...newBlock }) => {
    const oldBlock = currentState.blocks[blockId];

    return {
      ...currentState,
      blocks: {
        ...currentState.blocks,
        [blockId]: {
          ...oldBlock,
          ...newBlock,
        },
      },
    };
  }),
  on(BuilderActions.addBlock,(currentState,{...newBlock})=>{
    return{
      ...currentState,
      blocks:{
        ...currentState.blocks,
        newBlock
      }
    }
  }),
  on(BuilderActions.removeBlock, (currentState, { blockId }) => {
    delete currentState.blocks[blockId];

    return currentState;
  })
);
