import type { GetLessonsQuery } from "./graphql/generated";
import type { GetSchoolsQuery } from "./graphql/generated";
import type { GetStudentsQuery } from "./graphql/generated";
import type { GetUsersQuery } from "./graphql/generated";

export type Lesson = GetLessonsQuery["lessons"]['0'];
export type School = GetSchoolsQuery["schools"]['0'];
export type Student = GetStudentsQuery["students"]['0'];
export type User = GetUsersQuery["users"]['0'];
