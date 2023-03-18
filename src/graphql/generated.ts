import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type GoalInputPartial = {
  id: Scalars['ID'];
};

export type GroupLesson = {
  __typename?: 'GroupLesson';
  id: Scalars['ID'];
  lessonSet: Array<Lesson>;
  notes?: Maybe<Scalars['String']>;
  school: Schools;
  timeIn: Scalars['DateTime'];
  timeOut?: Maybe<Scalars['DateTime']>;
  user: Users;
};

export type GroupLessonInput = {
  lesson_set: Array<LessonInputPartial>;
  notes?: InputMaybe<Scalars['String']>;
  school: SchoolInputPartial;
  timeIn: Scalars['DateTime'];
  timeOut?: InputMaybe<Scalars['DateTime']>;
  user: UserInputPartial;
};

export type GroupLessonInputPartial = {
  id: Scalars['ID'];
  lesson_set?: InputMaybe<Array<LessonInputPartial>>;
  notes?: InputMaybe<Scalars['String']>;
  school?: InputMaybe<SchoolInputPartial>;
  timeIn?: InputMaybe<Scalars['DateTime']>;
  timeOut?: InputMaybe<Scalars['DateTime']>;
  user?: InputMaybe<UserInputPartial>;
};

export type Lesson = {
  __typename?: 'Lesson';
  group_lesson: GroupLesson;
  id: Scalars['ID'];
  notes?: Maybe<Scalars['String']>;
  ratingSet: Array<Ratings>;
  school: Schools;
  student: Students;
  timeIn: Scalars['DateTime'];
  timeOut?: Maybe<Scalars['DateTime']>;
  user: Users;
};

export type LessonInput = {
  notes?: InputMaybe<Scalars['String']>;
  school: SchoolInputPartial;
  student: StudentInputPartial;
  timeIn: Scalars['DateTime'];
  timeOut?: InputMaybe<Scalars['DateTime']>;
  user: UserInputPartial;
};

export type LessonInputPartial = {
  id: Scalars['ID'];
  notes?: InputMaybe<Scalars['String']>;
  ratingSet?: InputMaybe<Array<RatingInputPartial>>;
  school?: InputMaybe<SchoolInputPartial>;
  student?: InputMaybe<StudentInputPartial>;
  timeIn?: InputMaybe<Scalars['DateTime']>;
  timeOut?: InputMaybe<Scalars['DateTime']>;
  user?: InputMaybe<UserInputPartial>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createGroupLesson: GroupLesson;
  createLesson: Lesson;
  updateGroupLesson: GroupLesson;
  updateLesson: Lesson;
};


export type MutationCreateGroupLessonArgs = {
  schoolId?: InputMaybe<Scalars['ID']>;
  studentIds?: InputMaybe<Array<Scalars['ID']>>;
  userId?: InputMaybe<Scalars['ID']>;
};


export type MutationCreateLessonArgs = {
  input: LessonInput;
};


export type MutationUpdateGroupLessonArgs = {
  input: GroupLessonInputPartial;
};


export type MutationUpdateLessonArgs = {
  input: LessonInputPartial;
};

export type Query = {
  __typename?: 'Query';
  goals: Array<Goals>;
  groupLesson: GroupLesson;
  groupLessons: Array<GroupLesson>;
  lesson: Lesson;
  lessons: Array<Lesson>;
  openLesson: Lesson_Any;
  students: Array<Students>;
  user: Users;
};


export type QueryGroupLessonArgs = {
  pk?: InputMaybe<Scalars['ID']>;
};


export type QueryGroupLessonsArgs = {
  userId?: InputMaybe<Scalars['ID']>;
};


export type QueryLessonArgs = {
  pk?: InputMaybe<Scalars['ID']>;
};


export type QueryLessonsArgs = {
  userId?: InputMaybe<Scalars['ID']>;
};


export type QueryOpenLessonArgs = {
  userId?: InputMaybe<Scalars['ID']>;
};


export type QueryUserArgs = {
  email?: InputMaybe<Scalars['String']>;
};

export type RatingInputPartial = {
  goalId: Scalars['ID'];
  score: Scalars['Int'];
};

