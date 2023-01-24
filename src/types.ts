import type { GetLessonQuery } from "./graphql/generated";
import type { GetSchoolsQuery } from "./graphql/generated";
import type { GetStudentsQuery } from "./graphql/generated";
import type { GetUsersQuery } from "./graphql/generated";
import type { CreateLessonMutation } from "./graphql/generated";

export type Lesson = GetLessonQuery["lesson"];
export type LessonInput = CreateLessonMutation["createLesson"];
export type School = GetSchoolsQuery["schools"]['0'];
export type Student = GetStudentsQuery["students"]['0'];
export type User = GetUsersQuery["users"]['0'];
