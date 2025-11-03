import { useQuery } from "@tanstack/react-query";
import { api, googleBooksApi } from "@/lib/api";
import type { Book, GoogleBooksResponse, EnrichedGoogleBook } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { BookOpen, Search, User, LogOut, Loader2, ExternalLink, CheckCircle, XCircle } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";

interface SearchFormData {
  query: string;
}

export default function Dashboard() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<SearchFormData>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [hasSearched, setHasSearched] = useState(false);

  // Fetch library books
  const { data: libraryBooks } = useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: () => api.get<Book[]>("/books"),
    enabled: isAuthenticated,
  });

  // Search Google Books
  const { data: googleBooksData, isLoading: isSearching } = useQuery<GoogleBooksResponse>({
    queryKey: ["googleBooks", searchQuery],
    queryFn: () => googleBooksApi.searchBooks(searchQuery),
    enabled: !!searchQuery && isAuthenticated,
  });

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  const onSearch = (data: SearchFormData) => {
    if (data.query.trim()) {
      setSearchQuery(data.query.trim());
      setHasSearched(true);
    }
  };

  const queryField = register("query", {
    required: "Please enter a search term",
    minLength: {
      value: 2,
      message: "Search term must be at least 2 characters"
    }
  });

  // Enrich Google Books with library availability
  const enrichedBooks: EnrichedGoogleBook[] = React.useMemo(() => {
    if (!googleBooksData) return [];

    return googleBooksData.items.map((googleBook) => {
      const identifiers = googleBook.volumeInfo.industryIdentifiers;
      const isbn = identifiers?.find(
        (id) => id.type === "ISBN_13" || id.type === "ISBN_10"
      )?.identifier;

      const libraryBook = isbn && libraryBooks
        ? libraryBooks.find((book) => book.isbn === isbn)
        : undefined;

      return {
        ...googleBook,
        inLibrary: !!libraryBook,
        libraryBook,
      };
    });
  }, [googleBooksData, libraryBooks]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card/30 to-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-orange-600 shadow-[0_0_20px_rgba(255,136,0,0.4)]">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">Library Manager</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link to="/books">
              <Button variant="ghost" size="sm">
                My Library
              </Button>
            </Link>
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">{user?.firstname} {user?.lastname}</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-foreground to-primary bg-clip-text text-transparent">
            Discover Books
          </h1>
          <p className="text-muted-foreground">
            Search millions of books from Google Books and check availability in our library
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSubmit(onSearch)} className="mb-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Search Google Books Catalog</CardTitle>
              <CardDescription>
                Search by title, author, ISBN, or keywords
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="search" className="sr-only">Search query</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                      id="search"
                      type="text"
                      placeholder="e.g., Harry Potter, Stephen King, ISBN: 9780545010221"
                      className={`pl-10 ${errors.query ? "border-destructive" : ""}`}
                      {...queryField}
                    />
                  </div>
                  {errors.query && (
                    <p className="text-sm text-destructive">{errors.query.message}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="shadow-[0_0_20px_rgba(255,136,0,0.3)] hover:shadow-[0_0_30px_rgba(255,136,0,0.5)]"
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>

        {/* Search Results */}
        {isSearching ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : hasSearched && enrichedBooks.length > 0 ? (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">
                Found {((googleBooksData?.totalItems ?? 0) as number).toLocaleString()} results
              </h2>
              <p className="text-sm text-muted-foreground">
                Showing {enrichedBooks.length} books
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {enrichedBooks.map((book) => {
                const identifiers = book.volumeInfo.industryIdentifiers;
                const isbn = identifiers
                  ? identifiers.find((id) => id.type === "ISBN_13" || id.type === "ISBN_10")?.identifier || "N/A"
                  : "N/A";

                const thumbnailUrl = book.volumeInfo.imageLinks?.thumbnail;
                const thumbnail = thumbnailUrl ? thumbnailUrl.replace(/^http:/, 'https:') : undefined;

                return (
                  <Card
                    key={book.id}
                    className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50 overflow-hidden flex flex-col"
                  >
                    <CardHeader className="pb-3">
                      {thumbnail && (
                        <div className="mb-3 flex justify-center">
                          <img
                            src={thumbnail}
                            alt={book.volumeInfo.title}
                            className="h-40 object-contain rounded-md shadow-md"
                          />
                        </div>
                      )}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <CardTitle className="text-base line-clamp-2 group-hover:text-primary transition-colors">
                            {book.volumeInfo.title}
                          </CardTitle>
                          <CardDescription className="mt-1 line-clamp-1">
                            {book.volumeInfo.authors?.join(", ") || "Unknown Author"}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="mt-2">
                        {book.inLibrary ? (
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-green-500/10 border border-green-500/20">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-green-500">In Our Library</p>
                              <p className="text-xs text-green-600/80">
                                {book.libraryBook?.availableCopies}/{book.libraryBook?.totalCopies} available
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted">
                            <XCircle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            <p className="text-xs text-muted-foreground">Not in our library</p>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2 flex-1 flex flex-col">
                      {book.volumeInfo.description && (
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {book.volumeInfo.description}
                        </p>
                      )}
                      <div className="text-xs space-y-1 mt-auto">
                        <div>
                          <span className="text-muted-foreground">ISBN:</span>{" "}
                          <span className="font-medium">{isbn}</span>
                        </div>
                        {book.volumeInfo.publishedDate && (
                          <div>
                            <span className="text-muted-foreground">Published:</span>{" "}
                            <span className="font-medium">{book.volumeInfo.publishedDate}</span>
                          </div>
                        )}
                        {book.volumeInfo.categories && (
                          <div>
                            <span className="text-muted-foreground">Category:</span>{" "}
                            <span className="font-medium">{book.volumeInfo.categories[0]}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2 mt-4">
                        {book.inLibrary && book.libraryBook ? (
                          <Button
                            className="flex-1"
                            size="sm"
                            disabled={book.libraryBook.availableCopies === 0}
                          >
                            {book.libraryBook.availableCopies > 0 ? 'Borrow' : 'Unavailable'}
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            className="flex-1"
                            size="sm"
                            asChild
                          >
                            <a
                              href={book.volumeInfo.previewLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Preview <ExternalLink className="w-3 h-3 ml-1" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ) : hasSearched ? (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-xl font-semibold mb-2">No books found</h3>
            <p className="text-muted-foreground">
              Try a different search term or check your spelling
            </p>
          </div>
        ) : (
          <div className="text-center py-20">
            <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-xl font-semibold mb-2">Start Searching</h3>
            <p className="text-muted-foreground">
              Enter a search term above to discover books from Google's vast catalog
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

