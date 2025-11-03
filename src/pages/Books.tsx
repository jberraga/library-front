import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Book } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { BookOpen, Search, User, LogOut, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";

interface SearchFormData {
  searchTerm: string;
}

export default function Books() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { register, watch } = useForm<SearchFormData>({
    defaultValues: {
      searchTerm: ""
    }
  });

  const searchTerm = watch("searchTerm");

  const { data: books, isLoading, error } = useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: () => api.get<Book[]>("/books"),
    enabled: isAuthenticated,
  });

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const filteredBooks = books?.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.isbn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

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
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <Search className="w-4 h-4 mr-2" />
                Discover Books
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
            Book Collection
          </h1>
          <p className="text-muted-foreground">Browse and search our extensive library catalog</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-2xl">
          <Label htmlFor="searchTerm" className="sr-only">Search books</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              id="searchTerm"
              type="text"
              placeholder="Search books by title or ISBN..."
              {...register("searchTerm")}
              className="pl-10"
            />
          </div>
        </div>

        {/* Books Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="bg-destructive/10 border border-destructive/50 text-destructive px-6 py-4 rounded-lg">
            <p>Failed to load books. Please try again later.</p>
          </div>
        ) : filteredBooks && filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <Card key={book.id} className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50 overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                        {book.title}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        ISBN: {book.isbn}
                      </CardDescription>
                    </div>
                    <div className={`px-2 py-1 rounded-md text-xs font-semibold ${
                      book.availableCopies > 0 
                        ? 'bg-green-500/10 text-green-500' 
                        : 'bg-red-500/10 text-red-500'
                    }`}>
                      {book.availableCopies > 0 ? 'Available' : 'Borrowed'}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Author ID:</span>{" "}
                    <span className="font-medium">{book.authorId}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Category ID:</span>{" "}
                    <span className="font-medium">{book.categoryId}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Copies:</span>{" "}
                    <span className="font-medium">{book.availableCopies}/{book.totalCopies}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Published:</span>{" "}
                    <span className="font-medium">{new Date(book.publishedDate).toLocaleDateString()}</span>
                  </div>
                  <Button
                    className="w-full mt-4"
                    size="sm"
                    disabled={book.availableCopies === 0}
                  >
                    {book.availableCopies > 0 ? 'Borrow Book' : 'Not Available'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-xl font-semibold mb-2">No books found</h3>
            <p className="text-muted-foreground">
              {searchTerm ? "Try a different search term" : "The library catalog is empty"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

