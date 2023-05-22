import { QuestionElement } from '@/shared/models/questionElement.model';
import { createReducer, on } from '@ngrx/store';
import * as BuilderActions from '../actions/builder.actions';

export interface BuilderState {
  form_id: string | null;
  title: string;
  description: string;
  headerFontFamily?: string;
  headerFontSize?: number;
  backgroundColor?: string;
  ThemeColor?: string;
  mode: 'edit' | 'live';
  blocks: Record<string, QuestionElement>;
}

const initialState: BuilderState = {
  form_id: '',
  title: 'Untitled Form',
  description: '',
  headerFontFamily: 'Roboto',
  headerFontSize: 16,
  backgroundColor: '#f8f6ff',
  ThemeColor: '#7339ed',
  mode: 'edit',
  blocks: {},
};

export const builderReducer = createReducer(
  initialState,
  on(BuilderActions.changeFormId, (currentState, { id }) => ({
    ...currentState,
    form_id: id,
  })),
  on(BuilderActions.changeBgColor, (currentState, { bgColor }) => ({
    ...currentState,
    backgroundColor: bgColor,
  })),

  on(BuilderActions.changeColor, (currentState, { color }) => ({
    ...currentState,
    ThemeColor: color,
  })),
  on(BuilderActions.updateBuilderTitle, (currentState, { title }) => ({
    ...currentState,
    title: title,
  })),
  on(
    BuilderActions.updateBuilderDescription,
    (currentState, { Description }) => ({
      ...currentState,
      description: Description,
    })
  ),
  on(BuilderActions.updateBuilder, (currentState, newState) => ({
    ...currentState,
    ...newState,
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
  on(BuilderActions.addBlock, (currentState, { blockId, newBlock }) => {
    return {
      ...currentState,
      blocks: {
        ...currentState.blocks,
        [blockId]: newBlock,
      },
    };
  }),
  on(BuilderActions.removeBlock, (currentState, { blockId }) => {
    delete currentState.blocks[blockId];
    return currentState;
  })
);
