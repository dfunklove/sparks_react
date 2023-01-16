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

export type CreateLesson = {
  __typename?: 'CreateLesson';
  lesson?: Maybe<LessonType>;
};

export type CreateLessonInput = {
  behavior?: InputMaybe<Scalars['Int']>;
  broughtBooks?: InputMaybe<Scalars['Boolean']>;
  broughtInstrument?: InputMaybe<Scalars['Boolean']>;
  groupLesson?: InputMaybe<Scalars['ID']>;
  notes?: InputMaybe<Scalars['String']>;
  progress?: InputMaybe<Scalars['Int']>;
  ratingSet?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  school: Scalars['ID'];
  student: Scalars['ID'];
  timeIn: Scalars['DateTime'];
  timeOut?: InputMaybe<Scalars['DateTime']>;
  user: Scalars['ID'];
};

export type DeleteLesson = {
  __typename?: 'DeleteLesson';
  lesson?: Maybe<LessonType>;
};

export type LessonType = {
  __typename?: 'LessonType';
  behavior?: Maybe<Scalars['Int']>;
  broughtBooks?: Maybe<Scalars['Boolean']>;
  broughtInstrument?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  notes?: Maybe<Scalars['String']>;
  progress?: Maybe<Scalars['Int']>;
  timeIn: Scalars['DateTime'];
  timeOut?: Maybe<Scalars['DateTime']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createLesson?: Maybe<CreateLesson>;
  deleteLesson?: Maybe<DeleteLesson>;
  updateLesson?: Maybe<UpdateLesson>;
};


export type MutationCreateLessonArgs = {
  input: CreateLessonInput;
};


export type MutationDeleteLessonArgs = {
  input: CreateLessonInput;
};


export type MutationUpdateLessonArgs = {
  input: CreateLessonInput;
};

export type Query = {
  __typename?: 'Query';
  lessons?: Maybe<Array<Maybe<LessonType>>>;
  lesson?: Maybe<LessonType>;
};


export type QueryLessonArgs = {
  id?: InputMaybe<Scalars['Int']>;
};

export type UpdateLesson = {
  __typename?: 'UpdateLesson';
  lesson?: Maybe<LessonType>;
};

export type GetLessonsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLessonsQuery = { __typename?: 'Query', lessons: Array<{ __typename?: 'LessonType', id: string } > };


export const GetLessonsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLessons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lessons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetLessonsQuery, GetLessonsQueryVariables>;