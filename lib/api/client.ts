// API Client for connecting frontend to backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth-token');
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = params ? `${endpoint}?${new URLSearchParams(params)}` : endpoint;
    return this.request<T>(url);
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }

  async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }
}

export const apiClient = new ApiClient();

// Auth API functions
export const authApi = {
  // Wallet connection
  async connectWallet(walletAddress: string) {
    return apiClient.post('/api/auth/wallet', { walletAddress });
  },

  // Login
  async login(walletAddress: string, role?: string, nonce?: string, signature?: string) {
    return apiClient.post('/api/auth/login', { walletAddress, role, nonce, signature });
  },

  // Register
  async register(walletAddress: string, email?: string, username?: string) {
    return apiClient.post('/api/auth/register', { walletAddress, email, username });
  },

  // Get session
  async getSession() {
    return apiClient.get('/api/auth/session');
  },

  // Logout
  async logout() {
    return apiClient.post('/api/auth/logout');
  },

  // Google OAuth
  async getGoogleAuthUrl() {
    return apiClient.get('/api/auth/google');
  },

  async googleCallback(code: string) {
    return apiClient.post('/api/auth/google/callback', { code });
  },

  // Smart account
  async createSmartAccount() {
    return apiClient.post('/api/auth/smart-account');
  },

  // Super admin login
  async superAdminLogin(password: string) {
    return apiClient.post('/api/auth/superadmin', { password });
  },
};

// Properties API functions
export const propertiesApi = {
  async getProperties(params?: {
    page?: number;
    limit?: number;
    category?: string;
    location?: string;
    status?: string;
  }) {
    return apiClient.get('/api/properties', params);
  },

  async createProperty(propertyData: {
    title: string;
    description: string;
    address: string;
    property_type: string;
    square_footage?: number;
    bedrooms?: number;
    bathrooms?: number;
    year_built?: number;
    lot_size?: number;
    images?: string[];
    documents?: string[];
  }) {
    return apiClient.post('/api/properties', propertyData);
  },

  async getProperty(id: string) {
    return apiClient.get(`/api/properties/${id}`);
  },

  async updateProperty(id: string, updates: any) {
    return apiClient.put(`/api/properties/${id}`, updates);
  },

  async deleteProperty(id: string) {
    return apiClient.delete(`/api/properties/${id}`);
  },

  async getPropertyInvestors(id: string) {
    return apiClient.get(`/api/properties/${id}/investors`);
  },
};

// Marketplace API functions
export const marketplaceApi = {
  async getListings(params?: {
    page?: number;
    limit?: number;
    status?: string;
    propertyId?: string;
  }) {
    return apiClient.get('/api/marketplace/listings', params);
  },

  async createListing(listingData: {
    propertyId: string;
    price: number;
    duration?: number;
    listingType: string;
  }) {
    return apiClient.post('/api/marketplace/listings', listingData);
  },

  async getListing(id: string) {
    return apiClient.get(`/api/marketplace/listings/${id}`);
  },

  async updateListing(id: string, updates: any) {
    return apiClient.put(`/api/marketplace/listings/${id}`, updates);
  },

  async cancelListing(id: string) {
    return apiClient.delete(`/api/marketplace/listings/${id}`);
  },

  async getBids(params?: {
    listingId?: string;
    bidderId?: string;
    status?: string;
  }) {
    return apiClient.get('/api/marketplace/bids', params);
  },

  async placeBid(bidData: {
    listingId: string;
    amount: number;
    currency?: string;
  }) {
    return apiClient.post('/api/marketplace/bids', bidData);
  },

  async getBid(id: string) {
    return apiClient.get(`/api/marketplace/bids/${id}`);
  },

  async updateBid(id: string, updates: any) {
    return apiClient.put(`/api/marketplace/bids/${id}`, updates);
  },

  async deleteBid(id: string) {
    return apiClient.delete(`/api/marketplace/bids/${id}`);
  },
};

// Payments API functions
export const paymentsApi = {
  async getPaymentOptions() {
    return apiClient.get('/api/payments/options');
  },

  async getPayments(params?: {
    page?: number;
    limit?: number;
    status?: string;
  }) {
    return apiClient.get('/api/payments', params);
  },

  async createPayment(paymentData: {
    listingId: string;
    amount: number;
    currency?: string;
    paymentMethod?: string;
  }) {
    return apiClient.post('/api/payments', paymentData);
  },

  async getPayment(id: string) {
    return apiClient.get(`/api/payments/${id}`);
  },

  async processPayment(paymentId: string, transactionHash?: string) {
    return apiClient.post('/api/payments/process', { paymentId, transactionHash });
  },
};

