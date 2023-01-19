// @ts-nocheck

import {
  Link,
  useLoaderData,
} from "react-router-dom";

export async function loader({params}) {
  const lesson = { timeIn: "dark thirty", id: params.id}; // load stuff here
  return { lesson };
}

function LessonsCheckout() {
  const { lesson } = useLoaderData();
  return <><h2>Lesson Checkout</h2>
      Lesson id: { lesson.id }, time in: { lesson.timeIn }
    </>
}

export default LessonsCheckout