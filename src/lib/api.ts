const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error: ApiError = await response.json().catch(() => ({
        message: 'An error occurred',
      }));
      throw error;
    }
    return response.json();
  }

  async get<T>(endpoint: string, requiresAuth = true): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (requiresAuth) {
      const token = this.getAuthToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'GET',
      headers,
    });

    return this.handleResponse<T>(response);
  }

  async post<T>(endpoint: string, data?: unknown, requiresAuth = true): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (requiresAuth) {
      const token = this.getAuthToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  async patch<T>(endpoint: string, data: unknown, requiresAuth = true): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (requiresAuth) {
      const token = this.getAuthToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(data),
    });

    return this.handleResponse<T>(response);
  }

  async delete<T>(endpoint: string, requiresAuth = true): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (requiresAuth) {
      const token = this.getAuthToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers,
    });

    return this.handleResponse<T>(response);
  }
}

export const api = new ApiClient(API_BASE_URL);

// Google Books API
const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1';

import type { GoogleBooksResponse } from './types';

export const googleBooksApi = {
  async searchBooks(query: string, maxResults: number = 20): Promise<GoogleBooksResponse> {
    const response = await fetch(
      `${GOOGLE_BOOKS_API_URL}/volumes?q=${encodeURIComponent(query)}&maxResults=${maxResults}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch books from Google Books API');
    }

    const data = await response.json();
    // Ensure items is always an array
    return {
      totalItems: data.totalItems || 0,
      items: data.items || []
    };
  },

  async getBookByISBN(isbn: string): Promise<GoogleBooksResponse> {
    const response = await fetch(
      `${GOOGLE_BOOKS_API_URL}/volumes?q=isbn:${isbn}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch book by ISBN');
    }

    const data = await response.json();
    return {
      totalItems: data.totalItems || 0,
      items: data.items || []
    };
  }
};