// Escrow API functions
export const escrowApi = {
  async getEscrows(params?: {
    page?: number;
    limit?: number;
    status?: string;
  }) {
    return apiClient.get('/api/escrow', params);
  },

  async createEscrow(escrowData: {
    paymentId: string;
    amount: number;
    currency?: string;
  }) {
    return apiClient.post('/api/escrow', escrowData);
  },

  async getEscrow(id: string) {
    return apiClient.get(`/api/escrow/${id}`);
  },

  async disputeEscrow(id: string, disputeData: {
    reason: string;
    description: string;
  }) {
    return apiClient.post(`/api/escrow/${id}/dispute`, disputeData);
  },

  async releaseEscrow(id: string, transactionHash?: string) {
    return apiClient.post(`/api/escrow/${id}/release`, { transactionHash });
  },
};

// KYC API functions
export const kycApi = {
  async getKycStatus() {
    return apiClient.get('/api/kyc');
  },

  async submitKyc(kycData: {
    fullName: string;
    dateOfBirth: string;
    nationality: string;
    address: string;
    idType: string;
    idNumber: string;
    documents?: string[];
  }) {
    return apiClient.post('/api/kyc/submit', kycData);
  },

  async approveKyc(userId: string, approved: boolean, rejectionReason?: string) {
    return apiClient.post(`/api/kyc/${userId}/approve`, { approved, rejectionReason });
  },

  async getAllKycSubmissions(params?: {
    page?: number;
    limit?: number;
    status?: string;
  }) {
    return apiClient.get('/api/kyc/admin/all', params);
  },
};

// Notifications API functions
export const notificationsApi = {
  async getNotifications(params?: {
    page?: number;
    limit?: number;
    read?: boolean;
  }) {
    return apiClient.get('/api/notifications', params);
  },

  async markAsRead(id: string) {
    return apiClient.put(`/api/notifications/${id}/read`);
  },
};

// Analytics API functions
export const analyticsApi = {
  async getMarketInsights() {
    return apiClient.get('/api/analytics/market-insights');
  },

  async getRealTimeAnalytics() {
    return apiClient.get('/api/analytics/real-time');
  },
};

// Metadata API functions
export const metadataApi = {
  async getTokenMetadata(tokenId: string) {
    return apiClient.get(`/api/metadata/${tokenId}`);
  },
};

// Admin API functions
export const adminApi = {
  async getAnalytics() {
    return apiClient.get('/api/admin/analytics');
  },

  async getRevenueManagement() {
    return apiClient.get('/api/admin/analytics/revenue-management');
  },

  async getUsers(params?: {
    page?: number
    limit?: number
  }) {
    return apiClient.get('/api/admin/users', params);
  },

  async getProperties(params?: {
    page?: number
    limit?: number
  }) {
    return apiClient.get('/api/admin/properties', params);
  },

  async updatePropertyStatus(id: string, status: string, notes?: string) {
    return apiClient.put(`/api/admin/properties/${id}/status`, { status, notes });
  },

  async getSettings() {
    return apiClient.get('/api/admin/settings');
  },

  async updateSettings(settings: any) {
    return apiClient.put('/api/admin/settings', settings);
  },

  async createProperty(propertyData: {
    title: string
    description: string
    address: string
    property_type: string
    square_footage?: number
    bedrooms?: number
    bathrooms?: number
    year_built?: number
    lot_size?: number
    images?: string[]
    documents?: string[]
  }) {
    return apiClient.post('/api/admin/properties', propertyData);
  },

  async getDistributions() {
    return apiClient.get('/api/admin/distributions');
  },

  async processDistributions() {
    return apiClient.post('/api/admin/distributions/process');
  },

  async exportDistributions() {
    return apiClient.get('/api/admin/distributions/export');
  },

  async getPaymentOptions() {
    return apiClient.get('/api/admin/payment-options');
  },

  async createPaymentOption(data: any) {
    return apiClient.post('/api/admin/payment-options', data);
  },

  async updatePaymentOption(id: string, data: any) {
    return apiClient.put(`/api/admin/payment-options/${id}`, data);
  },

  async deletePaymentOption(id: string) {
    return apiClient.delete(`/api/admin/payment-options/${id}`);
  },
};

export default apiClient;