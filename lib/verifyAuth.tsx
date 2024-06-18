// export default function withAuth(Component: any) {
//   return function IsAuth(props: any) {
//     const { push } = useRouter();
//     const dispatch = useAppDispatch();
//     // const isLoggedIn = useAppSelector((state) => state?.authState.isLoggedIn);
//     const isLoggedIn = false;

//     if (!isLoggedIn) {
//       push("/");
//     }
//     // useEffect(() => {
//     //   if (!isLoggedIn) {
//     //     push("/");
//     //   }
//     // }, []);

//     // useEffect(() => {
//     //   if (isLoggedIn) {
//     //     return push("/myprofile");
//     //   }
//     // }, []);

//     // if (!isLoggedIn) {
//     //   return null;
//     // }

//     return <Component {...props} />;
//   };
// }

export default function verifyAuth(token: string) {
  console.log("here------------------------------------", token);
  // const { push } = useRouter();
  const isLoggedIn = false;

  if (!isLoggedIn) {
    console.log("here-----------------------------------37");
    return false;
  }
  return true;
}

// export async function verifyAuth(token) {
//   // Your custom logic to verify the token
//   // This could involve calling an API, checking a database, etc.
//   if (!token) {
//     return false;
//   }

//   try {
//     // Example verification logic
//     // const response = await fetch('https://your-auth-service/verify', {
//     //   method: 'POST',
//     //   headers: { 'Content-Type': 'application/json' },
//     //   body: JSON.stringify({ token }),
//     // });

//     // const result = await response.json();
//     // return result.isValid;
//     return true; // Replace this with actual verification result
//   } catch (error) {
//     return false;
//   }
// }
