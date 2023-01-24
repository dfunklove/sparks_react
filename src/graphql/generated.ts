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
  GlobalID: any;
};

export type CreateLessonPayload = Lesson | OperationInfo;

export type CreateUserPayload = OperationInfo | User;

export type DeleteLessonPayload = Lesson | OperationInfo;

export type DeleteUserPayload = OperationInfo | User;

export type Lesson = {
  __typename?: 'Lesson';
  id: Scalars['ID'];
  school: School;
  student: Student;
  timeIn: Scalars['DateTime'];
  timeOut?: Maybe<Scalars['DateTime']>;
  user: User;
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
  school?: InputMaybe<SchoolInputPartial>;
  student?: InputMaybe<StudentInputPartial>;
  timeIn?: InputMaybe<Scalars['DateTime']>;
  timeOut?: InputMaybe<Scalars['DateTime']>;
  user?: InputMaybe<UserInputPartial>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createLesson: CreateLessonPayload;
  createUser: CreateUserPayload;
  deleteLesson: DeleteLessonPayload;
  deleteUser: DeleteUserPayload;
  updateLesson: UpdateLessonPayload;
  updateUser: UpdateUserPayload;
};


export type MutationCreateLessonArgs = {
  input: LessonInput;
};


export type MutationCreateUserArgs = {
  input: UserInput;
};


export type MutationDeleteLessonArgs = {
  input: NodeInput;
};


export type MutationDeleteUserArgs = {
  input: NodeInput;
};


export type MutationUpdateLessonArgs = {
  input: LessonInputPartial;
};


export type MutationUpdateUserArgs = {
  input: UserInputPartial;
};

/** Input of an object that implements the `Node` interface. */
export type NodeInput = {
  id: Scalars['GlobalID'];
};

/** Multiple messages returned by an operation. */
export type OperationInfo = {
  __typename?: 'OperationInfo';
  /** List of messages returned by the operation. */
  messages: Array<OperationMessage>;
};

/** An error that happened while executing an operation. */
export type OperationMessage = {
  __typename?: 'OperationMessage';
  /** The field that caused the error, or `null` if it isn't associated with any particular field. */
  field?: Maybe<Scalars['String']>;
  /** The kind of this message. */
  kind: OperationMessageKind;
  /** The error message. */
  message: Scalars['String'];
};

/** The kind of the returned message. */
export enum OperationMessageKind {
  Error = 'ERROR',
  Info = 'INFO',
  Permission = 'PERMISSION',
  Validation = 'VALIDATION',
  Warning = 'WARNING'
}

export type Query = {
  __typename?: 'Query';
  lesson: Lesson;
  lessons: Array<Lesson>;
  school: School;
  schools: Array<School>;
  student: Student;
  students: Array<Student>;
  user: User;
  users: Array<User>;
};


export type QueryLessonArgs = {
  pk: Scalars['ID'];
};


export type QuerySchoolArgs = {
  pk: Scalars['ID'];
};


export type QueryStudentArgs = {
  pk: Scalars['ID'];
};


export type QueryUserArgs = {
  pk: Scalars['ID'];
};

export type School = {
  __typename?: 'School';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type SchoolInputPartial = {
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
};

export type Student = {
  __typename?: 'Student';
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  school: School;
};

export type StudentInputPartial = {
  firstName?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: InputMaybe<Scalars['String']>;
  school?: InputMaybe<SchoolInputPartial>;
};

export type UpdateLessonPayload = Lesson | OperationInfo;

export type UpdateUserPayload = OperationInfo | User;

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  passwordDigest: Scalars['String'];
};

export type UserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  passwordDigest: Scalars['String'];
};

export type UserInputPartial = {
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: InputMaybe<Scalars['String']>;
  passwordDigest?: InputMaybe<Scalars['String']>;
};

export type GetLessonQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetLessonQuery = { __typename?: 'Query', lesson: { __typename?: 'Lesson', id: string, timeIn: any, timeOut?: any | null, school: { __typename?: 'School', id: string, name: string }, student: { __typename?: 'Student', id: string, firstName: string, lastName: string }, user: { __typename?: 'User', id: string, firstName: string, lastName: string } } };

export type GetLessonsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLessonsQuery = { __typename?: 'Query', lessons: Array<{ __typename?: 'Lesson', id: string }> };

export type CreateLessonMutationVariables = Exact<{
  lesson: LessonInput;
}>;


export type CreateLessonMutation = { __typename?: 'Mutation', createLesson: { __typename?: 'Lesson', id: string } | { __typename?: 'OperationInfo' } };

export type UpdateLessonMutationVariables = Exact<{
  lesson: LessonInputPartial;
}>;


export type UpdateLessonMutation = { __typename?: 'Mutation', updateLesson: { __typename?: 'Lesson', id: string } | { __typename?: 'OperationInfo' } };

export type GetSchoolsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSchoolsQuery = { __typename?: 'Query', schools: Array<{ __typename?: 'School', id: string, name: string }> };

export type GetStudentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStudentsQuery = { __typename?: 'Query', students: Array<{ __typename?: 'Student', id: string, firstName: string, lastName: string, school: { __typename?: 'School', id: string, name: string } }> };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string }> };


export const GetLessonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLesson"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lesson"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pk"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"school"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timeIn"}},{"kind":"Field","name":{"kind":"Name","value":"timeOut"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]} as unknown as DocumentNode<GetLessonQuery, GetLessonQueryVariables>;
export const GetLessonsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLessons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lessons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetLessonsQuery, GetLessonsQueryVariables>;
export const CreateLessonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateLesson"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lesson"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LessonInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createLesson"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lesson"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Lesson"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CreateLessonMutation, CreateLessonMutationVariables>;
export const UpdateLessonDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateLesson"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lesson"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LessonInputPartial"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateLesson"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lesson"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Lesson"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateLessonMutation, UpdateLessonMutationVariables>;
export const GetSchoolsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSchools"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"schools"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetSchoolsQuery, GetSchoolsQueryVariables>;
export const GetStudentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStudents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"students"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"school"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetStudentsQuery, GetStudentsQueryVariables>;
export const GetUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;