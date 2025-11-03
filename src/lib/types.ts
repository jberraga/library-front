export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
  languages?: string[];
  age: number;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword?: string;
  languages?: string[];
  age: number;
}

export interface Book {
  id: number;
  title: string;
  isbn: string;
  publishedDate: string;
  availableCopies: number;
  totalCopies: number;
  authorId: number;
  categoryId: number;
  author?: Author;
  category?: Category;
}

export interface Author {
  id: number;
  name: string;
  bio?: string;
  birthDate?: string;
  nationality?: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface Borrow {
  id: number;
  userId: number;
  bookId: number;
  borrowDate: string;
  dueDate: string;
  returnDate?: string;
  user?: User;
  book?: Book;
}

export interface GoogleBook {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publishedDate?: string;
    description?: string;
    industryIdentifiers?: Array<{
      type: string;
      identifier: string;
    }>;
    imageLinks?: {
      smallThumbnail?: string;
      thumbnail?: string;
    };
    categories?: string[];
    pageCount?: number;
    language?: string;
    previewLink?: string;
  };
  saleInfo?: {
    buyLink?: string;
  };
}

export interface GoogleBooksResponse {
  totalItems: number;
  items: GoogleBook[];
}

export interface EnrichedGoogleBook extends GoogleBook {
  inLibrary: boolean;
  libraryBook?: Book;
}