export type SchoolInputPartial = {
  id: Scalars['ID'];
};

export type StudentInputPartial = {
  id: Scalars['ID'];
};

export type UserInputPartial = {
  id: Scalars['ID'];
};

export type Goals = {
  __typename?: 'goals';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Lesson_Any = GroupLesson | Lesson;

export type Ratings = {
  __typename?: 'ratings';
  goal: Goals;
  id: Scalars['ID'];
  lesson: Lesson;
  score: Scalars['Int'];
};

export type Schools = {
  __typename?: 'schools';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Students = {
  __typename?: 'students';
  firstName: Scalars['String'];
  goals: Array<Goals>;
  id: Scalars['ID'];
  lastName: Scalars['String'];
  school: Schools;
};

export type Users = {
  __typename?: 'users';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
};

export type GetGoalsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGoalsQuery = { __typename?: 'Query', goals: Array<{ __typename?: 'goals', id: string, name: string }> };

export type GetGroupLessonQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetGroupLessonQuery = { __typename?: 'Query', groupLesson: { __typename?: 'GroupLesson', id: string, notes?: string | null, timeIn: any, timeOut?: any | null, lessonSet: Array<{ __typename?: 'Lesson', id: string, notes?: string | null, ratingSet: Array<{ __typename?: 'ratings', id: string, score: number, goal: { __typename?: 'goals', id: string, name: string } }>, school: { __typename?: 'schools', id: string, name: string }, student: { __typename?: 'students', id: string, firstName: string, lastName: string, goals: Array<{ __typename?: 'goals', id: string, name: string }> }, user: { __typename?: 'users', id: string, firstName: string, lastName: string } }>, school: { __typename?: 'schools', id: string, name: string }, user: { __typename?: 'users', id: string, firstName: string, lastName: string } } };

export type GetGroupLessonsQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['ID']>;
}>;


export type GetGroupLessonsQuery = { __typename?: 'Query', groupLessons: Array<{ __typename?: 'GroupLesson', id: string, notes?: string | null, timeIn: any, timeOut?: any | null, lessonSet: Array<{ __typename?: 'Lesson', id: string, notes?: string | null, timeIn: any, timeOut?: any | null, ratingSet: Array<{ __typename?: 'ratings', id: string, score: number, goal: { __typename?: 'goals', id: string, name: string } }>, school: { __typename?: 'schools', id: string, name: string }, student: { __typename?: 'students', id: string, firstName: string, lastName: string, goals: Array<{ __typename?: 'goals', id: string, name: string }> }, user: { __typename?: 'users', id: string, firstName: string, lastName: string } }>, school: { __typename?: 'schools', id: string, name: string }, user: { __typename?: 'users', id: string, firstName: string, lastName: string } }> };

export type CreateGroupLessonMutationVariables = Exact<{
  schoolId: Scalars['ID'];
  studentIds: Array<Scalars['ID']> | Scalars['ID'];
  userId: Scalars['ID'];
}>;


export type CreateGroupLessonMutation = { __typename?: 'Mutation', createGroupLesson: { __typename?: 'GroupLesson', id: string } };

export type UpdateGroupLessonMutationVariables = Exact<{
  groupLesson: GroupLessonInputPartial;
}>;


export type UpdateGroupLessonMutation = { __typename?: 'Mutation', updateGroupLesson: { __typename?: 'GroupLesson', id: string } };

export type GetLessonQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetLessonQuery = { __typename?: 'Query', lesson: { __typename?: 'Lesson', id: string, notes?: string | null, timeIn: any, timeOut?: any | null, ratingSet: Array<{ __typename?: 'ratings', id: string, score: number, goal: { __typename?: 'goals', id: string, name: string } }>, school: { __typename?: 'schools', id: string, name: string }, student: { __typename?: 'students', id: string, firstName: string, lastName: string, goals: Array<{ __typename?: 'goals', id: string, name: string }> }, user: { __typename?: 'users', id: string, firstName: string, lastName: string } } };

export type GetLessonsQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['ID']>;
}>;


