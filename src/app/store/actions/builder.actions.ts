import { Form } from '@/shared/models/form.model';
import { QuestionElement } from '@/shared/models/questionElement.model';
import { createAction, props } from '@ngrx/store';

export const changeBgColor = createAction(
  'BUILDER/UPDATE_BACKGROUD_COLOR',
  props<{ bgColor: string }>()
);
export const changeColor = createAction(
  'BUILDER/UPDATE_BACKGROUD_COLOR',
  props<{ color: string }>()
);

export const addBlock = createAction(
  'BUILDER/ADD_BLOCK',
  props<{ blockId: string ,newBlock:QuestionElement}>()
);

export const removeBlock = createAction(
  'BUILDER/REMOVE_BLOCK',
  props<{ blockId: string }>()
);
export const updateBuilderTitle = createAction(
  'BUILDER/UPDATE_BUILDER_TITLE',
  props<{title:string}>()
);
export const updateBuilderDescription = createAction(
  'BUILDER/UPDATE_BUILDER_DESCRIPTION',
  props<{Description:string}>()
);

export const updateBlock = createAction(
  'BUILDER/UPDATE_BLOCK',
  props<{ blockId: string } & Partial<QuestionElement>>()
);

export const swapBlock = createAction(
  'BUILDER/SWAP_BLOCKS',
  props<{ blockId: string; direction: 'up' | 'down' }>()
);