import { cookies } from "next/headers";
import MyLibraryContent from "./MyLibraryContent";

export const metadata = {
  title: "My Library | Book Worm",
  description: "Manage your reading progress and book collection.",
};

// Server-side function to fetch user's books
async function getUserBooks() {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("token");

  if (!tokenCookie) {
    return { currentlyReading: [], wantToRead: [], read: [], isLoggedIn: false };
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/my-books`, {
      headers: {
        Cookie: `token=${tokenCookie.value}`,
      },
      cache: "no-store",
      credentials: "include",
    });

    if (!res.ok) {
      return { currentlyReading: [], wantToRead: [], read: [], isLoggedIn: true };
    }

    const data = await res.json();

    return {
      currentlyReading: data.currentlyReading || [],
      wantToRead: data.wantToRead || [],
      read: data.read || [],
      isLoggedIn: true,
    };
  } catch (error) {
    console.error("Failed to fetch user books:", error);
    return { currentlyReading: [], wantToRead: [], read: [], isLoggedIn: true };
  }
}

export default async function MyLibraryPage() {
  const booksData = await getUserBooks();

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 bg-base-100">
      <div className="max-w-7xl mx-auto">
        <MyLibraryContent
          initialCurrentlyReading={booksData.currentlyReading}
          initialWantToRead={booksData.wantToRead}
          initialRead={booksData.read}
          isLoggedIn={booksData.isLoggedIn}
        />
      </div>
    </div>
  );
}