export type GetLessonsQuery = { __typename?: 'Query', lessons: Array<{ __typename?: 'Lesson', id: string, notes?: string | null, timeIn: any, timeOut?: any | null, ratingSet: Array<{ __typename?: 'ratings', id: string, score: number, goal: { __typename?: 'goals', id: string, name: string } }>, school: { __typename?: 'schools', id: string, name: string }, student: { __typename?: 'students', id: string, firstName: string, lastName: string, goals: Array<{ __typename?: 'goals', id: string, name: string }> }, user: { __typename?: 'users', id: string, firstName: string, lastName: string } }> };

export type OpenLessonQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type OpenLessonQuery = { __typename?: 'Query', openLesson: { __typename?: 'GroupLesson', id: string, lessonSet: Array<{ __typename?: 'Lesson', id: string }> } | { __typename?: 'Lesson', id: string } };

export type CreateLessonMutationVariables = Exact<{
  lesson: LessonInput;
}>;


export type CreateLessonMutation = { __typename?: 'Mutation', createLesson: { __typename?: 'Lesson', id: string } };

export type UpdateLessonMutationVariables = Exact<{
  lesson: LessonInputPartial;
}>;


export type UpdateLessonMutation = { __typename?: 'Mutation', updateLesson: { __typename?: 'Lesson', id: string } };

export type GetStudentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStudentsQuery = { __typename?: 'Query', students: Array<{ __typename?: 'students', id: string, firstName: string, lastName: string, school: { __typename?: 'schools', id: string, name: string } }> };


export const GetGoalsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetGoals"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"goals"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetGoalsQuery, GetGoalsQueryVariables>;
export const GetGroupLessonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetGroupLesson"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"groupLesson"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pk"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lessonSet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"ratingSet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"goal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"school"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"goals"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"school"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeIn"}},{"kind":"Field","name":{"kind":"Name","value":"timeOut"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]} as unknown as DocumentNode<GetGroupLessonQuery, GetGroupLessonQueryVariables>;
export const GetGroupLessonsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetGroupLessons"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"groupLessons"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lessonSet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"ratingSet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"goal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"school"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"goals"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeIn"}},{"kind":"Field","name":{"kind":"Name","value":"timeOut"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"school"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeIn"}},{"kind":"Field","name":{"kind":"Name","value":"timeOut"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]} as unknown as DocumentNode<GetGroupLessonsQuery, GetGroupLessonsQueryVariables>;
export const CreateGroupLessonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateGroupLesson"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"schoolId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"studentIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGroupLesson"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"schoolId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"schoolId"}}},{"kind":"Argument","name":{"kind":"Name","value":"studentIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"studentIds"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GroupLesson"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CreateGroupLessonMutation, CreateGroupLessonMutationVariables>;
export const UpdateGroupLessonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateGroupLesson"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupLesson"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GroupLessonInputPartial"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateGroupLesson"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupLesson"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GroupLesson"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateGroupLessonMutation, UpdateGroupLessonMutationVariables>;
export const GetLessonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLesson"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lesson"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pk"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"ratingSet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"goal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"school"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"goals"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeIn"}},{"kind":"Field","name":{"kind":"Name","value":"timeOut"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]} as unknown as DocumentNode<GetLessonQuery, GetLessonQueryVariables>;
export const GetLessonsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLessons"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lessons"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"ratingSet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"goal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"school"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"goals"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeIn"}},{"kind":"Field","name":{"kind":"Name","value":"timeOut"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]} as unknown as DocumentNode<GetLessonsQuery, GetLessonsQueryVariables>;
export const OpenLessonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OpenLesson"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"openLesson"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GroupLesson"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lessonSet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Lesson"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<OpenLessonQuery, OpenLessonQueryVariables>;
export const CreateLessonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateLesson"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lesson"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LessonInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createLesson"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lesson"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Lesson"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CreateLessonMutation, CreateLessonMutationVariables>;
export const UpdateLessonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateLesson"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lesson"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LessonInputPartial"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateLesson"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lesson"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Lesson"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateLessonMutation, UpdateLessonMutationVariables>;
export const GetStudentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStudents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"students"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"school"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetStudentsQuery, GetStudentsQueryVariables>;