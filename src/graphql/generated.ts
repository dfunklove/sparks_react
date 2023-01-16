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
  user: UserInput;
};

export type LessonInputPartial = {
  id: Scalars['ID'];
  notes?: InputMaybe<Scalars['String']>;
  school: SchoolInputPartial;
  student: StudentInputPartial;
  timeIn?: InputMaybe<Scalars['DateTime']>;
  timeOut?: InputMaybe<Scalars['DateTime']>;
  user: UserInputPartial;
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
  school: SchoolInputPartial;
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

export type GetLessonsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLessonsQuery = { __typename?: 'Query', lessons: Array<{ __typename?: 'Lesson', id: string }> };

export type GetSchoolsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSchoolsQuery = { __typename?: 'Query', schools: Array<{ __typename?: 'School', id: string, name: string }> };

export type GetStudentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStudentsQuery = { __typename?: 'Query', students: Array<{ __typename?: 'Student', id: string, firstName: string, lastName: string, school: { __typename?: 'School', id: string, name: string } }> };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string }> };


export const GetLessonsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLessons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lessons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetLessonsQuery, GetLessonsQueryVariables>;
export const GetSchoolsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSchools"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"schools"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetSchoolsQuery, GetSchoolsQueryVariables>;
export const GetStudentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStudents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"students"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"school"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetStudentsQuery, GetStudentsQueryVariables>;
export const GetUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;