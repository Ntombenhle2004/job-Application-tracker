// import { Navigate } from "react-router-dom";
// import type { ReactNode } from "react";

// type Props = {
//   children: ReactNode;
// };

// export default function ProtectedRoute({ children }: Props) {
//   const user = localStorage.getItem("user");
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }
//   return <>{children}</>;
// }


import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type Props = { children: ReactNode };

export default function ProtectedRoute({ children }: Props) {
  const user = localStorage.getItem("user");
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
