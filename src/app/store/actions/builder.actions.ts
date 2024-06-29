import { Form } from '@/shared/models/form.model';
import { QuestionElement } from '@/shared/models/questionElement.model';
import { createAction, props } from '@ngrx/store';
import { BuilderState } from '../reducers/builder';
export const addNewForm = createAction(
  'BUILDER/ADD_NEW_FORM',
  props<{ form: Form }>()
);

export const changeBgColor = createAction(
  'BUILDER/UPDATE',
  props<{ bgColor: string }>()
);

export const changeColor = createAction(
  'BUILDER/UPDATE_BACKGROUD_COLOR',
  props<{ color: string }>()
);
export const updateBuilder = createAction(
  'BUILDER/UPDATE_BUILDER',
  props<Omit<Partial<BuilderState>, 'blocks'>>()
);
export const changeFormId = createAction(
  'BUILDER/UPDATE_FORMID',
  props<{ id: string }>()
);

export const addBlock = createAction(
  'BUILDER/ADD_BLOCK',
  props<{ blockId: string; newBlock: QuestionElement }>()
);

export const removeBlock = createAction(
  'BUILDER/REMOVE_BLOCK',
  props<{ blockId: string }>()
);
export const updateBuilderTitle = createAction(
  'BUILDER/UPDATE_BUILDER_TITLE',
  props<{ title: string }>()
);
export const updateBuilderDescription = createAction(
  'BUILDER/UPDATE_BUILDER_DESCRIPTION',
  props<{ Description: string }>()
);

export const updateBlock = createAction(
  'BUILDER/UPDATE_BLOCK',
  props<{ blockId: string } & Partial<QuestionElement>>()
);

export const swapBlock = createAction(
  'BUILDER/SWAP_BLOCKS',
  props<{ blockId: string; direction: 'up' | 'down' }>()
);

export const updateBlockOrder = createAction(
  'BUILDER/UPDATE_BLOCK_ORDER',
  props<{ blockOrder: string[] }>()
);  